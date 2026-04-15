/**
 * Shared Security — RBAC Roles Guard
 *
 * NestJS guard for role-based access control (RBAC).
 * Uses the @SetMetadata('roles', ['admin']) decorator to define
 * required roles on controller methods. Checks request.user.roles
 * (set by JwtAuthGuard) against required roles.
 *
 * Usage:
 *   @SetMetadata('roles', ['admin'])
 *   @UseGuards(JwtAuthGuard, RolesGuard)
 *
 * Returns 403 Forbidden if user lacks required roles.
 *
 * Status: Prepared but NOT yet applied to any service.
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      "roles",
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException("No roles assigned");
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}
