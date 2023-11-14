import * as core from '@actions/core';
import {getPullRequest, updatePullRequest} from '../../octokit';
import {OctokitClient, TitleTagConfig} from '../../types';
import {getCurrentTags, getTagsToAdd, normalizeTagConfigs} from './utils';

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
	const tagConfigMap = normalizeTagConfigs(tagConfigs);
	const tagsToApply = getTagsToAdd(tagConfigMap, names, currentTags);

	let tagTitle = '';
	tagsToApply.forEach((tag) => {
		tagTitle += `${tagWrappers[0]}${tag}${tagWrappers[1]}`;
	});
	const finalTitle = `${tagTitle}${title}`;

	await updatePullRequest(octokit, pull.info.number, {title: finalTitle});
};
