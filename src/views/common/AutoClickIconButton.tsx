import { useRef, type JSX, type ReactNode } from "react";

/** 長押ししている間、onClickを連続で実行するボタン */
export const AutoClickIconButton = (props: {
    ariaLabel?: string;
    onClick: () => void;
    children: ReactNode;
}): JSX.Element => {
    const timeoutId = useRef<number | undefined>(undefined);
    const intervalId = useRef<number | undefined>(undefined);

    const startRepeat = (): void => {
        props.onClick();
        window.clearTimeout(timeoutId.current);
        window.clearInterval(intervalId.current);
        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                props.onClick();
            }, 100);
        }, 500);
    };

    const stopRepeat = (): void => {
        window.clearTimeout(timeoutId.current);
        window.clearInterval(intervalId.current);
    };

    return (
        <button
            className="fluorite-icon-button"
            aria-label={props.ariaLabel}
            onTouchStart={startRepeat}
            onTouchEnd={(e) => {
                // タッチ操作ではマウスイベントを無効化
                e.preventDefault();
                stopRepeat();
            }}
            onMouseDown={startRepeat}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
            onClick={(e) => {
                // 背後の要素にクリックイベントを渡さない
                e.stopPropagation();
            }}
        >
            {props.children}
        </button>
    );
};
