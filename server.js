var express = require('express'),
    server = express(),
    fs = require('fs');

server.use('/dist', express.static('dist'));

function generateEnv() {
    var env = '';
    for( key in process.env ) {
        if (process.env.hasOwnProperty(key)) {
            if (key.indexOf( 'SUIENV_' ) === 0 ) {
                env += '' + key + '="' + process.env[key] + '";\n';
            }
        }
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

// redirect to index.html
server.get('/*', function(req, res) {
    res.redirect(301, '/dist/');
});

server.listen(8080);