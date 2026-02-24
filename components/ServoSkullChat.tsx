
import React, { useState, useRef, useEffect } from 'react';
import { askServoSkull } from '../services/geminiService';
import { CharacterData } from '../types';
import { Icons } from '../constants';

interface ServoSkullChatProps {
  character: CharacterData;
}

const ServoSkullChat: React.FC<ServoSkullChatProps> = ({ character }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Welcome, Brother ${character.name}. I am Arch-Logis 7-Theta. How may I assist your service to the Golden Throne?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [skullPortrait, setSkullPortrait] = useState<string>(() => {
    // High-fidelity Servo Skull visual provided by user
    const defaultImg = 'https://i.ibb.co/JFmRLWWJ/tarek-siela-tbrender-main-camera-linkdien.png'; 
    const saved = localStorage.getItem('servo_skull_portrait');
    
    // Check if we have a valid saved image, otherwise use the requested default
    if (saved && saved !== 'undefined' && saved !== 'null' && saved.length > 10) {
      return saved;
    }
    return defaultImg;
  });

  useEffect(() => {
    localStorage.setItem('servo_skull_portrait', skullPortrait);
  }, [skullPortrait]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSkullPortrait(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const clearChat = () => {
    setMessages([
      { role: 'ai', text: `Archival memory purged. How may I assist your service to the Golden Throne, Brother ${character.name}?` }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const context = `
      Name: ${character.name}, 
      Chapter: ${character.chapter}, 
      Spec: ${character.specialization},
      Personal Demeanor: ${character.personalDemeanor},
      Chapter Demeanor: ${character.chapterDemeanor}
    `;
    const aiResponse = await askServoSkull(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-[#1a1a1a] border-l border-[#333] flex flex-col h-full overflow-hidden shadow-2xl">
      {/* Interactive Tactical Header */}
      <div 
        onClick={triggerUpload} 
        className="group relative h-64 bg-black border-b border-[#8b0000] cursor-pointer overflow-hidden flex items-center justify-center transition-all hover:border-[#ffd700]"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        
        <img 
          src={skullPortrait} 
          alt="Servo Skull Visual" 
          className="w-full h-full object-cover opacity-80 grayscale-[0.3] contrast-110 brightness-90 transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-110" 
          onError={(e) => {
            // Fallback in case of external link expiry or blockage
            (e.target as HTMLImageElement).src = 'https://i.imgur.com/8N4p4m3.png';
          }}
        />
        
        {/* Tactical Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-px w-full bg-red-600/40 absolute animate-[scan_3s_linear_infinite] shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
          <div className="absolute inset-0 border-[12px] border-black/50 pointer-events-none"></div>
          
          {/* CRT effect overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-[length:100%_3px,4px_100%] pointer-events-none opacity-20"></div>
          
          {/* Lens glare / vignetting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)] opacity-70"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-8">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              clearChat();
            }}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-red-900/60 border border-red-900/30 rounded-full transition-all group/clear z-30"
            title="Purge Archival Memory"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 group-hover/clear:text-white transition-colors"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
          <div className="bg-black/60 backdrop-blur-md border border-[#8b0000]/40 px-4 py-1.5 rounded-sm mb-2 transition-all group-hover:border-[#ffd700]/60 shadow-lg">
            <h2 className="text-[11px] font-bold gothic-font uppercase tracking-[0.4em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              Arch-Logis 7-Theta
            </h2>
          </div>
          <div className="text-[7px] text-red-600 font-bold uppercase tracking-[0.45em] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md bg-black/50 px-3 rounded-full border border-red-900/20">
            +++ COGITATOR LINK ESTABLISHED +++
          </div>
        </div>
        
        <div className="absolute bottom-2 left-0 right-0 px-2 text-center pointer-events-none text-[6px] font-bold text-red-900 uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">
          LINK: ORDO XENOS // ENCRYPTION: EXTREMIS
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#0c0c0c] relative">
        {/* Ambient background pattern for messages */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-xs leading-relaxed transition-all ${
              m.role === 'user' 
                ? 'bg-[#222] text-gray-300 border border-[#444] rounded-br-none shadow-lg' 
                : 'bg-[#1a1a1a] text-[#ffd700] border-l-2 border-[#8b0000] italic shadow-[0_0_25px_rgba(139,0,0,0.1)] rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 ml-1">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce"></div>
            </div>
            <div className="text-[9px] text-[#8b0000] uppercase font-bold tracking-[0.25em] animate-pulse">
              Cogitating...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#1a1a1a] border-t border-[#333] relative z-20 shadow-[0_-15px_30px_rgba(0,0,0,0.6)]">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query the archives..."
              className="w-full bg-[#0c0c0c] border border-[#444] rounded p-3 text-xs text-gray-200 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40 placeholder:text-gray-700 transition-all shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-800 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
          </div>
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#8b0000] hover:bg-[#a00000] text-white px-5 py-2.5 rounded transition-all duration-300 disabled:opacity-50 flex items-center justify-center border border-transparent hover:border-[#ffd700]/50 shadow-xl active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm group-hover:rotate-12 transition-transform"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServoSkullChat;
