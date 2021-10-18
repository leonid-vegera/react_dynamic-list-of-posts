import { request } from './api';

export const getPostComments = postId => (
  request(`comments?postId=${postId}`)
);

export const removeComment = commentId => (
  request(`comments/${commentId}`, { method: 'DELETE' })
);

const post = (url, data) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
);

export const createComment = (postId, name, email, body) => (
  post('/comments', {
    postId,
    name,
    email,
    body,
  })
);
