import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload";
import type { FileMimeType, IntlTranslations } from "@zag-js/file-upload";
import { useAtomValue, useSetAtom } from "jotai";
import { Image, ImagePlay } from "lucide-react";
import { moment } from "obsidian";
import {
    useEffect,
    useRef,
    type JSX,
    type ReactNode,
    type RefObject,
} from "react";
import { Atom, ImageActionAtom } from "../../../atoms";

export const FileUpload = (): JSX.Element => {
    const clearTriggerRef = useRef<HTMLButtonElement | null>(null);
    const fileUploadClearSignal = useAtomValue(Atom.fileUploadClearSignal);
    const ariaLabel = useAtomValue(Atom.ariaLabel);
    const loadFiles = useSetAtom(ImageActionAtom.loadFiles);

    useEffect(() => {
        if (fileUploadClearSignal === 0) return;
        clearTriggerRef.current?.click();
    }, [fileUploadClearSignal]);

    return (
        <FileUploadRoot
            accept={["image/*"]}
            maxFiles={Infinity}
            ariaLabel={ariaLabel.fileUploadRoot}
            locale={moment.locale()}
            onFIleAccept={loadFiles}
        >
            <FileUploadTrigger ariaLabel={ariaLabel.fileUploadTrigger} />
            <ImageViewShowButton ariaLabel={ariaLabel.showFiles} />
            <FileUploadClearTrigger ref={clearTriggerRef} />
        </FileUploadRoot>
    );
};

/* -------------------------------------------------------------------------- */

type FileUpload = {
    /** 選択できるファイルの種類 */
    accept: FileMimeType[];
    /** 最大選択ファイル数 */
    maxFiles: number;
    /** アクセシビリティ名 */
    ariaLabel?: IntlTranslations;
    /** ローカライズ */
    locale: string;
    /** ファイルが選択されると呼び出される関数 */
    onFIleAccept: (files: File[]) => void;
    children: ReactNode;
};

const FileUploadRoot = (props: FileUpload): JSX.Element => {
    return (
        <ArkFileUpload.Root
            className="fluorite"
            accept={props.accept}
            maxFiles={props.maxFiles}
            translations={props.ariaLabel}
            locale={props.locale}
            onFileAccept={(details) => props.onFIleAccept(details.files)}
        >
            {props.children}
            <ArkFileUpload.HiddenInput />
        </ArkFileUpload.Root>
    );
};

const FileUploadTrigger = (props: { ariaLabel?: string }): JSX.Element => {
    const fileManager = useAtomValue(Atom.fileManager);

    if (fileManager.hasFiles()) return <></>;
    return (
        <ArkFileUpload.Trigger
            className="clickable-icon"
            aria-label={props.ariaLabel}
        >
            <Image className="svg-icon" />
        </ArkFileUpload.Trigger>
    );
};

const FileUploadClearTrigger = ({
    ref,
}: {
    ref: RefObject<HTMLButtonElement | null>;
}): JSX.Element => {
    return <ArkFileUpload.ClearTrigger style={{ display: "none" }} ref={ref} />;
};

/* -------------------------------------------------------------------------- */

const ImageViewShowButton = (props: { ariaLabel?: string }): JSX.Element => {
    const fileManager = useAtomValue(Atom.fileManager);
    const contentType = useAtomValue(Atom.contentType);
    const showCurrentFile = useSetAtom(ImageActionAtom.showCurrentFile);

    if (!fileManager.hasFiles()) return <></>;
    return (
        <button
            className="clickable-icon fluorite-relative"
            aria-label={props.ariaLabel}
            onClick={showCurrentFile}
        >
            <ImagePlay className="svg-icon" />
            <div
                className="fluorite-indicator"
                hidden={contentType !== "image"}
            />
        </button>
    );
};
