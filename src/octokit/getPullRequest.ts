import { ListFilesReturnType, OctokitClient } from './octokitClient';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const getPullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
): Promise<{title: string, updatedFiles: ListFilesReturnType}> => {
	core.info('Fetching PR information');
	const {data: {title}} = await octokit.rest.pulls.get({
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
		title,
		updatedFiles,
	}
}
