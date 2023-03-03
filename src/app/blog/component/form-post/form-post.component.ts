import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/blog/service/blog.service';
import { PostBlog } from '../../../blog/model/post-blog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss'],
})
export class FormPostComponent implements OnInit {
  public formPost!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createFormPost();
  }

  createFormPost() {
    this.formPost = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      body: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  submit() {
    const post: PostBlog = { ...this.formPost.value };
    if (this.formPost.valid) {
      this.blogService.addPost(post).subscribe((save) => {
        this.toastr.success('Post added successfully');
        this.formPost.reset();
        this.router.navigate(['']);
      });
    }
  }
}
