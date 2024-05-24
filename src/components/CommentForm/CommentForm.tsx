import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { register } from 'swiper/element';
import styles from './CommentForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToComment } from './../../features/comment/commentSlice';

interface IPropsCommentForm {}
interface IFormInput {
  comment: string;
}
const CommentForm: React.FC<IPropsCommentForm> = ({}) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comment);
  const onSubmit: SubmitHandler = (data) => {
    const time = new Date().toLocaleTimeString();
    dispatch(addToComment({ message: data, date: time }));
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Напишите свой отзыв"
        {...register('comment', { required: true })}
      />
      <button className={styles.btn} type="submit">
        Отправить
      </button>
    </form>
  );
};

export default CommentForm;
