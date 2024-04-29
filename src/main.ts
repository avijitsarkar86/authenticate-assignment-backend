import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const __PORT = process.env.PORT || 3001;

    const __ENV = process.env.NODE_ENV;

    app.enableCors();

    /**
     * SWAGGER CONFIGURATION
     */

    const config = new DocumentBuilder()
      .setTitle('Contact Search API')
      .setDescription('Contact Search API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(__PORT, () => {
      console.log(`Server is running at PORT "${__PORT}" in "${__ENV}" mode`);
    });
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}
bootstrap();
