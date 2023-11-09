import * as github from "@actions/github";

export type TitleTagConfig = {
	tags: Array<Tag>
	tagWrappers: string
}
export type ConfigFile = {
	titleTagConfig?: TitleTagConfig
};

export type prPatchBody = {
	title?: string;
}

export type Tag = Record<string, string | Array<string>>;

// Octokit Types
export type OctokitClient = ReturnType<typeof github.getOctokit>;
export type PullsGetReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['get']>>['data'];
export type PullsUpdateReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['update']>>['data'];
export type ListFilesReturnType = Awaited<ReturnType<OctokitClient['rest']['pulls']['listFiles']>>['data'];
