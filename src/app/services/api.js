import axios from "axios";

function normalizeApiBaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

const API_BASE = "https://web-production-6a1e6a.up.railway.app";
const WORKSHOPS_API_BASE = `${API_BASE}/api/workshops`;

const configuredApiBaseUrl = normalizeApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL || `${API_BASE}/api`
);
const apiBaseUrl = configuredApiBaseUrl || (import.meta.env.DEV ? "/api" : "");
const USER_STORAGE_KEY = "user";
const LEGACY_AUTH_STORAGE_KEY = "workshop-platform-auth";
const TOKEN_STORAGE_KEY = "token";

export const apiClient = axios.create({
  baseURL: apiBaseUrl || undefined,
  timeout: 10000,
  withCredentials: false,
});

function ensureApiBaseUrl() {
  if (apiBaseUrl) {
    return;
  }

  throw new Error(
    "Missing VITE_API_BASE_URL. Set it to your deployed backend URL ending with /api."
  );
}

export function setApiAuthToken(token) {
  if (token) {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }

    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  delete apiClient.defaults.headers.common.Authorization;
}

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage.getItem(TOKEN_STORAGE_KEY)
      : null;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`;
  }

  return config;
});

function unwrapEnvelope(payload) {
  let current = payload;
  let depth = 0;

  while (current && typeof current === "object" && !Array.isArray(current) && depth < 6) {
    if ("data" in current && current.data !== current) {
      current = current.data;
      depth += 1;
      continue;
    }

    if ("result" in current && current.result !== current) {
      current = current.result;
      depth += 1;
      continue;
    }

    break;
  }

  return current;
}

function extractList(payload, keys = []) {
  const source = unwrapEnvelope(payload);

  if (Array.isArray(source)) {
    return source;
  }

  for (const key of [...keys, "items", "content", "records", "rows"]) {
    if (Array.isArray(source?.[key])) {
      return source[key];
    }
  }

  return [];
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createAvatar(name, background = "#1d4ed8", foreground = "#eff6ff") {
  const initials = String(name || "User")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${initials} avatar"><rect width="120" height="120" rx="28" fill="${background}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${foreground}" font-family="Arial, sans-serif" font-size="42" font-weight="700">${initials}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function formatDateValue(value) {
  if (!value) {
    return "To be announced";
  }

  if (typeof value === "string" && /[A-Za-z]{3,}/.test(value) && /\d{4}/.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTimeValue(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString();
}

function formatTimeValue(value) {
  if (!value) {
    return "To be announced";
  }

  if (typeof value === "string" && /([AP]M|UTC|GMT|IST)/i.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
}

function formatMonthYear(value) {
  if (!value) {
    return "Recently joined";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function sortNewestFirstById(items, getId = (item) => item?.id) {
  return [...items].sort(
    (a, b) => toNumber(getId(b), 0) - toNumber(getId(a), 0)
  );
}

function formatPrice(value, currencyCode = "INR") {
  if (value === null || value === undefined || value === "") {
    return "Free";
  }

  if (typeof value === "string" && /[$€£₹]/.test(value)) {
    return value;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}

function mapRole(role) {
  const normalized = Array.isArray(role) ? role[0] : role;
  const value = String(normalized || "").toLowerCase();

  if (value.includes("admin")) {
    return "admin";
  }

  if (value.includes("learner") || value.includes("student") || value.includes("client")) {
    return "user";
  }

  return "user";
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStoredJson(key, fallbackValue) {
  if (!canUseStorage()) {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function readStoredAuthToken() {
  return canUseStorage() ? window.localStorage.getItem(TOKEN_STORAGE_KEY) : null;
}

function getStoredUser() {
  return (
    readStoredJson(USER_STORAGE_KEY, null) ||
    readStoredJson(LEGACY_AUTH_STORAGE_KEY, null)
  );
}

function getStoredAuthenticatedUser() {
  const storedUser = getStoredUser();
  return storedUser?.user || storedUser || null;
}

function getStoredAuthenticatedUserId() {
  const user = getStoredAuthenticatedUser();
  return user?.id ?? user?.userId ?? null;
}

function getStoredAuthenticatedUserEmail() {
  const user = getStoredAuthenticatedUser();
  return String(user?.email || "").trim().toLowerCase() || null;
}

function buildWorkshopStatus(seatsAvailable, seatsTotal, providedStatus) {
  if (providedStatus) {
    return providedStatus;
  }

  if (!seatsAvailable) {
    return "Closed";
  }

  if (seatsTotal && seatsAvailable / seatsTotal <= 0.2) {
    return "Filling Fast";
  }

  return "Open";
}

function normalizeTrainer(rawTrainer, workshop = {}) {
  const source = unwrapEnvelope(rawTrainer) || {};
  const name =
    source.name ||
    source.fullName ||
    source.trainerName ||
    workshop.trainerName ||
    "Workshop Trainer";
  const title =
    source.title ||
    source.role ||
    source.designation ||
    source.trainerRole ||
    workshop.trainerRole ||
    workshop.trainerTitle ||
    "Workshop Trainer";
  const expertise =
    source.expertise ||
    workshop.tags?.[0] ||
    workshop.category ||
    "Workshop Delivery";

  return {
    id:
      source.id ||
      source.trainerId ||
      workshop.trainerId ||
      `trainer-${slugify(name) || "default"}`,
    name,
    role: title,
    title,
    expertise,
    sessions: toNumber(
      source.sessions ?? source.sessionCount ?? source.workshopsCount ?? 0,
      0
    ),
    avatar:
      source.avatar ||
      source.avatarUrl ||
      source.trainerAvatar ||
      workshop.trainerAvatar ||
      source.imageUrl ||
      workshop.imageUrl ||
      createAvatar(name, "#0f172a", "#f8fafc"),
  };
}

export function normalizeUser(rawUser = {}) {
  const source = unwrapEnvelope(rawUser) || {};
  const name =
    source.name ||
    [source.firstName, source.lastName].filter(Boolean).join(" ").trim() ||
    source.username ||
    source.email ||
    "User";
  const role = mapRole(source.role || source.userRole || source.accountType);

  return {
    id: source.id || source.userId || source.uuid || `user-${slugify(name) || Date.now()}`,
    name,
    email: source.email || "",
    role,
    avatar:
      source.avatar ||
      source.avatarUrl ||
      source.profileImage ||
      createAvatar(name, role === "admin" ? "#0f172a" : "#1d4ed8", "#eff6ff"),
    title:
      source.title ||
      source.designation ||
      source.profession ||
      (role === "admin" ? "Administrator" : "Learner"),
    company: source.company || source.organization || "",
    location: source.location || source.city || source.address || "",
    phone: source.phone || source.mobile || source.contactNumber || "",
    bio: source.bio || source.about || "",
    completedHours: toNumber(
      source.completedHours ?? source.learningHours ?? source.hoursCompleted,
      0
    ),
    certificatesEarned: toNumber(
      source.certificatesEarned ?? source.certificateCount ?? source.certificates,
      0
    ),
    joinedOn: formatDateTimeValue(source.joinedOn || source.createdAt || source.joinedAt),
    interests: normalizeStringList(source.interests || source.skills || source.topics),
  };
}

export function normalizeWorkshop(rawWorkshop = {}) {
  const source = unwrapEnvelope(rawWorkshop) || {};
  const seatsTotal = toNumber(
    source.seatsTotal ?? source.capacity ?? source.totalSeats ?? source.maxParticipants,
    0
  );
  const registeredCount = toNumber(
    source.registeredCount ??
      (typeof source.registered === "number" ? source.registered : undefined) ??
      source.enrolledCount ??
      source.bookedSeats,
    0
  );
  const derivedSeatsAvailable = seatsTotal
    ? Math.max(seatsTotal - registeredCount, 0)
    : 0;
  const seatsAvailable = toNumber(
    source.seatsAvailable ?? source.availableSeats ?? source.remainingSeats,
    derivedSeatsAvailable
  );
  const dateValue =
    source.startDateTime || source.startAt || source.date || source.workshopDate;
  const timeValue =
    source.startDateTime || source.startAt || source.time || source.workshopTime;
  const trainer = normalizeTrainer(
    source.trainer || source.instructor || source.facilitator,
    source
  );
  const rating = toNumber(source.rating ?? source.averageRating, 0);
  const tags = normalizeStringList(source.tags || source.keywords || source.skills);
  const agenda = normalizeStringList(source.agenda || source.modules || source.topics);
  const benefits = normalizeStringList(
    source.benefits || source.outcomes || source.highlights
  );

  return {
    id: source.id || source.workshopId || source.uuid,
    title: source.title || source.name || "Untitled workshop",
    category: source.category || source.categoryName || source.domain || "Workshop",
    trainerId: trainer.id,
    trainerName: trainer.name,
    trainerRole: trainer.role || trainer.title,
    trainerAvatar: trainer.avatar,
    date: formatDateValue(dateValue),
    time: formatTimeValue(timeValue),
    seatsAvailable,
    seatsTotal: seatsTotal || Math.max(seatsAvailable + registeredCount, 1),
    rating,
    duration: source.duration || source.durationLabel || "Flexible",
    level: source.level || source.skillLevel || "All levels",
    price: formatPrice(source.price ?? source.amount ?? source.fee, source.currency),
    mode: source.mode || source.deliveryMode || source.format || "Online",
    status: buildWorkshopStatus(seatsAvailable, seatsTotal, source.status),
    nextSession:
      source.nextSession ||
      source.nextTopic ||
      (dateValue ? `Starts ${formatDateValue(dateValue)}` : "Schedule to be announced"),
    description:
      source.description ||
      source.summary ||
      "Workshop details will be published soon.",
    imageUrl:
      source.imageUrl ||
      source.image ||
      source.thumbnail ||
      trainer.avatar,
    agenda: agenda.length ? agenda : ["Agenda will be shared by the organizer."],
    benefits: benefits.length ? benefits : ["Learning outcomes will be shared soon."],
    trainer,
    tags: tags.length ? tags : [source.category || "Workshop"],
    popularity: toNumber(source.popularity ?? source.registrationRate, 0),
    completion: toNumber(source.completion ?? source.progress, 0),
    registered:
      typeof source.registered === "boolean"
        ? source.registered
        : Boolean(source.isRegistered),
    registrationId: source.registrationId || source.id,
    registrationStatus: source.registrationStatus || source.registrationState || "Registered",
  };
}

function normalizeRegistration(rawRegistration = {}) {
  const source = unwrapEnvelope(rawRegistration) || {};
  const workshopSource =
    source.workshop ||
    source.session ||
    source.course ||
    (source.workshopId ? { id: source.workshopId } : source);
  const workshop = normalizeWorkshop(workshopSource);
  const registrationStatus =
    source.status && !["Open", "Closed", "Filling Fast", "Almost Full"].includes(source.status)
      ? source.status
      : workshop.registrationStatus || "Registered";

  return {
    ...workshop,
    id: workshop.id || source.workshopId || source.id,
    registered: true,
    registrationId: source.id || source.registrationId || workshop.registrationId,
    registeredAt: formatDateTimeValue(
      source.registrationDate || source.registeredAt || source.createdAt
    ),
    registrationStatus,
    progress: toNumber(source.progress ?? workshop.completion, 0),
  };
}

function extractMessage(error, fallbackMessage) {
  const payload = error?.response?.data;
  const possibleMessage =
    payload?.message ||
    payload?.error ||
    payload?.details ||
    payload?.title ||
    error?.message;

  if (possibleMessage) {
    return String(possibleMessage);
  }

  return fallbackMessage;
}

function toApiError(error, fallbackMessage) {
  const wrapped = new Error(extractMessage(error, fallbackMessage));
  wrapped.status = error?.response?.status;
  wrapped.cause = error;
  wrapped.alreadyRegistered =
    wrapped.status === 409 || /already registered/i.test(wrapped.message);
  return wrapped;
}

async function toFetchError(response, fallbackMessage) {
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  const wrapped = new Error(
    payload?.message || payload?.error || payload?.details || fallbackMessage
  );
  wrapped.status = response.status;
  wrapped.alreadyRegistered =
    wrapped.status === 409 || /already registered/i.test(wrapped.message);
  return wrapped;
}

function resolveApiUrl(url) {
  if (/^https?:\/\//i.test(String(url || ""))) {
    return url;
  }

  ensureApiBaseUrl();
  return `${apiBaseUrl}${url}`;
}

export const authFetch = async (url, options = {}) => {
  const token = readStoredAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(resolveApiUrl(url), {
    ...options,
    headers,
  });
};

async function requestFirst(configs, fallbackMessage) {
  ensureApiBaseUrl();

  let lastError = null;

  for (const config of configs) {
    try {
      return await apiClient(config);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }

      throw toApiError(error, fallbackMessage);
    }
  }

  throw toApiError(lastError, fallbackMessage);
}

export async function fetchUsers() {
  const response = await requestFirst(
    [{ method: "get", url: "/auth/users" }],
    "Unable to load users right now."
  );

  return sortNewestFirstById(
    extractList(response.data, ["users"]).map((item) => normalizeUser(item))
  );
}

export async function fetchUserById(userId) {
  const response = await requestFirst(
    [
      { method: "get", url: `/auth/users/${userId}` },
      { method: "get", url: `/users/${userId}` },
    ],
    "Unable to load your profile information."
  );

  return normalizeUser(response.data);
}

export async function fetchRegistrationsByUserId(userId) {
  const response = await requestFirst(
    [{ method: "get", url: `/registrations/user/${userId}` }],
    "Unable to load registrations right now."
  );

  return sortNewestFirstById(
    extractList(response.data, ["registrations"]).map((item) => {
      const registration = unwrapEnvelope(item) || {};
      return {
        id: registration.id,
        userId: registration.userId,
        workshopId: registration.workshopId,
        registrationDate: registration.registrationDate,
      };
    })
  );
}

export async function fetchRegistrations() {
  try {
    const response = await requestFirst(
      [{ method: "get", url: "/registrations" }],
      "Unable to load registrations right now."
    );

    return sortNewestFirstById(
      extractList(response.data, ["registrations"]).map((item) => {
        const registration = unwrapEnvelope(item) || {};
        return {
          id: registration.id,
          userId: registration.userId,
          workshopId: registration.workshopId,
          registrationDate:
            registration.registrationDate || registration.registeredAt || registration.createdAt,
        };
      })
    );
  } catch (error) {
    if (error.status !== 404 && error.status !== 405) {
      throw error;
    }

    const users = await fetchUsers();
    const registrations = await Promise.all(
      users.map((user) => fetchRegistrationsByUserId(user.id))
    );

    return sortNewestFirstById(registrations.flat());
  }
}

export async function loginUser(credentials) {
  const response = await requestFirst(
    [{ method: "post", url: "/auth/login", data: credentials }],
    "Unable to sign in with the provided credentials."
  );
  const payload = unwrapEnvelope(response.data);
  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.access_token ||
    null;

  if (token) {
    setApiAuthToken(token);
  }

  const normalizedUser = normalizeUser(
    payload?.user || payload?.profile || payload?.account || payload
  );

  return {
    token,
    user: normalizedUser.id ? await fetchUserById(normalizedUser.id).catch(() => normalizedUser) : normalizedUser,
  };
}

export async function registerUser(payload) {
  ensureApiBaseUrl();

  const fullName = String(payload?.fullName || payload?.name || "").trim();
  const password = payload?.password || "";
  const requestBody = {
    fullName,
    name: fullName,
    email: String(payload?.email || "").trim(),
    password,
    confirmPassword: payload?.confirmPassword || password,
    role: payload?.role || "user",
  };
  const response = await requestFirst(
    [{ method: "post", url: "/auth/register", data: requestBody }],
    "Unable to create the account right now."
  );

  const data = unwrapEnvelope(response.data);
  const token =
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.access_token ||
    null;

  if (token) {
    setApiAuthToken(token);
  }

  const normalizedUser = normalizeUser(data?.user || data?.profile || data);

  return {
    token,
    user: normalizedUser.id ? await fetchUserById(normalizedUser.id).catch(() => normalizedUser) : normalizedUser,
  };
}

export async function fetchCurrentUser() {
  const currentUserId = getStoredAuthenticatedUserId();
  const currentUserEmail = getStoredAuthenticatedUserEmail();
  const storedUser = getStoredAuthenticatedUser();

  if (currentUserId) {
    try {
      return await fetchUserById(currentUserId);
    } catch (error) {
      if (error.status !== 404 && error.status !== 405) {
        throw error;
      }
    }
  }

  const users = await fetchUsers();
  const matchedUser = users.find(
    (user) =>
      (currentUserId && String(user.id) === String(currentUserId)) ||
      (currentUserEmail && String(user.email).trim().toLowerCase() === currentUserEmail)
  );

  if (!matchedUser) {
    if (storedUser) {
      return normalizeUser(storedUser);
    }

    throw new Error("Unable to load your profile information.");
  }

  return matchedUser;
}

export async function updateCurrentUser(payload) {
  const currentUserId = getStoredAuthenticatedUserId();

  if (!currentUserId) {
    throw new Error("Please sign in to update your profile.");
  }

  const response = await requestFirst(
    [
      { method: "put", url: `/auth/users/${currentUserId}`, data: payload },
      { method: "patch", url: `/auth/users/${currentUserId}`, data: payload },
      { method: "put", url: `/users/${currentUserId}`, data: payload },
      { method: "patch", url: `/users/${currentUserId}`, data: payload },
    ],
    "Profile updates are not available until the backend exposes a user update endpoint."
  );

  const data = unwrapEnvelope(response.data);
  const normalizedUser = normalizeUser(data && Object.keys(data).length ? data : payload);

  return await fetchUserById(currentUserId).catch(() => normalizedUser);
}

export async function fetchWorkshops() {
  try {
    const response = await axios.get(`${API_BASE}/api/workshops`);

    return sortNewestFirstById(
      extractList(response.data, ["workshops"]).map((item) =>
        normalizeWorkshop(item)
      )
    );
  } catch (error) {
    throw toApiError(error, "Unable to load workshops right now.");
  }
}

export async function fetchWorkshopById(workshopId) {
  try {
    const response = await axios.get(`${API_BASE}/api/workshops/${workshopId}`);
    return normalizeWorkshop(unwrapEnvelope(response.data));
  } catch (error) {
    throw toApiError(error, "Unable to load this workshop right now.");
  }
}

export async function createWorkshop(payload) {
  const response = await authFetch(WORKSHOPS_API_BASE, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await toFetchError(response, "Unable to create the workshop right now.");
  }

  return normalizeWorkshop(await response.json());
}

export async function updateWorkshop(workshopId, payload) {
  const response = await authFetch(`${WORKSHOPS_API_BASE}/${workshopId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await toFetchError(response, "Unable to update the workshop right now.");
  }

  return normalizeWorkshop(await response.json());
}

