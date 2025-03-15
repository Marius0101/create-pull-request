interface Inputs{
    repo:string
    owner:string
    ghToken: string
    title:string
    head:string
    base:string
    body:string
    assignees?:string[]
    user_reviewers?:string[]
    team_reviewers?:string[]
}