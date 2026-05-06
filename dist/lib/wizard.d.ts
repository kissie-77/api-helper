export declare class Wizard {
    private static instance;
    private BOX_WIDTH;
    private apiKeyValid;
    private constructor();
    static getInstance(): Wizard;
    createBox(title: string): void;
    showOperationHints(): void;
    promptWithHints(questions: any[]): Promise<any>;
    printBanner(): void;
    resetScreen(): void;
    runFirstTimeSetup(): Promise<void>;
    configLanguage(): Promise<void>;
    private buildPresetChoices;
    private handleCustomModelInput;
    configModels(options?: {
        skipLoadPrompt?: boolean;
    }): Promise<void>;
    promptLoadAfterModelConfig(): Promise<void>;
    configApiKey(): Promise<void>;
    selectAndConfigureTool(): Promise<void>;
    configureTool(toolName: string): Promise<void>;
    showToolMenu(toolName: string): Promise<void>;
    loadConfig(toolName: string): Promise<void>;
    unloadConfig(toolName: string): Promise<void>;
    run(): Promise<void>;
    showMainMenu(): Promise<void>;
}
export declare const wizard: Wizard;
