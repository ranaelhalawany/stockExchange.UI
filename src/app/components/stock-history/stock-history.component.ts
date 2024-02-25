import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { StockHistory } from '../../models/stockHistory';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {
  stockSymbol: string = '';
  histories:  StockHistory[] = [];


  constructor(private stockService: StockService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.stockSymbol = params.get('symbol') || ''; // Default value if null
      this.getStockHistory(this.stockSymbol);
      
    });
  }
  getStockHistory(symbol: string): void {
    this.stockService.getStockHistory(symbol).subscribe(
      {
        next: (data) => {
          console.log('Stock History:', data);
          this.histories = data;
          // Handle the data as needed
        },
        error: (error) => {
          console.error('Error fetching stock history:', error);
          // Handle the error
        },
      }
    );
  }

}
