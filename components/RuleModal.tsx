import React from 'react';
import { Icons } from '../constants';

interface RuleModalProps {
  title: string;
  type: string;
  description: string;
  onClose: () => void;
}

export default function RuleModal({ title, type, description, onClose }: RuleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111] border-2 border-[#333] rounded-lg w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="p-4 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center">
          <div>
            <h3 className="text-white gothic-font uppercase tracking-widest font-bold text-lg">{title}</h3>
            <p className="text-[10px] text-yellow-500 uppercase tracking-widest">{type}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {description || "No detailed information available."}
          </p>
        </div>
        <div className="p-4 bg-[#0a0a0a] border-t border-[#333] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#333] hover:bg-[#444] text-white uppercase font-bold text-xs tracking-widest transition-colors rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
