import { Download, ShieldCheck } from "lucide-react";

function CertificateCard({ certificate }) {
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <div className="icon-wrap">
          <ShieldCheck size={20} />
        </div>
        <div className="certificate-meta">
          <strong>{certificate.title}</strong>
          <span className="muted">Issued to {certificate.recipient}</span>
        </div>
      </div>
      <div className="page-grid" style={{ gap: "0.75rem", marginTop: "1rem" }}>
        <div className="workshop-meta">
          <span className="muted">Issued on</span>
          <strong>{certificate.issuedOn}</strong>
        </div>
        <div className="workshop-meta">
          <span className="muted">Credential ID</span>
          <strong>{certificate.credentialId}</strong>
        </div>
      </div>
      <button type="button" className="button button-secondary" style={{ marginTop: "1rem" }}>
        <Download size={16} />
        Download Preview
      </button>
    </div>
  );
}

export default CertificateCard;
