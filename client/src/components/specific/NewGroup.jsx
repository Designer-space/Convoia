import {
	Button,
	Dialog,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
	const [members, setMembers] = useState(sampleUsers);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const groupName = useInputValidation("");

	const selectMemberHandler = (id) => {
		if (selectedMembers.includes(id)) {
			setSelectedMembers((prev) => prev.filter((el) => el !== id));
		} else {
			setSelectedMembers((prev) => [...prev, id]);
		}
	};
	const submitHandler = () => {};
	const closeHandler = () => {};

	return (
		<Dialog
			open
			onClose={closeHandler}
		>
			<Stack
				p={{ xs: "1rem", sm: "2rem" }}
				sx={{
					width: {
						xs: "100%",
						sm: "20rem",
					},
				}}
			>
				<DialogTitle
					textAlign={"center"}
					variant='h4'
				>
					New Group
				</DialogTitle>
				<TextField
					label='Group Name'
					value={groupName.value}
					onChange={groupName.changeHandler}
				/>
				<Typography
					marginBlock={".5rem"}
					variant='body1'
				>
					Members
				</Typography>
				<Stack>
					{members.map((user) => (
						<UserItem
							user={user}
							key={user._id}
							handler={selectMemberHandler}
							isAdded={selectedMembers.includes(user._id)}
						/>
					))}
				</Stack>
				<Stack
					direction={"row"}
					width={"100%"}
					marginTop={"1rem"}
					spacing={"1rem"}
					sx={{
						flexWrap: "wrap",
						justifyContent: "space-evenly",
					}}
				>
					<Button
						variant='outlined'
						color='error'
					>
						Cancle
					</Button>
					<Button
						variant='contained'
						onClick={submitHandler}
					>
						Create
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default NewGroup;
