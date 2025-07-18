import { Routes, Route } from "react-router";
import PeoplePage from "./pages/PeoplePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlanetsPage from "./pages/PlanetsPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/planets" element={<PlanetsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
