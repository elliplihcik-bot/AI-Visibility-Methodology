import { useState } from "react";

const ORANGE = "#E8500A";
const ORANGE_LIGHT = "#FEF0E9";
const ORANGE_MID = "#F47B3F";
const DARK = "#1A1A1A";
const MID = "#4A4A4A";
const LIGHT = "#8A8A8A";
const BORDER = "#E8E2D9";
const BG = "#FAF8F5";
const WHITE = "#FFFFFF";
const GREEN = "#1A7A4A";
const RED = "#C0392B";

const sections = [
  { id: "summary", label: "Executive Summary", num: "00" },
  { id: "audit", label: "Visibility Audit", num: "01" },
  { id: "keywords", label: "Keyword Opportunity", num: "02" },
  { id: "ai", label: "AI Visibility Gap", num: "03" },
  { id: "authority", label: "Authority Signal Gap", num: "04" },
  { id: "competitive", label: "Competitive Landscape", num: "05" },
  { id: "methodology", label: "The Methodology", num: "06" },
  { id: "roadmap", label: "Recommended Roadmap", num: "07" },
  { id: "cta", label: "Next Step", num: "08" },
];

const auditData = [
  { layer: "Findability", metric: "1,900 visitors/month", finding: "Nearly invisible to buyers who don't already know the Chem-Trend name", grade: "F", color: RED },
  { layer: "Keyword Territory", metric: "0 presence for buyer-intent terms", finding: "Competitors own the industrial category language. 34,690 searches/month uncaptured.", grade: "F", color: RED },
  { layer: "Authority Signals", metric: "0 of 33 trade publications", finding: "No backlinks from the publications industrial buyers read and trust", grade: "F", color: RED },
  { layer: "AI Visibility", metric: "107 AI Overviews firing", finding: "Google's AI is answering questions in Chem-Trend's core categories — without citing Chem-Trend", grade: "?", color: "#E67E22" },
];

const keywordData = [
  { category: "Release Agent (broad)", keywords: 1028, volume: 26350, ai: 78, avgKD: "~5" },
  { category: "Mold Release Agent", keywords: 118, volume: 4020, ai: 16, avgKD: "~5" },
  { category: "Purging Compound", keywords: 149, volume: 3850, ai: 10, avgKD: "~8" },
  { category: "Die Casting Lubricant", keywords: 10, volume: 250, ai: 1, avgKD: "~0" },
  { category: "Composites Release Agent", keywords: 7, volume: 220, ai: 2, avgKD: "~0" },
];

const aiTerms = [
  { term: "mold release agent", volume: 390, kd: 9 },
  { term: "silicone mold release agent", volume: 260, kd: 6 },
  { term: "mold release agents", volume: 210, kd: 17 },
  { term: "composite mold release agents", volume: 70, kd: 0 },
  { term: "mold release agent for injection molding", volume: 70, kd: 4 },
  { term: "semi permanent mold release agent", volume: 50, kd: 3 },
  { term: "release agent", volume: 390, kd: 2 },
  { term: "concrete release agent", volume: 1000, kd: 12 },
  { term: "industrial release agents", volume: 110, kd: 8 },
  { term: "purging compound", volume: 260, kd: 11 },
  { term: "purging compounds", volume: 170, kd: 15 },
  { term: "die casting lubricants", volume: 40, kd: 0 },
];

const authorityGaps = [
  { pub: "Modern Machine Shop", domain: "mmsonline.com", as: 34, qh: 391, ct: 0 },
  { pub: "Wire Association International", domain: "wirenet.org", as: 27, qh: 63, ct: 0 },
  { pub: "Gear Solutions", domain: "gearsolutions.com", as: 32, qh: 110, ct: 0 },
  { pub: "Finishing & Coating", domain: "finishingandcoating.com", as: 27, qh: 29, ct: 0 },
  { pub: "Fabricating & Metalworking", domain: "fabricatingandmetalworking.com", as: 25, qh: 27, ct: 0 },
  { pub: "Products Finishing Magazine", domain: "pfonline.com", as: 32, qh: 5, ct: 0 },
  { pub: "Machine Design Magazine", domain: "machinedesign.com", as: 43, qh: 2, ct: 0 },
  { pub: "AIChE", domain: "aiche.org", as: 48, qh: 5, ct: 0 },
  { pub: "AIST", domain: "aist.org", as: 34, qh: 13, ct: 0 },
  { pub: "Manufacturing Dive", domain: "manufacturingdive.com", as: 41, qh: 1, ct: 0 },
  { pub: "Additive Manufacturing Media", domain: "additivemanufacturing.media", as: 36, qh: 1, ct: 0 },
  { pub: "Fluid Power Journal", domain: "fluidpowerjournal.com", as: 31, qh: 12, ct: 0 },
];

