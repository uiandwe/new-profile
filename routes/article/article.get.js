var get = {};

get.validate = function () {
    return function (req, res, next) {

        next();
        // req.models.test.findById(req.params.id, function(status, data){
        //     var testData = data;
        //     req.data = data;
        //     console.log(testData.body);
        //     next();
        // });
    };
};


get.setParameter = function () {
    return function (req, res, next){
        var filePath = './static/crud.txt';

        var fs = require('fs')
        fs.readFile(filePath, 'utf8', function(err, data) {

            var context = JSON.parse(data);

            var exist = false;

            for(var i=0; i<context.context.length; i++){
                if(context.context[i].id == req.params.id){
                    req.data = context.context[i];

                    exist = true;
                    next();
                }
            }

            if(exist == false){
                res.set('cache-control', 'no-cache, no-store, must-revalidate');
                res.set('pragma',  'no-cache');
                res.set('expires', 0);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');

                return res.end(JSON.stringify({data:  '데이터 없음' }));
            }

        });
    }
};

get.supplement = function () {
    return function (req, res, next) {

        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = get;
