import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handelClose, deleteHandler }) => {
	return (
		<Dialog open={open} onClose={handelClose}>
			<DialogTitle>Confirm Delete</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to <strong>Delete</strong> this group
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='error' variant='outlined' onClick={handelClose}>
					No
				</Button>
				<Button variant='contained' onClick={deleteHandler}>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
