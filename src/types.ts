import * as github from '@actions/github';

export interface ConfigFile {
	titleTagConfig?: TitleTagConfig
}

export interface PullsUpdateRequestBody {
	title?: string
}

export type TagConfig = Record<string, string | Array<string>>;

export interface TitleTagConfig {
	tags: Array<TagConfig>
	tagWrappers: string
}

// Octokit Client Types
export type OctokitClient = ReturnType<typeof github.getOctokit>;
export type PullsGetReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['get']>>['data'];
export type PullsUpdateReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['update']>>['data'];
export type ListFilesReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['listFiles']>>['data'];
