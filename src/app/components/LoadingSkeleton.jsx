function LoadingSkeleton({ count = 3, height = 140 }) {
  return (
    <div className="page-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="skeleton"
          style={{ height, borderRadius: "28px" }}
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
