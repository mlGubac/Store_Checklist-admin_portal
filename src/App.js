import './css/Styles.scss';
import RouterModule from './RouterModule';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <div>
     <QueryClientProvider client={queryClient}>
        <RouterModule />
     </QueryClientProvider>
    </div>
  );
}

export default App;