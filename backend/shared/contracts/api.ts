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
