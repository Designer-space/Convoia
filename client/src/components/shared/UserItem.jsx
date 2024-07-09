import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
	const { name, _id, avatar } = user;

	return (
		<ListItem
			sx={{
				paddingInline: "0",
			}}
		>
			<Stack
				direction={"row"}
				alignItems={"center"}
				spacing={"1rem"}
				width={"100%"}
			>
				<Avatar />
				<Typography
					variant='body1'
					sx={{
						flexGrow: 1,
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{name}
				</Typography>
				<IconButton
					size='small'
					sx={{
						bgcolor: isAdded ? "red" : "primary.main",
						color: "white",
						"&:hover": {
							bgcolor: isAdded
								? "rgba(255, 0, 0, 0.5)"
								: "rgba(25, 118, 210, 0.5)",
						},
					}}
					onClick={() => handler(_id)}
					disabled={handlerIsLoading}
				>
					{isAdded ? <RemoveIcon /> : <AddIcon />}
				</IconButton>
			</Stack>
		</ListItem>
	);
};

export default memo(UserItem);
