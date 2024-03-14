import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import * as ApexCharts from 'apexcharts';

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
      document.documentElement.style.setProperty('--shadow', '0 4px 12px 0 rgba(0, 0, 0, 0.2)');
      document.documentElement.style.setProperty('--nav-color', '#6b62b3');
      document.documentElement.style.setProperty('--nav-color-hover', '#6B599C');
      document.documentElement.style.setProperty('--nav-color-text', 'white');
      document.documentElement.style.setProperty('--nav-color-background', '#3e437a');
      document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(96,95,173,1) 0%, rgba(195,117,228,1) 100%');
      document.documentElement.style.setProperty('--page-color-background', '#303569');
      document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(75,80,134,1) 0%, rgba(49,53,110,1) 100%)');
      document.documentElement.style.setProperty('--page-color-text', 'white');
      document.documentElement.style.setProperty('--page-color-inactive', '#b7b7e0');
      document.documentElement.style.setProperty('--module-color-border', '#C9C9E8');
      document.documentElement.style.setProperty('--module-color-background', '#C9C9E8');
      document.documentElement.style.setProperty('--module-color-text', '#757575');
      document.documentElement.style.setProperty('--module-color-highlight-complementary', '#f05365');
      document.documentElement.style.setProperty('--module-color-highlight-monochrome', '#7a6ce4');
      this.theme.gridcolor = "#bcbce4";
      this.theme.label1color = "#f5a623";
      this.theme.label2color = "#f05365";
      this.theme.textcolor = "#8e8ea7";
    } else {
      document.documentElement.style.setProperty('--shadow', '0px 1px 22px -12px #607D8B');
      document.documentElement.style.setProperty('--nav-color', '#f05365');
      document.documentElement.style.setProperty('--nav-color-hover', '#eb5364');
      document.documentElement.style.setProperty('--nav-color-text', 'white');
      document.documentElement.style.setProperty('--nav-color-background', 'white');
      document.documentElement.style.setProperty('--nav-background-gradient', 'linear-gradient(180deg, rgba(240,83,101,1) 0%, rgba(246,142,95,1) 100%');
      document.documentElement.style.setProperty('--page-color-background', '#f0f4f8');
      document.documentElement.style.setProperty('--page-background-gradient', 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,241,241,1) 100%)');
      document.documentElement.style.setProperty('--page-color-text', '#46494c');
      document.documentElement.style.setProperty('--page-color-inactive', '#f0f4f8');
      document.documentElement.style.setProperty('--module-color-border', 'white');
      document.documentElement.style.setProperty('--module-color-background', 'white');
      document.documentElement.style.setProperty('--module-color-text', '#757575');
      document.documentElement.style.setProperty('--module-color-highlight-complementary', '#7a6ce4');
      document.documentElement.style.setProperty('--module-color-highlight-monochrome', '#f05365');
      this.theme.gridcolor = "#f2f2f2";
      this.theme.label1color = "#b872de";
      this.theme.label2color = "#6460af";
      this.theme.textcolor = "#8e8ea7";
    }

    //updating chart colors and rerendering the chart
    ApexCharts.exec('test', 'updateOptions', {
      colors: [this.theme.irrelevant_color, this.theme.label1color, this.theme.label2color],
      grid: {
        borderColor: this.theme.gridcolor,
      },
      xaxis: {
        labels: {
          style: {
            colors: this.theme.textcolor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: this.theme.textcolor,
          },
        },
      },
    }, true, true, true);
  }
}