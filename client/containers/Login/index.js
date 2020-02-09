import React, { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Hero from '../../components/Hero';
import styles from './styles.scss';

const Login = ({ className, authorizeUrl }) => {
  const {
    query: { code },
    push,
  } = useRouter();

  const [username, setUsername] = useState('');
  const [playlist, setPlaylist] = useState('');

  const images = [
    'https://f4.bcbits.com/img/a0869185133_10.jpg',
    'https://i.scdn.co/image/ab67616d0000b2732aebf42d8901fbcd14c9eca8',
  ];

  const dashify = (string) => string.replace(' ', '-');

  const submit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, playlist, code }),
      mode: 'no-cors',
    })
      .then(() => push(`/playback/${username}`))
      .catch(console.log);
  };

  return (
    <div className={cn(styles.login, className)}>
      {images.map((src, i) => (
        <img className={styles.albumCover} src={src} key={i} />
      ))}

      {code ? (
        <form className={styles.register} onSubmit={submit}>
          <h1>Hello,</h1>
          <input
            className={styles.input}
            name={'username'}
            type={'text'}
            placeholder={'you ;)'}
            value={username}
            onChange={(e) => setUsername(dashify(e.target.value))}
            style={{ width: 130 }}
          />
          <h1>. Drop tunes in </h1>
          <input
            className={styles.input}
            name={'playlist'}
            type={'text'}
            placeholder={'this playlist'}
            value={playlist}
            onChange={(e) => setPlaylist(e.target.value)}
            style={{ width: 250 }}
          />
          <button style={{ display: 'none' }} type={'submit'}>
            Submit
          </button>
        </form>
      ) : (
        <section className={styles.hero}>
          <Hero />
          <a className={styles.spotifyLogin} href={authorizeUrl}>
            Login to Spotify
          </a>
        </section>
      )}
    </div>
  );
};

Login.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/authorize');
  const { authorizeUrl } = await res.json();

  return { authorizeUrl };
};

export default Login;
