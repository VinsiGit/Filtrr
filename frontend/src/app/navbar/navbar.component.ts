import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pageTitle: string | undefined;

  constructor(private router: Router ) {

  }

  ngOnInit() {
    this.pageTitle = this.router.url;
  }
}
