import React, { useState } from 'react';
import { CharacterData } from '../types';
import { Icons } from '../constants';

interface RelicStats {
  armor?: any;
  weapon?: any;
}

interface RelicItem {
  name: string;
  chapter: string;
  type: string;
  description: string;
  summary?: string;
  stats?: RelicStats;
  modifiers?: any;
  requiredSpecialization?: string;
}

interface RelicCardProps {
  relic: RelicItem;
  character: CharacterData;
  onRequisition?: (relic: RelicItem) => void;
  onToggle?: () => void;
  isSelected?: boolean;
  selectionMode?: boolean;
}

const RelicCard: React.FC<RelicCardProps> = ({ relic, character, onRequisition, onToggle, isSelected, selectionMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isChapterAllowed = relic.chapter === character.chapter || relic.chapter === "Deathwatch" || relic.chapter === "All";
  const isSpecializationAllowed = !relic.requiredSpecialization || relic.requiredSpecialization === character.specialization;
  const isAllowed = isChapterAllowed && isSpecializationAllowed;

  // Always show summary (rules) by default
  // Show full description (lore + rules) when expanded
  
  return (
    <div 
      className={`bg-[#111] border ${isSelected ? 'border-green-600 bg-green-900/10' : 'border-[#333]'} p-4 rounded group hover:border-[#ffd700] transition-all relative overflow-hidden ${!isAllowed ? 'opacity-50 grayscale' : ''} cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icons.Skull />
      </div>
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-start gap-3">
          {selectionMode && (
            <div 
              className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors z-20 ${isSelected ? 'bg-green-600 border-green-600' : 'border-gray-600 bg-black hover:border-gray-400'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isAllowed && onToggle) onToggle();
              }}
            >
              {isSelected && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-[#ffd700] uppercase tracking-widest">{relic.name}</h4>
            <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider block mt-1">{relic.chapter} Relic</span>
          </div>
        </div>
        {!selectionMode && (
          <button
            disabled={!isAllowed}
            onClick={(e) => {
              e.stopPropagation();
              onRequisition && onRequisition(relic);
            }}
            className={`${isAllowed ? 'bg-[#8b0000] hover:bg-[#a00000] text-white' : 'bg-[#333] text-gray-500 cursor-not-allowed'} px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest transition-colors shadow-lg`}
          >
            {isAllowed ? 'Requisition' : 'Restricted'}
          </button>
        )}
      </div>

      <div className="relative z-10 border-t border-[#333] pt-2 mt-2">
        <p className="text-[11px] text-gray-300 leading-relaxed font-bold">
          <span className="text-[#8b0000] uppercase text-[9px] tracking-wider mr-1">Rules:</span>
          {relic.summary || "No summary available."}
        </p>
        {!isExpanded && (
          <div className="text-[9px] text-[#ffd700] mt-2 uppercase font-bold tracking-wider text-center border-t border-[#222] pt-1 opacity-70">
            [Click to view full history]
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3 animate-fadeIn">
          <div className="p-3 bg-black/50 border border-[#333] rounded text-[10px] text-gray-400 italic">
            <div className="uppercase font-bold text-gray-500 mb-1 not-italic">Archival Record:</div>
            {relic.description}
          </div>

          {(relic.stats?.weapon || relic.stats?.weapons) && (
            <div className="p-3 bg-[#0c0c0c] border border-[#333] rounded">
              <div className="uppercase font-bold text-[#8b0000] text-[10px] mb-2 tracking-wider">Weapon Profile</div>
              <div className="space-y-3">
                {[...(relic.stats?.weapons || []), ...(relic.stats?.weapon ? [relic.stats.weapon] : [])].map((weapon: any, idx) => (
                  <div key={idx} className="text-[10px] space-y-1 border-b border-[#222] last:border-0 pb-2 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-300">{weapon.name}</span>
                      <span className="text-gray-500">{weapon.class}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-gray-400">
                      <div><span className="text-gray-600 uppercase text-[8px]">Rng:</span> {weapon.range}</div>
                      <div><span className="text-gray-600 uppercase text-[8px]">RoF:</span> {weapon.rof || '-'}</div>
                      <div><span className="text-gray-600 uppercase text-[8px]">Dmg:</span> {weapon.damage}</div>
                      <div><span className="text-gray-600 uppercase text-[8px]">Pen:</span> {weapon.pen}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-gray-400">
                      <div><span className="text-gray-600 uppercase text-[8px]">Clip:</span> {weapon.clip?.max || '-'}</div>
                      <div><span className="text-gray-600 uppercase text-[8px]">Rld:</span> {weapon.reload || '-'}</div>
                    </div>
                    <div><span className="text-gray-600 uppercase text-[8px]">Special:</span> <span className="text-[#8b0000]">{weapon.special}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RelicCard;
