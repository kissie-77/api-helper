export interface CliRuntimeOptions {
    nonInteractive: boolean;
    json: boolean;
    yes: boolean;
    dryRun: boolean;
    color: boolean;
}
export declare function setRuntimeOptions(options: Partial<CliRuntimeOptions>): void;
export declare function getRuntimeOptions(): CliRuntimeOptions;
export declare function isJsonMode(): boolean;
export declare function isNonInteractive(): boolean;
export declare function isDryRun(): boolean;
export declare function shouldAutoConfirm(): boolean;
export declare function isColorEnabled(): boolean;
export declare function resetRuntimeOptions(): void;
export declare function detectColorPreferenceFromEnv(env?: NodeJS.ProcessEnv): boolean;
export declare function emitJson(data: unknown, output?: (line: string) => void): void;
