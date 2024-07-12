import React from "react";
import { Line, Doughnut } from "react-chartjs-2";

import {
	ArcElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js";
import { orange, orangeLight, purple, purpleLight } from "../constants/color";
import { getLastSevenDays } from "../../lib/features";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Filler,
	ArcElement,
	Legend,
	Tooltip
);

const lineChartOptions = {
	responsive: "true",
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			grid: {
				display: false,
			},
		},
	},
};

const labels = getLastSevenDays();

const LineChart = ({ value = [] }) => {
	const data = {
		labels: labels,
		datasets: [
			{
				data: value,
				label: "messages",
				fill: true,
				backgroundColor: purpleLight,
				borderColor: purple,
			},
		],
	};

	return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
	responsive: "true",
	plugins: {
		legend: {
			display: false,
		},
	},
	cutout: 110,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
	const data = {
		labels,
		datasets: [
			{
				data: value,
				backgroundColor: [purpleLight, orangeLight],
				borderColor: [purple, orange],
				hoverBackgroundColor: [purple, orange],
				offset: "15",
			},
		],
	};
	return (
		<Doughnut
			style={{
				zIndex: "10",
			}}
			data={data}
			options={doughnutChartOptions}
		/>
	);
};

export { LineChart, DoughnutChart };
