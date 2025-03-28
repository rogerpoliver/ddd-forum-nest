import {
    Body,
    ConflictException,
    Controller,
    HttpCode,
    Post,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

type Person = {
    name: string;
    email: string;
    password: string;
};

@Controller("/accounts")
export class CreateAccountController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
    async handle(@Body() body: Person) {
        const { name, email, password } = body;

        const emailAlreadyExists = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (emailAlreadyExists) {
            throw new ConflictException("Email already exists");
        }

        await this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }
}
