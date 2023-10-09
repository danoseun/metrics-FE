import { ChangeEvent, useState } from "react";
import { postHandler } from "../lib/requestHandler";
import { useVisualsContext } from "../context/AppContext";

export default function MetricsForm() {
	const [formData, setFormData] = useState({
		name: "",
		value: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { setRefetch } = useVisualsContext();

	function handleFormState(e: ChangeEvent<HTMLInputElement>) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	async function onSubmit() {
		setIsLoading(true);
		await postHandler("/metrics", formData);
		setIsLoading(false);

		setFormData({ name: "", value: "" });
		setRefetch((prevState) => !prevState);
	}

	return (
		<section className="w-full py-8 pr-[4%]">
			<form className="flex gap-8">
				{/* Metric name */}
				<div className="flex flex-col w-full max-w-[600px]">
					<label htmlFor="metric-name" className="w-full">
						<span className="text-sm font-medium text-slate-400">
							Metric Name:
						</span>
						<input
							onChange={handleFormState}
							name="name"
							type="text"
							value={formData.name}
							className="bg-slate-50/30 placeholder:text-slate-300 max-w-[400px] border-b text-slate-400 placeholder:text-sm text-sm border-slate-400 outline-none h-10 w-full px-4"
							placeholder="Logs data"
						/>
					</label>
				</div>

				{/* Metric Value */}
				<div className="flex flex-col w-full max-w-[600px]">
					<label htmlFor="metric-name" className="w-full">
						<span className="text-sm font-medium text-slate-400">
							Metric Value:
						</span>
						<input
							onChange={handleFormState}
							name="value"
							type="number"
							value={formData.value}
							className="bg-slate-50/30 placeholder:text-slate-300 max-w-[400px] border-b text-slate-400 placeholder:text-sm text-sm border-slate-400 outline-none h-10 w-full px-4"
							placeholder="280"
						/>
					</label>
				</div>

				<button
					disabled={
						isLoading ||
						formData.name === "" ||
						formData.value === ""
					}
					onClick={() => onSubmit()}
					type="button"
					className="text-sm disabled:bg-green-200 disabled:pointer-events-none bg-green-500 text-slate-100 rounded flex items-center justify-center h-10 max-w-[150px] w-full mt-auto"
				>
					Submit
				</button>
			</form>
		</section>
	);
}
