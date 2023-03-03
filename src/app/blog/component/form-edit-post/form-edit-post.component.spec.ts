import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PostBlog } from '../../model/post-blog';
import { MOCK_UPDATE_POST } from '../../service/blog.mock';
import { BlogService } from '../../service/blog.service';
import { of } from 'rxjs';
import { FormEditPostComponent } from './form-edit-post.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormEditPostComponent', () => {
  let component: FormEditPostComponent;
  let fixture: ComponentFixture<FormEditPostComponent>;
  let service: BlogService;
  const mockUpdatePosts: PostBlog = MOCK_UPDATE_POST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEditPostComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder, BlogService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEditPostComponent);
    service = TestBed.inject(BlogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should create form correctly', () => {
    component.createFormPost();
    fixture.detectChanges();

    expect(component.formPost.value.title).toEqual('');
    expect(component.formPost.value.body).toEqual('');
  });

  it('(U) shold requied valid title', () => {
    component.formPost.setValue({
      title: 'a',
      body: 'body message here',
    });
    expect(component.formPost.valid).not.toBeTruthy();
  });

  it('(U) should required valid body', () => {
    component.formPost.setValue({
      title: 'Blog em angular',
      body: 'b',
    });
    expect(component.formPost.valid).not.toBeTruthy();
  });

  it('(U) should be valid if form value is valid', () => {
    component.formPost.setValue({
      title: 'Blog em angular',
      body: 'body message here',
    });
    expect(component.formPost.valid).toBeTruthy();
  });

  it('(U) should call submit() and edit post', () => {
    component.formPost.setValue({
      title: 'Edit Title 01',
      body: 'Edit Body 01',
    });
    expect(component.formPost.valid).toBeTruthy();
    spyOn(service, 'editPost').and.returnValue(of(mockUpdatePosts));

    component.submit();
    fixture.detectChanges();

    expect(service.editPost).toHaveBeenCalledOnceWith(null, mockUpdatePosts);
  });
});
