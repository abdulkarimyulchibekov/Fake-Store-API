import { ApexChart, BasicChart, CandleStick } from '../../components';
import { AreaChart } from '../../components';
import { MainDashboardLayout } from './Dashboard.styles';

export const Dashboard = () => {
	return (
		<MainDashboardLayout>
			<ApexChart />
			<BasicChart />
			<AreaChart />
			<CandleStick />
		</MainDashboardLayout>
	);
};
