import React from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
	AdminPanelSettings as AdminPanelSettingsIcon,
	Group as GroupIcon,
	Message as MessageIcon,
	Notifications as NotificationsIcon,
	Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
	CurveButton,
	SearchField,
} from "../../../components/styles/StyledComponents";

const Dashboard = () => {
	const Widgets = (
		<Stack
			direction={{
				xs: "column",
				sm: "row",
			}}
			spacing={"2rem"}
			alignItems={"center"}
			justifyContent={"space-between"}
			margin={"2rem 0"}
		>
			<Widget title={"Users"} value={60} icon={<PersonIcon />} />
			<Widget title={"Chats"} value={60} icon={<GroupIcon />} />
			<Widget title={"Messages"} value={500} icon={<MessageIcon />} />
		</Stack>
	);

	return (
		<AdminLayout>
			<Container component={"main"}>
				{Appbar}

				<Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
					<Paper
						elevation={3}
						sx={{
							padding: "2rem 3.5rem",
							borderRadius: "1rem",
							maxWidth: "45rem",
							width: "100%",
						}}
					>
						<Typography variant='h4' margin={"2rem 0"}>
							Last Messages
						</Typography>
						{"Chat"}
					</Paper>

					<Paper
						elevation={3}
						style={{
							padding: "1rem",
							borderRadius: "1rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: {
								xs: "100%",
								sm: "50%",
							},
							maxWidth: "25rem",
							width: "100%",
							position: "relative",
						}}
					>
						{"some paper"}

						<Stack
							position={"absolute"}
							direction={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							width={"100%"}
							height={"100%"}
							spacing={"0.5rem"}
						>
							<GroupIcon />
							<Typography>VS</Typography>
							<PersonIcon />
						</Stack>
					</Paper>
				</Stack>

				<Stack>{Widgets}</Stack>
			</Container>
		</AdminLayout>
	);
};

const Appbar = (
	<Paper
		elevation={3}
		sx={{
			padding: "3rem",
			margin: "2rem 0",
			borderRadius: "1rem",
		}}
	>
		<Stack
			direction={{
				xs: "column",
				sm: "row",
			}}
			alignItems={"center"}
			spacing={"1rem"}
		>
			<AdminPanelSettingsIcon
				sx={{
					fontSize: "3rem",
				}}
			/>
			<SearchField
				sx={{
					padding: {
						xs: ".5rem 1.5rem",
						sm: "1rem 2rem",
					},
				}}
			/>
			<CurveButton
				sx={{
					padding: {
						xs: ".5rem 1rem",
						sm: "1rem 2rem",
					},
				}}
			>
				Search
			</CurveButton>
			<Box flexGrow={1} />
			<Typography
				sx={{
					display: {
						xs: "none",
						lg: "block",
					},
				}}
			>
				{moment().format("dddd, MMMM Do YYYY")}
			</Typography>
			<NotificationsIcon />
		</Stack>
	</Paper>
);

const Widget = ({ title, value, icon }) => {
	return (
		<Paper
			sx={{
				padding: "2rem",
				margin: "2rem 0",
				borderRadius: "1rem",
				width: "20rem",
			}}
		>
			<Stack alignItems={"center"} spacing={"1rem"}>
				<Typography
					sx={{
						color: "rgba(0,0,0,1)",
						borderRadius: "50%",
						border: "5px solid black",
						width: "5rem",
						height: "5rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{value}
				</Typography>
				<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
					{icon}
					<Typography>{title}</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default Dashboard;
