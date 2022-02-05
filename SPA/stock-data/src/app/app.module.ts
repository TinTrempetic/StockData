import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { StockLookupComponent } from './components/stock-lookup/stock-lookup.component';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    EventCalendarsComponent,
    StockLookupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    TableModule,
    AutoCompleteModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
