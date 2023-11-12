export function getCurrentTags(
	title: string,
	tagWrappers: string,
): Set<string> {
	const regex = new RegExp('\\s');
	let processing: boolean = true;
	let i: number = 0;
	let currentChar: string = '';
	const tags = new Set<string>();

	while (processing) {
		currentChar = title[i];
		let currentTag = '';
		if (regex.test(currentChar)) {
			i++;
			continue;
		}
		if (currentChar === tagWrappers[0]) {
			i++;
			currentChar = title[i];
			while (currentChar !== tagWrappers[1]) {
				currentTag += currentChar;
				i++;
				currentChar = title[i];
			}
			tags.add(currentTag);
			i++;
		} else {
			processing = false;
		}
	}

	return tags;
}
