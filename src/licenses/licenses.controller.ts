import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-lienses.dto';
import { AssignLicenseDto } from './dto/assign-license.dto';
import { License } from './licenses.entity';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() createLicenseDto: CreateLicenseDto): Promise<License> {
    return this.licensesService.create(createLicenseDto);
  }

  @Post('assign')
  async assignLicense(
    @Body() assignLicenseDto: AssignLicenseDto,
  ): Promise<License> {
    const { userId, licenseId } = assignLicenseDto;
    const license = await this.licensesService.assignLicense(userId, licenseId);
    if (!license) {
      throw new BadRequestException('License assignment failed');
    }
    return license;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<License> {
    const license = await this.licensesService.findOne(id);
    if (!license) {
      throw new BadRequestException('License not found');
    }
    return license;
  }

  @Get('validate/:userId')
  async validateLicense(
    @Param('userId') userId: number,
  ): Promise<{ valid: boolean }> {
    const valid = await this.licensesService.validateLicense(userId);
    return { valid };
  }

  @Get()
  async findAll(): Promise<License[]> {
    return this.licensesService.findAll();
  }
}
