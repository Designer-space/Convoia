import {
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../constants/sampleData";

const Notifications = () => {
	const friendRequestHandler = ({ _id, accept }) => {
		// sdfs
	};

	return (
		<Dialog open>
			<Stack
				p={{ xs: "1rem", sm: "2rem" }}
				maxWidth={"25rem"}
			>
				<DialogTitle>Notifications</DialogTitle>
				{sampleNotifications.length > 0 ? (
					sampleNotifications.map(({ sender, _id }) => (
						<NotificationItem
							key={_id}
							sender={sender}
							_id={_id}
							handler={friendRequestHandler}
						/>
					))
				) : (
					<Typography textAlign={"center"}>No Notifications</Typography>
				)}
			</Stack>
		</Dialog>
	);
};

const NotificationItem = memo(({ sender, _id, handler }) => {
	const { avatar, name } = sender;

	return (
		<ListItem>
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
					{`${name} has send you a friend request,`}
				</Typography>
				<Stack
					direction={{
						xs: "column",
						sm: "row",
					}}
				>
					<Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
					<Button
						color='error'
						onClick={() => handler({ _id, accept: false })}
					>
						Reject
					</Button>
				</Stack>
			</Stack>
		</ListItem>
	);
});

export default Notifications;
