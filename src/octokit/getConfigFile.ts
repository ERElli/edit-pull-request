import { ConfigFile } from '../types';
import { OctokitClient } from './octokitClient';
import * as github from '@actions/github';
import * as core from '@actions/core';
import * as yaml from 'yaml';

export const getConfigFile = async (
	octokit: OctokitClient,
	configPath: string,
): Promise<ConfigFile> => {
	core.info('Fetching config file')
	const {data: ghData} = await octokit.rest.repos.getContent({
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		path: configPath,
		ref: github.context.sha,
	});

	// Decode config file contents
	let content = '';
	if (!Array.isArray(ghData)) {
		if (ghData.type === 'file') {
			content = Buffer.from(ghData.content, 'base64').toString();
		}
	}

	// Parse the yml file into a json object
	const parsed = yaml.parse(content) as ConfigFile;
	console.dir({parsed}, {depth: 10});
	return parsed;
}
