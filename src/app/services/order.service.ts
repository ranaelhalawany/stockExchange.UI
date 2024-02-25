import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:22253/API/orders';


  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
  
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }
  createOrder(orderData: any): Observable<Order[]> {
  
    const url = `${this.apiUrl}/addOrder`; 
    return this.http.post<any>(url, orderData); 
   }

}
