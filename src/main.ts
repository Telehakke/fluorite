import { Plugin } from "obsidian";
import {
    hasFloatingPanel,
    removeFloatingPanel,
    renderFloatingPanel,
} from "./appUtilities";
import "./styles.css";

export default class FluoritePlugin extends Plugin {
    onload(): void {
        this.addRibbonIcon("app-window", "Fluorite", () => {
            if (hasFloatingPanel()) return;
            renderFloatingPanel(this.app);
        });
    }

    onunload(): void {
        removeFloatingPanel();
    }
}
