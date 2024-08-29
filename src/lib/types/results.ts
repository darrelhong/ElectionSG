import { z } from 'zod';

const Result = z.object({
	type: z.string(),
	parties: z.array(
		z.object({
			party: z.string(),
			vote_count: z.number().or(z.null()),
			vote_percentage: z.number().or(z.null()),
			candidates: z.array(z.string())
		})
	)
});

export const Results = z.record(z.string(), Result);
