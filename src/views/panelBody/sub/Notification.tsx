import { useAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { Atom } from "../../../atoms";

export const Notification = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const timerId = useRef<number | undefined>(undefined);
    const [messageManager, setMessageManager] = useAtom(Atom.messageManager);

    useEffect(() => {
        const div = divRef.current;
        if (div == null) return;

        // メッセージ表示の1秒後にフェードアウト
        if (messageManager.visibility === "visible") {
            window.clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
                setMessageManager((m) => m.hidden());
            }, 1000);
            return;
        }

        // メッセージのフェードアウトが完了したら非表示状態へ移行
        const handleAnimationend = (): void => {
            if (messageManager.visibility !== "hidden") return;
            setMessageManager((m) => m.none());
        };
        div.addEventListener("animationend", handleAnimationend);
        return (): void =>
            div.removeEventListener("animationend", handleAnimationend);
    }, [messageManager.visibility, setMessageManager]);

    if (messageManager.value == null) return <></>;
    if (messageManager.visibility == "none") return <></>;
    return (
        <div
            ref={divRef}
            className="fluorite-notification"
            data-state={messageManager.visibility}
        >
            {messageManager.value}
        </div>
    );
};
