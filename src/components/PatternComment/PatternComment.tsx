import React from 'react';
import styles from './PatternComment.module.scss';

interface IPropsPatternComment {
  comment: IComment[];
}
interface IComment {
  date: Date;
  message: string;
}
const PatternComment: React.FC<IPropsPatternComment> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <h3 className={styles.user}>
        Анонимный пользователь <span>{comment.date}</span>
      </h3>
      <p className={styles.message}>{comment.message.comment}</p>
    </div>
  );
};

export default PatternComment;
