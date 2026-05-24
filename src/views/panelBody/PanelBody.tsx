import { useSetAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { Atom } from "../../atoms";
import { FloatingPanelBody } from "../common/FloatingPanel";
import { ImageView } from "./sub/ImageVIew";
import { Menu } from "./sub/Menu";
import { Notification } from "./sub/Notification";
import { SnapshotView } from "./sub/SnapshotView";

export const PanelBody = (): JSX.Element => {
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const setZoomManager = useSetAtom(Atom.zoomManager);

    useEffect(() => {
        if (bodyRef.current == null) return;

        const observer = new ResizeObserver((entries) => {
            // パネルがリサイズされるたびに実行する処理
            entries.forEach((e) => {
                const width = e.target.clientWidth;
                const height = e.target.clientHeight;
                setZoomManager((z) => z.setPanelBodySize({ width, height }));
            });
        });
        observer.observe(bodyRef.current);
        return (): void => observer.disconnect();
    }, [setZoomManager]);

    return (
        <FloatingPanelBody ref={bodyRef}>
            <SnapshotView />
            <ImageView>
                <Menu />
            </ImageView>
            <Notification />
        </FloatingPanelBody>
    );
};
