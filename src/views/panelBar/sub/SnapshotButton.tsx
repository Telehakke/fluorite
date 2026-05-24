import { useAtomValue, useSetAtom } from "jotai";
import { Scan, ScanText } from "lucide-react";
import { App, Component, MarkdownRenderer } from "obsidian";
import type { JSX } from "react";
import { Atom, SnapshotActionAtom } from "../../../atoms";

export const SnapshotButton = (): JSX.Element => {
    const app = useAtomValue(Atom.app);
    const snapshot = useAtomValue(Atom.snapshot);
    const setSnapshot = useSetAtom(SnapshotActionAtom.setSnapshot);
    const showSnapshot = useSetAtom(SnapshotActionAtom.showSnapshot);

    return (
        <>
            <SnapshotTakeButton
                hidden={snapshot != undefined}
                onClick={() => {
                    (async (): Promise<void> => {
                        if (app == null) return;

                        const div = activeDocument.createElement("div");
                        div.classList.add(
                            "markdown-preview-view",
                            "markdown-rendered",
                        );
                        await renderMarkdown(app, div);
                        setSnapshot(div);
                    })().catch(() => {});
                }}
            />
            <SnapshotShowButton
                hidden={snapshot == undefined}
                onClick={showSnapshot}
            />
        </>
    );
};

const renderMarkdown = async (app: App, el: HTMLElement): Promise<void> => {
    const activeFile = app.workspace.getActiveFile();
    if (activeFile == null) return;
    if (activeFile.extension !== "md") return;

    const markdown = await app.vault.cachedRead(activeFile);
    const component = new Component();
    await MarkdownRenderer.render(
        app,
        markdown,
        el,
        activeFile.path,
        component,
    );
};

/* -------------------------------------------------------------------------- */

const SnapshotTakeButton = (props: {
    hidden: boolean;
    onClick: () => void;
}): JSX.Element => {
    const ariaLabel = useAtomValue(Atom.ariaLabel);

    if (props.hidden) return <></>;
    return (
        <button
            className="clickable-icon"
            aria-label={ariaLabel.takeSnapshot}
            onClick={props.onClick}
        >
            <Scan className="svg-icon" />
        </button>
    );
};

const SnapshotShowButton = (props: {
    hidden: boolean;
    onClick: () => void;
}): JSX.Element => {
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const contentType = useAtomValue(Atom.contentType);

    if (props.hidden) return <></>;
    return (
        <button
            className="clickable-icon fluorite-relative"
            aria-label={ariaLabel.showSnapshot}
            onClick={props.onClick}
        >
            <ScanText className="svg-icon" />
            <div
                className="fluorite-indicator"
                hidden={contentType !== "snapshot"}
            />
        </button>
    );
};
