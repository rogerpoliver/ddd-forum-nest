import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import type { PrismaService } from "@/prisma/prisma.service";
import {
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from "zod";

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body: CreateAccountBodySchema) {
		const { name, email, password } = body;

		const emailAlreadyExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (emailAlreadyExists) {
			throw new ConflictException("Email already exists");
		}

		const hashedPassword = await hash(password, 8);

		await this.prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
	}
}
