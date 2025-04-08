import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./controllers/create-account.controller";
import { envSchema } from "../src/env";
import { ConfigModule } from "@nestjs/config";
import { AuthenticateController } from "./controllers/authenticate.controller";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
	],
	controllers: [CreateAccountController, AuthenticateController],
	providers: [PrismaService],
})
export class AppModule {}
