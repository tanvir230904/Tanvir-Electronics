
import React from 'react';
import { ArrowRight, MousePointer2, Zap, Cpu, Radio } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-[#f8fafc]">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-xl pointer-events-none opacity-[0.03]">
        <div className="grid grid-cols-4 gap-4 aspect-square">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-black rounded-full" />
          ))}
        </div>
      </div>

      {/* Floating Electrical Icons */}
      <div className="absolute top-20 left-10 text-amber-500/20 animate-pulse hidden md:block">
        <Zap size={120} strokeWidth={1} />
      </div>
      <div className="absolute bottom-20 right-10 text-indigo-500/20 animate-bounce hidden md:block">
        <Cpu size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center pt-12">
        <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="h-[1px] w-12 bg-gray-400" />
          <span className="uppercase tracking-[0.2em] text-[10px] font-black text-amber-600">Premium Electrical & Tech Hub</span>
          <div className="h-[1px] w-12 bg-gray-400" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black select-none z-0 mb-4 drop-shadow-sm uppercase">
          TANVIR ELECT
        </h1>

        {/* Central visual representing the electrical & electronic mix */}
        <div className="relative mb-12 z-10 transition-transform duration-1000 hover:scale-[1.01] px-4 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-transparent to-indigo-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex flex-col md:flex-row gap-4 max-w-[1000px]">
            {/* Primary Large Image */}
            <div className="relative flex-2">
              <img 
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop" 
                alt="Tanvir Elect Primary"
                className="w-full h-full object-cover aspect-[4/3] md:aspect-[16/9] drop-shadow-2xl rounded-[3rem] border-8 border-white shadow-2xl"
              />
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
            {/* Secondary Electrical Detail Images */}
            <div className="hidden md:flex flex-col gap-4 w-64">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop" 
                alt="Circuit Detail"
                className="w-full h-1/2 object-cover rounded-[2rem] border-4 border-white shadow-xl"
              />
              <div className="h-1/2 bg-amber-500 rounded-[2rem] p-6 flex flex-col justify-between text-black border-4 border-white shadow-xl">
                 <Radio size={32} />
                 <div>
                   <p className="font-black text-xl uppercase leading-none">Smart<br/>Voltage</p>
                   <p className="text-[10px] font-bold mt-2 uppercase tracking-widest opacity-70">Industrial Grade</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-6 -right-6 md:right-0 animate-bounce">
            <div className="bg-black px-8 py-4 rounded-full font-black text-xs md:text-sm -rotate-6 shadow-2xl border-4 border-amber-500 text-amber-500 flex items-center gap-2">
              <Zap size={16} fill="currentColor" />
              AUTHENTIC 2025 GEAR
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-4 z-20">
          <button 
            onClick={onGetStarted}
            className="group flex items-center gap-3 bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-amber-500 hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Enter The Showroom</span>
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </button>

          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <MousePointer2 size={12} />
            <span>Powering Your Lifestyle</span>
          </div>
        </div>
      </div>

      {/* Electrical Component Widget */}
      <div className="absolute bottom-12 left-12 hidden xl:block animate-in slide-in-from-left-8 duration-1000">
        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-5 w-80">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
            <img 
                src="https://images.unsplash.com/photo-1593344484962-996055d49377?q=80&w=200&auto=format&fit=crop" 
                alt="Components" 
                className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block mb-1">New Arrivals</span>
            <p className="text-sm font-black text-black uppercase tracking-tight leading-tight">Elite Power Modules</p>
            <p className="text-[10px] text-gray-500 mt-1 font-bold">100% Copper Core Tech.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
