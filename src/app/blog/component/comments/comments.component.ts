import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment } from '../../model/comment';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.getCommentsById(id).subscribe((result) => {
      this.comment = result;
    });
  }
}
