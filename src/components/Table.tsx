import { useEffect, useState } from "react";
import { MetricType, useVisualsContext } from "../context/AppContext";
import { fetchHandler } from "../lib/requestHandler";

export default function Table() {
	const [metrics, setMetrics] = useState<MetricType[]>([]);
	const { isLoading, refetch } = useVisualsContext();

	useEffect(() => {
		(async function getMetricsData() {
			try {
				const { data } = await fetchHandler(`/limit?limit=${10}`);
				setMetrics(() => data?.data as MetricType[]);
			} catch (error) {
				return error;
			}
		})();
	}, [refetch]);

	return (
		<div className="max-w-[1556px] mx-auto px-[4%] mt-8 mb-10">
			<div className="bg-white/70 p-4 rounded-md" role="table">
				{/* Header */}
				<div
					className="grid grid-cols-3 border-b min-h-[48px] items-center"
					role="heading"
				>
					<span className="text-sm text-black font-semibold">
						Metric Name
					</span>
					<span className="text-sm text-black font-semibold">
						Metric Value
					</span>
					<span className="text-sm text-black font-semibold">
						Time stamp
					</span>
				</div>

				{isLoading ? (
					<div className="bg-white p-6 flex items-center justify-center">
						<div className="lds-dual-ring" />
					</div>
				) : metrics.length === 0 ? (
					<div className="flex bg-slate-100 m-6 max-w-[500px] rounded-md mx-auto min-h-[100px] items-center justify-center">
						<span className="text-sm font-medium text-slate-600">
							No data available at the moment!
						</span>
					</div>
				) : (
					metrics.map((metric, index) => (
						<div
							aria-hidden={index === metrics.length - 1}
							key={index}
							className="grid grid-cols-3 py-4 border-b [&[aria-hidden='true']]:border-none"
							role="listitem"
						>
							<span className="text-sm text-black/70 font-medium">
								{metric.name}
							</span>

							<span className="text-sm text-black/70 font-medium">
								{metric.value}
							</span>

							<span className="text-sm text-black/70 font-medium">
								{metric.createdAt.split("T")[0]}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}
