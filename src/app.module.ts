import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './Products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

const dotenv = require('dotenv');
dotenv.config();
const root = `mongodb+srv://Frank_Pizz10:${process.env.MONGOOSEDB_PASSWORD}@chessapp.gxs4wqp.mongodb.net/nestjs-products?retryWrites=true&w=majority`;

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(root)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
