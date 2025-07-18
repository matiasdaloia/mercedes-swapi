import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
