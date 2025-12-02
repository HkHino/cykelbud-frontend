// src/App.tsx
import React from "react";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeOverviewPage from "./pages/EmployeeOverviewPage";
import ShiftplanPage from "./pages/ShiftplanPage";
import EmployeeHomePage from "./pages/EmployeeHomePage";




const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    brand: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D",
    },
    accent: {
      500: "#ed8936",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(userName, password);
      // På sigt kan vi lave logic her:
      // - admin → /admin
      // - normal employee → /employee
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError("Login fejlede. Tjek brugernavn/password eller API-URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="brand.500"
    >
      <Box bg="white" p={8} rounded="lg" shadow="lg" minW="320px">
        <Heading mb={6} size="md">
          Cykelbud Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Brugernavn</FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="fx alice"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
            </FormControl>

            {error && (
              <FormControl isInvalid>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
            )}

            <Button
              type="submit"
              colorScheme="orange"
              width="100%"
              isLoading={isLoading}
            >
              Log ind
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

// Simpelt PrivateRoute
const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/employees/:id"
              element={
                <PrivateRoute>
                  <EmployeeOverviewPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/shiftplan"
              element={
                <PrivateRoute>
                  <ShiftplanPage />
                </PrivateRoute>
              }
            />

           
<Route
  path="/employee"
  element={
    <PrivateRoute>
      <EmployeeHomePage />
    </PrivateRoute>
  }
/>


            {/* Fallback: hvis route ikke findes → gå til /admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
