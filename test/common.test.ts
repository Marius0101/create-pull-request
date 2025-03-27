import * as core from '@actions/core'
import * as github from '@actions/github'
import { getInputs } from '../src/common';



describe('GetInputs tests',  () => {
    let inputs = {} as any
    beforeAll(() => {

        jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
            return inputs[name];
        });

        jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
            return {
                owner: 'testOwner',
                repo: 'testRepo'
            }
        });
    });
    beforeEach(() => {
        inputs = {};
    });
    afterAll(() => {
        jest.restoreAllMocks()
    });
    
    it('Should return corect inputs when all inputs are provided', async () =>{
        
        //Arrange
        inputs = {
            'gh-token': 'testToken',
            'title': 'testTitle',
            'head': 'testHead',
            'base': 'testBase',
            'body': 'testBody',
            'assignees': 'user1 user2',
            'user_reviewers': 'reviewer1 reviewer2',
            'team_reviewers': 'team1 team2',
        };
        //Act
        const sut:Inputs = await getInputs();


        //Assert
        const expectedInputs:Inputs = {
            owner: 'testOwner',
            repo: 'testRepo',
            ghToken: 'testToken',
            title: 'testTitle',
            head: 'testHead',
            base: 'testBase',
            body: 'testBody',
            assignees: ['user1', 'user2'],
            user_reviewers: ['reviewer1', 'reviewer2'],
            team_reviewers: ['team1', 'team2'],
        };
        expect(sut).toEqual(expectedInputs);
    });

    it('Should return empty arrays when assignees,user_reviewers and team_reviewers are empty', async () =>{
        
        //Arrange
        inputs = {
            'gh-token': 'testToken',
            'title': 'testTitle',
            'head': 'testHead',
            'base': 'testBase',
            'body': 'testBody',
            'assignees': '',
            'user_reviewers': '',
            'team_reviewers': '',
        };
        //Act
        const sut:Inputs = await getInputs();


        //Assert
        const expectedInputs:Inputs = {
            owner: 'testOwner',
            repo: 'testRepo',
            ghToken: 'testToken',
            title: 'testTitle',
            head: 'testHead',
            base: 'testBase',
            body: 'testBody'
        };
        expect(sut).toEqual(expectedInputs);
    });
    
    it("Should handle whitespaces correctly", async ()=>{
        //Arrange
        inputs = {
            'gh-token': 'testToken',
            'title': 'testTitle',
            'head': 'testHead',
            'base': 'testBase',
            'body': 'testBody',
            'assignees': '    user1 user2    ',
            'user_reviewers': 'reviewer1        reviewer2',
            'team_reviewers': '    team1     team2    ',
        };
        //Act
        const sut:Inputs = await getInputs();

        //Assert
        const expectedInputs:Inputs = {
            owner: 'testOwner',
            repo: 'testRepo',
            ghToken: 'testToken',
            title: 'testTitle',
            head: 'testHead',
            base: 'testBase',
            body: 'testBody',
            assignees: ['user1', 'user2'],
            user_reviewers: ['reviewer1', 'reviewer2'],
            team_reviewers: ['team1', 'team2'],
        };
        expect(sut).toEqual(expectedInputs);
    });
});
