import React, { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Hero from '../../components/Hero';
import styles from './styles.scss';

const Login = ({ className, authorizeUrl }) => {
  const {
    query: { code },
  } = useRouter();

  const [username, setUsername] = useState('');

  const images = [
    'https://f4.bcbits.com/img/a0869185133_10.jpg',
    'https://f4.bcbits.com/img/a2234708408_10.jpg',
  ];

  const getInputWidth = () => {
    const length = username.length;
    const defaultWidth = 130;
    const increment = 15;

    if (length <= 3) {
      return defaultWidth;
    } else {
      return defaultWidth - 3 * increment + length * increment;
    }
  };

  const submit = (e) => {
    e.preventDefault();
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
            type={'text'}
            placeholder={'you ;)'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: getInputWidth() }}
          />
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
