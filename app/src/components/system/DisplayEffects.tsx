import { useStore } from '@/store/useStore';

export default function DisplayEffects() {
  const isTrueToneOn = useStore((s) => s.isTrueToneOn);
  const isNightShiftOn = useStore((s) => s.isNightShiftOn);

  return (
    <>
      {/* True Tone Overlay */}
      {isTrueToneOn && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(255,220,180,0.03)',
            animation: 'trueToneShift 8s ease-in-out infinite alternate',
            zIndex: 999,
          }}
        />
      )}

      {/* Night Shift Overlay */}
      {isNightShiftOn && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(255, 147, 41, 0.08)',
            mixBlendMode: 'multiply',
            zIndex: 998,
          }}
        />
      )}

      {/* CSS animation for True Tone */}
      <style>{`
        @keyframes trueToneShift {
          from { background: rgba(255,200,150,0.03); }
          to { background: rgba(200,220,255,0.03); }
        }
      `}</style>
    </>
  );
}
