import React, { useState, useEffect, useRef } from 'react';
import { CharacterData, INITIAL_CHARACTER, Characteristic, Characteristics, MeleeWeapon, RangedWeapon, Explosive, Armor, WargearItem, BattleTrauma as BattleTraumaType } from './types';
import { Icons, CHAPTERS, SPECIALIZATIONS, CHAPTER_DATA, PERSONAL_DEMEANORS, ADVANCED_SPECIALITY_RULES, BATTLE_TRAUMAS, ARMOR_PATTERNS, ARMOR_ABILITIES, ARMOR_HISTORIES, SPECIAL_WARGEAR, RELIC_WARGEAR } from './constants';
import ServoSkullChat from './components/ServoSkullChat';
import RelicCard from './components/RelicCard';

// --- Helper for Characteristic Logic ---

const getCharScore = (stat: Characteristic, armorBonus: number = 0): number => {
  return stat.base + stat.bonus + stat.adv + armorBonus;
};

const getCharBonus = (stat: Characteristic, key: string, armorBonus: number = 0): number => {
  if (key === 'S' || key === 'T') {
    const baseScore = stat.base + stat.adv;
    const baseBonus = Math.floor(baseScore / 10);
    
    const additionalScore = stat.bonus + armorBonus;
    const additionalBonus = Math.floor(additionalScore / 10);
    
    return (baseBonus * 2) + additionalBonus;
  }
  
  const score = getCharScore(stat, armorBonus);
  return Math.floor(score / 10);
};

const getRenownTitle = (value: number): string => {
  if (value < 20) return "Initiated";
  if (value < 40) return "Respected";
  if (value < 60) return "Distinguished";
  if (value < 80) return "Famed";
  return "Hero";
};

// --- Primarch's Curse Helpers ---

const getCurseInfo = (insanity: number) => {
  if (insanity >= 100) return { level: 4, penalty: 0, label: "REDACTED" };
  if (insanity >= 91) return { level: 3, penalty: -30, label: "Level 3" };
  if (insanity >= 61) return { level: 2, penalty: -20, label: "Level 2" };
  if (insanity >= 31) return { level: 1, penalty: -10, label: "Level 1" };
  return { level: 0, penalty: 0, label: "—" };
};

// --- Sub-components ---

