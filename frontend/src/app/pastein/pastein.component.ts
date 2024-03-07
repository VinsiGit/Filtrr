import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { PagetitleService } from '../pagetitle.service';

@Component({
  selector: 'app-pastein',
  templateUrl: './pastein.component.html',
  styleUrls: ['./pastein.component.css']
})
export class PasteinComponent {
  input: string = "";
  text: string = "";
  textBoxResponse: any;

  constructor(private route: ActivatedRoute, private post: PostService, private title: PagetitleService) {
  }

  ngOnInit() {
    this.title.pageTitle = "paste-in";
  }

  async submitText() {
    try {
      const response = await this.post.postMail(this.input);
      this.textBoxResponse = response;
      this.text = this.input;
      console.log('Response content:', this.textBoxResponse);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
}
