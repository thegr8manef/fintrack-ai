/**
 * Shared Contracts — API Types
 *
 * Common response types used across all microservices:
 * - ServiceHealthResponse: Standard health check format for /health endpoints
 * - PaginatedResponse<T>:  Wrapper for paginated list endpoints with meta info
 * - ApiErrorResponse:       Standard error response format with status code and message
 *
 * These types ensure consistent API responses across the entire platform.
 */
export interface ServiceHealthResponse {
  status: "ok" | "degraded" | "down";
  service: string;
  timestamp: string;
  version?: string;
  uptime?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  details?: unknown;
}
