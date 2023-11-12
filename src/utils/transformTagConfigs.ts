import {Tag} from 'src/types';

export const transformTagConfigs = (tagConfigs: Array<Tag>): Map<string, Array<string>> => {
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
