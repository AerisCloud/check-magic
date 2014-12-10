var fs = require('fs');
var path = require('path');

var OFFLINE = 'maintenance';
var ONLINE = 'production';
var PATH = path.join('.', 'check.txt');

function CheckMagic(options) {
	options = options || {};

	this.offline = options.offline || OFFLINE;
	this.online = options.online || ONLINE;
	this.path = options.path || PATH;

	this.leave = !!options.leave;
	this.startOffline = !!options.startOffline;

	var that = this;

	process.once('exit', function () {
		that.goOffline();
	});

	if (!this.startOffline) {
		this.goOnline();
	}
}

CheckMagic.prototype.goOffline = function () {
	if (this.getStatus() === this.offline) {
		return;
	}

	if (!this.keep && fs.existsSync(this.path)) {
		return fs.unlinkSync(this.path);
	}

	fs.writeFileSync(this.path, this.offline);
};

CheckMagic.prototype.goOnline = function () {
	if (this.getStatus() === this.online) {
		return;
	}

	fs.writeFileSync(this.path, this.online);
};

CheckMagic.prototype.getStatus = function () {
	var status = this.offline;

	try {
		status = fs.readFileSync(this.path, 'utf8');
	} catch (e) {

	}

	return status;
};

module.exports = CheckMagic;
