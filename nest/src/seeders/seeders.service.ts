import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RolesService } from 'src/modules/roles/roles.service';

@Injectable()
export class SeedersService implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly rolesService: RolesService,
  ) {}

  onModuleInit() {
    this.seed()
      .then(() => {
        this.logger.debug('Seeding complete!');
      })
      .catch((error) => {
        this.logger.error('Seeding failed');
        this.logger.error(error);
      });
  }

  async seed() {
    await this.rolesSeed();
  }

  async rolesSeed() {
    return await Promise.all(this.rolesService.seed())
      .then((createdLanguages) => {
        this.logger.debug(
          'No. of roles created : ' +
            createdLanguages.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
