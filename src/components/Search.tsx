import { ChangeEvent, useState } from "react";
import Calendar from "../assets/calendar.svg";
import { MetricType, useVisualsContext } from "../context/AppContext";
import { fetchHandler } from "../lib/requestHandler";

export default function Search() {
	const [searchData, setSearchData] = useState({ from: "", to: "" });
	const [error, setError] = useState("");

	const {
		setMetrics,
		setIsLoading,
		isLoading,
		setCallerTurn,
		setSearchQuery,
	} = useVisualsContext();

	function handleFormData(e: ChangeEvent<HTMLInputElement>) {
		setSearchData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	async function handleSearch() {
		/** Making sure the input values are not empty  */
		if (searchData.from === "" || searchData.to === "") {
			setError("Please fill out both fields!");
			return;
		}

		/** Converting the date inputs to correspond with YY-MM-DD */
		const fromDate = new Date(searchData.from).toISOString().split("T")[0];
		const toDate = new Date(searchData.to).toISOString().split("T")[0];

		/** Making sure the start date is not greater than the end date */
		if (new Date(toDate).getTime() < new Date(fromDate).getTime()) {
			setError("Start date cannot be greater than End date!");
			return;
		}

		setError("");

		setIsLoading(true);
		setCallerTurn("search");
		const { data } = await fetchHandler(
			`/search?from=${fromDate}&to=${toDate}`
		);

		setSearchData({ from: "", to: "" });
		setMetrics(() => data?.data as MetricType[]);
		setIsLoading(false);

		setSearchQuery(`${fromDate} to ${toDate}`);
	}

	return (
		<div className="w-full flex flex-col justify-between gap-8">
			<div className="flex flex-col w-full relative items-start">
				<span className="text-xs text-slate-400 mb-2">Start date</span>
				<div className="relative w-full flex items-center">
					<input
						onChange={handleFormData}
						type="date"
						name="from"
						required
						className="bg-slate-50/30 text-slate-400 border-b placeholder:text-sm text-sm border-slate-400 outline-none h-10 w-full px-4"
						placeholder="Input start date"
					/>
					<button className="absolute right-4 pointer-events-none">
						<img
							className="h-4 w-4"
							src={Calendar}
							alt="calendar"
						/>
					</button>
				</div>
			</div>

			<div className="flex flex-col w-full relative items-start">
				<span className="text-xs text-slate-400 mb-2">End date</span>
				<div className="relative w-full flex items-center">
					<input
						onChange={handleFormData}
						required
						type="date"
						name="to"
						className="bg-slate-50/30 text-slate-400 border-b placeholder:text-sm text-sm border-slate-400 outline-none h-10 w-full px-4"
						placeholder="Input start date"
					/>
					<button className="absolute right-4 pointer-events-none">
						<img
							className="h-4 w-4"
							src={Calendar}
							alt="calendar"
						/>
					</button>
				</div>
			</div>

			{error !== "" && (
				<span className="text-xs font-medium text-rose-500">
					{error}
				</span>
			)}

			<button
				disabled={isLoading}
				onClick={() => handleSearch()}
				type="button"
				className="text-sm bg-green-500 disabled:bg-green-200 disabled:pointer-events-none text-slate-100 rounded flex items-center justify-center h-10 max-w-[150px] w-full mt-auto"
			>
				Search
			</button>
		</div>
	);
}
