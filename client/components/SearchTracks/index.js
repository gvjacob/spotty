import React, { Fragment } from 'react';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import styles from './styles.scss';

const SearchTracks = ({ className, tracks, onClick }) => {
  return (
    <div className={cn(styles.searchTracks, className)}>
      {isEmpty(tracks) ? (
        <div className={styles.noTracks}>
          <h3>No Spotify tunes found...</h3>
          <img
            className={styles.cat}
            src={
              'https://render.fineartamerica.com/images/rendered/search/print/images/artworkimages/medium/2/rusty-spotted-cat-illustration-loren-dowding.jpg'
            }
          />
        </div>
      ) : (
        <Fragment>
          {tracks.map(({ id, name, artist, image }) => (
            <button
              className={styles.button}
              onClick={() => onClick(id)}
              key={id}
            >
              <img className={styles.image} src={image} />
              <div className={styles.track}>
                <h3>{name}</h3>
                <div className={styles.artist}>{artist}</div>
              </div>
            </button>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default SearchTracks;
