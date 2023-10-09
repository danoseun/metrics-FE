import React, { useState } from "react";
import DownArrow from "../assets/down.svg";
import { useVisualsContext } from "../context/AppContext";

export default function Filter() {
	const [isHidden, setIsHidden] = useState(true);
	const [selection, setSelection] = useState({
		label: "within 7 days",
		value: "7d",
	});

	const { setFilter, isLoading, setCallerTurn, setSearchQuery } =
		useVisualsContext();

	async function handleSelection(e: React.MouseEvent<HTMLUListElement>) {
		const { target } = e;
		if (target instanceof HTMLLIElement) {
			setSelection({
				label: target.textContent as string,
				value: target.dataset.value as string,
			});
			setCallerTurn("filter");
			setFilter(target.dataset.value as string);
			setSearchQuery("");
			setIsHidden(true);
		}
	}

	return (
		<div className="flex w-full flex-col relative border-b border-slate-400 items-start">
			<span className="text-xs text-slate-400">Duration</span>
			<div
				aria-disabled={isLoading}
				className="relative w-full flex items-center [&[aria-disabled='true']]:pointer-events-none [&[aria-disabled='true']]:opacity-25"
			>
				<input
					disabled
					value={selection.label}
					type="text"
					className="bg-slate-50/30 border text-slate-400 placeholder:text-sm text-sm border-slate-100 outline-none h-10 w-full px-4 rounded-md"
					placeholder="Input start date"
				/>
				<button
					onClick={() => setIsHidden(!isHidden)}
					className="absolute w-8 right-4 flex pl-4"
				>
					<img className="h-4 w-4" src={DownArrow} alt="calendar" />
				</button>
			</div>

			{/* DropDown */}
			<ul
				aria-hidden={isHidden}
				onClick={handleSelection}
				className="absolute top-full w-full left-0 p-3 bg-white shadow-sm [&[aria-hidden='true']]:hidden block"
			>
				<li
					className="text-sm border-b hover:bg-slate-100 px-4 cursor-pointer border-slate-100 h-10 flex items-center text-slate-500"
					data-value="1m"
				>
					within 1 minute
				</li>
				<li
					className="text-sm border-b hover:bg-slate-100 px-4 cursor-pointer border-slate-100 h-10 flex items-center text-slate-500"
					data-value="1h"
				>
					within 1 hour
				</li>
				<li
					className="text-sm border-b hover:bg-slate-100 px-4 cursor-pointer border-slate-100 h-10 flex items-center text-slate-500"
					data-value="7d"
				>
					within 7 days
				</li>
				<li
					className="text-sm h-10 hover:bg-slate-100 px-4 cursor-pointer flex items-center text-slate-500"
					data-value="30d"
				>
					within 1 month
				</li>
			</ul>
		</div>
	);
}
