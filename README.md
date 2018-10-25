# karma-cucumber-js-latest

In contrast to other adapters this one supports the latest version of Cucumber.js (5.0.2). The minimum supported Karma is 1.3.0. The minimum Supported Cucumber.js is 3.0.5. This adapter does not include Cucumber.js or Karma.js, because they are peer dependencies.

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
