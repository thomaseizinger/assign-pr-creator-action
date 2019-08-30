export interface AddAssigneesRequestData {
  url: string,
  body: {
    assignees: string[]
  }
}

export function buildAddAssigneesPayload(
  event: any
): AddAssigneesRequestData {
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
    url: `/repos/${event.repository.owner.login}/${event.repository.name}/issues/${event.pull_request.number}/assignees`,
    body: {
      assignees: [event.pull_request.user.login]
    }
  };
}
