import { useEffect, useState, useMemo } from 'react';
import { apiGetDashboardInfo } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import { Chart, AxisOptions } from 'react-charts';
import Box from '@mui/material/Box';

type DailyStars = { _id: string; count: number };

type Series = {
	label: string;
	data: DailyStars[];
};

export default function App() {
	const primaryAxis = useMemo(
		(): AxisOptions<DailyStars> => ({
			getValue: (datum) => {
				return datum._id;
			},
			elementType: 'line',
		}),

		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<DailyStars>[] => [
			{
				getValue: (datum) => {
					return datum.count;
				},
				elementType: 'line',
			},
		],

		[],
	);

	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<Array<Series>>([]);

	useEffect(() => {
		async function getDashboardInfo() {
			const result: apiGetDashboardInfo = await axiosGet('api/admin/dashboard');
			if (result.ok) {
				setData([
					{
						label: 'Usuarios',
						data: result.data.dashboard.users,
					},
					{
						label: 'Exámenes',
						data: result.data.dashboard.results,
					},
				]);
			} else {
				setData([{ label: 'O', data: [] }]);
			}

			setLoading(false);
		}

		getDashboardInfo().then().catch(console.error);
	}, []);

	return (
		<Box sx={{ width: '100%', height: 400 }}>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<Chart
						options={{
							data,
							primaryAxis,
							secondaryAxes,
						}}
					/>
				</>
			)}
		</Box>
	);
}
