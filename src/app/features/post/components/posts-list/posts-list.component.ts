import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts-list',
  imports: [PostComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  posts: Post[] = [];
  unSubscribePosts: Subscription = new Subscription();
  getAllPosts(): void {
    this.unSubscribePosts = this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res.posts;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getAllPosts();
  }
}
