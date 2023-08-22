import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as zod from 'zod';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotableApiService {
  private readonly API_URL = 'https://api.quotable.io';
  private readonly MAX_RESULTS = 10;

  constructor(private http: HttpClient) {}

  search(
    searchQuery: string,
    limit: number = this.MAX_RESULTS,
    page: number = 1
  ): Observable<{
    results: any;
    rateLimit: { remaining: number; total: number };
    error?: { type: 'API_ERROR'; message: string };
  }> {
    const querySchema = zod.string().min(1);
    const limitSchema = zod.number().min(1).max(this.MAX_RESULTS);
    const pageSchema = zod.number().min(1);

    const isValidQuery = querySchema.safeParse(searchQuery);
    const isValidLimit = limitSchema.safeParse(limit);
    const isValidPage = pageSchema.safeParse(page);

    if (
      !isValidQuery.success ||
      !isValidLimit.success ||
      !isValidPage.success
    ) {
      return of({
        results: [],
        rateLimit: { remaining: 0, total: 0 },
        error: { type: 'API_ERROR', message: 'Invalid input parameters' },
      });
    }

    return this.http
      .get(`${this.API_URL}/search/quotes`, {
        params: {
          query: searchQuery,
          limit: limit.toString(),
          page: page.toString(),
        },
        observe: 'response',
      })
      .pipe(
        map((response) => {
          // NOTE: these will only work if you override the response headers from the api (in chrome)
          // essentially, Quotable needs to send the access-control-expose-headers header with a
          // value of: Ratelimit-Limit, Ratelimit-Remaining
          const remainingCalls = Number(
            response.headers.get('Ratelimit-Remaining')
          );
          const totalCalls = Number(response.headers.get('Ratelimit-Limit'));

          return {
            results: response.body,
            rateLimit: { remaining: remainingCalls, total: totalCalls },
          };
        }),
        catchError((error) => {
          return of({
            results: [],
            rateLimit: { remaining: 0, total: 0 },
            error: { type: 'API_ERROR' as const, message: error.message },
          });
        })
      );
  }
}
