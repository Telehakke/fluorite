export class FileManager {
    readonly files: readonly File[];
    readonly index: number;

    constructor(files?: readonly File[], index?: number) {
        this.files = files ?? [];
        this.index = index ?? 0;
    }

    /** ファイルが1つ以上あるかどうか */
    readonly hasFiles = (): boolean => {
        return this.files.length > 0;
    };

    /** 現在のインデックスに位置するファイルを取得 */
    readonly getCurrentFile = (): File | undefined => {
        if (this.index < 0) return undefined;
        return this.files.at(this.index);
    };

    /** ファイルの進行状況 */
    readonly progress = (): string | undefined => {
        if (!this.hasFiles()) return undefined;
        return `${this.index + 1} / ${this.files.length}`;
    };

    /** インデックスを1減らす */
    readonly decrementIndex = (): FileManager => {
        return this.copyWith({ index: Math.max(this.index - 1, 0) });
    };

    /** インデックスを1増やす */
    readonly incrementIndex = (): FileManager => {
        return this.copyWith({
            index: Math.min(this.index + 1, this.files.length - 1),
        });
    };

    /** ファイル名をもとにaからzの順でファイルを並び替え */
    readonly sorted = (): FileManager => {
        return this.copyWith({
            files: [...this.files].sort((a, b) => a.name.localeCompare(b.name)),
        });
    };

    private readonly copyWith = ({
        files,
        index,
    }: Partial<{
        files: readonly File[];
        index: number;
    }>): FileManager => {
        return new FileManager(files ?? this.files, index ?? this.index);
    };
}
