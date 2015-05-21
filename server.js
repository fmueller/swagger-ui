var express = require('express'),
    server = express(),
    fs = require('fs'),
    path = require('path'),
    index = fs.readFileSync('./index.html');

function generateEnv() {
    var env = '';
    for( key in process.env ) {
        if (process.env.hasOwnProperty(key)) {
            if (key.indexOf( 'SUIENV_' ) === 0 ) {
                env += '' + key + '="' + process.env[key] + '";\n';
            }
        }
    }
    // read client configuration from mint
    if (process.env.CREDENTIALS_DIR) {
        var clientConfig = JSON.parse(fs.readFileSync(path.join(process.env.CREDENTIALS_DIR, 'client.json')));
        env += 'SUIENV_OAUTH_CLIENT_ID="' + clientConfig.client_id + '";\n';
    }
    return env;
}

function writeEnv() {
    var env = generateEnv();
    console.log('Current working directory', process.cwd());
    console.log('Current user id', process.getuid());
    fs.writeFileSync('dist/env.js', env );
}

writeEnv();
setInterval(writeEnv, 1000 * 60 * 60);

server.use('/dist', express.static('dist'));

// redirect to index.html
server.get('/*', function(req, res) {
    res
        .append('Content-Type', 'text/html')
        .status(200)
        .send(index);
});

server.listen(8080);