const StatBlock: React.FC<{ label: string; stat: Characteristic; onChange: (val: number) => void; armorBonus?: number }> = ({ label, stat, onChange, armorBonus = 0 }) => {
  const score = getCharScore(stat, armorBonus);
  const bonus = getCharBonus(stat, label, armorBonus);
  const isUnnatural = label === 'S' || label === 'T';
  const showBadge = !(label === 'WS' || label === 'BS');

  return (
    <div className={`relative bg-[#1a1a1a] border ${stat.bonus > 0 || armorBonus > 0 ? 'border-green-900/50 shadow-[0_0_5px_rgba(34,197,94,0.2)]' : 'border-[#333]'} p-2 pt-3 rounded text-center transition-all group`}>
      {showBadge && (
        <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border shadow-lg transition-transform group-hover:scale-110 
          ${isUnnatural ? 'bg-[#8b0000] border-[#ffd700] text-[#ffd700]' : 'bg-[#222] border-[#444] text-gray-400'}`}
          title={isUnnatural ? "Unnatural Trait (Bonus Doubled)" : "Characteristic Bonus"}>
          {bonus}
        </div>
      )}
      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter mb-1">{label}</div>
      <div className={`text-2xl font-bold ${stat.bonus > 0 || (label === 'S' && armorBonus > 0) ? 'text-green-500' : 'text-white'} gothic-font leading-none mb-2`}>
        {score}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-[#222] pt-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[7px] text-gray-600 font-bold uppercase">Base</span>
          <input 
            type="number" 
            value={stat.base} 
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="text-[10px] bg-transparent text-gray-400 w-8 text-right focus:outline-none focus:text-white font-mono" 
          />
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center gap-2 border-b-2 border-[#8b0000] mb-4 pb-1">
    <div className="w-5 h-5 text-[#8b0000] flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-lg gothic-font uppercase tracking-tighter text-gray-200">{title}</h3>
  </div>
);

const ImplantCard: React.FC<{ name: string; effect: string }> = ({ name, effect }) => (
  <div className="bg-[#111] border border-[#222] p-2 rounded group hover:border-[#8b0000] transition-colors h-full flex flex-col">
    <div className="text-[9px] font-bold text-[#8b0000] uppercase tracking-tighter mb-1 group-hover:text-red-500 leading-none">{name}</div>
    <div className="text-[10px] text-gray-400 leading-tight flex-1">{effect}</div>
  </div>
);

const TraumaItem: React.FC<{ trauma: BattleTraumaType, onRemove: () => void }> = ({ trauma, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
      className="bg-black/50 border border-[#222] rounded p-2 text-[10px] relative transition-all hover:border-[#ffd700]/30 group cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <span className="font-bold text-red-500 uppercase tracking-tight">{trauma.name}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="text-[8px] text-gray-600 hover:text-red-500 transition-colors font-bold uppercase tracking-tighter"
        >
          PURGE
        </button>
      </div>
      <div className="relative mt-1">
        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <span className="text-gray-400 italic">{trauma.summary}</span>
        </div>
        <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <span className="text-gray-300 leading-tight block text-justify pr-1">{trauma.description}</span>
        </div>
      </div>
    </div>
  );
};

const WargearCard: React.FC<{ 
  item: WargearItem; 
  onRemove: () => void;
  onUpdate?: (updates: Partial<WargearItem>) => void;
}> = ({ item, onRemove, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
      className="bg-[#111] border border-[#333] p-4 rounded relative group hover:border-[#8b0000] transition-all cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-2 right-2 text-[7px] text-red-800 hover:text-red-500 font-bold uppercase tracking-tighter z-10"
      >
        Purge
      </button>
      <div className="flex justify-between items-start mb-1">
        <div className="text-xs font-bold text-white uppercase tracking-widest">{item.name}</div>
        {item.quantity && (
          <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-[#333]" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => onUpdate?.({ quantity: { ...item.quantity!, current: Math.max(0, item.quantity!.current - 1) } })}
              className="text-[10px] text-gray-500 hover:text-white transition-colors px-1"
            >-</button>
            <span className="text-[10px] font-mono text-red-500 min-w-[12px] text-center">{item.quantity.current}</span>
            <button 
              onClick={() => onUpdate?.({ quantity: { ...item.quantity!, current: Math.min(item.quantity!.max, item.quantity!.current + 1) } })}
              className="text-[10px] text-gray-500 hover:text-white transition-colors px-1"
            >+</button>
          </div>
        )}
      </div>
      <div className="relative">
        {item.summary && (
          <div className={`transition-all duration-300 ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            <div className="text-[10px] text-gray-400 leading-tight italic">{item.summary}</div>
          </div>
        )}
        <div className={`transition-all duration-300 ${isExpanded || !item.summary ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div className="text-[10px] text-gray-300 leading-tight">{item.description}</div>
        </div>
      </div>
      {item.name === "Charm" && (
        <div className="mt-2 pt-2 border-t border-[#222]">
          <input 
            type="text"
            value={item.notes || ''}
            onChange={(e) => onUpdate?.({ notes: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            placeholder="Describe your charm..."
            className="w-full bg-black/30 border border-[#222] text-[9px] text-gray-400 p-1 rounded focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [character, setCharacter] = useState<CharacterData>(INITIAL_CHARACTER);
  const [activeTab, setActiveTab] = useState<'basics' | 'wargear' | 'skills' | 'history'>('basics');
  const [showFullCurse, setShowFullCurse] = useState(false);
  const [showFullDemeanor, setShowFullDemeanor] = useState(false);
  
  // Modals state
  const [showHonorsModal, setShowHonorsModal] = useState(false);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [showWargearModal, setShowWargearModal] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isWeaponCloseHovered, setIsWeaponCloseHovered] = useState(false);
  const [isWeaponSubmitting, setIsWeaponSubmitting] = useState(false);
  const [isWargearAccessGranted, setIsWargearAccessGranted] = useState(false);
  const [isReclusiamAccessGranted, setIsReclusiamAccessGranted] = useState(false);
  const [showReclusiamView, setShowReclusiamView] = useState(false);
  const [selectedRelics, setSelectedRelics] = useState<Set<number>>(new Set());
  const [isRelicRequisitionApproved, setIsRelicRequisitionApproved] = useState(false);
  const [showCustomWargearView, setShowCustomWargearView] = useState(false);
  const [customWargear, setCustomWargear] = useState({ name: '', description: '' });

  // Trauma confirmation state
  const [confirmStep, setConfirmStep] = useState<'none' | 'authorizing' | 'confirmed'>('none');
  const [pendingTrauma, setPendingTrauma] = useState<string | null>(null);

  // New Weapon form state
  const [weaponType, setWeaponType] = useState<'melee' | 'ranged' | 'explosive'>('ranged');
  const [weaponDamageDice, setWeaponDamageDice] = useState(1);
  const [weaponDamageBonus, setWeaponDamageBonus] = useState(0);
  const [weaponDamageType, setWeaponDamageType] = useState('X');
  const [weaponAmmoType, setWeaponAmmoType] = useState('Standard Bolt Rounds');
  const [newWeapon, setNewWeapon] = useState<Partial<RangedWeapon & MeleeWeapon & Explosive>>({
    name: '',
    damage: '',
    pen: 0,
    special: '',
    range: '',
    rof: '',
    reload: '',
    clip: { current: 0, max: 0 },
    quantity: { current: 1, max: 1 }
  });
  
  const [portrait, setPortrait] = useState<string>(() => {
    const defaultImg = 'https://i.redd.it/7w14tvb9rahb1.jpg';
    return localStorage.getItem('astartes_portrait') || defaultImg;
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('astartes_portrait', portrait);
  }, [portrait]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPortrait(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const updateStatBase = (key: keyof Characteristics, val: number) => {
    setCharacter(prev => ({
      ...prev,
      characteristics: {
        ...prev.characteristics,
        [key]: { ...prev.characteristics[key], base: val }
      }
    }));
  };

  const updateAmmo = (weaponId: string, delta: number) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.map(w => {
          if (w.id === weaponId) {
            return {
              ...w,
              clip: {
                ...w.clip,
                current: Math.max(0, Math.min(w.clip.max, w.clip.current + delta))
              }
            };
          }
          return w;
        })
      }
    }));
  };

  const updateExplosiveQuantity = (explosiveId: string, delta: number) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        explosives: prev.weapons.explosives.map(e => {
          if (e.id === explosiveId) {
            return {
              ...e,
              quantity: {
                ...e.quantity,
                current: Math.max(0, Math.min(e.quantity.max, e.quantity.current + delta))
              }
            };
          }
          return e;
        })
      }
    }));
  };

  const updateArmor = (part: keyof Armor, delta: number) => {
    if (part === 'name' || part === 'pattern' || part === 'abilities') return;
    setCharacter(prev => ({
      ...prev,
      armor: {
        ...prev.armor,
        [part]: Math.max(0, (prev.armor[part] as number) + delta)
      }
    }));
  };

  const handleArmorPatternChange = (patternName: string) => {
    const pattern = ARMOR_PATTERNS[patternName];
    if (!pattern) return;

    setCharacter(prev => {
      // Keep current histories if they fit in new slots, pad with "None"
      const pattern = ARMOR_PATTERNS[patternName];
      const currentHistories = prev.armor.histories.slice(0, pattern.historySlots);
      while (currentHistories.length < pattern.historySlots) {
        currentHistories.push("None");
      }
      
      const baseAbilities = [...pattern.abilities];
      
      currentHistories.forEach(h => {
        if (h !== "None" && !baseAbilities.includes(h)) {
          baseAbilities.push(h);
        }
      });

      return {
        ...prev,
        armor: {
          ...prev.armor,
          pattern: pattern.name,
          head: pattern.head,
          torso: pattern.torso,
          rightArm: pattern.rightArm,
          leftArm: pattern.leftArm,
          rightLeg: pattern.rightLeg,
          leftLeg: pattern.leftLeg,
          abilities: baseAbilities,
          histories: currentHistories
        }
      };
    });
  };

  const handleArmorHistoryChange = (historyName: string, slotIndex: number) => {
    setCharacter(prev => {
      const oldHistories = [...prev.armor.histories];
      const oldHistory = oldHistories[slotIndex];
      let newAbilities = [...prev.armor.abilities];
      
      // Remove old history node if it was there
      if (oldHistory && oldHistory !== "None") {
        newAbilities = newAbilities.filter(a => a !== oldHistory);
      }
      
      // Update histories array
      oldHistories[slotIndex] = historyName;
      
      // Add new history node if not "None"
      if (historyName !== "None" && !newAbilities.includes(historyName)) {
        newAbilities.push(historyName);
      }

      return {
        ...prev,
        armor: {
          ...prev.armor,
          histories: oldHistories,
          abilities: newAbilities
        }
      };
    });
  };

  const reloadWeapon = (weaponId: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.map(w => {
          if (w.id === weaponId) {
            return { ...w, clip: { ...w.clip, current: w.clip.max } };
          }
          return w;
        })
      }
    }));
  };

  const updateAmmoType = (weaponId: string, type: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.map(w => {
          if (w.id === weaponId) {
            return { ...w, ammoType: type };
          }
          return w;
        })
      }
    }));
  };

  const addWargear = (item: { name: string, description: string, summary?: string, quantity?: { current: number, max: number } }) => {
    const newItem: WargearItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name,
      description: item.description,
      summary: item.summary,
      quantity: item.quantity ? { ...item.quantity } : undefined
    };
    setCharacter(prev => ({
      ...prev,
      additionalWargear: [...(prev.additionalWargear || []), newItem]
    }));
    setShowWargearModal(false);
  };

  const removeWargear = (id: string) => {
    setCharacter(prev => ({
      ...prev,
      additionalWargear: prev.additionalWargear.filter(item => item.id !== id)
    }));
  };

  const updateWargear = (id: string, updates: Partial<WargearItem>) => {
    setCharacter(prev => ({
      ...prev,
      additionalWargear: prev.additionalWargear.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const removeRangedWeapon = (id: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.filter(w => w.id !== id)
      }
    }));
  };

  const removeMeleeWeapon = (id: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        melee: prev.weapons.melee.filter(w => w.id !== id)
      }
    }));
  };

  const removeExplosive = (id: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        explosives: prev.weapons.explosives.filter(e => e.id !== id)
      }
    }));
  };

  const handleChapterChange = (chapterName: string) => {
    const data = CHAPTER_DATA[chapterName];
    if (!data) {
      setCharacter(prev => ({ ...prev, chapter: chapterName }));
      return;
    }
    const newChars = { ...character.characteristics };
    // Reset bonuses
    (Object.keys(newChars) as Array<keyof Characteristics>).forEach(key => newChars[key].bonus = 0);
    // Apply new bonuses
    Object.entries(data.modifiers).forEach(([stat, val]) => {
      const key = stat as keyof Characteristics;
      if (newChars[key]) newChars[key].bonus = val;
    });

    setCharacter(prev => ({
      ...prev,
      chapter: chapterName,
      characteristics: newChars,
      chapterDemeanor: data.demeanorName,
      soloModeAbility: data.soloAbility,
      talents: [...new Set([...INITIAL_CHARACTER.talents, ...data.talents])],
      wounds: {
        ...prev.wounds,
        max: INITIAL_CHARACTER.wounds.max + (data.woundsBonus || 0)
      }
    }));
  };

  const handleTraumaSelect = (val: string) => {
    if (!val || character.battleTraumas.includes(val) || confirmStep !== 'none') return;
    setPendingTrauma(val);
    setConfirmStep('authorizing');
  };

  const handleAuthorizeTrauma = () => {
    if (confirmStep !== 'authorizing' || !pendingTrauma) return;
    
    setConfirmStep('confirmed');
    setTimeout(() => {
      setCharacter(prev => ({
        ...prev,
        battleTraumas: [...prev.battleTraumas, pendingTrauma]
      }));
      setConfirmStep('none');
      setPendingTrauma(null);
    }, 1200);
  };

  const handleRequestWeapon = () => {
    if (!newWeapon.name || isWeaponSubmitting) return;

    setIsWeaponSubmitting(true);

    const damageStr = `${weaponDamageDice}d10${weaponDamageBonus >= 0 ? '+' : ''}${weaponDamageBonus} ${weaponDamageType}`;

    setTimeout(() => {
      const id = `${weaponType}-${Date.now()}`;
      if (weaponType === 'melee') {
        const weapon: MeleeWeapon = {
          id,
          name: newWeapon.name || 'Unidentified Blade',
          damage: damageStr,
          pen: newWeapon.pen || 0,
          special: newWeapon.special || '-'
        };
        setCharacter(prev => ({
          ...prev,
          weapons: { ...prev.weapons, melee: [...prev.weapons.melee, weapon] }
        }));
      } else if (weaponType === 'explosive') {
        const weapon: Explosive = {
          id,
          name: newWeapon.name || 'Unidentified Grenade',
          damage: damageStr,
          pen: newWeapon.pen || 0,
          special: newWeapon.special || '-',
          range: newWeapon.range || '-',
          quantity: newWeapon.quantity || { current: 1, max: 1 }
        };
        setCharacter(prev => ({
          ...prev,
          weapons: { ...prev.weapons, explosives: [...prev.weapons.explosives, weapon] }
        }));
      } else {
        const weapon: RangedWeapon = {
          id,
          name: newWeapon.name || 'Unidentified Firearm',
          class: newWeapon.class,
          damage: damageStr,
          pen: newWeapon.pen || 0,
          special: newWeapon.special || '-',
          range: newWeapon.range || '-',
          rof: newWeapon.rof || '-',
          reload: newWeapon.reload || '-',
          clip: newWeapon.clip || { current: 10, max: 10 },
          ammoType: weaponAmmoType
        };
        setCharacter(prev => ({
          ...prev,
          weapons: { ...prev.weapons, ranged: [...prev.weapons.ranged, weapon] }
        }));
      }

      // Reset and close
      setNewWeapon({
        name: '',
        class: undefined,
        damage: '',
        pen: 0,
        special: '',
        range: '',
        rof: '',
        reload: '',
        clip: { current: 0, max: 0 },
        quantity: { current: 1, max: 1 }
      });
      setWeaponDamageDice(1);
      setWeaponDamageBonus(0);
      setWeaponDamageType('X');
      setWeaponAmmoType('Standard Bolt Rounds');
      setShowWeaponModal(false);
      setIsWeaponSubmitting(false);
    }, 1000);
  };

  const getCharScoreWrapper = (key: keyof Characteristics) => {
    const armorBonus = key === 'S' ? (ARMOR_PATTERNS[character.armor.pattern]?.strengthBonus || 0) : 0;
    return getCharScore(character.characteristics[key], armorBonus);
  };
  const currentChapterData = CHAPTER_DATA[character.chapter];
  const isSpecializationRestricted = currentChapterData?.restrictions.includes(character.specialization);
  const toughnessBonus = getCharBonus(character.characteristics.T, 'T');
  const isFatigued = character.fatigue > 0;
  const isUnconscious = character.fatigue > toughnessBonus;
  const selectedPersonalDemeanor = PERSONAL_DEMEANORS.find(d => d.name === character.personalDemeanor);

  // Curse logic
  const curseInfo = getCurseInfo(character.insanity);
  const cursePenalty = curseInfo.penalty;
  const currentLevelData = (curseInfo.level >= 1 && curseInfo.level <= 3) 
    ? (currentChapterData?.curseLevels?.[curseInfo.level as 1 | 2 | 3]) 
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-300">
      <header className="bg-[#0c0c0c] border-b border-[#333] p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-2 border-2 border-[#8b0000] rounded w-10 h-10 flex items-center justify-center">
            <Icons.Skull />
          </div>
          <div>
            <h1 className="text-xl gothic-font text-white tracking-widest uppercase">Deathwatch Archivum</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Tactical Assessment & Data Log v40.k</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] text-red-800 uppercase font-bold">Current XP</div>
            <div className="text-lg font-bold">{character.xpTotal - character.xpSpent} / {character.xpTotal}</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <nav className="w-16 bg-[#111] border-r border-[#333] flex flex-col items-center py-6 gap-6">
          {[
            { id: 'basics', Icon: Icons.Info, label: 'Basics' },
            { id: 'wargear', Icon: Icons.Sword, label: 'Wargear' },
            { id: 'skills', Icon: Icons.Shield, label: 'Skills' },
            { id: 'history', Icon: Icons.Scroll, label: 'History' }
          ].map(({ id, Icon, label }) => (
            <div key={id} className="relative group">
              <button 
                onClick={() => setActiveTab(id as any)} 
                className={`w-10 h-10 rounded border transition-all duration-300 flex items-center justify-center p-2 ${
                  activeTab === id 
                    ? 'bg-[#1a1a1a] border-[#ffd700] text-white shadow-[0_0_12px_rgba(255,215,0,0.5)] scale-105' 
                    : 'bg-[#1a1a1a] border-[#8b0000] text-gray-600 hover:border-[#ffd700] hover:text-white shadow-[0_0_8px_rgba(139,0,0,0.3)]'
                }`} 
                title={label}
              >
                <div className={`w-full h-full transition-transform duration-300 ${activeTab === id ? 'scale-110 opacity-100' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                  <Icon />
                </div>
              </button>
            </div>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-4xl mx-auto space-y-8 pb-12">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div onClick={triggerUpload} className="group w-full aspect-square bg-[#0a0a0a] border border-[#444] rounded relative flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#8b0000]">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <img src={portrait} alt="Astartes Portrait" className="w-full h-full object-cover opacity-60 grayscale contrast-125 transition-opacity group-hover:opacity-80" />
                  <div className="absolute inset-0 pointer-events-none opacity-20"><div className="h-px w-full bg-green-500 absolute animate-[scan_4s_linear_infinite]"></div></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-2 left-0 right-0 px-2 text-center pointer-events-none text-[7px] font-bold text-red-600 uppercase tracking-[0.1em] drop-shadow-md">+++ Interface to update visual record +++</div>
                </div>
              </div>
              <div className="md:col-span-3 grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Name</label>
                  <input value={character.name} onChange={e => setCharacter({...character, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] h-10 px-3 rounded text-white gothic-font tracking-wide focus:border-[#8b0000] outline-none transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                    Chapter
                  </label>
                  <div className="flex gap-2">
                    <select value={character.chapter} onChange={e => handleChapterChange(e.target.value)} className="flex-1 bg-[#1a1a1a] border border-[#333] h-10 px-3 rounded text-white focus:border-[#8b0000] outline-none transition-colors">
                      {CHAPTERS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button 
                      onClick={() => setShowHonorsModal(true)}
                      className="bg-[#1a1a1a] border border-[#8b0000] p-0 rounded overflow-hidden hover:border-[#ffd700] transition-all shadow-[0_0_8px_rgba(139,0,0,0.5)] w-10 h-10 flex-shrink-0 flex items-center justify-center group"
                      title="Service Honors"
                    >
                      <img 
                        src="https://static.wikia.nocookie.net/dawn-of-war-unification-mod/images/b/b5/Races_SpaceMarine_Banner.png/revision/latest?cb=20230819172253" 
                        alt="Service Honors" 
                        className="w-full h-full object-contain p-0.5 group-hover:scale-110 transition-transform"
                      />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={`text-[10px] uppercase font-bold tracking-widest ${isSpecializationRestricted ? 'text-red-600' : 'text-gray-500'}`}>Specialization</label>
                  <select value={character.specialization} onChange={e => setCharacter({...character, specialization: e.target.value})} className={`w-full bg-[#1a1a1a] border h-10 px-3 rounded text-white border-[#333] focus:border-[#8b0000] outline-none transition-colors`}>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#ffd700] tracking-widest">Advanced Speciality</label>
                  <select 
                    value={character.advancedSpeciality} 
                    onChange={e => setCharacter({...character, advancedSpeciality: e.target.value})} 
                    className="w-full bg-[#1a1a1a] border border-[#ffd700]/30 h-10 px-3 rounded text-[#ffd700] focus:border-[#ffd700] outline-none transition-colors"
                  >
                    <option value="None">None</option>
                    {ADVANCED_SPECIALITY_RULES.map(rule => {
                      const result = rule.check(character, getCharScoreWrapper);
                      return (
                        <option key={rule.name} value={rule.name} disabled={!result.ok}>
                          {rule.name} {!result.ok ? `(REDACTED)` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2 col-span-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Rank</label>
                    <input type="number" value={character.rank} onChange={e => setCharacter({...character, rank: parseInt(e.target.value) || 1})} className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-white text-center" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Renown</label>
                    <input type="number" min="1" value={character.renown} onChange={e => setCharacter({...character, renown: Math.max(1, parseInt(e.target.value) || 1)})} className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-white text-center font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Title</label>
                    <div className="w-full bg-[#1a1a1a]/50 border border-[#333] p-2 rounded text-white text-center text-[10px] gothic-font h-[38px] flex items-center justify-center">{getRenownTitle(character.renown)}</div>
                  </div>
                </div>
              </div>
            </div>

            {activeTab === 'basics' && (
              <div className="space-y-8 animate-fadeIn">
                <SectionHeader title="Characteristics" icon={<Icons.Info />} />
                <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
                  {(Object.keys(character.characteristics) as Array<keyof Characteristics>).map(key => {
                    const armorBonus = key === 'S' ? (ARMOR_PATTERNS[character.armor.pattern]?.strengthBonus || 0) : 0;
                    return <StatBlock key={key} label={key} stat={character.characteristics[key]} onChange={(v) => updateStatBase(key, v)} armorBonus={armorBonus} />;
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-[#1a1a1a] border-l-4 border-[#ffd700] p-4 rounded shadow-md flex flex-col h-full">
                      <label className="text-[10px] font-bold text-[#ffd700] uppercase tracking-widest block mb-2">Personal Demeanor</label>
                      <select value={character.personalDemeanor} onChange={e => setCharacter({...character, personalDemeanor: e.target.value})} className="w-full bg-black border border-[#333] p-2 rounded text-sm text-gray-200 mb-2 focus:border-[#ffd700]">
                        {PERSONAL_DEMEANORS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                      </select>
                      {selectedPersonalDemeanor && <div className="text-[10px] text-gray-400 leading-tight italic flex-1">{selectedPersonalDemeanor.description}</div>}
                   </div>
                   <div 
                      className="bg-[#1a1a1a] border-l-4 border-[#8b0000] p-4 rounded shadow-md flex flex-col h-full cursor-pointer transition-all hover:bg-[#222]"
                      onMouseEnter={() => setShowFullDemeanor(true)}
                      onMouseLeave={() => setShowFullDemeanor(false)}
                      onClick={() => setShowFullDemeanor(!showFullDemeanor)}
                   >
                      <label className="text-[10px] font-bold text-[#8b0000] uppercase tracking-widest block mb-1">
                        Chapter Demeanor: {character.chapterDemeanor}
                      </label>
                      <div className="relative flex-1">
                        <div className={`text-[10px] text-gray-400 leading-tight italic transition-all duration-300 ${showFullDemeanor ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                          {currentChapterData?.demeanorSummary || "Standard traits apply."}
                        </div>
                        <div className={`text-[10px] text-gray-300 leading-relaxed transition-all duration-300 ${showFullDemeanor ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                          {currentChapterData?.demeanorDescription}
                        </div>
                      </div>
                   </div>
                </div>

                {(currentChapterData?.restrictions.length > 0 || currentChapterData?.implantsNote) && (
                  <div className="bg-[#8b0000]/10 border border-[#8b0000]/30 p-4 rounded">
                    <h4 className="text-[10px] font-bold text-[#8b0000] uppercase tracking-widest mb-2 border-b border-[#8b0000]/20 pb-1">+++ Alert - Anomaly in Inquisitorial datagrave encountered +++</h4>
                    <ul className="text-[10px] space-y-1">
                      {currentChapterData.restrictions.map(r => (
                        <li key={r} className="flex items-center gap-2 text-red-500 font-bold">
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          RESTRICTED: {r} Speciality
                        </li>
                      ))}
                      {currentChapterData.implantsNote && (
                        <li className="flex items-start gap-2 text-gray-400 italic">
                           <span className="w-1 h-1 bg-gray-600 rounded-full mt-1 flex-shrink-0"></span>
                           {currentChapterData.implantsNote}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded space-y-4">
                    <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest border-b border-[#333] pb-1">Vitals</h4>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Wounds</span><div className="flex gap-2"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.wounds.current} onChange={e => setCharacter({...character, wounds: {...character.wounds, current: parseInt(e.target.value) || 0}})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.wounds.max} readOnly /></div></div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-red-600">Critical Wounds</span><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.criticalWounds} onChange={e => setCharacter({...character, criticalWounds: Math.min(8, Math.max(0, parseInt(e.target.value) || 0))})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-gray-500" value="8" readOnly /></div></div>
                    <div className="space-y-2"><div className="flex justify-between items-center"><div className="flex items-center gap-1 group relative"><span className="text-xs font-bold">Fatigue</span><div className="hidden group-hover:block absolute left-full ml-2 w-48 bg-black border border-[#444] p-2 text-[9px] text-gray-400 z-10">Fatigue {'>'} TB ({toughnessBonus}) = Unconscious. All tests -10.</div></div><div className="flex items-center gap-2"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fatigue} onChange={e => setCharacter({...character, fatigue: parseInt(e.target.value) || 0})}/><span className="text-gray-600">/</span><span className="text-xs text-gray-500 font-bold">{toughnessBonus}</span></div></div>{isFatigued && <div className="bg-[#8b0000]/20 border border-[#8b0000]/40 p-1.5 rounded text-[9px] font-bold text-red-500 uppercase flex flex-col gap-1"><span className="animate-pulse">● -10 Penalty Active</span>{isUnconscious && <span className="text-red-700 italic">UNCONSCIOUS</span>}</div>}</div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Fate Points</span><div className="flex gap-2"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fate.current} onChange={e => setCharacter({...character, fate: {...character.fate, current: parseInt(e.target.value) || 0}})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fate.max} onChange={e => setCharacter({...character, fate: {...character.fate, max: parseInt(e.target.value) || 0}})}/></div></div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded space-y-4">
                    <h4 className="text-xs font-bold text-purple-800 uppercase tracking-widest border-b border-[#333] pb-1">Afflictions</h4>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Insanity</span><input className="w-12 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.insanity} onChange={e => setCharacter({...character, insanity: parseInt(e.target.value) || 0})}/></div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Corruption</span><input className="w-12 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.corruption} onChange={e => setCharacter({...character, corruption: parseInt(e.target.value) || 0})}/></div>
                    
                    {/* Battle Trauma accumulation */}
                    <div className="pt-2 border-t border-[#222]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-tighter">Battle Trauma</span>
                        <select 
                          className="bg-black border border-[#333] text-[9px] text-gray-400 p-1 rounded focus:border-red-800 focus:outline-none"
                          value=""
                          onChange={(e) => handleTraumaSelect(e.target.value)}
                          disabled={confirmStep !== 'none'}
                        >
                          <option value="">+ Add Trauma</option>
                          {BATTLE_TRAUMAS.map(t => (
                            <option key={t.name} value={t.name} disabled={character.battleTraumas.includes(t.name)}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Confirmation Overlay */}
                      {confirmStep !== 'none' && pendingTrauma && (
                        <div 
                          onClick={handleAuthorizeTrauma}
                          className={`mb-3 p-3 border rounded text-center gothic-font text-[9px] uppercase tracking-widest transition-all duration-500 animate-fadeIn cursor-pointer select-none group/trauma ${
                          confirmStep === 'authorizing' 
                            ? 'bg-red-950/20 border-red-800 text-red-500 hover:bg-red-900/40 hover:border-[#ffd700]/50' 
                            : 'bg-green-900/40 border-green-600 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)] font-bold pointer-events-none'
                        }`}>
                          {confirmStep === 'authorizing' 
                            ? (
                                <>
                                  <div>+++ Inquisitorial authorization is required for confirmation of affliction +++</div>
                                  <div className="text-[7px] mt-1 text-gray-500 animate-pulse group-hover/trauma:text-[#ffd700]">Interface to establish secure data-link and authorize</div>
                                </>
                              )
                            : "Affliction confirmed and archived"}
                        </div>
                      )}

                      <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-hide">
                        {character.battleTraumas.map(traumaName => {
                          const trauma = BATTLE_TRAUMAS.find(t => t.name === traumaName);
                          if (!trauma) return null;
                          return (
                            <TraumaItem 
                              key={trauma.name} 
                              trauma={trauma} 
                              onRemove={() => {
                                setCharacter({
                                  ...character, 
                                  battleTraumas: character.battleTraumas.filter(n => n !== traumaName)
                                });
                              }} 
                            />
                          );
                        })}
                        {character.battleTraumas.length === 0 && confirmStep === 'none' && (
                          <div className="text-[9px] text-gray-700 italic text-center py-1">No traumas currently archived.</div>
                        )}
                      </div>
                    </div>

                    {/* Primarch's Curse Tracker */}
                    <div className="pt-2 border-t border-[#222]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-tighter">Primarch's Curse</span>
                        <span className={`text-sm font-bold ${curseInfo.level !== 0 ? 'text-red-600' : 'text-gray-600'} drop-shadow-[0_0_5px_rgba(220,38,38,0.2)]`}>
                          {curseInfo.label}
                        </span>
                      </div>
                      
                      {curseInfo.level > 0 && curseInfo.level < 4 ? (
                        <div 
                          className={`p-2 rounded text-[10px] leading-tight cursor-pointer transition-all duration-300 ${curseInfo.level !== 0 ? 'bg-red-950/40 border border-red-900/50 text-red-400 hover:border-[#ffd700]/50 shadow-inner' : 'bg-black border border-[#222] text-gray-600'}`}
                          onMouseEnter={() => setShowFullCurse(true)}
                          onMouseLeave={() => setShowFullCurse(false)}
                          onClick={() => setShowFullCurse(!showFullCurse)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold uppercase tracking-tight">{currentChapterData?.curseName || "The Weight of Duty"}</div>
                            {cursePenalty < 0 && <span className="text-red-500 font-bold ml-2">{cursePenalty} Tests</span>}
                          </div>
                          
                          <div className="font-bold text-[#ffd700] mb-1.5 border-b border-white/5 pb-0.5">{currentLevelData?.name}</div>
                          
                          <div className="relative min-h-[3.5em]">
                            <div className={`transition-all duration-500 ease-in-out ${showFullCurse ? 'opacity-0 h-0 scale-95 overflow-hidden' : 'opacity-100 scale-100'}`}>
                              <span className="italic text-gray-300">{currentLevelData?.summary}</span>
                            </div>
                            <div className={`transition-all duration-500 ease-in-out ${showFullCurse ? 'opacity-100 scale-100' : 'opacity-0 h-0 scale-95 overflow-hidden'}`}>
                              <span className="leading-relaxed text-gray-200 block text-justify">{currentLevelData?.full}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                         <div className="p-2 rounded text-[10px] bg-black border border-[#222] text-gray-600 italic border-dashed text-center">
                            {curseInfo.level === 4 ? "+++ SUBJECT REDACTED: EXCOMMUNICATE +++" : "+++ NO ARCHIVE DATA AT CURRENT THRESHOLD +++"}
                         </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded space-y-4">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest border-b border-[#333] pb-1">Movement</h4>
                    <div className="grid grid-cols-2 text-[10px] gap-2">
                      {(() => {
                        const hasJumpPack = character.additionalWargear?.some(item => item.name === "Jump Pack");
                        const baseMove = (Math.floor(getCharScoreWrapper('Ag') / 10) + (character.armor.abilities.includes("Giant Among Men") ? 1 : 0)) * (hasJumpPack ? 2 : 1);
                        return (
                          <>
                            <div>Half: {baseMove}m</div><div>Full: {baseMove * 2}m</div>
                            <div>Charge: {baseMove * 3}m</div><div>Run: {baseMove * 6}m</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <SectionHeader title="Astartes Physiology" icon={<Icons.Skull />} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <ImplantCard name="Secondary Heart/Ossmodula/Biscopea/Haemastamen" effect="Trait: Unnatural Strength & Toughness. Bonus Doubled (e.g. Strength 41 has SB 8 instead of 4). Reflected in the Gold Character Bonus Badges above." />
                  </div>
                  <ImplantCard name="Larraman’s Organ" effect="You do not suffer from Blood Loss." />
                  <ImplantCard name="Catalepsean Node" effect="No penalties to Perception-based Tests when awake for long periods." />
                  <ImplantCard name="Preomnor" effect="+20 to Toughness Tests against ingested poisons." />
                  <ImplantCard name="Omophagea" effect="Gain a Skill by devouring a portion of an enemy." />
                  <ImplantCard name="Multi-Lung" effect="Re-roll failed Toughness for drowning/asphyxiation. +30 vs gases." />
                  <ImplantCard name="Occulube and Lyman’s Ear" effect="Heightened Senses (Sight/Hearing), +10 Awareness Tests." />
                  <ImplantCard name="Sus-an Membrane" effect="May enter suspended animation." />
                  <ImplantCard name="Oolotic Kidney" effect="Re-roll failed Toughness to resist poisons and toxins." />
                  <ImplantCard name="Neuroglottis" effect="Detect poison by taste (Awareness). +10 Tracking if tasted." />
                  <ImplantCard name="Mucranoid" effect="Re-roll failed Toughness Tests for temperature extremes." />
                  <ImplantCard name="Betcher’s Gland" effect="Acid Spit (3m; 1d5 Dmg; Pen 4; Toxic). Blind on 3+ DoS." />
                  <ImplantCard name="Progenoids" effect="Retrievable with successful Medicae Test." />
                  <ImplantCard name="Black Carapace" effect="Power Armour negates size hit bonuses for enemies." />
                </div>
              </div>
            )}

            {activeTab === 'wargear' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-6">
                  <SectionHeader title="Tactical Ordnance (Ranged)" icon={<Icons.Wargear />} />
                  <div className="space-y-4">
                    {character.weapons.ranged.map(weapon => (
                      <div key={weapon.id} className="relative bg-[#111] border-l-4 border-[#8b0000] p-4 rounded shadow-lg flex flex-col gap-4">
                        <button 
                          onClick={() => removeRangedWeapon(weapon.id)}
                          className="absolute top-2 right-2 text-[7px] text-red-800 hover:text-red-500 font-bold uppercase tracking-tighter"
                        >
                          Purge archival record of wargear
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-start pr-8">
                          <div className="md:col-span-2">
                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Pattern Designation</div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-white font-bold">{weapon.name}</div>
                              {weapon.class && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#333] text-gray-300 uppercase font-bold tracking-wider border border-[#444]">
                                  {weapon.class}
                                </span>
                              )}
                            </div>
                            <div className="text-[9px] text-[#8b0000] mt-1 uppercase font-mono">Special: {weapon.special}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Range / ROF</div>
                            <div className="text-xs text-gray-300 font-mono">{weapon.range} / {weapon.rof}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Damage / Pen</div>
                            <div className="text-xs text-white font-bold">{weapon.damage} / {weapon.pen}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Reload</div>
                            <div className="text-xs text-gray-300 font-mono">({weapon.reload})</div>
                          </div>
                          <div className="flex items-end justify-end h-full">
                            <div className={`w-1.5 h-1.5 rounded-full ${weapon.clip.current === 0 ? 'bg-red-500 animate-ping' : 'bg-red-800 animate-pulse'}`}></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#222]">
                          <div className="flex items-center gap-3">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Current Mag:</div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateAmmo(weapon.id, -1)} className="w-6 h-6 bg-black border border-[#333] hover:border-red-600 text-red-600 text-xs rounded transition-all">-</button>
                              <div className={`text-lg font-bold font-mono min-w-[3ch] text-center ${weapon.clip.current <= 5 ? 'text-red-500' : 'text-white'}`}>
                                {weapon.clip.current}
                              </div>
                              <button onClick={() => updateAmmo(weapon.id, 1)} className="w-6 h-6 bg-black border border-[#333] hover:border-green-600 text-green-600 text-xs rounded transition-all">+</button>
                              <span className="text-gray-600 font-mono">/ {weapon.clip.max}</span>
                              <button onClick={() => reloadWeapon(weapon.id)} className="ml-2 bg-[#8b0000] hover:bg-red-700 text-white text-[9px] px-2 py-1 rounded uppercase font-bold tracking-tighter">Reload</button>
                            </div>
                          </div>
                          <div className="md:col-span-2 flex items-center gap-3">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter whitespace-nowrap">Load Type:</div>
                            <input 
                              type="text" 
                              value={weapon.ammoType || ""} 
                              onChange={(e) => updateAmmoType(weapon.id, e.target.value)}
                              placeholder="e.g. Kraken Rounds, Vengeance..."
                              className="flex-1 bg-black border border-[#222] text-xs p-1 text-gray-400 focus:text-white focus:border-[#8b0000] outline-none rounded"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <SectionHeader title="Grenades & Explosives" icon={<Icons.Wargear />} />
                  <div className="space-y-4">
                    {character.weapons.explosives.map(explosive => (
                      <div key={explosive.id} className="relative bg-[#111] border-l-4 border-orange-800 p-4 rounded shadow-lg flex flex-col gap-4">
                        <button 
                          onClick={() => removeExplosive(explosive.id)}
                          className="absolute top-2 right-2 text-[7px] text-red-800 hover:text-red-500 font-bold uppercase tracking-tighter"
                        >
                          Purge archival record of wargear
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-start pr-8">
                          <div className="md:col-span-2">
                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Designation</div>
                            <div className="text-sm text-white font-bold">{explosive.name}</div>
                            <div className="text-[9px] text-orange-800 mt-1 uppercase font-mono">Special: {explosive.special}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Range</div>
                            <div className="text-xs text-gray-300 font-mono">{explosive.range}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Damage / Pen</div>
                            <div className="text-xs text-white font-bold">{explosive.damage} / {explosive.pen}</div>
                          </div>
                          <div className="flex items-center gap-3 h-full">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Qty:</div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateExplosiveQuantity(explosive.id, -1)} className="w-5 h-5 bg-black border border-[#333] hover:border-red-600 text-red-600 text-[10px] rounded transition-all">-</button>
                              <div className={`text-sm font-bold font-mono min-w-[2ch] text-center ${explosive.quantity.current === 0 ? 'text-red-500' : 'text-white'}`}>
                                {explosive.quantity.current}
                              </div>
                              <button onClick={() => updateExplosiveQuantity(explosive.id, 1)} className="w-5 h-5 bg-black border border-[#333] hover:border-green-600 text-green-600 text-[10px] rounded transition-all">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <SectionHeader title="Close Quarter Weaponry (Melee)" icon={<Icons.Sword />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.weapons.melee.map(weapon => (
                      <div key={weapon.id} className="relative bg-[#111] border-l-4 border-gray-600 p-4 rounded shadow-lg">
                        <button 
                          onClick={() => removeMeleeWeapon(weapon.id)}
                          className="absolute top-2 right-2 text-[7px] text-red-800 hover:text-red-500 font-bold uppercase tracking-tighter"
                        >
                          Purge archival record of wargear
                        </button>
                        <div className="flex justify-between items-start mb-2 pr-8">
                          <div>
                            <div className="text-[10px] font-bold uppercase text-gray-500">Blade/Maul Type</div>
                            <div className="text-sm text-white font-bold">{weapon.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase text-gray-500">Pen</div>
                            <div className="text-sm font-bold text-[#8b0000]">{weapon.pen}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4 border-t border-[#222] pt-2 pr-8">
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Damage Profile</div>
                            <div className="text-xs font-bold">{weapon.damage}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500">Special</div>
                            <div className="text-[10px] italic text-gray-400">{weapon.special}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowWeaponModal(true)}
                    className="w-full border-2 border-dashed border-[#333] p-4 text-xs hover:border-[#8b0000] hover:text-white transition-colors rounded uppercase tracking-widest font-bold"
                  >
                    + REQUEST ADDITIONAL ORDNANCE
                  </button>
                </div>

                <SectionHeader title="Armour" icon={<Icons.Shield />} />
                <div className="space-y-6">
                  <div className="bg-[#1a1a1a] p-4 rounded border border-[#333] flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Armour Pattern</label>
                      <select 
                        value={character.armor.pattern} 
                        onChange={e => handleArmorPatternChange(e.target.value)} 
                        className="w-full bg-black border border-[#333] p-2 rounded text-white gothic-font"
                      >
                        {Object.keys(ARMOR_PATTERNS).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-4">
                      {Array.from({ length: ARMOR_PATTERNS[character.armor.pattern]?.historySlots || 1 }).map((_, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Armour History Slot {idx + 1}</label>
                          <select 
                            value={character.armor.histories[idx] || "None"} 
                            onChange={e => handleArmorHistoryChange(e.target.value, idx)} 
                            className="w-full bg-black border border-[#333] p-2 rounded text-white gothic-font"
                          >
                            {Object.keys(ARMOR_HISTORIES).map(h => (
                              <option 
                                key={h} 
                                value={h} 
                                disabled={h !== "None" && character.armor.histories.includes(h) && character.armor.histories[idx] !== h}
                              >
                                {h}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-6 rounded border border-[#333] flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative w-56 h-72 border border-[#444] rounded overflow-hidden bg-black flex flex-col items-center">
                      <img 
                        src={ARMOR_PATTERNS[character.armor.pattern]?.imageUrl || portrait} 
                        alt="Armour Profile" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale brightness-125 contrast-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                      
                      <div className="text-[8px] absolute top-2 left-2 text-red-800 font-bold uppercase z-10">Armour Profile</div>
                      <div className="text-[10px] absolute top-2 right-2 text-gray-400 font-bold uppercase z-10">{character.armor.pattern}</div>
                      
                      {/* Head */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">Head</span>
                          <span className="text-2xl font-bold text-white leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] gothic-font">{character.armor.head}</span>
                      </div>

                      {/* Torso */}
                      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">Torso</span>
                          <span className="text-2xl font-bold text-white leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] gothic-font">{character.armor.torso}</span>
                      </div>

                      {/* Arms */}
                      <div className="absolute top-[35%] left-4 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">L.Arm</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">{character.armor.leftArm}</span>
                      </div>
                      <div className="absolute top-[35%] right-4 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">R.Arm</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">{character.armor.rightArm}</span>
                      </div>

                      {/* Legs */}
                      <div className="absolute bottom-12 left-6 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">L.Leg</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">{character.armor.leftLeg}</span>
                      </div>
                      <div className="absolute bottom-12 right-6 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">R.Leg</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">{character.armor.rightLeg}</span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-3">
                      {(['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'] as Array<keyof Armor>).map(part => {
                        if (part === 'name' || part === 'pattern' || part === 'abilities') return null;
                        return (
                          <div key={part} className="p-3 bg-black border border-[#333] rounded group hover:border-[#8b0000] transition-colors">
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">{(part as string).replace(/([A-Z])/g, ' $1')} AP</div>
                              <div className="flex gap-1">
                                <button onClick={() => updateArmor(part, -1)} className="w-5 h-5 bg-[#1a1a1a] border border-[#333] hover:border-red-600 text-red-600 text-[10px] rounded flex items-center justify-center">-</button>
                                <button onClick={() => updateArmor(part, 1)} className="w-5 h-5 bg-[#1a1a1a] border border-[#333] hover:border-green-600 text-green-600 text-[10px] rounded flex items-center justify-center">+</button>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-white gothic-font">{character.armor[part as keyof Armor]}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-[#333] pb-1">Power Armour Sub Routines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {character.armor.abilities.map(abilityName => {
                        if (abilityName === "None") return null;
                        const ability = ARMOR_ABILITIES[abilityName] || ARMOR_HISTORIES[abilityName];
                        if (!ability) return null;
                        return (
                          <div key={abilityName} className={`bg-[#111] border p-3 rounded group transition-colors ${ARMOR_HISTORIES[abilityName] ? 'border-[#8b0000]/50 hover:border-[#8b0000]' : 'border-[#222] hover:border-[#ffd700]/50'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <div className={`text-[10px] font-bold uppercase tracking-tighter ${ARMOR_HISTORIES[abilityName] ? 'text-red-500' : 'text-[#ffd700]'}`}>{ability.name}</div>
                              <button 
                                onClick={() => {
                                  const isHistory = !!ARMOR_HISTORIES[abilityName];
                                  setCharacter({
                                    ...character, 
                                    armor: {
                                      ...character.armor, 
                                      histories: isHistory 
                                        ? character.armor.histories.map(h => h === abilityName ? "None" : h)
                                        : character.armor.histories,
                                      abilities: character.armor.abilities.filter(a => a !== abilityName)
                                    }
                                  });
                                }}
                                className="text-[8px] text-gray-600 hover:text-red-500 font-bold uppercase tracking-tighter"
                              >
                                Purge Record
                              </button>
                            </div>
                            <div className="text-[10px] text-gray-400 leading-tight">{ability.description}</div>
                          </div>
                        );
                      })}
                      <div className="bg-[#1a1a1a] border border-dashed border-[#333] p-3 rounded flex items-center justify-center">
                        <select 
                          className="bg-transparent text-[10px] text-gray-500 uppercase font-bold outline-none cursor-pointer hover:text-gray-300"
                          value=""
                          onChange={e => {
                            if (e.target.value && !character.armor.abilities.includes(e.target.value)) {
                              setCharacter({
                                ...character,
                                armor: {
                                  ...character.armor,
                                  abilities: [...character.armor.abilities, e.target.value]
                                }
                              });
                            }
                          }}
                        >
                          <option value="">+ Add System Node</option>
                          {Object.keys(ARMOR_ABILITIES).map(a => (
                            <option key={a} value={a} disabled={character.armor.abilities.includes(a)}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionHeader title="Additional Wargear" icon={<Icons.Wargear />} />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.additionalWargear?.map(item => (
                      <WargearCard 
                        key={item.id} 
                        item={item} 
                        onRemove={() => removeWargear(item.id)} 
                        onUpdate={(updates) => updateWargear(item.id, updates)}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowWargearModal(true)}
                    className="w-full border-2 border-dashed border-[#333] p-4 text-xs hover:border-[#8b0000] hover:text-white transition-colors rounded uppercase tracking-widest font-bold"
                  >
                    + REQUEST ADDITIONAL WARGEAR
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                <div>
                  <SectionHeader title="Skills" icon={<Icons.Shield />} />
                  <div className="bg-[#111] border border-[#333] rounded overflow-hidden shadow-inner">
                    <table className="w-full text-xs">
                      <thead className="bg-[#1a1a1a]"><tr><th className="p-2 text-left uppercase text-gray-500">Skill</th><th className="p-2 text-center uppercase text-gray-500">Char</th><th className="p-2 text-center uppercase text-gray-500">Rank</th><th className="p-2 text-center uppercase text-gray-500">Total</th></tr></thead>
                      <tbody className="divide-y divide-[#222]">
                        {character.skills.map(skill => {
                          const charStat = character.characteristics[skill.characteristic];
                          const score = getCharScore(charStat);
                          const masteryBonus = (skill.mastery - 1) * 10;
                          return (
                            <tr key={skill.name} className="hover:bg-[#1a1a1a]">
                              <td className="p-2 font-bold text-gray-200">{skill.name}</td>
                              <td className="p-2 text-center text-gray-600 font-mono">{skill.characteristic}</td>
                              <td className="p-2 text-center"><span className={`px-2 py-0.5 rounded text-[10px] ${skill.mastery > 1 ? 'bg-[#8b0000] text-white' : 'bg-[#333] text-gray-400'}`}>{skill.mastery === 1 ? 'Known' : skill.mastery === 2 ? '+10' : '+20'}</span></td>
                              <td className="p-2 text-center font-bold text-[#8b0000] text-sm">{score + (skill.mastery > 0 ? masteryBonus : -20) + (isFatigued ? -10 : 0) + cursePenalty}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <SectionHeader title="Talents & Traits" icon={<Icons.Sword />} />
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded"><h5 className="text-[10px] font-bold text-red-800 uppercase mb-3 border-b border-[#222] pb-1">Battle-Tested Talents</h5><div className="flex flex-wrap gap-2">{character.talents.map(t => <span key={t} className="text-[10px] bg-black border border-[#444] px-2 py-1 rounded text-gray-400 font-bold">{t}</span>)}</div></div>
                    <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded"><h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Physiological Traits</h5><div className="flex flex-wrap gap-2">{character.traits.map(t => <span key={t} className="text-[10px] bg-black border border-[#444] px-2 py-1 rounded text-gray-300 italic">{t}</span>)}<div className="w-full mt-2 pt-2 border-t border-[#222]"><span className="text-[10px] bg-[#8b0000] border border-[#a00000] px-3 py-1 rounded text-white font-bold uppercase tracking-widest">Solo: {character.soloModeAbility}</span></div></div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="animate-fadeIn space-y-4">
                <SectionHeader title="Eternal Service Log" icon={<Icons.Scroll />} />
                <div className="relative"><textarea value={character.history} onChange={e => setCharacter({...character, history: e.target.value})} className="w-full h-[500px] bg-[#0c0c0c] border border-[#333] p-8 rounded text-gray-400 font-serif leading-relaxed italic parchment shadow-inner focus:outline-none focus:border-[#8b0000]" placeholder="Chronicle the service of this Battle-Brother..." /><div className="absolute bottom-4 right-8 text-[10px] font-bold text-[#8b0000] uppercase tracking-widest opacity-50">Authorized Personnel Only</div></div>
              </div>
            )}
          </div>
        </div>
        <aside className="w-80 hidden lg:block"><ServoSkullChat character={character} /></aside>
      </main>

      {/* Service Honors Modal */}
      {showHonorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111] border-2 border-[#333] rounded-lg w-full max-md shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className={`p-4 transition-all duration-300 flex justify-between items-center ${isCloseHovered ? 'bg-[#8b0000]' : 'bg-transparent'}`}>
              <h3 className={`text-white gothic-font uppercase tracking-widest transition-opacity duration-300 ${isCloseHovered ? 'opacity-100' : 'opacity-0'}`}>Service Honors</h3>
              <button 
                onMouseEnter={() => setIsCloseHovered(true)}
                onMouseLeave={() => setIsCloseHovered(false)}
                onClick={() => { setShowHonorsModal(false); setIsCloseHovered(false); }} 
                className="text-white hover:scale-110 transition-transform p-1 z-10"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6 bg-[#0c0c0c]">
              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded group hover:border-[#ffd700] transition-colors cursor-pointer" onClick={() => setCharacter({...character, hasCruxTerminatus: !character.hasCruxTerminatus})}>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold uppercase ${character.hasCruxTerminatus ? 'text-[#ffd700]' : 'text-gray-600'}`}>Crux Terminatus</span>
                  <span className="text-[10px] text-gray-500 mt-1">Granted to veterans for supreme martial prowess. Required for First Company and Captaincy.</span>
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center border-2 transition-all ${character.hasCruxTerminatus ? 'border-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_10px_rgba(255,215,0,0.2)]' : 'border-[#333]'}`}>
                  {character.hasCruxTerminatus && <span className="text-[#ffd700] text-2xl font-bold leading-none">†</span>}
                </div>
              </div>
              
              <div className="text-[10px] text-gray-600 text-center italic border-t border-[#222] pt-4">
                "Only the worthy may bear the marks of the Emperor's favor."
              </div>
            </div>
            <div className="p-4 bg-[#1a1a1a] text-center border-t border-[#222]">
              <button 
                onClick={() => setShowHonorsModal(false)} 
                className="bg-[#8b0000] text-white px-6 py-2 rounded gothic-font uppercase tracking-widest text-xs hover:bg-[#a00000] transition-colors border border-transparent hover:border-[#ffd700]/30"
              >
                Confirm Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ordnance Request Modal */}
      {showWeaponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111] border-2 border-[#333] rounded-lg w-full max-w-lg shadow-[0_0_50px_rgba(139,0,0,0.3)] overflow-hidden">
            <div className={`p-4 transition-all duration-300 flex justify-between items-center ${isWeaponCloseHovered ? 'bg-[#8b0000]' : 'bg-transparent'}`}>
              <h3 className={`text-white gothic-font uppercase tracking-widest transition-opacity duration-300 ${isWeaponCloseHovered ? 'opacity-100' : 'opacity-0'}`}>Ordnance Request</h3>
              <button 
                onMouseEnter={() => setIsWeaponCloseHovered(true)}
                onMouseLeave={() => setIsWeaponCloseHovered(false)}
                onClick={() => { if (!isWeaponSubmitting) setShowWeaponModal(false); setIsWeaponCloseHovered(false); }} 
                className="text-white hover:scale-110 transition-transform p-1 z-10 disabled:opacity-50"
                disabled={isWeaponSubmitting}
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 bg-[#0c0c0c]">
              <div className="flex gap-2 p-1 bg-[#1a1a1a] rounded mb-4 overflow-x-auto scrollbar-hide">
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('ranged')}
                  className={`flex-1 py-2 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'ranged' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Tactical (Ranged)
                </button>
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('melee')}
                  className={`flex-1 py-2 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'melee' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Close Combat (Melee)
                </button>
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('explosive')}
                  className={`flex-1 py-2 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'explosive' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Explosives
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Pattern Designation (Name)</label>
                  <input 
                    disabled={isWeaponSubmitting}
                    value={newWeapon.name} 
                    onChange={e => setNewWeapon({...newWeapon, name: e.target.value})}
                    placeholder={weaponType === 'explosive' ? "e.g. Melta Bomb" : "e.g. Astartes Storm Bolter"}
                    className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                  />
                </div>

                {weaponType === 'ranged' && (
                  <div className="col-span-2 space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Weapon Class</label>
                    <div className="flex gap-2">
                      {['Pistol', 'Basic', 'Heavy', 'Mounted'].map((cls) => (
                        <button
                          key={cls}
                          disabled={isWeaponSubmitting}
                          onClick={() => setNewWeapon({...newWeapon, class: cls as any})}
                          className={`flex-1 py-1 px-2 text-[9px] font-bold uppercase tracking-widest rounded transition-all border ${newWeapon.class === cls ? 'bg-[#333] text-white border-white' : 'bg-[#1a1a1a] text-gray-500 border-[#333] hover:border-gray-500'}`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="col-span-2 grid grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500 block">Damage Dice (d10)</label>
                    <div className="flex items-center gap-1">
                      <input 
                        disabled={isWeaponSubmitting}
                        type="number"
                        min="1"
                        max="10"
                        value={weaponDamageDice} 
                        onChange={e => setWeaponDamageDice(parseInt(e.target.value) || 1)}
                        className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50 text-center"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500 block">Bonus Damage</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      type="number"
                      value={weaponDamageBonus} 
                      onChange={e => setWeaponDamageBonus(parseInt(e.target.value) || 0)}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500 block">Damage Type</label>
                    <select 
                      disabled={isWeaponSubmitting}
                      value={weaponDamageType} 
                      onChange={e => setWeaponDamageType(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    >
                      <option value="X">X (Explosive)</option>
                      <option value="R">R (Rending)</option>
                      <option value="E">E (Energy)</option>
                      <option value="I">I (Impact)</option>
                      <option value="S">S (Shock)</option>
                    </select>
                  </div>
                  <div className="col-span-3 text-center">
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter mb-1">Preview Profile</div>
                    <div className="text-sm font-bold text-white gothic-font">
                      {weaponDamageDice}d10{weaponDamageBonus >= 0 ? '+' : ''}{weaponDamageBonus} {weaponDamageType}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Penetration (Pen)</label>
                  <input 
                    disabled={isWeaponSubmitting}
                    type="number"
                    value={newWeapon.pen} 
                    onChange={e => setNewWeapon({...newWeapon, pen: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                  />
                </div>

                {weaponType !== 'melee' && (
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Range</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      value={newWeapon.range} 
                      onChange={e => setNewWeapon({...newWeapon, range: e.target.value})}
                      placeholder="e.g. 100m"
                      className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                {weaponType === 'ranged' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Rate of Fire (ROF)</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        value={newWeapon.rof} 
                        onChange={e => setNewWeapon({...newWeapon, rof: e.target.value})}
                        placeholder="e.g. S/2/4"
                        className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Mag Capacity (Clip)</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        type="number"
                        value={newWeapon.clip?.max} 
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setNewWeapon({...newWeapon, clip: { current: val, max: val }});
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Reload Speed</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        value={newWeapon.reload} 
                        onChange={e => setNewWeapon({...newWeapon, reload: e.target.value})}
                        placeholder="e.g. Full Action"
                        className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Starting Ammo Type</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        value={weaponAmmoType} 
                        onChange={e => setWeaponAmmoType(e.target.value)}
                        placeholder="e.g. Standard Bolt Rounds"
                        className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                  </>
                )}

                {weaponType === 'explosive' && (
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Starting Quantity</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      type="number"
                      min="1"
                      value={newWeapon.quantity?.max} 
                      onChange={e => {
                        const val = parseInt(e.target.value) || 1;
                        setNewWeapon({...newWeapon, quantity: { current: val, max: val }});
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                <div className="col-span-2 space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Special Rules / Traits</label>
                  <textarea 
                    disabled={isWeaponSubmitting}
                    value={newWeapon.special} 
                    onChange={e => setNewWeapon({...newWeapon, special: e.target.value})}
                    placeholder="e.g. Tearing, Reliable, Blast (5)..."
                    className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none h-16 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#1a1a1a] text-center border-t border-[#222]">
              <button 
                onClick={handleRequestWeapon} 
                disabled={isWeaponSubmitting || !newWeapon.name}
                className={`bg-[#8b0000] text-white px-8 py-2 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent hover:border-[#ffd700]/30 min-h-[40px] flex items-center justify-center mx-auto ${isWeaponSubmitting ? 'bg-green-800' : 'hover:bg-[#a00000]'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isWeaponSubmitting ? "+++ request approved +++" : "Submit request of holy weaponry to The master of the Forge"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showWargearModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0a0a] border border-[#333] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#1a1a1a] p-4 border-b border-[#333] flex justify-between items-center">
              <h3 className="text-lg gothic-font text-red-600 uppercase tracking-widest">
                {showCustomWargearView ? "Sanctioned Wargear Customization" : showReclusiamView ? "Reclusiam Reliquary" : "Wargear Requisition"}
              </h3>
              <button 
                onClick={() => {
                  setShowWargearModal(false);
                  setShowCustomWargearView(false);
                  setIsWargearAccessGranted(false);
                  setShowReclusiamView(false);
                  setIsReclusiamAccessGranted(false);
                }}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Icons.Skull />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {showReclusiamView ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4 border-b border-[#333] pb-2">
                    +++ Authorized Access: Chapter Relics & Archeotech +++
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {RELIC_WARGEAR.map((relic, idx) => (
                      <RelicCard 
                        key={idx} 
                        relic={relic} 
                        character={character}
                        selectionMode={true}
                        isSelected={selectedRelics.has(idx)}
                        onToggle={() => {
                          const newSelected = new Set(selectedRelics);
                          if (newSelected.has(idx)) {
                            newSelected.delete(idx);
                          } else {
                            newSelected.add(idx);
                          }
                          setSelectedRelics(newSelected);
                        }}
                        onRequisition={() => {}} // Disabled in selection mode
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      if (selectedRelics.size === 0) return;
                      
                      setIsRelicRequisitionApproved(true);
                      
                      setCharacter(prev => {
                        let newCharacter = { ...prev };
                        
                        // Process all selected relics
                        selectedRelics.forEach(idx => {
                          const relic = RELIC_WARGEAR[idx];

                          // Apply modifiers
                          if (relic.modifiers) {
                            if (relic.modifiers.traits) {
                              newCharacter.traits = [...new Set([...newCharacter.traits, ...relic.modifiers.traits])];
                            }
                            // Add other modifiers logic here if needed
                          }

                          if (relic.type === 'armor' && relic.stats?.armor) {
                            newCharacter.armor = {
                              ...newCharacter.armor,
                              ...relic.stats!.armor!,
                              histories: [...newCharacter.armor.histories], 
                              abilities: [...relic.stats!.armor!.abilities]
                            };
                            newCharacter.additionalWargear = [...newCharacter.additionalWargear, {
                              id: Math.random().toString(36).substr(2, 9),
                              name: relic.name,
                              description: relic.description,
                              summary: relic.summary || "Relic of the Chapter",
                              modifiers: relic.modifiers
                            }];
                          } else if (relic.type === 'wargear') {
                            newCharacter.additionalWargear = [...newCharacter.additionalWargear, {
                              id: Math.random().toString(36).substr(2, 9),
                              name: relic.name,
                              description: relic.description,
                              summary: relic.summary || "Relic of the Chapter",
                              modifiers: relic.modifiers
                            }];
                          }
                          
                          // Handle single weapon or multiple weapons
                          const weaponsToAdd = [];
                          if (relic.stats?.weapon) weaponsToAdd.push(relic.stats.weapon);
                          if (relic.stats?.weapons) weaponsToAdd.push(...relic.stats.weapons);
                          
                          weaponsToAdd.forEach((weaponStats, wIdx) => {
                            const weaponId = `relic-${Date.now()}-${idx}-${wIdx}`;
                            const isMelee = weaponStats.damage.includes("R") || weaponStats.damage.includes("E") || weaponStats.damage.includes("I"); 
                            
                            // Check if it's explicitly ranged by looking for range/rof properties
                            const isRanged = weaponStats.range && weaponStats.rof;

                            if (isRanged) {
                              newCharacter.weapons = {
                                ...newCharacter.weapons,
                                ranged: [...newCharacter.weapons.ranged, {
                                  id: weaponId,
                                  name: weaponStats.name,
                                  class: weaponStats.class,
                                  range: weaponStats.range,
                                  rof: weaponStats.rof,
                                  damage: weaponStats.damage,
                                  pen: weaponStats.pen,
                                  clip: weaponStats.clip,
                                  reload: weaponStats.reload,
                                  special: weaponStats.special,
                                  ammoType: weaponStats.ammoType
                                }]
                              };
                            } else if (isMelee) {
                              newCharacter.weapons = {
                                ...newCharacter.weapons,
                                melee: [...newCharacter.weapons.melee, {
                                  id: weaponId,
                                  name: weaponStats.name,
                                  damage: weaponStats.damage,
                                  pen: weaponStats.pen,
                                  special: weaponStats.special
                                }]
                              };
                            }
                          });
                        });
                        
                        return newCharacter;
                      });

                      setTimeout(() => {
                        setShowWargearModal(false);
                        setShowReclusiamView(false);
                        setIsReclusiamAccessGranted(false);
                        setIsRelicRequisitionApproved(false);
                        setSelectedRelics(new Set());
                      }, 2000);
                    }}
                    disabled={selectedRelics.size === 0 || isRelicRequisitionApproved}
                    className={`w-full py-3 mt-6 rounded gothic-font uppercase tracking-widest text-xs transition-all border border-transparent flex items-center justify-center shadow-lg ${
                      isRelicRequisitionApproved
                        ? 'bg-green-800 text-white hover:bg-green-700'
                        : selectedRelics.size > 0 
                          ? 'bg-[#8b0000] text-white hover:bg-[#a00000] hover:border-[#ffd700]' 
                          : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed border-[#333]'
                    }`}
                  >
                    {isRelicRequisitionApproved 
                      ? "+++ Requisition approved, carry it with honor brother +++" 
                      : "Interface to request holy relics from the Deathwatch Reclusiarch"}
                  </button>
                </div>
              ) : showCustomWargearView ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Wargear Designation</label>
                    <input 
                      value={customWargear.name}
                      onChange={e => setCustomWargear({...customWargear, name: e.target.value})}
                      placeholder="e.g. Master-Crafted Auspex"
                      className="w-full bg-[#1a1a1a] border border-[#333] p-3 rounded text-sm text-white focus:border-[#8b0000] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Functional Description</label>
                    <textarea 
                      value={customWargear.description}
                      onChange={e => setCustomWargear({...customWargear, description: e.target.value})}
                      placeholder="Describe the wargear's capabilities..."
                      className="w-full bg-[#1a1a1a] border border-[#333] p-3 rounded text-sm text-white focus:border-[#8b0000] outline-none h-32 transition-colors"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (customWargear.name && customWargear.description) {
                        addWargear(customWargear);
                        setCustomWargear({ name: '', description: '' });
                        setShowCustomWargearView(false);
                        setIsWargearAccessGranted(false);
                      }
                    }}
                    disabled={!customWargear.name || !customWargear.description}
                    className="w-full bg-[#8b0000] text-white p-3 rounded gothic-font uppercase tracking-widest text-xs hover:bg-[#a00000] transition-colors disabled:opacity-50"
                  >
                    Authorize and Add to Manifest
                  </button>
                  <button 
                    onClick={() => setShowCustomWargearView(false)}
                    className="w-full text-[10px] text-gray-500 uppercase font-bold tracking-widest hover:text-gray-300 transition-colors"
                  >
                    Return to Standard Requisition
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SPECIAL_WARGEAR.map(item => (
                    <button
                      key={item.name}
                      onClick={() => addWargear(item)}
                      className="bg-[#111] border border-[#222] p-4 rounded text-left hover:border-[#8b0000] hover:bg-[#1a1a1a] transition-all group"
                    >
                      <div className="text-xs font-bold text-white uppercase tracking-widest mb-1 group-hover:text-red-500">{item.name}</div>
                      <div className="text-[10px] text-gray-400 leading-tight">
                        {item.summary || item.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 bg-[#1a1a1a] border-t border-[#222] flex flex-col gap-3">
              {!showCustomWargearView && !showReclusiamView && (
                <>
                <button 
                  onClick={() => {
                    setIsWargearAccessGranted(true);
                    setTimeout(() => {
                      setIsWargearAccessGranted(false);
                      setShowCustomWargearView(true);
                    }, 1000);
                  }}
                  className={`w-full py-2 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent flex items-center justify-center ${
                    isWargearAccessGranted 
                      ? 'bg-green-800 text-white' 
                      : 'bg-[#1a1a1a] text-gray-500 hover:text-white hover:border-[#8b0000]'
                  }`}
                >
                  {isWargearAccessGranted ? "Access granted" : "access additional sanctioned wargear"}
                </button>
                <button 
                  onClick={() => {
                    setIsReclusiamAccessGranted(true);
                    setTimeout(() => {
                      setIsReclusiamAccessGranted(false);
                      setShowReclusiamView(true);
                    }, 1000);
                  }}
                  className={`w-full py-2 mt-2 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent flex items-center justify-center ${
                    isReclusiamAccessGranted 
                      ? 'bg-green-800 text-white' 
                      : 'bg-[#1a1a1a] text-gray-500 hover:text-white hover:border-[#8b0000]'
                  }`}
                >
                  {isReclusiamAccessGranted ? "+++ Access to reclusiam approved +++" : "+++ Request access to reclusiam +++"}
                </button>
                </>
              )}
              <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-center">
                {showCustomWargearView ? "Define custom wargear parameters for the Ordo Xenos archives" : showReclusiamView ? "Reclusiam Reliquary Access Terminal" : "Select wargear to add to the character's manifest"}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#0c0c0c] border-t border-[#333] p-2 flex justify-between text-[10px] uppercase text-gray-600 font-bold tracking-[0.2em]"><div>ORDO XENOS ENCRYPTION ACTIVE</div><div>ONLY IN DEATH DOES DUTY END</div><div className="text-red-900 animate-pulse">MACHINE SPIRIT NOMINAL</div></footer>
      <style>{`@keyframes scan { 0% { top: 0; } 100% { top: 100%; } } .animate-fadeIn { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
