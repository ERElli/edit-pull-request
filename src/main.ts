import { getCurrentTags } from './utils/getCurrentTags';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { getInputs } from './utils/getInputs';
import { getConfigFile, getPullRequest, updatePullRequest } from './octokit';
import { getTagsToAdd } from './utils/getTagsToAdd';
import { initializeOctokit } from './octokit/octokitClient';

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
			const titleTagConfig = configFile.titleTagConfig;
			const tagWrappers = titleTagConfig.tagWrappers;

			// Get names of files changed in the PR
			const names = pull.updatedFiles.map((item) => {
				return item.filename;
			});
			
			// Parse tags that exists at the beginning of the title
			const title = pull.title;
			const currentTags = getCurrentTags(title, tagWrappers);

			// Parse list of tags to apply
			const tagConfigs = titleTagConfig.tags;
			const tagsToApply = getTagsToAdd(tagConfigs, names, currentTags)

			let tagTitle: string = '';
			tagsToApply.forEach((tag) => {
				tagTitle += `${tagWrappers[0]}${tag}${tagWrappers[1]}`
			})
			const finalTitle = `${tagTitle}${title}`;

			await updatePullRequest(octokit, prNumber, {title: finalTitle});
		}
	} catch (error) {
		// Fail the workflow run if an error occurs
		if (error instanceof Error) core.setFailed(error.message)
	}
}
