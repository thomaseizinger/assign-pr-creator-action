import { buildAddAssigneesPayload } from "../src/buildPayload";
import event from "./event.json";

describe("buildPayload", function() {
  it("can produce the correct payload from an example event", async function() {
    let payload = await buildAddAssigneesPayload(event);

    expect(payload).toEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      issue_number: 2,
      assignees: ["Codertocat"]
    });
  });
});
