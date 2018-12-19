module.exports = {
  //当然，一些环境变量你可以不使用dotenv,直接使用在这里。
  apps: [{
    name: "koa_bff",
    script: "./index.js",
    env: {
      NODE_ENV: "development",
      PORT: 3000
    },
    env_staging: {
      NODE_ENV: "staging",
      PORT: 80
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 80
    }
  }]
}