import { Module } from '@nestjs/common';
import { ReportsResolver } from './report.resolver';
import { ReportService } from './report.service';

@Module({
  providers: [ReportService, ReportsResolver],
})
export class ReportsModule {}
