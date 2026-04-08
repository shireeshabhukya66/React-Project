export default function Skeleton() {
  return (
    <div className="card">
      <div className="card-image" style={{ background: "#ddd" }}></div>

      <div className="card-content">
        <div
          style={{ height: "20px", background: "#ccc", marginBottom: "10px" }}
        ></div>
        <div style={{ height: "15px", background: "#ccc" }}></div>
      </div>
    </div>
  );
}
