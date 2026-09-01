"use client";

import { useMemo, useState } from "react";

type Unit = "Inches" | "Feet" | "Yards";

const toInches: Record<Unit, number> = {
  Inches: 1,
  Feet: 12,
  Yards: 36,
};

function convert(value: number, from: Unit, to: Unit) {
  return (value * toInches[from]) / toInches[to];
}

function format(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return value >= 100 ? value.toFixed(2) : value.toFixed(3);
}

export default function RadiusTool() {
  const [height, setHeight] = useState("8");
  const [width, setWidth] = useState("48");
  const [heightUnit, setHeightUnit] = useState<Unit>("Inches");
  const [widthUnit, setWidthUnit] = useState<Unit>("Inches");
  const [outUnit, setOutUnit] = useState<Unit>("Inches");

  const result = useMemo(() => {
    const rise = Number(height);
    const chord = Number(width);
    if (!(rise > 0) || !(chord > 0) || rise * 2 >= convert(chord, widthUnit, heightUnit)) {
      return null;
    }

    const riseIn = convert(rise, heightUnit, "Inches");
    const chordIn = convert(chord, widthUnit, "Inches");
    const radiusIn = chordIn ** 2 / (8 * riseIn) + riseIn / 2;
    const halfChord = chordIn / 2;
    const included = 2 * Math.atan2(halfChord, radiusIn - riseIn);
    const arcIn = radiusIn * included;

    return {
      radius: convert(radiusIn, "Inches", outUnit),
      arc: convert(arcIn, "Inches", outUnit),
    };
  }, [height, width, heightUnit, widthUnit, outUnit]);

  return (
    <form className="radius-tool" onSubmit={(event) => event.preventDefault()}>
      <div className="radius-fields">
        <label>
          Height / sagitta
          <span>
            <input
              type="number"
              min="0.001"
              step="any"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
            <select value={heightUnit} onChange={(event) => setHeightUnit(event.target.value as Unit)}>
              <option>Inches</option>
              <option>Feet</option>
              <option>Yards</option>
            </select>
          </span>
        </label>
        <label>
          Width / chord
          <span>
            <input
              type="number"
              min="0.001"
              step="any"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
            />
            <select value={widthUnit} onChange={(event) => setWidthUnit(event.target.value as Unit)}>
              <option>Inches</option>
              <option>Feet</option>
              <option>Yards</option>
            </select>
          </span>
        </label>
        <label>
          Output as
          <select value={outUnit} onChange={(event) => setOutUnit(event.target.value as Unit)}>
            <option>Inches</option>
            <option>Feet</option>
            <option>Yards</option>
          </select>
        </label>
      </div>

      <dl className="radius-result">
        <div>
          <dt>Radius</dt>
          <dd>
            {result ? `${format(result.radius)} ${outUnit.toLowerCase()}` : "Enter a rise shorter than half the chord."}
          </dd>
        </div>
        <div>
          <dt>Arc length</dt>
          <dd>{result ? `${format(result.arc)} ${outUnit.toLowerCase()}` : "—"}</dd>
        </div>
      </dl>
      <p className="radius-note">
        Same calculator as the original Metal Bending radius tool: radius = (chord² / 8 × rise) + rise / 2.
      </p>
    </form>
  );
}
