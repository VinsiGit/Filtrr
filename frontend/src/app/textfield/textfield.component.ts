import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {
  input: string = "";
  text: string = "";
  textBoxResponse: any;

  constructor(private route: ActivatedRoute, private post: PostService) {

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
