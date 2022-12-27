import { createProxyMiddleware } from "http-proxy-middleware";


module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4444',
            changeOrigin: true,
        })
    );
};
