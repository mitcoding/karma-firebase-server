var child_process = require("child_process");
var path = require("path");

function createPattern(path) {
	return {pattern: path, included: true, served: true, watched: false};
}

function getArguments(config) {
	var 
		args = getDebugEnvVariable(config),
		validArguments = [
			"address",
			"rest",
			"verbose",
			"port",
			"daemon",
			"pid",
			"name",
			"data",
			"file",
			"rules",
			"secret"
		],
		convertArg = {
			"address": " -a",
			"rest": " -e",
			"verbose": " -v",
			"port": " -p",
			"daemon": " -b",
			"pid": " --pid",
			"name": " -n",
			"data": " -d",
			"file": " -f",
			"rules": " -r",
			"secret": " -s"
		}
	;
	
	args.push(path.join(process.cwd(), "node_modules", ".bin", "firebase-server") );
	Object.keys(config).forEach(function(arg) {
		if (validArguments.indexOf(arg) !== -1) {
			switch(arg) {
				case "daemon" :
				case "rest" : 
				case "verbose" : 
					args.push((convertArg[arg] + "").trim() );
					break;
				default : 
					args.push((convertArg[arg] + "").trim() );
					args.push((config[arg] + "").trim() );
			}
		}
	});
	
	return args;
}

function getDebugEnvVariable(config) {
	if (config.debugEnvVariable && config.debugEnvVariable.trim() !== "") {
		return [path.join(process.cwd(), "node_modules", ".bin", "cross-env"), "DEBUG='" + config.debugEnvVariable + "'"];
	}

	return [""];
}

function initFirebaseServer(files, config) {
	var fdb;

	function exit() {
		console.error('Received exit signal on main process.');
		if (fdb) {
			fdb.stdin.end();
			fdb.stdout.destroy();
			fdb.stderr.destroy();
			fdb.kill('SIGINT');
		}

		process.exit(0);
		fdb = null;
		return true;
	}

	config = config || {};
	config.client = config.client || { firebaseServer: {} };
	config.client.firebaseServer = config.client.firebaseServer || {};

	fdb = child_process.spawn("node", getArguments(config.client.firebaseServer) );
	
	if (config.client.firebaseServer.log || config.client.firebaseServer.verbose || enableDebugEnvVariable) {
		fdb.stdout.on('data', function (data) {
			console.log('stdout: ' + data.toString());
		});

		fdb.stderr.on('data', function (data) {
			console.log('stderr: ' + data.toString());
		});

		fdb.on('exit', function (code) {
			if (code) {
				console.log('child process exited with code ' + code.toString() );
			}
		});
	}

	['exit', 'SIGINT', 'SIGTERM'].forEach(function(signal) {
		process.on(signal, exit);
	});
}

initFirebaseServer.$inject = ['config.files', 'config'];

module.exports = {
  'framework:firebase-server': ['factory', initFirebaseServer]
};
