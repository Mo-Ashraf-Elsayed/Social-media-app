import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/posts-res';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts-list',
  imports: [PostComponent, InfiniteScrollDirective],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(PostsService);
  posts: Post[] = [];
  limit: number = 40;
  page: number = 1;
  unSubscribePosts: Subscription = new Subscription();
  getPosts(): void {
    this.unSubscribePosts = this.postsService
      .getAllPosts(this.limit, this.page)
      .subscribe({
        next: (res) => {
          this.posts.push(...res.posts);
        },
      });
    this.page = this.page + 1;
  }
  ngOnInit(): void {
    this.getPosts();
  }
  ngOnDestroy(): void {
    this.unSubscribePosts.unsubscribe();
  }
}
