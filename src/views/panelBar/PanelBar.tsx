import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { removeFloatingPanel } from "../../appUtilities";
import { Atom, cleanupAtom } from "../../atoms";
import {
    FloatingPanelControl,
    FloatingPanelDragTrigger,
    FloatingPanelHeader,
} from "../common/FloatingPanel";
import { FileUpload } from "./sub/FileUpload";
import { ImageOrSnapshotRemoveButton } from "./sub/ImageOrSnapshotRemoveButton";
import { SnapshotButton } from "./sub/SnapshotButton";

export const PanelBar = (): JSX.Element => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const setPanelBarHeight = useSetAtom(Atom.panelBarHeight);
    const cleanup = useSetAtom(cleanupAtom);
    const ariaLabel = useAtomValue(Atom.ariaLabel);

    useEffect(() => {
        if (headerRef.current == null) return;

        setPanelBarHeight(headerRef.current.clientHeight);
    }, [setPanelBarHeight]);

    const handleCloseClick = (): void => {
        cleanup();
        removeFloatingPanel();
    };

    return (
        <FloatingPanelHeader ref={headerRef}>
            <div className="fluorite-h-stack fluorite-overflow-scroll">
                <FloatingPanelDragTrigger />
                <div
                    className="fluorite-h-stack fluorite-overflow-scroll"
                    style={{ padding: "3px" }}
                >
                    <FileUpload />
                    <SnapshotButton />
                    <ImageOrSnapshotRemoveButton />
                </div>
            </div>
            <FloatingPanelControl
                closeTriggerAriaLabel={ariaLabel.floatingPanelCloseTrigger}
                onCloseClick={handleCloseClick}
            />
        </FloatingPanelHeader>
    );
};
