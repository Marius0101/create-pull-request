import * as core from '@actions/core';
import * as github from '@actions/github';
import {GitHub} from '@actions/github/lib/utils'

async function getInputs(): Promise<Inputs> {
    
    const githubRepo = process.env.GITHUB_REPOSITORY;
    if (!githubRepo) {
        core.error("The variable GITHUB_REPOSITORY cannot be found.");
        return {} as Inputs;
    }
    const [owner, repo] = githubRepo.split("/");
    const inputs:Inputs = {
        repo:       repo,
        owner:      owner,
        ghToken:    core.getInput("gh-token"),
        title:      core.getInput("title"),
        head:       core.getInput("head"),
        base:       core.getInput("base"),
        body:       core.getInput("body"),
    }
    const assignees:string  = core.getInput("assignees")
    if(assignees){
        const listAssignees:string[]=assignees.split(/\s+/).filter(user => user !== "");;
        inputs.assignees = listAssignees;
    }
    return inputs  
}
async function createPullRequest(inputs:Inputs, octokit:InstanceType<typeof GitHub>): Promise<number> {
    try{
        const pull_request = await octokit.rest.pulls.create({
            owner: inputs.owner,
            repo: inputs.repo,
            head: inputs.head,
            base: inputs.base,
            title: inputs.title,
            body: inputs.body
        })
        core.info(`Pull request created successfully: ${pull_request.data.html_url}`);
        return pull_request.data.number
        
        }
        catch(error){
            if (error instanceof Error) {
                core.setFailed(`\nAction failed: ${error.message}`);
            } 
            else {
                core.setFailed('Action failed: Unknown error');
            }
            return 0
        }
}
export{ getInputs, createPullRequest}