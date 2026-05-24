import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
    useEffect,
    useRef,
    type CSSProperties,
    type JSX,
    type ReactNode,
    type SyntheticEvent,
} from "react";
import { Atom } from "../../../atoms";
import { ZoomManager } from "../../../models/zoomManager";

export const ImageView = (props: { children: ReactNode }): JSX.Element => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const imageSrc = useAtomValue(Atom.imageSrc);
    const setMenuManager = useSetAtom(Atom.menuManager);
    const [zoomManager, setZoomManager] = useAtom(Atom.zoomManager);

    useEffect(() => {
        setZoomManager((z) => z.resetScale().removeImageSize());
        if (imageRef.current == null) return;

        if (typeof imageSrc === "string") {
            imageRef.current.src = imageSrc;
            return;
        }

        if (imageSrc instanceof File) {
            const imageURL = URL.createObjectURL(imageSrc);
            imageRef.current.src = imageURL;
            return (): void => URL.revokeObjectURL(imageURL);
        }
    }, [imageSrc, setZoomManager]);

    const handleOnLoad = (
        event: SyntheticEvent<HTMLImageElement, Event>,
    ): void => {
        const width = event.currentTarget.naturalWidth;
        const height = event.currentTarget.naturalHeight;
        setZoomManager((z) => z.setImageSize({ width, height }));
    };

    if (imageSrc == null) return <></>;
    return (
        <div
            style={containerStyle(zoomManager)}
            onClick={() => setMenuManager((m) => m.openClose())}
        >
            <img
                ref={imageRef}
                style={imageStyle(zoomManager)}
                onLoad={handleOnLoad}
            />
            {props.children}
        </div>
    );
};

const containerStyle = (zoomManager: ZoomManager): CSSProperties => {
    const isImageWiderThanViewer = zoomManager.isImageWiderThanViewer();
    const value = zoomManager.zoomPercentageText();

    // 画像の切り替え直後に一瞬適用されるスタイル
    // 切り替え前の画像との縦横比が大きく異なる場合のチラつきを目立たなくさせる
    if (isImageWiderThanViewer == null)
        return { width: "100%", height: "100%", display: "flex" };

    return {
        width: isImageWiderThanViewer ? value : "100%",
        height: isImageWiderThanViewer ? "100%" : value,
        display: "flex",
    };
};

const imageStyle = (zoomManager: ZoomManager): CSSProperties => {
    const isImageWiderThanViewer = zoomManager.isImageWiderThanViewer();

    // 画像の切り替え直後に一瞬適用されるスタイル
    // 切り替え前の画像との縦横比が大きく異なる場合のチラつきを目立たなくさせる
    if (isImageWiderThanViewer == null)
        return { width: "100%", height: "100%", objectFit: "contain" };

    return {
        width: isImageWiderThanViewer ? "100%" : "auto",
        height: isImageWiderThanViewer ? "auto" : "100%",
        margin: "auto",
    };
};
