const dev = {
  api: {
    url: "http://localhost:3002/ppg-api/captions"
  }
};

const prod = {
  api: {
    url: "https://pigpiggo.net/ppg-api/captions"
  }
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...config
};