import { promises as fs } from "fs";
import { buildAddAssigneesPayload } from "./buildPayload";
import {RestClient} from "typed-rest-client/RestClient";
import {BasicCredentialHandler} from "typed-rest-client/Handlers";

async function run() {
  let eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    throw new Error("Event is not present");
  }

  let repoToken = process.env.INPUT_REPO_TOKEN;
  if (!repoToken) {
    throw new Error("Input `repo-token` not provided")
  }

  let eventBuffer = await fs.readFile(eventPath, {
    encoding: "utf8"
  });
  let event = JSON.parse(eventBuffer);

  let payload = buildAddAssigneesPayload(event);

  let client = new RestClient("assign-pr-creator-action", "https://api.github.com", [new BasicCredentialHandler("token", repoToken)], {
    headers: {
      "Accept": "application/vnd.github.v3+json",
    }
  });

  await client.create(payload.url, payload.body);
}

run().catch(e => {
  process.stdout.write(`##[error]Failed to assign PR to author: ${e.message}`)
});
