import {TagConfig} from 'src/types';

/*
	Iterates over tag configs from config file
	Outputs a map with:
		key - tag names
		value - array of tag globs
*/
export const normalizeTagConfigs = (
	tagConfigs: Array<TagConfig>,
): Map<string, Array<string>> => {
	const tagMap = new Map<string, Array<string>>();
	for (const tagConfig of tagConfigs) {
		const tagName = Object.keys(tagConfig)[0];
		const tagGlob = tagConfig[tagName];

		if (!Array.isArray(tagGlob)) {
			tagMap.set(tagName, [tagGlob]);
		}
		else {
			tagMap.set(tagName, tagGlob);
		}
	}
	return tagMap;
};
