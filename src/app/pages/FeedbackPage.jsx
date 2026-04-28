import { useState } from "react";
import toast from "react-hot-toast";
import PageIntro from "../components/PageIntro";
import { feedbackEntries } from "../data/feedback";

function FeedbackPage() {
  const [form, setForm] = useState({
    workshop: "AI Product Strategy Sprint",
    rating: "5",
    comment: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Feedback submitted to the mock dataset.");
    setForm((current) => ({ ...current, comment: "" }));
  };

  return (
    <div className="container">
      <PageIntro
        eyebrow="Feedback"
        title="Collect polished learner sentiment after every workshop."
        description="Feedback flows help close the workshop loop and make the app feel more complete from a product perspective."
      />

      <div className="page-grid grid-2">
        <form className="dashboard-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="feedback-workshop">Workshop</label>
            <select
              className="select"
              id="feedback-workshop"
              value={form.workshop}
              onChange={(event) =>
                setForm((current) => ({ ...current, workshop: event.target.value }))
              }
            >
              <option>AI Product Strategy Sprint</option>
              <option>Design Systems for Fast Teams</option>
              <option>Remote Facilitation Studio</option>
            </select>
          </div>
          <div className="form-field" style={{ marginTop: "1rem" }}>
            <label htmlFor="feedback-rating">Rating</label>
            <select
              className="select"
              id="feedback-rating"
              value={form.rating}
              onChange={(event) =>
                setForm((current) => ({ ...current, rating: event.target.value }))
              }
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Great</option>
              <option value="3">3 - Good</option>
            </select>
          </div>
          <div className="form-field" style={{ marginTop: "1rem" }}>
            <label htmlFor="feedback-comment">Comment</label>
            <textarea
              className="textarea"
              id="feedback-comment"
              value={form.comment}
              onChange={(event) =>
                setForm((current) => ({ ...current, comment: event.target.value }))
              }
            />
          </div>
          <button className="button button-primary" style={{ marginTop: "1rem" }} type="submit">
            Submit feedback
          </button>
        </form>

        <div className="page-grid">
          {feedbackEntries.map((entry) => (
            <div key={entry.id} className="notification-card">
              <div className="notification-header" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <strong>{entry.workshop}</strong>
                  <p className="muted" style={{ margin: "0.35rem 0 0" }}>
                    {entry.author}
                  </p>
                </div>
                <span className="tag">{entry.score}/5</span>
              </div>
              <p className="muted" style={{ lineHeight: 1.7, marginBottom: 0 }}>
                {entry.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
