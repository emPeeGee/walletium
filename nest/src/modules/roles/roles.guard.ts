import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.data';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRole) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    if (requiredRole === user.role.name) {
      return true;
    } else {
      throw new ForbiddenException('Access to this resource is limited');
    }
  }
}
