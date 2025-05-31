import { deepEqual } from "@tanstack/react-router";

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

export const splitArrayBy = <T>(
	array: T[],
	checker: (value: T) => boolean,
): [true: T[], false: T[]] => {
	const truthy: T[] = [];
	const falsy: T[] = [];

	array.forEach((value) => {
		if (checker(value)) {
			truthy.push(value);
		} else {
			falsy.push(value);
		}
	});

	return [truthy, falsy];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize = <Fn extends (...args: any[]) => any>(fn: Fn): Fn => {
	const cache = new Map<string, ReturnType<Fn>>();

	return ((...args: Parameters<Fn>) => {
		const key = JSON.stringify(args);

		if (!cache.has(key)) {
			cache.set(key, fn(...args));
		}

		return cache.get(key);
	}) as Fn;
};

export const toggleArrayItem = <T>(
	array: T[],
	item: T,
	equality: (a: T, b: T) => boolean,
): T[] => {
	const alreadyExists = array.some((i) => equality(i, item));
	if (alreadyExists) {
		return array.filter((i) => !deepEqual(i, item));
	} else {
		return [...array, item];
	}
};

export const range = (start: number, end: number): number[] => {
	if (start > end) throw new Error("Start must be less than or equal to end");

	const result: number[] = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
};

export const fillToSize = <T, NewValue>(
	array: T[],
	size: number,
	fillValue: NewValue,
): (T | NewValue)[] => {
	if (array.length >= size) return array;

	const result: (T | NewValue)[] = [...array];

	for (let i = array.length; i < size; i++) {
		result.push(fillValue);
	}

	return result;
};

export const pickSatisfactoryItems = <T>(
	items: T[],
	amount: number,
	conditions: ((item: T) => boolean)[],
): T[] => {
	const activeConditions = [...conditions];
	const satisfactoryItems: T[] = [];

	while (activeConditions.length > 1 && satisfactoryItems.length < amount) {
		const newItems = items.filter((item) => {
			const isAlreadyPicked = satisfactoryItems.includes(item);
			const isSatisfactory = activeConditions.every((condition) =>
				condition(item),
			);
			return !isAlreadyPicked && isSatisfactory;
		});
		satisfactoryItems.push(...newItems);
		activeConditions.pop();
	}

	return pickFirstNItems(satisfactoryItems, amount);
};

export const sortBy = <T>(arr: T[], getValue: (item: T) => number): T[] =>
	arr.slice().sort((a, b) => getValue(a) - getValue(b));
