import { ChartDashboard } from "src/components/ChartDashboard";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient()
const Metrics   = () => {
    return(
        <QueryClientProvider client={queryClient}>
            <ChartDashboard />
        </QueryClientProvider>
    )
}

export default Metrics