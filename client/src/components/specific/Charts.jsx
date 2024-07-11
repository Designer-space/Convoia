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
import { purple, purpleLight } from "../constants/color";
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
		x: {
			grid: {
				display: false,
			},
		},
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
				label: "Revenue",
				fill: true,
				backgroundColor: purpleLight,
				borderColor: purple,
			},
		],
	};

	return <Line data={data} options={lineChartOptions} />;
};
const DoughnutChart = () => {
	return <div>Charts</div>;
};

export { LineChart, DoughnutChart };
