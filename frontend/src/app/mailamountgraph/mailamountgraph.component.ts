import { Component, ViewChild } from "@angular/core";
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

export class MailamountgraphComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;


  constructor(private theme: ThemeService) {
    this.chartOptions = {
      series: [
        {
          name: "irrelevant",
          data: [14, 18, 8, 5, 7, 2, 1],
        },
        {
          name: "bi-engineer",
          data: [8, 12, 12, 13, 10, 8, 12],
        },
        {
          name: "data-engineer",
          data: [4, 17, 2, 1, 8, 8, 5],
        },
      ],
      chart: {
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
        categories: ["ma", "di", "woe", "do", "vrij", "zat", "zon"],
        axisBorder: {
          show: false,
        },
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
      markers: {
        size: 4,
        hover: {
          size: 8,
        },
      },
    };
  }
}
