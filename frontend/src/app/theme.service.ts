import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  gridcolor: string = "#f2f2f2";
  label1color: string = "#b872de";
  label2color: string = "#6460af";
  textcolor: string = "#8e8ea7";
  irrelevant_color: string = '#46494c'
}