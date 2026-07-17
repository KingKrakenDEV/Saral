export default function Slide4Tech() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F9F9F8",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        padding: "5vh 5vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "7vh" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-1vw",
              top: "1.5vh",
              width: "24vw",
              height: "3.5vh",
              backgroundColor: "#C8530A",
              opacity: 0.12,
              zIndex: 0,
            }}
          />
          <h2
            style={{
              fontSize: "3.5vw",
              fontWeight: 900,
              color: "#0A1628",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 1,
            }}
          >
            Powered by Indian Law
          </h2>
        </div>

        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          Saral
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "4vw", flex: 1 }}>
        {/* Left: coverage list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3.5vh" }}>
          <div>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A0AEC0", marginBottom: "2vh", fontFamily: "'DM Mono', monospace" }}>
              Legal Coverage
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5vw", paddingBottom: "2vh", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#C8530A", minWidth: "1.5vw" }}>—</div>
                <div style={{ fontSize: "1.1vw", color: "#0A1628", fontWeight: 600 }}>Constitution of India</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5vw", paddingBottom: "2vh", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#C8530A", minWidth: "1.5vw" }}>—</div>
                <div style={{ fontSize: "1.1vw", color: "#0A1628", fontWeight: 600 }}>IPC / BNS &amp; CrPC / BNSS</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5vw", paddingBottom: "2vh", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#C8530A", minWidth: "1.5vw" }}>—</div>
                <div style={{ fontSize: "1.1vw", color: "#0A1628", fontWeight: 600 }}>RTI Act &amp; Consumer Protection Act</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5vw", paddingBottom: "2vh", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#C8530A", minWidth: "1.5vw" }}>—</div>
                <div style={{ fontSize: "1.1vw", color: "#0A1628", fontWeight: 600 }}>Family, Labour &amp; Property Law</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A0AEC0", marginBottom: "2vh", fontFamily: "'DM Mono', monospace" }}>
              Languages Supported
            </div>
            <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>English</div>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>Hindi</div>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>Tamil</div>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>Bengali</div>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>Telugu</div>
              <div style={{ padding: "0.8vh 1.2vw", border: "1px solid #E2E8F0", fontSize: "1vw", color: "#4A5568", fontWeight: 500 }}>Marathi</div>
            </div>
          </div>
        </div>

        {/* Right: tech stack callout */}
        <div style={{
          width: "30vw",
          backgroundColor: "#0A1628",
          padding: "4vh 3vw",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ fontSize: "0.85vw", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A0AEC0", marginBottom: "3vh", fontFamily: "'DM Mono', monospace" }}>
            Under the Hood
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh", flex: 1 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096", marginBottom: "0.5vh" }}>Model</div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#FFFFFF" }}>LLaMA 3.3 70B via Groq</div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096", marginBottom: "0.5vh" }}>Streaming</div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#FFFFFF" }}>Real-time SSE — no waiting</div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096", marginBottom: "0.5vh" }}>Storage</div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#FFFFFF" }}>PostgreSQL — all data persisted</div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096", marginBottom: "0.5vh" }}>Documents</div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#FFFFFF" }}>6 legal templates, production-ready</div>
            </div>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "3vh", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096" }}>
              Built in 48 hours. Live today.
            </div>
          </div>
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
        borderTop: "1px solid #E2E8F0",
        paddingTop: "2vh",
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>
          Technology / Saral
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>
          04
        </div>
      </div>
    </div>
  );
}
