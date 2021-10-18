import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import './PostsList.scss';

import { getUsersPosts } from '../../api/posts';

export const PostsList = (
  { setUserPosts,
    userPosts,
    selectedUserId,
    onChangePostId,
    selectedPostId },
) => {
  useEffect(() => {
    getUsersPosts(selectedUserId)
      .then(result => setUserPosts(result));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {userPosts.map(({ id, userId, title }) => (
          <li
            key={id}
            className="PostsList__item"
          >
            <div>
              {/* eslint-disable-next-line */}
              <b>[User #{userId}]: </b>
              {title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                onChangePostId(id);
              }}
            >
              {(selectedPostId === id)
                ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: propTypes.number.isRequired,
  setUserPosts: propTypes.func.isRequired,
  userPosts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      userId: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
    }).isRequired,
  ),
  onChangePostId: propTypes.func.isRequired,
  selectedPostId: propTypes.number.isRequired,
};

PostsList.defaultProps = {
  userPosts: [],
};
