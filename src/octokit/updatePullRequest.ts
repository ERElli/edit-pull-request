import { prPatchBody } from '../types';
import { OctokitClient, PullRequestUpdateReturnType } from './octokitClient';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const updatePullRequest = async (
	octokit: OctokitClient,
	prNumber: number,
	body: prPatchBody
	): Promise<PullRequestUpdateReturnType> => {
		core.info('Updating PR');

	return octokit.rest.pulls.update({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
		...body,
	});
}
