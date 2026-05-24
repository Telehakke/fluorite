import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { Atom, SnapshotActionAtom } from "../../../atoms";

export const SnapshotView = (): JSX.Element => {
    const snapshot = useAtomValue(Atom.snapshot);
    const imageSrc = useAtomValue(Atom.imageSrc);
    const showImage = useSetAtom(SnapshotActionAtom.showImage);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (snapshot == null) return;
        if (divRef.current == null) return;

        snapshot.querySelectorAll("img").forEach((el) => {
            el.addEventListener("click", () => {
                showImage(el);
            });
        });

        divRef.current.append(snapshot);
    }, [showImage, snapshot]);

    if (snapshot == null) return <></>;
    return (
        <div
            ref={divRef}
            style={{ display: imageSrc != null ? "none" : undefined }}
        />
    );
};
