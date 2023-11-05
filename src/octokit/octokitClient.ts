import * as github from '@actions/github';

export type OctokitClient = ReturnType<typeof github.getOctokit>;

export const initializeOctokit = (token: string): OctokitClient => {
	return github.getOctokit(token);
}

export type PullRequestUpdateReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['update']>>
export type PullRequestUpdateInputType = Parameters<OctokitClient['rest']['pulls']['update']>[0];
export type ListFilesReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['listFiles']>>['data']
