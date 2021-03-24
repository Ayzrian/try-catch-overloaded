# try-catch-overloaded
This package contains function for overloading Try/Catch statements.

## Motivation
Adding custom errors requires manually checking which type of error \
we received in a `catch` block, because JS does not have `catch` overload. e.g.
```javascript
class UserNotFoundError extends Error {
    // ... Some implementation;
}

try {
    // ... Some code that can throw UserNotFoundError;
} catch(e) {
    if (e instanceof UserNotFoundError) {
        // ... Custome error handling for this type of errors.
    }
    // ... Some other code;
}
```

This lead to a problem that using custom error classes creates ton of `if` statements if you have \
custom error handling for each class of errors. So goal of this package to solve this problem by \
adding a function wrapper that will handle overloading for `catch` statements in nice and convenient way.


## Try
This function is a wrapper for that adds a way to overload catch statements. \
It will return a function that has method `catch` on it. You can chain the `.catch` calls \
to add an error handler for a particular type of error object. Also, you can add generic \
error handler that will be called if an error was not handled by specific error handlers. \
The function fill return the result returned either by the function passed to the `Try` function call \
or by an error handler, or `undefined` if no value was returned.

```javascript
const { Try } = require('try-catch-overloaded');

const result = Try(() => {
    // ... do something here.
    return 'Result';
}).catch(UserNotFoundError, (error) => {
    // ... Handle user not found error.
    return 'Result for User Not Found Error';
}).catch(BadArgumentsError, (error) => {
    // ... Handle bad arguments error.
}).catch((error) => {
    // ... Handle every other error that does not matches previus handlers
// Note here you should add () to execute returned function.
})();

console.log(result); // either 'Result' or 'Result for User Not Found Error' or undefined;
```

If it can not find appropriate error handler it will just throw the error to outer world.

```javascript
try {
    Try(() => {
    })();
} catch(missConfiguredExecutorError) {
    // It will throw an error if you don't specify at least one error handler. 
}
```


### Dynamic configuration
Because `Try` returns a function you can always add dynamic configuration for `catch` methods. Though \
I personally don't see a practical application of this, but maybe someone will find this useful. \

**Voice of caution:** Don't use this feature, you should always define all possible error handlers, otherwise \
your code is unsafe because you can miss an error due to misconfiguration. Though, you can always rely on generic error handler. 
 
```javascript
const executor = Try(() => {
    // ... some code
});

executor.catch(AlwaysAppearingError, (error) => {
    // Handle error/
})

if (needToHandleUserError) {
    executor.catch(UserError, (userError) => {
        // ... handle error.
    })
}

if (needToHandleRandomError) {
    executor.catch(RandomError, (randomError) => {
        // ... handle error;
    });
}

```


## TODO List
- Migrate this to TS and write types.
- Add handlers for Async code.
- Write better documentation.
- Write example for usage as a callback.
- Add parameters validation
