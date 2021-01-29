import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductArgs } from './dtos/product-args.dto';
import { Product } from './models/product.model';
import { ReportService } from './report.service';

@Resolver(() => Product)
export class ReportsResolver {
  constructor(private readonly service: ReportService) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return this.service.findOneById(id);
  }

  @Query(() => [Product])
  async products(@Args() args: ProductArgs): Promise<Product[]> {
    return this.service.findAll(args);
  }
}
