import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation-trends',
  templateUrl: './recommendation-trends.component.html',
  styleUrls: ['./recommendation-trends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationTrendsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
