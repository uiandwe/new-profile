module.exports = {
    apiConnect: function () {
        return function (req, res, next) {
            res.set('cache-control', 'no-cache, no-store, must-revalidate');
            res.set('pragma',  'no-cache');
            res.set('expires', 0);
            next();
        };
    }
};
