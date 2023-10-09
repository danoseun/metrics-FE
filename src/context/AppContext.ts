import { createContext, useContext } from "react";

export interface MetricType {
	name: string;
	value: number;
	createdAt: string;
}

export interface VisualMetrics {
	callerTurn: "search" | "filter";
	setCallerTurn: React.Dispatch<React.SetStateAction<"search" | "filter">>;
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
	refetch: boolean;
	metrics: Array<MetricType>;
	setMetrics: React.Dispatch<React.SetStateAction<Array<MetricType>>>;
}

export const VisualsContext = createContext<VisualMetrics | undefined>(
	undefined
);

export function useVisualsContext() {
	const visuals = useContext(VisualsContext);

	if (visuals === undefined)
		throw new Error(
			"useVisualsContext must be used within the context of the parent wrapper"
		);

	return visuals;
}
