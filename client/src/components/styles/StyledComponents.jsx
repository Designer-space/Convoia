import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { gray, orange } from "../constants/color";

export const VisuallyHiddenInput = styled("input")({
	position: "absolute",
	width: "1px",
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0,0,0,0)",
	whiteSpace: "nowrap",
	border: 0,
});

export const Link = styled(LinkComponent)({
	textDecoration: "none",
	color: "black",
	padding: "1rem",
	borderRadius: "2rem 0 0 2rem",
	"&:hover": {
		backgroundColor: "rgba(0,0,0,.2)",
	},
});

export const InputBox = styled("input")({
	width: "100%",
	height: "100%",
	border: "none",
	outline: "none",
	padding: "0 3.5rem",
	borderRadius: "100vh",
	backgroundColor: gray,
	fontSize: "1rem",
	accentColor: orange,
	color: "rgba(0,0,0,.8)",
});

export const SearchField = styled("input")({
	maxWidth: "350px",
	width: "100%",
	border: "none",
	outline: "none",
	borderRadius: "1.5rem",
	fontSize: "1.1rem",
	backgroundColor: "rgba(0,0,0,0.2)",
});

export const CurveButton = styled("button")({
	fontSize: "1.1rem",
	color: "white",
	borderRadius: "1.5rem",
	backgroundColor: "black",
	cursor: "pointer",
	border: "none",
	outline: "none",
	":hover": {
		backgroundColor: "rgba(0,0,0,0.8)",
	},
});
