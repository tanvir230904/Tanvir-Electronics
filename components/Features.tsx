
import React from 'react';
import { 
  Sparkles, ShieldCheck, Truck, RotateCcw, 
  Search, Fingerprint, Zap, Award, ArrowRight, Gamepad2 
} from 'lucide-react';

interface FeaturesProps {
  onExplore: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onExplore }) => {
  const mainFeatures = [
    {
      icon: <Search className="text-amber-500" size={32} />,
      title: "Tanvir AI Search",
      description: "Our proprietary AI engine searches global markets to bring you the best real-time electronic deals directly within our catalog."
    },
    {
      icon: <Zap className="text-violet-500" size={32} />,
      title: "48H Priority Delivery",
      description: "Experience the fastest delivery network in Bangladesh. We prioritize your gadgets so they reach your doorstep in record time."
    },
    {
      icon: <ShieldCheck className="text-green-500" size={32} />,
      title: "Official Warranty",
      description: "Every item in our shop is 'Tanvir Quality Certified' and comes with a 12-month official manufacturer warranty."
    },
    {
      icon: <Fingerprint className="text-blue-500" size={32} />,
      title: "Tanvir Tech ID",
      description: "A secure, unique digital identifier for every customer, ensuring personalized support and exclusive membership perks."
    },
    {
      icon: <RotateCcw className="text-red-500" size={32} />,
      title: "14-Day Returns",
      description: "Not satisfied? No problem. Our hassle-free return policy ensures you can shop with absolute peace of mind."
    },
    {
      icon: <Gamepad2 className="text-indigo-600" size={32} />,
      title: "Next-Gen Gaming",
      description: "Explore our elite collection of Gaming Consoles. From PS5 Pro to Steam Deck, we bring the ultimate gaming experience to your home."
    },
    {
      icon: <Award className="text-amber-600" size={32} />,
      title: "Premium Curation",
      description: "We don't sell everything. We only sell the best. Our 2025 flagship lineup is hand-picked by tech experts."
    },
    {
      icon: <Truck className="text-blue-600" size={32} />,
      title: "Global Sourcing",
      description: "We source directly from manufacturers in Japan, USA, and Germany to ensure you get authentic global versions of every product."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <Sparkles size={14} className="animate-pulse" />
          The Future of Retail
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
          Revolutionizing <br/><span className="text-violet-600">Electronics</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          At Tanvir Electronics, we don't just sell gadgets. We provide an ecosystem of quality, speed, and trust tailored for the modern Bangladeshi user.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {mainFeatures.map((feature, idx) => (
          <div 
            key={idx} 
            className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-violet-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative rounded-[4rem] bg-black p-12 md:p-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Ready to experience <br/>Flagship Tech?
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 font-medium">
            Join thousands of satisfied customers who have upgraded their lifestyle with Tanvir Electronics.
          </p>
          <button 
            onClick={onExplore}
            className="group flex items-center gap-4 bg-violet-600 text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95"
          >
            Start Exploring Collection
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
