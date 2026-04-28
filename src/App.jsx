import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/context/AuthContext";
import { ThemeProvider } from "./app/context/ThemeContext";
import AppRouter from "./app/routes/AppRouter";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2600,
            style: {
              background: "rgba(10, 15, 32, 0.92)",
              color: "#f3f7ff",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "18px",
              boxShadow: "0 20px 45px rgba(7, 11, 26, 0.35)",
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
