import { RouterProvider } from "react-router";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./shared/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  );
}

export default App;
