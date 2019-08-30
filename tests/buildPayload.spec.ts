import {buildAddAssigneesPayload} from "../src/buildPayload";
import event from "./event.json";

describe("buildPayload", function() {
  it("can produce the correct payload from an example event", async function() {
    let payload = await buildAddAssigneesPayload(event);

    expect(payload).toEqual({
      url: "/repos/Codertocat/Hello-World/issues/2/assignees",
      body: {
        assignees: ["Codertocat"]
      }
    });
  });
});
