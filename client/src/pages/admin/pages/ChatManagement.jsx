import React, { useEffect, useState } from "react";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../../components/constants/sampleData";
import AdminLayout from "../../../components/layout/AdminLayout";
import AvatarCard from "../../../components/shared/AvatarCard";
import Table from "../../../components/shared/Table";
import { transformImage } from "../../../lib/features";

const columns = [
	{
		field: "id",
		headerName: "ID",
		headerClassName: "table-header",
		width: "200",
	},
	{
		field: "avatar",
		headerName: "Avatar",
		headerClassName: "table-header",
		width: "100",
		renderCell: (params) => <AvatarCard max={100} avatar={params.row.avatar} />,
	},
	{
		field: "name",
		headerName: "Name",
		headerClassName: "table-header",
		width: "220",
	},
	{
		field: "totalMembers",
		headerName: "Total Members",
		headerClassName: "table-header",
		width: "140",
	},
	{
		field: "members",
		headerName: "Members",
		headerClassName: "table-header",
		width: "400",
		renderCell: (params) => (
			<AvatarCard max={100} avatar={params.row.members} />
		),
	},
	{
		field: "totalMessages",
		headerName: "Total Messages",
		headerClassName: "table-header",
		width: "120",
	},
	{
		field: "creator",
		headerName: "Created By",
		headerClassName: "table-header",
		width: "250",
		renderCell: (params) => (
			<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
				<Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
				<span>{params.row.creator.name}</span>
			</Stack>
		),
	},
];
const ChatManagement = () => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		setRows(
			dashboardData.chats.map((data) => ({
				...data,
				id: data._id,
				avatar: data.avatar.map((img) => transformImage(img, 50)),
				members: data.members.map((img) => transformImage(img.avatar, 50)),
				creator: {
					name: data.creator.name,
					avatar: transformImage(data.creator.avatar, 50),
				},
			}))
		);
	}, []);

	return (
		<AdminLayout>
			<Table heading={"All Chats"} columns={columns} rows={rows} />
		</AdminLayout>
	);
};

export default ChatManagement;
