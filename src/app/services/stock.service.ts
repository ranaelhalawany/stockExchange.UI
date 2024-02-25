// stock.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';



@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:22253/API/stocks';


  constructor(private http: HttpClient) {

  }

  getAllStocks(): Observable<Stock[]> {
   
    return this.http.get<Stock[]>(`${this.apiUrl}`);
  }
  getStockHistory(symbol: string): Observable<any> {
    const url = `${this.apiUrl}/${symbol}/history`;
    return this.http.get(url);
  }
}
