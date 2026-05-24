import { describe, expect, it } from "vitest";
import { ZoomManager } from "../zoomManager";

describe("setPanelBodySize", () => {
    it("指定した値が正しく設定される", () => {
        const size = { width: 0, height: 0 };
        const result = new ZoomManager().setPanelBodySize(size);
        expect(result.panelBodySize).toEqual(size);
    });
});

describe("setImageSize", () => {
    it("指定した値が正しく設定される", () => {
        const size = { width: 0, height: 0 };
        const result = new ZoomManager().setImageSize(size);
        expect(result.imageSize).toEqual(size);
    });
});

describe("removeImageSize", () => {
    it("imageSizeにundefinedが設定される", () => {
        const size = { width: 0, height: 0 };
        const result = new ZoomManager(0, size, size).removeImageSize();
        expect(result.imageSize).toBeUndefined();
    });
});

describe("zoomOut", () => {
    it("拡大率が50減る", () => {
        const result = new ZoomManager(200).zoomOut();
        expect(result.scale).toBe(150);
    });

    it("拡大率は100より小さくならない", () => {
        const result = new ZoomManager(100).zoomOut();
        expect(result.scale).toBe(100);
    });
});

describe("zoomIn", () => {
    it("拡大率が50増える", () => {
        const result = new ZoomManager(100).zoomIn();
        expect(result.scale).toBe(150);
    });

    it("拡大率は10000より大きくならない", () => {
        const result = new ZoomManager(10000).zoomIn();
        expect(result.scale).toBe(10000);
    });
});

describe("reset", () => {
    it("拡大率が100に戻る", () => {
        const result = new ZoomManager(200).resetScale();
        expect(result.scale).toEqual(100);
    });
});

describe("zoomPercentageText", () => {
    it("拡大率を文字列で取得", () => {
        const result = new ZoomManager(100).zoomPercentageText();
        expect(result).toBe("100%");
    });
});

describe("isImageWiderThanViewer", () => {
    it("パネル縦横比よりも画像が横に長い場合、trueを返す", () => {
        const result = new ZoomManager(
            100,
            { width: 100, height: 100 },
            { width: 101, height: 100 },
        ).isImageWiderThanViewer();
        expect(result).toBeTruthy();
    });

    it("どちらも同じ比率であれば、trueを返す", () => {
        const result = new ZoomManager(
            100,
            { width: 100, height: 100 },
            { width: 100, height: 100 },
        ).isImageWiderThanViewer();
        expect(result).toBeTruthy();
    });

    it("パネル縦横比よりも画像が縦に長い場合、falseを返す", () => {
        const result = new ZoomManager(
            100,
            { width: 100, height: 100 },
            { width: 99, height: 100 },
        ).isImageWiderThanViewer();
        expect(result).toBeFalsy();
    });
});
