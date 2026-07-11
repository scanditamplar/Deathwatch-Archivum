import React, { useState } from 'react';
import { CharacterData, ALL_SKILLS } from '../types';
import RuleModal from './RuleModal';
import { TALENT_DESCRIPTIONS, TRAIT_DESCRIPTIONS, SPECIAL_WARGEAR, PROTECTIVE_WARGEAR, RELIC_WARGEAR, CATEGORY_DESCRIPTIONS, ARMOR_PATTERNS } from '../constants';

interface Props {
  character: CharacterData;
  updateCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
}

export default function NarrativeMode({ character, updateCharacter }: Props) {
  const [selectedRule, setSelectedRule] = useState<{title: string, type: string, description: string} | null>(null);

  // Helpers
  const getStat = (base: number, bonus: number, adv: number) => base + bonus + adv;

  const handleRuleClick = (name: string, type: string) => {
    let description = "No description available.";
    if (type === 'Talent') {
      const baseTalent = Object.keys(TALENT_DESCRIPTIONS).find(k => name.startsWith(k));
      description = baseTalent ? TALENT_DESCRIPTIONS[baseTalent] : description;
    } else if (type === 'Trait') {
      const baseTrait = Object.keys(TRAIT_DESCRIPTIONS).find(k => name.startsWith(k));
      description = baseTrait ? TRAIT_DESCRIPTIONS[baseTrait] : description;
    } else if (type === 'Skill') {
      const skill = character.skills.find(s => s.name === name);
      if (skill) {
        const charStat = character.characteristics[skill.characteristic];
        let armorBonus = 0;
        if (skill.characteristic === 'S') armorBonus = ARMOR_PATTERNS[character.armor.pattern]?.strengthBonus || 0;
        if (skill.characteristic === 'Ag') armorBonus = ARMOR_PATTERNS[character.armor.pattern]?.agilityBonus || 0;
        const score = getStat(charStat.base, charStat.bonus, charStat.adv) + armorBonus;
        
        const isAdvanced = ["Acrobatics", "Chem-Use", "Literacy", "Interrogation", "Invocation", "Common Lore", "Forbidden Lore", "Scholastic Lore", "Medicae", "Navigation", "Pilot", "Psyniscience", "Shadowing", "Speak Language", "Survival", "Tech-Use", "Tracking", "Trade"].some(prefix => name.startsWith(prefix));
        const isUntrained = skill.mastery === 0;
        const masteryBonus = (skill.mastery > 0 ? (skill.mastery - 1) * 10 : 0);
        
        let finalScore = 0;
        if (isUntrained) {
          finalScore = isAdvanced ? 0 : Math.ceil(score / 2);
        } else {
          finalScore = score + masteryBonus;
        }

        const hasLibrariumTexts = (character.armor.trappings || []).some(t => t.name === "Librarium Texts");
        if (hasLibrariumTexts && character.bloodRavensChoices?.librariumTextsFocus === skill.name && finalScore > 0) {
          finalScore += 3;
        }

        const isHighlySkilled = character.customSoloModeName === "Highly Skilled" && character.customSoloModeSkillChoices?.includes(skill.name);
        if (isHighlySkilled && (character.rank || 1) >= 4 && finalScore > 0) {
          finalScore += 10;
        }

        let dreadnoughtNote = "";
        if (["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(character.advancedSpeciality)) {
          if (skill.name === "Shadowing" || skill.name === "Silent Move") {
            finalScore -= 30;
            dreadnoughtNote = " (-30 Engine of War)";
          }
          if (skill.characteristic === "Int" || skill.characteristic === "Fel") {
            dreadnoughtNote = "\nNote: Dreadnought requires 1d10 <= Int Bonus for this skill.";
          }
        }
        
        let fatigueNote = character.fatigue > 0 ? `\nNote: You have ${character.fatigue} Fatigue. A -10 penalty may apply to this target.` : "";

        description = `Characteristic: ${skill.characteristic}\nMastery: ${isUntrained ? "Untrained" : skill.mastery === 1 ? "Known" : skill.mastery === 2 ? "+10" : "+20"}\nBase Target Score: ${finalScore}${dreadnoughtNote}${fatigueNote}\n`;
        
        const categoryMatch = Object.keys(CATEGORY_DESCRIPTIONS).find(cat => name.startsWith(cat));
        if (categoryMatch) {
            description += `\n${CATEGORY_DESCRIPTIONS[categoryMatch]}`;
        }
        if (skill.description) {
            description += `\n${skill.description}`;
        }
      } else {
        description = "Uses characteristic: " + (ALL_SKILLS.find(s => s.name === name)?.characteristic || "Unknown");
      }
    } else if (type === 'Wargear') {
      const allWargear = [...SPECIAL_WARGEAR, ...PROTECTIVE_WARGEAR, ...RELIC_WARGEAR];
      const found = allWargear.find(w => w.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(w.name.toLowerCase()));
      if (found) {
        description = (found as any).description || (found as any).effects || (found as any).rule || "Special Wargear.";
      } else {
        description = "Standard wargear item. Refer to core rules for specific mechanical effects if any.";
      }
    }

    setSelectedRule({
      title: name,
      type,
      description
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      {/* Left Column: Core Identity & Stats */}
      <div className="space-y-6">
        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Identity</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 uppercase">Name</span> <span className="text-gray-300 font-bold">{character.name || 'Unknown'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 uppercase">Chapter</span> <span className="text-gray-300">{character.chapter || 'Unknown'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 uppercase">Specialization</span> <span className="text-gray-300">{character.specialization || 'Unknown'}</span></div>
            {character.advancedSpeciality && <div className="flex justify-between"><span className="text-gray-500 uppercase">Rank</span> <span className="text-gray-300">{character.advancedSpeciality}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500 uppercase">Personal Demeanour</span> <span className="text-gray-300 text-right max-w-[200px]">{character.personalDemeanor}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 uppercase">Chapter Demeanour</span> <span className="text-gray-300 text-right max-w-[200px]">{character.chapterDemeanor}</span></div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Characteristics</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            {Object.entries(character.characteristics).map(([label, stat]) => (
              <div key={label} className="bg-[#1a1a1a] p-2 rounded border border-[#222]">
                <div className="text-[10px] text-gray-500 uppercase">{label}</div>
                <div className="text-lg text-white font-bold">{getStat(stat.base, stat.bonus, stat.adv)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Column: Skills & Talents */}
      <div className="space-y-6">
        <div className="bg-[#111] border border-[#333] p-4 rounded h-full">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Narrative Skills & Talents</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Trained Skills</h3>
              <div className="flex flex-wrap gap-2">
                {character.skills.filter(skill => skill.mastery > 0).map((skill, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleRuleClick(skill.name, 'Skill')}
                    className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#333] transition-colors border border-[#333] text-xs text-gray-300 rounded cursor-pointer text-left"
                  >
                    {skill.name} {skill.mastery > 1 ? `+${(skill.mastery - 1) * 10}` : ''}
                  </button>
                ))}
                {character.skills.filter(skill => skill.mastery > 0).length === 0 && <span className="text-gray-600 text-xs italic">No skills recorded</span>}
              </div>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Talents</h3>
              <div className="flex flex-wrap gap-2">
                {character.talents.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleRuleClick(t, 'Talent')}
                    className="px-2 py-1 bg-[#221a1a] hover:bg-[#3a2a2a] transition-colors border border-[#4a2a2a] text-xs text-red-200 rounded cursor-pointer text-left"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {character.traits.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleRuleClick(t, 'Trait')}
                    className="px-2 py-1 bg-[#1a221a] hover:bg-[#2a3a2a] transition-colors border border-[#2a4a2a] text-xs text-green-200 rounded cursor-pointer text-left"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Status & Inventory */}
      <div className="space-y-6">
        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Vital Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-1 flex items-center justify-center gap-2">
                Wounds
                <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: character.wounds.max } })} className="bg-[#333] hover:bg-[#444] text-[8px] px-1.5 py-0.5 rounded text-white uppercase tracking-wider">Reset</button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: Math.max(0, character.wounds.current - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-white font-bold">{character.wounds.current} <span className="text-sm text-gray-500">/ {character.wounds.max}</span></div>
                <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: Math.min(character.wounds.max, character.wounds.current + 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-red-500 uppercase mb-1">Critical Wounds</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, criticalWounds: Math.max(0, (character.criticalWounds || 0) - 1) })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-red-500 font-bold">{character.criticalWounds || 0}</div>
                <button onClick={() => updateCharacter({ ...character, criticalWounds: (character.criticalWounds || 0) + 1 })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-1 flex items-center justify-center gap-2">
                Fate Points
                <button onClick={() => updateCharacter({ ...character, fate: { ...character.fate, current: character.fate.max } })} className="bg-[#333] hover:bg-[#444] text-[8px] px-1.5 py-0.5 rounded text-white uppercase tracking-wider">Reset</button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, fate: { ...character.fate, current: Math.max(0, character.fate.current - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-yellow-500 font-bold">{character.fate.current} <span className="text-sm text-gray-500">/ {character.fate.max}</span></div>
                <button onClick={() => updateCharacter({ ...character, fate: { ...character.fate, current: Math.min(character.fate.max, character.fate.current + 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-1">Insanity</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, insanity: Math.max(0, character.insanity - 1) })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-purple-400 font-bold">{character.insanity}</div>
                <button onClick={() => updateCharacter({ ...character, insanity: character.insanity + 1 })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-1">Corruption</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, corruption: Math.max(0, character.corruption - 1) })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-red-500 font-bold">{character.corruption}</div>
                <button onClick={() => updateCharacter({ ...character, corruption: character.corruption + 1 })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded border border-[#222] text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-1">Fatigue</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, fatigue: Math.max(0, character.fatigue - 1) })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">-</button>
                <div className="text-xl text-yellow-500 font-bold">{character.fatigue}</div>
                <button onClick={() => updateCharacter({ ...character, fatigue: character.fatigue + 1 })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xs leading-none">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Equipment Overview</h2>
          <div className="space-y-4">
            <div className="text-sm text-gray-300">
              <span className="text-gray-500 uppercase text-xs mr-2">Armour:</span> 
              {character.armor.name} ({character.armor.pattern} Pattern)
            </div>

            <div className="grid grid-cols-6 gap-1 text-center text-xs">
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">Head</div>
                <div className="text-white font-bold">{character.armor.head}</div>
              </div>
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">R. Arm</div>
                <div className="text-white font-bold">{character.armor.rightArm}</div>
              </div>
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">Body</div>
                <div className="text-white font-bold">{character.armor.torso}</div>
              </div>
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">L. Arm</div>
                <div className="text-white font-bold">{character.armor.leftArm}</div>
              </div>
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">R. Leg</div>
                <div className="text-white font-bold">{character.armor.rightLeg}</div>
              </div>
              <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
                <div className="text-gray-500 mb-1">L. Leg</div>
                <div className="text-white font-bold">{character.armor.leftLeg}</div>
              </div>
            </div>

            <div className="text-sm text-gray-300">
              <span className="text-gray-500 uppercase text-xs block mb-1">Armour History:</span>
              <div className="text-xs text-gray-400 leading-relaxed bg-[#1a1a1a] p-2 rounded border border-[#222]">
                {character.history || "No recorded history."}
              </div>
            </div>

            <div className="text-sm text-gray-300">
              <span className="text-gray-500 uppercase text-xs block mb-1">Wargear:</span>
              <ul className="space-y-1">
                {character.additionalWargear.map((item, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => handleRuleClick(item.name, 'Wargear')}
                      className="text-gray-400 hover:text-white hover:underline cursor-pointer text-left transition-colors"
                    >
                      • {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {selectedRule && (
        <RuleModal 
          title={selectedRule.title}
          type={selectedRule.type}
          description={selectedRule.description}
          onClose={() => setSelectedRule(null)}
        />
      )}
    </div>
  );
}
