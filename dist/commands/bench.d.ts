interface BenchOptions {
    samples: number;
    fetchFn?: typeof fetch;
}
export declare function benchCommand(args: string[], injected?: BenchOptions): Promise<void>;
export {};
