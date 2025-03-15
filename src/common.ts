import * as core from '@actions/core';
export async function getInputs(): Promise<Inputs> {
    
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