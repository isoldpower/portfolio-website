type KnownApiErrorCode =
    | "bad_request"
    | "unauthorized"
    | "forbidden"
    | "not_found"
    | "conflict"
    | "validation_failed"
    | "rate_limited"
    | "internal_error"
    | "service_unavailable"
    | "gateway_timeout";

type ApiErrorCode = KnownApiErrorCode | (string & {});

interface ApiErrorOptions {
    status?: number | null;
    requestId?: string | null;
    retryAfterSeconds?: number | null;
    enveloped?: boolean;
}

const UNMAPPED_STATUS = 500;

class ApiError extends Error {
    readonly code: ApiErrorCode;
    readonly status: number;
    readonly requestId: string | null;
    readonly retryAfterSeconds: number | null;
    readonly enveloped: boolean;

    constructor(code: ApiErrorCode, message: string, options: ApiErrorOptions = {}) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.status = options.status ?? UNMAPPED_STATUS;
        this.requestId = options.requestId ?? null;
        this.retryAfterSeconds = options.retryAfterSeconds ?? null;
        this.enveloped = options.enveloped ?? true;
    }
}

export { ApiError };
export type { ApiErrorCode, ApiErrorOptions, KnownApiErrorCode };
