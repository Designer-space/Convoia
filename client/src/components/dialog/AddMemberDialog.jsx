import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
	const [members, setMembers] = useState(sampleUsers);
	const [selectedMembers, setSelectedMembers] = useState([]);

	const selectMemberHandler = (id) => {
		if (selectedMembers.includes(id)) {
			setSelectedMembers((prev) => prev.filter((el) => el !== id));
		} else {
			setSelectedMembers((prev) => [...prev, id]);
		}
	};

	const addFriendSubmitHandler = () => {
		closeHandler();
	};

	const closeHandler = () => {
		setMembers("");
		setSelectedMembers("");
	};

	return (
		<Dialog open onClose={closeHandler}>
			<Stack width={"20rem"} padding={"2rem"} spacing={"1rem"}>
				<DialogTitle>Add Member</DialogTitle>
				<Stack paddingInline={"1rem"} spacing={".5rem"}>
					{members.length > 0 ? (
						members.map((user) => (
							<UserItem
								key={user._id}
								user={user}
								handler={selectMemberHandler}
								isAdded={selectedMembers.includes(user._id)}
							/>
						))
					) : (
						<Typography textAlign={"center"}> No Friends </Typography>
					)}
				</Stack>
				<Stack
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-evenly"}
				>
					<Button color='error' onClick={closeHandler}>
						Cancle
					</Button>
					<Button
						variant='contained'
						disabled={isLoadingAddMember}
						onClick={addFriendSubmitHandler}
					>
						Save Changes
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default AddMemberDialog;
