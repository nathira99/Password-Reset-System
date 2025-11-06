export default function AuthCard({ title, children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-primary">{title}</h3>
        {children}
      </div>
    </div>
  );
}
