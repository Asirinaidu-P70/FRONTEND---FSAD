function PageIntro({ eyebrow, title, description, actions }) {
  return (
    <div className="page-intro">
      <div className="page-intro-copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions ? <div className="page-intro-actions">{actions}</div> : null}
    </div>
  );
}

export default PageIntro;
