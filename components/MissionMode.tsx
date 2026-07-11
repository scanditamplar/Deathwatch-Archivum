import React, { useState } from 'react';
import { CharacterData } from '../types';
import NarrativeMode from './NarrativeMode';
import TacticalMode from './TacticalMode';
import TestCalculator from './TestCalculator';

interface MissionModeProps {
  character: CharacterData;
  updateCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
}

export default function MissionMode({ character, updateCharacter }: MissionModeProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'tactical'>('narrative');

  return (
    <div className="flex-1 overflow-auto p-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex gap-4 border-b border-[#333] mb-6">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`pb-2 px-4 uppercase tracking-widest text-sm font-bold transition-colors ${
              activeTab === 'narrative' 
                ? 'text-yellow-500 border-b-2 border-yellow-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Narrative Mode
          </button>
          <button
            onClick={() => setActiveTab('tactical')}
            className={`pb-2 px-4 uppercase tracking-widest text-sm font-bold transition-colors ${
              activeTab === 'tactical' 
                ? 'text-yellow-500 border-b-2 border-yellow-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Tactical Mode
          </button>
        </div>

        {activeTab === 'narrative' && <NarrativeMode character={character} updateCharacter={updateCharacter} />}
        {activeTab === 'tactical' && <TacticalMode character={character} updateCharacter={updateCharacter} />}

        <div className="pt-8">
          <TestCalculator character={character} />
        </div>
      </div>
    </div>
  );
}
