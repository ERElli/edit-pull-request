import { minimatch } from 'minimatch';

export const getTagsToAdd = (
	tagMap: Map<string, Array<string>>,
	files: Array<string>,
	currentTags: Set<string>,
): Set<string> => {
	const tagsToApply = new Set<string>();
	files.forEach((file) => {
		for (const [name, globs] of tagMap) {
			let match;
			for (const glob of globs) {
				match = minimatch(file, glob);
				if (match && !currentTags.has(name)) {
					tagsToApply.add(name);
					continue;
				}
			}
		}
	});

	return tagsToApply;
};
