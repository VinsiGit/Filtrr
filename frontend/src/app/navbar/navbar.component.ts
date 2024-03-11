import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagetitleService } from '../pagetitle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  

  constructor(private title: PagetitleService) {
  }

  get pagetitle() {
    return this.title.pageTitle;
  }

  ngOnInit() {
  }
}
