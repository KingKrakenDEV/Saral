export default function Slide2Problem() {
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8vh" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-1vw",
              top: "1.5vh",
              width: "13vw",
              height: "3.5vh",
              backgroundColor: "#8B0000",
              opacity: 0.12,
              zIndex: 0,
            }}
          />
          <h2
            style={{
              fontSize: "3.5vw",
              fontWeight: 900,
              color: "#111111",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 1,
            }}
          >
            The Problem
          </h2>
        </div>

        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
          Saral
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "5vw", flex: 1 }}>
        {/* Left: problem statement */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4vh" }}>
          <p style={{ fontSize: "1.6vw", fontWeight: 500, color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            India has one of the world's largest legal systems — but access to it remains a privilege, not a right.
          </p>

          <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "3.5vh" }}>
            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#8B0000", fontWeight: 500, minWidth: "2.5vw" }}>01</div>
              <div>
                <h3 style={{ fontSize: "1.35vw", fontWeight: 700, color: "#111111", margin: "0 0 0.8vh 0" }}>Extreme lawyer shortage</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  1.4 billion Indians, but fewer than 20 lawyers per 100,000 people — well below the global average.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#8B0000", fontWeight: 500, minWidth: "2.5vw" }}>02</div>
              <div>
                <h3 style={{ fontSize: "1.35vw", fontWeight: 700, color: "#111111", margin: "0 0 0.8vh 0" }}>Inaccessible language</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  Legal documents are written in complex English or archaic legalese — incomprehensible to most citizens.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#8B0000", fontWeight: 500, minWidth: "2.5vw" }}>03</div>
              <div>
                <h3 style={{ fontSize: "1.35vw", fontWeight: 700, color: "#111111", margin: "0 0 0.8vh 0" }}>Prohibitive cost</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  A single consultation costs ₹2,000–₹10,000+ — out of reach for the common person.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#8B0000", fontWeight: 500, minWidth: "2.5vw" }}>04</div>
              <div>
                <h3 style={{ fontSize: "1.35vw", fontWeight: 700, color: "#111111", margin: "0 0 0.8vh 0" }}>Rights go unexercised</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  Injustice goes unchallenged. Simply because people don't know.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: stat callout */}
        <div style={{
          width: "28vw",
          backgroundColor: "#111111",
          padding: "4vh 3vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "2vh" }}>
            Legal access gap
          </div>
          <div style={{ fontSize: "6vw", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1 }}>
            70%
          </div>
          <div style={{ fontSize: "1.1vw", color: "#E2E8F0", marginTop: "2vh", lineHeight: 1.5 }}>
            of Indians have no access to formal legal help when they need it most.
          </div>
          <div style={{ marginTop: "4vh", width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#718096", marginTop: "2vh" }}>
            Source: DAKSH India, 2023
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
          The Problem / Saral
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#111111", fontWeight: 600 }}>
          02
        </div>
      </div>
    </div>
  );
}
