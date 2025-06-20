import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // allow Angular frontend
    credentials: true, // if you plan to use cookies/auth
  });

  await app.listen(process.env.PORT ?? 4001);
}
bootstrap();
