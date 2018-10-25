var child_process = require("child_process");

function createPattern(path) {
	return {pattern: path, included: true, served: true, watched: false};
}

function getArguments(config) {
	var 
		args = "",
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
	
	Object.keys(config).forEach(function(arg) {
		if (validArguments.indexOf(arg) !== -1) {
			switch(arg) {
				case "daemon" : 
					args += convertArg[arg];
					break;
				case "rest" : 
					args += convertArg[arg];
					break;
				case "verbose" : 
					args += convertArg[arg];
					break;
				default : 
					args += convertArg[arg] + ' ' + config[arg];
			}
		}
	});

	return args;
}

function getDebugEnvVariable(config) {
	return config.debugEnvVariable && config.debugEnvVariable.trim() !== "" ? "export DEBUG='" + config.debugEnvVariable + "'; " : "";
}

function initFirebaseServer(files, config) {
	var fdb;

	function exit() {
		console.error('Received exit signal on main process.');
		if (fdb) {
			fdb.stdin.end();
			fdb.stdout.destroy();
			fdb.stderr.destroy();
		}

		process.exit(0);
	}

	config = config || {};
	config.client = config.client || { firebaseServer: {} };
	config.client.firebaseServer = config.client.firebaseServer || {};
	let enableDebugEnvVariable = getDebugEnvVariable(config.client.firebaseServer);

	fdb = child_process.exec(enableDebugEnvVariable + 'node_modules/.bin/firebase-server' + getArguments(config.client.firebaseServer), function (error, stdout, stderr) {
		if (config.client.firebaseServer.log || config.client.firebaseServer.verbose || enableDebugEnvVariable) {
			console.log("stdout: " + stdout);
			console.log("stderr: " + stderr);
			console.log("error: " + error);
		}
	});
	
	if (config.client.firebaseServer.log || config.client.firebaseServer.verbose || enableDebugEnvVariable) {
		fdb.stdout.on('data', function (data) {
			console.log('stdout: ' + data.toString());
		});

		fdb.stderr.on('data', function (data) {
			console.log('stderr: ' + data.toString());
		});

		fdb.on('exit', function (code) {
			if (code) {
				console.log('child process exited with code ' + code.toString());
			}
		});
	}

	['SIGINT', 'SIGTERM'].forEach(function(signal) {
		process.on(signal, exit);
	});
}

initFirebaseServer.$inject = ['config.files', 'config'];

module.exports = {
  'framework:firebase-server': ['factory', initFirebaseServer]
};
