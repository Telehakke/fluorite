import type { Visibility } from "./types";

export class MessageManager {
    readonly value?: string;
    readonly visibility: Visibility;

    constructor(value?: string, visibility?: Visibility) {
        this.value = value;
        this.visibility = visibility ?? "none";
    }

    /** 指定したメッセージの表示 */
    readonly showMessage = (value?: string): MessageManager => {
        return new MessageManager(value, "visible");
    };

    /** メッセージのフェードアウト */
    readonly hidden = (): MessageManager => {
        return this.copyWith({ visibility: "hidden" });
    };

    /** メッセージの非表示 */
    readonly none = (): MessageManager => {
        return this.copyWith({ visibility: "none" });
    };

    private readonly copyWith = ({
        value,
        visibility,
    }: Partial<{
        value: string;
        visibility: Visibility;
    }>): MessageManager => {
        return new MessageManager(
            value ?? this.value,
            visibility ?? this.visibility,
        );
    };
}
