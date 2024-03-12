import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggingInterceptor } from './auth/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from "cookie-parser"
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors:{
      credentials:true,
      origin:[
        'http://localhost:3000'
      ]
    }
  });

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.use(cookieParser())
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })

  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get("PORT")
  await app.listen(PORT);
  console.log(`Server is running at ${PORT}`)

}
bootstrap();
