import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './licenses.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateLicenseDto } from './dto/create-lienses.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private licensesRepository: Repository<License>,
    private usersService: UsersService, // Inject UsersService correctly
    private jwtService: JwtService,
  ) {}

  // async createLicenseForUser(userId: number): Promise<License> {
  //   const user = await this.usersService.findOne(userId);

  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }

  //   const license = new License();
  //   const payload = { userId: user.id };
  //   license.licenseKey = this.jwtService.sign(payload, { expiresIn: '10m' });
  //   license.expiryDate = new Date(new Date().getTime() + 10 * 60000); // 10 minutes from now
  //   license.user = user; // Assign the correct user

  //   return this.licensesRepository.save(license);
  // }

  async createLicenseForUser(userId: number): Promise<Partial<License>> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const license = new License();
    const payload = { userId: user.id };
    license.licenseKey = this.jwtService.sign(payload, { expiresIn: '10m' });
    license.expiryDate = new Date(new Date().getTime() + 10 * 60000); // 10 minutes from now
    license.user = user;

    const savedLicense = await this.licensesRepository.save(license);

    return classToPlain(savedLicense) as Partial<License>; // Transform to plain object
  }

  async assignLicense(
    userId: number,
    licenseId: number,
  ): Promise<License | null> {
    const user = await this.usersService.findOne(userId);
    const license = await this.findOne(licenseId);

    if (!user || !license) {
      return null;
    }

    // Check if license is already assigned to avoid duplicates
    if (
      !user.licenses.some((existingLicense) => existingLicense.id === licenseId)
    ) {
      user.licenses.push(license);
      await this.usersService.updateUser(user); // Update user using UsersService
    }

    return license;
  }
  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const license = this.licensesRepository.create(createLicenseDto);
    if (!license.licenseKey) {
      throw new BadRequestException('License key must be provided.');
    }
    return this.licensesRepository.save(license);
  }

  async findOne(id: number): Promise<License> {
    return this.licensesRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<License[]> {
    return this.licensesRepository.find();
  }

  async validateLicense(userId: number): Promise<boolean> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      return false;
    }

    const validLicense = user.licenses.some(
      (license) => license.isActive && license.expiryDate > new Date(),
    );

    return validLicense;
  }
}
