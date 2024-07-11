import React, { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import {
	Box,
	Drawer,
	Grid,
	IconButton,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import { gray } from "../constants/color";
import {
	Close as CloseIcon,
	Menu as MenuIcon,
	Dashboard as DashboardIcon,
	ManageAccounts as ManageAccountsIcon,
	Groups as GroupsIcon,
	Message as MessageIcone,
	ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

export const Link = styled(LinkComponent)({
	textDecoration: "none",
	color: "black",
	padding: "1rem 2rem",
	borderRadius: "100vh",
	"&:hover": {
		color: "rgba(0,0,0,0.5)",
		outline: "1px solid rgba(0,0,0,0.5)",
	},
});

const adminTab = [
	{
		name: "Dashboard",
		path: "/admin/dashboard",
		icon: <DashboardIcon />,
	},
	{
		name: "Users",
		path: "/admin/users",
		icon: <ManageAccountsIcon />,
	},
	{
		name: "Chats",
		path: "/admin/chats",
		icon: <GroupsIcon />,
	},
	{
		name: "Messages",
		path: "/admin/messages",
		icon: <MessageIcone />,
	},
];

const isAdmin = true;

const AdminLayout = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false);

	const handelMobile = () => setIsMobile(!isMobile);

	const handleClose = () => {
		setIsMobile(false);
	};

	if (!isAdmin) {
		return <Navigate to={"/admin"} />;
	}

	return (
		<Grid container minHeight={"100vh"}>
			<Box
				sx={{
					display: {
						xs: "block",
						md: "none",
					},
					position: "fixed",
					top: "1rem",
					right: "1rem",
				}}
			>
				<IconButton color='inherit' onClick={handelMobile}>
					{isMobile ? <CloseIcon /> : <MenuIcon />}
				</IconButton>
			</Box>

			<Grid
				item
				md={4}
				lg={3}
				sx={{
					display: {
						xs: "none",
						md: "block",
					},
				}}
			>
				<Sidebar />
			</Grid>
			<Grid item xs={12} md={8} lg={9} sx={{ bgcolor: gray }}>
				{children}
			</Grid>
			<Drawer
				sx={{
					display: {
						xs: "block",
						md: "none",
					},
				}}
				open={isMobile}
				onClose={handleClose}
			>
				<Sidebar w={"50vw"} />
			</Drawer>
		</Grid>
	);
};

const Sidebar = ({ w = "100%" }) => {
	const location = useLocation();

	const logoutHandler = () => {
		console.log("LogOut");
	};

	return (
		<Stack
			width={w}
			direction={"column"}
			p={"3rem"}
			spacing={"3rem"}
			className='hello'
			sx={{
				height: "100%",
			}}
		>
			<Typography variant='h4' fontWeight={"600"} textTransform={"uppercase"}>
				Convoia
			</Typography>
			<Stack spacing={"1rem"} height={"100%"} width={"fit-content"}>
				{adminTab.map((tab) => (
					<Link
						sx={
							location.pathname === tab.path && {
								bgcolor: "black",
								color: "white",
								":hover": {
									color: "white",
									outline: "none",
								},
							}
						}
						key={tab.path}
						to={tab.path}
					>
						<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
							{tab.icon}
							<Typography>{tab.name}</Typography>
						</Stack>
					</Link>
				))}
				<Box flexGrow={1} />
				<Link onClick={logoutHandler}>
					<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
						<ExitToAppIcon />
						<Typography>Logout</Typography>
					</Stack>
				</Link>
			</Stack>
		</Stack>
	);
};

export default AdminLayout;
