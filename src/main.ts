import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const __PORT = process.env.PORT || 3001;

    app.enableCors();
    await app.listen(__PORT);

    console.log(`Server is running at http://localhost:${__PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}
bootstrap();
