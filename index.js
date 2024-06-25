const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.listen(9000, () => {
    console.log('server started on http://localhost:9000');
})