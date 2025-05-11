import { Component } from '@angular/core';
import { PostsListComponent } from '../../../post/components/posts-list/posts-list.component';
import { CreatePostComponent } from '../../../post/components/create-post/create-post.component';

@Component({
  selector: 'app-home-page',
  imports: [PostsListComponent, CreatePostComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
