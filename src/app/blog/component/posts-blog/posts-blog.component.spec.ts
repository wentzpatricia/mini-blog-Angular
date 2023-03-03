import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../service/blog.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsBlogComponent } from './posts-blog.component';
import { PostBlog } from '../../model/post-blog';
import { MOCK_LIST_POSTS } from '../../service/blog.mock';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostsBlogComponent', () => {
  let component: PostsBlogComponent;
  let fixture: ComponentFixture<PostsBlogComponent>;
  let route: ActivatedRoute;
  let service: BlogService;

  const mockListPosts: Array<PostBlog> = MOCK_LIST_POSTS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsBlogComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [BlogService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsBlogComponent);
    service = TestBed.inject(BlogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should call ngOnInit() and return list of posts', () => {
    spyOn(service, 'getData').and.returnValue(of(mockListPosts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getData).toHaveBeenCalledOnceWith();
    expect(component.data.length).toEqual(5);

    expect(component.data[0].userId).toEqual(1);
    expect(component.data[0].id).toEqual(1);
    expect(component.data[0].title).toEqual('Title 01');
    expect(component.data[0].body).toEqual('Body 01');

    expect(component.data[4].userId).toEqual(5);
    expect(component.data[4].id).toEqual(5);
    expect(component.data[4].title).toEqual('Title 05');
    expect(component.data[4].body).toEqual('Body 05');
  });

  it('(I) should call ngOnInit() and return list of posts', () => {
    spyOn(service, 'getData').and.returnValue(of(mockListPosts));

    component.ngOnInit();
    fixture.detectChanges();

    let posts =
      fixture.debugElement.nativeElement.querySelectorAll('.posts__title');
    expect(posts.length).toBe(5);
    expect(posts[0].textContent).toEqual('Title 01');
    expect(posts[4].textContent).toEqual('Title 05');
  });

  it('(U) should call getPage()', () => {
    spyOn(service, 'getPage').and.returnValue(of(mockListPosts));

    component.getPage(1);
    fixture.detectChanges();

    expect(service.getPage).toHaveBeenCalledOnceWith(1);
    expect(component.data.length).toEqual(5);
    expect(component.data[0].userId).toEqual(1);
    expect(component.data[0].id).toEqual(1);
    expect(component.data[0].title).toEqual('Title 01');
    expect(component.data[0].body).toEqual('Body 01');

    expect(component.data[4].userId).toEqual(5);
    expect(component.data[4].id).toEqual(5);
    expect(component.data[4].title).toEqual('Title 05');
    expect(component.data[4].body).toEqual('Body 05');
  });
});
