import { GitHub } from "@actions/github/lib/github";
import { error, getInput } from "@actions/core/lib/core";
import { promises as fs } from "fs";
import { buildAddAssigneesPayload } from "./buildPayload";

async function run() {
  let eventPath = process.env.GITHUB_EVENT_PATH;

  if (!eventPath) {
    throw new Error("Event is not present");
  }

  let eventBuffer = await fs.readFile(eventPath, {
    encoding: "utf8"
  });
  let event = JSON.parse(eventBuffer);

  let payload = buildAddAssigneesPayload(event);

  let token = getInput("repo-token", { required: true });
  let gitHubClient = new GitHub(token);

  await gitHubClient.issues.addAssignees(payload);
}

run().catch(e => {
  error(`Failed to assign PR to author: ${e.message}`);
});
