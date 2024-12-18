import { useRef } from "react";

import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
} from "chart.js";

// Register required Chart.js modules
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler
);

interface CustomLineChartProps {
	data: number[];
	labels: string[];
}

const data = [12, 19, 3, 5, 2, 3, 10, 9, 6, 15, 6, 8, 17]; // Example data
const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jun",
	"Jun",
	"Jun",
	"Jun",
	"Jun",
	"Jun",
	"Jun",
];

const getGradient = (ctx: CanvasRenderingContext2D) => {
	const gradient = ctx.createLinearGradient(0, 0, 0, 70);
	gradient.addColorStop(0.2857, "#368DB2"); // Start with #368DB2 (blue)
	gradient.addColorStop(1, "#737373"); // End with #737373 (gray)
	return gradient;
};

const GraphicChart: React.FC<CustomLineChartProps> = () => {
	const chartRef = useRef(null);

	const chartData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: (context: any) => {
					const { chart } = context;
					const { ctx } = chart;
					return getGradient(ctx);
				},
				fill: true,
				tension: 0.4, // Smooth curve
				pointRadius: 0,
				pointHoverRadius: 0,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				display: false, // Hide x-axis
			},
			y: {
				display: false, // Hide y-axis
			},
		},
		plugins: {
			legend: {
				display: false, // Hide legend
			},
		},
	};

	return (
		<div style={{ height: "50px", width: "100px" }}>
			<Line ref={chartRef} data={chartData} options={chartOptions} />
		</div>
	);
};

export { GraphicChart };
