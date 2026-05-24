import { useAtomValue, useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";
import type { JSX } from "react";
import { Atom, ImageActionAtom, SnapshotActionAtom } from "../../../atoms";

export const ImageOrSnapshotRemoveButton = (): JSX.Element => {
    const contentType = useAtomValue(Atom.contentType);
    const removeImageFiles = useSetAtom(ImageActionAtom.removeFiles);
    const removeSnapshot = useSetAtom(SnapshotActionAtom.removeSnapshot);

    return (
        <>
            {contentType === "image" && (
                <IconButton onClick={removeImageFiles} />
            )}
            {contentType === "snapshot" && (
                <IconButton onClick={removeSnapshot} />
            )}
        </>
    );
};

const IconButton = (props: { onClick: () => void }): JSX.Element => {
    const ariaLabel = useAtomValue(Atom.ariaLabel);

    return (
        <button
            className="clickable-icon"
            aria-label={ariaLabel.remove}
            onClick={props.onClick}
        >
            <Trash2 className="svg-icon" />
        </button>
    );
};
