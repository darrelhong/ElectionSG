import results2020 from '$lib/data/2020-results.json';
import results2015 from '$lib/data/2015-results.json';
import results2011 from '$lib/data/2011-results.json';
import { Results } from '$lib/types/results';

const parsedResults2020 = Results.parse(results2020);
const parsedResults2015 = Results.parse(results2015);
const parsedResults2011 = Results.parse(results2011);

export const getParsedResults = (year: string) => {
	switch (year) {
		case '2020':
			return parsedResults2020;
		case '2015':
			return parsedResults2015;
		case '2011':
			return parsedResults2011;
		default:
			return parsedResults2020;
	}
};
