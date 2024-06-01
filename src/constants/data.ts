import { type Beer } from "@/types";

export const BOARD_DIMENSION = 5;

export const BOARD_TILES = BOARD_DIMENSION ** 2;

export const BEERS: Beer[] = [
	{
		"id": 1,
		"section": 1,
		"name": "HONEY GUM",
		"flavour": "CARAMEL AND RED GUM HONEY IPA",
		"company": "CLIFTON HILL BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 2,
		"section": 1,
		"name": "CHOC A L'ORANGE",
		"flavour": "ORANGE CHOCOLATE STOUT",
		"company": "BREWMANITY BEER CO",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 3,
		"section": 1,
		"name": "SPAGHETTI SAISON",
		"flavour": "SPAGHETTI ALE",
		"company": "SIX STRING BREWING CO",
		"state": "NSW",
		"harry": true,
	},
	{
		"id": 4,
		"section": 1,
		"name": "COCOA COMET",
		"flavour": "HOT CHOCOLATE PORTER",
		"company": "THE BREW BARON BEER CO",
		"state": "QLD",
		"harry": false,
	},
	{
		"id": 5,
		"section": 1,
		"name": "IMPERIAL COOKIE STOUT",
		"flavour": "NUTTY CRUMB COOKIE STOUT",
		"company": "WIRED CRUMBS",
		"state": "NZ",
		"harry": false,
	},
	{
		"id": 6,
		"section": 1,
		"name": "UNLIKELY FRIENDS",
		"flavour": "MATCHA AND WHITE CHOCOLATE STOUT",
		"company": "AETHEON BREWING",
		"state": "WA",
		"harry": true,
	},
	{
		"id": 7,
		"section": 1,
		"name": "WHITE FOREST",
		"flavour": "CHERRY AND WHITE CHOCOLATE ALE",
		"company": "RED DUCK",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 8,
		"section": 1,
		"name": "DANK AND STORMY",
		"flavour": "HOPS AND GINGER AMBER ALE",
		"company": "AKASHA BREWING CO",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 9,
		"section": 1,
		"name": "SCREAMIN' PEACH",
		"flavour": "PEACH AND CHILLIS",
		"company": "CANOBOLAS BREWING CO",
		"state": "NSW",
		"harry": true,
	},
	{
		"id": 10,
		"section": 1,
		"name": "FUNKY GOSE TO HOLLYWOOD",
		"flavour": "BLACKBERRY GOSE SOUR",
		"company": "WANDANA BREWING CO",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 11,
		"section": 1,
		"name": "OLD MATE",
		"flavour": "TOFFEE, VANILLA, AND ORANGE AMBER ALE",
		"company": "JETTY ROAD BREWERY",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 12,
		"section": 1,
		"name": "KING RIVER DOUBLE RED IPA",
		"flavour": "PASSIONFRUIT, GRAPEFRUIT, AND CITRUS RED IPA",
		"company": "KING RIVER BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 13,
		"section": 1,
		"name": "DON'T TAKE THE PITH",
		"flavour": "CHOCOLATE AND ORANGE PORTER",
		"company": "HIKER BREWING CO",
		"state": "QLD",
		"harry": false,
	},
	{
		"id": 14,
		"section": 1,
		"name": "BRUNSWICK GRAPE ALE",
		"flavour": "SHIRAZ GRAPE ALE",
		"company": "TEMPLE BREWING CO",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 15,
		"section": 1,
		"name": "PEPPER, PEPPER, PEPPER",
		"flavour": "CHILLI PEPPER, BLACK PEPPER, AND SZECHUAN PEPPER IPA",
		"company": "MOLLY ROSE BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 16,
		"section": 1,
		"name": "DOUBLE-LEMON SHOCHU CANDY",
		"flavour": "LEMON SHOCHU PALE LAGER",
		"company": "STOMPING GROUND BREWING CO",
		"state": "VIC",
		"harry": true,
	},
	{
		"id": 17,
		"section": 1,
		"name": "SMOKE RINGS",
		"flavour": "PINEAPPLE AND CHERRY KETTLE SOUR",
		"company": "CAVALIER BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 18,
		"section": 1,
		"name": "HYBRID THEORY RED RYE IPA",
		"flavour": "RED MALTS HOPPY IPA",
		"company": "RUSTY PENNY BREWING",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 19,
		"section": 1,
		"name": "OPEN RELATIONSHIP",
		"flavour": "MALT AND HOPS PILSNER LAGER",
		"company": "DEVILBEND FARM BEER CO",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 20,
		"section": 1,
		"name": "KRUSHBERRY PI 3.14%",
		"flavour": "VANILLA BERRY PIE SOUR",
		"company": "KAIJU! BEER",
		"state": "VIC",
		"harry": true,
	},
	{
		"id": 21,
		"section": 2,
		"name": "BOUNTY HUNTER",
		"flavour": "COCONUT AND CACAO RUM STOUT",
		"company": "SEEKER BREWING",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 22,
		"section": 2,
		"name": "HIGH CARB WHITE IPA",
		"flavour": "FRUITY SPICY HIGH CARB IPA",
		"company": "GRIFFINS BREWING",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 23,
		"section": 2,
		"name": "TARTE NOIR",
		"flavour": "MULBERRY AND VANILLA PASTRY KETTLE SOUR",
		"company": "PRECINCT BREWING",
		"state": "QLD",
		"harry": false,
	},
	{
		"id": 24,
		"section": 2,
		"name": "PARADISE PILS",
		"flavour":
			"NO FUCKING CLUE. DOES NOT SPECIFY. UNMODDED MALT AND LONG FERMENTATION PILSNER LAGER",
		"company": "FRESHWATER BREWING CO",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 25,
		"section": 2,
		"name": "RUM RUNNING",
		"flavour": "PINEAPPLE AND NEIPA RUM RUNNER COCKTAIL BEER",
		"company": "SMILEY BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 26,
		"section": 2,
		"name": "NITRO CITRUS BLOOD ORANGE CHOCOLATE PORTER",
		"flavour": "",
		"company": "BLACKFLAG BREWERY",
		"state": "QLD",
		"harry": false,
	},
	{
		"id": 27,
		"section": 2,
		"name": "YU ZERIOUS? YUZU RUSS",
		"flavour": "YUZU AND SHANDY",
		"company": "URBAN ALLEY BREWERY",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 28,
		"section": 2,
		"name": "DUBBEL DUTCH",
		"flavour": "BISCUIT AND SPICE BELGIAN DUBBEL",
		"company": "HOP HEN BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 29,
		"section": 2,
		"name": "SOOLONG SUCKA",
		"flavour": "OOLONG AND BLACK TEA FRUITY IPA",
		"company": "BOWDEN BREWING CO",
		"state": "SA",
		"harry": true,
	},
	{
		"id": 30,
		"section": 2,
		"name": "WISE AND THE FOOLISH",
		"flavour": "CARAMEL, MALT, BANANA AND SPICE WEIZENBOCK",
		"company": "CAPTAIN BLIGH'S BREWERY",
		"state": "TAS",
		"harry": false,
	},
	{
		"id": 31,
		"section": 2,
		"name": "GUAVA LAVA IMPERIAL IPL",
		"flavour": "GUAVA AND INDIA PALE LAGER",
		"company": "7TH DAY BREWERY",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 32,
		"section": 2,
		"name": "PIG PICKIN' CAKE",
		"flavour": "CITRUS VANILLA MILKSHAKE IPA",
		"company": "OCEAN REACH BREWING",
		"state": "VIC",
		"harry": true,
	},
	{
		"id": 33,
		"section": 2,
		"name": "HOPLESS BOTANICAL IPA",
		"flavour": "HOREHOUND, ELDERBERRY AND HONEY GRUIT IPA",
		"company": "SAUCE BREWING CO",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 34,
		"section": 2,
		"name": "WAKAME UP BEFORE YOU GOSE",
		"flavour": "KETTLE SOUR…SUSHI?",
		"company": "TWOBAYS BREWING CO",
		"state": "VIC",
		"harry": true,
	},
	{
		"id": 35,
		"section": 2,
		"name": "MICHELAGER",
		"flavour": "MEXICAN TOMATO LIME CHILLI LAGER",
		"company": "BLACK HOPS BREWING",
		"state": "QLD",
		"harry": true,
	},
	{
		"id": 36,
		"section": 2,
		"name": "SMOOTH CAFFEINATOR",
		"flavour": "CARAMEL AFFOGATO STOUT",
		"company": "KING TIDE BREWING",
		"state": "NSW",
		"harry": true,
	},
	{
		"id": 37,
		"section": 2,
		"name": "BLACKBERRIES, BLUEBERRIES, AND SOUR PATCH KIDS!",
		"flavour": "FRUITY SOUR PATCH KETTLE SOUR",
		"company": "BOBS BEER",
		"state": "QLD",
		"harry": false,
	},
	{
		"id": 38,
		"section": 2,
		"name": "SUPERMASSIVE BLACK HOLE",
		"flavour": "COCOA AND ALMOND PASTRY STOUT",
		"company": "DEEDS BREWING",
		"state": "VIC",
		"harry": false,
	},
	{
		"id": 39,
		"section": 2,
		"name": 'FEILADH MOR ("GREAT KILT")',
		"flavour": "RICH PEATY SCOTCH ALE",
		"company": "BADLANDS BREWERY",
		"state": "NSW",
		"harry": false,
	},
	{
		"id": 40,
		"section": 2,
		"name": "MAI TAIPA",
		"flavour": "MAI TAI STYLE BEER",
		"company": "WAYWARD BREWING CO",
		"state": "NSW",
		"harry": false,
	},
];