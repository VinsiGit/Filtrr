import { Component, OnInit, ViewChild } from "@angular/core";
import { ThemeService } from "../theme.service";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexMarkers,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexLegend,
  ApexYAxis,
} from "ng-apexcharts";
import { ActivatedRoute } from "@angular/router";
import { AnalyticsdataService } from "../analyticsdata.service";
import { DayData, LabelData } from "../dataresponse";

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  markers: ApexMarkers;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  colors: any;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-mailamountgraph',
  templateUrl: './mailamountgraph.component.html',
  styleUrls: ['./mailamountgraph.component.css']
})

export class MailamountgraphComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;
  datapoints_irrelevant: number[] = [];
  datapoints_bi_eng: number[] = [];
  datapoints_data_eng: number[] = [];
  days: string[] = [""];

  constructor(private theme: ThemeService, private route: ActivatedRoute, private data: AnalyticsdataService) {
  }
  
  async ngOnInit(): Promise<void> {
    await this.loadChartData();
    this.renderChart();
  }

  //instanciating the chart
  renderChart() {
    this.chartOptions = {
      series: [
        {
          name: "irrelevant",
          data: this.datapoints_irrelevant,
        },
        {
          name: "bi-engineer",
          data: this.datapoints_bi_eng,
        },
        {
          name: "data-engineer",
          data: this.datapoints_data_eng,
        },
      ],
      chart: {
        foreColor: this.theme.textcolor,
        redrawOnParentResize: true,
        id: "mailAmountGraph",
        type: 'area',
        zoom: {
          enabled: true,
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 4,
          blur: 2,
          color: "#000",
          opacity: 0.05,
        },
      },
      colors: [this.theme.irrelevant_color, this.theme.label1color, this.theme.label2color],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      title: {
        text: "mails",
        align: "left",
      },
      grid: {
        borderColor: this.theme.gridcolor,
        row: {
          opacity: 0.5,
        },
        padding: {
          left: 25,
        },
      },
      xaxis: {
        type: 'datetime',
        categories: this.days,
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: this.theme.axistextcolor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: this.theme.axistextcolor,
          },
        },
      },
      markers: {
        size: 4,
        hover: {
          size: 8,
        },
      },
    };
  }

  //loading the data
  async loadChartData(): Promise<void> {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);
    
    const labels = ['BI_ENGINEER', 'DATA_ENGINEER', 'IRRELEVANT'];

    for (const label of labels) {
      const labelData: LabelData = await this.data.getDataBetween(tenDaysAgo, today, label);
      const datapoints: number[] = [];
      // filling in the days is still janky -> change this by maybe making use of a json or interface or something
      this.days = []

      // Update datapoints array with total for each day
      labelData.data.forEach((dayData: DayData) => {
        datapoints.push(dayData.total);
        this.days.push(dayData.date);
      });

      // Update respective datapoints array based on label
      switch (label) {
        case 'BI_ENGINEER':
          this.datapoints_bi_eng = datapoints;
          break;
        case 'DATA_ENGINEER':
          this.datapoints_data_eng = datapoints;
          break;
        case 'IRRELEVANT':
          this.datapoints_irrelevant = datapoints;
          break;
        default:
          break;
      }
    }
  }
}
