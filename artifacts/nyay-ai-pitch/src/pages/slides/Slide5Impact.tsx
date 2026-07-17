export default function Slide5Impact() {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6vh" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-1vw",
              top: "1.5vh",
              width: "12vw",
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
            The Impact
          </h2>
        </div>

        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          NyayAI
        </div>
      </div>

      {/* Hero stat + stories */}
      <div style={{ display: "flex", gap: "2.5vw", flex: 1 }}>
        {/* Hero stat block */}
        <div style={{
          flex: 1,
          backgroundColor: "#0A1628",
          padding: "4vh 3vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1.5vh" }}>
            Our north star
          </div>
          <div style={{ fontSize: "5.5vw", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", color: "#FFFFFF" }}>
            न्याय
          </div>
          <div style={{ fontSize: "1.6vw", fontWeight: 600, color: "#C8530A", marginTop: "1vh", marginBottom: "2.5vh" }}>
            Justice
          </div>
          <div style={{ fontSize: "1.1vw", color: "#E2E8F0", lineHeight: 1.6 }}>
            Nyay means justice in Hindi. We're making it real — one citizen, one question, one document at a time.
          </div>
        </div>

        {/* Impact stories */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ border: "1px solid #E2E8F0", padding: "2.5vh 2.5vw", display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", minWidth: "2vw", paddingTop: "0.3vh" }}>01</div>
            <div>
              <div style={{ fontSize: "1.25vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.8vh" }}>RTI applications filed</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5 }}>
                Citizens who previously didn't know they could demand government accountability — now they can.
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #E2E8F0", padding: "2.5vh 2.5vw", display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", minWidth: "2vw", paddingTop: "0.3vh" }}>02</div>
            <div>
              <div style={{ fontSize: "1.25vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.8vh" }}>Tenants who read before signing</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5 }}>
                Understanding a rent agreement before it's too late — in their own language, for free.
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #E2E8F0", padding: "2.5vh 2.5vw", display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", minWidth: "2vw", paddingTop: "0.3vh" }}>03</div>
            <div>
              <div style={{ fontSize: "1.25vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.8vh" }}>Consumers who win complaints</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5 }}>
                Knowing how to file a Consumer Forum complaint — and actually getting it done in minutes.
              </div>
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
          Impact / NyayAI
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>
          05
        </div>
      </div>
    </div>
  );
}
