import { ApiError } from "./ApiError.ts";

import type { ApiErrorCode, ApiErrorOptions } from "./ApiError.ts";


interface ApiErrorPayload {
    error: {
        code: ApiErrorCode;
        message: string;
    };
    meta?: {
        request_id?: string;
    };
}

function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

function isApiErrorEnvelope(payload: unknown): payload is ApiErrorPayload {
    if (typeof payload !== "object" || payload === null) {
        return false;
    }

    const candidate = (payload as { error?: unknown }).error;

    return typeof candidate === "object" && candidate !== null && "code" in candidate;
}

function apiErrorFromEnvelope(
    payload: unknown,
    fallbackMessage: string,
    options: ApiErrorOptions = {}
): ApiError {
    if (!isApiErrorEnvelope(payload)) {
        return new ApiError("internal_error", fallbackMessage, { ...options, enveloped: false });
    }

    return new ApiError(payload.error.code, payload.error.message, {
        ...options,
        requestId: payload.meta?.request_id ?? null,
        enveloped: true,
    });
}

export { apiErrorFromEnvelope, isApiError, isApiErrorEnvelope };
export type { ApiErrorPayload };
