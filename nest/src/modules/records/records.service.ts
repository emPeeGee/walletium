import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
import { Label } from '../labels/labels.entity';
import { LabelsService } from '../labels/labels.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { IRecord, IRecordFrontend } from './interfaces/record.interface';
import { Record, RecordType } from './record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private repository: Repository<Record>,
    private accountsService: AccountsService,
    private categoriesService: CategoriesService,
    private labelsService: LabelsService,
  ) {}

  public async findAll(): Promise<IRecordFrontend[]> {
    return this.simplifyRecords(
      await this.repository.find({
        order: {
          userChosenDate: 'DESC',
        },
      }),
    );
  }

  public async findOne(id: string): Promise<IRecordFrontend> {
    try {
      return this.simplifyRecord(await this.repository.findOne({ id }));
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  public async findByAccount(accountId: string): Promise<IRecordFrontend[]> {
    const account = await this.accountsService.findOne(accountId);
    return this.simplifyRecords(
      await this.repository.find({
        where: { account },
        order: {
          userChosenDate: 'DESC',
        },
      }),
    );
  }

  public async create(createRecord: CreateRecordDto): Promise<Record> {
    const suchAccount = await this.accountsService.findOne(createRecord.accountId);
    if (!suchAccount) {
      throw new BadRequestException('Such account does not exists!');
    }

    const suchCategory = await this.categoriesService.findOne(createRecord.categoryId);
    if (!suchCategory) {
      throw new BadRequestException('Such category does not exists!');
    }

    const labels: Label[] = [];
    if (createRecord.labels) {
      createRecord.labels.forEach(async (labelId) => {
        const label = await this.labelsService.findOne(labelId);
        if (label) {
          labels.push(label);
        }
      });
    }

    const recordToSave: IRecord = {
      ...createRecord,
      account: suchAccount,
      category: suchCategory,
      labels: labels,
      type: createRecord.type as RecordType,
    };

    const createdRecord = this.repository.save(recordToSave);
    console.log(createdRecord);

    return createdRecord;
  }

  public async update(updateRecord: UpdateRecordDto) {
    const suchAccount = await this.accountsService.findOne(updateRecord.accountId);
    if (!suchAccount) {
      throw new BadRequestException('Such account does not exists!');
    }

    const suchCategory = await this.categoriesService.findOne(updateRecord.categoryId);
    if (!suchCategory) {
      throw new BadRequestException('Such category does not exists!');
    }

    const labels: Label[] = [];
    if (updateRecord.labels) {
      updateRecord.labels.forEach(async (labelId) => {
        const label = await this.labelsService.findOne(labelId);
        if (label) {
          labels.push(label);
        }
      });
    }

    const recordToSave: IRecord = {
      ...updateRecord,
      account: suchAccount,
      category: suchCategory,
      labels: labels,
      type: updateRecord.type as RecordType,
    };

    const updatedRecord = this.repository.save(recordToSave);
    return updatedRecord;
  }

  public async delete(id: string): Promise<any> {
    const record = await this.repository.findOne(id);
    const deletedRecord = await this.repository.remove(record);
    return deletedRecord;
  }

  private simplifyRecords(records: Record[]): IRecordFrontend[] {
    const simpliedRecords: IRecordFrontend[] = records.map((record) => {
      return {
        ...record,
        account: {
          id: record.account.id,
          name: record.account.name,
          currency: record.account.currency,
          color: record.account.color,
        },
        category: {
          id: record.category.id,
          name: record.category.name,
          image: record.category.imagePath,
        },
      };
    });

    return simpliedRecords;
  }

  private simplifyRecord(record: Record): IRecordFrontend {
    return {
      ...record,
      account: {
        id: record.account.id,
        name: record.account.name,
        currency: record.account.currency,
        color: record.account.color,
      },
      category: {
        id: record.category.id,
        name: record.category.name,
        image: record.category.imagePath,
      },
    };
  }
}
