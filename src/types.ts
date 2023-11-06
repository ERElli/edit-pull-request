import { RequestParameters } from "@octokit/types";
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
