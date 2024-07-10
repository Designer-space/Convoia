import React from "react";
import { Box, Typography } from "@mui/material";
import { orange } from "../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
	const { sender, content, attachments = [], createdAt } = message;

	const sameSender = sender?._id === user?._id;

	const timeAgo = moment(createdAt).fromNow();

	return (
		<div
			style={{
				alignSelf: sameSender ? "flex-end" : "flex-start",
				backgroundColor: "white",
				color: "black",
				borderRadius: "8px",
				padding: ".5rem",
				width: "fit-content",
			}}
		>
			{!sameSender && (
				<Typography
					color={orange}
					fontWeight={"600"}
					variant='caption'
				>
					{sender.name}
				</Typography>
			)}
			{content && <Typography maxWidth={"300px"}>{content}</Typography>}

			{attachments.length > 0 &&
				attachments.map((attachment, i) => {
					const url = attachment.url;
					const file = fileFormat(url);
					return (
						<Box key={i}>
							<a
								href={url}
								target='_blank'
								download
								style={{
									color: "black",
								}}
							>
								{RenderAttachment(file, url)}
							</a>
						</Box>
					);
				})}
			<Typography
				variant='caption'
				color={"text.secondary"}
			>
				{timeAgo}
			</Typography>
		</div>
	);
};

export default MessageComponent;
