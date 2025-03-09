import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../models/post';
import moment from 'moment';

@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post: Post = {} as Post;
  createdAt(time: string) {
    let timeToNow = moment([time]).toNow(true);
    let timeSplit = timeToNow.split('');
    let finalTime;
    if (isNaN(+timeSplit[0]))
      finalTime = timeSplit[2].toUpperCase() + timeSplit.slice(3).join('');
    else
      finalTime = `${timeSplit[0]} ${
        timeSplit[2].toUpperCase() + timeSplit.slice(3).join('')
      }`;

    return finalTime + ' ago';
  }
}
