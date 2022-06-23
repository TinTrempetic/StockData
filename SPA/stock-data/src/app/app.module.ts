import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventComponent } from './components/event/event.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MarketNewsItemComponent } from './components/market-news-item/market-news-item.component';
import { CompanyNewsComponent } from './containers/company-news/company-news.component';
import { CompanyProfileComponent } from './containers/company-profile/company-profile.component';
import { EventsComponent } from './containers/events/events.component';
import { HeaderComponent } from './containers/header/header.component';
import { MarketNewsComponent } from './containers/market-news/market-news.component';
import { PriceHistoryComponent } from './containers/price-history/price-history.component';
import { RecommendationTrendsComponent } from './containers/recommendation-trends/recommendation-trends.component';
import { StockDataComponent } from './containers/stock-data/stock-data.component';
import { StockLookupComponent } from './containers/stock-lookup/stock-lookup.component';
import { StockWatchlistComponent } from './containers/stock-watchlist/stock-watchlist.component';

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
    StockWatchlistComponent,
    MarketNewsComponent,
    EventComponent,
    EventsComponent,
    StockLookupComponent,
    MarketNewsItemComponent,
    PriceHistoryComponent,
    RecommendationTrendsComponent,
    CompanyNewsComponent,
    CompanyProfileComponent,
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
    CardModule,
    ChartModule,
    ToastModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe, MessageService],
})
export class AppModule {}
