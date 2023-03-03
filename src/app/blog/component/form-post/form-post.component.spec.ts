import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PostBlog } from '../../model/post-blog';
import { BlogService } from '../../service/blog.service';
import { of } from 'rxjs';
import { FormPostComponent } from './form-post.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormPostComponent', () => {
  let component: FormPostComponent;
  let fixture: ComponentFixture<FormPostComponent>;
  let service: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPostComponent],
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

    fixture = TestBed.createComponent(FormPostComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BlogService);
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

  it('(U) should required valid title', () => {
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
    const newPost: PostBlog = {
      title: 'Title 01',
      body: 'Body 01',
    };

    component.formPost.setValue({
      title: 'Title 01',
      body: 'Body 01',
    });
    expect(component.formPost.valid).toBeTruthy();
    spyOn(service, 'addPost').and.returnValue(of(newPost));

    component.submit();
    fixture.detectChanges();

    expect(service.addPost).toHaveBeenCalledOnceWith(newPost);
  });
});
