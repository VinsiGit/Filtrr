import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navlinks = [
    { 
      name: "dashboard",
      iconlink: "",  
      url: "/dashboard" 
    },
    { 
      name: "paste-in",
      iconlink: "",  
      url: "/pastein" 
    },
    { 
      name: "settings",
      iconlink: "",  
      url: "/settings" 
    },
    { 
      name: "model retrain",
      iconlink: "",  
      url: "/retrain" 
    }
  ]

}
