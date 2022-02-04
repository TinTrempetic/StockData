import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './containers/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockPortfolioComponent } from './containers/stock-portfolio/stock-portfolio.component';
import { StockWatchlistComponent } from './containers/stock-watchlist/stock-watchlist.component';
import { MarketNewsComponent } from './containers/market-news/market-news.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventCalendarsComponent } from './containers/event-calendars/event-calendars.component';

import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    DashboardComponent,
    StockPortfolioComponent,
    StockWatchlistComponent,
    MarketNewsComponent,
    CalendarComponent,
    EventCalendarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
