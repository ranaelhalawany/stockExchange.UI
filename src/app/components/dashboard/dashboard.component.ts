import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: Stock[] = [];


  constructor(private stockService: StockService, private router : Router) { }

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

  navigateToStockHistory(symbol: string): void {
    this.router.navigate(['/stock/history', { symbol }]);
  }

}
