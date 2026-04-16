"use client";
import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import {
  Header,
  Hero,
  Hotels,
  Restaurants,
  Events,
  Career,
  News,
  Footer,
} from "@/components/sections";
import {
  Cursor,
  BerrySVG,
  BranchSVG,
  GeoShapeSVG,
  OrnamentSVG,
  Preloader,
} from "@/components/ui";

const ActiveThemeDecor = ({ theme }: { theme: string | null }) => {
  return (
    <AnimatePresence>
      {theme === "azatai" && (
        <>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-0 top-1/3 w-64 z-0 pointer-events-none"
          >
            <BerrySVG />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed right-0 top-1/2 w-80 z-0 pointer-events-none rotate-180"
          >
            <BranchSVG />
          </motion.div>
        </>
      )}
      {theme === "yakovlev" && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-0 top-0 h-screen w-32 bg-[#D6B87A] z-0 pointer-events-none blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-10 bottom-10 w-64 text-[#D6B87A] z-0 pointer-events-none"
          >
            <OrnamentSVG />
          </motion.div>
        </>
      )}
      {theme === "victoria" && (
        <>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#D6B87A]/25 to-transparent z-0 pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed left-20 top-1/4 w-40 text-[#D6B87A] z-0 pointer-events-none"
          >
            <OrnamentSVG />
          </motion.div>
        </>
      )}
      {theme === "atlas" && (
        <>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: -50, opacity: 1 }}

            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-0 top-1/3 w-96 text-white/10 z-0 pointer-events-none"
          >
            <GeoShapeSVG />
          </motion.div>
        </>
      )}
      {theme === "taiga" && (
        <>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-0 bottom-0 w-96 z-0 pointer-events-none"
          >
            <BranchSVG />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FloatingDecor = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, 800]);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-24 will-change-transform"
      >
        <BerrySVG />
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [sectionBgColor, setSectionBgColor] = useState("#F6F7F2");
  const [hoverBgColor, setHoverBgColor] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const activeBgColor = hoverBgColor || sectionBgColor;

  const [cursorActive, setCursorActive] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<any>(null);
  const { scrollY } = useScroll();

  const setCursor = (active: boolean, text: string) => {
    // Logic for cursor state
  };
  const scrollTo = (id: string) => {
    lenisRef.current?.scrollTo(`#${id}`, { offset: 0, duration: 1.5 });
  };
  const handleSetSectionBg = (color: string) => {
    setSectionBgColor(color);
    setHoverBgColor(null);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100 && sectionBgColor !== "#F6F7F2") {
      setSectionBgColor("#F6F7F2");
      setHoverBgColor(null);
    }
  });

  useEffect(() => {
    if (loading) document.body.classList.add("loading");
    else document.body.classList.remove("loading");
  }, [loading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.main className="relative min-h-screen">
        <motion.div
          animate={{ backgroundColor: activeBgColor }}
          className="fixed inset-0 -z-10 duration-500 ease-out will-change-[background-color]"
        />
        <div className="grain-overlay" />

        <div className="hidden md:block">
          <ActiveThemeDecor theme={activeTheme} />
          {!loading && <FloatingDecor />}
        </div>

        <Cursor active={cursorActive} text={cursorText} />
        <Header setCursor={setCursor} scrollTo={scrollTo} />

        <Hero onEnter={() => handleSetSectionBg("#F6F7F2")} />

        <Hotels
          onEnter={() => handleSetSectionBg("#1D2A24")}
          setCursor={setCursor}
          setHoverBg={setHoverBgColor}
          setTheme={setActiveTheme}
        />

        <Restaurants
          onEnter={() => handleSetSectionBg("#DECDB8")}
          setCursor={setCursor}
        />

        {/* ПЕРЕМЕЩЕНО: Events после Restaurants, цвет фона светлый для контраста */}
        <Events
          onEnter={() => handleSetSectionBg("#F6F7F2")}
          setCursor={setCursor}
        />

        <Career
          onEnter={() => handleSetSectionBg("#DECDB8")}
          setCursor={setCursor}
        />

        <News
          onEnter={() => handleSetSectionBg("#F6F7F2")}
          setCursor={setCursor}
        />

        <Footer
          onEnter={() => handleSetSectionBg("#FFFFFF")}
          setCursor={setCursor}
        />
      </motion.main>
    </>
  );
}
