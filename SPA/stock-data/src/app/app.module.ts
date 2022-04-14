import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { EventComponent } from './components/event/event.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockLookupComponent } from './components/stock-lookup/stock-lookup.component';
import { MarketNewsItemComponent } from './components/market-news-item/market-news-item.component';

import { HeaderComponent } from './containers/header/header.component';
import { MarketNewsComponent } from './containers/market-news/market-news.component';
import { StockPortfolioComponent } from './containers/stock-portfolio/stock-portfolio.component';
import { StockWatchlistComponent } from './containers/stock-watchlist/stock-watchlist.component';
import { EventsComponent } from './containers/events/events.component';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AuthRoutingModule } from './auth-routing.module';
import { TooltipModule } from 'primeng/tooltip';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { CandlesComponent } from './containers/candles/candles.component';
import { RecommendationTrendsComponent } from './containers/recommendation-trends/recommendation-trends.component';
import { CompanyNewsComponent } from './containers/company-news/company-news.component';
import { InsiderTransactionsComponent } from './containers/insider-transactions/insider-transactions.component';
import { CompanyProfileComponent } from './containers/company-profile/company-profile.component';
import { BasicFinancialsComponent } from './containers/basic-financials/basic-financials.component';
import { RouterModule, Routes } from '@angular/router';
import { StockDataComponent } from './containers/stock-data/stock-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: ':symbol',
    component: StockDataComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    DashboardComponent,
    StockPortfolioComponent,
    StockWatchlistComponent,
    MarketNewsComponent,
    EventComponent,
    EventsComponent,
    StockLookupComponent,
    MarketNewsItemComponent,
    CandlesComponent,
    RecommendationTrendsComponent,
    CompanyNewsComponent,
    InsiderTransactionsComponent,
    CompanyProfileComponent,
    BasicFinancialsComponent,
    StockDataComponent,
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
    AccordionModule,
    AuthRoutingModule,
    ProgressSpinnerModule,
    ButtonModule,
    TooltipModule,
    BlockUIModule,
    PanelModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe],
})
export class AppModule {}
