import { describe, expect, it } from "vitest";
import { MenuManager } from "../menuManager";

describe("visible", () => {
    it("visibilityがvisibleに変化する", () => {
        const result = new MenuManager("none").visible();
        expect(result.visibility === "visible").toBeTruthy();
    });
});

describe("none", () => {
    it("visibilityがnoneに変化する", () => {
        const result = new MenuManager("visible").none();
        expect(result.visibility === "none").toBeTruthy();
    });
});

describe("openClose", () => {
    it("visible -> hidden に状態が変化する", () => {
        const result = new MenuManager("visible").openClose();
        expect(result.visibility === "hidden").toBeTruthy();
    });

    it("hidden（フェードアウト中）の場合、同じ値を返す", () => {
        const result = new MenuManager("hidden").openClose();
        expect(result.visibility === "hidden").toBeTruthy();
    });

    it("none -> visible に状態が変化する", () => {
        const result = new MenuManager("none").openClose();
        expect(result.visibility === "visible").toBeTruthy();
    });
});

describe("setEnableCloseButton", () => {
    it("指定した値が正しく反映される", () => {
        const result = new MenuManager().setEnableCloseButton(true);
        expect(result.enableCloseButton).toBeTruthy();
    });
});

describe("setEnablePagination", () => {
    it("指定した値が正しく反映される", () => {
        const result = new MenuManager().setEnablePagination(true);
        expect(result.enablePagination).toBeTruthy();
    });
});
