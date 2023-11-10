export default function Section({ children }) {
  return (
    <section style={{ padding: `6rem 0` }}>
      <div className="content_container">{children}</div>
    </section>
  );
}
