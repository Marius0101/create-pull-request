import * as core from '@actions/core';
import * as github from '@actions/github';
import { getInputs, createPullRequest } from './common';

export async function run(): Promise<void> {
    
    const inputs = await getInputs();
    const octokit = github.getOctokit(inputs.ghToken);

    var pull_request_number:number;
    
    const pr_number:number = await createPullRequest(inputs, octokit)
    if(inputs){
        
    }
    else{
        core.info("No user was assinge.")
    }
}