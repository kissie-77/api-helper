import { Command as Commander } from 'commander';
export declare class Command {
    private program;
    constructor();
    private getVersion;
    private setupProgram;
    private handleInitCommand;
    private preflightArgs;
    execute(args: string[]): Promise<void>;
    getProgram(): Commander;
}
