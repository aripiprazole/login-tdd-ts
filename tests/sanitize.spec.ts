import sanitizeHtml from "@app/utils/sanitizeHtml";

test("should sanitize html to remove xss", () => {
    expect(sanitizeHtml("<div></div>")).toEqual("");
});
