import React from 'react';
import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import styles from './Swiper.module.scss';

register();

interface IData {
  Poster: string;
  Title: string;
}
interface IPropsSwiper {
  data: IData[];
}

const Swiper: React.FC<IPropsSwiper> = ({ data }) => {
  const swiperElRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('swiperprogress', (e) => {
      const [swiper, progress] = e.detail;
    });

    swiperElRef.current.addEventListener('swiperslidechange', (e) => {});
  }, []);

  const handleClick = (id: string) => {
    navigate(`/film/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.swiperWrapper}>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="4"
        navigation="true"
        pagination="true"
        scrollbar="true"
        space-between="20"
      >
        {data &&
          data.map((item) => {
            return (
              <swiper-slide key={item.imdbID}>
                <div className={styles.slide}>
                  <img className={styles.img} src={item.Poster} alt="photo" />
                  <h3
                    onClick={() => handleClick(item.imdbID)}
                    className={styles.link}
                  >
                    {item.Title}
                  </h3>
                </div>
              </swiper-slide>
            );
          })}
      </swiper-container>
    </div>
  );
};
export default Swiper;
