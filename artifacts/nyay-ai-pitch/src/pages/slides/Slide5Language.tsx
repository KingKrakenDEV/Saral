import React from "react";

const NAVY = "#0A1628";
const SAFFRON = "#C8530A";
const LIGHT_SAFFRON = "#F4E8E0";

const stats = [
  { value: "10%", label: "of Indians speak English", sub: "Only ~130M out of 1.4 billion" },
  { value: "22", label: "official languages in India", sub: "Recognised by the Constitution" },
  { value: "1.26B", label: "people locked out by language", sub: "Cannot access English-only legal tools" },
  { value: "96%", label: "prefer their mother tongue", sub: "For important life decisions" },
];

const languages = [
  { name: "हिन्दी", lang: "Hindi", speakers: "528M" },
  { name: "বাংলা", lang: "Bengali", speakers: "97M" },
  { name: "తెలుగు", lang: "Telugu", speakers: "82M" },
  { name: "मराठी", lang: "Marathi", speakers: "83M" },
  { name: "தமிழ்", lang: "Tamil", speakers: "67M" },
  { name: "ગુજરાતી", lang: "Gujarati", speakers: "56M" },
];

export default function Slide5Language() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F5F2",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{ width: "100%", height: "0.4vh", background: SAFFRON }} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "3vh 4vw 2vh",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75vw",
              color: SAFFRON,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5vh",
            }}
          >
            Breaking the Language Barrier
          </div>
          <div
            style={{
              fontSize: "2.6vw",
              fontWeight: 800,
              color: NAVY,
              lineHeight: 1.1,
            }}
          >
            Justice Shouldn't Need<br />
            <span style={{ color: SAFFRON }}>English.</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7vw",
            color: "#A0AEC0",
            textAlign: "right",
            lineHeight: 1.8,
          }}
        >
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Project:</span>Saral</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Focus:</span>Accessibility</div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "3vw",
          padding: "0 4vw 3vh",
        }}
      >
        {/* Left — stats grid */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65vw",
              color: "#718096",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.5vh",
            }}
          >
            The Reality
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vh" }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: i === 2 ? NAVY : "#fff",
                  border: `1px solid ${i === 2 ? "transparent" : "#E2E8F0"}`,
                  borderRadius: "0.6vw",
                  padding: "1.5vh 1.5vw",
                }}
              >
                <div
                  style={{
                    fontSize: "2.4vw",
                    fontWeight: 800,
                    color: i === 2 ? SAFFRON : SAFFRON,
                    lineHeight: 1,
                    marginBottom: "0.4vh",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.8vw",
                    fontWeight: 600,
                    color: i === 2 ? "#fff" : NAVY,
                    marginBottom: "0.2vh",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "0.65vw",
                    color: i === 2 ? "#94A3B8" : "#718096",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Source */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55vw",
              color: "#A0AEC0",
              marginTop: "0.5vh",
            }}
          >
            Sources: Census of India 2011 · Common Service Centres Report 2022 · NCAER Language Survey
          </div>
        </div>

        {/* Right — language roadmap */}
        <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65vw",
              color: "#718096",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Our Language Roadmap
          </div>

          <div
            style={{
              background: LIGHT_SAFFRON,
              borderRadius: "0.6vw",
              padding: "1.5vh 1.5vw",
              borderLeft: `3px solid ${SAFFRON}`,
            }}
          >
            <div style={{ fontSize: "0.75vw", fontWeight: 700, color: NAVY, marginBottom: "0.5vh" }}>
              🚀 Adding Full Support For
            </div>
            <div style={{ fontSize: "0.65vw", color: "#4A5568", lineHeight: 1.6 }}>
              All AI responses, legal explanations, and document creation will be available in your language — not just translated, but <em>native</em>.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
            {languages.map((l, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "0.5vw",
                  padding: "0.8vh 1.2vw",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                  <span style={{ fontSize: "1.1vw", fontWeight: 700, color: NAVY }}>{l.name}</span>
                  <span style={{ fontSize: "0.65vw", color: "#718096" }}>{l.lang}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65vw",
                      color: SAFFRON,
                      fontWeight: 600,
                    }}
                  >
                    {l.speakers} speakers
                  </span>
                  <span
                    style={{
                      background: SAFFRON,
                      color: "#fff",
                      fontSize: "0.55vw",
                      fontFamily: "'DM Mono', monospace",
                      padding: "0.2vh 0.5vw",
                      borderRadius: "2vw",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5vh 4vw",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6vw",
            color: "#A0AEC0",
          }}
        >
          Language / Saral
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6vw",
            color: "#A0AEC0",
          }}
        >
          न्याय — Justice for All
        </div>
      </div>
    </div>
  );
}
