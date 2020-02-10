import React, { useState } from 'react';
import { isEmpty } from 'lodash';
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
      `${process.env.SPOTTY_API_URL}/api/search?username=${username}${
        title ? `&track=${title}` : ''
      }${artist ? `&artist=${artist}` : ''}`,
    )
      .then((res) => res.json().then(setSearchTracks))
      .catch(console.log);
  };

  const onClick = async (id) => {
    fetch(`${process.env.SPOTTY_API_URL}/api/suggest`, {
      method: 'POST',
      body: JSON.stringify({ username, trackId: id }),
      mode: 'no-cors',
    })
      .then(() => {
        setTitle('');
        setArtist('');
        setSearchTracks([]);
      })
      .catch(console.log);
  };

  return (
    <section
      className={cn(styles.suggest, className, {
        [styles.noTracks]: isEmpty(searchTracks),
      })}
    >
      <p className={styles.info}>
        Got a tune to recommend to{' '}
        <span className={styles.username}>{username}</span>?
      </p>
      <div>
        <form className={styles.form} onSubmit={search}>
          <Input placeholder={'Title'} value={title} onChange={setTitle} />
          <div style={{ display: 'flex' }}>
            <span className={styles.by}>by</span>
            <Input placeholder={'Artist'} value={artist} onChange={setArtist} />
          </div>
          <button style={{ display: 'none' }} type={'submit'} />
        </form>
        <SearchTracks tracks={searchTracks} onClick={onClick} />
      </div>
    </section>
  );
};

const Input = ({ className, onChange, ...rest }) => {
  return (
    <input
      className={cn(styles.input, className)}
      type={'text'}
      {...rest}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Suggest;
