/**
 * Shared Security — JWT Authentication Guard
 *
 * NestJS guard that validates JWT Bearer tokens on protected routes.
 * Extracts the token from the Authorization header, verifies it with
 * the shared JWT_SECRET, and attaches the decoded payload to request.user.
 *
 * Usage: @UseGuards(JwtAuthGuard) on controllers or specific routes.
 *
 * Security:
 * - Rejects requests without Authorization header
 * - Rejects non-Bearer token schemes
 * - Throws UnauthorizedException for expired or invalid tokens
 *
 * Status: Prepared but NOT yet applied globally to any service.
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Missing or invalid authorization header",
      );
    }

    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
