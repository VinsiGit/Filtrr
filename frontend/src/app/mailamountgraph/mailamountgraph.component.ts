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
  /*
  datapoints: ApexAxisChartSeries = [];
  */
  datapoints_bi_eng: number[] = [];
  datapoints_data_eng: number[] = [];
  datapoints_irrelevant: number[] = [];
  days: string[] = [];

  constructor(private theme: ThemeService, private route: ActivatedRoute, private data: AnalyticsdataService) {
  }
  
  async ngOnInit(): Promise<void> {
    await this.loadChartData().then(() => {
      this.renderChart();
    });
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
          name: "bi engineer",
          data: this.datapoints_bi_eng,
        },
        {
          name: "data engineer",
          data: this.datapoints_data_eng,
        },
      ],  
      chart: {
        foreColor: this.theme.chart_textcolor,
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
        borderColor: this.theme.chart_gridcolor,
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
            colors: this.theme.chart_axistextcolor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: this.theme.chart_axistextcolor,
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
  async loadChartData(): Promise<void> {
    /*
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);
    */

    const responseData: LabelData = await this.data.getDataBetween(undefined, undefined);
    let responseData_bi_eng: number[] = [];
    let responseData_data_eng: number[] = [];
    let responseData_irrelevant: number[] = [];
    this.days = [];

    responseData.data.forEach((dayData: DayData) => {
      responseData_bi_eng.push(dayData.BI_ENGINEER);
      responseData_data_eng.push(dayData.DATA_ENGINEER);
      responseData_irrelevant.push(dayData.IRRELEVANT);
      this.days.push(dayData.date);
    });

    this.datapoints_bi_eng = responseData_bi_eng;
    this.datapoints_data_eng = responseData_data_eng;
    this.datapoints_irrelevant = responseData_irrelevant;
  }

  /*
  //loading the data
  async loadChartData(): Promise<void> {
    this.datapoints = [];
    this.days = [];
  
    const responseData: LabelData = await this.data.getDataBetween(undefined, undefined);
  
    responseData.data.forEach((dayData: DayData) => {
      const transformedData = responseData.labels.map(label => ({
        name: label.replace('_', ' ').toLowerCase(),
        data: [Number(dayData[label as keyof DayData])]
      }));
      this.datapoints = transformedData;
      console.log(this.datapoints);
      this.days.push(dayData.date);
      console.log(this.days);
    });
  }
  */
}
