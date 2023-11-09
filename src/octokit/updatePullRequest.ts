import { prPatchBody } from '../types';
import { OctokitClient, PullsUpdateReturnType } from './octokitClient';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const updatePullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
	body: prPatchBody
): Promise<PullsUpdateReturnType> => {
	core.info('Updating PR');

	const {data} = await octokit.rest.pulls.update({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
		...body,
	});

	return data;
}
