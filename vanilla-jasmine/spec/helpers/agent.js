var http = require('http');

request = function(options) {
    var promise = new Promise(function (resolve, reject){

        callback = function(res) {
            var chunks = [];  

            //another chunk of data has been recieved, so append it to `str`
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            // the whole response has been recieved, so we just print it out here
            res.on('end', function () {
                
                var body = '';
                if (chunks.length == 1)
                {
                    body = chunks[0].toString();
                }
                else
                {
                    var totalLength = 0;
                    for(var chunk in chunks) totalLength += chunk.length;

                    var offset = 0;
                    var data = new Buffer(totalLength)
                    for(var chunk in chunks)
                    {
                        chunk.copy(data, offset);
                        offset += chunk.length;
                    }

                    body = data.toString();
                }

                resolve({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    headers: res.headers,
                    body: body
                });
            });

        };

        var req = http.request(options, callback); 
        req.on('error', function(err) {
            reject(err)
        });
        
        req.end();
    });

    return promise;
};


var Agent = function(options) {
 
    var self = this;
    self.options = options || {};
    self.options.port = options.port || 80;
    self.options.host = options.host || options.hostname || options.address || '';
    
    // Handle blank and unspecified ip addresses (default to localhost)
    var map = {
        '': 'localhost',
        '::': 'localhost',
        '0.0.0.0': 'localhost'
    };
    if (map[self.options.host]) {
        self.options.host = map[self.options.host];
    }

    self.get = function(path, options) {
        options = options || {};
        options.method = 'GET';
        options.path = path;
        options.host = self.options.host;
        options.port = self.options.port;

        return request(options);
    }

    return self;
};

module.exports = Agent;
