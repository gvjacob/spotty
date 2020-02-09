import React, { useState } from 'react';
import cn from 'classnames';
import fetch from 'isomorphic-unfetch';

import SearchTracks from '../SearchTracks';
import styles from './styles.scss';

const Suggest = ({ className, username }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [searchTracks, setSearchTracks] = useState([]);

  const search = async (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:3000/api/search?username=${username}${
        title ? `&track=${title}` : ''
      }${artist ? `&artist=${artist}` : ''}`,
    )
      .then((res) => res.json().then(setSearchTracks))
      .catch(console.log);
  };

  const onClick = async (id) => {
    fetch(`http://localhost:3000/api/suggest`, {
      method: 'POST',
      body: JSON.stringify({ username, trackId: id }),
    })
      .then(console.log)
      .catch(console.log);
  };

  return (
    <section className={cn(styles.suggest, className)}>
      <p className={styles.info}>
        Got a song to recommend to{' '}
        <span className={styles.username}>{username}</span>?
      </p>
      <form onSubmit={search}>
        <input
          type={'text'}
          placeholder={'Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Artist'}
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button style={{ display: 'none' }} type={'submit'} />
      </form>
      <SearchTracks tracks={searchTracks} onClick={onClick} />
    </section>
  );
};

export default Suggest;
