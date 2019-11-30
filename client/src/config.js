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

const config =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? dev : prod;

export default {
  // Add common config values here
  ...config
};
