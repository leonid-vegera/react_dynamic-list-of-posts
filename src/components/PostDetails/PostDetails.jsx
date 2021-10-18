import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then((result) => {
        setPostDetails(result);
      });
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then((result) => {
        setPostComments(result);
      });
  }, [selectedPostId]);

  const handleComments = () => (
    setHiddenComments(!hiddenComments)
  );

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length === 0 ? (
          'No comments'
        ) : (
          <button
            type="button"
            className="button"
            onClick={handleComments}
          >
            {hiddenComments ? 'Show ' : 'Hide '}
            {postComments.length}
            {postComments.length === 1 ? ' comment' : ' comments'}
          </button>
        )}

        <ul className="PostDetails__list">
          {!hiddenComments && (
            postComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(comment.id);
                    // как запустить перерендер после удаления??
                    getPostComments(selectedPostId)
                      .then((result) => {
                        setPostComments(result);
                      });
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: propTypes.number.isRequired,
};
