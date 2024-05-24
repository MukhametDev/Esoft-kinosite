import React from 'react';
import styles from './ErrorPage.module.scss';

interface IPropsErrorPage {}

const ErrorPage: React.FC<IPropsErrorPage> = ({}) => {
  return <div className={styles.text}>Похоже что-то пошло не так!</div>;
};

export default ErrorPage;
