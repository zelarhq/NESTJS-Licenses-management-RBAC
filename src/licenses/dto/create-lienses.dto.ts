export class CreateLicenseDto {
  readonly name: string;
  readonly expiryDate: Date;
  readonly isActive: boolean;
}
