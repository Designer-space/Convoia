import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Done as DoneIcon,
	Edit as EditIcon,
	KeyboardBackspace as KeyboardBackspaceIcon,
	Menu as MenuIcon,
} from "@mui/icons-material";
import {
	Backdrop,
	Box,
	Button,
	Drawer,
	Grid,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orange } from "../components/constants/color";
import { sampleChats, sampleUsers } from "../components/constants/sampleData";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() =>
	import("../components/dialog/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
	import("../components/dialog/AddMemberDialog")
);

const isAddMember = false;

const Groups = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

	const chatId = useSearchParams()[0].get("group");
	const navigate = useNavigate();

	const navigateBack = () => {
		navigate("/");
	};

	const handelMobile = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const handelmobileClose = () => {
		setIsMobileMenuOpen(false);
	};

	const updateGroupNameHandler = () => {
		setIsEdit(false);
		console.log("update Group Name Handler");
	};

	const openConfirmDeleteHandler = () => {
		setConfirmDeleteDialog(true);
	};

	const closeConfirmDeleteHandler = () => {
		setConfirmDeleteDialog(false);
	};

	const openAddMemberHandler = () => {
		console.log("Add Member");
	};

	const deleteHandler = () => {
		console.log("Delete Handler");
		closeConfirmDeleteHandler();
	};
	const removeMemberHandler = (id) => {
		console.log("Remove Member", id);
	};

	useEffect(() => {
		if (chatId) {
			setGroupName(`Group Name ${chatId}`);
			setGroupNameUpdatedValue(`Group Name ${chatId}`);
		}

		return () => {
			setGroupName("");
			setGroupNameUpdatedValue("");
			setIsEdit(false);
		};
	}, [chatId]);

	const iconButtons = (
		<>
			<Box
				sx={{
					display: {
						xs: "block",
						sm: "none",
					},
					position: "fixed",
					top: "1rem",
					right: "1rem",
				}}
			>
				<IconButton onClick={handelMobile}>
					<MenuIcon />
				</IconButton>
			</Box>

			<Tooltip title='back'>
				<IconButton
					sx={{
						position: "absolute",
						top: "2rem",
						left: "2rem",
						bgcolor: "rgba(0,0,0,1)",
						color: "white",
						"&:hover": {
							bgcolor: "rgba(0,0,0,0.7)",
						},
					}}
					onClick={navigateBack}
				>
					<KeyboardBackspaceIcon />
				</IconButton>
			</Tooltip>
		</>
	);

	const GroupName = (
		<>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"center"}
				spacing={"1rem"}
				padding={"3rem"}
			>
				{isEdit ? (
					<>
						<TextField
							value={groupNameUpdatedValue}
							onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
						/>
						<IconButton onClick={updateGroupNameHandler}>
							<DoneIcon />
						</IconButton>
					</>
				) : (
					<>
						<Typography variant='h4'>{groupName}</Typography>
						<IconButton onClick={() => setIsEdit(true)}>
							<EditIcon />
						</IconButton>
					</>
				)}
			</Stack>
		</>
	);

	const ButtonGroup = (
		<Stack
			direction={{
				xs: "column-reverse",
				sm: "row",
			}}
			spacing={"1rem"}
			p={{
				xs: "0",
				sm: "1rem",
				md: "1rem 4rem",
			}}
		>
			<Button
				size='lg'
				color='error'
				variant='outlined'
				startIcon={<DeleteIcon />}
				onClick={openConfirmDeleteHandler}
			>
				Delete Group
			</Button>
			<Button
				size='lg'
				variant='contained'
				startIcon={<AddIcon />}
				onClick={openAddMemberHandler}
			>
				Add Members
			</Button>
		</Stack>
	);

	return (
		<Grid container height={"100vh"}>
			<Grid
				item
				sm={4}
				sx={{
					display: {
						xs: "none",
						sm: "block",
					},
					height: "100%",
				}}
			>
				<GroupList myGroups={sampleChats} chatId={chatId} />
			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative",
					padding: "1rem 3rem",
				}}
			>
				{iconButtons}
				{groupName && (
					<>
						{GroupName}
						<Typography margin={"2rem"} alignSelf={"start"} variant='body1'>
							Members
						</Typography>
						<Stack
							maxWidth={"45rem"}
							width={"100%"}
							boxSizing={""}
							padding={{
								sm: "1rem",
								xs: "0",
								md: "1rem 4rem",
							}}
							spacing={".5rem"}
							height={"50vh"}
							overflow={"auto"}
						>
							{/* members */}
							{sampleUsers.map((user) => (
								<UserItem
									key={user._id}
									user={user}
									isAdded
									styling={{
										boxShadow: 1,
										padding: "1rem 2rem",
										borderRadius: ".5rem",
										"&:hover": {
											boxShadow: 3,
										},
									}}
									handler={removeMemberHandler}
								/>
							))}
						</Stack>
						{ButtonGroup}
					</>
				)}
			</Grid>

			{isAddMember && (
				<Suspense fallback={<Backdrop open />}>
					<AddMemberDialog />
				</Suspense>
			)}

			{confirmDeleteDialog && (
				<>
					<Suspense fallback={<Backdrop open />}>
						<ConfirmDeleteDialog
							open={confirmDeleteDialog}
							handelClose={closeConfirmDeleteHandler}
							deleteHandler={deleteHandler}
						/>
					</Suspense>
				</>
			)}

			<Drawer
				sx={{
					display: {
						xs: "block",
						sm: "none",
					},
				}}
				open={isMobileMenuOpen}
				onClose={handelmobileClose}
			>
				<GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
			</Drawer>
		</Grid>
	);
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
	<Stack width={w} bgcolor={orange} height={"100%"} overflow={"auto"}>
		{myGroups.length > 0 ? (
			myGroups.map((group) => (
				<GroupListItem key={group._id} group={group} chatId={chatId} />
			))
		) : (
			<Typography textAlign={"center"} padding={"1rem"}>
				No Groups
			</Typography>
		)}
	</Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
	const { name, avatar, _id } = group;
	return (
		<Link
			to={`?group=${_id}`}
			onClick={(e) => {
				if (chatId === _id) {
					e.preventDefault();
				}
			}}
		>
			<Stack direction={"row"} alignItems={"center"} spacing={".5rem"}>
				<AvatarCard avatar={avatar} />
				<Typography>{name}</Typography>
			</Stack>
		</Link>
	);
});

export default Groups;
