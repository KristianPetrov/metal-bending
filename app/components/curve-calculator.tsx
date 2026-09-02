"use client";

import { ArrowRight, Check, Clipboard, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { publishCalculatorQuote } from "@/lib/quote-from-calculator";

type Tool = "radius" | "arc" | "layout";
type Unit = "in" | "ft" | "mm" | "cm";

const tools: { id: Tool; number: string; label: string; description: string }[] = [
  { id: "radius", number: "01", label: "Find radius", description: "From opening width + rise" },
  { id: "arc", number: "02", label: "Arc dimensions", description: "From radius + angle" },
  { id: "layout", number: "03", label: "Stud layout", description: "Count + spacing along curve" },
];

const unitLabels: Record<Unit, string> = {
  in: "in",
  ft: "ft",
  mm: "mm",
  cm: "cm",
};

const inchesPerUnit: Record<Unit, number> = {
  in: 1,
  ft: 12,
  mm: 1 / 25.4,
  cm: 1 / 2.54,
};

function toNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function format(value: number, unit?: Unit) {
  if (!Number.isFinite(value)) return "—";
  const precision = value >= 100 ? 1 : value >= 10 ? 2 : 3;
  return `${value.toLocaleString("en-US", { maximumFractionDigits: precision })}${unit ? ` ${unitLabels[unit]}` : ""}`;
}

function Result({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div className={`curve-result ${featured ? "is-featured" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
  hint?: string;
}) {
  return (
    <label className="curve-field">
      <span>{label}</span>
      <span className="curve-input">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <small>{suffix}</small>
      </span>
      {hint && <em>{hint}</em>}
    </label>
  );
}

export default function CurveCalculator() {
  const [tool, setTool] = useState<Tool>("radius");
  const [unit, setUnit] = useState<Unit>("in");
  const [span, setSpan] = useState("120");
  const [rise, setRise] = useState("24");
  const [radius, setRadius] = useState("120");
  const [angle, setAngle] = useState("90");
  const [spacing, setSpacing] = useState("16");
  const [copied, setCopied] = useState(false);

  const geometry = useMemo(() => {
    if (tool === "radius") {
      const chord = toNumber(span);
      const sagitta = toNumber(rise);
      const valid = chord > 0 && sagitta > 0 && sagitta <= chord / 2;
      if (!valid) return { valid: false, radius: 0, chord, rise: sagitta, angle: 0, arc: 0 };
      const calculatedRadius = chord ** 2 / (8 * sagitta) + sagitta / 2;
      const centralAngle = 2 * Math.asin(chord / (2 * calculatedRadius));
      return {
        valid: true,
        radius: calculatedRadius,
        chord,
        rise: sagitta,
        angle: centralAngle * (180 / Math.PI),
        arc: calculatedRadius * centralAngle,
      };
    }

    const enteredRadius = toNumber(radius);
    const enteredAngle = toNumber(angle);
    const valid = enteredRadius > 0 && enteredAngle > 0 && enteredAngle <= 360;
    if (!valid) return { valid: false, radius: enteredRadius, chord: 0, rise: 0, angle: enteredAngle, arc: 0 };
    const radians = enteredAngle * (Math.PI / 180);
    return {
      valid: true,
      radius: enteredRadius,
      chord: 2 * enteredRadius * Math.sin(radians / 2),
      rise: enteredRadius * (1 - Math.cos(radians / 2)),
      angle: enteredAngle,
      arc: enteredRadius * radians,
    };
  }, [angle, radius, rise, span, tool]);

  const layout = useMemo(() => {
    const targetSpacing = toNumber(spacing);
    if (!geometry.valid || targetSpacing <= 0) return { bays: 0, studs: 0, actualSpacing: 0 };
    const bays = Math.max(1, Math.ceil(geometry.arc / targetSpacing));
    return { bays, studs: bays + 1, actualSpacing: geometry.arc / bays };
  }, [geometry, spacing]);

  const visualRise = geometry.valid && geometry.chord > 0
    ? Math.min(105, Math.max(18, (geometry.rise / geometry.chord) * 210))
    : 42;

  const toolLabel = tools.find((item) => item.id === tool)?.label ?? "Curve geometry";
  const formattedRadius = format(geometry.radius, unit);

  const summary = tool === "layout"
    ? `Curved framing layout: ${formattedRadius} radius, ${format(geometry.angle)}°, ${format(geometry.arc, unit)} arc length, ${layout.studs} studs at ${format(layout.actualSpacing, unit)} on center.`
    : `Curve geometry: ${formattedRadius} radius, ${format(geometry.chord, unit)} chord, ${format(geometry.rise, unit)} rise, ${format(geometry.angle)}° included angle, ${format(geometry.arc, unit)} arc length.`;

  const quoteNotes = [
    `From the curve calculator (${toolLabel}):`,
    `Centerline radius: ${formattedRadius}`,
    tool === "radius" ? `Opening width / chord: ${format(geometry.chord, unit)}` : `Included angle: ${format(geometry.angle)}°`,
    tool === "radius" ? `Rise at center: ${format(geometry.rise, unit)}` : `Chord: ${format(geometry.chord, unit)}`,
    tool === "radius" ? `Included angle: ${format(geometry.angle)}°` : `Rise: ${format(geometry.rise, unit)}`,
    `Arc length: ${format(geometry.arc, unit)}`,
    ...(tool === "layout"
      ? [
          `Studs / marks: ${layout.studs}`,
          `Actual spacing: ${format(layout.actualSpacing, unit)} on center`,
          `Maximum O.C. spacing: ${format(toNumber(spacing), unit)}`,
        ]
      : []),
  ].join("\n");

  function useInQuote() {
    if (!geometry.valid) return;
    publishCalculatorQuote({
      radius: formattedRadius,
      notes: quoteNotes,
    });
  }

  async function copySummary() {
    if (!geometry.valid) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function changeUnit(nextUnit: Unit) {
    if (nextUnit === unit) return;
    const convert = (value: string) => {
      const number = Number(value);
      if (!Number.isFinite(number)) return value;
      const converted = (number * inchesPerUnit[unit]) / inchesPerUnit[nextUnit];
      return String(Number(converted.toPrecision(8)));
    };
    setSpan(convert);
    setRise(convert);
    setRadius(convert);
    setSpacing(convert);
    setUnit(nextUnit);
  }

  function reset() {
    setSpan("120");
    setRise("24");
    setRadius("120");
    setAngle("90");
    setSpacing("16");
  }

  return (
    <div className="curve-calculator">
      <div className="curve-tool-tabs" role="tablist" aria-label="Curve calculators">
        {tools.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tool === item.id}
            className={tool === item.id ? "is-active" : ""}
            onClick={() => setTool(item.id)}
          >
            <span>{item.number}</span>
            <strong>{item.label}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      <div className="curve-workspace">
        <div className="curve-controls">
          <div className="curve-control-header">
            <div>
              <p>Input dimensions</p>
              <h3>{tools.find((item) => item.id === tool)?.label}</h3>
            </div>
            <div className="unit-picker" aria-label="Measurement unit">
              {(Object.keys(unitLabels) as Unit[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={unit === item ? "is-active" : ""}
                  aria-pressed={unit === item}
                  onClick={() => changeUnit(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {tool === "radius" ? (
            <>
              <div className="curve-fields">
                <NumberField label="Opening width / chord" value={span} onChange={setSpan} suffix={unitLabels[unit]} />
                <NumberField
                  label="Rise at center"
                  value={rise}
                  onChange={setRise}
                  suffix={unitLabels[unit]}
                  hint="Measure perpendicular to the chord"
                />
              </div>
              <div className="curve-presets">
                <span>Quick set</span>
                <button type="button" onClick={() => { setSpan("120"); setRise("24"); }}>10 × 2</button>
                <button type="button" onClick={() => { setSpan("96"); setRise("48"); }}>Half circle</button>
              </div>
            </>
          ) : (
            <div className="curve-fields">
              <NumberField label="Centerline radius" value={radius} onChange={setRadius} suffix={unitLabels[unit]} />
              <NumberField label="Included angle" value={angle} onChange={setAngle} suffix="degrees" />
              {tool === "layout" && (
                <NumberField
                  label="Maximum O.C. spacing"
                  value={spacing}
                  onChange={setSpacing}
                  suffix={unitLabels[unit]}
                  hint="Layout rounds down to stay within maximum"
                />
              )}
            </div>
          )}

          {!geometry.valid && (
            <p className="curve-warning" role="alert">
              {tool === "radius"
                ? "Enter a rise greater than zero and no more than half the opening width."
                : "Enter a radius and an angle between 0° and 360°."}
            </p>
          )}

          <button type="button" className="curve-reset" onClick={reset}>
            <RotateCcw size={14} aria-hidden="true" /> Reset example
          </button>
        </div>

        <div className="curve-output">
          <div className="curve-diagram" aria-hidden="true">
            <svg viewBox="0 0 360 190" role="img">
              <path className="diagram-grid" d="M30 30V165M105 30V165M180 30V165M255 30V165M330 30V165M20 65H340M20 115H340M20 165H340" />
              <path className="diagram-curve" d={`M30 155 Q180 ${155 - visualRise * 2} 330 155`} />
              <path className="diagram-chord" d="M30 155H330" />
              <path className="diagram-rise" d={`M180 155V${155 - visualRise}`} />
              <circle cx="30" cy="155" r="4" />
              <circle cx="330" cy="155" r="4" />
              <text x="180" y="181" textAnchor="middle">CHORD / {geometry.valid ? format(geometry.chord, unit) : "—"}</text>
              <text x="189" y={145 - visualRise} textAnchor="start">RISE</text>
            </svg>
            <span>Centerline geometry · not to scale</span>
          </div>

          <div className="curve-results" aria-live="polite">
            <Result label="Centerline radius" value={geometry.valid ? format(geometry.radius, unit) : "—"} featured />
            {tool === "layout" ? (
              <>
                <Result label="Arc length" value={geometry.valid ? format(geometry.arc, unit) : "—"} />
                <Result label="Studs / marks" value={geometry.valid ? String(layout.studs) : "—"} />
                <Result label="Actual spacing" value={geometry.valid ? format(layout.actualSpacing, unit) : "—"} />
              </>
            ) : (
              <>
                <Result label="Arc length" value={geometry.valid ? format(geometry.arc, unit) : "—"} />
                <Result label="Included angle" value={geometry.valid ? `${format(geometry.angle)}°` : "—"} />
                <Result label={tool === "radius" ? "Rise" : "Chord"} value={geometry.valid ? format(tool === "radius" ? geometry.rise : geometry.chord, unit) : "—"} />
              </>
            )}
          </div>

          <div className="curve-output-actions">
            <button type="button" onClick={copySummary} disabled={!geometry.valid}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Clipboard size={15} aria-hidden="true" />}
              {copied ? "Copied" : "Copy dimensions"}
            </button>
            <a
              href="#quote"
              aria-disabled={!geometry.valid}
              className={!geometry.valid ? "is-disabled" : ""}
              onClick={(event) => {
                if (!geometry.valid) {
                  event.preventDefault();
                  return;
                }
                useInQuote();
              }}
            >
              Use in a quote <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <p className="curve-disclaimer">
        Planning aid only. Use centerline dimensions and confirm profile, material, tolerances, and bend direction with our forming team.
      </p>
    </div>
  );
}
