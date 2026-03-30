import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  Star, 
  ShieldCheck, 
  Truck, 
  Camera, 
  RefreshCcw, 
  Headphones, 
  ArrowRight,
  ArrowDown,
  TrendingDown,
  Zap,
  AlertTriangle,
  Layers,
  Play,
  Target,
  BookOpen,
  Users,
  ShoppingBag,
  Cpu,
  Shirt,
  Watch,
  Package
} from 'lucide-react';

const optimizeImage = (url: string, width: number = 800, quality: number = 75) => {
  if (url.includes('picsum.photos')) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}&w=${width}&q=${quality}&output=webp`;
};

function ImportCard({ item }: { item: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setConstraints({
          left: -(item.images.length - 1) * width,
          right: 0
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [item.images.length]);

  return (
    <motion.div 
      initial={false}
      whileInView={{ 
        boxShadow: "0 0 60px rgba(0, 255, 102, 0.25)",
        borderColor: "rgba(34, 197, 94, 0.4)",
      }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="group relative bg-[#0A0A0A] rounded-xl border border-white/5 overflow-hidden flex flex-col h-full"
    >
      {/* Shiny Border Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-xl pointer-events-none"
      ></motion.div>
      
      <div className="relative flex flex-col h-full">
        {/* Image Slider Container */}
        <div ref={containerRef} className="relative h-72 overflow-hidden bg-neutral-900">
          <motion.div 
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="flex h-full cursor-grab active:cursor-grabbing"
          >
            {item.images.map((imgUrl: string, sIdx: number) => (
              <div key={sIdx} className="w-full h-full flex-shrink-0 relative">
                <img 
                  src={optimizeImage(imgUrl, 600)} 
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
          
          {/* Swipe Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {item.images.map((_: any, sIdx: number) => (
              <div key={sIdx} className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-brand-green/40 transition-colors"></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-black tracking-tighter text-white mb-3">{item.title}</h3>
          <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(30);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controls = animate(30, 90, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (value) => setDisplayCount(Math.round(value))
    });
    return controls.stop;
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-brand-green/30">
      {/* 1. HEADLINE E SUBTEXTO */}
      <section className="pt-24 pb-12 px-4 max-w-6xl mx-auto text-center flex flex-col items-center">
        <h1 
          className="text-[47px] font-bold leading-[0.9] tracking-tighter mb-8 text-center max-w-4xl"
        >
          Nunca mais <span className="animate-gradient-red">seja o lucro</span> de revendedores
        </h1>
        <p 
          className="text-[18px] text-black font-normal max-w-3xl mx-auto leading-tight text-center mb-12"
        >
          Tenha acesso ao contato direto de fábricas chinesas e importe seus produtos até <span className="relative inline-block"><span className="font-black">{displayCount}% mais barato</span><motion.span initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }} viewport={{ once: true }} className="absolute bottom-0 left-0 h-1 bg-brand-green rounded-full" /></span>
        </p>
        
        {/* VSL - Video Sales Letter */}
        <div className="w-full max-w-4xl mb-12 relative group">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-4 border-black relative">
            {/* Placeholder para Vídeo (VSL) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-brand-green rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <Play className="w-10 h-10 md:w-16 md:h-16 text-black fill-black ml-2" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/50 font-sans text-xs uppercase tracking-widest">
                <span>VSL_PREVIEW_MODE</span>
                <span>00:00 / 12:45</span>
              </div>
            </div>
            
            {/* Overlay de carregamento simulado */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-[10px] font-bold uppercase tracking-tighter">LIVE</span>
            </div>
          </div>
          
          {/* Sombra decorativa */}
          <div className="absolute -inset-4 bg-brand-green/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </section>

      {/* 4. CARROSSEL DE RESULTADOS (ESTILIZADO - FUNDO BRANCO) */}
      <section className="pt-[50px] pb-[50px] overflow-hidden relative bg-white">
        {/* Background Orbs (Subtle on white) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="text-center mb-20 px-4 relative z-10">
          <h2 className="text-[52px] md:text-[52px] font-black italic tracking-tighter leading-none mb-6 text-black">
            Nossos <span className="animate-gradient-green">resultados</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Veja o que nossos alunos estão recebendo direto das melhores fábricas da China.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex overflow-x-auto no-scrollbar pb-12 touch-pan-x">
            <div 
              className="flex animate-marquee whitespace-nowrap gap-8 py-4 px-8 hover:[animation-play-state:paused] active:[animation-play-state:paused]"
            >
              {[
                "https://i.ibb.co/n85sL9c7/1.png",
                "https://i.ibb.co/7tXcsP8T/2.png",
                "https://i.ibb.co/fzkDcpNp/3.png",
                "https://i.ibb.co/yn4GqGN4/4.png",
                "https://i.ibb.co/z3Bx2bT/5.png",
                "https://i.ibb.co/B2k9ZNpm/6.png",
                "https://i.ibb.co/7dWH6P2F/7.png"
              ].map((url, i) => (
                <motion.div 
                  key={`carousel-1-${i}`} 
                  whileHover={{ y: -10, rotate: 1 }}
                  className="w-80 md:w-[450px] aspect-[4/5] bg-white rounded-2xl flex-shrink-0 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group"
                >
                  <img 
                    src={optimizeImage(url, 500, 60)} 
                    alt={`Resultado ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                      <span className="text-brand-green font-black text-xs uppercase tracking-widest">Produto Verificado</span>
                    </div>
                    <h4 className="text-white font-black text-2xl tracking-tight italic">Qualidade 1:1 Premium</h4>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 right-6 bg-brand-green text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Recebido
                  </div>
                </motion.div>
              ))}
              {/* Duplicata para Loop Infinito */}
              {[
                "https://i.ibb.co/n85sL9c7/1.png",
                "https://i.ibb.co/7tXcsP8T/2.png",
                "https://i.ibb.co/fzkDcpNp/3.png",
                "https://i.ibb.co/yn4GqGN4/4.png",
                "https://i.ibb.co/z3Bx2bT/5.png",
                "https://i.ibb.co/B2k9ZNpm/6.png",
                "https://i.ibb.co/7dWH6P2F/7.png"
              ].map((url, i) => (
                <motion.div 
                  key={`carousel-2-${i}`} 
                  whileHover={{ y: -10, rotate: 1 }}
                  className="w-80 md:w-[450px] aspect-[4/5] bg-white rounded-2xl flex-shrink-0 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group"
                >
                  <img 
                    src={optimizeImage(url, 500, 60)} 
                    alt={`Resultado ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                      <span className="text-brand-green font-black text-xs uppercase tracking-widest">Produto Verificado</span>
                    </div>
                    <h4 className="text-white font-black text-2xl tracking-tight italic">Qualidade 1:1 Premium</h4>
                  </div>

                  <div className="absolute top-6 right-6 bg-brand-green text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Recebido
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-center px-4 mb-32">
        <motion.a 
          href="#oferta"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          className="group relative inline-flex items-center justify-center px-10 py-6 bg-brand-green text-white font-black text-xl md:text-3xl rounded-2xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] overflow-hidden font-sans"
        >
          {/* Animated Glow Layer */}
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-brand-green blur-2xl -z-10"
          />

          {/* Shimmering Light Effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 z-0"
          />

          <span className="relative z-10 flex items-center gap-3 tracking-tighter">
            Desbloquear acesso <ArrowDown className="w-8 h-8 group-hover:translate-y-2 transition-transform" />
          </span>

          {/* Outer Glow Pulse */}
          <div className="absolute -inset-4 bg-brand-green/30 blur-3xl group-hover:bg-brand-green/50 transition-colors -z-20"></div>
        </motion.a>
      </div>

      {/* 6. GRID DE BENEFÍCIOS (REESTILIZADO) */}
      <div className="bg-zinc-950 py-32 mb-32 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-green/15 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 opacity-50"></div>

        <section className="px-4 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-28">
            <h2 className="text-[52px] md:text-[52px] font-black italic tracking-tighter leading-[47.8px] pt-0 text-white">
              Por que escolher <br />
              <span className="animate-gradient-green px-[11px]">o Shoe?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full relative">
            {[
              { icon: <TrendingDown className="w-8 h-8 text-black" />, title: "Custos baixos", desc: <span>Custos de importação <strong className="text-white font-black">mais baixos que Cssbuy, Hubbuy e semelhantes.</strong></span> },
              { icon: <Zap className="w-8 h-8 text-black" />, title: "Frete Expresso", desc: <span>Média de 25 dias para recebimento. <strong className="text-white font-black">Nunca mais espere 2 meses.</strong></span> },
              { icon: <Truck className="w-8 h-8 text-black" />, title: "Sem custo de envio", desc: <span>Custo de envio otimizado e embutido, garantindo o <strong className="text-white font-black">menor preço final.</strong></span> },
              { icon: <Camera className="w-8 h-8 text-black" />, title: "Orçamento por foto", desc: <span><strong className="text-white font-black">Envie uma foto e receba o orçamento.</strong> Sem garimpar links duvidosos.</span> },
              { icon: <Layers className="w-8 h-8 text-black" />, title: "Diversas qualidades", desc: <span>Escolha entre qualidade <strong className="text-white font-black">média, alta ou idêntica ao original (1:1).</strong></span> },
              { icon: <Headphones className="w-8 h-8 text-black" />, title: "Suporte 24h", desc: <span>Atendimento <strong className="text-white font-black">especializado em português.</strong> Dúvidas resolvidas na hora.</span> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-10 md:p-12 bg-white/5 backdrop-blur-md text-white rounded-[32px] border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col items-center text-center group relative overflow-hidden transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-green/10 transition-colors"></div>
                
                <motion.div 
                  whileInView={{ scale: 1.1, rotate: 3 }}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                  className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.3)] transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-base font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* 7. BOX QUALIDADE NEGATIVA (CONCORRÊNCIA REESTILIZADO) */}
      <section className="px-4 max-w-7xl mx-auto mb-16 relative">
        {/* Subtle background element for comparison */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[200px] font-black text-black/[0.02] select-none pointer-events-none italic tracking-tighter">VS</div>
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-[52px] md:text-[52px] font-black italic tracking-tighter leading-[0.85]">
            Compare <br />
            <span className="animate-gradient-green">você mesmo</span>
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-950 text-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(220,38,38,0.2)] relative overflow-hidden border border-white/5 p-[15px] pb-[30px] group transition-all duration-500 hover:shadow-[0_48px_80px_-16px_rgba(220,38,38,0.3)]"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-red-600/20 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -ml-24 -mb-24"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col items-center text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.85] text-red-500">
                <span className="text-white">Outros</span> agentes
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  <>Custos extremamente <span className="text-white font-black">elevados</span></>,
                  <>Qualidade duvidosa e <span className="text-white font-black">alto risco</span></>,
                  <>Prazo de entrega de <span className="text-white font-black">60+ dias</span></>,
                  <><span className="text-white font-black">Sem garantia</span> de reembolso</>,
                  <><span className="text-white font-black">Um tiro na lua</span> a cada envio</>
                ].map((text, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ scale: 1, boxShadow: "0 0 0px rgba(239, 68, 68, 0)", borderColor: "rgba(255, 255, 255, 0.1)" }}
                    whileInView={{ 
                      boxShadow: "0 0 25px rgba(239, 68, 68, 0.25)", 
                      borderColor: "rgba(239, 68, 68, 0.4)" 
                    }}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    className="flex flex-col items-center gap-3 bg-white/5 p-5 rounded-2xl border text-gray-300 font-medium text-sm transition-all text-center"
                  >
                    <XCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <motion.div 
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.6 }}
                className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 shadow-xl group-hover:shadow-red-600/20"
              >
                <img 
                  src={optimizeImage("https://i.ibb.co/nNWmxzmf/image.png", 800, 70)} 
                  alt="Qualidade Ruim"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover contrast-125 opacity-60 group-hover:opacity-40 transition-opacity rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              </motion.div>
              {/* Floating Badge */}
              <div className="absolute -bottom-3 -left-3 bg-red-600 text-white px-3 py-1.5 rounded-xl shadow-[0_10px_20px_rgba(220,38,38,0.4)] rotate-[-6deg] z-20">
                <div className="text-xl font-black tracking-tighter">R$350+</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 8. BOX QUALIDADE SHOE (PREMIUM REESTILIZADO) */}
      <section className="px-4 max-w-7xl mx-auto mb-32 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-950 text-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(34,197,94,0.2)] relative overflow-hidden border border-white/5 p-[15px] pb-[30px] group transition-all duration-500 hover:shadow-[0_48px_80px_-16px_rgba(34,197,94,0.3)]"
        >
          {/* Animated Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out"></div>
          
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] -ml-48 -mt-48 group-hover:bg-brand-green/20 transition-colors duration-700"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] -mr-24 -mb-24"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.6 }}
                className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 shadow-xl group-hover:shadow-brand-green/30"
              >
                <img 
                  src={optimizeImage("https://i.ibb.co/sdZDJTZj/af.png", 800, 75)} 
                  alt="Qualidade Premium"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              </motion.div>
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-brand-green text-white px-3 py-1.5 rounded-xl shadow-[0_10px_20px_rgba(34,197,94,0.4)] rotate-[6deg] z-20">
                <div className="text-xl font-black tracking-tighter text-white">R$170</div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.85] text-white">
                O padrão <br />
                <span className="animate-gradient-green">do Shoe</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  <>Couro legítimo e <span className="text-white font-black">materiais premium</span></>,
                  <>Qualidades <span className="text-white font-black">média, alta e 1:1</span></>,
                  <>Embalagens <span className="text-white font-black">originais e acessórios</span></>,
                  <>Garantia total de <span className="text-white font-black">satisfação</span></>,
                  <><span className="text-white font-black">10.000+ peças</span> disponíveis</>
                ].map((text, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ scale: 1, boxShadow: "0 0 0px rgba(34, 197, 94, 0)", borderColor: "rgba(255, 255, 255, 0.1)" }}
                    whileInView={{ 
                      boxShadow: "0 0 25px rgba(34, 197, 94, 0.25)", 
                      borderColor: "rgba(34, 197, 94, 0.4)" 
                    }}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    className="flex flex-col items-center gap-3 bg-white/5 p-5 rounded-2xl border text-gray-300 font-medium text-sm transition-all text-center"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 9. O QUE VOCÊ PODE IMPORTAR (DARK & SHINY) */}
      <section className="bg-black py-32 relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_70%)]">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-green/20 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-green/15 blur-[140px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-green/10 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>

        <div className="px-4 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[52px] md:text-[52px] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              O que você pode <br />
              <span className="animate-gradient-green pr-[7px] pl-0 pb-0">importar?</span>
            </h2>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto font-medium">
              Com o Shoe, você tem acesso às fábricas de diversos nichos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Tênis de Marcas", 
                desc: "A especialização do Shoe, todas as marcas com qualidade média, alta e 1:1", 
                images: [
                  "https://i.ibb.co/BVvp4yqn/t2.png",
                  "https://i.ibb.co/KxKfhLHw/t3.png",
                  "https://i.ibb.co/qYJDD7dw/tenis.png"
                ]
              },
              { 
                title: "Perfumes", 
                desc: "Fragrâncias idênticas e com alta fixação", 
                images: [
                  "https://i.ibb.co/DPty7cTY/p1.png",
                  "https://i.ibb.co/WNtCqnWn/p2.png",
                  "https://i.ibb.co/XkXFTVRR/p3.png"
                ]
              },
              { 
                title: "Acessórios", 
                desc: "Relógios, cintos, bolsas, bonés e muito mais", 
                images: [
                  "https://i.ibb.co/b57rrZ3C/ac2.png",
                  "https://i.ibb.co/0jX3MrfR/ac3.png",
                  "https://i.ibb.co/200pDDrF/ac1.png"
                ]
              },
              { 
                title: "Roupas", 
                desc: "Jaquetas, camisetas, calças, o que você imaginar de diversas marcas", 
                images: [
                  "https://picsum.photos/seed/shirt-1/600/600",
                  "https://picsum.photos/seed/jacket-1/600/600",
                  "https://picsum.photos/seed/hoodie-1/600/600"
                ]
              }
            ].map((item, idx) => (
              <ImportCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. SEÇÃO DE BRINDES (BONUS REESTILIZADO) */}
      <section className="px-4 max-w-6xl mx-auto mb-32 flex flex-col items-center relative">
        {/* Section Background Glow */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-green/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-[52px] md:text-[52px] font-black italic tracking-tighter leading-none pt-[35px]">
            Bônus <span className="animate-gradient-green">exclusivos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Bonus #1 */}
          <motion.div 
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            whileInView={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: "0 0 50px rgba(34, 197, 94, 0.2)",
              borderColor: "rgba(34, 197, 94, 0.3)"
            }}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-zinc-900 text-white p-10 rounded-[40px] relative overflow-hidden group shadow-2xl flex flex-col items-center text-center border border-white/10 h-full transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/15 blur-[100px] -mr-32 -mt-32 group-hover:bg-brand-green/25 transition-colors"></div>
            
            <motion.div 
              whileInView={{ rotate: 6, scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
              viewport={{ margin: "-40% 0px -40% 0px" }}
              className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.3)] transition-all"
            >
              <BookOpen className="w-8 h-8 text-black" />
            </motion.div>

            <div className="mb-4 px-3 py-1 bg-brand-green/10 text-brand-green font-black text-[10px] rounded-full tracking-widest uppercase border border-brand-green/20">
              Bônus #1
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tighter">Catálogo VIP <br /> de Fábricas</h3>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed font-normal">
              Acesso a um catálogo com 40.000+ imagens de produtos e atualizações diárias direto da China.
            </p>

            <div className="mt-auto w-full flex flex-col items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-zinc-900 overflow-hidden shadow-lg group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                    <img 
                      src={`https://picsum.photos/seed/user-bonus-${i}/100/100`} 
                      alt="User" 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-brand-green flex items-center justify-center text-black font-black text-xs">
                  +10k
                </div>
              </div>
              <div className="text-brand-green font-black text-xs tracking-widest uppercase">Atualizado hoje</div>
            </div>
          </motion.div>

          {/* Bonus #2 */}
          <motion.div 
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            whileInView={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: "0 0 50px rgba(34, 197, 94, 0.2)",
              borderColor: "rgba(34, 197, 94, 0.3)"
            }}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-zinc-900 text-white p-10 rounded-[40px] relative overflow-hidden group shadow-2xl flex flex-col items-center text-center border border-white/10 h-full transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/15 blur-[100px] -mr-32 -mt-32 group-hover:bg-brand-green/25 transition-colors"></div>
            
            <motion.div 
              whileInView={{ rotate: 6, scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
              viewport={{ margin: "-40% 0px -40% 0px" }}
              className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.3)] transition-all"
            >
              <Users className="w-8 h-8 text-black" />
            </motion.div>

            <div className="mb-4 px-3 py-1 bg-brand-green/10 text-brand-green font-black text-[10px] rounded-full tracking-widest uppercase border border-brand-green/20">
              Bônus #2
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tighter">Comunidade <br /> VIP</h3>
            <p className="text-gray-400 mb-10 text-lg font-normal leading-relaxed">
              Grupo exclusivo para compartilhar importações, suporte com admins e dicas de revenda.
            </p>

            <div className="mt-auto w-full flex justify-center">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-left">
                <div className="relative">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10">
                    <Zap className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green rounded-full border-2 border-zinc-900 animate-pulse"></div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Suporte em Tempo Real</div>
                  <div className="text-gray-500 text-xs">Admins online agora</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. TEXTO DE APLICABILIDADE (CENTRALIZADO) */}
      <section className="px-4 max-w-6xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-zinc-900 text-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden border border-white/10 p-8 md:p-20 group flex flex-col items-center text-center"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[140px] -mr-64 -mt-64 group-hover:bg-brand-green/30 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10 max-w-4xl w-full">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-green text-black font-black text-[10px] rounded-full mb-8 tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <Target className="w-3 h-3" /> Público Alvo
            </div>
            
            <h2 className="text-[52px] md:text-[52px] font-black mb-10 tracking-tighter leading-[0.85]">
              Para quem é esse <br />
              <span className="animate-gradient-green pr-[4px] pl-0">acesso?</span>
            </h2>
            
            <p className="text-xl md:text-3xl text-gray-400 leading-tight font-normal mb-16 italic max-w-2xl mx-auto">
              "O mercado de revenda mudou. Ou você tem a fonte, ou você é o lucro de alguém."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { title: "Revendedores", desc: <span>Para quem quer <span className="text-white font-black">margens mais altas e lucrar mais.</span></span>, icon: <TrendingDown className="w-5 h-5" /> },
                { title: "Importadores", desc: <span>Pague apenas o custo real do produto <span className="text-white font-black">sem margens e burocracia de agentes.</span></span>, icon: <Layers className="w-5 h-5" /> },
                { title: "Exigentes", desc: <span>Quem quer a melhor qualidade possível <span className="text-white font-black">sem precisar pagar +R$500</span> por uma peça.</span>, icon: <Star className="w-5 h-5" /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ y: 0, scale: 1 }}
                  whileInView={{ y: -8, scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-4 transition-all group/item"
                >
                  <motion.div 
                    whileInView={{ rotate: 6, scale: 1.1 }}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_30px_rgba(34,197,94,0.3)] transition-transform"
                  >
                    <div className="text-black">{item.icon}</div>
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 11.5 GARANTIA */}
      <section className="px-4 mb-32 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-[40px] border border-white/10 p-8 md:p-16 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-shrink-0 relative">
              {/* Modern Guarantee Badge */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-brand-green/30 rounded-full"
                />
                <div className="absolute inset-4 border-2 border-brand-green rounded-full flex items-center justify-center bg-brand-green/5 backdrop-blur-sm">
                  <div className="text-center">
                    <span className="block text-7xl md:text-8xl font-black text-brand-green leading-none">7</span>
                    <span className="block text-sm md:text-base font-black text-white uppercase tracking-[0.2em]">Dias</span>
                  </div>
                </div>
                {/* Decorative Icon */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-900 px-2">
                  <ShieldCheck className="w-8 h-8 text-brand-green" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter leading-tight">
                Sua satisfação <br />
                <span className="text-brand-green">ou seu dinheiro de volta.</span>
              </h3>
              <div className="w-20 h-1 bg-white/20 mb-8 mx-auto md:mx-0"></div>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Se você simplesmente não gostar do atendimento, fornecedores ou qualquer outra coisa em até uma semana, <span className="text-white font-bold underline decoration-brand-green decoration-2 underline-offset-4">devolvemos 100% do seu dinheiro.</span> Basta nos enviar uma mensagem no Whatsapp.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 12. BLOCO DE OFERTA FINAL (REESTILIZADO) */}
      <section id="oferta" className="px-4 py-40 bg-black text-white text-center relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-green/20 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-green/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-[52px] font-black mb-8 tracking-tighter leading-[0.85] italic font-sans">
            Domine o <br />
            <span className="animate-gradient-green pr-[2px]">mercado</span>
          </h2>
          
          <p className="text-gray-400 font-medium text-xl md:text-2xl mb-20 max-w-2xl mx-auto leading-tight">
            A oportunidade de ouro para você <span className="text-white font-bold">parar de ser explorado</span> pelos preços do Brasil.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-20 items-stretch">
            {/* Price Card */}
            <div className="lg:col-span-3 bg-zinc-900/50 backdrop-blur-xl p-12 rounded-[48px] border border-white/10 flex flex-col justify-center text-center relative overflow-hidden group font-sans">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingDown className="w-32 h-32 text-brand-green" />
              </div>
              
              <p className="text-gray-500 text-xl mb-4 line-through decoration-brand-green/50 decoration-2">De R$ 97,00 por apenas:</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl md:text-4xl font-black text-brand-green italic">12x</span>
                <div className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
                  <span className="text-3xl md:text-4xl align-top mr-1">R$</span>2,99
                </div>
              </div>
              <p className="text-gray-400 mt-6 font-bold text-lg">Ou R$ 29,90 à vista no PIX</p>
            </div>
            
            {/* Features Card */}
            <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-xl p-12 rounded-[48px] border border-white/10 flex flex-col justify-center text-white relative overflow-hidden font-sans">
              <h3 className="text-3xl font-black leading-none mb-8">O que você recebe:</h3>
              
              <ul className="space-y-6 text-left font-bold text-xl">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-7 h-7 mt-1 flex-shrink-0 text-brand-green" /> 
                  <span>Acesso Direto <br /><span className="text-white/60 text-sm font-medium">Tenha os fornecedores no seu Whatsapp</span></span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-7 h-7 mt-1 flex-shrink-0 text-brand-green" /> 
                  <span>Suporte 24H <br /><span className="text-white/60 text-sm font-medium">Comunidade VIP para networking e suporte</span></span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-7 h-7 mt-1 flex-shrink-0 text-brand-green" /> 
                  <span>Guia Passo a Passo <br /><span className="text-white/60 text-sm font-medium">Aula gravada te ensinando a fazer sua primeira importação</span></span>
                </li>
              </ul>
            </div>
          </div>

          <motion.a 
            href="https://checkout.exemplo.com" 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            className="group relative block w-full py-6 bg-brand-green text-white font-semibold text-xl md:text-2xl rounded-2xl shadow-[0_20px_60px_rgba(34,197,94,0.3)] transition-all overflow-hidden font-sans"
          >
            {/* Animated Glow Layer */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-brand-green blur-2xl -z-10"
            />

            {/* Shimmering Light Effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.5
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 z-0"
            />
            
            <span className="relative z-10 flex items-center justify-center gap-4 italic tracking-tight">
              Quero meu acesso agora <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>

            {/* Outer Glow Pulse */}
            <div className="absolute -inset-4 bg-brand-green/30 blur-3xl group-hover:bg-brand-green/50 transition-colors -z-20"></div>
          </motion.a>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-gray-500 font-bold uppercase text-xs tracking-[0.2em] font-sans">
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
              <ShieldCheck className="w-5 h-5 text-brand-green" /> Compra 100% Segura
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
              <RefreshCcw className="w-5 h-5 text-brand-green" /> 7 Dias de Garantia
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ (ACORDEÃO) */}
      <section className="px-4 py-32 max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-[52px] font-black text-center mb-16 tracking-tighter leading-[0.85] italic font-sans">
          Dúvidas <br />
          <span className="text-brand-green">frequentes</span>
        </h2>
        <div className="space-y-6 w-full">
          {[
            { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com todos os links, contatos e o guia passo a passo para começar a importar hoje mesmo." },
            { q: "Preciso saber falar chinês ou inglês?", a: "Não! Nosso suporte e o sistema do Agente Shoe são totalmente em português para facilitar sua experiência e garantir que você não erre nada." },
            { q: "Qual o valor mínimo para importar?", a: "Não existe valor mínimo. Você pode comprar desde um único par de meias para uso próprio até centenas de tênis para sua loja de revenda." },
            { q: "Os produtos são realmente de qualidade?", a: "Trabalhamos apenas com fábricas que disponibilizam vídeos antes do envio, mostrando costuras e material. Além de oferecer diversas qualidades que variam de acordo com o seu perfil como cliente." },
            { q: "E se eu não gostar do conteúdo?", a: "Oferecemos 7 dias de garantia incondicional. Se você não ficar satisfeito com o conteúdo ou achar que não é para você, devolvemos 100% do seu dinheiro." }
          ].map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ boxShadow: "none" }}
              whileInView={{ boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className="border-2 border-gray-100 rounded-[30px] overflow-hidden bg-white shadow-sm transition-shadow"
            >
              <motion.button 
                onClick={() => toggleFaq(idx)}
                whileInView={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="w-full p-8 flex items-center justify-between text-center font-semibold text-xl transition-colors"
              >
                <div className="w-10 h-10 flex-shrink-0"></div> {/* Spacer for centering */}
                <span className="flex-1">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-all ${openFaq === idx ? 'bg-brand-green text-white rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </motion.button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-gray-500 text-lg leading-relaxed font-normal text-center">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky CTA for Mobile */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:hidden"
          >
            <motion.a 
              href="#oferta"
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-full py-4 bg-brand-green text-white font-black text-lg rounded-xl shadow-[0_-10px_30px_rgba(34,197,94,0.3)]"
            >
              QUERO MEU ACESSO AGORA <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 bg-black text-white text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-gray-500 text-sm font-medium tracking-tight">
            Davi Arruda - Soluções Digitais. Todos os direitos reservados © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
