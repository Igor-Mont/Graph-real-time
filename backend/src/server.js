const { server } = require('./http');

require('./webSocket');

server.listen(3333, () => console.log('Server is running on port 🔥'));
