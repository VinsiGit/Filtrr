import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  label1color: string = "#6460af";
  label2color: string = "#b872de";
  gridcolor: string = "#dcdcdd";
  textcolor: string = "#8e8ea7";
}