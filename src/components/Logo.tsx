"use client";

import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const novaColor = variant === "light" ? "#3C3C3B" : "#FFFFFF";
  const mecColor = "#F58220";
  const subtitleColor = variant === "light" ? "#8A8A8A" : "#CCCCCC";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícone M do logo (imagem com fundo preto) */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12">
        <Image
          src="/images/logo-novamec.png"
          alt=""
          fill
          className="object-contain object-left-top"
          priority
          sizes="48px"
        />
      </div>
      {/* Nome NOVAMEC */}
      <svg
        viewBox="0 0 180 50"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-auto sm:h-10"
        aria-hidden
      >
        <text
          x="0"
          y="28"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="26"
        >
          <tspan fill={novaColor}>NOVA</tspan>
          <tspan fill={mecColor}>MEC</tspan>
        </text>
        <text
          x="0"
          y="42"
          fontFamily="DM Sans, sans-serif"
          fontWeight="400"
          fontSize="8"
          letterSpacing="2"
          fill={subtitleColor}
        >
          OFICINA MECÂNICA
        </text>
      </svg>
    </div>
  );
}
