import { OctokitClient, prPatchBody } from '../types';
import * as core from '@actions/core';
import * as github from '@actions/github';

export const updatePullRequest = async (octokit: OctokitClient, prNumber: number, body: prPatchBody) => {
	core.info('Updating PR');
	type RequestBody = typeof octokit.rest.pulls.update
	return octokit.rest.pulls.update({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: prNumber,
		...body,
	});
}
