import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
const isAdmin = true;

const AdminLogin = () => {
	const secretKey = useInputValidation("");

	const submitHandler = () => {};

	if (isAdmin) {
		return <Navigate to={"/admin/dashbord"} />;
	}

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
					<Typography variant='h5'>Admin Login</Typography>
					<form
						style={{
							width: "100%",
							marginTop: "1rem",
						}}
						onSubmit={submitHandler}
					>
						<TextField
							required
							fullWidth
							label='SecretKey'
							type='password'
							margin='normal'
							variant='outlined'
							autoComplete='current-password'
							placeholder='SecretKey'
							value={secretKey.value}
							onChange={secretKey.changeHandler}
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
					</form>
				</Paper>
			</Container>
		</div>
	);
};

export default AdminLogin;
