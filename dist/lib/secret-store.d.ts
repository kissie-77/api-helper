export declare class SecretStoreDecryptError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
export declare class SecretStore {
    private static instance;
    private secretsDir;
    private secretsPath;
    private lastDecryptError;
    private constructor();
    static getInstance(): SecretStore;
    private ensureDir;
    private writeAtomic;
    private readEnvelope;
    private decrypt;
    private encrypt;
    private loadRecord;
    private safeLoadRecord;
    private persistRecord;
    isAvailable(): boolean;
    getLastDecryptError(): SecretStoreDecryptError | null;
    fingerprint(profile: string): string;
    getApiKey(profile: string): string | undefined;
    setApiKey(profile: string, apiKey: string): void;
    deleteApiKey(profile: string): void;
    listProfilesWithKeys(): string[];
    deleteAll(): void;
}
export declare const secretStore: SecretStore;
