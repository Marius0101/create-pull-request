import * as core from '@actions/core';
import * as github from '@actions/github';
import { getInputs, createPullRequest, assigneUsersToPR } from './common';

export async function run(): Promise<void> {
    
    const inputs = await getInputs();
    const octokit = github.getOctokit(inputs.ghToken);

    const pr_number:number = await createPullRequest(inputs, octokit);

    if(inputs.assignees){
        await assigneUsersToPR(inputs,octokit,pr_number); 
    }
    else{
        core.info("No users assigned to this pull request!");
    }
}