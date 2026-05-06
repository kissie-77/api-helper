import { DEFAULT_MODELS } from './config.js';
export interface ClaudeCodeSettingsConfig {
    env?: {
        ANTHROPIC_AUTH_TOKEN?: string;
        ANTHROPIC_BASE_URL?: string;
        ANTHROPIC_DEFAULT_HAIKU_MODEL?: string;
        ANTHROPIC_DEFAULT_SONNET_MODEL?: string;
        ANTHROPIC_DEFAULT_OPUS_MODEL?: string;
        ANTHROPIC_MODEL?: string;
        ANTHROPIC_REASONING_MODEL?: string;
        API_TIMEOUT_MS?: string;
        CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC?: number;
        [key: string]: any;
    };
    [key: string]: any;
}
export interface ClaudeCodeMCPServerConfig {
    type: 'stdio' | 'sse' | 'http';
    command?: string;
    args?: string[];
    env?: Record<string, string>;
    url?: string;
    headers?: Record<string, string>;
}
export interface ClaudeCodeMCPConfig {
    mcpServers?: Record<string, ClaudeCodeMCPServerConfig>;
    hasOpusPlanDefault?: boolean;
    lastReleaseNotesSeen?: string;
    hasCompletedOnboarding?: boolean;
    [key: string]: any;
}
export declare class ClaudeCodeManager {
    private static instance;
    private settingsPath;
    private mcpConfigPath;
    private constructor();
    static getInstance(): ClaudeCodeManager;
    /**
     * 确保配置目录存在
     */
    private ensureConfigDir;
    private atomicWrite;
    /**
     * 读取 settings.json 配置
     */
    getSettings(): ClaudeCodeSettingsConfig;
    /**
     * 保存 settings.json 配置
     */
    saveSettings(config: ClaudeCodeSettingsConfig): void;
    /**
     * 读取 MCP 配置 (~/.claude.json)
     */
    getMCPConfig(): ClaudeCodeMCPConfig;
    /**
     * 保存 MCP 配置 (~/.claude.json)
     */
    saveMCPConfig(config: ClaudeCodeMCPConfig): void;
    /**
     * 加载私有 NewAPI 配置到 Claude Code
     */
    loadPrivateConfig(apiKey: string, models: typeof DEFAULT_MODELS): void;
    /**
     * 确保 .claude.json 中有 hasCompletedOnboarding: true
     */
    private ensureOnboardingCompleted;
    /**
     * 清理 shell rc 文件中的 ANTHROPIC_API_KEY 和 ANTHROPIC_BASE_URL 环境变量
     */
    private cleanupShellEnvVars;
    /**
     * 获取当前 shell 的 rc 文件路径
     */
    private getShellRcFilePath;
    /**
     * 卸载私有配置从 Claude Code
     */
    unloadPrivateConfig(): void;
    /**
     * 检测当前 Claude Code 配置的 API Key
     * @returns 包含 API Key 的对象
     */
    detectCurrentConfig(): {
        apiKey: string | null;
    };
    /**
     * Get experimental feature value
     */
    getExperimentalFeature(key: string): string | number | undefined;
    /**
     * Set experimental feature (idempotent)
     */
    setExperimentalFeature(key: string, value: string | number): void;
    /**
     * Remove experimental feature
     */
    removeExperimentalFeature(key: string): void;
}
export declare const claudeCodeManager: ClaudeCodeManager;
