const { createProxyMiddleware } = require('http-proxy-middleware');
// this file works because react-scripts@2.0.0 and higher
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};