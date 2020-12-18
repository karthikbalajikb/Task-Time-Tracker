import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from "react-query/devtools";

// page components
import TimeTracking from './pages/TimeTracking';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimeTracking />
    </QueryClientProvider>
  );
}

export default App;
