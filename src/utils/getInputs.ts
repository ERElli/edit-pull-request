import * as core from '@actions/core';

export const getInputs = () => ({
	prNumber: parseInt(core.getInput('pr-number')),
	configPath: core.getInput('config-path'),
	token: core.getInput('repo-token'),
});
