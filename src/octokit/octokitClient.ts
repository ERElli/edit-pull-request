import * as github from '@actions/github';

export const initializeOctokit = (token: string): OctokitClient => {
	return github.getOctokit(token);
}

export type OctokitClient = ReturnType<typeof github.getOctokit>;
export type PullsGetReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['get']>>['data'];
export type PullsUpdateReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['update']>>['data'];
export type ListFilesReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['listFiles']>>['data'];
