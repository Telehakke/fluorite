import { getDefaultStore } from "jotai";
import type { App as ObsidianApp } from "obsidian";
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { App } from "./App";
import { Atom } from "./atoms";

const defaultStore = getDefaultStore();
const ID = "fluorite-root";
let root: Root | undefined = undefined;

export const renderFloatingPanel = (app: ObsidianApp): void => {
    defaultStore.set(Atom.app, app);

    const div = activeDocument.createElement("div");
    div.id = ID;
    app.workspace.containerEl.appendChild(div);
    root = createRoot(div);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
};

export const hasFloatingPanel = (): boolean => {
    return activeDocument.querySelector(`#${ID}`) != null;
};

export const removeFloatingPanel = (): void => {
    root?.unmount();
    activeDocument.querySelector(`#${ID}`)?.remove();
};
