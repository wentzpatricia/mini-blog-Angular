import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsBlogComponent } from './component/posts-blog/posts-blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsBlogDetailComponent } from './component/posts-blog-detail/posts-blog-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './component/comments/comments.component';
import { FormPostComponent } from './component/form-post/form-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCommentComponent } from './component/form-comment/form-comment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from './component/modal/modal.component';
import { FormEditPostComponent } from './component/form-edit-post/form-edit-post.component';

@NgModule({
  declarations: [
    PostsBlogComponent,
    PostsBlogDetailComponent,
    CommentsComponent,
    FormPostComponent,
    FormCommentComponent,
    ModalComponent,
    FormEditPostComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgxPaginationModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class BlogModule {}
