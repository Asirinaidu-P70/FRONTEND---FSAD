import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  updateCurrentUser,
  setApiAuthToken,
} from "../services/api";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "user";
const LEGACY_AUTH_STORAGE_KEY = "workshop-platform-auth";
const TOKEN_STORAGE_KEY = "token";

function readStoredSession() {
  const storedValue =
    localStorage.getItem(AUTH_STORAGE_KEY) ||
    localStorage.getItem(LEGACY_AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue?.user || parsedValue || null;
  } catch {
    return null;
  }
}

function readStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function persistStoredSession(user, token) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(LEGACY_AUTH_STORAGE_KEY, JSON.stringify(user));

  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredSession());
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncStoredSession = async () => {
      const storedToken = readStoredToken();

      if (storedToken) {
        setApiAuthToken(storedToken);
      }

      if (!readStoredSession()) {
        return;
      }

      try {
        const nextUser = await fetchCurrentUser();

        if (isMounted) {
          setUser(nextUser);
        }
      } catch {
        if (isMounted) {
          setApiAuthToken(null);
          clearStoredSession();
          setUser(null);
        }
      }
    };

    syncStoredSession();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(LEGACY_AUTH_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  }, [user]);

  const login = async (credentials) => {
    setIsAuthLoading(true);

    try {
      const response = await loginUser(credentials);
      setApiAuthToken(response.token);
      persistStoredSession(response.user, response.token);
      setUser(response.user);
      toast.success(`Welcome back, ${response.user.name.split(" ")[0]}.`);
      return response.user;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signup = async (payload) => {
    setIsAuthLoading(true);

    try {
      const response = await registerUser(payload);
      setApiAuthToken(response.token);
      persistStoredSession(response.user, response.token);
      setUser(response.user);
      toast.success("Account created successfully.");
      return response.user;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setApiAuthToken(null);
    clearStoredSession();
    setUser(null);
    toast("Signed out successfully.");
  };

  const updateProfile = async (payload) => {
    const updatedUser = await updateCurrentUser({
      ...(user || {}),
      ...payload,
    });
    setUser(updatedUser);
    toast.success("Profile updated.");
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        updateProfile,
        isAuthLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
