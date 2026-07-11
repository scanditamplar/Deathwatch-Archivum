import React, { useState } from 'react';
import { CharacterData, ALL_SKILLS } from '../types';
import RuleModal from './RuleModal';
import { TALENT_DESCRIPTIONS, TRAIT_DESCRIPTIONS, SPECIAL_WARGEAR, PROTECTIVE_WARGEAR, RELIC_WARGEAR, CATEGORY_DESCRIPTIONS, ARMOR_PATTERNS, CODEX_ATTACK_PATTERNS, CODEX_DEFENSIVE_STANCES, CHAPTER_ATTACK_PATTERNS, CHAPTER_DEFENSIVE_STANCES, GENERAL_SOLO_MODE_ABILITIES, CHAPTER_SOLO_MODE_ABILITIES, ALL_SPECIAL_ABILITIES } from '../constants';
import { SPECIAL_RULES } from './SpecialRules';

interface Props {
  character: CharacterData;
  updateCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
}

export default function TacticalMode({ character, updateCharacter }: Props) {
  const [selectedRule, setSelectedRule] = useState<{title: string, type: string, description: string} | null>(null);
  
  // Damage Calculator State
  const [damageAmount, setDamageAmount] = useState<number | ''>('');
  const [damageLocation, setDamageLocation] = useState<'head' | 'torso' | 'rightArm' | 'leftArm' | 'rightLeg' | 'leftLeg'>('torso');
  const [damagePen, setDamagePen] = useState<number | ''>('');
  const [damageType, setDamageType] = useState<string>('Explosive');
  const [bypassArmor, setBypassArmor] = useState<boolean>(false);
  const [bypassToughness, setBypassToughness] = useState<boolean>(false);

  const getStat = (base: number, bonus: number, adv: number) => base + bonus + adv;

  const handleRuleClick = (name: string, type: string) => {
    let description = "No description available.";
    if (type === 'Talent') {
      const baseTalent = Object.keys(TALENT_DESCRIPTIONS).find(k => name.startsWith(k));
      description = baseTalent ? TALENT_DESCRIPTIONS[baseTalent] : description;
    } else if (type === 'Trait') {
      const baseTrait = Object.keys(TRAIT_DESCRIPTIONS).find(k => name.startsWith(k));
      description = baseTrait ? TRAIT_DESCRIPTIONS[baseTrait] : description;
    } else if (type === 'Ability') {
      const ability = ALL_SPECIAL_ABILITIES.find(a => a.name === name);
      if (ability) {
        description = ability.description || "Description not found.";
      } else {
        description = "Chapter or Specialization Ability.";
      }
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
    } else if (type === 'Weapon Rule') {
      // Find the rule ignoring parenthesis e.g. "Felling (1)" -> "Felling"
      const baseRule = Object.keys(SPECIAL_RULES).find(k => name.toLowerCase().startsWith(k.toLowerCase()));
      description = baseRule ? SPECIAL_RULES[baseRule] : description;
    } else if (type === 'Squad Mode') {
      const codexAttack = CODEX_ATTACK_PATTERNS.find(p => p.name === name);
      const codexDef = CODEX_DEFENSIVE_STANCES.find(p => p.name === name);
      const chapterAttack = Object.values(CHAPTER_ATTACK_PATTERNS).find(p => p.name === name);
      const chapterDef = Object.values(CHAPTER_DEFENSIVE_STANCES).find(p => p.name === name);
      
      const pattern = codexAttack || codexDef || chapterAttack || chapterDef;
      if (pattern) {
        description = `Action: ${pattern.action}\nCost: ${pattern.cost}\nSustained: ${pattern.sustained ? 'Yes' : 'No'}\n\nEffects: ${pattern.effects}\n\nImprovement: ${pattern.improvement}`;
      } else {
        description = "Description not found.";
      }
    } else if (type === 'Solo Mode') {
      const generalSolo = GENERAL_SOLO_MODE_ABILITIES.find(p => p.name === name);
      const chapterSolo = Object.values(CHAPTER_SOLO_MODE_ABILITIES).find(p => p.name === name);
      const ability = generalSolo || chapterSolo;
      if (ability) {
        description = `Required Rank: ${ability.requiredRank}\n\nEffects: ${ability.effects}\n\nImprovement: ${ability.improvement}`;
      } else {
        description = "Description not found.";
      }
    }

    setSelectedRule({
      title: name,
      type,
      description
    });
  };

  const getSoloModeTooltip = (name: string) => {
    const generalSolo = GENERAL_SOLO_MODE_ABILITIES.find(p => p.name === name);
    const chapterSolo = Object.values(CHAPTER_SOLO_MODE_ABILITIES).find(p => p.name === name);
    const ability = generalSolo || chapterSolo;
    if (ability) {
      return `Required Rank: ${ability.requiredRank}\n\nEffects: ${ability.effects}\n\nImprovement: ${ability.improvement}`;
    }
    return "";
  };

  const getSquadModeTooltip = (name: string) => {
    const codexAttack = CODEX_ATTACK_PATTERNS.find(p => p.name === name);
    const codexDef = CODEX_DEFENSIVE_STANCES.find(p => p.name === name);
    const chapterAttack = Object.values(CHAPTER_ATTACK_PATTERNS).find(p => p.name === name);
    const chapterDef = Object.values(CHAPTER_DEFENSIVE_STANCES).find(p => p.name === name);
    const pattern = codexAttack || codexDef || chapterAttack || chapterDef;
    if (pattern) {
      return `Action: ${pattern.action} | Cost: ${pattern.cost} | Sustained: ${pattern.sustained ? 'Yes' : 'No'}\n\nEffects: ${pattern.effects}\n\nImprovement: ${pattern.improvement}`;
    }
    return "";
  };

  const getAbilityTooltip = (name: string) => {
    const ability = ALL_SPECIAL_ABILITIES.find(a => a.name === name);
    if (ability && ability.description) {
      return ability.description.slice(0, 150) + (ability.description.length > 150 ? '...' : '');
    }
    return "";
  };

  const handleApplyDamage = () => {
    if (damageAmount === '' || damageAmount <= 0) return;

    let armorValue = 0;
    const pen = damagePen === '' ? 0 : Number(damagePen);

    if (!bypassArmor) {
      armorValue = character.armor[damageLocation] || 0;
      armorValue = Math.max(0, armorValue - pen);
    }

    let toughnessValue = 0;
    if (!bypassToughness) {
      // Calculate Toughness Bonus. Note: Unnatural Toughness might multiply this, but let's just use TB for now.
      const tStat = getStat(character.characteristics.T.base, character.characteristics.T.bonus, character.characteristics.T.adv);
      toughnessValue = Math.floor(tStat / 10);
      
      // Simple Unnatural Toughness check if trait exists
      const hasUnnaturalToughness = character.traits.find(t => t.toLowerCase().includes('unnatural toughness'));
      if (hasUnnaturalToughness) {
        // e.g. "Unnatural Toughness (x2)"
        const match = hasUnnaturalToughness.match(/\(x(\d+)\)/i);
        if (match && match[1]) {
          toughnessValue *= parseInt(match[1]);
        } else {
          toughnessValue *= 2; // Default Deathwatch multiplier
        }
      }
    }

    const totalReduction = armorValue + toughnessValue;
    const finalDamage = Math.max(0, Number(damageAmount) - totalReduction);

    let newTempWounds = character.wounds.temporary || 0;
    let newCurrentWounds = character.wounds.current;
    let newCriticalWounds = character.criticalWounds || 0;

    if (finalDamage > 0) {
      if (newTempWounds >= finalDamage) {
        newTempWounds -= finalDamage;
      } else {
        const remainingDamage = finalDamage - newTempWounds;
        newTempWounds = 0;
        if (newCurrentWounds >= remainingDamage) {
          newCurrentWounds -= remainingDamage;
        } else {
          const excessDamage = remainingDamage - newCurrentWounds;
          newCurrentWounds = 0;
          newCriticalWounds += excessDamage;
        }
      }
    }

    // Permanently reduce the armor on the assigned body part by the pen value
    const newArmorValue = bypassArmor ? (character.armor[damageLocation] || 0) : Math.max(0, (character.armor[damageLocation] || 0) - pen);

    updateCharacter({
      ...character,
      wounds: {
        ...character.wounds,
        current: newCurrentWounds,
        temporary: newTempWounds
      },
      criticalWounds: newCriticalWounds,
      armor: {
        ...character.armor,
        [damageLocation]: newArmorValue
      }
    });

    // Reset inputs
    setDamageAmount('');
    setDamagePen('');
  };

  const calculateMovement = () => {
    const agScore = getStat(character.characteristics.Ag.base, character.characteristics.Ag.bonus, character.characteristics.Ag.adv);
    const ab = Math.floor(agScore / 10);
    // Simple Astartes movement calculation
    return {
      half: ab,
      full: ab * 2,
      charge: ab * 3,
      run: ab * 6
    };
  };

  const move = calculateMovement();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
      {/* Left Sidebar: Combat Quick Stats */}
      <div className="md:col-span-3 space-y-4">
        <div className="bg-[#111] border-2 border-red-900 p-4 rounded text-center shadow-[0_0_15px_rgba(255,0,0,0.1)]">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Wounds</h2>
          <div className="flex justify-center items-center gap-4 mb-1">
            <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: Math.max(0, character.wounds.current - 1) } })} className="w-8 h-8 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xl leading-none">-</button>
            <div className="text-4xl text-white font-bold">{character.wounds.current}</div>
            <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: character.wounds.current + 1 } })} className="w-8 h-8 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-xl leading-none">+</button>
          </div>
          <div className="text-sm text-gray-500 flex justify-center items-center gap-2">
            <span>Max: {character.wounds.max}</span>
            <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, current: character.wounds.max } })} className="bg-[#333] hover:bg-[#444] text-[10px] px-2 py-1 rounded text-white uppercase tracking-wider">Reset</button>
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#333]">
            <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Temporary Wounds</h2>
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, temporary: Math.max(0, (character.wounds.temporary || 0) - 1) } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">-</button>
              <div className="text-xl text-yellow-500 font-bold">{character.wounds.temporary || 0}</div>
              <button onClick={() => updateCharacter({ ...character, wounds: { ...character.wounds, temporary: (character.wounds.temporary || 0) + 1 } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">+</button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#333]">
            <h2 className="text-[10px] text-red-500 uppercase tracking-widest mb-1">Critical Wounds</h2>
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => updateCharacter({ ...character, criticalWounds: Math.max(0, (character.criticalWounds || 0) - 1) })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">-</button>
              <div className="text-xl text-red-500 font-bold">{character.criticalWounds || 0}</div>
              <button onClick={() => updateCharacter({ ...character, criticalWounds: (character.criticalWounds || 0) + 1 })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">+</button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#333]">
            <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Fatigue</h2>
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => updateCharacter({ ...character, fatigue: Math.max(0, character.fatigue - 1) })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">-</button>
              <div className="text-xl text-yellow-500 font-bold">{character.fatigue}</div>
              <button onClick={() => updateCharacter({ ...character, fatigue: character.fatigue + 1 })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">+</button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#333]">
            <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 text-center">Cohesion</h2>
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => updateCharacter({ ...character, cohesion: { ...character.cohesion, current: Math.max(0, character.cohesion.current - 1) } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">-</button>
              <div className="text-xl text-blue-400 font-bold">{character.cohesion.current}</div>
              <button onClick={() => updateCharacter({ ...character, cohesion: { ...character.cohesion, current: character.cohesion.current + 1 } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold leading-none">+</button>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 text-center">Identity & Armour</h2>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase">Chapter Demeanour</div>
              <div className="text-xs text-gray-300">{character.chapterDemeanor || 'None'}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase">Personal Demeanour</div>
              <div className="text-xs text-gray-300">{character.personalDemeanor || 'None'}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase">Armour History</div>
              <div className="text-xs text-gray-300 max-h-24 overflow-y-auto pr-1">
                {character.history || "No recorded history."}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 text-center">Movement (Meters)</h2>
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500">Half</div>
              <div className="text-white font-bold">{move.half}</div>
            </div>
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500">Full</div>
              <div className="text-white font-bold">{move.full}</div>
            </div>
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500">Charge</div>
              <div className="text-white font-bold">{move.charge}</div>
            </div>
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500">Run</div>
              <div className="text-white font-bold">{move.run}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 text-center">Armour (AP)</h2>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222] col-span-3">
              <div className="text-gray-500 mb-1">Head</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, head: Math.max(0, character.armor.head - 1) } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold">-</button>
                <div className="text-white font-bold w-6">{character.armor.head}</div>
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, head: character.armor.head + 1 } })} className="w-6 h-6 bg-[#333] hover:bg-[#444] rounded text-white font-bold">+</button>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500 mb-1">R. Arm</div>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, rightArm: Math.max(0, character.armor.rightArm - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">-</button>
                <div className="text-white font-bold w-4">{character.armor.rightArm}</div>
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, rightArm: character.armor.rightArm + 1 } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">+</button>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500 mb-1">Body</div>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, torso: Math.max(0, character.armor.torso - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">-</button>
                <div className="text-white font-bold w-4">{character.armor.torso}</div>
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, torso: character.armor.torso + 1 } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">+</button>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222]">
              <div className="text-gray-500 mb-1">L. Arm</div>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, leftArm: Math.max(0, character.armor.leftArm - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">-</button>
                <div className="text-white font-bold w-4">{character.armor.leftArm}</div>
                <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, leftArm: character.armor.leftArm + 1 } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">+</button>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-1 rounded border border-[#222] col-span-3">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-gray-500 mb-1">R. Leg</div>
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, rightLeg: Math.max(0, character.armor.rightLeg - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">-</button>
                    <div className="text-white font-bold w-4">{character.armor.rightLeg}</div>
                    <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, rightLeg: character.armor.rightLeg + 1 } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">+</button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 mb-1">L. Leg</div>
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, leftLeg: Math.max(0, character.armor.leftLeg - 1) } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">-</button>
                    <div className="text-white font-bold w-4">{character.armor.leftLeg}</div>
                    <button onClick={() => updateCharacter({ ...character, armor: { ...character.armor, leftLeg: character.armor.leftLeg + 1 } })} className="w-5 h-5 bg-[#333] hover:bg-[#444] rounded text-white font-bold text-[10px]">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 text-center">Receive Damage</h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Amount</label>
                <input 
                  type="number" 
                  value={damageAmount} 
                  onChange={e => setDamageAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-black border border-[#333] rounded p-1 text-white text-center"
                  placeholder="Damage"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Pen</label>
                <input 
                  type="number" 
                  value={damagePen} 
                  onChange={e => setDamagePen(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-black border border-[#333] rounded p-1 text-white text-center"
                  placeholder="Pen"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Location</label>
                <select 
                  value={damageLocation} 
                  onChange={e => setDamageLocation(e.target.value as any)}
                  className="w-full bg-black border border-[#333] rounded p-1 text-white text-center"
                >
                  <option value="head">Head</option>
                  <option value="torso">Body</option>
                  <option value="rightArm">Right Arm</option>
                  <option value="leftArm">Left Arm</option>
                  <option value="rightLeg">Right Leg</option>
                  <option value="leftLeg">Left Leg</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Type</label>
                <select 
                  value={damageType} 
                  onChange={e => setDamageType(e.target.value)}
                  className="w-full bg-black border border-[#333] rounded p-1 text-white text-center"
                >
                  <option value="Energy">Energy</option>
                  <option value="Explosive">Explosive</option>
                  <option value="Impact">Impact</option>
                  <option value="Rending">Rending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-around bg-[#1a1a1a] p-2 rounded border border-[#222]">
              <label className="flex items-center gap-2 text-[10px] text-gray-400 uppercase cursor-pointer">
                <input type="checkbox" checked={bypassArmor} onChange={e => setBypassArmor(e.target.checked)} className="cursor-pointer" />
                Ignore AP
              </label>
              <label className="flex items-center gap-2 text-[10px] text-gray-400 uppercase cursor-pointer">
                <input type="checkbox" checked={bypassToughness} onChange={e => setBypassToughness(e.target.checked)} className="cursor-pointer" />
                Ignore TB
              </label>
            </div>

            <button 
              onClick={handleApplyDamage}
              disabled={damageAmount === '' || damageAmount <= 0}
              className="w-full bg-[#8b0000]/20 hover:bg-[#8b0000]/40 text-red-500 border border-[#8b0000]/50 font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors disabled:opacity-50"
            >
              Apply Damage
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Weapons & Combat Talents */}
      <div className="md:col-span-9 space-y-6">
        <div className="bg-[#111] border border-[#333] p-4 rounded">
          <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Equipped Weapons</h2>
          
          <div className="space-y-4">
            {character.weapons.melee.map((weapon, i) => (
              <div key={`m-${i}`} className="bg-[#1a1a1a] border border-[#333] p-3 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-red-400 font-bold uppercase text-sm">{weapon.name}</div>
                  <div className="text-xs text-gray-500">Melee Weapon</div>
                </div>
                <div className="flex gap-4 text-sm text-center">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Damage</div>
                    <div className="text-white font-bold">{weapon.damage}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Pen</div>
                    <div className="text-white font-bold">{weapon.pen}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Special</div>
                    <div className="flex gap-1 flex-wrap max-w-[200px] justify-center md:justify-end">
                      {weapon.special && weapon.special !== '-' ? weapon.special.split(',').map((rule, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleRuleClick(rule.trim(), 'Weapon Rule')} 
                          className="text-gray-300 hover:text-white hover:underline text-xs whitespace-nowrap"
                        >
                          {rule.trim()}{idx < weapon.special.split(',').length - 1 ? ',' : ''}
                        </button>
                      )) : <span className="text-gray-500">-</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {character.weapons.ranged.map((weapon, i) => (
              <div key={`r-${i}`} className="bg-[#1a1a1a] border border-[#333] p-3 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-blue-400 font-bold uppercase text-sm">{weapon.name}</div>
                  <div className="text-xs text-gray-500">{weapon.class}</div>
                </div>
                <div className="flex gap-4 text-sm text-center flex-wrap">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Range</div>
                    <div className="text-white font-bold">{weapon.range}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">RoF</div>
                    <div className="text-white font-bold">{weapon.rof}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Damage</div>
                    <div className="text-white font-bold">{weapon.damage}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Pen</div>
                    <div className="text-white font-bold">{weapon.pen}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Clip</div>
                    <div className="text-white font-bold">{weapon.clip.current} / {weapon.clip.max}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Special</div>
                    <div className="flex gap-1 flex-wrap max-w-[200px] justify-center md:justify-end">
                      {weapon.special && weapon.special !== '-' ? weapon.special.split(',').map((rule, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleRuleClick(rule.trim(), 'Weapon Rule')} 
                          className="text-gray-300 hover:text-white hover:underline text-xs whitespace-nowrap"
                        >
                          {rule.trim()}{idx < weapon.special.split(',').length - 1 ? ',' : ''}
                        </button>
                      )) : <span className="text-gray-500">-</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {character.weapons.melee.length === 0 && character.weapons.ranged.length === 0 && (
              <div className="text-gray-500 text-sm italic">No weapons equipped.</div>
            )}
          </div>
        </div>

        {/* Combat Talents / Special Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111] border border-[#333] p-4 rounded">
            <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Combat Talents</h2>
            <div className="flex flex-wrap gap-2">
              {character.talents.map((t, i) => (
                <button 
                  key={`t-${i}`} 
                  onClick={() => handleRuleClick(t, 'Talent')}
                  className="px-2 py-1 bg-[#221a1a] hover:bg-[#3a2a2a] transition-colors border border-[#4a2a2a] text-xs text-red-200 rounded cursor-pointer text-left"
                >
                  {t}
                </button>
              ))}
              {character.talents.length === 0 && <span className="text-gray-500 text-xs italic">No talents recorded.</span>}
            </div>
          </div>
          <div className="bg-[#111] border border-[#333] p-4 rounded">
            <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Combat Abilities & Traits</h2>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((t, i) => (
                <button 
                  key={`tr-${i}`} 
                  onClick={() => handleRuleClick(t, 'Trait')}
                  className="px-2 py-1 bg-[#1a221a] hover:bg-[#2a3a2a] transition-colors border border-[#2a4a2a] text-xs text-green-200 rounded cursor-pointer text-left"
                >
                  {t}
                </button>
              ))}
              {character.abilities && character.abilities.map((a, i) => (
                <button 
                  key={`a-${i}`} 
                  onClick={() => handleRuleClick(a, 'Ability')}
                  title={getAbilityTooltip(a)}
                  className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                >
                  {a}
                </button>
              ))}
              {character.traits.length === 0 && (!character.abilities || character.abilities.length === 0) && <span className="text-gray-500 text-xs italic">No abilities or traits recorded.</span>}
            </div>
          </div>
          <div className="bg-[#111] border border-[#333] p-4 rounded md:col-span-2">
            <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Combat Skills</h2>
            <div className="flex flex-wrap gap-2">
              {character.skills.filter(s => s.mastery > 0 && ["Dodge", "Parry", "Medicae", "Awareness", "Acrobatics", "Command", "Tech-Use", "Demolition", "Pilot", "Drive", "Tactics", "Concealment", "Silent Move", "Intimidate"].some(c => s.name.startsWith(c))).map((skill, i) => (
                <button 
                  key={`s-${i}`} 
                  onClick={() => handleRuleClick(skill.name, 'Skill')}
                  className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#333] transition-colors border border-[#333] text-xs text-gray-300 rounded cursor-pointer text-left"
                >
                  {skill.name} {skill.mastery > 1 ? `+${(skill.mastery - 1) * 10}` : ''}
                </button>
              ))}
              {character.skills.filter(s => s.mastery > 0 && ["Dodge", "Parry", "Medicae", "Awareness", "Acrobatics", "Command", "Tech-Use", "Demolition", "Pilot", "Drive", "Tactics", "Concealment", "Silent Move", "Intimidate"].some(c => s.name.startsWith(c))).length === 0 && <span className="text-gray-500 text-xs italic">No combat skills recorded.</span>}
            </div>
          </div>
          
          <div className="bg-[#111] border border-[#333] p-4 rounded md:col-span-2">
            <h2 className="text-xl text-white gothic-font uppercase mb-4 border-b border-[#333] pb-2">Solo & Squad Mode Abilities</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2 border-b border-[#222] pb-1">Solo Mode</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleRuleClick("Burst of Speed", 'Solo Mode')}
                    title={getSoloModeTooltip("Burst of Speed")}
                    className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                  >
                    Burst of Speed
                  </button>
                  <button 
                    onClick={() => handleRuleClick("Feat of Strength", 'Solo Mode')}
                    title={getSoloModeTooltip("Feat of Strength")}
                    className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                  >
                    Feat of Strength
                  </button>
                  <button 
                    onClick={() => handleRuleClick("Lightning Strike", 'Solo Mode')}
                    title={getSoloModeTooltip("Lightning Strike")}
                    className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                  >
                    Lightning Strike
                  </button>
                  {(character.rank >= 3) && (
                    <button 
                      onClick={() => handleRuleClick("Sustained Suppression", 'Solo Mode')}
                      title={getSoloModeTooltip("Sustained Suppression")}
                      className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                    >
                      Sustained Suppression
                    </button>
                  )}
                  {(character.rank >= 5) && (
                    <button 
                      onClick={() => handleRuleClick("Mental Fortress", 'Solo Mode')}
                      title={getSoloModeTooltip("Mental Fortress")}
                      className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                    >
                      Mental Fortress
                    </button>
                  )}
                  {(character.rank >= 7) && (
                    <button 
                      onClick={() => handleRuleClick("Emperor's Grace", 'Solo Mode')}
                      title={getSoloModeTooltip("Emperor's Grace")}
                      className="px-2 py-1 bg-[#1a1a22] hover:bg-[#2a2a3a] transition-colors border border-[#2a2a4a] text-xs text-blue-200 rounded cursor-pointer text-left"
                    >
                      Emperor's Grace
                    </button>
                  )}
                  {character.soloModeAbility && character.soloModeAbility !== "Awaiting chapter assignment" && (
                    <button 
                      onClick={() => handleRuleClick(character.soloModeAbility, 'Solo Mode')}
                      title={getSoloModeTooltip(character.soloModeAbility)}
                      className="px-2 py-1 bg-[#221a22] hover:bg-[#3a2a3a] transition-colors border border-[#4a2a4a] text-xs text-purple-200 rounded cursor-pointer text-left"
                    >
                      {character.soloModeAbility}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2 border-b border-[#222] pb-1">Attack Patterns</h3>
                <div className="flex flex-wrap gap-2">
                  {character.squadModeAbilities?.attack.map((pattern, i) => (
                    <button 
                      key={`att-${i}`} 
                      onClick={() => handleRuleClick(pattern, 'Squad Mode')}
                      title={getSquadModeTooltip(pattern)}
                      className="px-2 py-1 bg-[#221a1a] hover:bg-[#3a2a2a] transition-colors border border-[#4a2a4a] text-xs text-orange-200 rounded cursor-pointer text-left"
                    >
                      {pattern}
                    </button>
                  ))}
                  {(!character.squadModeAbilities?.attack || character.squadModeAbilities.attack.length === 0) && <span className="text-gray-500 text-xs italic">None</span>}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2 border-b border-[#222] pb-1">Defensive Stances</h3>
                <div className="flex flex-wrap gap-2">
                  {character.squadModeAbilities?.defensive.map((stance, i) => (
                    <button 
                      key={`def-${i}`} 
                      onClick={() => handleRuleClick(stance, 'Squad Mode')}
                      title={getSquadModeTooltip(stance)}
                      className="px-2 py-1 bg-[#1a2222] hover:bg-[#2a3a3a] transition-colors border border-[#2a4a4a] text-xs text-teal-200 rounded cursor-pointer text-left"
                    >
                      {stance}
                    </button>
                  ))}
                  {(!character.squadModeAbilities?.defensive || character.squadModeAbilities.defensive.length === 0) && <span className="text-gray-500 text-xs italic">None</span>}
                </div>
              </div>
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
