import { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { orange } from "../components/constants/color";
import {
	AttachFile as AttachFileIcon,
	Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialog/FileMenu";
import { sampleMessage } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
	_id: "laskdfjhj",
	name: "No Name",
};

const Chat = () => {
	const containerRef = useRef(null);

	return (
		<>
			<div
				className='pattern'
				style={{
					height: "100%",
				}}
			>
				<Stack
					ref={containerRef}
					boxSizing={"border-box"}
					padding={"1rem"}
					spacing={"1rem"}
					height={"90%"}
					sx={{
						overflowX: "hidden",
						overflowY: "auto",
					}}
				>
					{sampleMessage.map((msg) => (
						<MessageComponent
							key={msg._id}
							message={msg}
							user={user}
						/>
					))}
				</Stack>
				<form
					style={{
						height: "10%",
						padding: ".875rem 1rem",
					}}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						height={"100%"}
						spacing={".5rem"}
						position={"relative"}
					>
						<IconButton
							sx={{
								position: "absolute",
								left: "1rem",
								bgcolor: orange,
								color: "white",
								"&:hover": {
									bgcolor: "error.dark",
								},
							}}
						>
							<AttachFileIcon
								sx={{
									fontSize: "1.25rem",
								}}
							/>
						</IconButton>
						<InputBox
							placeholder='Type Message Here....'
							name='message'
						/>
						<IconButton
							type='submit'
							sx={{
								bgcolor: orange,
								color: "white",
								"&:hover": {
									bgcolor: "error.dark",
								},
							}}
						>
							<SendIcon />
						</IconButton>
					</Stack>
				</form>
				<FileMenu />
			</div>
		</>
	);
};

export default AppLayout()(Chat);
