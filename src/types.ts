export type ConfigFile = {
	titleTagConfig?: {
		tags: Array<Tag>
		tagWrappers: string
	}
};

export type prPatchBody = {
	title?: string;
}

export type Tag = Record<string, string | Array<string>>;
