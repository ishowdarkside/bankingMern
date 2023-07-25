import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import AppLayout from "./ui/AppLayout/AppLayout";
import UserContextProvider from "./contexts/userContext";
import Loan from "./pages/Loan/Loan";
import RequestsMade from "./pages/RequestsMade/RequestsMade";
import RequestsReceived from "./pages/RequestsReceived/RequestsReceived";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="auth/signup" element={<Signup />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="loan" element={<Loan />} />
              <Route path="requestsMade" element={<RequestsMade />} />
              <Route path="requestsReceived" element={<RequestsReceived />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
