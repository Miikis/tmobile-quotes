import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-stats',
  templateUrl: './api-stats.component.html',
  styleUrls: ['./api-stats.component.css'],
})
export class ApiStatsComponent {
  @Input() remainingCalls: number = 0;
  @Input() totalCalls: number = 0;
}
