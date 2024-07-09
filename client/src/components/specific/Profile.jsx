import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
	Face as FaceIcon,
	AlternateEmail as UserNameIcon,
	CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
	return (
		<Stack
			spacing={"2rem"}
			direction={"column"}
			alignItems={"center"}
		>
			<Avatar
				sx={{
					width: 200,
					height: 200,
					objectFit: "contain",
					marginBottom: "1rem",
					border: "5px solid white",
				}}
			/>
			<ProfileCard
				heading={"bio"}
				text={
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nihil."
				}
			/>
			<ProfileCard
				heading={"userName"}
				text={"JhonDoe"}
				Icon={<UserNameIcon />}
			/>
			<ProfileCard
				heading={"Name"}
				text={"Jhon Doe"}
				Icon={<FaceIcon />}
			/>
			<ProfileCard
				heading={"Joined"}
				text={moment("2024-07-09T06:01:24.708Z").fromNow()}
				Icon={<CalendarIcon />}
			/>
		</Stack>
	);
};

const ProfileCard = ({ text, Icon, heading }) => (
	<Stack
		direction={"row"}
		alignItems={"center"}
		spacing={"1rem"}
		color={"white"}
		textAlign={"center"}
	>
		{Icon && Icon}
		<Stack>
			<Typography variant='body1'>{text}</Typography>
			<Typography
				variant='caption'
				color={"gray"}
			>
				{heading}
			</Typography>
		</Stack>
	</Stack>
);

export default Profile;
