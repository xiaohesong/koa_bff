module.exports = {
  //当然，一些环境变量你可以不使用dotenv,直接使用在这里。
  apps: [{
    name: "koa_bff",
    script: "./index.js",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    env: {
      NODE_ENV: "development",
      PORT: 8080,
      name: 'koa_bff_development'
    },
    env_staging: {
      NODE_ENV: "staging",
      PORT: 80,
      name: 'koa_bff_staging'
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 80,
      name: 'koa_bff_production'
    }
  }]
}