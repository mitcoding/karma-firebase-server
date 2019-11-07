# karma-firebase-server-plugin

This plugin will start and stop a firebase server for integration testing locally apps that rely on a firebase database connection

## Getting Started

```Shell
npm install cucumber --save-dev
npm install karma --save-dev
npm install karma-cucumber-js-latest --save-dev
```

### Configuring karma.conf.js

```JavaScript
...
frameworks: ['firebase-server'],
...
plugins: [
  ...
  require("karma-firebase-server-plugin")
  ...
],
...
client: { 
  ...
  firebaseServer: {
	port: NUMBER (Optional), 
	name: STRING:LocalServerName (Optional),
	file: STRING:PathToDefaultDatabaseValues.json (Optional),
	rules: STRING:PathToDataBasePermisions.json (Optional),
	secret: STRING (Optional),
	debugEnvVariable: STRING (Optional),
	log: BOOLEAN (Optional),
	verbose: BOOLEAN (Optional)
  }
  ... 
}
...
```

## Argument Options 

[Argument Options](https://github.com/urish/firebase-server#command-line-interface)

## License
Copyright (c) 2018 Timothy Gross.
This project is licensed under the terms of the MIT license.
