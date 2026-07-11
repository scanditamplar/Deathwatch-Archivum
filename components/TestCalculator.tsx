import React, { useState } from 'react';
import { CharacterData, Characteristics } from '../types';

interface Props {
  character: CharacterData;
}

const DIFFICULTIES = [
  { label: 'Hellish (-60)', value: -60 },
  { label: 'Very Hard (-30)', value: -30 },
  { label: 'Hard (-20)', value: -20 },
  { label: 'Challenging (+0)', value: 0 },
  { label: 'Ordinary (+10)', value: 10 },
  { label: 'Routine (+20)', value: 20 },
  { label: 'Easy (+30)', value: 30 },
  { label: 'Very Easy (+60)', value: 60 },
];

export default function TestCalculator({ character }: Props) {
  const [selectedChar, setSelectedChar] = useState<keyof Characteristics | ''>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(0);
  const [customModifier, setCustomModifier] = useState<number>(0);
  
  const getStat = (base: number, bonus: number, adv: number) => base + bonus + adv;

  // Find relevant skills for the selected characteristic
  const trainedSkills = character.skills.filter(s => s.mastery > 0);
  const relevantSkills = selectedChar 
    ? trainedSkills.filter(s => s.characteristic === selectedChar)
    : [];

  const otherSkills = selectedChar 
    ? trainedSkills.filter(s => s.characteristic !== selectedChar)
    : [];

  const charValue = selectedChar 
    ? getStat(character.characteristics[selectedChar].base, character.characteristics[selectedChar].bonus, character.characteristics[selectedChar].adv)
    : 0;

  const activeSkill = character.skills.find(s => s.name === selectedSkill);
  // Mastery 0 = untrained (half stat or basic only?), Mastery 1 = +0, Mastery 2 = +10, Mastery 3 = +20
  let skillBonus = 0;
  if (activeSkill) {
    if (activeSkill.mastery === 2) skillBonus = 10;
    if (activeSkill.mastery === 3) skillBonus = 20;
    // Note: If attempting an advanced skill untrained, they technically can't or it's half. We will just leave it at +0 for the base calc.
  }

  const finalTargetNumber = charValue + skillBonus + difficulty + customModifier;

  return (
    <div className="bg-[#111] border border-[#333] p-4 rounded animate-fadeIn">
      <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2 text-center md:text-left">Test Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Characteristic</label>
            <select 
              value={selectedChar} 
              onChange={(e) => {
                setSelectedChar(e.target.value as keyof Characteristics);
                setSelectedSkill('');
              }}
              className="w-full bg-black border border-[#333] text-white p-2 rounded text-sm focus:border-yellow-500 focus:outline-none"
            >
              <option value="">-- Select Characteristic --</option>
              {Object.keys(character.characteristics).map(char => (
                <option key={char} value={char}>{char}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Skill (Optional)</label>
            <select 
              value={selectedSkill} 
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full bg-black border border-[#333] text-white p-2 rounded text-sm focus:border-yellow-500 focus:outline-none"
              disabled={!selectedChar}
            >
              <option value="">-- No Skill / Basic Test --</option>
              {relevantSkills.length > 0 && (
                <optgroup label="Suggested Skills">
                  {relevantSkills.map(skill => (
                    <option key={skill.name} value={skill.name}>
                      {skill.name} {skill.mastery > 1 ? `(+${(skill.mastery - 1) * 10})` : ''}
                    </option>
                  ))}
                </optgroup>
              )}
              {otherSkills.length > 0 && (
                <optgroup label="Other Skills">
                  {otherSkills.map(skill => (
                    <option key={skill.name} value={skill.name}>
                      {skill.name} {skill.mastery > 1 ? `(+${(skill.mastery - 1) * 10})` : ''}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            {selectedChar && trainedSkills.length === 0 && (
              <div className="text-xs text-red-500 mt-1 italic">No trained skills available.</div>
            )}
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Difficulty</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full bg-black border border-[#333] text-white p-2 rounded text-sm focus:border-yellow-500 focus:outline-none"
            >
              {DIFFICULTIES.map(d => (
                <option key={d.label} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Custom Modifier</label>
            <input 
              type="number" 
              value={customModifier} 
              onChange={(e) => setCustomModifier(Number(e.target.value))}
              className="w-full bg-black border border-[#333] text-white p-2 rounded text-sm focus:border-yellow-500 focus:outline-none"
              placeholder="+/- Bonus"
            />
          </div>
        </div>

        <div className="bg-black border border-[#222] p-6 rounded flex flex-col justify-center">
          {selectedChar ? (
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between text-gray-400">
                <span>{selectedChar} Base</span>
                <span>{charValue}</span>
              </div>
              {activeSkill && (
                <div className="flex justify-between text-blue-400">
                  <span>Skill Bonus ({activeSkill.name})</span>
                  <span>+{skillBonus}</span>
                </div>
              )}
              {difficulty !== 0 && (
                <div className="flex justify-between text-yellow-400">
                  <span>Difficulty</span>
                  <span>{difficulty > 0 ? `+${difficulty}` : difficulty}</span>
                </div>
              )}
              {customModifier !== 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Custom Mod</span>
                  <span>{customModifier > 0 ? `+${customModifier}` : customModifier}</span>
                </div>
              )}
              
              <div className="border-t border-[#333] pt-2 mt-4 flex justify-between items-center">
                <span className="text-white font-bold uppercase tracking-widest">Target Number</span>
                <span className="text-3xl text-red-500 font-bold">{finalTargetNumber}</span>
              </div>
              <div className="text-center text-xs text-gray-500 mt-4 italic">
                Roll 1d100. You must roll <strong>equal to or under</strong> {finalTargetNumber} to succeed.
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 italic">
              Select a characteristic to calculate test target.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
