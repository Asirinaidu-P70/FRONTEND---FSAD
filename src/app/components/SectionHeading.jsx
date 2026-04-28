function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div
      className="section-heading"
      style={{ textAlign: align, justifyItems: align === "center" ? "center" : "start" }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionHeading;
