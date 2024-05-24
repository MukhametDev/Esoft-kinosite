import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PatternComment from '../PatternComment/PatternComment';
import styles from './Comments.module.scss';

interface IPropsComments {}

const Comments: React.FC<IPropsComments> = ({}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comment);
  console.log(comments);
  return (
    <div className={styles.comments}>
      {comments &&
        comments.map((comment) => {
          return <PatternComment comment={comment} />;
        })}
    </div>
  );
};

export default Comments;
