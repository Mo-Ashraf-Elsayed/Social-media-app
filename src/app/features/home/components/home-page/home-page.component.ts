import { Component } from '@angular/core';
import { PostsListComponent } from '../../../post/components/posts-list/posts-list.component';

@Component({
  selector: 'app-home-page',
  imports: [PostsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
