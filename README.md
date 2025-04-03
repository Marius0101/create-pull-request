# create-pull-request

This action provide the following functionality for GitHub Actions:
- Create a pull request
- Optionally:
  - Assign user to the pull request you just created
  - Request review from user or teams 
## Usage
See [action.yml](https://github.com/Marius0101/create-pull-request/blob/develop/action.yml)
```yaml
- uses:  Marius0101/create-pull-request@develop
  with:
    #The Github acces token
    gh-token: ''

    #The title of the pull request.
    title: '' 

    #The name of the branch where your changes are implemented.
    head: '' 

    #The name of the branch you want the changes pulled into.
    base: '' 
```
### Basic Example
```yaml
    uses:  Marius0101/create-pull-request@develop
    with:
        gh-token: ${{ secrets.GITHUB_TOKEN }}
        title: 'Add new feature' 
        head: 'feature/new-feature' 
        base: 'develop' 
```
### Optional Parameters

#### `body`
Add a description to the pull request. You can also add markdown in text.

```yaml
with:
    body: This is a body description
```

#### `assignees`
Assign a user to the pull request you want to create.\
:warning: You can add up to 10 user to the pull request.
```yaml
with:
    assignees: user1 user2 user3
```
```yaml
with:
    assignees: |
    user1
    user2
    user3
```
#### `user_reviewers`
Request a user to review the pull request you want to create. If a user doesn't have permisions to the repository the actions will not fail.
```yaml
with:
    user_reviewers: user1 user2 user3
```
```yaml
with:
    user_reviewers: |
    user1
    user2
    user3
```

#### `team_reviewers`
Request a team to review the pull request you want to create. If a team doesn't have permisions to the repository the actions will not be fail.
```yaml
with:
    team_reviewers: team1 team2 team3
```
```yaml
with:
    team_reviewers: |
    team1
    team2
    team3
```
### Output Parameter
This action will not return any output.