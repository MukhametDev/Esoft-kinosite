import React from 'react';
import CommentForm from '../CommentForm/CommentForm';
import styles from './Comment.module.scss';
import Comments from '../Comments/Comments';

interface IPropsComment {}

const Comment: React.FC<IPropsComment> = ({}) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.feedback}>Отзывы о фильме</h2>
      <CommentForm />
      <Comments />
    </div>
  );
};

export default Comment;
