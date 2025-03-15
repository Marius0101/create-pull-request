import * as core from '@actions/core';
import {GitHub} from '@actions/github/lib/utils'
import * as github from '@actions/github'
async function getInputs(): Promise<Inputs> {
    
    const githubRepo = process.env.GITHUB_REPOSITORY;
    if (!githubRepo) {
        core.error("The variable GITHUB_REPOSITORY cannot be found.");
        return {} as Inputs;
    }
    const [owner, repo] = githubRepo.split("/");
    const inputs:Inputs = {
    repo:           github.context.repo.repo,
        owner:      github.context.repo.owner,
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
    core.info("Creating the pull request")
    try{
        const response = await octokit.rest.pulls.create({
            owner: inputs.owner,
            repo: inputs.repo,
            head: inputs.head,
            base: inputs.base,
            title: inputs.title,
            body: inputs.body
        })
        core.info(`Pull request created successfully: ${response.data.html_url}`);
        return response.data.number
        
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
async function assigneUsersToPR(
    inputs: Inputs,
    octokit: InstanceType<typeof GitHub>,
    pr_number: number): Promise<void>{
    
    core.info(`Assign the following user to the PR: ${inputs.assignees} `)
    const response = await octokit.rest.issues.addAssignees({
        repo: inputs.repo,
        owner: inputs.owner,
        issue_number: pr_number,
        assignees: inputs.assignees
    })
    core.info(`The users were assigned successfully.`);
}

export{ getInputs, createPullRequest, assigneUsersToPR}