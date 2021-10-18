import React, { useState } from 'react';
import propTypes from 'prop-types';
import { createComment, getPostComments } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, postComments, setPostComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearState = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        createComment(postId, name, email, body);
        setPostComments([...postComments, {
          name, email, body, id: Math.random(),
        }]);
        clearState();
        getPostComments(postId);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: propTypes.number.isRequired,
  postComments: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      body: propTypes.string.isRequired,
      email: propTypes.string.isRequired,
    }),
  ).isRequired,
  setPostComments: propTypes.func.isRequired,
};
