import { prPatchBody, OctokitClient, PullsUpdateReturnType} from '../types';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const updatePullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
	body: prPatchBody
): Promise<PullsUpdateReturnType> => {
	core.info('Updating PR');

	// console.dir({
	// 	prNumber,
	// 	body,
	// }, {depth: 20});

	core.debug(JSON.stringify({octokit, prNumber, body}, null, 2));
	const {data} = await octokit.rest.pulls.update({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
		...body,
	});

	console.dir({data}, {depth: 10});

	return data;
}
