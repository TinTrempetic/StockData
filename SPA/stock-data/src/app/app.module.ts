import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockLookupComponent } from './components/stock-lookup/stock-lookup.component';
import { MarketNewsItemComponent } from './components/market-news-item/market-news-item.component';

import { HeaderComponent } from './containers/header/header.component';
import { MarketNewsComponent } from './containers/market-news/market-news.component';
import { StockPortfolioComponent } from './containers/stock-portfolio/stock-portfolio.component';
import { StockWatchlistComponent } from './containers/stock-watchlist/stock-watchlist.component';
import { EventCalendarsComponent } from './containers/event-calendars/event-calendars.component';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AutoCompleteModule } from 'primeng/autocomplete';

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
    MarketNewsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    TableModule,
    AutoCompleteModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollPanelModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe],
})
export class AppModule {}
