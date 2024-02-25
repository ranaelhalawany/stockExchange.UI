import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stockExchange.UI';
  showNavbar: boolean = false;
  isHomePage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/' || event.url.includes('/login') || event.url.includes('/signup'));
        this.isHomePage = event.url === '/';

      }
    });
  }

}
