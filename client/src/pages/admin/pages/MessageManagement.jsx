import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import Table from "../../../components/shared/Table";
import { dashboardData } from "../../../components/constants/sampleData";
import moment from "moment";
import { fileFormat, transformImage } from "../../../lib/features";
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import RenderAttachment from "../../../components/shared/RenderAttachment";

const columns = [
	{
		field: "id",
		headerName: "ID",
		headerClassName: "table-header",
		width: "200",
	},
	{
		field: "attachments",
		headerName: "Attachments",
		headerClassName: "table-header",
		width: "200",
		renderCell: (params) => {
			const { attachments } = params.row;

			return attachments?.length > 0
				? attachments.map((attachment, i) => {
						const url = attachment.url;
						const file = fileFormat(url);
						return (
							<Box
								key={i}
								height={"100%"}
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<a
									href={url}
									target='_blank'
									download
									style={{
										color: "black",
									}}
								>
									{RenderAttachment(file, url)}
								</a>
							</Box>
						);
				  })
				: "No Attachments";
		},
	},
	{
		field: "content",
		headerName: "Content",
		headerClassName: "table-header",
		width: "400",
	},
	{
		field: "sender",
		headerName: "Sent By",
		headerClassName: "table-header",
		width: "200",
		renderCell: (params) => (
			<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
				<Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
				<span>{params.row.sender.name}</span>
			</Stack>
		),
	},
	{
		field: "chat",
		headerName: "Chat",
		headerClassName: "table-header",
		width: "220",
	},
	{
		field: "groupChat",
		headerName: "Group Chat",
		headerClassName: "table-header",
		width: "100",
	},
	{
		field: "createdAt",
		headerName: "Time",
		headerClassName: "table-header",
		width: "250",
	},
];

const MessageManagement = () => {
	const [rows, setRows] = useState([]);
	useEffect(() => {
		setRows(
			dashboardData.messages.map((data) => ({
				...data,
				id: data._id,
				sender: {
					name: data.sender.name,
					avatar: transformImage(data.sender.avatar, 50),
				},
				createdAt: moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
			}))
		);
	}, []);

	return (
		<AdminLayout>
			<Table
				heading={"All Messages"}
				columns={columns}
				rows={rows}
				rowHeight={200}
			/>
		</AdminLayout>
	);
};

export default MessageManagement;
