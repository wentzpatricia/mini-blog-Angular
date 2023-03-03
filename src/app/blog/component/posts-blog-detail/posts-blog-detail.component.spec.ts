import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../service/blog.service';
import { CommentsComponent } from '../comments/comments.component';
import { FormEditPostComponent } from '../form-edit-post/form-edit-post.component';
import { ModalComponent } from '../modal/modal.component';
import { PostsBlogDetailComponent } from './posts-blog-detail.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MOCK_POST_1 } from '../../service/blog.mock';
import { PostBlog } from '../../model/post-blog';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormCommentComponent } from '../form-comment/form-comment.component';
import { ToastrModule } from 'ngx-toastr';

describe('PostsBlogDetailComponent', () => {
  let component: PostsBlogDetailComponent;
  let fixture: ComponentFixture<PostsBlogDetailComponent>;
  let route: ActivatedRoute;
  let service: BlogService;
  const mockPost: PostBlog = MOCK_POST_1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostsBlogDetailComponent,
        CommentsComponent,
        ModalComponent,
        FormEditPostComponent,
        FormCommentComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        ToastrModule.forRoot(),
      ],
      providers: [BlogService, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsBlogDetailComponent);
    service = TestBed.inject(BlogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should call ngOnInit() and return post detail', () => {
    spyOn(service, 'getPostById').and.returnValue(of(mockPost));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getPostById).toHaveBeenCalledOnceWith(null);
    expect(component.detailPost).toEqual(mockPost);

    expect(component.detailPost.userId).toEqual(1);
    expect(component.detailPost.id).toEqual(1);
    expect(component.detailPost.title).toEqual('Title 01');
    expect(component.detailPost.body).toEqual('Body 01');
  });

  it('(I) should call ngOnInit() and return post detail', () => {
    spyOn(service, 'getPostById').and.returnValue(of(mockPost));

    component.ngOnInit();
    fixture.detectChanges();

    let postId =
      fixture.debugElement.nativeElement.querySelectorAll('.posts-detail__id');
    expect(postId[0].textContent).toEqual('1');

    let postTitle = fixture.debugElement.nativeElement.querySelectorAll(
      '.posts-detail__title'
    );
    expect(postTitle[0].textContent).toEqual('Title 01');

    let postBody = fixture.debugElement.nativeElement.querySelectorAll(
      '.posts-detail__body'
    );
    expect(postBody[0].textContent).toEqual('Body 01');
  });
});
