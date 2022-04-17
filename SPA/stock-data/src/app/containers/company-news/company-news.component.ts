import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-company-news',
  templateUrl: './company-news.component.html',
  styleUrls: ['./company-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyNewsComponent implements OnInit {
  @Input() symbol: string;

  constructor() {}

  ngOnInit(): void {}
}
