import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  gridcolor: string = "#f2f2f2";
  label1color: string = "#6460af";
  label2color: string = "#b872de";
  textcolor: string = "#8e8ea7";
  axistextcolor: string = "#8e8ea7";
  irrelevant_color: string = '#7961f1'
}