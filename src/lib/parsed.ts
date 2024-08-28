import results2020 from '$lib/data/2020-results.json';
import results2015 from '$lib/data/2015-results.json';
import { Results } from '$lib/types/results';

export const parsedResults2020 = Results.parse(results2020);
const parsedResults2015 = Results.parse(results2015);

export const getParsedResults = (year: string) => {
	switch (year) {
		case '2020':
			return parsedResults2020;
		case '2015':
			return parsedResults2015;
		default:
			return parsedResults2020;
	}
};
