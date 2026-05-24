import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react/floating-panel";
import type {
    IntlTranslations,
    ResizeTriggerAxis,
    Stage,
} from "@zag-js/floating-panel";
import { useAtomValue } from "jotai";
import { ArrowDownLeft, GripVertical, Maximize2, Minus, X } from "lucide-react";
import { Platform } from "obsidian";
import {
    useEffect,
    useRef,
    type CSSProperties,
    type JSX,
    type ReactNode,
    type RefObject,
} from "react";
import { Atom } from "../../atoms";

type FloatingPanelRoot = {
    /** 初期パネルサイズ */
    defaultSize: { width: number; height: number };
    /** 初期表示位置 */
    defaultPosition: { x: number; y: number };
    /** 最小パネルサイズ */
    minSize: { width: number; height: number };
    /** ブラウザの表示領域からはみ出すのを許可するかどうか */
    allowOverflow: boolean;
    /** 初期展開状態 */
    defaultOpen: boolean;
    /** アクセシビリティ名 */
    ariaLabel?: IntlTranslations;
    children: ReactNode;
};

export const FloatingPanelRoot = (props: FloatingPanelRoot): JSX.Element => {
    return (
        <ArkFloatingPanel.Root
            defaultSize={props.defaultSize}
            defaultPosition={props.defaultPosition}
            minSize={props.minSize}
            allowOverflow={props.allowOverflow}
            defaultOpen={props.defaultOpen}
            translations={props.ariaLabel}
        >
            <FloatingPanelContent>
                {props.children}
                <FloatingPanelResizeTriggers />
            </FloatingPanelContent>
        </ArkFloatingPanel.Root>
    );
};
/* -------------------------------------------------------------------------- */

const FloatingPanelContent = (props: { children: ReactNode }): JSX.Element => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const panelBarHeight = useAtomValue(Atom.panelBarHeight);

    useEffect(() => {
        const div = divRef.current;
        if (div == null) return;

        // スマホで左右にスワイプするとObsidianのサイドメニューが表示される動作を、
        // フローティングパネル上では無効にする
        const handleTouchmove = (event: TouchEvent): void =>
            event.stopPropagation();
        div.addEventListener("touchmove", handleTouchmove, {
            passive: false,
        });
        return (): void =>
            div.removeEventListener("touchmove", handleTouchmove);
    }, []);

    const style = {
        "--panel-bar-height": `${panelBarHeight}px`,
    } as CSSProperties;

    return (
        <ArkFloatingPanel.Positioner
            ref={divRef}
            className={`fluorite ${Platform.isDesktop ? "" : "mobile-navbar-actions"}`}
            style={style}
        >
            <ArkFloatingPanel.Content className="fluorite">
                {props.children}
            </ArkFloatingPanel.Content>
        </ArkFloatingPanel.Positioner>
    );
};

const FloatingPanelResizeTriggers = (): JSX.Element => {
    // prettier-ignore
    const axes: ResizeTriggerAxis[] = ["n", "e", "w", "s", "ne", "se", "sw", "nw"];

    return (
        <>
            {axes.map((a) => (
                <ArkFloatingPanel.ResizeTrigger axis={a} className="fluorite" />
            ))}
        </>
    );
};

/* -------------------------------------------------------------------------- */

export const FloatingPanelHeader = ({
    ref,
    children,
}: {
    ref: RefObject<HTMLDivElement | null>;
    children: ReactNode;
}): JSX.Element => {
    return (
        <ArkFloatingPanel.Header className="fluorite" ref={ref}>
            {children}
        </ArkFloatingPanel.Header>
    );
};

export const FloatingPanelDragTrigger = (): JSX.Element => {
    return (
        <ArkFloatingPanel.DragTrigger className="fluorite">
            <GripVertical className="svg-icon" />
        </ArkFloatingPanel.DragTrigger>
    );
};

export const FloatingPanelControl = (props: {
    closeTriggerAriaLabel?: string;
    onCloseClick: () => void;
}): JSX.Element => {
    return (
        <ArkFloatingPanel.Control className="fluorite">
            <StageTrigger stage="minimized">
                <Minus className="svg-icon" />
            </StageTrigger>
            <StageTrigger stage="maximized">
                <Maximize2 className="svg-icon" />
            </StageTrigger>
            <StageTrigger stage="default">
                <ArrowDownLeft className="svg-icon" />
            </StageTrigger>
            <ArkFloatingPanel.CloseTrigger
                className="clickable-icon"
                aria-label={props.closeTriggerAriaLabel}
                onClick={props.onCloseClick}
            >
                <X className="svg-icon" />
            </ArkFloatingPanel.CloseTrigger>
        </ArkFloatingPanel.Control>
    );
};

const StageTrigger = (props: {
    stage: Stage;
    children: ReactNode;
}): JSX.Element => (
    <ArkFloatingPanel.StageTrigger
        className="fluorite clickable-icon"
        stage={props.stage}
    >
        {props.children}
    </ArkFloatingPanel.StageTrigger>
);

/* -------------------------------------------------------------------------- */

export const FloatingPanelBody = ({
    ref,
    children,
}: {
    ref: RefObject<HTMLDivElement | null>;
    children: ReactNode;
}): JSX.Element => {
    return (
        <ArkFloatingPanel.Body className="fluorite" ref={ref}>
            {children}
        </ArkFloatingPanel.Body>
    );
};
