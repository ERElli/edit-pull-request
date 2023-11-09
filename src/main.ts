import { getCurrentTags } from './utils/getCurrentTags';
import * as core from '@actions/core';
import { getInputs } from './utils/getInputs';
import { getConfigFile, getPullRequest, updatePullRequest } from './octokit';
import { getTagsToAdd } from './utils/getTagsToAdd';
import { initializeOctokit } from './octokit/octokitClient';
import { transformTagConfigs } from './utils/transformTagConfigs';
import { titleTag } from './features/titleTag/titleTag';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
	try {
		// Get action inputs
		const {prNumber, configPath, token} = getInputs();

		// initialize Octokit client
		const octokit = initializeOctokit(token);

		// Fetch config file
		const configFile = await getConfigFile(octokit, configPath);

		// Fetch pull request information
		const pull = await getPullRequest(octokit, prNumber);

		if (configFile.titleTagConfig) {
			titleTag(configFile.titleTagConfig, octokit, pull);
		}
	} catch (error) {
		// Fail the workflow run if an error occurs
		if (error instanceof Error) core.setFailed(error.message)
	}
}
