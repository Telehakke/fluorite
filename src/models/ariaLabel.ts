import type { IntlTranslations as IntlFileUpload } from "@zag-js/file-upload";
import type { IntlTranslations as IntlFloatingPanel } from "@zag-js/floating-panel";

export type AriaLabel = Readonly<
    Partial<{
        close: string;
        fileUploadRoot: IntlFileUpload;
        fileUploadTrigger: string;
        floatingPanelRoot: IntlFloatingPanel;
        floatingPanelCloseTrigger: string;
        pagination: PaginationAriaLabel;
        remove: string;
        showFiles: string;
        showSnapshot: string;
        takeSnapshot: string;
        zoomButtons: zoomButtonsAriaLabel;
    }>
>;

type PaginationAriaLabel = Readonly<
    Partial<{
        previousFile: string;
        nextFile: string;
    }>
>;

type zoomButtonsAriaLabel = Readonly<
    Partial<{
        zoomOut: string;
        zoomIn: string;
    }>
>;

/* -------------------------------------------------------------------------- */

export const createAriaLabel = (language: string): AriaLabel => {
    if (language.startsWith("ja")) return JA;
    return EN;
};

const JA: AriaLabel = {
    close: "閉じる",
    fileUploadRoot: {
        dropzone: "ドロップゾーン",
        itemPreview: (file) => `${file.name}のプレビュー`,
        deleteFile: (file) => `${file.name}を削除`,
    },
    fileUploadTrigger: "ファイルの選択",
    floatingPanelRoot: {
        minimize: "ウインドウの最小化",
        maximize: "ウインドウの最大化",
        restore: "ウインドウを元のサイズに戻す",
    },
    floatingPanelCloseTrigger: "ウインドウを閉じる",
    pagination: {
        previousFile: "前のファイル",
        nextFile: "次のファイル",
    },
    remove: "削除",
    showFiles: "ファイルの閲覧",
    showSnapshot: "スナップショットの閲覧",
    takeSnapshot: "スナップショットを撮る",
    zoomButtons: {
        zoomOut: "縮小",
        zoomIn: "拡大",
    },
};

const EN: AriaLabel = {
    close: "Close",
    fileUploadTrigger: "Select files",
    floatingPanelCloseTrigger: "Close window",
    pagination: {
        previousFile: "Previous file",
        nextFile: "Next file",
    },
    remove: "Remove",
    showFiles: "Show files",
    showSnapshot: "Show snapshot",
    takeSnapshot: "Take snapshot",
    zoomButtons: {
        zoomOut: "Zoom out",
        zoomIn: "Zoom in",
    },
};
