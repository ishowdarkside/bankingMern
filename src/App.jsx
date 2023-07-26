import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
import { Toaster } from "react-hot-toast";
const Login = lazy(() => import("./pages/Login/Login"));
import AppLayout from "./ui/AppLayout/AppLayout";
import UserContextProvider from "./contexts/userContext";
import Spinner from "./ui/Spinner";
import NotFound from "./ui/NotFound/NotFound";
const Loan = lazy(() => import("./pages/Loan/Loan"));
const RequestsMade = lazy(() => import("./pages/RequestsMade/RequestsMade"));
const RequestsReceived = lazy(() =>
  import("./pages/RequestsReceived/RequestsReceived")
);
const TransactionHistory = lazy(() =>
  import("./pages/TransactionHistory/TransactionHistory")
);
const User = lazy(() => import("./pages/User/User"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Suspense fallback={<Spinner />}>
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
                <Route path="history" element={<TransactionHistory />} />
                <Route path="user" element={<User />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
