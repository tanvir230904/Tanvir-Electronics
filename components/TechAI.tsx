
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Loader2, Sparkles, User, 
  Cpu, Zap, ShieldCheck, MessageSquare,
  ArrowRight, Trash2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const TechAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm your Tanvir Elect AI Assistant. Ask me anything about electronics, gadgets, or tech support!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [{ text: `You are a tech expert assistant for Tanvir Electronics, a premium electronics shop in Bangladesh. 
            Answer the following tech-related question concisely and professionally. 
            If the question is about buying products, recommend checking our shop.
            User Question: ${userMsg}` }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful and knowledgeable tech expert for Tanvir Electronics. You provide accurate technical advice and product information."
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request. Please try again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my brain right now. Please try again later!" }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: "Chat cleared! How can I help you today?" }]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-black p-8 text-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">Tech AI Assistant</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Online & Ready</span>
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-black text-white' : 'bg-amber-100 text-amber-600'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-gray-100 text-black rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="flex gap-4 max-w-[80%]">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="p-5 bg-white border border-gray-100 rounded-3xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="animate-spin text-amber-500" size={16} />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 shrink-0">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              placeholder="Ask about PS5 Pro, iPhone 16, or tech advice..." 
              className="w-full bg-white border border-gray-200 rounded-full px-8 py-5 pr-20 outline-none focus:border-amber-500 shadow-sm font-bold text-black transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 bg-black text-white px-6 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <Zap size={10} className="text-amber-500" />
              Real-time Answers
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={10} className="text-green-500" />
              Expert Advice
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <Sparkles size={10} className="text-violet-500" />
              AI Powered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechAI;
