import { lazy } from "react";
import "jotai-devtools/styles.css";

const empty = lazy(async () => ({ default: () => null }));

export const DevTools = import.meta.env.PROD
	? empty
	: lazy(async () => {
			const Component = (await import("jotai-devtools")).DevTools;
			return {
				default: Component,
			};
	  });
