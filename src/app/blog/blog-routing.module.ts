import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsBlogDetailComponent } from './component/posts-blog-detail/posts-blog-detail.component';
import { PostsBlogComponent } from './component/posts-blog/posts-blog.component';
import { CommentsComponent } from './component/comments/comments.component';
import { FormPostComponent } from './component/form-post/form-post.component';
import { FormCommentComponent } from './component/form-comment/form-comment.component';

const routes: Routes = [
  {
    path: '',
    component: PostsBlogComponent,
  },

  {
    path: 'details/:id',
    component: PostsBlogDetailComponent,
  },
  {
    path: 'new',
    component: FormPostComponent,
  },
  {
    path: 'comments/:id',
    component: CommentsComponent,
  },
  {
    path: 'comments/:id/new',
    component: FormCommentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
