import * as core from '@actions/core';
import * as github from '@actions/github';
import {ListFilesReturnType, OctokitClient, PullsGetReturnType} from '../types';

export const getPullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
): Promise<{info: PullsGetReturnType, updatedFiles: ListFilesReturnType}> => {
	core.debug('getPullRequest arguments');
	core.debug(JSON.stringify({octokit, prNumber}, null, 2));
	core.info('Fetching PR information');
	const {data: info} = await octokit.rest.pulls.get({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
	});

	core.info('Fetching list of updated files');
	const {data: updatedFiles} = await octokit.rest.pulls.listFiles({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
	});

	return {
		info,
		updatedFiles,
	};
};
