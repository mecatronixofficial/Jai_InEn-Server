import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  const logger = new Logger("Bootstrap");

  const port = Number(process.env.PORT) || 4000;

  /* ======================================================
      SECURITY
  ====================================================== */

  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
    }),
  );

  /* ======================================================
      CORS
  ====================================================== */

  const origins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  /* ======================================================
      GLOBAL PREFIX
  ====================================================== */

  app.setGlobalPrefix("api/v1");

  /* ======================================================
      VALIDATION
  ====================================================== */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /* ======================================================
      ERROR FILTER
  ====================================================== */

  app.useGlobalFilters(new AllExceptionsFilter());

  /* ======================================================
      HEALTH CHECK
  ====================================================== */

  const server = app.getHttpAdapter();

  server.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  /* ======================================================
      SWAGGER
  ====================================================== */

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Thangavel Textile API")
    .setDescription("Public catalogue + admin CRUD")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("public", "Public APIs")
    .addTag("admin", "Admin APIs")
    .addTag("auth", "Authentication")
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api/docs", app, doc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  /* ======================================================
      START SERVER
  ====================================================== */

  await app.listen(port);

  logger.log(`🚀 API running on http://localhost:${port}/api/v1`);

  logger.log(`❤️ Health check http://localhost:${port}/health`);

  logger.log(`📘 Swagger UI http://localhost:${port}/api/docs`);
}

bootstrap();
