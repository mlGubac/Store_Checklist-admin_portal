
import ModalContextProvider from './context/ModalContext';
import './css/Styles.scss';
import RouterModule from './RouterModule';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <div>

     <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <RouterModule />
        </ModalContextProvider>
     </QueryClientProvider>
    </div>
  );
}

export default App;