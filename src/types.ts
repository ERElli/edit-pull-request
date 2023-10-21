import * as github from '@actions/github';

export type OctokitClient = ReturnType<typeof github.getOctokit>;

export type Tag = Record<string, string>;

export type ConfigFile = {
	titleTagConfig?: {
		tags: Array<Tag>
		tagWrappers: string
	}
};

export type prPatchBody = {
	title?: string;
}
