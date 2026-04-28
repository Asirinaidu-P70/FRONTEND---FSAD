import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro";
import { learningTracks } from "../data/feedback";

function MyLearningPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="My learning"
        title="Track lesson completion and pick up where you left off."
        description="Progress bars, module counts, and clear next-lesson cues keep the learning experience lightweight and motivating."
        actions={
          <Link className="button button-secondary" to="/app/certificates">
            View certificates
          </Link>
        }
      />

      <div className="learning-list">
        {learningTracks.map((track) => (
          <div key={track.id} className="dashboard-card">
            <div className="workshop-header" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="tag">Learning track</span>
                <h3 style={{ marginBottom: "0.35rem" }}>{track.title}</h3>
                <p className="muted" style={{ margin: 0 }}>
                  Next lesson: {track.nextLesson}
                </p>
              </div>
              <button type="button" className="button button-primary">
                <PlayCircle size={16} />
                Continue
              </button>
            </div>
            <div className="progress-track" style={{ marginTop: "1rem" }}>
              <div className="progress-fill" style={{ width: `${track.progress}%` }} />
            </div>
            <div className="toolbar" style={{ marginBottom: 0, marginTop: "0.85rem" }}>
              <span className="muted">
                {track.modulesCompleted}/{track.modulesTotal} modules complete
              </span>
              <strong>{track.progress}%</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearningPage;
