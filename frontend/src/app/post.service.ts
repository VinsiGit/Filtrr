import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { 
  }

  async postMail(mail: string) {
    await lastValueFrom(this.http.post("https://s144272.devops-ap.be/api/site", { content: mail }))
  }
}
