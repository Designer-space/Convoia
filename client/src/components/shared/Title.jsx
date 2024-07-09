import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
	title = "Convoia",
	description = "This app helps people come together and have meaningful conversations.",
}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name='description'
				content={description}
			/>
		</Helmet>
	);
};

export default Title;
