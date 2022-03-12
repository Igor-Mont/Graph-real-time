const { server } = require('./http');

require('./webSocket');
require('./routes');

server.listen(3333, () => console.log('Server is running on port 3333🔥'));
