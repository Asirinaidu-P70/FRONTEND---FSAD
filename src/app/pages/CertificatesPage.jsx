import { Link } from "react-router-dom";
import CertificateCard from "../components/CertificateCard";
import PageIntro from "../components/PageIntro";
import { certificates } from "../data/feedback";

function CertificatesPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Certificates"
        title="Preview completion certificates with a polished credential card UI."
        description="This screen gives your project a satisfying post-workshop endpoint and supports the full learner lifecycle."
        actions={
          <Link className="button button-secondary" to="/app/feedback">
            Leave feedback
          </Link>
        }
      />

      <div className="page-grid grid-2">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  );
}

export default CertificatesPage;