const competitors = [
  { name: "Chem-Trend", keywords: "1.3K", traffic: "1.9K", value: "$1.1K", branded: "73%", highlight: true },
  { name: "Quaker Houghton", keywords: "~15K+", traffic: "Est. high", value: "Est. high", branded: "Est. low" },
  { name: "Henkel Adhesives", keywords: "~10K+", traffic: "Est. high", value: "Est. high", branded: "Est. low" },
  { name: "Asaclean", keywords: "616", traffic: "Est. med", value: "Est. med", branded: "Est. mixed" },
  { name: "Slideproducts", keywords: "1.6K", traffic: "Est. med", value: "Est. med", branded: "Est. mixed" },
];

const methodologyLayers = [
  {
    num: "01",
    title: "Findability Audit",
    subtitle: "Are you present when buyers are researching?",
    desc: "Baseline measurement of organic search footprint — keyword coverage, traffic volume, branded vs. non-branded split, domain authority, and competitive position. Establishes where you stand today.",
    tools: ["SEMrush Domain Overview", "Organic Research", "Competitive Position Map"],
    color: ORANGE,
  },
  {
    num: "02",
    title: "Keyword Territory Mapping",
    subtitle: "Do you own the language of your category?",
    desc: "Identification of the full keyword universe buyers use when researching solutions. Cross-referenced against current rankings to surface uncaptured opportunity by product category, application, and buyer intent.",
    tools: ["Keyword Magic Tool", "Keyword Gap Analysis", "Intent Classification"],
    color: "#2980B9",
  },
  {
    num: "03",
    title: "Authority Signal Assessment",
    subtitle: "Do third parties validate your expertise?",
    desc: "Audit of backlink profile quality against industry trade publications, associations, research databases, and peer domains. Identifies where competitors earn credibility that you don't.",
    tools: ["Backlink Gap Analysis", "Referring Domain Quality Score", "Trade Publication Index"],
    color: GREEN,
  },
  {
    num: "04",
    title: "AI Discoverability Analysis",
    subtitle: "When buyers use AI to research, do you exist?",
    desc: "Assessment of content structure, schema markup, entity clarity, and citation readiness for AI answer engines — Google AI Overviews, ChatGPT, Perplexity, and Claude. The emerging frontier where industrial first-movers win.",
    tools: ["AI Overview Presence Scan", "Schema Markup Audit", "Entity & Citation Analysis"],
    color: "#8E44AD",
  },
];

const roadmapPhases = [
  {
    phase: "Crawl",
    title: "Foundation & Diagnosis",
    duration: "4–6 weeks",
    price: "TBD",
    items: [
      "Full four-layer AI Visibility Audit",
      "Priority keyword universe by product category",
      "Top 10 trade publication outreach targets",
      "AI Overview gap report — which questions need answers",
      "Content architecture recommendation",
      "KPI baseline & measurement framework",
    ],
    color: ORANGE,
  },
  {
    phase: "Walk",
    title: "Content & Authority Build",
    duration: "8–12 weeks",
    price: "TBD",
    items: [
      "Application-specific content program launch",
      "Glossary hub expansion — DSPM-style for key categories",
      "Schema markup implementation for AI citation eligibility",
      "Trade publication outreach & placement program",
      "AI answer engine optimization for top 20 queries",
      "Weekly performance reporting cadence",
    ],
    color: "#2980B9",
  },
  {
    phase: "Run",
    title: "Scale & Optimization",
    duration: "Ongoing quarterly",
    price: "TBD",
    items: [
      "Category authority expansion into new verticals",
      "AI citation tracking & optimization",
      "Competitive displacement reporting",
      "Executive scorecard — pipeline influence metrics",
      "Play library by segment and intent tier",
      "Annual visibility benchmark vs. competitors",
    ],
    color: GREEN,
  },
];

