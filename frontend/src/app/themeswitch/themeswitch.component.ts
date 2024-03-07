import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-themeswitch',
  templateUrl: './themeswitch.component.html',
  styleUrls: ['./themeswitch.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class ThemeswitchComponent {
  darkModeEnabled: boolean = true;

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    if (this.darkModeEnabled) {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }

  private setDarkMode() {
    document.documentElement.style.setProperty('--nav-color', '#6b62b3');
    document.documentElement.style.setProperty('--nav-color-hover', '#6B599C');
    document.documentElement.style.setProperty('--nav-color-text', 'white');
    document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(96,95,173,1) 0%, rgba(195,117,228,1) 100%');
    document.documentElement.style.setProperty('--page-color-background', '#3e437a');
    document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(75,80,134,1) 0%, rgba(49,53,110,1) 100%)');
    document.documentElement.style.setProperty('--page-color-text', 'white');
    document.documentElement.style.setProperty('--module-color-border', '#C2C2E6');
    document.documentElement.style.setProperty('--module-color-background', '#D7D7EF');
    document.documentElement.style.setProperty('--module-color-text', '#757575');
    document.documentElement.style.setProperty('--module-color-highlight', '#f05365');
  }

  private setLightMode() {
    document.documentElement.style.setProperty('--nav-color', '#f05365');
    document.documentElement.style.setProperty('--nav-color-hover', '#eb5364');
    document.documentElement.style.setProperty('--nav-color-text', 'white');
    document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(240,83,101,1) 0%, rgba(246,142,95,1) 100%');
    document.documentElement.style.setProperty('--page-color-background', '#ffffff');
    document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(75,80,134,1) 0%, rgba(49,53,110,1) 100%)');
    document.documentElement.style.setProperty('--page-color-text', '#46494c');
    document.documentElement.style.setProperty('--module-color-border', '#f2f2f2');
    document.documentElement.style.setProperty('--module-color-background', '#f2f2f2');
    document.documentElement.style.setProperty('--module-color-text', '#757575');
    document.documentElement.style.setProperty('--module-color-highlight', '#6b62b3');
  }
}
