import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducer/auth";
import { useFileHandler, useInputValidation } from "6pp";
import toast from "react-hot-toast";

import {
	Avatar,
	Button,
	Container,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { usernameValidator } from "../utils/validators";
import { server } from "../components/constants/config";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);

	function toggleLogin() {
		setIsLogin((prev) => !prev);
	}

	const name = useInputValidation("");
	const bio = useInputValidation("");
	const username = useInputValidation("", usernameValidator);
	const password = useInputValidation("");

	const avatar = useFileHandler("single");

	const dispatch = useDispatch();

	const handelLogin = async (e) => {
		e.preventDefault();
		const config = {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		};

		setLoading(true);

		try {
			const { data } = await axios.post(
				`${server}/api/v1/auth/login`,
				{ username: username.value, password: password.value },
				config
			);
			dispatch(userExists(true));
			setLoading(false);
			toast.success(data.message);
		} catch (error) {
			setLoading(false);
			toast.error(error?.response?.data?.message || "Something went wrong");
		}
	};

	const handelSignUp = async (e) => {
		e.preventDefault();
		const config = {
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const formData = new FormData();
		formData.append("avatar", avatar.file);
		formData.append("name", name.value);
		formData.append("bio", bio.value);
		formData.append("username", username.value);
		formData.append("password", password.value);

		try {
			const { data } = await axios.post(
				`${server}api/v1/auth/signup`,
				formData,
				config
			);
			dispatch(userExists(true));
			toast.success(data.message);
		} catch (error) {
			toast.error(error?.response?.data?.message || "Something went wrong");
		}
	};

	return (
		<div
			style={{
				background:
					"linear-gradient( 89.5deg,  rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3% )",
			}}
		>
			<Container
				component={"main"}
				maxWidth='xs'
				sx={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						padding: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{isLogin ? (
						<>
							<Typography variant='h5'>Login</Typography>
							<form
								style={{
									width: "100%",
									marginTop: "1rem",
								}}
								onSubmit={handelLogin}
							>
								<TextField
									required
									fullWidth
									label='Username'
									margin='normal'
									variant='outlined'
									autoComplete='username'
									value={username.value}
									onChange={username.changeHandler}
								/>
								<TextField
									required
									fullWidth
									label='Password'
									type='password'
									margin='normal'
									variant='outlined'
									autoComplete='current-password'
									value={password.value}
									onChange={password.changeHandler}
								/>
								<Button
									variant='contained'
									color='primary'
									type='submit'
									fullWidth
									sx={{
										marginTop: "1rem",
									}}
								>
									Login
								</Button>

								<Typography
									sx={{
										marginTop: "1rem",
										textAlign: "center",
									}}
								>
									OR
								</Typography>
								<Button
									variant='text'
									fullWidth
									sx={{ marginTop: ".25rem" }}
									onClick={toggleLogin}
								>
									Sign Up
								</Button>
							</form>
						</>
					) : (
						<>
							<Typography variant='h5'>Register</Typography>
							<form
								style={{
									width: "100%",
									marginTop: "1rem",
								}}
								onSubmit={handelSignUp}
							>
								<Stack position={"relative"} width={"10rem"} margin={"auto"}>
									<Avatar
										sx={{
											width: "10rem",
											height: "10rem",
											objectFit: "contain",
										}}
										src={avatar.preview}
									/>

									<IconButton
										sx={{
											position: "absolute",
											bottom: 0,
											right: 0,
											color: "white",
											bgcolor: "rgba(0,0,0,0.5)",
											":hover": {
												bgcolor: "rgba(0,0,0,0.7)",
											},
										}}
										component='label'
									>
										<>
											<CameraAltIcon />
											<VisuallyHiddenInput
												type='file'
												onChange={avatar.changeHandler}
											/>
										</>
									</IconButton>
								</Stack>
								{avatar.error && (
									<Typography
										m={"1rem"}
										width={"fit-content"}
										display={"block"}
										color='error'
										variant='caption'
									>
										{avatar.error}
									</Typography>
								)}
								<TextField
									required
									fullWidth
									label='name'
									margin='normal'
									variant='outlined'
									autoComplete='name'
									value={name.value}
									onChange={name.changeHandler}
								/>
								<TextField
									required
									fullWidth
									label='Bio'
									margin='normal'
									variant='outlined'
									autoComplete='bio'
									value={bio.value}
									onChange={bio.changeHandler}
								/>
								<TextField
									required
									fullWidth
									label='Username'
									margin='normal'
									variant='outlined'
									autoComplete='username'
									value={username.value}
									onChange={username.changeHandler}
								/>
								{username.error && (
									<Typography color='error' variant='caption'>
										{username.error}
									</Typography>
								)}
								<TextField
									required
									fullWidth
									label='Password'
									type='password'
									margin='normal'
									variant='outlined'
									autoComplete='current-password'
									value={password.value}
									onChange={password.changeHandler}
								/>
								<Button
									variant='contained'
									color='primary'
									type='submit'
									fullWidth
									sx={{
										marginTop: "1rem",
									}}
								>
									Sign Up
								</Button>

								<Typography
									sx={{
										marginTop: "1rem",
										textAlign: "center",
									}}
								>
									OR
								</Typography>
								<Button
									variant='text'
									fullWidth
									sx={{ marginTop: ".25rem" }}
									onClick={toggleLogin}
								>
									Login Insted
								</Button>
							</form>
						</>
					)}
				</Paper>
			</Container>
		</div>
	);
};

export default Login;
