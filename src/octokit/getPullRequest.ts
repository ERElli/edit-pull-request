import { ConfigFile, OctokitClient } from '../types';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const getPullRequest = async ({
	configFile,
	octokit,
	prNumber,
}: {
	configFile: ConfigFile,
	octokit: OctokitClient,
	prNumber: number,
}) => {
	core.info('Fetching PR information');
	const {data: info} = await octokit.rest.pulls.get({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
	});

	core.info('Fetching list of updated files')
	const {data: updatedFiles} = await octokit.rest.pulls.listFiles({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
	});

	return {
		info,
		updatedFiles,
	}
}
