

function Try(functionExecutor) {
    const errorHandlers = [];

    const execute = function () {
        try {
            functionExecutor();
        } catch (e) {
            for (const handlerInformation of errorHandlers) {
                if (e instanceof handlerInformation.errorClass) {
                    handlerInformation.errorHandler(e);
                }
            }
        }
    }

    execute.catch = function(errorClass, errorHandler) {
        if (errorHandler === undefined) {
            errorHandlers.push({
                errorClass: Error,
                errorHandler: errorClass,
                async: false,
            });
        } else {
            errorHandlers.push({
                errorClass,
                errorHandler,
                async: false,
            })
        }

        return execute;
    }

    // We can add delayed execution here. E.g. if Execute function will pass all arguments to the
    // function executor. :)
    return execute;
}

module.exports = {
    Try,
}
