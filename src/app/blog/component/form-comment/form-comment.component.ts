import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { Comment } from '../../model/comment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.scss'],
})
export class FormCommentComponent implements OnInit {
  public formComment!: FormGroup;

  @Output() commentValues = new EventEmitter<Comment>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formComment = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
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
    const comment: Comment = { ...this.formComment.value };
    const postID = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.formComment.valid) {
      this.blogService.addComments(postID, comment).subscribe((save) => {
        this.toastr.success('Comment added successfully');
        this.commentValues.emit(comment);
        this.formComment.reset();
      });
    }
  }
}
