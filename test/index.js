var assert = require('assert');
var fs = require('fs');
var path = require('path');
var fork = require('child_process').fork;

describe('check-magic tests', function () {
	var sampleApp;

	var CHECK_PATH = './check.txt';

	function startApp(onMessage) {
		sampleApp = fork(path.join('test', 'sampleApp.js'));

		sampleApp.on('message', onMessage);
	}

	function closeApp(cb) {
		if (!sampleApp) {
			return cb();
		}

		sampleApp.send('die');
		sampleApp.removeAllListeners('message');

		sampleApp.once('exit', function () {
			setImmediate(cb);
		});

		sampleApp = null;
	}

	function removeCheck() {
		if (fs.existsSync(CHECK_PATH)) {
			fs.unlinkSync(CHECK_PATH);
		}
	}

	before(removeCheck);

	after(closeApp);
	after(removeCheck);


	it('check.txt doesn\'t exist, exists, and then doesn\'t exist', function (done) {
		assert(!fs.existsSync(CHECK_PATH), 'exists before start');

		startApp(function (message) {
			assert(fs.existsSync(CHECK_PATH), 'doesn\'t exist after start');

			closeApp(function () {
				assert(!fs.existsSync(CHECK_PATH), 'exists after close');

				done();
			});
		});
	});
});
