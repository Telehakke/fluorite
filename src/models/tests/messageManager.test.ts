import { describe, expect, it } from "vitest";
import { MessageManager } from "../messageManager";

describe("showMessage", () => {
    it("指定した値とvisibleが設定される", () => {
        const result = new MessageManager().showMessage("a");
        expect(JSON.stringify(result)).toBe(
            JSON.stringify(new MessageManager("a", "visible")),
        );
    });
});

describe("hidden", () => {
    it("visibilityがhiddenに変化する", () => {
        const result = new MessageManager("", "visible").hidden();
        expect(result.visibility === "hidden").toBeTruthy();
    });
});

describe("none", () => {
    it("visibilityがnoneに変化する", () => {
        const result = new MessageManager("", "visible").none();
        expect(result.visibility === "none").toBeTruthy();
    });
});
