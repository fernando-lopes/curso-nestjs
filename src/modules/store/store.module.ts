import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, OrderItemService],
})
export class StoreModule {}
