interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`font-bold text-2xl tracking-tight text-[#2563eb] ${className}`} style={{ fontFamily: 'Lekton, monospace', letterSpacing: '-0.02em' }}>
      SubTrack
    </div>
  );
}