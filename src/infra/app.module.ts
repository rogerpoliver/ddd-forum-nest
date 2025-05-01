import { envSchema } from "@/infra/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "./http/controllers/authenticate.controller";
import { CreateAccountController } from "./http/controllers/create-account.controller";
import { CreateQuestionController } from "./http/controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./http/controllers/fetch-recent-questions.controller";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestionController,
		FetchRecentQuestionsController,
	],
	providers: [PrismaService],
})
export class AppModule {}
