import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/gaurds/role.gaurd';
import { Roles } from '../auth/role.decorator';

@Controller('protected')
export class ProtectedController {
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  getAdminData() {
    return 'Protected admin data';
  }
}
