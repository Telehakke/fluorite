import { describe, expect, it } from "vitest";
import { FileManager } from "../fileManager";

const files = [new File([], "dummy1.md"), new File([], "dummy2.md")];

describe("hasFiles", () => {
    it("1つ以上のファイルを持つ場合、trueを返す", () => {
        const result = new FileManager(files).hasFiles();
        expect(result).toBeTruthy();
    });

    it("ファイルが0であればfalseを返す", () => {
        const result = new FileManager().hasFiles();
        expect(result).toBeFalsy();
    });
});

describe("getCurrentFile", () => {
    it("指定したインデックスのファイルを返す", () => {
        const result = new FileManager(files, 0).getCurrentFile();
        expect(result).toBe(files[0]);
    });

    it("インデックスが範囲外の場合、undefinedを返す1", () => {
        const result = new FileManager(files, -1).getCurrentFile();
        expect(result).toBeUndefined();
    });

    it("インデックスが範囲外の場合、undefinedを返す2", () => {
        const result = new FileManager(files, files.length).getCurrentFile();
        expect(result).toBeUndefined();
    });
});

describe("progress", () => {
    it("進行状況を正しく返す", () => {
        const result = new FileManager(files, 0).progress();
        expect(result).toBe(`1 / ${files.length}`);
    });

    it("ファイルが0であればundefinedを返す", () => {
        const result = new FileManager().progress();
        expect(result).toBeUndefined();
    });
});

describe("decrementIndex", () => {
    it("インデックスが1減る", () => {
        const result = new FileManager(files, 1).decrementIndex();
        expect(result.index).toBe(0);
    });

    it("インデックスは0より小さくならない", () => {
        const result = new FileManager(files, 0).decrementIndex();
        expect(result.index).toBe(0);
    });
});

describe("incrementIndex", () => {
    it("インデックスが1増える", () => {
        const result = new FileManager(files, 0).incrementIndex();
        expect(result.index).toBe(1);
    });

    it("インデックスはファイル数以上にならない", () => {
        const result = new FileManager(
            files,
            files.length - 1,
        ).incrementIndex();
        expect(result.index).toBe(files.length - 1);
    });
});

describe("sorted", () => {
    it("aからzの順でソートした結果を返す", () => {
        const files = [new File([], "b.md"), new File([], "a.md")];
        const result = new FileManager(files, 0).sorted();
        expect(result.files.map((v) => v.name)).toEqual(["a.md", "b.md"]);
    });
});
