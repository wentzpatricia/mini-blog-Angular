import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/blog/service/blog.service';
import { PostBlog } from '../../../blog/model/post-blog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-edit-post',
  templateUrl: './form-edit-post.component.html',
  styleUrls: ['./form-edit-post.component.scss'],
})
export class FormEditPostComponent implements OnInit {
  public formPost!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
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
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.formPost.valid) {
      this.blogService.editPost(postId, post).subscribe((save) => {
        this.toastr.success('Post edit successfully');
        this.formPost.reset();
      });
    }
  }
}
