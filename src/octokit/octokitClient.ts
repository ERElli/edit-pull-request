import * as github from '@actions/github';
import {OctokitClient} from 'src/types';

export const initializeOctokit = (token: string): OctokitClient => {
	return github.getOctokit(token);
};
