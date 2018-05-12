var gets = {};

gets.validate = function () {
    return function (req, res, next) {
        next();

    };
};


gets.setParameter = function () {
    return function (req, res, next){
        var fs = require('fs');

        var filePath = './static/crud.txt';
        fs.readFile(filePath, 'utf8', function(err, data) {

            var context = JSON.parse(data);

            req.data = [];
            for(var i=0; i<context.context.length; i++){

                console.log("context.context[i].body.indexOf(req.query.body)", context.context[i].body.indexOf(req.query.body))
                if(context.context[i].body && context.context[i].body.indexOf(req.query.body) > -1){
                    req.data.push(context.context[i]);

                }
            }

            next();

        });
    }
};

gets.supplement = function () {
    return function (req, res, next) {
        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = gets;
