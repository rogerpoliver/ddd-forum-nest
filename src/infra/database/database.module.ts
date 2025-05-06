import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";

const prismaRepositories = [
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentsRepository,
];

@Module({
    providers: [
        PrismaService,
        ...prismaRepositories,
    ],
    exports: [
        PrismaService,
        ...prismaRepositories,
    ],
})
export class DatabaseModule {}
