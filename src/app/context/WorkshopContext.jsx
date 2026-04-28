import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchMyWorkshops,
  fetchWorkshops,
  registerWorkshop,
} from "../services/api";
import { useAuth } from "./AuthContext";

const WorkshopContext = createContext(null);

function mergeUniqueWorkshops(items) {
  const mapped = new Map();

  items.forEach((item) => {
    if (!item?.id) {
      return;
    }

    const key = String(item.id);
    const existing = mapped.get(key);
    mapped.set(key, existing ? { ...existing, ...item } : item);
  });

  return Array.from(mapped.values());
}

function updateWorkshopRegistration(workshop, registeredWorkshop) {
  return {
    ...workshop,
    ...registeredWorkshop,
    registered: true,
    seatsAvailable:
      registeredWorkshop?.seatsAvailable ??
      Math.max(0, Number(workshop.seatsAvailable || 0) - 1),
  };
}

export function WorkshopProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [myWorkshops, setMyWorkshops] = useState([]);
  const [isWorkshopsLoading, setIsWorkshopsLoading] = useState(true);
  const [isMyWorkshopsLoading, setIsMyWorkshopsLoading] = useState(false);
  const [workshopsError, setWorkshopsError] = useState(null);
  const [registrationsError, setRegistrationsError] = useState(null);
  const [registrationBusyId, setRegistrationBusyId] = useState(null);

  const loadWorkshops = async () => {
    setIsWorkshopsLoading(true);

    try {
      const nextWorkshops = await fetchWorkshops();
      setWorkshops(nextWorkshops);
      setWorkshopsError(null);
      return nextWorkshops;
    } catch (error) {
      setWorkshops([]);
      setWorkshopsError(error);
      return [];
    } finally {
      setIsWorkshopsLoading(false);
    }
  };

  const loadMyWorkshops = async () => {
    if (!isAuthenticated || user?.role !== "user") {
      setMyWorkshops([]);
      setRegistrationsError(null);
      return [];
    }

    setIsMyWorkshopsLoading(true);

    try {
      const nextRegistrations = await fetchMyWorkshops();
      setMyWorkshops(mergeUniqueWorkshops(nextRegistrations));
      setRegistrationsError(null);
      return nextRegistrations;
    } catch (error) {
      setMyWorkshops([]);
      setRegistrationsError(error);
      return [];
    } finally {
      setIsMyWorkshopsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  useEffect(() => {
    loadMyWorkshops();
  }, [isAuthenticated, user?.id, user?.role]);

  const registeredWorkshopIds = useMemo(
    () => new Set(myWorkshops.map((item) => String(item.id))),
    [myWorkshops]
  );

  useEffect(() => {
    setWorkshops((current) =>
      current.map((workshop) => ({
        ...workshop,
        registered: registeredWorkshopIds.has(String(workshop.id)),
      }))
    );
  }, [registeredWorkshopIds]);

  const featuredTrainers = useMemo(() => {
    const trainerMap = new Map();

    workshops.forEach((workshop) => {
      if (!workshop?.trainerName) {
        return;
      }

      const key = workshop.trainerId || workshop.trainerName;
      const existing = trainerMap.get(key);

      if (existing) {
        trainerMap.set(key, {
          ...existing,
          sessions: existing.sessions + 1,
        });
        return;
      }

      trainerMap.set(key, {
        id: workshop.trainerId || key,
        name: workshop.trainerName,
        role: workshop.trainerRole || "Workshop Trainer",
        title: workshop.trainerRole || "Workshop Trainer",
        expertise: workshop.tags?.[0] || workshop.category,
        sessions: 1,
        avatar: workshop.trainerAvatar,
      });
    });

    return Array.from(trainerMap.values());
  }, [workshops]);

  const isWorkshopRegistered = (workshopId) =>
    registeredWorkshopIds.has(String(workshopId));

  const registerForWorkshop = async (workshop) => {
    if (!isAuthenticated) {
      const error = new Error("Please sign in to register for a workshop.");
      toast.error(error.message);
      throw error;
    }

    if (user?.role !== "user") {
      const error = new Error("Only learner accounts can register for workshops.");
      toast.error(error.message);
      throw error;
    }

    const workshopId = String(workshop.id);

    if (registeredWorkshopIds.has(workshopId)) {
      toast("You are already registered for this workshop.");
      return myWorkshops.find((item) => String(item.id) === workshopId) || workshop;
    }

    setRegistrationBusyId(workshopId);

    try {
      const registeredWorkshop = await registerWorkshop(workshop.id);
      const mergedWorkshop = updateWorkshopRegistration(workshop, registeredWorkshop);

      setMyWorkshops((current) => mergeUniqueWorkshops([mergedWorkshop, ...current]));
      setWorkshops((current) =>
        current.map((item) =>
          String(item.id) === workshopId
            ? updateWorkshopRegistration(item, registeredWorkshop)
            : item
        )
      );
      toast.success(`You are registered for ${mergedWorkshop.title}.`);
      return mergedWorkshop;
    } catch (error) {
      if (error.alreadyRegistered) {
        const mergedWorkshop = updateWorkshopRegistration(workshop, {
          registered: true,
          registrationStatus: "Registered",
        });

        setMyWorkshops((current) => mergeUniqueWorkshops([mergedWorkshop, ...current]));
        setWorkshops((current) =>
          current.map((item) =>
            String(item.id) === workshopId
              ? { ...item, registered: true }
              : item
          )
        );
        toast("You are already registered for this workshop.");
        return mergedWorkshop;
      }

      toast.error(error.message);
      throw error;
    } finally {
      setRegistrationBusyId(null);
    }
  };

  return (
    <WorkshopContext.Provider
      value={{
        workshops,
        myWorkshops,
        featuredTrainers,
        isWorkshopsLoading,
        isMyWorkshopsLoading,
        workshopsError,
        registrationsError,
        registrationBusyId,
        isWorkshopRegistered,
        registerForWorkshop,
        refreshWorkshops: loadWorkshops,
        refreshMyWorkshops: loadMyWorkshops,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
}

export function useWorkshops() {
  const context = useContext(WorkshopContext);

  if (!context) {
    throw new Error("useWorkshops must be used inside WorkshopProvider");
  }

  return context;
}
