import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Stock } from '../../models/stock';
import { OrderData } from '../../Interfaces/OrderData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;

  order: OrderData = {
    symbol: '',
    quantity: 0,
    orderType: 'Buy', // Default value
  };

  availableStocks: Stock[] = [];

  constructor(private formBuilder: FormBuilder, private stockService: StockService, private orderService: OrderService, private router: Router) {
    this.orderForm = this.formBuilder.group({
      stock_symbol: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      order_type: ['Buy', Validators.required]
    });
  }
  ngOnInit() {
    // Fetch available stocks from your API
    this.stockService.getAllStocks().subscribe((stocks: Stock[]) => {
      this.availableStocks = stocks;
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;

      this.orderService.createOrder(orderData).subscribe(
        (response) => {
          console.log('Order submitted successfully:', response);
          // Optionally, you can reset the form after a successful submission
          this.router.navigate(['/orders']);
        },
        (error) => {
          // Handle error response
          console.error('Error submitting order:', error);
        }
      );
    } else {
      // Handle form validation errors
      // You can display error messages or take appropriate action
    }
  }
}
