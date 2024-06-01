import { DarkMode, LightMode, useColorModeValue } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const InvertColorMode: FC<PropsWithChildren> = ({ children }) => {
	const Component = useColorModeValue(DarkMode, LightMode);

	return <Component>{children}</Component>;
};
