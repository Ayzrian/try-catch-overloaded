# try-catch-overloaded
This package contains function for overloading Try/Catch statements.

### Examples
```javascript
const { Try } = require('try-catch-overloaded');

Try(() => {
	// ... do something here.
}).catch(UserNotFoundError, (error) => {
	// ... Handle user not found error.
}).catch(BadArgumentsError, (error) => {
	// ... Handle bad arguments error.
}).catch((error) => {
	// ... Handle every other error that does not matches previus handlers
// Note here you should add () to execute returned function.
})()
```


### TODO List
- Migrate this to TS and write types.
- Add handlers for Async code.
- Write better documentation.
