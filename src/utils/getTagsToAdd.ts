import { Tag } from "../types";
import { minimatch } from 'minimatch';

export const getTagsToAdd = (tagConfigs: Array<Tag>, files: Array<string>, currentTags: Set<string>): Set<string> => {
	const tagsToApply = new Set<string>();
	for (let tagConfig of tagConfigs) {
		const tagName = Object.keys(tagConfig)[0];
		const tagGlob = tagConfig[tagName];

		files.find((file) => {
			const match = minimatch(file, tagGlob);
			if (match && !currentTags.has(tagName)) {
				tagsToApply.add(tagName);
			}
			return match;
		})
	}
	return tagsToApply;
}
