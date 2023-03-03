import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../service/blog.service';
import { Comment } from '../../model/comment';
import { of } from 'rxjs';
import { FormCommentComponent } from './form-comment.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormCommentComponent', () => {
  let component: FormCommentComponent;
  let fixture: ComponentFixture<FormCommentComponent>;
  let service: BlogService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCommentComponent],
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

    fixture = TestBed.createComponent(FormCommentComponent);
    service = TestBed.inject(BlogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should create form correctly', () => {
    component.createForm();
    fixture.detectChanges();

    expect(component.formComment.value.name).toEqual('');
    expect(component.formComment.value.email).toEqual('');
    expect(component.formComment.value.body).toEqual('');
  });

  it('(U) shold requied valid name', () => {
    component.formComment.setValue({
      name: 'a',
      email: 'email@email.com',
      body: 'body message here',
    });
    expect(component.formComment.valid).not.toBeTruthy();
  });

  it('(U) should required valid email', () => {
    component.formComment.setValue({
      name: 'Lucas',
      email: 'invalidemail',
      body: 'body message here',
    });
    expect(component.formComment.valid).not.toBeTruthy();
  });

  it('(U) should required valid body', () => {
    component.formComment.setValue({
      name: 'Lucas',
      email: 'email@email.com',
      body: 'b',
    });
    expect(component.formComment.valid).not.toBeTruthy();
  });

  it('(U) should be valid if form value is valid', () => {
    component.formComment.setValue({
      name: 'Lucas',
      email: 'email@email.com',
      body: 'body message here',
    });
    expect(component.formComment.valid).toBeTruthy();
  });

  it('(U) should call submit() and add new comment', () => {
    const comment: Comment = {
      name: 'New Nome',
      email: 'newemail@email.com',
      body: 'New Body',
    };

    component.formComment.setValue(comment);
    expect(component.formComment.valid).toBeTruthy();
    spyOn(service, 'addComments').and.returnValue(of(comment));

    component.submit();
    fixture.detectChanges();

    expect(service.addComments).toHaveBeenCalledOnceWith(null, comment);
  });
});
