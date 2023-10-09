/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ChartBox from "./components/Chart";
import Filter from "./components/Filter";
import MetricsForm from "./components/MetricsForm";
import Search from "./components/Search";
import { MetricType, VisualsContext } from "./context/AppContext";
import { fetchHandler } from "./lib/requestHandler";
import Table from "./components/Table";

export default function App() {
	const [visualMetrics, setVisualMetrics] = useState<MetricType[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [callerTurn, setCallerTurn] = useState<"search" | "filter">("filter");
	const [filter, setFilter] = useState("7d");

	const [isLoading, setIsLoading] = useState(false);

	/** To trigger a refetch */
	const [refetch, setRefetch] = useState(true);

	/**  caller turn - the idea is to ensure that when the search filter is being used
	 * this function does not get called. This function basically gives metrics based on the filter while
	 * search filter gives metrics based on a range of time.  */
	useEffect(() => {
		if (callerTurn === "filter")
			(async function getMetrics() {
				try {
					setIsLoading(true);
					const { data } = await fetchHandler(
						`/metrics?filter=${filter}`
					);
					setVisualMetrics(() => data?.data as MetricType[]);
					setIsLoading(false);
				} catch (error) {
					setIsLoading(false);
				}
			})();
	}, [filter, searchQuery, refetch]);

	return (
		<>
			<VisualsContext.Provider
				/** This are the states being shared amongs the children of this component */
				value={{
					callerTurn,
					setCallerTurn,
					metrics: visualMetrics,
					setMetrics: setVisualMetrics,
					isLoading,
					setIsLoading,
					searchQuery,
					filter,
					setFilter,
					setSearchQuery,
					setRefetch,
					refetch,
				}}
			>
				{/* The top navbar/header */}
				<header className="bg-white/60 sticky top-0 justify-between gap-6 w-full min-h-[100px]  border-b flex items-center">
					<div className="max-w-[1556px] mx-auto w-full px-[4%]">
						{/* Logo */}
						<h1 className="text-base font-bold text-green-500 uppercase">
							Visuals.
						</h1>
					</div>
				</header>

				<div className="flex justify-between flex-wrap rounded-md gap-12 max-w-[1556px] mx-auto px-[4%]">
					{/* The form for inputing the metrics and the chart box */}
					<div className="flex flex-col min-w-[300px] flex-1 w-full bg-white/60 mt-12 p-4">
						<MetricsForm />

						{searchQuery !== "" && (
							<span className="text-sm my-2 font-medium mx-auto text-black/60">
								Showing results from {searchQuery}
							</span>
						)}

						{/* Chart Box */}
						<div className="mt-12 w-full pr-[4%]">
							{isLoading ? (
								<div className="flex bg-slate-100 max-w-[500px] rounded-md mx-auto min-h-[100px] items-center justify-center">
									<div className="lds-dual-ring" />
								</div>
							) : visualMetrics.length === 0 ? (
								<div className="flex bg-slate-100 max-w-[500px] rounded-md mx-auto min-h-[100px] items-center justify-center">
									<span className="text-sm font-medium text-slate-600">
										No data available at the moment!
									</span>
								</div>
							) : (
								<ChartBox />
							)}
						</div>
					</div>

					{/* The filter and search inputs */}
					<div className="mt-12 flex min-w-[200px] flex-1 sm:flex-[0.4] rounded-md bg-white/60 p-4 flex-col gap-12">
						{/* Search */}
						<Search />

						{/* Filter */}
						<Filter />
					</div>
				</div>

				{/* Data Table */}
				<Table />
			</VisualsContext.Provider>
		</>
	);
}
