import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { PagetitleService } from '../pagetitle.service';
import { Email } from '../email';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { ThemeService } from '../theme.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-pastein',
  templateUrl: './pastein.component.html',
  styleUrls: ['./pastein.component.css']
})
export class PasteinComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;
  input: string = "";
  text: string = "";
  textBoxResponse: Email | undefined;

  constructor(private route: ActivatedRoute, private post: PostService, private title: PagetitleService, private theme: ThemeService) {
  }

  ngOnInit() {
    this.title.pageTitle = "paste-in";
  }

  renderchart() {
    if(this.textBoxResponse)
    {
      this.chartOptions = {
        series: [Math.round((this.textBoxResponse.certainty*100) * 100) / 100], //round to 2 decimal places
        chart: {
          id: "certaintyWheel",
          height: 350,
          type: "radialBar"
        },
        colors: [this.theme.label1color],  
        plotOptions: {
          radialBar: {
            hollow: {
              size: `60%`
            }, 
            track: {
              background: '#f0f4f8',
            }
          }
        },
        labels: [this.textBoxResponse.label]
      };
    }
  }

  async submitText() {
    try {
      const response = await this.post.postMail({"body": this.input});
      this.textBoxResponse = response;
      this.text = this.input;
      console.log('Response content:', this.textBoxResponse);
      this.renderchart();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}
