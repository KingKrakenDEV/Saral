export default function Slide3Features() {
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
              width: "22vw",
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
            What Saral Does
          </h2>
        </div>

        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          Saral
        </div>
      </div>

      {/* 2x2 Feature Grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
        {/* Row 1 */}
        <div style={{ display: "flex", gap: "2vw", flex: 1 }}>
          {/* Feature 01 */}
          <div style={{
            flex: 1,
            border: "1px solid #E2E8F0",
            padding: "3vh 2.5vw",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              backgroundColor: "#C8530A",
            }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", fontWeight: 500, marginBottom: "1.5vh" }}>01</div>
            <h3 style={{ fontSize: "1.5vw", fontWeight: 800, color: "#0A1628", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
              Legal Chat
            </h3>
            <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.55, margin: 0 }}>
              Ask any question about Indian law in plain language and get an instant, accurate answer — covering the Constitution, IPC, RTI, and more.
            </p>
          </div>

          {/* Feature 02 */}
          <div style={{
            flex: 1,
            border: "1px solid #E2E8F0",
            padding: "3vh 2.5vw",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              backgroundColor: "#C8530A",
            }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", fontWeight: 500, marginBottom: "1.5vh" }}>02</div>
            <h3 style={{ fontSize: "1.5vw", fontWeight: 800, color: "#0A1628", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
              Document Explainer
            </h3>
            <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.55, margin: 0 }}>
              Paste any legal notice, contract, or FIR and understand exactly what it means — in plain language, streamed in real time.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "flex", gap: "2vw", flex: 1 }}>
          {/* Feature 03 */}
          <div style={{
            flex: 1,
            border: "1px solid #E2E8F0",
            padding: "3vh 2.5vw",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              backgroundColor: "#C8530A",
            }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", fontWeight: 500, marginBottom: "1.5vh" }}>03</div>
            <h3 style={{ fontSize: "1.5vw", fontWeight: 800, color: "#0A1628", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
              Document Creator
            </h3>
            <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.55, margin: 0 }}>
              Fill a simple form and generate a ready-to-use Affidavit, Legal Notice, Rent Agreement, Consumer Complaint, NOC, or Power of Attorney.
            </p>
          </div>

          {/* Feature 04 */}
          <div style={{
            flex: 1,
            border: "1px solid #E2E8F0",
            padding: "3vh 2.5vw",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              backgroundColor: "#C8530A",
            }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#C8530A", fontWeight: 500, marginBottom: "1.5vh" }}>04</div>
            <h3 style={{ fontSize: "1.5vw", fontWeight: 800, color: "#0A1628", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
              Document Library
            </h3>
            <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.55, margin: 0 }}>
              Every document you've created, saved and accessible forever. Download, copy, or reference it anytime.
            </p>
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
          Features / Saral
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>
          03
        </div>
      </div>
    </div>
  );
}
