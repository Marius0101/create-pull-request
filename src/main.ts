import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run(): Promise<void> {
    
    const ghToken:string = core.getInput("gh-token");
    const title:string = core.getInput("title");
    const head:string = core.getInput("head");
    const base:string = core.getInput("base");
    const body:string = core.getInput("body");
    const octokit = github.getOctokit(ghToken);

    core.info("Creating the pull request")
    try{
    const pull_request = await octokit.rest.pulls.create({
        owner: 'Marius0101',
        repo: 'create-pull-request',
        head: head,
        base: base,
        title: title,
        body: body
    })
    core.info(`Pull request created successfully: ${pull_request.data.html_url}`);
    }
    catch(error){
        if (error instanceof Error) {
            core.setFailed(`\nAction failed: ${error.message}`);
        } 
        else {
            core.setFailed('Action failed: Unknown error');
        }
    }
    
}