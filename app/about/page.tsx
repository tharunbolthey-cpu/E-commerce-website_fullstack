export default function About() {
  return (
    <div className="container section">
      <div style={{ maxWidth: 800 }}>
        <div className="eyebrow">Our point of view</div>

        <h1 className="display">
          Less, but better considered.
        </h1>

        <p
          style={{ fontSize: 18, lineHeight: 1.8 }}
          className="muted"
        >
          ATELIER is a fictional premium storefront built as a frontend-only
          demonstration. The experience is intentionally calm, editorial and
          practical, while every shopping flow persists in browser localStorage.
        </p>

        <div
          className="grid grid-3"
          style={{ marginTop: 35 }}
        >
          <div className="card padded">
            <h3>Quality</h3>
            <p className="muted">
              Products are presented with clear information and thoughtful details.
            </p>
          </div>

          <div className="card padded">
            <h3>Utility</h3>
            <p className="muted">
              The interface is designed for real shopping journeys across devices.
            </p>
          </div>

          <div className="card padded">
            <h3>Clarity</h3>
            <p className="muted">
              No fake APIs, no hidden backend — just a transparent demo architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}