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

  constructor(private route: ActivatedRoute, private post: PostService, private title: PagetitleService) {
  }

  ngOnInit() {
    this.title.pageTitle = "paste-in";
  }

  renderchart() {
    if(this.textBoxResponse)
    {
      this.chartOptions = {
        series: [this.textBoxResponse.certainty*100],
        chart: {
          height: 350,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: `60%`
            }
          }
        },
        labels: ["data_engineer"]
      };
    }
  }

  async submitText() {
    try {
      const response = await this.post.postMail(this.input);
      //this.textBoxResponse = response;
      this.textBoxResponse = {
        "_id": "65e2165e3be9d6b535d8ce72",
        "id": "65e2165e3be9d6b535d8ce72",
        "sender_email": "9aafe3821e66b0c91e68963e2d23312b90f65d37",
        "datetime_received": 1646685600,
        "subject": [],
        "text_body": [],
        "label": "data_engineer",
        "keywords": ["time management", "organization", "project management", "leadership"],
        "rating": 1,
        "datetime_start": 1646685600,
        "datetime_end": 1646682000,
        "datetime_elapsed": 3600,
        "certainty":0.69420,
        "source":"gmail"
      };
      this.text = this.input;
      console.log('Response content:', this.textBoxResponse);
      this.renderchart();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}
