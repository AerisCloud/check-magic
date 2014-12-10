var CheckMagic = require('../');

var check = new CheckMagic();

process.send({ getStatus: check.getStatus(), check: check });

process.on('message', function (message) {
	switch (message) {
	case 'die':
		process.exit();
		break;
	case 'getStatus':
		process.send({ getStatus: check.getStatus() });
		break;
	}
});

