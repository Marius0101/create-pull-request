import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run(): Promise<void> {
    const ghToken:string = core.getInput("gh-token");
    const title:string = core.getInput("title");
    const head:string = core.getInput("head");
    const base:string = core.getInput("base");
    const body:string = core.getInput("body");

    const octokit = github.getOctokit(ghToken);
    const pull_request = await octokit.rest.pulls.create({
        owner: 'Marius0101',
        repo: 'create-pull-request',
        head: head,
        base: base,
        title: title,
        body: body
    })
    console.log(pull_request);
}