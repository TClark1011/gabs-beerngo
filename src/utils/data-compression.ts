import {
	compressToEncodedURIComponent,
	decompressFromEncodedURIComponent,
} from "lz-string";

export const composeCompressor = <T>() => {
	const compress = (input: T): string =>
		compressToEncodedURIComponent(JSON.stringify(input));

	const decompress = (input: string): T =>
		JSON.parse(decompressFromEncodedURIComponent(input));

	return {
		compress,
		decompress,
	};
};
