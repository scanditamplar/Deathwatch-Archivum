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
  stats?: RelicStats;
}

interface RelicCardProps {
  relic: RelicItem;
  character: CharacterData;
  onRequisition: (relic: RelicItem) => void;
}

const RelicCard: React.FC<RelicCardProps> = ({ relic, character, onRequisition }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAllowed = relic.chapter === character.chapter;

  // Split description into relevant info (first sentence or two) and lore
  // For now, we'll just show the first 300 characters as preview if not expanded
  const previewLength = 300;
  const showPreview = relic.description.length > previewLength && !isExpanded;
  const displayDescription = showPreview 
    ? `${relic.description.substring(0, previewLength)}...` 
    : relic.description;

  return (
    <div 
      className={`bg-[#111] border border-[#333] p-4 rounded group hover:border-[#ffd700] transition-all relative overflow-hidden ${!isAllowed ? 'opacity-50 grayscale' : ''} cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icons.Skull />
      </div>
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div>
          <h4 className="text-sm font-bold text-[#ffd700] uppercase tracking-widest">{relic.name}</h4>
          <span className="text-[10px] text-red-800 font-bold uppercase tracking-wider block mt-1">{relic.chapter} Relic</span>
        </div>
        <button
          disabled={!isAllowed}
          onClick={(e) => {
            e.stopPropagation();
            onRequisition(relic);
          }}
          className={`${isAllowed ? 'bg-[#8b0000] hover:bg-[#a00000] text-white' : 'bg-[#333] text-gray-500 cursor-not-allowed'} px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest transition-colors shadow-lg`}
        >
          {isAllowed ? 'Requisition' : 'Restricted'}
        </button>
      </div>

      <div className="relative z-10 border-t border-[#333] pt-2 mt-2">
        <p className="text-[11px] text-gray-400 leading-relaxed italic">
          {displayDescription}
        </p>
        {showPreview && (
          <div className="text-[9px] text-[#ffd700] mt-1 uppercase font-bold tracking-wider">
            [Click to expand data-slate]
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 p-3 bg-black/50 border border-[#333] rounded text-[10px] text-gray-300 animate-fadeIn">
          <div className="uppercase font-bold text-[#8b0000] mb-1">Full Data-Slate Record:</div>
          {relic.description}
        </div>
      )}
    </div>
  );
};

export default RelicCard;
