export declare const DEFAULT_BASE_URL = "https://www.vibeapi.cn";
export declare const DEFAULT_MODELS: import("./model-registry.js").Models;
export declare const DEFAULT_PROFILE_NAME = "default";
export interface ChelperModels {
    haiku: string;
    sonnet: string;
    opus: string;
    reasoning: string;
}
export interface ChelperProfile {
    api_key?: string;
    base_url?: string;
    models?: ChelperModels;
}
export interface ChelperPreset {
    models: ChelperModels;
    updated_at: string;
}
export interface ConfigBackupInfo {
    name: string;
    path: string;
    mtimeMs: number;
}
export interface ChelperConfig {
    lang: string;
    active_profile?: string;
    profiles?: Record<string, ChelperProfile>;
    presets?: Record<string, ChelperPreset>;
    api_key?: string;
    base_url?: string;
    models?: ChelperModels;
}
export declare class ConfigManager {
    private static instance;
    private configDir;
    private configPath;
    private config;
    private runtimeBaseUrl?;
    private constructor();
    private resolveConfigDir;
    private createDefaultConfig;
    private normalizeModels;
    private normalizeProfile;
    private normalizeProfiles;
    private normalizePresets;
    private getResolvedActiveProfile;
    private syncLegacyFields;
    private sanitizeBackupLabel;
    private getBackupDir;
    private getSecretsPath;
    private getSecretsBackupPath;
    private snapshotSecrets;
    private restoreSecretsSnapshot;
    static getInstance(): ConfigManager;
    private ensureConfigDir;
    private loadConfig;
    private hasInlineSecrets;
    private needsMigration;
    private migrateOldConfig;
    private atomicWrite;
    private backupConfig;
    private rotateBackups;
    saveConfig(config?: ChelperConfig): void;
    private extractSecretsForPersistence;
    private hydrateSecretsFromStore;
    getConfig(): ChelperConfig;
    updateConfig(updates: Partial<ChelperConfig>): void;
    isFirstRun(): boolean;
    getLang(): string;
    setLang(lang: string): void;
    getActiveProfileName(): string;
    listProfiles(): string[];
    getProfile(name?: string): ChelperProfile;
    createProfile(name: string, sourceProfileName?: string): void;
    setActiveProfile(name: string): void;
    updateProfile(name: string, updates: Partial<ChelperProfile>): void;
    deleteProfile(name: string): void;
    getApiKey(): string | undefined;
    setApiKey(apiKey: string): void;
    revokeApiKey(): void;
    getApiKeyFingerprint(): string;
    getModels(): typeof DEFAULT_MODELS;
    setModels(models: typeof DEFAULT_MODELS): void;
    updateModels(partial: Partial<typeof DEFAULT_MODELS>): void;
    getCustomPresets(): Record<string, ChelperPreset>;
    saveCustomPreset(name: string, models: typeof DEFAULT_MODELS): void;
    deleteCustomPreset(name: string): void;
    listBackups(): ConfigBackupInfo[];
    createBackup(label?: string): string;
    restoreBackup(name: string): void;
    getBaseUrl(): string;
    setBaseUrl(url: string, persist?: boolean): void;
    resetBaseUrl(): void;
}
export declare const configManager: ConfigManager;
