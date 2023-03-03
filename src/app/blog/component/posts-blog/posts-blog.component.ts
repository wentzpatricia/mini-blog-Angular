import { Component, OnInit } from '@angular/core';
import { PostBlog } from '../../model/post-blog';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-posts-blog',
  templateUrl: './posts-blog.component.html',
  styleUrls: ['./posts-blog.component.scss'],
})
export class PostsBlogComponent implements OnInit {
  public data: PostBlog[] = [];
  public page: number = this.blogService.page;
  public itemsPerPage = this.blogService.itemsPerPage;
  public totalItems = this.blogService.totalItems;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getData().subscribe((res) => {
      this.data = res;
    });
  }

  getPage(page: number) {
    this.blogService.getPage(page).subscribe((res) => {
      this.data = res;
      this.totalItems = res.length;
    });
  }
}
