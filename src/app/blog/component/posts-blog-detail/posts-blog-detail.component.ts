import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostBlog } from '../../model/post-blog';
import { BlogService } from '../../service/blog.service';
import { Comment } from '../../model/comment';

@Component({
  selector: 'app-posts-blog-detail',
  templateUrl: './posts-blog-detail.component.html',
  styleUrls: ['./posts-blog-detail.component.scss'],
})
export class PostsBlogDetailComponent implements OnInit {
  public detailPost!: PostBlog;
  public newComment!: Comment;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.getPostById(id).subscribe((result) => {
      this.detailPost = result;
    });
  }

  reciverSubmit(commentValues: Comment) {
    this.newComment = commentValues;
  }
}
