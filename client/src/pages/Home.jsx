import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
	return (
		<Box height={"100%"}>
			<div
				className='pattern'
				style={{
					height: "100%",
				}}
			>
				<Typography
					p={"2rem"}
					variant='h5'
					textAlign={"center"}
					// bgcolor={"white"}
					color={"white"}
				>
					Select a Friend to Chat
				</Typography>
			</div>
		</Box>
	);
};

export default AppLayout()(Home);
