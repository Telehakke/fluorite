import type { Visibility } from "./types";

export class MenuManager {
    readonly visibility: Visibility;
    readonly enableCloseButton: boolean;
    readonly enablePagination: boolean;

    constructor(
        visibility?: Visibility,
        enableCloseButton?: boolean,
        enablePagination?: boolean,
    ) {
        this.visibility = visibility ?? "none";
        this.enableCloseButton = enableCloseButton ?? false;
        this.enablePagination = enablePagination ?? false;
    }

    /** メニューの表示 */
    readonly visible = (): MenuManager => {
        return this.copyWith({ visibility: "visible" });
    };

    /** メニューの非表示 */
    readonly none = (): MenuManager => {
        return this.copyWith({ visibility: "none" });
    };

    /** メニューを開く、または閉じる */
    readonly openClose = (): MenuManager => {
        switch (this.visibility) {
            case "visible":
                return this.copyWith({ visibility: "hidden" });
            case "hidden":
                return this;
            case "none":
                return this.copyWith({ visibility: "visible" });
        }
    };

    /** 閉じるボタンの有効性を設定 */
    readonly setEnableCloseButton = (value: boolean): MenuManager => {
        return this.copyWith({ enableCloseButton: value });
    };

    /** ファイル移動ボタンの有効性を設定 */
    readonly setEnablePagination = (value: boolean): MenuManager => {
        return this.copyWith({ enablePagination: value });
    };

    private readonly copyWith = ({
        visibility,
        enableCloseButton,
        enablePagination,
    }: Partial<{
        visibility: Visibility;
        enableCloseButton: boolean;
        enablePagination: boolean;
    }>): MenuManager => {
        return new MenuManager(
            visibility ?? this.visibility,
            enableCloseButton ?? this.enableCloseButton,
            enablePagination ?? this.enablePagination,
        );
    };
}
