
import React from 'react';
import { Technician } from '../types';
import { 
  Wrench, Star, Phone, Mail, MessageSquare, 
  ShieldCheck, Clock, Award, CheckCircle2, Facebook
} from 'lucide-react';

interface TechnicianSectionProps {
  technicians: Technician[];
}

const TechnicianSection: React.FC<TechnicianSectionProps> = ({ technicians }) => {
  const handleChat = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-200">
          <Wrench size={14} />
          Expert Technical Support
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
          Professional <br/><span className="text-amber-500">Care</span> For Your Tech
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Need a repair or a custom build? Contact our certified technicians for priority service and original parts. You can now chat with them directly on Facebook!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {technicians.length === 0 ? (
           <div className="lg:col-span-3 text-center py-20 bg-white rounded-[3rem] border border-gray-100">
              <p className="text-gray-400 font-bold">No technicians available in the database yet.</p>
           </div>
        ) : (
          technicians.map((tech) => (
            <div key={tech.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              {/* Header / Avatar */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img 
                  src={tech.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'} 
                  alt={tech.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{tech.name}</h3>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">{tech.specialty}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                    <Star size={14} className="text-amber-500" fill="currentColor" />
                    <span className="text-white text-xs font-black">{tech.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Clock size={12} /> Experience
                    </p>
                    <p className="font-bold text-gray-900">{tech.experience}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Award size={12} /> Service History
                    </p>
                    <p className="font-bold text-gray-900">{tech.completedJobs}+ Jobs</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium p-2 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer" onClick={() => window.open(`tel:${tech.phone}`)}>
                    <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                    {tech.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium p-2 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer" onClick={() => window.open(`mailto:${tech.email}`)}>
                    <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                      <Mail size={14} />
                    </div>
                    <span className="truncate">{tech.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-600 font-bold p-2 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer" onClick={() => handleChat(tech.facebookUrl)}>
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Facebook size={14} />
                    </div>
                    <span className="truncate">Facebook Profile</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex gap-3">
                  <button 
                    onClick={() => handleChat(tech.facebookUrl)}
                    className="flex-1 bg-black text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    <MessageSquare size={14} />
                    Direct Chat
                  </button>
                  <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-all border border-gray-100">
                    <ShieldCheck size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 flex items-center justify-center gap-2">
                <CheckCircle2 size={12} className="text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tanvir Verified Professional</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-20 bg-white border border-gray-100 rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
             <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-6">Need Home Service?</h3>
             <p className="text-gray-500 font-medium text-lg leading-relaxed">
               Our technicians can visit your location for bulk orders or major appliance installations. Schedule a consultation today.
             </p>
          </div>
          <button className="whitespace-nowrap bg-amber-500 text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all shadow-2xl active:scale-95">
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianSection;
