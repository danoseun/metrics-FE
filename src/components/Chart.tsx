/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useVisualsContext } from "../context/AppContext";

Chart.register(CategoryScale);

export default function ChartBox() {
	const { metrics } = useVisualsContext();

	const chartData = {
		labels: metrics.map((metric) => metric.name),
		// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above.
		datasets: [
			{
				label: "Metric Values",
				data: metrics.map((metric) => metric.value),
				// you can set indiviual colors for each bar
				backgroundColor: ["rgba(34, 197, 94, 1)"],
				borderWidth: 1,
				barThickness: metrics.length > 10 ? 30 : 50,
			},
		],
	};

	return (
		<Bar
			data={chartData}
			options={{
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: "Metrics Visuals",
						font: { size: 16 },
					},
					legend: {
						display: false,
					},
				},
			}}
		/>
	);
}
