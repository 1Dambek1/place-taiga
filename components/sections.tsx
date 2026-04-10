"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Send,
  Menu,
  X,
  CheckCircle2,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import { BranchSVG, Logo, Section } from "./ui";
import { withBasePath } from "@/lib/base-path";
// ... импорт server actions (об этом ниже)

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsDesktop(true);
    }
  }, []);
  return isDesktop;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- HEADER ---
export const Header = ({
  setCursor,
  scrollTo,
}: {
  setCursor: any;
  scrollTo: (id: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <>
      <motion.header
        style={{ opacity }}
        className="fixed top-0 left-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-50 mix-blend-difference"
      >
        <div className="cursor-pointer" onClick={() => scrollTo("hero")}>
          <Logo />
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 uppercase text-sm font-semibold tracking-[0.2em] text-white">
          {[
            { name: "Отели", id: "hotels" },
            { name: "Вкусы", id: "restaurants" },
            { name: "Залы", id: "events" },
            { name: "Новости", id: "news" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              className="hover:text-taiga-gold transition-colors relative group"
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-taiga-gold transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("hotels")}
            className="hidden md:block border border-white/40 text-white px-8 py-3 rounded-sm text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all duration-500 tracking-widest"
          >
            Забронировать
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-[#151C19] z-100 flex flex-col items-center justify-center text-[#F2F5F3]"
          >
            <button
              className="absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-2xl font-serif items-center">
              {[
                { name: "Отели", id: "hotels" },
                { name: "Вкусы", id: "restaurants" },
                { name: "Конференц-залы", id: "events" },
                { name: "Контакты", id: "footer" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollTo(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export const Hero = ({ onEnter }: any) => {
  const { scrollY } = useScroll();
  const scrollRange = [0, 1000];
  const scale = useTransform(scrollY, scrollRange, [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 700, 1000], [1, 1, 0]);

  const [index, setIndex] = useState(0);

  const words = ["ДОВЕРИЯ", "КОМФОРТА", "СЕРВИСА", "ПРИРОДЫ"];
  const videos = [
    "/videos/АЗАТАЙ.mp4",
    "/videos/ЯКОВЛЕВ.mp4",
    "/videos/ВИКТОРИЯ.mp4",
    "/videos/АТЛАС.mp4",
    "/videos/ТАЙГА.mp4",
  ];

  const posters = [
    "/japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
    "/historical-wooden-noble-hotel-dark-brown-interior.jpg",
    "/elegant-comfortable-hotel-in-historic-city-center.jpg",
    "/modern-bright-hotel-lobby-blue-white-green-colors.jpg",
    "/forest-themed-hotel-green-nature-siberian-taiga.jpg",
  ];
  const currentWord = words[index % words.length];
  const activeIndex = index % videos.length;

  // Исправленная типизация для массива рефов
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.play().catch(() => {}); // Игнорируем ошибки автоплея
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <Section
      id="hero"
      onEnter={onEnter}
      className="h-[100vh] md:h-[140vh] relative bg-black"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Контент заголовка */}
        <div className="text-center z-20 text-white px-6 mt-10 md:mt-0 drop-shadow-2xl pointer-events-none">
          <p className="text-[11px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 border-b border-white/30 pb-2 inline-block">
            Сеть отелей и ресторанов
          </p>

          <h1 className="flex flex-col items-center justify-center">
            <span className="text-[11vw] md:text-[8vw] leading-none font-serif font-medium tracking-tight">
              ТЕРРИТОРИЯ
            </span>

            <span className="block h-[1.2em] overflow-hidden text-taiga-gold text-[11vw] md:text-[8vw] leading-none font-serif font-medium tracking-tight">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="block"
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Видео-фон */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 w-full h-full z-10 bg-black"
        >
          {videos.map((src, i) => (
            <video
              key={src}
              // ИСПРАВЛЕНО: Добавлены фигурные скобки, чтобы функция возвращала void
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={encodeURI(withBasePath(src))}
              poster={withBasePath(posters[i])}
              muted
              playsInline
              preload={i === activeIndex ? "metadata" : "none"}
              onEnded={() => {
                if (i === activeIndex) setIndex((prev) => prev + 1);
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
        </motion.div>
      </div>
    </Section>
  );
};
// ... Остальные компоненты (Hotels, Restaurants и т.д.) остаются без изменений ...
// ... Ниже только измененный компонент Career для обработки формы ...

export const Hotels = ({ onEnter, setCursor, setHoverBg, setTheme }: any) => {
  const isDesktop = useIsDesktop();
  const [activeHotelVideo, setActiveHotelVideo] = useState<string | null>(null);

  const hotelsData = [
    {
      name: "АЗАТАЙ",
      themeId: "azatai",
      type: "Парк-отель",
      desc: "Загородный отдых на берегу Байкала",
      loc: "п. Большое Голоустное",
      img: "/videos/АЗАТАЙ.mp4",
      themeBg: "#3A2226",
      poster: "japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
      link: "https://www.azatay.ru/",
    },
    {
      name: "ЯКОВЛЕВ",
      themeId: "yakovlev",
      type: "Исторический",
      desc: "Отель в доме купца Н.В. Яковлева",
      loc: "Центр города",
      img: "/videos/ЯКОВЛЕВ.mp4",
      themeBg: "#2F2520",
      poster: "historical-wooden-noble-hotel-dark-brown-interior.jpg",
      link: "https://yakovlevhotel.ru/",
    },
    {
      name: "ВИКТОРИЯ",
      themeId: "victoria",
      type: "City Hotel",
      desc: "Стиль и комфорт в самом центре",
      loc: "Центр города",
      img: "/videos/ВИКТОРИЯ.mp4",
      themeBg: "#3D3628",
      poster: "/elegant-comfortable-hotel-in-historic-city-center.jpg",
      link: "https://victoryhotel.ru/",
    },
    {
      name: "АТЛАС",
      themeId: "atlas",
      type: "Бизнес",
      desc: "Уютный уголок недалеко от центра",
      loc: "Тихий центр",
      img: "/videos/АТЛАС.mp4",
      themeBg: "#1D2530",
      poster: "modern-bright-hotel-lobby-blue-white-green-colors.jpg",
      link: "https://atlas-irk.ru/",
    },
    {
      name: "ТАЙГА",
      themeId: "taiga",
      type: "Дизайнерский",
      desc: "Любимое место для гостей и жителей города",
      loc: "Иркутск",
      img: "/videos/ТАЙГА.mp4",
      themeBg: "#151C19",
      poster: "forest-themed-hotel-green-nature-siberian-taiga.jpg",
      link: "https://taigahotel.ru/",
    },
  ];

  const isVideo = (path: string) => path.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Section
      id="hotels"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-snow relative z-10"
    >
      <div className="container mx-auto px-6">
        {/* Шапка раздела: Центрированный заголовок */}
        <div className="flex flex-col items-center mb-16 md:mb-24 border-b border-taiga-snow pb-12 text-center">
          <h2 className="text-5xl md:text-8xl font-serif uppercase tracking-[0.1em]">
            Отели
          </h2>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] opacity-80 mt-4">
            Территория гостиемпримства
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
        >
          {hotelsData.map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={h.themeId}
              variants={itemVariants}
              className={`group block relative ${
                i % 2 !== 0 ? "md:translate-y-32" : ""
              }`}
              onMouseEnter={() => {
                if (!isDesktop) return;
                setHoverBg(h.themeBg);
                setTheme(h.themeId);
                setActiveHotelVideo(h.themeId);
              }}
              onMouseLeave={() => {
                if (!isDesktop) return;
                setHoverBg(null);
                setTheme(null);
                setActiveHotelVideo(null);
              }}
            >
              {/* Контейнер медиа */}
              <div className="h-[280px] md:h-[450px] rounded-sm overflow-hidden mb-8 relative bg-white/50 shadow-2xl">
                {isVideo(h.img) && isDesktop && activeHotelVideo === h.themeId ? (
                  <motion.video
                    key={`${h.themeId}-video`}
                    src={encodeURI(withBasePath(h.img))}
                    poster={
                      h.poster
                        ? withBasePath(
                            h.poster.startsWith("/") ? h.poster : `/${h.poster}`,
                          )
                        : undefined
                    }
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <motion.img
                    key={`${h.themeId}-poster`}
                    src={
                      h.poster
                        ? withBasePath(
                            h.poster.startsWith("/") ? h.poster : `/${h.poster}`,
                          )
                        : withBasePath(h.img)
                    }
                    alt={h.name}
                    loading="lazy"
                    whileHover={isDesktop ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute top-4 right-4 bg-taiga-snow text-taiga-deep px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-lg z-10">
                  {h.type}
                </div>
              </div>

              <h3
                className={`text-3xl md:text-5xl font-serif mb-3 uppercase tracking-wider transition-colors duration-500 ${
                  isDesktop ? "group-hover:text-taiga-gold" : "text-taiga-gold"
                }`}
              >
                {h.name}
              </h3>

              <p className="text-sm md:text-base opacity-70 mb-4 font-light max-w-sm">
                {h.desc}
              </p>

              <div className="flex items-center gap-2 text-[10px] opacity-50 uppercase tracking-[0.2em]">
                <MapPin size={14} /> {h.loc}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
export const Restaurants = ({ onEnter, setCursor }: any) => {
  const restaurantsData = [
    {
      name: "АЗАТАЙ",
      imgRest: "DSC03659.jpg",
      imgFood: "food1.png", // замените на реальный путь
      link: "https://azatai-rest.ru",
    },
    {
      name: "ТАЙГА",
      imgRest: "DSC_7380.png.webp",
      imgFood: "food2.png", // замените на реальный путь
      link: "https://taigahotel.ru/restaurant#/",
    },
  ];

  return (
    <Section
      id="restaurants"
      onEnter={onEnter}
      className="py-20 md:py-40 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        {/* Заголовок */}
        <div className="border-b border-taiga-deep/10 pb-8 mb-16 text-center md:text-left">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 opacity-80">
            Гастрономия
          </p>
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter">
            Вкусы Сибири
          </h2>
        </div>

        {/* Список */}
        <div className="grid grid-cols-1 gap-12 md:gap-24">
          {restaurantsData.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-none"
              onMouseEnter={() => setCursor(true, "СМОТРЕТЬ")}
              onMouseLeave={() => setCursor(false, "")}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Контейнер с фото */}
              <div className="relative w-full md:w-[55%] aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
                {/* Основное фото (Ресторан) */}
                <motion.img
                  src={item.imgRest}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={item.name}
                />

                {/* Второе фото (Блюдо) - появляется сбоку при наведении */}
                <motion.div className="absolute top-4 right-4 w-1/3 aspect-square rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl hidden md:block opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <img
                    src={item.imgFood || item.imgRest}
                    className="w-full h-full object-cover"
                    alt="Dish"
                  />
                </motion.div>

                {/* Оверлей при наведении */}
                <div className="absolute inset-0 bg-taiga-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Текст */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-taiga-gold font-bold text-sm tracking-widest">
                    0{i + 1}
                  </span>
                  <div className="h-[1px] w-8 bg-taiga-gold/40" />
                </div>

                <h3 className="text-4xl md:text-6xl mb-4 group-hover:text-taiga-gold transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const Events = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();

  return (
    <Section
      id="events"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        {/* Центрированный заголовок раздела */}
        <div className="flex flex-col items-center mb-16 md:mb-24 border-b border-taiga-deep/10 pb-12 text-center">
          <h2 className="text-4xl md:text-7xl font-serif uppercase tracking-[0.1em]">
            Конференц-залы
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-80 mt-4">
            Площадки для ваших событий
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {[
            {
              name: "Конференц-зал Азатай",
              cap: "до 200 персон",
              img: "photo_5413853646258569104_y.jpg",
              link: "https://azatay.ru/konferenc-zal",
              desc: "Панорамный конференц-зал с видом на Байкал",
            },
            {
              name: "Конференц-зал Тайга",
              cap: "до 100 персон",
              img: "DSC06897.jpg",
              link: "https://azatay.ru/konferenc-zal",
              desc: "Уютный конференц-зал с современным дизайном",
            },
          ].map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              variants={itemVariants}
              whileHover={isDesktop ? { y: -10 } : {}}
              className={`group block relative ${
                i % 2 !== 0 ? "md:translate-y-20" : ""
              }`}
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              <div className="h-[220px] md:h-[400px] rounded-xl overflow-hidden mb-4 md:mb-6 relative shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={h.img}
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000 md:group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Вместимость и стрелка */}
                <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur px-4 py-3 md:px-6 md:py-4 w-full flex justify-between items-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-taiga-green">
                    {h.cap}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif mb-1 uppercase tracking-wide">
                {h.name}
              </h3>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">
                {h.desc}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export const Career = ({ onEnter, setCursor }: any) => {
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");

    // Замените эти значения на ваши или используйте process.env (с префиксом NEXT_PUBLIC_ в Next.js)
    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const GROUP_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_GROUP_ID;

    const message = `
🌲 <b>НОВАЯ ЗАЯВКА (КАРЬЕРА)</b>
👤 <b>Имя:</b> ${name}
📞 <b>Тел:</b> ${phone}
    `.trim();

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: GROUP_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке в Telegram");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Не удалось отправить заявку. Попробуйте позже.");
    }
  };

  return (
    <Section onEnter={onEnter} className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Левая часть: Фото */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            <img
              src="./work.png"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Career at Taiga"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2">
                Работа у нас
              </p>
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter">
                Станьте частью <br /> тайги
              </h2>
            </div>
          </div>

          {/* Правая часть: Форма */}
          <div className="md:w-1/2 p-8 md:p-16 bg-white flex flex-col justify-center">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl text-slate-900 font-medium">
                  Заявка отправлена
                </h3>
                <p className="text-slate-500 text-sm">
                  Мы получили ваше сообщение и скоро свяжемся с вами.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl text-slate-900 uppercase">
                    Оставьте контакты
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Мы свяжемся с вами, чтобы обсудить вакансии
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      required
                      disabled={status === "loading"}
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 text-slate-900 outline-none focus:ring-1 focus:ring-amber-200 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      required
                      disabled={status === "loading"}
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 text-slate-900 outline-none focus:ring-1 focus:ring-amber-200 transition-all disabled:opacity-50"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    onMouseEnter={() => setCursor(true, "SEND")}
                    onMouseLeave={() => setCursor(false, "")}
                    className="w-full bg-[#D6C6B0] hover:bg-[#c4b59f] text-white h-16 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg disabled:grayscale disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Отправка..." : "Отправить"}
                    {status !== "loading" && <ArrowRight size={18} />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
export const News = ({ onEnter, setCursor, isDesktop }: any) => {
  const newsData = [
    {
      id: 1,
      img: "japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
      title: "События отеля АЗАТАЙ",
      desc: "Музыкальные вечера, гастроужины и атмосфера байкальского гостеприимства в новом месяце.",
      href: "https://azatay.ru/afisha#/",
    },
    {
      id: 2,
      img: "forest-themed-hotel-green-nature-siberian-taiga.jpg",
      title: "События отеля Тайга",
      desc: "Уникальное путешествие по Сибири в сопровождении авторских мероприятий.",
      href: "https://azatay.ru/afisha#/",
    },
  ];
  const [berryList, setBerryList] = useState<any[]>([]);
  useEffect(() => {
    const generatedBerries = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 45}%`,
      size: Math.random() * 10 + 6,
      blur: Math.random() > 0.8 ? "2px" : "0px",
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setBerryList(generatedBerries);
  }, []);

  return (
    <Section
      id="news"
      onEnter={onEnter}
      className="py-24 md:py-40 text-taiga-deep overflow-hidden relative"
    >
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.18, x: 0 }}
          transition={{ duration: 2 }}
          className="absolute -left-10 top-0 w-1/2 h-full"
        >
          <BranchSVG />
        </motion.div>

        {/* 3. Рендерим только если ягоды сгенерированы */}
        {berryList.map((berry) => (
          <motion.div
            key={berry.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: Math.random() * 1.2, duration: 1 }} // Здесь Math.random тоже лучше заменить на фиксированное из стейта, если ошибка останется
            className="absolute rounded-full"
            style={{
              top: berry.top,
              left: berry.left,
              width: berry.size,
              height: berry.size,
              filter: `blur(${berry.blur})`,
              background:
                "radial-gradient(circle at 35% 35%, #b91c1c, #450a0a)",
              boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.4)",
            }}
          >
            <motion.div
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: berry.duration,
                repeat: Infinity,
                delay: berry.delay,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-white/40 blur-[1px]"
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-end">
          {/* Заголовок (справа, крупный) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-right"
          >
            <h2 className="text-3xl md:text-8xl font-light leading-none uppercase tracking-tighter">
              Событийная тайга
            </h2>
          </motion.div>

          {/* КОНТЕЙНЕР НОВОСТЕЙ В РЯД (Увеличил ширину) */}
          <div className="flex flex-col md:flex-row gap-12 justify-end w-full lg:w-[85%]">
            {newsData.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full md:w-[400px]" // Увеличенная ширина карточки
                onMouseEnter={() => isDesktop && setCursor(true, "СМОТРЕТЬ")}
                onMouseLeave={() => isDesktop && setCursor(false, "")}
              >
                {/* Картинка: крупная и четкая */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-2xl border border-taiga-deep/5">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-taiga-deep/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* Текстовый блок */}
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-light leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-50 max-w-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Линия декоративная снизу */}
      <div className="absolute bottom-10 right-0 w-1/2 h-px bg-gradient-to-l from-taiga-deep/10 to-transparent" />
    </Section>
  );
};
export const Footer = ({ onEnter, setCursor }: any) => {
  const isDesktop = true;
  const hotels = [
    { name: "Азатай", href: "https://www.azatay.ru/" },
    { name: "Яковлев", href: "https://yakovlevhotel.ru/" },
    { name: "Виктория", href: "https://victoryhotel.ru/" },
    { name: "Атлас", href: "https://atlas-irk.ru/" },
    { name: "Тайга", href: "https://taigahotel.ru/" },
  ];
  const restaurants = [
    { name: "Ресторан Азатай", href: "https://azatai-rest.ru" },
    { name: "Ресторан Тайга", href: "https://taigahotel.ru/restaurant#/" },
  ];
  const conferenceHalls = [
    { name: "Конференц-зал Азатай", href: "https://azatay.ru/konferenc-zal" },
  ];
  const socialLinks = [
    { name: "Телеграмм Тайга", href: "https://t.me/taiga_irkutsk_hotel" },
    { name: "Телеграмм Азатай", href: " https://t.me/azataybaikal" },
  ];

  return (
    <Section
      id="footer"
      onEnter={onEnter}
      viewportOverride={{ amount: 0.2 }}
      className="pt-16 md:pt-24 pb-12 bg-taiga-snow text-taiga-deep border-t border-taiga-deep/5 w-full"
    >
      <div
        className="px-6 md:px-10 lg:px-20"
        onMouseEnter={() => isDesktop && setCursor(false, "")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-16 mb-16 md:mb-24">
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Отели
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {hotels.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Рестораны
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {restaurants.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Конференц-залы
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {conferenceHalls.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Соцсети
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {socialLinks.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
            {/* <h4 className="font-bold text-[10px] mt-8 mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Контакты
            </h4>
            <p className="text-lg md:text-xs font-serif mb-2">
              +7 (3952) 00-00-00
            </p> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-[11px] uppercase opacity-20 tracking-widest border-t border-taiga-deep/5 pt-8 gap-2">
          <p>Все права защищены.</p>
        </div>
      </div>
    </Section>
  );
};
