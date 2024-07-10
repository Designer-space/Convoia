import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Divider, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
	avatar = [],
	name,
	_id,
	groupChat = false,
	sameSender,
	isOnline,
	newMessageAlert,
	index = 0,
	handleDeleteChat,
}) => {
	return (
		<Link
			sx={{
				padding: "0",
			}}
			to={`/chat/${_id}`}
			onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
		>
			<div
				className={`${sameSender ? "pattern" : ""}`}
				style={{
					display: "flex",
					alignItems: "center",
					gap: ".5rem",
					padding: ".5rem",
					color: sameSender ? "white" : "unset",
					position: "relative",
					borderRadius: "2rem 0 0 2rem",
				}}
			>
				<AvatarCard avatar={avatar} />
				<Stack>
					<Typography fontWeight={500}>{name}</Typography>
					{newMessageAlert && (
						<Typography>{newMessageAlert.count} New Message</Typography>
					)}
					{isOnline && (
						<Box
							sx={{
								width: "10px",
								height: "10px",
								borderRadius: "50%",
								backgroundColor: "green",
								position: "absolute",
								top: "50%",
								right: "1rem",
								transform: "translateY(-50%)",
							}}
						/>
					)}
				</Stack>
			</div>
			<Divider orientation='horizontal' />
		</Link>
	);
};

export default memo(ChatItem);
