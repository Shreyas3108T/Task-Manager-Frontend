import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  shouldShowNavbar(): boolean {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    
    const excludedRoutes = ['login', 'signup'];
    if (currentRoute.snapshot.routeConfig && currentRoute.snapshot.routeConfig.path) {
      return !excludedRoutes.includes(currentRoute.snapshot.routeConfig.path);
    }
  
    return true;
  }

}
