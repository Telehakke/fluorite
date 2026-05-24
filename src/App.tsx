import { useAtomValue } from "jotai";
import { MarkdownView } from "obsidian";
import type { JSX } from "react";
import { Atom } from "./atoms";
import { FloatingPanelRoot } from "./views/common/FloatingPanel";
import { PanelBar } from "./views/panelBar/PanelBar";
import { PanelBody } from "./views/panelBody/PanelBody";

export const App = (): JSX.Element => {
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const app = useAtomValue(Atom.app);
    const editor =
        app?.workspace.getActiveViewOfType(MarkdownView)?.containerEl;
    const editorRect = editor?.getBoundingClientRect();
    let width = editorRect?.width ?? 300;
    if (width < 300) width = 300;
    const x = editorRect?.left ?? 0;

    return (
        <FloatingPanelRoot
            defaultSize={{ width, height: 200 }}
            defaultPosition={{ x, y: 100 }}
            minSize={{ width: 300, height: 200 }}
            allowOverflow={false}
            defaultOpen
            ariaLabel={ariaLabel.floatingPanelRoot}
        >
            <PanelBody />
            <PanelBar />
        </FloatingPanelRoot>
    );
};
