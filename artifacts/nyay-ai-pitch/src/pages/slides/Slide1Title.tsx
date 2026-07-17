export default function Slide1Title() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAF5F5",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        padding: "5vh 5vw",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{
            width: "2.8vw",
            height: "2.8vw",
            backgroundColor: "#8B0000",
            borderRadius: "0.4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.6vw", height: "1.6vw" }}>
              <path d="M12 3L4 9V21H9V15H15V21H20V9L12 3Z" fill="white" opacity="0.9" />
              <path d="M6 11L12 7L18 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: "1.5vw", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
            Saral
          </div>
        </div>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.9vw",
          color: "#4A5568",
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          textAlign: "right",
        }}>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Project:</span>Saral</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Date:</span>July 2026</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Event:</span>Hackathon</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Status:</span>Live</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: "absolute", bottom: "15vh", left: "5vw", width: "90vw" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-2vw",
              top: "2vh",
              width: "30vw",
              height: "6vh",
              backgroundColor: "#8B0000",
              opacity: 0.12,
              zIndex: 0,
            }}
          />
          <h1
            style={{
              fontSize: "8vw",
              fontWeight: 900,
              color: "#111111",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 1,
            }}
          >
            Saral
          </h1>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "6vh",
        }}>
          <p style={{
            fontSize: "1.9vw",
            fontWeight: 500,
            color: "#4A5568",
            margin: 0,
            maxWidth: "52vw",
            lineHeight: 1.4,
          }}>
            AI-powered legal assistance for every Indian citizen — no lawyer required.
          </p>

          <div style={{ width: "28vw", height: "1px", backgroundColor: "#E2E8F0" }} />
        </div>
      </div>

      {/* Decorative accent bottom-right */}
      <div style={{
        position: "absolute",
        bottom: "5vh",
        right: "5vw",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.9vw",
        color: "#A0AEC0",
      }}>
        न्याय — Justice for All
      </div>
    </div>
  );
}
