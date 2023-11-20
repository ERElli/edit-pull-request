import * as core from '@actions/core';
import * as github from '@actions/github';
import {getConfigFile, getPullRequest} from './octokit';
import {getInputs} from './utils';
import {titleTag} from './features/titleTag';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
	try {
		// Get action inputs
		const {prNumber, configPath, githubToken} = getInputs();

		// initialize Octokit client
		const octokit = github.getOctokit(githubToken);

		// Fetch config file
		const configFile = await getConfigFile(octokit, configPath);

		// Fetch pull request information
		const pull = await getPullRequest(octokit, prNumber);

		if (configFile.titleTagConfig) {
			await titleTag(configFile.titleTagConfig, octokit, pull);
		}
	} catch (error) {
		// Fail the workflow run if an error occurs
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
	}
}
