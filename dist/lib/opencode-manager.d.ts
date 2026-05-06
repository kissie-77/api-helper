import { DEFAULT_MODELS } from './config.js';
export interface OpenCodeConfig {
    $schema?: string;
    provider?: Record<string, {
        options?: {
            apiKey?: string;
            [key: string]: any;
        };
        [key: string]: any;
    }>;
    model?: string;
    small_model?: string;
    mcp?: Record<string, OpenCodeMCPServerConfig>;
    [key: string]: any;
}
export interface OpenCodeMCPServerConfig {
    type: 'local' | 'remote';
    command?: string[];
    environment?: Record<string, string>;
    url?: string;
    headers?: Record<string, string>;
}
export declare class OpenCodeManager {
    private static instance;
    private configPath;
    private constructor();
    static getInstance(): OpenCodeManager;
    /**
     * 确保配置目录存在
     */
    private ensureConfigDir;
    /**
     * 读取配置
     */
    getConfig(): OpenCodeConfig;
    /**
     * 保存配置
     */
    saveConfig(config: OpenCodeConfig): void;
    /**
     * 加载私有 NewAPI 配置到 OpenCode
     */
    loadPrivateConfig(apiKey: string, models: typeof DEFAULT_MODELS): void;
    /**
     * 卸载私有配置
     */
    unloadPrivateConfig(): void;
    /**
     * 检测当前 OpenCode 配置的 API Key
     */
    detectCurrentConfig(): {
        apiKey: string | null;
    };
}
export declare const openCodeManager: OpenCodeManager;
