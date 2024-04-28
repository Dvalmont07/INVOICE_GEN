// custom-headers-middleware.js
function customHeadersMiddleware(req, res, next) {
    // Adicione os cabeçalhos personalizados aqui
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';");
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('dva-Zorea-dom', 'DENY');
    // Adicione mais cabeçalhos personalizados conforme necessário

    next();
}

module.exports = customHeadersMiddleware;