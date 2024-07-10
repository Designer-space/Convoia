import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
	return (
		<Stack
			direction={"row"}
			spacing={"0.5"}
		>
			<AvatarGroup max={max}>
				<Box
					width={"3rem"}
					height={"3rem"}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{avatar.map((src, i) => (
						<Avatar
							key={Math.random() * 100}
							src={transformImage(src)}
							alt={`Avatar ${i}`}
							sx={{
								width: "2rem",
								height: "2rem",
							}}
						/>
					))}
				</Box>
			</AvatarGroup>
		</Stack>
	);
};

export default AvatarCard;