export default function App() {
  const [active, setActive] = useState("summary");

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-btn { cursor: pointer; transition: all 0.15s; }
        .nav-btn:hover { color: ${ORANGE} !important; }
        .nav-btn.active { color: ${ORANGE} !important; background: ${ORANGE_LIGHT}; border-radius: 6px; }
        .card-hover { transition: box-shadow 0.2s, transform 0.2s; }
        .card-hover:hover { box-shadow: 0 4px 20px rgba(232,80,10,0.12); transform: translateY(-1px); }
        .row-hover:hover { background: ${ORANGE_LIGHT} !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 2px; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: ORANGE, padding: "7px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: WHITE, textTransform: "uppercase" }}>
          Confidential — Prepared for Chem-Trend
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.05em" }}>
          March 2026
        </span>
      </div>

      {/* Header */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "40px 40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: "580px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: ORANGE, textTransform: "uppercase", fontWeight: 600, marginBottom: "14px" }}>
              AI Visibility Methodology
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: DARK, lineHeight: 1.15, marginBottom: "12px" }}>
              The Invisible Expert:<br />
              <em style={{ color: ORANGE }}>Chem-Trend's AI Visibility Gap</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: MID, lineHeight: 1.7, fontWeight: 300 }}>
              A data-driven diagnostic of Chem-Trend's digital authority, search presence, and AI discoverability — and the opportunity to become the definitive technical voice in specialty process chemistry.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: "28px" }}>
              {[["Client", "Chem-Trend"], ["Prepared by", "Demand Spring"], ["Phase", "Discovery"]].map(([label, val]) => (
                <div key={label} style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: LIGHT, textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: DARK, fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: BORDER, width: "100%" }} />
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LIGHT }}>
              demand<span style={{ color: ORANGE, fontWeight: 700 }}>◈</span>spring + chem-trend
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: "210px", flexShrink: 0, background: WHITE, borderRight: `1px solid ${BORDER}`, padding: "28px 0", position: "sticky", top: 0, height: "calc(100vh - 120px)", overflowY: "auto" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: LIGHT, textTransform: "uppercase", padding: "0 20px 14px", fontWeight: 500 }}>Sections</div>
          {sections.map(s => (
            <div key={s.id} className={`nav-btn ${active === s.id ? "active" : ""}`} onClick={() => setActive(s.id)}
              style={{ padding: "9px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: active === s.id ? ORANGE : MID, display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "10px", color: active === s.id ? ORANGE : BORDER, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{s.num}</span>
              {s.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "48px 56px", overflowY: "auto", maxWidth: "920px" }}>

          {/* EXECUTIVE SUMMARY */}
          {active === "summary" && (
            <Section title="Executive Summary" subtitle="The core finding in plain language">
              <p style={body}>
                Chem-Trend is a 60-year global leader in specialty process chemistry — release agents, purging compounds, and die casting lubricants used by the world's most demanding manufacturers. The company's technical expertise is genuine, deep, and hard-won. Its digital presence is not.
              </p>
              <p style={{ ...body, marginTop: "16px" }}>
                This analysis reveals a striking disconnect: a category-defining company that the internet has largely never heard of. Buyers who don't already know the Chem-Trend name — which is every new prospect — cannot find them. And as B2B buyers increasingly use AI tools to research solutions, Chem-Trend is absent from the answers those tools provide.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", margin: "36px 0" }}>
                {[
                  ["1,900", "Monthly visitors", RED],
                  ["73%", "Branded traffic", RED],
                  ["505", "Non-branded visitors/mo", RED],
                  ["34,690", "Uncaptured searches/mo", ORANGE],
                ].map(([val, label, color]) => (
                  <div key={label} className="card-hover" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${color}`, borderRadius: "8px", padding: "22px 18px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", color, marginBottom: "6px" }}>{val}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: LIGHT, lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>

              <Callout color={ORANGE_LIGHT} border={ORANGE}>
                <strong style={{ color: ORANGE }}>The opportunity in one sentence:</strong> There are 34,690 searches per month across Chem-Trend's core product categories in the US alone — with keyword difficulty scores near zero and 107 AI Overviews already firing — and Chem-Trend is capturing fewer than 505 of them.
              </Callout>

              <p style={{ ...body, marginTop: "24px" }}>
                The good news: this is fixable, and the competitive window is open. Most of Chem-Trend's direct competitors are equally invisible. The industrial company that builds technical content authority first — in search, in trade publications, and in AI answer engines — will own this category for years.
              </p>
            </Section>
          )}

          {/* VISIBILITY AUDIT */}
          {active === "audit" && (
            <Section title="Visibility Audit" subtitle="Four diagnostic layers — current state assessment">
              <p style={body}>We evaluated Chem-Trend's digital presence across four layers of the AI Visibility Methodology. Each layer tells the same story.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>
                {auditData.map(row => (
                  <div key={row.layer} className="card-hover" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden", display: "flex" }}>
                    <div style={{ width: "6px", background: row.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, padding: "20px 24px", display: "grid", gridTemplateColumns: "160px 1fr 60px", gap: "16px", alignItems: "center" }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: LIGHT, textTransform: "uppercase", marginBottom: "4px" }}>Layer</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: DARK }}>{row.layer}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: row.color, fontWeight: 600, marginTop: "4px" }}>{row.metric}</div>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: MID, lineHeight: 1.6 }}>{row.finding}</div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: row.color, fontWeight: 400 }}>{row.grade}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "24px" }}>
                  <Label color={RED}>Critical Finding</Label>
                  <p style={{ ...body, marginTop: "10px", fontSize: "13px" }}>Non-branded traffic is only 505 visitors/month — and declining 8%. The small sliver of non-branded visibility Chem-Trend has is shrinking. They are moving in the wrong direction.</p>
                </div>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "24px" }}>
                  <Label color={ORANGE}>Content Gap</Label>
                  <p style={{ ...body, marginTop: "10px", fontSize: "13px" }}>61.7% of keywords are informational but attracting DIY hobbyists — "how long for polyurethane to dry," "paint fish eyes" — not process engineers or procurement managers.</p>
                </div>
              </div>
            </Section>
          )}

          {/* KEYWORD OPPORTUNITY */}
          {active === "keywords" && (
            <Section title="Keyword Opportunity" subtitle="The search universe Chem-Trend is invisible for">
              <p style={body}>Across five core product categories, there are 34,690 industrial searches per month in the US market alone. Chem-Trend captures fewer than 505 of them — less than 1.5%. Keyword difficulty scores across this entire universe average below 8 out of 100, meaning a focused content program can start capturing rankings within 90 days.</p>

              <div style={{ marginTop: "32px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: DARK, padding: "14px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1fr 1fr" }}>
                  {["Product Category", "Keywords", "Monthly Volume", "AI Overviews", "Avg KD"].map(h => (
                    <div key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{h}</div>
                  ))}
                </div>
                {keywordData.map((row, i) => (
                  <div key={row.category} className="row-hover" style={{ padding: "14px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1fr 1fr", borderBottom: i < keywordData.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: DARK, fontWeight: 500 }}>{row.category}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: MID }}>{row.keywords.toLocaleString()}</div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: ORANGE }}>{row.volume.toLocaleString()}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8E44AD", fontWeight: 600 }}>{row.ai}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GREEN, fontWeight: 600 }}>{row.avgKD}</div>
                  </div>
                ))}
                <div style={{ padding: "14px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1fr 1fr", background: ORANGE_LIGHT, borderTop: `2px solid ${ORANGE}`, alignItems: "center" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: ORANGE, fontWeight: 700 }}>Total Opportunity</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: ORANGE, fontWeight: 700 }}>1,312</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: ORANGE, fontWeight: 400 }}>34,690</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8E44AD", fontWeight: 700 }}>107</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GREEN, fontWeight: 700 }}>~4</div>
                </div>
              </div>

              <Callout color={ORANGE_LIGHT} border={ORANGE} mt="32px">
                <strong style={{ color: ORANGE }}>The gap: </strong>34,690 searches/month available. 505 non-branded visitors captured. That's a 98.5% visibility gap in Chem-Trend's own product categories — in one country, for search alone, before accounting for AI.
              </Callout>

              <div style={{ marginTop: "28px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "24px" }}>
                <Label color={"#2980B9"}>Why Low Volume Categories Matter Most</Label>
                <p style={{ ...body, marginTop: "10px", fontSize: "13px" }}>Die casting lubricant (250/mo) and composites release agent (220/mo) have tiny search volumes — but these represent Chem-Trend's highest-value industrial verticals. Low search volume in a specialized category doesn't mean buyers aren't researching. It means they're researching in AI tools, trade publications, and peer networks instead. This is exactly why the AI visibility layer matters most for industrial companies.</p>
              </div>
            </Section>
          )}

          {/* AI VISIBILITY GAP */}
          {active === "ai" && (
            <Section title="AI Visibility Gap" subtitle="107 AI Overviews firing — without Chem-Trend">
              <p style={body}>Google's AI Overviews are already answering questions across Chem-Trend's core product categories. When a process engineer searches for "mold release agent for injection molding" or a procurement manager asks about "industrial release agents," Google generates an AI answer at the top of the page — drawing from structured, authoritative sources. Chem-Trend, the world's leading release agent company, is almost certainly not among them.</p>

              <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "24px" }}>
                  <Label color={"#2980B9"}>Traditional SEO</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px", marginBottom: "14px" }}>Optimizing for search engine result pages. Measured by keyword rankings, organic traffic, click-through rates. Established discipline with known best practices.</p>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: RED, fontWeight: 600 }}>✗ Chem-Trend: weak — 1,259 keywords, 73% branded</div>
                </div>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `2px solid #8E44AD`, borderRadius: "8px", padding: "24px" }}>
                  <Label color={"#8E44AD"}>Answer Engine Optimization (AEO)</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px", marginBottom: "14px" }}>Optimizing for AI-generated answers and citations in ChatGPT, Perplexity, Google AI Overviews, and Claude. First-movers in industrial AEO gain outsized, durable advantage.</p>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#E67E22", fontWeight: 600 }}>⚠ Chem-Trend: unknown — no baseline established</div>
                </div>
              </div>

              <div style={{ marginTop: "32px" }}>
                <Label color={"#8E44AD"}>Keywords Already Triggering AI Overviews</Label>
                <p style={{ ...body, fontSize: "13px", marginTop: "8px", marginBottom: "16px" }}>These are active AI Overview keywords in Chem-Trend's categories today — questions Google's AI is answering right now, sourced from whoever has the most structured, authoritative content.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {aiTerms.map(item => (
                    <div key={item.term} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "6px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: DARK }}>{item.term}</div>
                      <div style={{ display: "flex", gap: "12px", flexShrink: 0, marginLeft: "12px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LIGHT }}>{item.volume}/mo</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: GREEN, fontWeight: 600 }}>KD:{item.kd}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Callout color={"#F3EBF8"} border={"#8E44AD"} mt="28px">
                <strong style={{ color: "#8E44AD" }}>The AEO window is open now.</strong> Industrial companies have barely begun optimizing for AI answer engines. The company that structures its technical expertise for AI citation first will be extraordinarily difficult to displace — AI systems develop source preferences that compound over time.
              </Callout>
            </Section>
          )}

          {/* AUTHORITY SIGNAL GAP */}
          {active === "authority" && (
            <Section title="Authority Signal Gap" subtitle="Where competitors are cited — and Chem-Trend isn't">
              <p style={body}>Backlink quality from industry trade publications is one of the strongest signals of technical authority — for both search engines and AI systems. Our backlink gap analysis identified 33 industrial trade publications, associations, and technical databases where Chem-Trend's competitors earn citations. Chem-Trend has zero presence in all of them.</p>

              <div style={{ marginTop: "28px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: DARK, padding: "12px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
                  {["Publication / Authority", "Auth. Score", "Quaker Houghton", "Chem-Trend"].map(h => (
                    <div key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{h}</div>
                  ))}
                </div>
                {authorityGaps.map((row, i) => (
                  <div key={row.pub} className="row-hover" style={{ padding: "12px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: i < authorityGaps.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: DARK, fontWeight: 500 }}>{row.pub}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LIGHT }}>{row.domain}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: MID }}>{row.as}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GREEN, fontWeight: 600 }}>{row.qh} links</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: RED, fontWeight: 700 }}>0</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "22px" }}>
                  <Label color={RED}>The Backlink Quality Problem</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px" }}>Chem-Trend has 73,800 total backlinks — but 65% are nofollow and 71% are image links, which carry minimal SEO authority. The largest referring domain is a plastics news directory with 33,178 links — a directory, not editorial coverage. Volume without quality doesn't build authority.</p>
                </div>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "22px" }}>
                  <Label color={GREEN}>One Bright Spot</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px" }}>CompositesWorld.com provides 13,909 backlinks — a genuine, high-quality trade publication with real editorial authority. This is the model. The opportunity is to replicate this relationship across a dozen more industry publications in die casting, rubber, plastics processing, and automotive manufacturing.</p>
                </div>
              </div>
            </Section>
          )}

          {/* COMPETITIVE LANDSCAPE */}
          {active === "competitive" && (
            <Section title="Competitive Landscape" subtitle="Where Chem-Trend stands relative to key competitors">
              <p style={body}>The keyword gap analysis reveals something important: Chem-Trend and its strategic competitors are operating in almost entirely different digital universes. The overlap between chemtrend.com and quakerhoughton.com is so minimal that SEMrush returned no data for missing or weak keyword comparisons — the gap is that complete.</p>

              <div style={{ marginTop: "32px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: DARK, padding: "14px 24px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr" }}>
                  {["Company", "Organic Keywords", "Monthly Traffic", "Traffic Value", "Branded %"].map(h => (
                    <div key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{h}</div>
                  ))}
                </div>
                {competitors.map((row, i) => (
                  <div key={row.name} className="row-hover" style={{ padding: "14px 24px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", borderBottom: i < competitors.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center", background: row.highlight ? ORANGE_LIGHT : "transparent" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: row.highlight ? ORANGE : DARK, fontWeight: row.highlight ? 700 : 400 }}>{row.name}</div>
                    {[row.keywords, row.traffic, row.value, row.branded].map((val, j) => (
                      <div key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: row.highlight ? ORANGE : MID }}>{val}</div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "22px" }}>
                  <Label color={ORANGE}>The Opportunity</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px" }}>Unlike Veeam's SEO situation — where the challenge was redirecting existing authority — Chem-Trend is starting from a low base in a category where no competitor has built dominant digital authority. The playing field is genuinely level. The first industrial process chemistry company to build a serious content and AEO program will own this space.</p>
                </div>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "22px" }}>
                  <Label color={RED}>The Risk</Label>
                  <p style={{ ...body, fontSize: "13px", marginTop: "10px" }}>Quaker Houghton already has 391 backlinks from Modern Machine Shop, 63 from Wire Association International, and 110 from Gear Solutions. They are building authority infrastructure quietly. If Chem-Trend waits another 12–18 months, the gap becomes significantly harder and more expensive to close.</p>
                </div>
              </div>
            </Section>
          )}

          {/* METHODOLOGY */}
          {active === "methodology" && (
            <Section title="The AI Visibility Methodology" subtitle="A four-layer diagnostic framework for industrial B2B companies">
              <p style={body}>The AI Visibility Methodology is Demand Spring's proprietary framework for diagnosing and closing the gap between an industrial company's actual technical expertise and its digital visibility. It was developed specifically for companies like Chem-Trend — deep technical leaders who are invisible to the modern B2B buyer.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "32px" }}>
                {methodologyLayers.map(layer => (
                  <div key={layer.num} className="card-hover" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", minHeight: "120px" }}>
                      <div style={{ background: layer.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: WHITE, opacity: 0.9 }}>{layer.num}</span>
                      </div>
                      <div style={{ padding: "22px 24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div>
                            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: DARK, marginBottom: "2px" }}>{layer.title}</h3>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: layer.color, fontStyle: "italic" }}>{layer.subtitle}</div>
                          </div>
                        </div>
                        <p style={{ ...body, fontSize: "13px", marginBottom: "14px" }}>{layer.desc}</p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {layer.tools.map(t => (
                            <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", background: BG, border: `1px solid ${BORDER}`, borderRadius: "4px", padding: "3px 8px", color: MID }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Callout color={ORANGE_LIGHT} border={ORANGE} mt="32px">
                <strong style={{ color: ORANGE }}>Why industrial companies specifically:</strong> Industrial B2B buyers research differently from software buyers — lower search volumes, higher specialization, greater reliance on trade publications and peer networks, and rapidly growing use of AI tools for technical research. A methodology built for SaaS companies will miss the most important channels for industrial buyers.
              </Callout>
            </Section>
          )}

          {/* ROADMAP */}
          {active === "roadmap" && (
            <Section title="Recommended Roadmap" subtitle="Crawl → Walk → Run: closing the visibility gap">
              <p style={body}>Based on the four-layer diagnostic, we recommend a phased approach that builds durable technical authority rather than chasing quick wins. Each phase builds on the last, creating compounding visibility that becomes increasingly difficult for competitors to displace.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "32px" }}>
                {roadmapPhases.map(phase => (
                  <div key={phase.phase} className="card-hover" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${phase.color}`, borderRadius: "8px", padding: "24px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: phase.color, textTransform: "uppercase", fontWeight: 700, marginBottom: "6px" }}>{phase.phase}</div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "17px", color: DARK, marginBottom: "4px" }}>{phase.title}</h3>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: LIGHT, marginBottom: "18px" }}>{phase.duration}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {phase.items.map(item => (
                        <div key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: phase.color, fontSize: "8px", marginTop: "5px", flexShrink: 0 }}>◆</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: MID, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "28px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "24px" }}>
                <Label color={ORANGE}>Why Start with the Crawl Phase</Label>
                <p style={{ ...body, fontSize: "13px", marginTop: "10px" }}>The Crawl phase is designed to be completed in 4–6 weeks with a fixed scope and clear deliverables. It gives Chem-Trend a complete, data-driven picture of the full opportunity before committing to a larger program — and gives both teams a working relationship and shared vocabulary before scaling. It's the lowest-risk, highest-insight entry point.</p>
              </div>
            </Section>
          )}

          {/* CTA */}
          {active === "cta" && (
            <Section title="Next Step" subtitle="Schedule an AI Visibility Strategy Session">
              <p style={body}>The data is clear. Chem-Trend has deep, genuine technical authority in specialty process chemistry — and almost no one outside their existing customer base knows it. That's a problem with a solution, and the competitive window to act is open now.</p>

              <div style={{ marginTop: "36px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ background: DARK, padding: "32px 40px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: ORANGE, textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>What We'll Cover</div>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", color: WHITE, fontWeight: 400, lineHeight: 1.3 }}>AI Visibility Strategy Session<br /><em style={{ color: ORANGE }}>45 minutes. No obligation. All data on the table.</em></h2>
                </div>
                <div style={{ padding: "32px 40px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                    {[
                      "Walk through the full four-layer diagnostic with your team",
                      "Identify the highest-priority keyword territories to capture first",
                      "Map which trade publications to target for authority signals",
                      "Define what AI visibility success looks like for Chem-Trend",
                      "Review the Crawl phase scope and timeline in detail",
                      "Answer any questions about methodology, tools, or approach",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: ORANGE, fontSize: "10px", marginTop: "4px", flexShrink: 0 }}>◆</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: MID, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: "center", padding: "24px", background: ORANGE_LIGHT, borderRadius: "8px" }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: DARK, marginBottom: "8px" }}>Ready to close the visibility gap?</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: MID, marginBottom: "24px" }}>Let's build the strategy together.</div>
                    <div style={{ display: "inline-block", background: ORANGE, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, padding: "14px 36px", borderRadius: "6px", letterSpacing: "0.05em" }}>
                      Schedule an AI Visibility Strategy Session →
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: LIGHT, marginTop: "16px" }}>
                      Contact Demand Spring · demandspring.com
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[["34,690", "Searches/month uncaptured"], ["107", "AI Overviews firing without you"], ["33", "Trade publications citing competitors, not you"]].map(([num, label]) => (
                  <div key={label} style={{ textAlign: "center", padding: "24px", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "8px" }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", color: ORANGE, marginBottom: "6px" }}>{num}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: LIGHT, lineHeight: 1.5 }}>{label}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "14px 40px", display: "flex", justifyContent: "space-between", background: WHITE }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LIGHT }}>demand◈spring + chem-trend · AI Visibility Methodology · Confidential</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LIGHT }}>March 2026 · demandspring.com</span>
      </div>
    </div>
  );
}

// ---- Shared components ----
const body = { fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#4A4A4A", lineHeight: 1.75, fontWeight: 300 };

function Section({ title, subtitle, children }) {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "30px", fontWeight: 400, color: DARK, marginBottom: "6px" }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: LIGHT }}>{subtitle}</p>}
        <div style={{ height: "2px", background: `linear-gradient(to right, ${ORANGE}, transparent)`, marginTop: "14px", width: "60px" }} />
      </div>
      {children}
    </div>
  );
}

function Label({ children, color }) {
  return <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.12em", color, textTransform: "uppercase", fontWeight: 700 }}>{children}</div>;
}

function Callout({ children, color, border, mt = "24px" }) {
  return (
    <div style={{ background: color, borderLeft: `3px solid ${border}`, borderRadius: "6px", padding: "18px 22px", marginTop: mt }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: MID, lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}
