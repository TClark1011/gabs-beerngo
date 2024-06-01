export const shuffleArray = <T>(array: T[]): T[] => {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
};

export const pickFirstNItems = <T>(items: T[], n: number): T[] => {
	return items.slice(0, n);
};

export const pickNRandomItems = <T>(items: T[], n: number): T[] => {
	const shuffled = shuffleArray(items);

	return pickFirstNItems(shuffled, n);
};

type MatchesSearchQueryInput = {
	query: string;
	target: string;
};

export const matchesSearchQuery = ({
	query,
	target,
}: MatchesSearchQueryInput): boolean => {
	return target.toLowerCase().includes(query.toLowerCase());
};

export const pickNRandomItemsThatSatisfy = <T>(
	items: T[],
	n: number,
	predicate: (item: T) => boolean,
): T[] => {
	const satisfyingItems = items.filter(predicate);
	const shuffledSatisfyingItems = shuffleArray(satisfyingItems);
	return pickFirstNItems(shuffledSatisfyingItems, n);
};
