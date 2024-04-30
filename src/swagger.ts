import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";

export const setupSwagger = (app: INestApplication) => {
  console.log("ENV :: ", process.env.NODE_ENV);

  // Note: It's important that this comes BEFORE calling SwaggerModule.setup()
  app.use(
    ["/api-doc", "/api-doc-json"],
    expressBasicAuth({
      challenge: true,
      // this is the username and password used to authenticate
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("People Pulse")
    .setDescription("The People Pulse API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-doc", app, document);
};
