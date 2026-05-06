export interface ValidateApiKeyResult {
    valid: boolean;
    error?: 'network_error' | 'invalid_api_key' | 'unknown_error';
    message?: string;
}
interface ValidateOptions {
    /** Timeout per attempt in milliseconds. Default: 30_000. */
    timeoutMs?: number;
    /** Number of retries on network error (excluding the first attempt). Default: 2. */
    retries?: number;
    /** Initial backoff delay in ms; doubles each retry. Default: 500. */
    backoffMs?: number;
    /** Override fetch (mainly for tests). */
    fetchFn?: typeof fetch;
    /** Override sleep (mainly for tests). */
    sleepFn?: (ms: number) => Promise<void>;
}
/**
 * 验证 API Key 的有效性和网络连通性，遇到网络错误时按指数退避重试
 */
export declare function validateApiKey(apiKey: string, options?: ValidateOptions): Promise<ValidateApiKeyResult>;
export {};
