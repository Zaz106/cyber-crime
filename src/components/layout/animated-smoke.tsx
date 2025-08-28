import React from "react";
import "./animated-smoke.css";

type AnimatedSmokeProps = {
  /** Height of the background area (e.g. "70vh"). Use 100% if you wrap it. */
  height?: string;
  /** Optional className to position within your layout */
  className?: string;
};

export default function AnimatedSmoke({ height = "70vh", className }: AnimatedSmokeProps) {
  return (
    <div
      className={`wrapper ${className ?? ""}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* static base gradient */}
      <div className="base" />

      {/* dramatic wave-like color blobs */}
      <span className="blob blob1" />
      <span className="blob blob2" />
      <span className="blob blob3" />
      <span className="blob blob4" />
      <span className="blob blob5" />
      <span className="blob blob6" />
    </div>
  );
}
