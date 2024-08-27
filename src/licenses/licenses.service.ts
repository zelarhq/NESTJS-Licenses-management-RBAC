import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './licenses.entity';
import { User } from '../users/user.entity';
import { CreateLicenseDto } from './dto/create-lienses.dto';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private licensesRepository: Repository<License>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const license = this.licensesRepository.create(createLicenseDto);
    if (!license.licenseKey) {
      throw new BadRequestException('License key must be provided.');
    }
    return this.licensesRepository.save(license);
  }

  async assignLicense(
    userId: number,
    licenseId: number,
  ): Promise<License | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['licenses'],
    });
    const license = await this.licensesRepository.findOne({
      where: { id: licenseId },
    });

    if (!user || !license) {
      return null;
    }

    // Check if license is already assigned to avoid duplicates
    if (
      !user.licenses.some((existingLicense) => existingLicense.id === licenseId)
    ) {
      user.licenses.push(license);
      await this.usersRepository.save(user);
    }

    return license;
  }
  async findOne(id: number): Promise<License> {
    return this.licensesRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<License[]> {
    return this.licensesRepository.find();
  }

  async validateLicense(userId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['licenses'],
    });

    if (!user) {
      return false;
    }

    const validLicense = user.licenses.some(
      (license) => license.isActive && license.expiryDate > new Date(),
    );

    return validLicense;
  }
}
