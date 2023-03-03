import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PostBlog } from '../model/post-blog';
import { Comment } from '../model/comment';
import {
  MOCK_POST_1,
  MOCK_LIST_POSTS,
  MOCK_UPDATE_POST,
  MOCK_COMMENTS,
} from './blog.mock';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogService', () => {
  let service: BlogService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let route: ActivatedRoute;
  const URL = 'https://jsonplaceholder.typicode.com/';

  const mockListPosts: Array<PostBlog> = MOCK_LIST_POSTS;
  const mockSinglePost: PostBlog = MOCK_POST_1;
  const mockUpdatedPost: PostBlog = MOCK_UPDATE_POST;
  const mockComments: Array<Comment> = MOCK_COMMENTS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BlogService);
    route = TestBed.inject(ActivatedRoute);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) should be list all posts', (done) => {
    service.getData().subscribe((data: Array<PostBlog>) => {
      expect(data[0].userId).toEqual(1);
      expect(data[0].id).toEqual(1);
      expect(data[0].title).toEqual('Title 01');
      expect(data[0].body).toEqual('Body 01');

      expect(data[4].userId).toEqual(5);
      expect(data[4].id).toEqual(5);
      expect(data[4].title).toEqual('Title 05');
      expect(data[4].body).toEqual('Body 05');

      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts?page=1&size=10`);
    req.flush(mockListPosts);
    expect(req.request.method).toEqual('GET');
  });

  it('(U) should be list post by id', (done) => {
    service.getPostById('1').subscribe((data) => {
      expect(data).toEqual(mockSinglePost);
      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts/1`);
    req.flush(mockSinglePost);
    expect(req.request.method).toEqual('GET');
  });

  it('(U) shoudl add a new post', (done) => {
    const newPost: PostBlog = {
      userId: 1,
      id: 1,
      title: 'New Title 01',
      body: 'New Body 01',
    };

    service.addPost(newPost).subscribe((data) => {
      expect(data).toEqual(newPost);
      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newPost);

    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: newPost,
    });
    req.event(expectedResponse);
  });

  it('(U) should edit a post', (done) => {
    service.editPost('1', mockSinglePost).subscribe((data) => {
      expect(data).toEqual(mockUpdatedPost);
      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts/1`);
    req.flush(mockUpdatedPost);
    expect(req.request.method).toEqual('PUT');
  });

  it('(U) should be list comments by id', (done) => {
    service.getCommentsById('1').subscribe((data) => {
      expect(data[0].postID).toEqual(1);
      expect(data[0].id).toEqual(1);
      expect(data[0].name).toEqual('Nome 01');
      expect(data[0].email).toEqual('email1@email.com');
      expect(data[0].body).toEqual('Body 01');

      expect(data[4].postID).toEqual(1);
      expect(data[4].id).toEqual(5);
      expect(data[4].name).toEqual('Nome 05');
      expect(data[4].email).toEqual('email5@email.com');
      expect(data[4].body).toEqual('Body 05');

      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts/1/comments`);
    req.flush(mockComments);
    expect(req.request.method).toEqual('GET');
  });

  it('(U) shoudl add a new comment', (done) => {
    const newComment: Comment = {
      postID: 1,
      id: 1,
      name: 'New Nome',
      email: ' newemail@email.com',
      body: 'New Body',
    };

    service.addComments('1', newComment).subscribe((data) => {
      expect(data).toEqual(newComment);
      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts/1/comments`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newComment);

    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: newComment,
    });
    req.event(expectedResponse);
  });

  it('(U) should be list posts by page', (done) => {
    service.getPage(1).subscribe((data: Array<PostBlog>) => {
      expect(data[0].userId).toEqual(1);
      expect(data[0].id).toEqual(1);
      expect(data[0].title).toEqual('Title 01');
      expect(data[0].body).toEqual('Body 01');

      expect(data[4].userId).toEqual(5);
      expect(data[4].id).toEqual(5);
      expect(data[4].title).toEqual('Title 05');
      expect(data[4].body).toEqual('Body 05');

      done();
    });

    const req = httpTestingController.expectOne(`${URL}posts?page=1&size=10`);
    req.flush(mockListPosts);
    expect(req.request.method).toEqual('GET');
  });
});
