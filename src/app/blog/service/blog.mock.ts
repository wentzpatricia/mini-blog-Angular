import { PostBlog } from '../model/post-blog';
import { Comment } from '../model/comment';

export const MOCK_LIST_POSTS: Array<PostBlog> = [
  {
    userId: 1,
    id: 1,
    title: 'Title 01',
    body: 'Body 01',
  },
  {
    userId: 2,
    id: 2,
    title: 'Title 02',
    body: 'Body 02',
  },
  {
    userId: 3,
    id: 3,
    title: 'Title 03',
    body: 'Body 03',
  },
  {
    userId: 4,
    id: 4,
    title: 'Title 04',
    body: 'Body 04',
  },
  {
    userId: 5,
    id: 5,
    title: 'Title 05',
    body: 'Body 05',
  },
];

export const MOCK_POST_1: PostBlog = {
  userId: 1,
  id: 1,
  title: 'Title 01',
  body: 'Body 01',
};

export const MOCK_UPDATE_POST: PostBlog = {
  title: 'Edit Title 01',
  body: 'Edit Body 01',
};

export const MOCK_COMMENTS: Array<Comment> = [
  {
    postID: 1,
    id: 1,
    name: 'Nome 01',
    email: 'email1@email.com',
    body: 'Body 01',
  },
  {
    postID: 1,
    id: 2,
    name: 'Nome 02',
    email: 'email2@email.com',
    body: 'Body 02',
  },
  {
    postID: 1,
    id: 3,
    name: 'Nome 03',
    email: 'email3@email.com',
    body: 'Body 03',
  },
  {
    postID: 1,
    id: 4,
    name: 'Nome 04',
    email: 'email4@email.com',
    body: 'Body 04',
  },
  {
    postID: 1,
    id: 5,
    name: 'Nome 05',
    email: 'email5@email.com',
    body: 'Body 05',
  },
];
