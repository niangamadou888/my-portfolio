export const NoiseOverlay = () => (
  <>
    <svg className="fixed w-0 h-0" aria-hidden="true">
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        filter: 'url(#grain-noise)',
        opacity: 0.035,
        mixBlendMode: 'overlay',
      }}
    />
  </>
);
