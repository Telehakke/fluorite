import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Minus, Plus, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, type JSX } from "react";
import { Atom, ImageActionAtom } from "../../../atoms";
import { AutoClickIconButton } from "../../common/AutoClickIconButton";
import { IconButton } from "../../common/IconButton";

export const Menu = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [menuManager, setMenuManager] = useAtom(Atom.menuManager);

    useEffect(() => {
        const div = divRef.current;
        if (div == null) return;

        // メニューのフェードアウトが完了したら非表示状態へ移行
        const handleAnimationend = (): void => {
            if (menuManager.visibility !== "hidden") return;
            setMenuManager((m) => m.none());
        };
        div.addEventListener("animationend", handleAnimationend);
        return (): void =>
            div.removeEventListener("animationend", handleAnimationend);
    }, [menuManager.visibility, setMenuManager]);

    return (
        <div ref={divRef}>
            <Pagination />
            <ZoomButtons />
            <CloseButton />
        </div>
    );
};

/* -------------------------------------------------------------------------- */

const Pagination = (): JSX.Element => {
    const menuManager = useAtomValue(Atom.menuManager);
    const fileManager = useAtomValue(Atom.fileManager);
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const showPreviousFile = useSetAtom(ImageActionAtom.showPreviousFile);
    const showNextFile = useSetAtom(ImageActionAtom.showNextFile);

    if (!menuManager.enablePagination) return <></>;
    if (fileManager.files.length <= 1) return <></>;
    return (
        <div
            className="fluorite-button-container fluorite-pagination"
            data-state={menuManager.visibility}
        >
            <IconButton
                ariaLabel={ariaLabel.pagination?.previousFile}
                onClick={showPreviousFile}
            >
                <Minus className="svg-icon" />
            </IconButton>
            <IconButton
                ariaLabel={ariaLabel.pagination?.nextFile}
                onClick={showNextFile}
            >
                <Plus className="svg-icon" />
            </IconButton>
        </div>
    );
};

/* -------------------------------------------------------------------------- */

const ZoomButtons = (): JSX.Element => {
    const menuManager = useAtomValue(Atom.menuManager);
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const zoomOut = useSetAtom(ImageActionAtom.zoomOut);
    const zoomIn = useSetAtom(ImageActionAtom.zoomIn);

    return (
        <div
            className="fluorite-button-container fluorite-zoom-buttons"
            data-state={menuManager.visibility}
        >
            <AutoClickIconButton
                ariaLabel={ariaLabel.zoomButtons?.zoomOut}
                onClick={zoomOut}
            >
                <ZoomOut className="svg-icon" />
            </AutoClickIconButton>
            <AutoClickIconButton
                ariaLabel={ariaLabel.zoomButtons?.zoomIn}
                onClick={zoomIn}
            >
                <ZoomIn className="svg-icon" />
            </AutoClickIconButton>
        </div>
    );
};

/* -------------------------------------------------------------------------- */

const CloseButton = (): JSX.Element => {
    const menuManager = useAtomValue(Atom.menuManager);
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const setImageSrc = useSetAtom(Atom.imageSrc);

    if (!menuManager.enableCloseButton) return <></>;
    return (
        <div
            className="fluorite-button-container fluorite-close-button"
            data-state={menuManager.visibility}
        >
            <IconButton
                aria-label={ariaLabel.close}
                onClick={() => setImageSrc(undefined)}
            >
                <X className="svg-icon" />
            </IconButton>
        </div>
    );
};
