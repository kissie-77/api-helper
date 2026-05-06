import { DEFAULT_MODELS } from './config.js';
export interface ToolInfo {
    name: string;
    command: string;
    installCommand: string;
    configPath: string;
    displayName: string;
    hidden?: boolean;
}
export declare const SUPPORTED_TOOLS: Record<string, ToolInfo>;
export declare class ToolManager {
    private static instance;
    private constructor();
    static getInstance(): ToolManager;
    isToolInstalled(toolName: string): boolean;
    installTool(toolName: string): Promise<void>;
    getToolConfig(toolName: string): any;
    updateToolConfig(toolName: string, config: any): void;
    loadPrivateConfig(toolName: string, apiKey: string, models: typeof DEFAULT_MODELS): void;
    getInstalledTools(): string[];
    unloadPrivateConfig(toolName: string): void;
    getSupportedTools(): ToolInfo[];
    isGitInstalled(): boolean;
}
export declare const toolManager: ToolManager;
