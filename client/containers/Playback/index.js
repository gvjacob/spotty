import React from 'react';
import { useRouter } from 'next/router';

const Playback = () => {
  const { query } = useRouter();

  return <div>{query.username}</div>;
};

export default Playback;
