import * as core from '@actions/core';
import * as github from '@actions/github';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
	try {
		const prNumber = parseInt(core.getInput('pr-number'));
		const configPath = core.getInput('config-path');
		const token = core.getInput('repo-token');

		core.info(`prNumber: ${prNumber}`)
		core.info(`configPath: ${configPath}`)
		core.info(`token: ${token}`)

		const client = github.getOctokit(token);
		const pull = await client.rest.pulls.get({
			owner: github.context.repo.owner,
			repo: github.context.repo.repo,
			pull_number: prNumber,
		});

		console.dir({pull}, {depth: 50});
	} catch (error) {
		// Fail the workflow run if an error occurs
		if (error instanceof Error) core.setFailed(error.message)
	}
}
