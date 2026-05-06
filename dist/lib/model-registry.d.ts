export interface Models {
    haiku: string;
    sonnet: string;
    opus: string;
    reasoning: string;
}
export interface ModelPreset {
    name: string;
    model?: string;
    models?: Models;
    recommended?: boolean;
}
export interface ModelRegistryData {
    defaultModels: Models;
    presets: ModelPreset[];
}
export declare function getDefaultModels(): Models;
export declare function getPresets(): ModelPreset[];
export declare function resolvePreset(preset: ModelPreset): Models;
export declare function reloadRegistry(): void;
