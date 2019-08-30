import {context, GitHub} from "@actions/github/lib/github";

async function run() {
  let token = process.env["INPUT_REPO_TOKEN"];

  if (!token) {
    throw new Error("Input 'repo-token' is not specified");
  }

  const { repo, owner, number: pullRequest } = context.issue;

  if (!pullRequest) {
    throw new Error("Unable to determine pull request from context");
  }

  let gitHubClient = new GitHub(token);

  let prReference = {
    issue_number: pullRequest,
    owner: owner,
    repo: repo
  };

  let fullPullRequest = await gitHubClient.issues.get(prReference);
  let author = fullPullRequest.data.user.login;

  console.log("Assigning pull request %d to %s", pullRequest, author);

  await gitHubClient.issues.addAssignees({
    ...prReference,
    assignees: [author]
  });
}

run().catch(e => {
  process.stdout.write(`##[error]Failed to assign PR to author: ${e.message}`);
});
