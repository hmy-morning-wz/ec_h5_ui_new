import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';

let timer;

export default (props) => {
  const {
    cardImage,
    energyImage,
    onStartAnimation = () => {},
  } = props;

  // 头部背景图
  const backgroundImage = 'https://images.allcitygo.com/20200727143614846tAeQM1.jpg';
  // 中间刷卡成功的图片
  const wordsImage = 'https://images.allcitygo.com/20200727144847091q4ixqQ.png';
  // 人物手臂图片
  const armImage = 'https://images.allcitygo.com/20200727150303032iPTeDs.png';

  const armCode = 'https://images.allcitygo.com/20200727143516619Yuc6EE.png'

  const lightImage = 'https://images.allcitygo.com/20200727151308408hYxAlS.png'
  // 再看一次按钮图片
  const repeatButtonImage = 'https://gw.alipayobjects.com/mdn/rms_88bb4d/afts/img/A*HXkJS5IL2KcAAAAAAAAAAABkARQnAQ';

  const [startAnimation, toggleAnimation] = useState(false);
  const [repeatAnimation, toggleRepeatAnimation] = useState(false);
  const [repeatButtonVisible, toggoleRepeatButton] = useState(false);

  const clearTimer = () => {
    clearTimeout(timer);
  };

  const play = () => {
    const status = !startAnimation;
    clearTimer();
    onStartAnimation(status);
    toggoleRepeatButton(false);
    toggleRepeatAnimation(false);
    toggleAnimation(status);
  };

  const repeatPlay = () => {
    toggleRepeatAnimation(true);
    toggoleRepeatButton(false);
    setTimeout(() => {
      toggleRepeatAnimation(false);
    }, 80);
  }

  // autoplay
  const autoPlayDelay = 1500;
  useEffect(() => {
    timer = setTimeout(play, autoPlayDelay);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startAnimation && !repeatAnimation) {
      timer = setTimeout(() => {
        toggoleRepeatButton(true);
      }, 5800);
    }
    return clearTimer;
  }, [startAnimation, repeatAnimation]);

  return (
    <>
    {
      !startAnimation && <div className={styles.noCardHeight} />
    }
    <div className={classnames(styles.container, startAnimation ? styles.containerAnimation: '')}>
      {
        startAnimation
          ? <div className={styles.animation}>
            <div className={classnames(styles.headerBackgound, startAnimation ? styles.headerBackgoundAnimation : '')} style={{ backgroundImage: `url(${backgroundImage})` }} />
            <img className={classnames(styles.words, startAnimation && !repeatAnimation ? styles.wordsAnimation : '')} src={wordsImage} alt="" />
            <img className={classnames(styles.hands, startAnimation && !repeatAnimation ? styles.handsAnimation : '')} src={armImage} alt="" />
            <img className={classnames(styles.codes, startAnimation && !repeatAnimation ? styles.codesAnimation : '')} src={armCode} alt="" />
            <img className={classnames(styles.light, startAnimation && !repeatAnimation ? styles.lightAnimation : '')} src={lightImage} alt="" />
          </div>
          : <img className={styles.energy} src={energyImage} alt="" />
      }
      {
        startAnimation
          ? <div className={styles.mask} />
          : null
      }
      {
        repeatButtonVisible
          ? <img className={styles.repeat} src={repeatButtonImage} alt="" onClick={repeatPlay}/>
          : null
      }
      <div className={classnames(styles.cardWrapper, startAnimation ? styles.cardWrapperAnimation : '')}>
        <img
          className={styles.card}
          src={cardImage}
          alt=""
          onClick={play}
        />
      </div>
    </div>
    </>
  )
}