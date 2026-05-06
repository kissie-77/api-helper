export interface ConfirmOptions {
    message: string;
    defaultValue?: boolean;
}
export declare function confirmAction({ message, defaultValue }: ConfirmOptions): Promise<boolean>;
export interface DryRunGuardArgs<T> {
    description: string;
    json?: T;
    apply: () => void | Promise<void>;
    onApplied?: () => void;
}
export declare function applyOrDryRun<T>({ description, json, apply, onApplied }: DryRunGuardArgs<T>): Promise<void>;
