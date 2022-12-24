import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './Products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './Gateway/gateway.module';
import { PlayersModule } from './ChessApp/Players/players.module';

const dotenv = require('dotenv');
dotenv.config();
const root = process.env.MONGODB_URL;

@Module({
  imports: [MongooseModule.forRoot(root), ProductsModule, GatewayModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
