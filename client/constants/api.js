const isClient = () => !!process.browser;

export const AUTHORIZE_API = `${
  isClient() ? process.env.SPOTTY_API_URL : process.env.SSR_SPOTTY_API_URL
}/api/authorize`;

export const REGISTER_API = `${process.env.SPOTTY_API_URL}/api/register`;

export const PLAYBACK_API = `${
  isClient() ? process.env.SPOTTY_API_URL : process.env.SSR_SPOTTY_API_URL
}/api/playback`;
