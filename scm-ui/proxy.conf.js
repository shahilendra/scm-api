'use strict';

const proxyConfig = [
  {
    context: '/api',
    pathRewrite: { '^/api': '' },
    target: 'http://api.sheelu.com',
    changeOrigin: true,
    secure: false
  }
];

module.exports = proxyConfig;
