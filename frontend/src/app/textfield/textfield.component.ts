import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {
  text: string = "";

  constructor(private route: ActivatedRoute, private post: PostService) {

  }
  async submitText() {
    await this.post.postMail(this.text);
    this.text = "";
  }
}