export async function fetchMyWorkshops() {
  const currentUserId = getStoredAuthenticatedUserId();

  if (!currentUserId) {
    throw new Error("Please sign in to view your workshop registrations.");
  }

  const [registrationsResponse, workshopsResponse] = await Promise.all([
    requestFirst(
      [
        { method: "get", url: `/registrations/user/${currentUserId}` },
        { method: "get", url: "/registrations/me" },
        { method: "get", url: "/users/me/workshops" },
        { method: "get", url: `${WORKSHOPS_API_BASE}/registered` },
      ],
      "Unable to load your workshop registrations."
    ),
    fetchWorkshops(),
  ]);

  const workshopMap = new Map(
    workshopsResponse.map((item) => [String(item.id), item])
  );

  const registrations = extractList(registrationsResponse.data, ["registrations", "workshops"]);

  return sortNewestFirstById(
    registrations.map((item) => {
      const registration = unwrapEnvelope(item) || {};
      const workshopId =
        registration.workshopId ||
        registration.workshop?.id ||
        registration.workshop?.workshopId;
      const workshop = workshopId ? workshopMap.get(String(workshopId)) : null;

      return normalizeRegistration(
        workshop ? { ...registration, workshop } : registration
      );
    }),
    (item) => item?.registrationId ?? item?.id
  );
}

