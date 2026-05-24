import { atom } from "jotai";
import { App, moment } from "obsidian";
import { createAriaLabel } from "./models/ariaLabel";
import { FileManager } from "./models/fileManager";
import { MenuManager } from "./models/menuManager";
import { MessageManager } from "./models/messageManager";
import type { ContentType } from "./models/types";
import { ZoomManager } from "./models/zoomManager";

export const Atom = {
    /** Obsidianインスタンス */
    app: atom<App | undefined>(undefined),
    /** アクセシビリティ名 */
    ariaLabel: atom(() => createAriaLabel(moment.locale())),
    /** 現在表示しているコンテンツの種類 */
    contentType: atom<ContentType>("none"),
    /** 画像ファイルの管理 */
    fileManager: atom(new FileManager()),
    /** 開いた画像ファイルを解放する */
    fileUploadClearSignal: atom(0),
    /** 表示する画像ソース */
    imageSrc: atom<string | File | undefined>(undefined),
    /** パネル内メニューの状態 */
    menuManager: atom(new MenuManager()),
    /** 通知メッセージの管理 */
    messageManager: atom(new MessageManager()),
    /** パネルバーの高さ */
    panelBarHeight: atom(0),
    /** スナップショット */
    snapshot: atom<HTMLElement | undefined>(undefined),
    /** 画像の拡大・縮小を管理 */
    zoomManager: atom(new ZoomManager()),
} as const;

export const cleanupAtom = atom(null, (_, set) => {
    set(Atom.contentType, "none");
    set(Atom.fileManager, new FileManager());
    set(Atom.fileUploadClearSignal, 0);
    set(Atom.imageSrc, undefined);
    set(Atom.menuManager, new MenuManager());
    set(Atom.messageManager, new MessageManager());
    set(Atom.snapshot, undefined);
    set(Atom.zoomManager, new ZoomManager());
});

export const ImageActionAtom = {
    /** 選択した画像を取り込み1番目の画像を表示 */
    loadFiles: atom(null, (_, set, files: File[]) => {
        if (files.length === 0) return;

        const fileManager = new FileManager(files).sorted();
        set(Atom.fileManager, fileManager);
        set(Atom.contentType, "image");
        set(Atom.imageSrc, fileManager.getCurrentFile());
        set(Atom.menuManager, (m) =>
            m.setEnableCloseButton(false).setEnablePagination(true).visible(),
        );
    }),
    /** 現在のインデックスに位置する画像を表示 */
    showCurrentFile: atom(null, (get, set) => {
        if (get(Atom.contentType) === "image") return;

        set(Atom.contentType, "image");
        set(Atom.imageSrc, get(Atom.fileManager).getCurrentFile());
        set(Atom.menuManager, (m) =>
            m.setEnableCloseButton(false).setEnablePagination(true).visible(),
        );
    }),
    /** 次のファイルを表示 */
    showNextFile: atom(null, (get, set) => {
        const fileManager = get(Atom.fileManager).incrementIndex();
        set(Atom.fileManager, fileManager);
        set(Atom.imageSrc, fileManager.getCurrentFile());
        set(Atom.messageManager, (m) => m.showMessage(fileManager.progress()));
    }),
    /** 前のファイルを表示 */
    showPreviousFile: atom(null, (get, set) => {
        const fileManager = get(Atom.fileManager).decrementIndex();
        set(Atom.fileManager, fileManager);
        set(Atom.imageSrc, fileManager.getCurrentFile());
        set(Atom.messageManager, (m) => m.showMessage(fileManager.progress()));
    }),
    /** ファイルを削除 */
    removeFiles: atom(null, (get, set) => {
        set(Atom.fileManager, new FileManager());
        set(Atom.imageSrc, undefined);
        set(Atom.fileUploadClearSignal, (v) => v + 1);
        set(Atom.contentType, get(Atom.snapshot) != null ? "snapshot" : "none");
    }),
    /** 画像を拡大表示 */
    zoomIn: atom(null, (get, set) => {
        const zoomManager = get(Atom.zoomManager).zoomIn();
        set(Atom.zoomManager, zoomManager);
        set(Atom.messageManager, (m) =>
            m.showMessage(zoomManager.zoomPercentageText()),
        );
    }),
    /** 画像を縮小表示 */
    zoomOut: atom(null, (get, set) => {
        const zoomManager = get(Atom.zoomManager).zoomOut();
        set(Atom.zoomManager, zoomManager);
        set(Atom.messageManager, (m) =>
            m.showMessage(zoomManager.zoomPercentageText()),
        );
    }),
} as const;

export const SnapshotActionAtom = {
    /** スナップショットを削除 */
    removeSnapshot: atom(null, (_, set) => {
        set(Atom.contentType, "none");
        set(Atom.imageSrc, undefined);
        set(Atom.snapshot, undefined);
    }),
    /** スナップショットを登録し表示 */
    setSnapshot: atom(null, (_, set, el: HTMLElement) => {
        set(Atom.contentType, "snapshot");
        set(Atom.imageSrc, undefined);
        set(Atom.snapshot, el);
    }),
    /** 指定した画像要素をイメージビューに表示 */
    showImage: atom(null, (_, set, el: HTMLImageElement) => {
        set(Atom.imageSrc, el.src);
        set(Atom.menuManager, (m) =>
            m.setEnableCloseButton(true).setEnablePagination(false).visible(),
        );
    }),
    /** スナップショットを再表示 */
    showSnapshot: atom(null, (get, set) => {
        if (get(Atom.contentType) === "snapshot") return;

        set(Atom.contentType, "snapshot");
        set(Atom.imageSrc, undefined);
    }),
} as const;
