import { getInput } from "@actions/core";

const ghToken:string = getInput("name");
console.log("Token ghToken!");