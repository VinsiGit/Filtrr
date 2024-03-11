import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-themeswitch',
  templateUrl: './themeswitch.component.html',
  styleUrls: ['./themeswitch.component.css']
})
export class ThemeswitchComponent {
  darkModeEnabled: boolean = false;

  constructor(public theme: ThemeService) {
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.applyTheme();
  }

  applyTheme() {
    if (this.darkModeEnabled) {
      document.documentElement.style.setProperty('--nav-color', '#6b62b3');
      document.documentElement.style.setProperty('--nav-color-hover', '#6B599C');
      document.documentElement.style.setProperty('--nav-color-text', 'white');
      document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(96,95,173,1) 0%, rgba(195,117,228,1) 100%');
      document.documentElement.style.setProperty('--page-color-background', '#3e437a');
      document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(75,80,134,1) 0%, rgba(49,53,110,1) 100%)');
      document.documentElement.style.setProperty('--page-color-text', 'white');
      document.documentElement.style.setProperty('--module-color-border', '#C9C9E8');
      document.documentElement.style.setProperty('--module-color-background', '#C9C9E8');
      document.documentElement.style.setProperty('--module-color-text', '#757575');
      document.documentElement.style.setProperty('--module-color-highlight', '#f05365');
      this.theme.gridcolor = "#c2c2e6";
      this.theme.label1color = "#f05365";
      this.theme.label2color = "#f5a623";
      this.theme.textcolor = "#8e8ea7";
    } else {
      document.documentElement.style.setProperty('--nav-color', '#f05365');
      document.documentElement.style.setProperty('--nav-color-hover', '#eb5364');
      document.documentElement.style.setProperty('--nav-color-text', 'white');
      document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(240,83,101,1) 0%, rgba(246,142,95,1) 100%');
      document.documentElement.style.setProperty('--page-color-background', '#ffffff');
      document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,241,241,1) 100%)');
      document.documentElement.style.setProperty('--page-color-text', '#46494c');
      document.documentElement.style.setProperty('--module-color-border', '#f2f2f2');
      document.documentElement.style.setProperty('--module-color-background', '#f2f2f2');
      document.documentElement.style.setProperty('--module-color-text', '#757575');
      document.documentElement.style.setProperty('--module-color-highlight', '#6b62b3');
      this.theme.gridcolor = "#dcdcdd";
      this.theme.label1color = "#6460af";
      this.theme.label2color = "#b872de";
      this.theme.textcolor = "#8e8ea7";
    }
  }
}