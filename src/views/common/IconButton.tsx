import type { JSX, ReactNode } from "react";

export const IconButton = (props: {
    ariaLabel?: string;
    onClick?: () => void;
    children: ReactNode;
}): JSX.Element => {
    return (
        <button
            className="fluorite-icon-button"
            aria-label={props.ariaLabel}
            onClick={(e) => {
                // 背後の要素にクリックイベントを渡さない
                e.stopPropagation();
                props.onClick?.();
            }}
        >
            {props.children}
        </button>
    );
};
