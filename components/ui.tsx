"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

// --- ЛОГОТИП (ОБНОВЛЕНО: Аккуратный текстовый логотип) ---
export const Logo = () => (
  <div className="flex items-center gap-3 mix-blend-difference text-white">
    {/* Иконка - стилизованное дерево/треугольник */}
    <div className="flex items-center gap-3 mix-blend-difference">
      {/* Используем стандартный тег img.
       Убедитесь, что файл IMG_3054.PNG лежит в папке /public вашего проекта.
    */}
      <img
        src="/IMG_3054.PNG"
        alt="Территория Тайги"
        className="h-18 w-auto object-contain"
        // h-10 соответствует вашим исходным 40px (40 / 4 = 10)
      />
    </div>
    {/* Текстовая часть */}
    <div className="flex flex-col">
      <span className="font-serif text-lg leading-none tracking-[0.2em] uppercase font-bold">
        Территория
      </span>
      <div className="flex items-center justify-between w-full">
        <span className="font-sans text-[11px] leading-none tracking-[0.3em] opacity-80 uppercase">
          Тайги
        </span>
      </div>
    </div>
  </div>
);

// --- SVG ДЕКОР ---
export const BerrySVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    <defs>
      <radialGradient id="berryGrad" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#D63F45" />
        <stop offset="60%" stopColor="#9A2A2A" />
        <stop offset="100%" stopColor="#5C1212" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5F7A63" />
        <stop offset="100%" stopColor="#2A4036" />
      </linearGradient>
    </defs>
    <path
      d="M20 110 C 40 80, 60 60, 90 30"
      stroke="#5C4033"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M60 60 C 70 50, 80 55, 100 60"
      stroke="#5C4033"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M50 70 Q 30 60 40 40 Q 60 50 50 70 Z"
      fill="url(#leafGrad)"
      opacity="0.9"
    />
    <circle cx="85" cy="45" r="12" fill="url(#berryGrad)" />
    <path d="M82 55 L 85 58 L 88 55 Z" fill="#3E2F25" />
    <path d="M90 40 Q 110 30 100 10 Q 80 20 90 40 Z" fill="url(#leafGrad)" />
    <g transform="translate(60, 30)">
      <circle cx="0" cy="0" r="18" fill="url(#berryGrad)" />
      <ellipse
        cx="-6"
        cy="-6"
        rx="5"
        ry="3"
        fill="white"
        opacity="0.5"
        transform="rotate(-30)"
      />
    </g>
    <path d="M70 80 Q 90 70 80 50 Q 60 60 70 80 Z" fill="url(#leafGrad)" />
    <circle cx="100" cy="60" r="10" fill="url(#berryGrad)" />
  </svg>
);

export const BranchSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={className}>
    <path
      d="M0 50 Q 100 20 200 50"
      stroke="#5C4033"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M20 45 L 30 20 M 40 40 L 50 15 M 60 45 L 70 20"
      stroke="#2A4036"
      strokeWidth="1.5"
    />
    <path
      d="M120 40 L 110 15 M 140 45 L 130 10 M 160 40 L 150 15"
      stroke="#2A4036"
      strokeWidth="1.5"
    />
  </svg>
);

export const GeoShapeSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <rect x="20" y="20" width="60" height="60" strokeWidth="1" />
    <line x1="0" y1="100" x2="100" y2="0" strokeWidth="0.5" />
  </svg>
);

export const OrnamentSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <circle cx="50" cy="50" r="40" strokeWidth="1" />
    <path d="M50 10 L 50 90 M 10 50 L 90 50" strokeWidth="0.5" />
    <rect
      x="45"
      y="45"
      width="10"
      height="10"
      transform="rotate(45 50 50)"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

// --- КОМПОНЕНТ КУРСОРА ---
export const Cursor = ({ active, text }: { active: boolean; text: string }) => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
      const move = (e: MouseEvent) => {
        mouse.x.set(e.clientX);
        mouse.y.set(e.clientY);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }
  }, []);

  const x = useSpring(mouse.x, { stiffness: 1200, damping: 25 });
  const y = useSpring(mouse.y, { stiffness: 1200, damping: 25 });

  if (isMobile) return null;

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: active ? 150 : 18,
        height: active ? 150 : 18,
        backgroundColor: active
          ? "var(--color-taiga-gold)"
          : "var(--color-taiga-green)",
      }}
      className="
        hidden md:flex
        fixed top-0 left-0 z-[9999]
        rounded-full pointer-events-none
        items-center justify-center
        text-taiga-deep
        transition-colors duration-300
        shadow-lg
      "
    >
      {active && (
        <span
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: "var(--color-taiga-deep)" }}
        >
          {text}
        </span>
      )}
    </motion.div>
  );
};

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[99999] bg-[#151C19] flex items-center justify-center text-[#F2F5F3]"
    >
      <div className="flex flex-col items-center px-4">
        <motion.svg
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          width="60"
          height="60"
          viewBox="0 0 40 40"
          fill="none"
          className="mb-6"
        >
          <path d="M20 2L8 22H16V32H24V22H32L20 2Z" fill="currentColor" />
        </motion.svg>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-6xl font-serif tracking-widest uppercase text-center"
          >
            Территория Тайги
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
};

// --- SECTION WRAPPER ---
export const Section = ({
  children,
  onEnter,
  className,
  id,
  viewportOverride,
}: any) => {
  return (
    <motion.section
      id={id}
      className={className}
      onViewportEnter={onEnter}
      viewport={viewportOverride || { margin: "-50% 0px -50% 0px", amount: 0 }}
    >
      {children}
    </motion.section>
  );
};