export async function registerWorkshop(workshopId) {
  const currentUserId = getStoredAuthenticatedUserId();

  if (!currentUserId) {
    throw new Error("Please sign in to register for a workshop.");
  }

  const response = await authFetch("/registrations", {
    method: "POST",
    body: JSON.stringify({
      workshopId,
    }),
  });

  if (!response.ok) {
    throw await toFetchError(response, "Unable to complete the workshop registration.");
  }

  const payload = unwrapEnvelope(await response.json());
  const source = payload?.registration || payload;

  if (payload?.registration || payload?.workshop || payload?.status) {
    const registeredWorkshopId =
      payload?.registration?.workshopId ||
      payload?.workshop?.id ||
      payload?.workshop?.workshopId ||
      payload?.workshopId ||
      workshopId;
    let workshop = payload?.workshop || null;

    if (!workshop && registeredWorkshopId) {
      try {
        workshop = await fetchWorkshopById(registeredWorkshopId);
      } catch {
        workshop = null;
      }
    }

    return normalizeRegistration(
      workshop ? { ...(payload?.registration || payload), workshop } : (payload?.registration || payload)
    );
  }

  let workshop = null;

  if (source?.workshopId || workshopId) {
    try {
      workshop = await fetchWorkshopById(source?.workshopId || workshopId);
    } catch {
      workshop = null;
    }
  }

  return normalizeRegistration(workshop ? { ...source, workshop } : source);
}
