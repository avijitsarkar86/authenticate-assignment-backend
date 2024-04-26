import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const __PORT = process.env.PORT || 3001;

    app.enableCors();


    /**
     * SWAGGER CONFIGURATION
     */

    const config = new DocumentBuilder()
      .setTitle('Contact Search API')
      .setDescription('Contact Search API documentation')
      .setVersion('1.0')
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);


    // app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(__PORT);

    console.log(`Server is running at http://localhost:${__PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}
bootstrap();
