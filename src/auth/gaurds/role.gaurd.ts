import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userEntity = await this.usersService.findOne(user.id);
    const hasRole = userEntity.roles.some((role) => roles.includes(role.name));
    const hasValidLicense = await this.usersService.validateLicense(user.id);

    return hasRole && hasValidLicense;
  }
}
