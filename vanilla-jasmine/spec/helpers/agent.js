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


var Agent = function(server) {

    var agent = this;
    agent._server  = server;
    var address = server.address();
    agent._port = address.port;
    agent._host = address.hostname || address.address;
    
    // Handle unspecified ip addresses (default to localhost)
    if (agent._host === '::' || agent._host === '0.0.0.0')
        agent._host = 'localhost';

    agent.get = function(path, options) {
        var opt = options || {};
        opt.method = 'GET';
        opt.path = path;
        opt.host = agent._host;
        opt.port = agent._port;

        return request(opt);
    }

    return agent;
};

module.exports = Agent;
