import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  return (
    <Image
      src={variant === "light" ? "/images/logo-white.png" : "/images/logo-black.png"}
      alt="NOVAMEC Oficina Mecânica"
      width={180}
      height={60}
      className={className}
      priority
    />
  );
}
