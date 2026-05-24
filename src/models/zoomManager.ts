type Size = Readonly<{
    width: number;
    height: number;
}>;

const STEP = 50;
const MIN = 100;
const MAX = 10000;

export class ZoomManager {
    readonly scale: number;
    readonly panelBodySize: Size | undefined;
    readonly imageSize: Size | undefined;

    constructor(scale?: number, panelBodySize?: Size, imageSize?: Size) {
        this.scale = scale ?? MIN;
        this.panelBodySize = panelBodySize;
        this.imageSize = imageSize;
    }

    /** パネルのボディサイズを設定 */
    setPanelBodySize = (size: Size): ZoomManager => {
        return this.copyWith({ panelBodySize: size });
    };

    /** 画像サイズを設定 */
    setImageSize = (size: Size): ZoomManager => {
        return this.copyWith({ imageSize: size });
    };

    /** 画像サイズを削除 */
    removeImageSize = (): ZoomManager => {
        return new ZoomManager(this.scale, this.panelBodySize, undefined);
    };

    /** 拡大率を50%減らす */
    zoomOut = (): ZoomManager => {
        return this.copyWith({ scale: Math.max(this.scale - STEP, MIN) });
    };

    /** 拡大率を50%増やす */
    zoomIn = (): ZoomManager => {
        return this.copyWith({ scale: Math.min(this.scale + STEP, MAX) });
    };

    /** 拡大率を100%に設定 */
    resetScale = (): ZoomManager => {
        return this.copyWith({ scale: MIN });
    };

    /** 現在の拡大率を取得 */
    zoomPercentageText = (): string => {
        return `${this.scale}%`;
    };

    /** パネル縦横比よりも画像の方が横に長いかどうか */
    isImageWiderThanViewer = (): boolean | undefined => {
        if (this.panelBodySize == null || this.imageSize == null)
            return undefined;

        const panelBodyRatio =
            this.panelBodySize.width / this.panelBodySize.height;
        const imageViewRatio = this.imageSize.width / this.imageSize.height;
        return panelBodyRatio <= imageViewRatio;
    };

    private copyWith = ({
        scale,
        panelBodySize,
        imageSize,
    }: Partial<{
        scale: number;
        panelBodySize: Size;
        imageSize: Size;
    }>): ZoomManager => {
        return new ZoomManager(
            scale ?? this.scale,
            panelBodySize ?? this.panelBodySize,
            imageSize ?? this.imageSize,
        );
    };
}
