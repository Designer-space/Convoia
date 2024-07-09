import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

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
	"&:hover": {
		backgroundColor: "#F0F0F0",
	},
});