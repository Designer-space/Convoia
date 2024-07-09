import React, { Suspense, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	Add as AddIcon,
	Group as GroupIcon,
	Logout as LogoutIcon,
	Menu as MenuIcon,
	Notifications as NotificationsIcon,
	Search as SearchIcon,
} from "@mui/icons-material";
import { orange } from "../constants/color";
const Search = lazy(() => import("../specific/Search"));

const Header = () => {
	const navigate = useNavigate();

	const [isMobile, setIsMobile] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [isNewGroup, setIsNewGroup] = useState(false);
	const [isNotification, setIsNotification] = useState(false);

	const handelMobile = () => {
		setIsMobile((prev) => !prev);
	};
	const openSearchDialog = () => {
		setIsSearch((prev) => !prev);
	};
	const openNewGroup = () => {
		setIsNewGroup((prev) => !prev);
	};
	const handelLogout = () => {
		console.log("handelLogout is clicked");
	};
	const openNotification = () => {
		setIsNotification((prev) => !prev);
	};

	const navigateToGroup = () => navigate("/groups");

	return (
		<>
			<Box
				sx={{
					flexGrow: 1,
				}}
				height={"4rem"}
			>
				<AppBar
					position='static'
					sx={{
						bgcolor: orange,
					}}
				>
					<Toolbar>
						<Typography
							variant='h6'
							sx={{
								display: { xs: "none", sm: "block" },
							}}
						>
							Convoia
						</Typography>

						<Box
							sx={{
								display: { xs: "block", sm: "none" },
							}}
						>
							<IconButton
								color='inherit'
								onClick={handelMobile}
							>
								<MenuIcon />
							</IconButton>
						</Box>
						<Box sx={{ flexGrow: 1 }} />
						<Box>
							<IconBtn
								title='Search'
								onClick={openSearchDialog}
								icon={<SearchIcon />}
							/>
							<IconBtn
								title='New Group'
								onClick={openNewGroup}
								icon={<AddIcon />}
							/>
							<IconBtn
								title='Manage Groups'
								onClick={navigateToGroup}
								icon={<GroupIcon />}
							/>
							<IconBtn
								title='Notifications'
								onClick={openNotification}
								icon={<NotificationsIcon />}
							/>
							<IconBtn
								title='Logout'
								onClick={handelLogout}
								icon={<LogoutIcon />}
							/>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>

			{isSearch && (
				<Suspense fallback={<div>Loading...</div>}>
					<Search />
				</Suspense>
			)}
		</>
	);
};

const IconBtn = ({ title, icon, onClick }) => {
	return (
		<Tooltip title={title}>
			<IconButton
				color='inherit'
				size='large'
				onClick={onClick}
			>
				{icon}
			</IconButton>
		</Tooltip>
	);
};

export default Header;
