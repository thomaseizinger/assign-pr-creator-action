import { IssuesAddAssigneesParams } from "@octokit/rest";
import { WebhookPayload } from "@actions/github/lib/interfaces";

export function buildAddAssigneesPayload(
  event: WebhookPayload
): IssuesAddAssigneesParams {
  if (!event.repository) {
    throw new Error("repository not given in event payload");
  }

  if (!event.pull_request) {
    throw new Error("event is not a pull_request event");
  }

  if (!event.pull_request.user) {
    throw new Error("event does not contain user information");
  }

  if (!event.pull_request.user.login) {
    throw new Error("user payload is malformed");
  }

  return {
    repo: event.repository.name,
    owner: event.repository.owner.login,
    issue_number: event.pull_request.number,
    assignees: [event.pull_request.user.login]
  };
}
