export default function Slide6Closing() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0A1628",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        padding: "5vh 5vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{
            width: "2.8vw",
            height: "2.8vw",
            backgroundColor: "#C8530A",
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
          <div style={{ fontSize: "1.5vw", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            NyayAI
          </div>
        </div>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.9vw",
          color: "#A0AEC0",
          display: "flex",
          gap: "3vw",
        }}>
          <div>Built at the Hackathon</div>
          <div>July 2026</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "45vw",
              height: "12vh",
              backgroundColor: "#C8530A",
              opacity: 0.1,
              zIndex: 0,
            }}
          />
          <h2
            style={{
              fontSize: "5.5vw",
              fontWeight: 900,
              color: "#FFFFFF",
              margin: "0 0 3vh 0",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 1,
              textWrap: "balance",
            }}
          >
            Let's Make Justice Accessible.
          </h2>
        </div>

        <p style={{
          fontSize: "1.7vw",
          color: "#A0AEC0",
          maxWidth: "48vw",
          lineHeight: 1.55,
          margin: "0 0 5vh 0",
          fontWeight: 400,
        }}>
          Built at the hackathon — live and working today.
        </p>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "1.4vw",
          color: "#C8530A",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}>
          nyayai.replit.app
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute",
        bottom: "5vh",
        left: "5vw",
        right: "5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        paddingTop: "2vh",
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#4A5568" }}>
          Thank You / NyayAI
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#FFFFFF", fontWeight: 600 }}>
          06
        </div>
      </div>
    </div>
  );
}
