import { type Either, right } from "@/core/either";
import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

interface FetchQuestionCommentsUseCaseRequest {
	questionId: string;
	page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;

export class FetchQuestionCommentsUseCase {
	constructor(
		private questionCommentsRepository: QuestionCommentsRepository,
	) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseRequest): Promise<
		FetchQuestionCommentsUseCaseResponse
	> {
		const questionComments = await this.questionCommentsRepository
			.findManyByQuestionId(
				questionId,
				{
					page,
				},
			);

		return right({
			questionComments,
		});
	}
}
