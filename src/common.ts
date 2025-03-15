import * as core from '@actions/core';
import {GitHub} from '@actions/github/lib/utils'
import * as github from '@actions/github'

async function getInputs(): Promise<Inputs> {
    const getInputList = (inputName: string): string[] | undefined => {
        const input = core.getInput(inputName);
        if (input) {
            return input.split(/\s+/).filter(user => user !== "");
        }
        return undefined;
    };

    const inputs:Inputs = {
    repo:           github.context.repo.repo,
    owner:          github.context.repo.owner,
    ghToken:        core.getInput("gh-token"),
    title:          core.getInput("title"),
    head:           core.getInput("head"),
    base:           core.getInput("base"),
    body:           core.getInput("body"),
    assignees:      getInputList("assignees"),
    user_reviewers: getInputList("user_reviewers"),
    team_reviewers: getInputList("team_reviewers")
    }

    if(!inputs.assignees?.length) delete inputs.assignees;
    if(!inputs.user_reviewers?.length) delete inputs.user_reviewers;
    if(!inputs.team_reviewers?.length) delete inputs.team_reviewers;

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
    await octokit.rest.issues.addAssignees({
        repo: inputs.repo,
        owner: inputs.owner,
        issue_number: pr_number,
        assignees: inputs.assignees
    })
    core.info(`The users were assigned successfully.`);
}
async function addReviewersToPR(
    inputs: Inputs,
    octokit: InstanceType<typeof GitHub>,
    pr_number: number): Promise<void>{

    
        if(inputs.user_reviewers){
            core.info(`Request the following user as reviewers: ${inputs.user_reviewers} `)
        }
        if(inputs.team_reviewers){
            core.info(`Request the following teams as reviewers: ${inputs.team_reviewers} `)
        }
        const response = await octokit.rest.pulls.requestReviewers({
            repo: inputs.repo,
            owner: inputs.owner,
            pull_number: pr_number,
            reviewers: inputs.user_reviewers,
            team_reviewers: inputs.team_reviewers
        })
        core.info(`${response}`);
        core.info(`The reviewers were requested successfully.`);
    
    // catch(error){
    //     if (error instanceof Error) {
    //         core.setFailed(`\nAction failed: ${error.message}`);
    //     } 
    //     else {
    //         core.setFailed('Action failed: Unknown error');
    //     }
    // }
}
export{ getInputs, createPullRequest, assigneUsersToPR, addReviewersToPR}