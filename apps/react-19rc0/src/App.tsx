import { Suspense, lazy } from "react";
import type { Story } from "./Component";
const Component = lazy(() => import("./Component").then((module) => ({ default: module.Component })));

function App() {
	const fetchHackerNews = async (delay: number, query: string): Promise<Story[]> => {
		const response = await fetch(
			`https://hn.algolia.com/api/v1/search?query=${query}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();
		await new Promise((resolve) => setTimeout(resolve, delay));

		return data.hits;
	};

	return (
		<div>
			<h1>React 19 RC 0</h1>
			<Suspense fallback={<div>ローディング中...</div>}>
				<div style={{ display: "flex", gap: "20px" }}>
					<Component fetchHackerNews={fetchHackerNews(500, 'react')} />
					<Component fetchHackerNews={fetchHackerNews(1000, 'vue')} />
				</div>
			</Suspense>
		</div>
	);
}

export default App;
