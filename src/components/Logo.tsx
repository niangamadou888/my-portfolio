export const Logo = () => {
  return (
    <a
      href="#home"
      className="fixed top-6 left-6 z-50 group"
      style={{ cursor: 'none', animation: 'fadeInLeft 0.6s ease 0.2s both' }}
    >
      <div className="relative">
        <span
          className="text-xl font-bold tracking-widest"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #d6c9b6, #b8a898)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 12px rgba(214, 201, 182, 0.5))',
          }}
        >
          ABN
        </span>
        <div
          className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, #d6c9b6, #b8a898)', zIndex: -1 }}
        />
      </div>
    </a>
  );
};
