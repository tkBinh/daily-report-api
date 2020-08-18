import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import 'dotenv/config';

const config = process.env;

@Module({
  imports: [
    // DB connection
    TypeOrmModule.forRoot({
      type: "mysql",
      host: config.AWS_DATABASE_HOST,
      port: Number(config.DATABASE_PORT),
      username: config.AWS_DATABASE_USERNAME,
      password: config.AWS_DATABASE_PASSWORD,
      database: config.AWS_DATABASE_DBNAME,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: false,
      logging : true,
      timezone: config.DATABASE_TIMEZONE,
    }),
    // TODO: Include all module
    
  ]
})
export class MainModule {}
