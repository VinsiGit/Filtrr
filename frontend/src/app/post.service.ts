import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { 
  }

  async postMail(mail: string): Promise<any> {
    const headers = new HttpHeaders().set('source', 'site');
    const options = { headers: headers };
    return await lastValueFrom(this.http.post("https://s144272.devops-ap.be/api/site", { content: mail }, options));
  }
}
