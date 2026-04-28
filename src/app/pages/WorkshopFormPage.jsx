import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PageIntro from "../components/PageIntro";
import {
  createWorkshop,
  fetchWorkshopById,
  updateWorkshop,
} from "../services/api";

const defaultForm = {
  title: "",
  category: "AI & Emerging Tech",
  date: "",
  time: "",
  description: "",
  seatsAvailable: 20,
  price: "$99",
};

function WorkshopFormPage() {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(workshopId);
  const [form, setForm] = useState(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!workshopId) {
      setForm(defaultForm);
      return;
    }

    let isMounted = true;

    const loadWorkshop = async () => {
      try {
        const workshop = await fetchWorkshopById(workshopId);

        if (isMounted) {
          setForm({
            ...defaultForm,
            ...workshop,
          });
        }
      } catch (error) {
        toast.error("Failed to load workshop details.");
      }
    };

    loadWorkshop();

    return () => {
      isMounted = false;
    };
  }, [workshopId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        category: form.category.trim(),
        date: form.date.trim(),
        time: form.time.trim(),
        description: form.description.trim(),
        seatsAvailable: Number(form.seatsAvailable) || 0,
        price: form.price.trim(),
      };

      if (isEditMode) {
        await updateWorkshop(workshopId, payload);
        toast.success("Workshop updated successfully.");
      } else {
        await createWorkshop(payload);
        toast.success("Workshop created successfully.");
      }

      navigate("/admin/workshops");
    } catch (error) {
      toast.error(error.message || "Unable to save the workshop.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container">
      <PageIntro
        eyebrow={isEditMode ? "Edit workshop" : "Add workshop"}
        title={
          isEditMode
            ? "Refine workshop details before publishing the next cohort."
            : "Create a fresh workshop experience for your learners."
        }
        description="This form now saves workshop changes through the backend so the catalog reflects real MySQL data."
      />

      <form className="dashboard-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="title">Workshop title</label>
            <input className="input" id="title" name="title" onChange={handleChange} value={form.title} />
          </div>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input className="input" id="category" name="category" onChange={handleChange} value={form.category} />
          </div>
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input className="input" id="date" name="date" onChange={handleChange} value={form.date} />
          </div>
          <div className="form-field">
            <label htmlFor="time">Time</label>
            <input className="input" id="time" name="time" onChange={handleChange} value={form.time} />
          </div>
          <div className="form-field">
            <label htmlFor="seatsAvailable">Available seats</label>
            <input className="input" id="seatsAvailable" name="seatsAvailable" onChange={handleChange} value={form.seatsAvailable} />
          </div>
          <div className="form-field">
            <label htmlFor="price">Price</label>
            <input className="input" id="price" name="price" onChange={handleChange} value={form.price} />
          </div>
        </div>
        <div className="form-field" style={{ marginTop: "1rem" }}>
          <label htmlFor="description">Description</label>
          <textarea className="textarea" id="description" name="description" onChange={handleChange} value={form.description} />
        </div>
        <button className="button button-primary" disabled={isSaving} style={{ marginTop: "1rem" }} type="submit">
          {isSaving ? "Saving..." : isEditMode ? "Save changes" : "Create workshop"}
        </button>
      </form>
    </div>
  );
}

export default WorkshopFormPage;
