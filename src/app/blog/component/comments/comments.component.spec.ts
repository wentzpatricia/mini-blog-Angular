import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../service/blog.service';

import { Comment } from '../../model/comment';
import { CommentsComponent } from './comments.component';
import { of } from 'rxjs';
import { MOCK_COMMENTS } from '../../service/blog.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let route: ActivatedRoute;
  let service: BlogService;
  const mockComments: Array<Comment> = MOCK_COMMENTS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [BlogService],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    service = TestBed.inject(BlogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should call ngOnInit() and return list of comments', () => {
    spyOn(service, 'getCommentsById').and.returnValue(of(mockComments));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getCommentsById).toHaveBeenCalledOnceWith(null);
    expect(component.comment.length).toEqual(5);

    expect(component.comment[0].postID).toEqual(1);
    expect(component.comment[0].id).toEqual(1);
    expect(component.comment[0].name).toEqual('Nome 01');
    expect(component.comment[0].email).toEqual('email1@email.com');
    expect(component.comment[0].body).toEqual('Body 01');

    expect(component.comment[4].postID).toEqual(1);
    expect(component.comment[4].id).toEqual(5);
    expect(component.comment[4].name).toEqual('Nome 05');
    expect(component.comment[4].email).toEqual('email5@email.com');
    expect(component.comment[4].body).toEqual('Body 05');
  });

  it('(I) should call ngOnInit() and return list of comments', () => {
    spyOn(service, 'getCommentsById').and.returnValue(of(mockComments));

    component.ngOnInit();
    fixture.detectChanges();

    let posts =
      fixture.debugElement.nativeElement.querySelectorAll('.comments');
    expect(posts.length).toBe(5);
    expect(posts[0].textContent).toEqual('Nome 01email1@email.comBody 01');
    expect(posts[4].textContent).toEqual('Nome 05email5@email.comBody 05');
  });
});
