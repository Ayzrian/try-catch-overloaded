
class MisConfiguredExecutorError extends Error {
	constructor() {
		super('Try executor was mis-configured! You must specify at least one error handler!');
	}
}

module.exports = {
	MisConfiguredExecutorError,
};
