import * as core from '@actions/core';

export const getInputs = () => ({
	prNumber: parseInt(core.getInput('prNumber', {required: true})),
	configPath: core.getInput('configPath'),
	githubToken: core.getInput('githubToken'),
});
