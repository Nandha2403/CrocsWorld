import React from "react";
import { Box } from "@chakra-ui/react";
import { Loading } from "react-loading-dot/lib";

export const LoadingCompnonent = () => {
	return (
		<Box display="flex"  justifyContent="center" alignItems="center" height="100vh">
			<Loading size="1rem" />
		</Box>
	);
};