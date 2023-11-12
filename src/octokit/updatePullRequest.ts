import { OctokitClient, PullsUpdateReturnType, PullsUpdateRequestBody } from '../types';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const updatePullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
	body: PullsUpdateRequestBody,
): Promise<PullsUpdateReturnType> => {
	core.debug('updatePullRequest arguments');
	core.debug(JSON.stringify({octokit, prNumber, body}, null, 2));
	core.info('Updating PR');

	const {data} = await octokit.rest.pulls.update({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
		...body,
	});
	return data;
};
