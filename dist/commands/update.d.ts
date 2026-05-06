interface UpdateOptions {
    fetchFn?: typeof fetch;
    localVersion?: string;
}
export declare function compareSemver(a: string, b: string): number;
export declare function updateCommand(options?: UpdateOptions): Promise<void>;
export {};
