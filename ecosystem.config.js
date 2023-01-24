module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js",
    exec_mode: 'cluster_mode',
    instances: 1,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}