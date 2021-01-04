require('dotenv').config();

const app = require('./server');
require('./database.js')

app.listen(app.get('port'), ()=> {
	console.log('setver on port', app.get('port'));
});
