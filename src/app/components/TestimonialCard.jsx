function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <span className="tag">Client story</span>
      <blockquote>“{testimonial.quote}”</blockquote>
      <div>
        <strong>{testimonial.name}</strong>
        <p className="muted" style={{ margin: "0.35rem 0 0" }}>
          {testimonial.title}
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
