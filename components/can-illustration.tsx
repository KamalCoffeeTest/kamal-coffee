type CanIllustrationProps = {
  className?: string;
  variant?: "hero" | "detail";
};

export function CanIllustration({
  className = "",
  variant = "hero",
}: CanIllustrationProps) {
  const labelOpacity = variant === "detail" ? 1 : 0.85;

  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Kamal Coffee can illustration"
    >
      <rect x="40" y="20" width="120" height="280" rx="8" fill="#E2D8C8" />
      <rect x="44" y="24" width="112" height="272" rx="6" fill="#EDE6DA" />
      <ellipse cx="100" cy="20" rx="60" ry="8" fill="#C4B8A8" />
      <rect
        x="55"
        y="80"
        width="90"
        height="120"
        rx="4"
        fill="#3D2B1F"
        opacity={labelOpacity}
      />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="#F7F3ED"
        fontSize="11"
        fontFamily="Georgia, serif"
        letterSpacing="2"
      >
        KAMAL
      </text>
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fill="#B8895A"
        fontSize="8"
        fontFamily="system-ui, sans-serif"
        letterSpacing="1"
      >
        COFFEE
      </text>
      <rect x="70" y="170" width="60" height="1" fill="#B8895A" opacity="0.6" />
      <text
        x="100"
        y="190"
        textAnchor="middle"
        fill="#C4B8A8"
        fontSize="6"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.5"
      >
        VIETNAMESE ICED
      </text>
      <ellipse
        cx="100"
        cy="300"
        rx="50"
        ry="6"
        fill="#3D2B1F"
        opacity="0.08"
      />
    </svg>
  );
}
