import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty } from 'lodash';
import cn from 'classnames';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

import Suggest from '../../components/Suggest';
import styles from './styles.scss';

const Playback = ({ className, playback }) => {
  const {
    query: { username },
  } = useRouter();

  const [suggestMode, setSuggestMode] = useState(false);

  const cssSuggestMode = { [styles.suggestMode]: suggestMode };

  return isEmpty(playback) ? null : (
    <div className={cn(styles.playback, className)}>
      <Suggest
        className={cn(styles.suggest, cssSuggestMode)}
        username={username}
      />
      <img className={styles.image} src={playback.image} />
      <div className={cn(styles.playbackCard, cssSuggestMode)}>
        <div className={styles.playbackStatus}>
          {playback.isPlaying ? 'Listening to' : 'Recently listened to'}
        </div>
        <h1>{playback.name}</h1>
        <h2 className={styles.artist}>{playback.artist}</h2>
      </div>
      <div className={cn(styles.spottyGraphic, cssSuggestMode)}>
        <div className={styles.spo}>
          <span>{`${username}'s`}</span>
          <h1>SPO</h1>
        </div>
        <h1 className={styles.tty}>TTY</h1>
      </div>
      <CircularButton
        onClick={() => setSuggestMode(!suggestMode)}
        suggestMode={suggestMode}
      />
    </div>
  );
};

Playback.getInitialProps = async (ctx) => {
  const { username } = ctx.query;
  const res = await fetch(
    `${process.env.SPOTTY_API_URL}/api/playback/${username}`,
  );
  const json = await res.json();

  return { username, playback: json };
};

const CircularButton = ({ className, onClick, suggestMode }) => {
  return (
    <aside className={cn(styles.circularButton, className)} onClick={onClick}>
      <button onClick={onClick}>
        {suggestMode ? (
          <Fragment>
            <div>Back</div>
          </Fragment>
        ) : (
          <Fragment>
            <span>Got a</span>
            <span>Tune?</span>
          </Fragment>
        )}
      </button>
    </aside>
  );
};

export default Playback;
