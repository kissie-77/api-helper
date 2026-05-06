export interface SettingsTemplate {
    env?: Record<string, string | number>;
    [key: string]: any;
}
export declare function loadSettingsTemplate(): SettingsTemplate;
export declare function reloadTemplate(): void;
