import { type Either, right } from "@/core/either";
import type { Question } from "@/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { Injectable } from "@nestjs/common";

interface FetchRecentQuestionsUseCaseRequest {
	page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
	null,
	{
		questions: Question[];
	}
>;

@Injectable()
export class FetchRecentQuestionsUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		page,
	}: FetchRecentQuestionsUseCaseRequest): Promise<
		FetchRecentQuestionsUseCaseResponse
	> {
		const questions = await this.questionsRepository.findManyRecent({
			page,
		});

		return right({
			questions,
		});
	}
}
