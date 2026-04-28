import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import DrawerPanel from "../components/DrawerPanel";
import EmptyState from "../components/EmptyState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageIntro from "../components/PageIntro";
import SearchToolbar from "../components/SearchToolbar";
import WorkshopCard from "../components/WorkshopCard";
import { useAuth } from "../context/AuthContext";
import { fetchWorkshops, registerWorkshop } from "../services/api";

const ITEMS_PER_PAGE = 4;

function WorkshopListPage() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registeringWorkshopId, setRegisteringWorkshopId] = useState(null);

  const isDashboardView = location.pathname.startsWith("/app");
  const basePath = isDashboardView ? "/app/workshops" : "/workshops";
  const workshopCategories = useMemo(
    () => ["All", ...new Set(workshops.map((workshop) => workshop.category).filter(Boolean))],
    [workshops]
  );

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = `${workshop.title} ${workshop.category} ${workshop.trainerName}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || workshop.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredWorkshops.length / ITEMS_PER_PAGE));
  const currentPageRows = filteredWorkshops.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } catch (error) {
        toast.error("Failed to load workshops.");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const handleRegister = async (workshopId, title) => {
    if (!isAuthenticated) {
      toast.error("Please log in to register.");
      return;
    }

    try {
      setRegisteringWorkshopId(workshopId);
      await registerWorkshop(workshopId);

      toast.success(`${title} registered successfully.`);

      const updatedWorkshops = await fetchWorkshops();
      setWorkshops(updatedWorkshops);
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setRegisteringWorkshopId(null);
    }
  };

  return (
    <div className={isDashboardView ? "" : "top-padding"}>
      <section className="page-section">
        <div className="container">
          <PageIntro
            eyebrow={isDashboardView ? "Discover workshops" : "Workshop catalog"}
            title={
              isDashboardView
                ? "Browse your next premium learning session."
                : "Explore a curated catalog of live workshops and training cohorts."
            }
            description="Search by topic, review trainer highlights, inspect seat availability, and preview the polished workshop card system."
            actions={
              isDashboardView ? (
                <Link className="button button-primary" to="/app/my-workshops">
                  View My Workshops
                </Link>
              ) : (
                <Link className="button button-primary" to="/register">
                  Join as learner
                  <ArrowRight size={16} />
                </Link>
              )
            }
          />

          <SearchToolbar
            action={
              <span className="pill">
                <Sparkles size={14} />
                {filteredWorkshops.length} matching workshops
              </span>
            }
            categories={workshopCategories}
            category={category}
            onCategoryChange={setCategory}
            onOpenFilters={() => setFiltersOpen(true)}
            onSearchChange={setSearch}
            search={search}
          />

          {isLoading ? (
            <LoadingSkeleton count={4} height={320} />
          ) : currentPageRows.length ? (
            <>
              <div className="page-grid grid-2">
                {currentPageRows.map((workshop) => (
                  <WorkshopCard
                    key={workshop.id}
                    detailsHref={`${basePath}/${workshop.id}`}
                    registerAction={() => handleRegister(workshop.id, workshop.title)}
                    workshop={workshop}
                    isRegistered={workshop.registered}
                    isRegistering={registeringWorkshopId === workshop.id}
                  />
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const value = index + 1;

                  return (
                    <button
                      key={`page-${value}`}
                      type="button"
                      className={page === value ? "active" : ""}
                      onClick={() => setPage(value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <EmptyState
              title="No workshops matched these filters"
              description="Try clearing the search term or switching back to all categories to see the full catalog."
              action={
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Reset Filters
                </button>
              }
            />
          )}
        </div>
      </section>

      <DrawerPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Catalog filters"
      >
        <div className="page-grid">
          <div className="form-field">
            <label htmlFor="filter-search">Search term</label>
            <input
              className="input"
              id="filter-search"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </div>
          <div className="form-field">
            <label htmlFor="filter-category">Category</label>
            <select
              className="select"
              id="filter-category"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              {workshopCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button className="button button-primary" type="button" onClick={() => setFiltersOpen(false)}>
            Apply Filters
          </button>
        </div>
      </DrawerPanel>
    </div>
  );
}

export default WorkshopListPage;
