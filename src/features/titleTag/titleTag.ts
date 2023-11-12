import { OctokitClient, TitleTagConfig } from '../../types';
import * as core from '@actions/core';
import { getCurrentTags } from 'src/utils/getCurrentTags';
import { transformTagConfigs } from 'src/utils/transformTagConfigs';
import { getTagsToAdd } from 'src/utils/getTagsToAdd';
import { updatePullRequest } from 'src/octokit';
import { getPullRequest } from 'src/octokit';

export const titleTag = async (
	titleTagConfig: TitleTagConfig,
	octokit: OctokitClient,
	pull: Awaited<ReturnType<typeof getPullRequest>>,
) => {
	const tagWrappers = titleTagConfig.tagWrappers;

	if (tagWrappers.length !== 2) {
		core.setFailed('titleTag: tagWrappers should be 2 characters');
		return;
	}

	// Get names of files changed in the PR
	const names = pull.updatedFiles.map((item) => {
		return item.filename;
	});
	
	// Parse tags that exists at the beginning of the title
	const title = pull.info.title;
	const currentTags = getCurrentTags(title, tagWrappers);

	// Parse list of tags to apply
	const tagConfigs = titleTagConfig.tags;
	const tagConfigMap = transformTagConfigs(tagConfigs);
	const tagsToApply = getTagsToAdd(tagConfigMap, names, currentTags);

	let tagTitle: string = '';
	tagsToApply.forEach((tag) => {
		tagTitle += `${tagWrappers[0]}${tag}${tagWrappers[1]}`;
	});
	const finalTitle = `${tagTitle}${title}`;

	await updatePullRequest(octokit, pull.info.number, {title: finalTitle});
};
