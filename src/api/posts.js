
import { request } from './api';

export const getUsersPosts = userId => (
  request(`posts?userId=${userId}`)
);

export const getPostDetails = postId => (
  request(`posts/${postId}`)
);
