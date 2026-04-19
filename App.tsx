import React, { useState, useEffect, useRef } from 'react';
import { SpecialRulesList, SPECIAL_RULES } from './components/SpecialRules';
import { CharacterData, INITIAL_CHARACTER, Characteristic, Characteristics, MeleeWeapon, RangedWeapon, Explosive, Armor, WargearItem, BattleTrauma as BattleTraumaType, STANDARD_WARGEAR, SPECIALIZATION_GEAR, WEAPON_ATTACHMENTS, AMMO_DATABASE, Cybernetic, ALL_SKILLS, ALL_TALENTS, Skill } from './types';
import { Icons, CHAPTERS, SPECIALIZATIONS, LIBRARIAN_PSYCHIC_POWERS, TACTICAL_MARINE_ABILITIES, APOTHECARY_ABILITIES, ASSAULT_MARINE_ABILITIES, DEVASTATOR_MARINE_ABILITIES, TECHMARINE_ABILITIES, GENERAL_SOLO_MODE_ABILITIES, CHAPTER_SOLO_MODE_ABILITIES, CODEX_ATTACK_PATTERNS, CHAPTER_ATTACK_PATTERNS, CODEX_DEFENSIVE_STANCES, CHAPTER_DEFENSIVE_STANCES, CHAPTER_DATA, PERSONAL_DEMEANORS, ADVANCED_SPECIALITY_RULES, BATTLE_TRAUMAS, ARMOR_PATTERNS, ARMOR_ABILITIES, ARMOR_HISTORIES, SPECIAL_WARGEAR, RELIC_WARGEAR, CHAPTER_TRAPPINGS, PROTECTIVE_WARGEAR, FORCE_WEAPON_RULE, CYBERNETICS, TALENT_DESCRIPTIONS, TRAIT_DESCRIPTIONS, DEATHWATCH_CHAMPION_ABILITIES, DEATHWATCH_CHAPLAIN_ABILITIES, DEATHWATCH_EPISTOLARY_ABILITIES, DEATHWATCH_EPISTOLARY_PSYCHIC_POWERS, DEATHWATCH_FORGE_MASTER_ABILITIES, DEATHWATCH_KEEPER_ABILITIES, DEATHWATCH_KILL_MARINE_ABILITIES, DEATHWATCH_CAPTAIN_ABILITIES, FIRST_COMPANY_VETERAN_ABILITIES, SANGUINARY_PRIEST_ABILITIES, RAVENWING_VETERAN_ABILITIES, DEATHWING_TERMINATOR_ABILITIES, WOLF_SCOUT_ABILITIES, WOLF_PRIEST_ABILITIES, TYRANNIC_WAR_VETERAN_ABILITIES, ULTRAMARINES_HONOUR_GUARD_ABILITIES, SWORD_BROTHER_ABILITIES, WOLF_GUARD_ABILITIES } from './constants';
import ServoSkullChat from './components/ServoSkullChat';
import RelicCard from './components/RelicCard';

const SORTED_RELIC_WARGEAR = [...RELIC_WARGEAR].sort((a, b) => a.name.localeCompare(b.name));

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

// --- Requirement Checking Helpers ---

const statMap: Record<string, keyof Characteristics> = {
  'ws': 'WS', 'bs': 'BS', 's': 'S', 't': 'T', 'ag': 'Ag', 'int': 'Int', 'per': 'Per', 'wp': 'WP', 'fel': 'Fel'
};

const checkRequirement = (char: CharacterData, req: string): boolean => {
  req = req.trim().toLowerCase();
  if (req === "—" || req === "-" || req === "") return true;
  if (req === "adeptus astartes" || req === "member of the deathwatch") return true;
  if (req === "raven guard") return char.chapter === "Raven Guard";
  if (req === "salamanders") return char.chapter === "Salamanders";
  if (req === "white scars") return char.chapter === "White Scars";
  
  if (req.includes(" or ")) {
    return req.split(" or ").some(p => checkRequirement(char, p));
  }

  const charMatch = req.match(/^(ws|bs|s|t|ag|int|per|wp|fel)\s*(\d+)\+?$/);
  if (charMatch) {
    const stat = statMap[charMatch[1]];
    const val = parseInt(charMatch[2]);
    return getCharScore(char.characteristics[stat]) >= val;
  }

  if (req === "adeptus astartes" || req === "member of the deathwatch" || req === "—" || req === "-") return true;

  if (req === "techmarine") return char.specialization === "Techmarine";
  if (req === "librarian") return char.specialization === "Librarian";
  if (req === "apothecary") return char.specialization === "Apothecary";
  if (req === "assault marine") return char.specialization === "Assault Marine";
  if (req === "devastator marine") return char.specialization === "Devastator Marine";
  if (req === "tactical marine") return char.specialization === "Tactical Marine";
  if (req === "deathwatch captain") return char.advancedSpeciality === "Deathwatch Captain";
  if (req === "deathwatch champion") return char.advancedSpeciality === "Deathwatch Champion";
  if (req === "deathwatch chaplain") return char.advancedSpeciality === "Deathwatch Chaplain";
  if (req === "deathwatch dreadnought" || req === "furioso dreadnought" || req === "librarian dreadnought") return ["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(char.advancedSpeciality);
  if (req === "deathwatch epistolary") return char.advancedSpeciality === "Deathwatch Epistolary";
  if (req === "deathwatch forge master") return char.advancedSpeciality === "Deathwatch Forge Master";
  if (req === "deathwatch keeper") return char.advancedSpeciality === "Deathwatch Keeper";
  if (req === "deathwatch kill-marine") return char.advancedSpeciality === "Deathwatch Kill-Marine";
  if (req === "first company veteran") return char.advancedSpeciality === "First Company Veteran";
  if (req === "sanguinary priest") return char.advancedSpeciality === "Sanguinary Priest";
  if (req === "ravenwing veteran") return char.advancedSpeciality === "Ravenwing Veteran";
  if (req === "deathwing terminator") return char.advancedSpeciality === "Deathwing Terminator";
  if (req === "wolf scout") return char.advancedSpeciality === "Wolf Scout";
  if (req === "wolf priest") return char.advancedSpeciality === "Wolf Priest";
  if (req === "wolf guard") return char.advancedSpeciality === "Wolf Guard";
  if (req === "tyrannic war veteran") return char.advancedSpeciality === "Tyrannic War Veteran";
  if (req === "ultramarines honour guard") return char.advancedSpeciality === "Ultramarines Honour Guard";
  if (req === "sword brother") return char.advancedSpeciality === "Sword Brother";

  if (req === "peer (any subgroup)" || req === "peer") {
    return char.talents.some(t => t.toLowerCase().startsWith("peer ("));
  }

  if (req.includes("mechanicus implants") || req === "mechanicus") {
    return char.cybernetics.some(c => c.name.toLowerCase().includes("mechanicus implants")) || 
           char.talents.some(t => t.toLowerCase().includes("mechanicus implants"));
  }
  
  if (req.includes("psy rating")) {
    return char.specialization === "Librarian" || char.talents.some(t => t.toLowerCase().includes("psy rating"));
  }

  if (req.includes("melee weapon training (any)")) {
    return char.talents.some(t => t.toLowerCase().includes("melee weapon training"));
  }

  if (req.includes("tech use +10") || req.includes("tech-use +10")) {
    return char.skills.some(s => s.name.toLowerCase().includes("tech-use") && s.mastery >= 2);
  }

  if (req === "acrobatic") return char.skills.some(s => s.name.toLowerCase() === "acrobatics");
  if (req === "psyniscience skill") return char.skills.some(s => s.name.toLowerCase() === "psyniscience");
  if (req === "adeptus astartes weapon training" || req === "astartes weapons training") return char.talents.some(t => t.toLowerCase() === "astartes weapon training");
  if (req === "basic weapons (flame)") return char.talents.some(t => t.toLowerCase() === "flame weapon training");
  if (req === "strong-minded") return char.talents.some(t => t.toLowerCase() === "strong minded");
  if (req === "deadeye shot") return char.talents.some(t => t.toLowerCase() === "deadeye shot");

  // Check talents
  if (char.talents.some(t => t.toLowerCase() === req || t.toLowerCase().startsWith(req + " ("))) return true;

  // Check skills
  if (char.skills.some(s => s.name.toLowerCase() === req || s.name.toLowerCase().startsWith(req + " ("))) return true;

  return false;
};

const meetsAllRequirements = (char: CharacterData, reqString: string): boolean => {
  if (reqString === "—" || reqString === "-") return true;
  const parts = reqString.split(",");
  return parts.every(p => checkRequirement(char, p));
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

const ForceWeaponTag: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} 
      className="cursor-pointer inline-block mt-1"
    >
       <span className="bg-blue-900/30 text-blue-300 text-[8px] px-1.5 py-0.5 rounded border border-blue-700/50 hover:bg-blue-800/50 transition-colors">
          Force Weapon Rule
       </span>
       {expanded && (
         <div className="mt-1 text-[9px] text-gray-300 bg-[#0a0a0a] p-2 rounded border border-blue-900/50 leading-relaxed animate-fadeIn">
           {FORCE_WEAPON_RULE}
         </div>
       )}
    </div>
  )
};

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

const AttachmentChip: React.FC<{ 
  name: string; 
  onRemove: () => void; 
}> = ({ name, onRemove }) => {
  const [showInfo, setShowInfo] = useState(false);
  const attachment = WEAPON_ATTACHMENTS[name];

  if (!attachment) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShowInfo(!showInfo);
      }}
    >
      <div className="flex items-center gap-1 bg-[#8b0000] text-white text-[9px] px-2 py-1 rounded border border-[#8b0000] cursor-help hover:bg-[#a00000] transition-colors shadow-sm">
        <span className="font-bold tracking-tight">{name}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="hover:text-black font-bold ml-1 text-red-200 transition-colors"
          title="Remove Modification"
        >
          ×
        </button>
      </div>
      
      {showInfo && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#0a0a0a] border border-[#8b0000] rounded shadow-2xl z-50 animate-fadeIn overflow-hidden">
          <div className="bg-[#1a1a1a] p-2 border-b border-[#333]">
            <div className="text-xs font-bold text-[#8b0000] uppercase tracking-wider">{attachment.name}</div>
          </div>
          <div className="p-3 space-y-2">
            <div className="text-[10px] text-gray-300 leading-tight">{attachment.description}</div>
            <div className="text-[10px] text-white bg-[#111] p-2 rounded border border-[#222]">
              <span className="font-bold text-gray-500 uppercase text-[9px] mr-1">Effect:</span>
              <span className="italic text-gray-200">{attachment.rule}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const isAdvancedSkill = (name: string) => {
  const advancedPrefixes = [
    "Acrobatics",
    "Chem-Use",
    "Literacy",
    "Interrogation",
    "Invocation",
    "Common Lore",
    "Forbidden Lore",
    "Scholastic Lore",
    "Medicae",
    "Navigation",
    "Pilot",
    "Psyniscience",
    "Shadowing",
    "Speak Language",
    "Survival",
    "Tech-Use",
    "Tracking",
    "Trade"
  ];
  return advancedPrefixes.some(prefix => name.startsWith(prefix));
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Common Lore": "The Common Lore skill allows the character to recall general information, procedures, divisions, traditions, famed individuals, and superstitions of a particular world, group, organisation, or race. This skill differs from Scholastic Lore, which represents scholarly learning, and Forbidden Lore, which involves hidden or proscribed knowledge, in that it deals with basic information learned from prolonged exposure to a culture or area.\nSuccess in a Common Lore Test indicates the character recalls general information about the subject. The GM determines what extra information to provide for additional Degrees of Success.",
  "Forbidden Lore": "Forbidden Lore skills represent knowledge usually hidden, veiled, or proscribed by an organisation or society. Mere possession of this knowledge may cause difficulties for those not associated with the group in question. Excessive knowledge of the hidden truths of the Traitor Legions, for example, can be decidedly bad for one’s health for those outside (or even inside) the Adeptus Astartes. A successful Forbidden Lore Test indicates the character recalls basic information about the subject. The GM reveals additional information as appropriate to the Degree of Success on the roll.",
  "Scholastic Lore": "Scholastic Lore grants the character knowledge of a particularly complex or esoteric subject. A successful Skill Test allows the character to recall necessary information or research a particular subject if appropriate reference material is readily available. Scholastic Lore grants a depth of knowledge far beyond that of Common Lore, requiring both experience and study to obtain. Scholastic Lore Tests can identify things that fall within the character’s area of expertise, such as a person, book, starship, or machine spirit. Scholastic Lore can overlap with Common Lore and Forbidden Lore in some areas, but it represents more indepth—and academic—information. A character with Common Lore (Imperial Creed) might know conventional information about the Cult of the Emperor and its various organisations and their practices within the Imperium, but one with Scholastic Lore (Imperial Creed) would be able to name the various cults within a subsector and their varying levels of divergence from the Ministorum. Scholastic Lore Tests require no time, as the character either knows the fact or not. Researching, however, requires an Extended Test of a duration and difficulty appropriate to the task at hand.",
  "Navigation": "The character uses the Navigation Skill to plot a course between two points. The course might be across a continent or across a star system. A successful Navigation Test also provides an estimated travel time based on geography, cosmography, prevailing conditions, weather, and solar winds. Surface navigation is used to navigate across a planet’s surface, using logi-compasses, map readouts, and geographical knowledge. Stellar navigation is used to navigate in space between planets, using star-charts, and carto-mantic rituals. A Navigation Test represents several hours of charting courses, consulting maps, and making necessary trajectory corrections. However, 1 minute is adequate for the purpose of finding the character’s current location.\nSkill Use: 1 minute for simple location; 1d5 hours for plotting courses or routes",
  "Pilot": "Characters utilise the Pilot Skill to fly anything from personal jump packs, to small atmospheric craft such as landers or guncutters, to void-capable fighters, bombers, and capital vessels. Under normal conditions, piloting does not require a test, but unusual or difficult conditions such as storms, obstacles or dangerous manoeuvres do require a Skill Test. When chasing another vehicle or ship or contesting for position, the character makes an opposed Pilot Test against his opponent. The skill also allows the character to control land-based, hover, or skimmer-type vehicles. Vehicles include Cargo-8s, Rhinos, Land Speeders, Sentinels, and other ground-based transports. Normal driving does not require a test, but a test is required for hazardous conditions, excessive speed, or dangerous manoeuvres.\nSkill Use: Half Action",
  "Speak Language": "The Speak Language Skill is used to communicate with others using the same language. The Imperium has nearly as many languages as it has star systems, but for all this variety, most can speak or understand a variation of Low Gothic. In most situations, Skill Tests are unnecessary so long as those involved all speak a common tongue. However, communication with those using obscure dialects or cryptic, complex concepts requires a test at an appropriate difficulty.",
  "Trade": "Trade Skills allow the character to create things, from guns to starships. Characters with this Skill can earn money or reputation plying a trade. They can identify the works of particularly famous or infamous craftsmen, or recall information concerning items of their trade. Trade Tests can represent the work of an hour, week, or month depending on the complexity of the task at hand. However, tests that involve the examination of an item to recall information require a Full Action."
};

// --- Main App ---

const getAbilityDescription = (name: string): string | undefined => {
  if (name === "Angel of Death") {
    return "The Assault Marine gains the Swift Attack talent and may use Jump Packs.";
  }
  if (name === "Battle-psyker") {
    return "The Librarian begins the game with a Psy Rating of 3 and access to three Psychic Powers.";
  }
  const apoth = APOTHECARY_ABILITIES.find(a => a.name === name);
  if (apoth) return apoth.description;
  const assault = ASSAULT_MARINE_ABILITIES.find(a => a.name === name);
  if (assault) return assault.description;
  const dev = DEVASTATOR_MARINE_ABILITIES.find(a => a.name === name);
  if (dev) return dev.description;
  const tactical = TACTICAL_MARINE_ABILITIES.find(a => a.name === name);
  if (tactical) return tactical.description;
  const techmarine = TECHMARINE_ABILITIES.find(a => a.name === name);
  if (techmarine) return techmarine.description;
  const champion = DEATHWATCH_CHAMPION_ABILITIES.find(a => a.name === name);
  if (champion) return champion.description;
  const chaplain = DEATHWATCH_CHAPLAIN_ABILITIES.find(a => a.name === name);
  if (chaplain) return chaplain.description;
  const epistolary = DEATHWATCH_EPISTOLARY_ABILITIES.find(a => a.name === name);
  if (epistolary) return epistolary.description;
  const forgeMaster = DEATHWATCH_FORGE_MASTER_ABILITIES.find(a => a.name === name);
  if (forgeMaster) return forgeMaster.description;
  const keeper = DEATHWATCH_KEEPER_ABILITIES.find(a => a.name === name);
  if (keeper) return keeper.description;
  const killMarine = DEATHWATCH_KILL_MARINE_ABILITIES.find(a => a.name === name);
  if (killMarine) return killMarine.description;
  const captain = DEATHWATCH_CAPTAIN_ABILITIES.find(a => a.name === name);
  if (captain) return captain.description;
  const firstCompany = FIRST_COMPANY_VETERAN_ABILITIES.find(a => a.name === name);
  if (firstCompany) return firstCompany.description;
  const sanguinaryPriest = SANGUINARY_PRIEST_ABILITIES.find(a => a.name === name);
  if (sanguinaryPriest) return sanguinaryPriest.description;
  const ravenwing = RAVENWING_VETERAN_ABILITIES.find(a => a.name === name);
  if (ravenwing) return ravenwing.description;
  const deathwing = DEATHWING_TERMINATOR_ABILITIES.find(a => a.name === name);
  if (deathwing) return deathwing.description;
  const wolfScout = WOLF_SCOUT_ABILITIES.find(a => a.name === name);
  if (wolfScout) return wolfScout.description;
  const wolfPriest = WOLF_PRIEST_ABILITIES.find(a => a.name === name);
  if (wolfPriest) return wolfPriest.description;
  const wolfGuard = WOLF_GUARD_ABILITIES.find(a => a.name === name);
  if (wolfGuard) return wolfGuard.description;
  const twv = TYRANNIC_WAR_VETERAN_ABILITIES.find(a => a.name === name);
  if (twv) return twv.description;
  const uhg = ULTRAMARINES_HONOUR_GUARD_ABILITIES.find(a => a.name === name);
  if (uhg) return uhg.description;
  const sb = SWORD_BROTHER_ABILITIES.find(a => a.name === name);
  if (sb) return sb.description;
  const armor = Object.values(ARMOR_ABILITIES).find(a => a.name === name);
  if (armor) return armor.description;
  return undefined;
};

const SoloModeAbilityTag: React.FC<{ 
  ability: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string }, 
  characterRank: number,
  activeSaga?: string,
  onSagaChange?: (saga: string | undefined) => void,
  customName?: string
}> = ({ ability, characterRank, activeSaga, onSagaChange, customName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAvailable = characterRank >= ability.requiredRank;

  const renderEffects = () => {
    if (ability.name === "Hero's Saga" && isAvailable) {
      const sagas = [
        { name: "Saga of the Bear", text: "The Battle-Brother has the determination and endurance of the great Ice Bears of Fenris; even the mightiest of blows cannot lay him low. A number of times during the mission equal to half the Battle-Brother’s rank (rounding up), he may reduce the amount of damage suffered from a single hit, after deductions from Toughness Bonus and Armour, by half, rounding up. Visit Fury Upon The Evil Ones: The might of the Sons of Russ must be demonstrated for all to see; during the mission, the Battle-Brother must deal the killing blow to a single Master creature, or slay single-handed three Elite creatures." },
        { name: "Saga of the Warrior Born", text: "The Battle-Brother slays with unrelenting fury, the blood coating his blade only inspiring greater ferocity. A number of times equal to the Battle-Brother’s rank, he may gain a +10 bonus to hit in Melee for every enemy he slew in the previous turn, and/or a +1 bonus to hit for every point of Magnitude he removed from an enemy Horde. Reap a Great Tally: Many foes must fall to the Battle-Brother’s blade. The Battle-Brother must slay at least 10 individual enemies, or inflict at least 30 points of Magnitude damage (or some combination of the two: 3 magnitude is, in this case, counted as equal to a single enemy slain), and these kills must occur in melee." },
        { name: "Saga of the Beastslayer", text: "Many tales have been told of heroes triumphing against monstrous foes, and many Space Wolves seek out such prey to prove their might. A number of times equal to the Battle-Brother’s rank, he may re-roll an attack roll made against a target (creature or vehicle) that is Enormous or larger or which has a Toughness Bonus of 10 or higher. This does not have to be a failed attack roll—the Battle-Brother could re-roll a successful roll in the hopes of scoring more Degrees of Success. Fear Not the Beast: To demonstrate that he does not fear such mighty foes, the Battle-Brother must deal the killing blow to at least one enemy that is Enormous or larger or which has a Toughness Bonus of 10 or higher." }
      ];

      if (activeSaga) {
        const activeSagaData = sagas.find(s => s.name === activeSaga);
        return (
          <>
            <span className="font-bold text-white">Effects:</span>{' '}
            {activeSagaData?.text}
            <button 
              className="mt-3 text-[10px] bg-red-900/50 hover:bg-red-900 text-white px-3 py-1.5 rounded border border-red-700 w-full font-bold tracking-wider uppercase transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (onSagaChange) onSagaChange(undefined);
              }}
            >
              Purge Saga
            </button>
          </>
        );
      }

      return (
        <>
          <span className="font-bold text-white">Effects:</span>{' '}
          The people of Fenris have a long and proud tradition of storytelling, recounting their history in the tales of their heroes, and the Space Wolves are no different, with every Battle-Brother seeking to forge a great saga of triumph, honour, and heroism over the course of their long lives. When taking an Oath with his Kill-Team, the Battle-Brother may swear his own oath, a promise of his future accomplishments and the saga that comes from them. While under this oath, the Battle-Brother will strive all the harder to achieve his personal goal. The sagas that the Battle-Brother could aspire towards are listed below—one, and only one, should be chosen before each mission. Each oath grants a benefit, but also comes with a requirement, and if this is not fulfilled, the Battle-Brother’s honour and skill will be in question, tarring his reputation and reducing his Renown by 1d5 at the end of the mission.
          <div className="mt-3 space-y-2">
            {sagas.map(saga => (
              <div 
                key={saga.name}
                className="p-2 border rounded border-[#333] bg-[#111] hover:bg-[#222] cursor-pointer"
                onClick={() => {
                  if (onSagaChange) onSagaChange(saga.name);
                }}
              >
                <div className="font-bold text-[#ffd700] mb-1">{saga.name}</div>
                <div className="text-[9px] text-gray-300">{saga.text}</div>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <span className="font-bold text-white">Effects:</span>{' '}
        {ability.effects.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < ability.effects.split('\n').length - 1 && <br />}
          </span>
        ))}
      </>
    );
  };

  const displayName = customName || (ability.name === "Hero's Saga" && activeSaga ? activeSaga : ability.name);

  return (
    <div className="relative group">
      <span 
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[10px] border px-2 py-1 rounded font-bold uppercase tracking-widest cursor-pointer ${
          !isAvailable 
            ? 'border-[#444] text-gray-600 bg-[#111]'
            : ability.chapter 
              ? 'border-[#a00000] text-white bg-[#8b0000] hover:bg-[#a00000]' 
              : 'border-[#ffd700] text-[#ffd700] bg-[#ffd700]/10 hover:bg-[#ffd700]/20'
        }`}
      >
        {isAvailable ? displayName : 'REDACTED'}
      </span>
      {isOpen && (
        <div className={`absolute z-50 bottom-full left-0 mb-2 w-80 bg-black border ${ability.chapter ? 'border-[#a00000] shadow-[0_0_15px_rgba(139,0,0,0.2)]' : 'border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.2)]'} p-3 rounded max-h-96 overflow-y-auto`}>
          <div className={`text-xs font-bold ${ability.chapter ? 'text-red-500' : 'text-[#ffd700]'} mb-1`}>{displayName}</div>
          {ability.chapter && (
            <div className="text-[10px] font-bold text-gray-400 mb-2">Chapter: {ability.chapter}</div>
          )}
          <div className="text-[10px] text-gray-400 mb-2">Required Rank: {ability.requiredRank}</div>
          <div className={`text-[10px] leading-tight ${!isAvailable ? 'blur-sm select-none' : 'text-gray-300'}`}>
            <div className="mb-2">
              {renderEffects()}
            </div>
            <div className="mt-2 pt-2 border-t border-[#333]"><span className="font-bold text-white">Improvement:</span> {ability.improvement}</div>
          </div>
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-red-600 font-bold uppercase tracking-widest border-2 border-red-600 p-1 transform -rotate-12 bg-black/80">
                Insufficient Rank
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SquadModeAbilityTag: React.FC<{ ability: typeof CODEX_ATTACK_PATTERNS[0] & { chapter?: string }, customName?: string }> = ({ ability, customName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayName = customName || ability.name;

  return (
    <div className="relative group">
      <span 
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[10px] bg-[#ffd700]/10 border px-3 py-1 rounded font-bold uppercase tracking-widest cursor-pointer ${ability.chapter ? 'border-[#a00000] text-white bg-[#8b0000] hover:bg-[#a00000]' : 'border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/20'}`}
      >
        {displayName}
      </span>
      {isOpen && (
        <div className={`absolute z-50 bottom-full left-0 mb-2 w-64 bg-black border ${ability.chapter ? 'border-[#a00000] shadow-[0_0_15px_rgba(139,0,0,0.2)]' : 'border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.2)]'} p-3 rounded`}>
          <div className={`text-xs font-bold ${ability.chapter ? 'text-red-500' : 'text-[#ffd700]'} mb-1`}>{displayName}</div>
          {ability.chapter && <div className="text-[10px] font-bold text-gray-400 mb-2">Original Chapter: {ability.chapter}</div>}
          <div className="flex gap-2 text-[10px] text-gray-400 mb-2">
            <span><span className="text-white">Action:</span> {ability.action}</span>
            <span><span className="text-white">Cost:</span> {ability.cost}</span>
            <span><span className="text-white">Sustained:</span> {ability.sustained ? 'Yes' : 'No'}</span>
          </div>
          <div className="text-[10px] leading-tight text-gray-300">
            <div className="mb-2">
              <span className="font-bold text-white">Effects:</span>{' '}
              {ability.effects.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < ability.effects.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div><span className="font-bold text-white">Improvement:</span> {ability.improvement}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const AbilityTag: React.FC<{ ability: string, character?: CharacterData, setCharacter?: React.Dispatch<React.SetStateAction<CharacterData>> }> = ({ ability, character, setCharacter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const description = getAbilityDescription(ability);

  return (
    <div className="relative group flex items-center gap-1">
      <span 
        onClick={() => description && setIsOpen(!isOpen)}
        className={`text-[10px] bg-black border border-[#444] px-2 py-1 rounded text-[#ffd700] font-bold ${description ? 'cursor-pointer hover:bg-[#222]' : ''}`}
      >
        {ability}
      </span>
      
      {ability === "The Making of a Saga" && character && setCharacter && (
        <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded px-2 py-0.5 ml-1">
          <button 
            className="text-gray-400 hover:text-white px-1"
            onClick={() => setCharacter({ ...character, sagaTokens: Math.max(0, (character.sagaTokens || 0) - 1) })}
          >
            -
          </button>
          <span className="text-[10px] font-bold text-[#ffd700] px-2 min-w-[20px] text-center">
            {character.sagaTokens || 0}
          </span>
          <button 
            className="text-gray-400 hover:text-white px-1"
            onClick={() => setCharacter({ ...character, sagaTokens: Math.min(5, (character.sagaTokens || 0) + 1) })}
          >
            +
          </button>
        </div>
      )}

      {/* Hover tooltip */}
      {description && !isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#111] border border-[#ffd700]/50 rounded shadow-2xl z-50 text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
          <div className="font-bold text-[#ffd700] mb-1 border-b border-[#333] pb-1">{ability}</div>
          {description}
        </div>
      )}
      {/* Click tooltip */}
      {isOpen && description && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#111] border border-[#ffd700] rounded shadow-2xl z-50 text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed">
            <div className="font-bold text-[#ffd700] mb-1 border-b border-[#333] pb-1">{ability}</div>
            {description}
          </div>
        </>
      )}
    </div>
  );
};

const TraitTag: React.FC<{ trait: string }> = ({ trait }) => {
  const [isOpen, setIsOpen] = useState(false);
  const description = TRAIT_DESCRIPTIONS[trait];

  return (
    <div className="relative">
      <span 
        onClick={() => description && setIsOpen(!isOpen)}
        className={`text-[10px] bg-black border border-[#444] px-2 py-1 rounded text-gray-300 italic ${description ? 'cursor-pointer hover:bg-[#222]' : ''}`}
      >
        {trait}
      </span>
      {isOpen && description && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 left-0 bottom-full mb-2 w-64 bg-[#111] border border-[#444] p-3 rounded shadow-xl text-xs text-gray-300 font-normal normal-case tracking-normal">
            <div className="font-bold text-white mb-1">{trait}</div>
            <div className="whitespace-pre-wrap">{description}</div>
          </div>
        </>
      )}
    </div>
  );
};

const TalentTag: React.FC<{ talent: string }> = ({ talent }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Extract base talent name (e.g., "Hatred (Orks)" -> "Hatred")
  const baseTalent = talent.split(' (')[0];
  const description = TALENT_DESCRIPTIONS[talent] || TALENT_DESCRIPTIONS[baseTalent];

  return (
    <div className="relative">
      <span 
        onClick={() => description && setIsOpen(!isOpen)}
        onMouseEnter={() => description && setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`text-[10px] bg-black border border-[#444] px-2 py-1 rounded text-gray-400 font-bold ${description ? 'cursor-pointer hover:bg-[#222]' : ''}`}
      >
        {talent}
      </span>
      {isOpen && description && (
        <>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#111] border border-[#555] rounded shadow-2xl z-50 text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed pointer-events-none">
            <div className="font-bold text-red-800 mb-1 border-b border-[#333] pb-1">{talent}</div>
            {description}
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [character, setCharacter] = useState<CharacterData>(INITIAL_CHARACTER);
  const [activeTab, setActiveTab] = useState<'basics' | 'wargear' | 'psychic' | 'skills' | 'experience' | 'history'>('basics');
  const [showFullCurse, setShowFullCurse] = useState(false);
  const [showFullDemeanor, setShowFullDemeanor] = useState(false);
  const [forceWeaponPreview, setForceWeaponPreview] = useState<string | null>(null);
  const [isForceWeaponSelectorOpen, setIsForceWeaponSelectorOpen] = useState(false);
  const [isSpecialIssueAmmoSelectorOpen, setIsSpecialIssueAmmoSelectorOpen] = useState(false);
  const [isTechmarineCyberneticSelectorOpen, setIsTechmarineCyberneticSelectorOpen] = useState(false);
  const [isApothecaryAbilitySelectorOpen, setIsApothecaryAbilitySelectorOpen] = useState(false);
  
  // Force Weapon Modal State
  const [showForceWeaponModal, setShowForceWeaponModal] = useState(false);
  const [forceWeaponSelectionState, setForceWeaponSelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedForceWeaponName, setSelectedForceWeaponName] = useState<string | null>(null);

  // Psychic Powers Modal State
  const [showPsychicPowersModal, setShowPsychicPowersModal] = useState(false);
  const [psychicPowersSelectionState, setPsychicPowersSelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedPsychicPowers, setSelectedPsychicPowers] = useState<string[]>([]);

  // Apothecary Ability Modal State
  const [showApothecaryAbilityModal, setShowApothecaryAbilityModal] = useState(false);
  const [apothecaryAbilitySelectionState, setApothecaryAbilitySelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedApothecaryAbilityName, setSelectedApothecaryAbilityName] = useState<string | null>(null);

  // Assault Marine Ability Modal State
  const [showAssaultMarineAbilityModal, setShowAssaultMarineAbilityModal] = useState(false);
  const [assaultMarineAbilitySelectionState, setAssaultMarineAbilitySelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedAssaultMarineAbilityName, setSelectedAssaultMarineAbilityName] = useState<string | null>(null);
  const [isAssaultMarineAbilitySelectorOpen, setIsAssaultMarineAbilitySelectorOpen] = useState(false);

  // Devastator Marine Ability Modal State
  const [showDevastatorMarineAbilityModal, setShowDevastatorMarineAbilityModal] = useState(false);
  const [devastatorMarineAbilitySelectionState, setDevastatorMarineAbilitySelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedDevastatorMarineAbilityName, setSelectedDevastatorMarineAbilityName] = useState<string | null>(null);

  // Black Shield Modal State
  const [showBlackShieldModal, setShowBlackShieldModal] = useState(false);

  // Keeper Modal State
  const [showKeeperWeaponModal, setShowKeeperWeaponModal] = useState(false);

  // Oath Modal State
  const [showOathModal, setShowOathModal] = useState(false);

  // Tactical Marine Ability Modal State
  const [showTacticalMarineAbilityModal, setShowTacticalMarineAbilityModal] = useState(false);
  const [tacticalMarineAbilitySelectionState, setTacticalMarineAbilitySelectionState] = useState<'selecting' | 'acquired'>('selecting');
  const [selectedTacticalMarineAbilityName, setSelectedTacticalMarineAbilityName] = useState<string | null>(null);
  const [isDevastatorMarineAbilitySelectorOpen, setIsDevastatorMarineAbilitySelectorOpen] = useState(false);
  const [isTacticalMarineAbilitySelectorOpen, setIsTacticalMarineAbilitySelectorOpen] = useState(false);

  // Level Up Modal State
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpType, setLevelUpType] = useState<'talent' | 'skill' | 'characteristic' | 'ability' | 'psychic power'>('talent');
  const [levelUpName, setLevelUpName] = useState('');
  const [levelUpSubOption, setLevelUpSubOption] = useState('');
  const [levelUpCustomSubOption, setLevelUpCustomSubOption] = useState('');
  const [levelUpCost, setLevelUpCost] = useState(0);

  // Modals state
  const [showCaptainAbilityModal, setShowCaptainAbilityModal] = useState(false);
  const [showFirstCompanyVeteranAbilityModal, setShowFirstCompanyVeteranAbilityModal] = useState(false);
  const [showDeathwingTerminatorAbilityModal, setShowDeathwingTerminatorAbilityModal] = useState(false);
  const [showSwordBrotherAbilityModal, setShowSwordBrotherAbilityModal] = useState(false);
  const [showHonorsModal, setShowHonorsModal] = useState(false);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [showWargearModal, setShowWargearModal] = useState(false);
  const [showCyberneticsModal, setShowCyberneticsModal] = useState(false);
  const [expandedCybernetics, setExpandedCybernetics] = useState<Set<string>>(new Set());
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [expandedBuySkill, setExpandedBuySkill] = useState<string | null>(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isWeaponCloseHovered, setIsWeaponCloseHovered] = useState(false);
  const [isWeaponSubmitting, setIsWeaponSubmitting] = useState(false);
  const [isWargearAccessGranted, setIsWargearAccessGranted] = useState(false);
  const [isReclusiamAccessGranted, setIsReclusiamAccessGranted] = useState(false);
  const [showReclusiamView, setShowReclusiamView] = useState(false);
  const [selectedRelics, setSelectedRelics] = useState<Set<number>>(new Set());
  const [isRelicRequisitionApproved, setIsRelicRequisitionApproved] = useState(false);
  const [showCustomWargearView, setShowCustomWargearView] = useState(false);
  const [isProtectiveAccessGranted, setIsProtectiveAccessGranted] = useState(false);
  const [showProtectiveView, setShowProtectiveView] = useState(false);
  const [showAmmoView, setShowAmmoView] = useState(false);
  const [isAmmoAccessGranted, setIsAmmoAccessGranted] = useState(false);
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

  const updateAmmo = (weaponId: string, change: number) => {
    setCharacter(prev => {
      const weapon = prev.weapons.ranged.find(w => w.id === weaponId);
      if (!weapon) return prev;

      // Determine if we need to track ammo from inventory
      const ammoType = weapon.ammoType || "Standard";
      const ammoDb = AMMO_DATABASE.find(a => a.name === ammoType);
      const isSpecial = ammoDb?.category === 'Special Issue Ammo';

      // If not special, use old logic (infinite)
      if (!isSpecial) {
          const newCurrent = Math.max(0, Math.min(weapon.clip.max, weapon.clip.current + change));
          return {
            ...prev,
            weapons: {
              ...prev.weapons,
              ranged: prev.weapons.ranged.map(w => 
                w.id === weaponId ? { ...w, clip: { ...w.clip, current: newCurrent } } : w
              )
            }
          };
      }

      // Special Ammo Logic
      
      // Firing (change < 0)
      if (change < 0) {
          const newCurrent = Math.max(0, weapon.clip.current + change);
          return {
            ...prev,
            weapons: {
              ...prev.weapons,
              ranged: prev.weapons.ranged.map(w => 
                w.id === weaponId ? { ...w, clip: { ...w.clip, current: newCurrent } } : w
              )
            }
          };
      }

      // Reloading/Adding (change > 0)
      // Check if already full
      if (weapon.clip.current >= weapon.clip.max) return prev;

      // Find in inventory
      const ammoIndex = prev.ammunition.findIndex(a => a.name === ammoType);
      if (ammoIndex === -1) return prev; // No ammo in inventory

      const ammoItem = { ...prev.ammunition[ammoIndex] };
      let newClipCurrent = weapon.clip.current;
      
      let added = 0;
      for (let i = 0; i < change; i++) {
          if (newClipCurrent >= weapon.clip.max) break;

          if (ammoItem.remainingRounds > 0) {
              ammoItem.remainingRounds--;
              newClipCurrent++;
              added++;
          } else if (ammoItem.count > 0) {
              // Open a new magazine
              ammoItem.count--;
              // Add (mag size - 1) to loose rounds, use 1
              ammoItem.remainingRounds += (weapon.clip.max - 1);
              newClipCurrent++;
              added++;
          } else {
              break; // No more ammo
          }
      }

      if (added === 0) return prev;

      const newAmmunition = [...prev.ammunition];
      newAmmunition[ammoIndex] = ammoItem;

      return {
        ...prev,
        ammunition: newAmmunition,
        weapons: {
          ...prev.weapons,
          ranged: prev.weapons.ranged.map(w => 
            w.id === weaponId ? { ...w, clip: { ...w.clip, current: newClipCurrent } } : w
          )
        }
      };
    });
  };

  const reloadWeapon = (weaponId: string) => {
    setCharacter(prev => {
      const weapon = prev.weapons.ranged.find(w => w.id === weaponId);
      if (!weapon) return prev;

      const ammoType = weapon.ammoType || "Standard";
      const ammoDb = AMMO_DATABASE.find(a => a.name === ammoType);
      const isSpecial = ammoDb?.category === 'Special Issue Ammo';

      if (!isSpecial) {
          // Infinite reload for standard ammo
          return {
            ...prev,
            weapons: {
              ...prev.weapons,
              ranged: prev.weapons.ranged.map(w => 
                w.id === weaponId ? { ...w, clip: { ...w.clip, current: w.clip.max } } : w
              )
            }
          };
      }

      // Special Ammo Reload
      const ammoIndex = prev.ammunition.findIndex(a => a.name === ammoType);
      if (ammoIndex === -1) {
          alert(`No ${ammoType} found in inventory!`);
          return prev;
      }

      const ammoItem = { ...prev.ammunition[ammoIndex] };
      let newClipCurrent = weapon.clip.current;

      if (ammoItem.count > 0) {
          ammoItem.count--;
          newClipCurrent = weapon.clip.max;
      } else if (ammoItem.remainingRounds > 0) {
          const needed = weapon.clip.max - weapon.clip.current;
          const toTake = Math.min(needed, ammoItem.remainingRounds);
          ammoItem.remainingRounds -= toTake;
          newClipCurrent += toTake;
      } else {
          alert(`No ${ammoType} remaining!`);
          return prev; 
      }

      const newAmmunition = [...prev.ammunition];
      newAmmunition[ammoIndex] = ammoItem;

      return {
        ...prev,
        ammunition: newAmmunition,
        weapons: {
          ...prev.weapons,
          ranged: prev.weapons.ranged.map(w => 
            w.id === weaponId ? { ...w, clip: { ...w.clip, current: newClipCurrent } } : w
          )
        }
      };
    });
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



  const updateAmmoType = (weaponId: string, newType: string) => {
    setCharacter(prev => {
      const weapon = prev.weapons.ranged.find(w => w.id === weaponId);
      if (!weapon) return prev;

      const oldType = weapon.ammoType || "Standard";
      const oldAmmoDb = AMMO_DATABASE.find(a => a.name === oldType);
      const isOldSpecial = oldAmmoDb?.category === 'Special Issue Ammo';
      
      let newAmmunition = [...prev.ammunition];

      // Unload old ammo if special and not empty
      if (isOldSpecial && weapon.clip.current > 0) {
          const ammoIndex = newAmmunition.findIndex(a => a.name === oldType);
          if (ammoIndex !== -1) {
              const updatedAmmo = { ...newAmmunition[ammoIndex] };
              updatedAmmo.remainingRounds += weapon.clip.current;
              newAmmunition[ammoIndex] = updatedAmmo;
          }
      }

      // Determine if new ammo is special
      const newAmmoDb = AMMO_DATABASE.find(a => a.name === newType);
      const isNewSpecial = newAmmoDb?.category === 'Special Issue Ammo';
      
      // If switching to Standard (non-special), we assume it's fully loaded (infinite).
      // If switching to Special, it starts empty (needs reload from inventory).
      const newClipCurrent = isNewSpecial ? 0 : weapon.clip.max;

      return {
        ...prev,
        ammunition: newAmmunition,
        weapons: {
          ...prev.weapons,
          ranged: prev.weapons.ranged.map(w => {
            if (w.id === weaponId) {
              return { ...w, ammoType: newType, clip: { ...w.clip, current: newClipCurrent } };
            }
            return w;
          })
        }
      };
    });
  };

  const addWargear = (item: any) => {
    // Check if it's a shield with weapon stats
    if (item.weaponStats) {
      const newWeapon: MeleeWeapon = {
        id: Math.random().toString(36).substr(2, 9),
        name: item.name,
        damage: item.weaponStats.damage,
        pen: item.weaponStats.pen,
        special: item.weaponStats.special
      };
      setCharacter(prev => ({
        ...prev,
        weapons: {
          ...prev.weapons,
          melee: [...prev.weapons.melee, newWeapon]
        }
      }));
    } else {
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
    }
    setShowWargearModal(false);
    setShowProtectiveView(false);
    setIsProtectiveAccessGranted(false);
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

  const updateRangedWeaponCraftsmanship = (id: string, craftsmanship: "Common" | "Exceptional" | "Master-Crafted") => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.map(w => w.id === id ? { ...w, craftsmanship } : w)
      }
    }));
  };

  const updateWeaponSpecialRules = (id: string, type: 'ranged' | 'melee' | 'explosives', special: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        [type]: prev.weapons[type].map((w: any) => w.id === id ? { ...w, special } : w)
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

  const updateMeleeWeaponCraftsmanship = (id: string, craftsmanship: "Common" | "Exceptional" | "Master-Crafted") => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        melee: prev.weapons.melee.map(w => w.id === id ? { ...w, craftsmanship } : w)
      }
    }));
  };

  const updateArmorCraftsmanship = (craftsmanship: "Common" | "Exceptional" | "Master-Crafted") => {
    setCharacter(prev => ({
      ...prev,
      armor: {
        ...prev.armor,
        craftsmanship
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

  const getGearForSpec = (spec: string) => {
    const specGear = SPECIALIZATION_GEAR[spec];
    let newMelee: MeleeWeapon[] = [...STANDARD_WARGEAR.weapons.melee];
    const newRanged: RangedWeapon[] = [...STANDARD_WARGEAR.weapons.ranged];
    const newExplosives: Explosive[] = [...STANDARD_WARGEAR.weapons.explosives];
    const newAdditionalWargear = [...STANDARD_WARGEAR.additionalWargear];
    let newCybernetics: Cybernetic[] = [];

    if (specGear) {
      if (specGear.weapons) {
        if (specGear.weapons.melee) newMelee.push(...specGear.weapons.melee);
        if (specGear.weapons.ranged) newRanged.push(...specGear.weapons.ranged);
        if (specGear.weapons.explosives) newExplosives.push(...specGear.weapons.explosives);
      }
      if (specGear.additionalWargear) {
        newAdditionalWargear.push(...specGear.additionalWargear);
      }
      if (specGear.cybernetics) {
        newCybernetics = specGear.cybernetics.map(name => {
          const found = CYBERNETICS.find(c => c.name === name);
          return found ? { ...found, quality: 'Common' } : null;
        }).filter(Boolean) as Cybernetic[];
        
        newCybernetics.forEach(c => {
          if (c.name === "Servo-Arm" || c.name === "Servo-Harness") {
            const cq = c.quality || 'Common';
            const damage = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "2d10+16 I" : "2d10+14 I";
            const special = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "Unwieldy, +10 to Grapple Tests" : "Unwieldy";
            const count = c.name === "Servo-Harness" ? 2 : 1;
            for (let i = 0; i < count; i++) {
              newMelee.push({
                id: `servo-arm-${Date.now()}-${Math.random()}`,
                name: `Servo-Arm (${cq})`,
                damage: damage,
                pen: 10,
                special: special
              });
            }
          }
        });
      }
    }

    // Add Deathwatch Champion specific gear if applicable
    if (character.advancedSpeciality === "Deathwatch Champion") {
      const champGear = SPECIALIZATION_GEAR["Deathwatch Champion"];
      if (champGear) {
        if (champGear.weapons?.melee) newMelee.push(...champGear.weapons.melee);
        if (champGear.additionalWargear) newAdditionalWargear.push(...champGear.additionalWargear);
      }
    }

    // Add Deathwatch Chaplain specific gear if applicable
    if (character.advancedSpeciality === "Deathwatch Chaplain") {
      const chaplainGear = SPECIALIZATION_GEAR["Deathwatch Chaplain"];
      if (chaplainGear) {
        if (chaplainGear.weapons?.melee) newMelee.push(...chaplainGear.weapons.melee);
        if (chaplainGear.additionalWargear) newAdditionalWargear.push(...chaplainGear.additionalWargear);
      }
    }

    // Add Deathwatch Epistolary specific gear if applicable
    if (character.advancedSpeciality === "Deathwatch Epistolary") {
      const epistolaryGear = SPECIALIZATION_GEAR["Deathwatch Epistolary"];
      if (epistolaryGear) {
        if (epistolaryGear.weapons?.melee) newMelee.push(...epistolaryGear.weapons.melee);
        if (epistolaryGear.additionalWargear) newAdditionalWargear.push(...epistolaryGear.additionalWargear);
      }
    }

    // Add Deathwatch Forge Master specific gear if applicable
    if (character.advancedSpeciality === "Deathwatch Forge Master") {
      const forgeMasterGear = SPECIALIZATION_GEAR["Deathwatch Forge Master"];
      if (forgeMasterGear) {
        if (forgeMasterGear.weapons?.melee) newMelee.push(...forgeMasterGear.weapons.melee);
        if (forgeMasterGear.additionalWargear) newAdditionalWargear.push(...forgeMasterGear.additionalWargear);
        if (forgeMasterGear.cybernetics) {
          forgeMasterGear.cybernetics.forEach(c => {
            const cyberDef = CYBERNETICS.find(cyb => cyb.name === c);
            if (cyberDef && !newCybernetics.some(cyb => cyb.name === c)) {
              newCybernetics.push({ ...cyberDef, quality: "Common" });
              if (c === "Servo-Harness") {
                // Remove existing Servo-Arms first to avoid duplicates
                newMelee = newMelee.filter(w => !w.name.includes("Servo-Arm"));
                for (let i = 0; i < 2; i++) {
                  newMelee.push({
                    id: `servo-arm-${Date.now()}-${Math.random()}`,
                    name: `Servo-Arm (Common)`,
                    damage: "2d10+14 I",
                    pen: 10,
                    special: "Unwieldy"
                  });
                }
              }
            }
          });
        }
      }
    }

    // Add Deathwatch Keeper specific gear if applicable
    if (character.advancedSpeciality === "Deathwatch Keeper") {
      const keeperGear = SPECIALIZATION_GEAR["Deathwatch Keeper"];
      if (keeperGear) {
        if (keeperGear.weapons?.melee) newMelee.push(...keeperGear.weapons.melee);
        if (keeperGear.additionalWargear) newAdditionalWargear.push(...keeperGear.additionalWargear);
      }
    }

    return { weapons: { melee: newMelee, ranged: newRanged, explosives: newExplosives }, additionalWargear: newAdditionalWargear, cybernetics: newCybernetics };
  };

  const handleSpecializationChange = (newSpecialization: string) => {
    const gear = getGearForSpec(newSpecialization);
    setCharacter(prev => {
      // Remove any Apothecary abilities if we are switching away from Apothecary
      let newAbilities = prev.abilities || [];
      if (prev.specialization === "Apothecary" && newSpecialization !== "Apothecary") {
        newAbilities = newAbilities.filter(a => !APOTHECARY_ABILITIES.map(aa => aa.name).includes(a));
      }
      
      // Remove any Assault Marine abilities if we are switching away from Assault Marine
      if (prev.specialization === "Assault Marine" && newSpecialization !== "Assault Marine") {
        newAbilities = newAbilities.filter(a => !ASSAULT_MARINE_ABILITIES.map(aa => aa.name).includes(a));
        newAbilities = newAbilities.filter(a => a !== "Angel of Death");
      }

      // Remove any Devastator Marine abilities if we are switching away from Devastator Marine
      if (prev.specialization === "Devastator Marine" && newSpecialization !== "Devastator Marine") {
        newAbilities = newAbilities.filter(a => !DEVASTATOR_MARINE_ABILITIES.map(aa => aa.name).includes(a));
      }

      // Remove any Tactical Marine abilities if we are switching away from Tactical Marine
      if (prev.specialization === "Tactical Marine" && newSpecialization !== "Tactical Marine") {
        newAbilities = newAbilities.filter(a => !TACTICAL_MARINE_ABILITIES.map(aa => aa.name).includes(a));
      }

      // Remove Techmarine abilities
      if (prev.specialization === "Techmarine" && newSpecialization !== "Techmarine") {
        newAbilities = newAbilities.filter(a => a !== "Improve Cover");
      }

      // Remove Battle-psyker if switching away from Librarian
      if (prev.specialization === "Librarian" && newSpecialization !== "Librarian") {
        newAbilities = newAbilities.filter(a => a !== "Battle-psyker");
      }

      // Add Angel of Death if switching to Assault Marine
      if (newSpecialization === "Assault Marine" && prev.specialization !== "Assault Marine") {
        if (!newAbilities.includes("Angel of Death")) {
          newAbilities.push("Angel of Death");
        }
      }

      // Add Battle-psyker if switching to Librarian
      if (newSpecialization === "Librarian" && prev.specialization !== "Librarian") {
        if (!newAbilities.includes("Battle-psyker")) {
          newAbilities.push("Battle-psyker");
        }
      }

      // Add Techmarine abilities
      if (newSpecialization === "Techmarine" && prev.specialization !== "Techmarine") {
        if (!newAbilities.includes("Improve Cover")) {
          newAbilities.push("Improve Cover");
        }
      }

      let newTraits = prev.traits || [];
      if (prev.specialization === "Techmarine" && newSpecialization !== "Techmarine") {
        newTraits = newTraits.filter(t => t !== "Mechanicus Implants");
      }
      if (newSpecialization === "Techmarine" && prev.specialization !== "Techmarine") {
        if (!newTraits.includes("Mechanicus Implants")) {
          newTraits.push("Mechanicus Implants");
        }
      }

      let newTalents = prev.talents || [];
      if (prev.specialization === "Assault Marine" && newSpecialization !== "Assault Marine") {
        newTalents = newTalents.filter(t => t !== "Swift Attack");
      }
      if (newSpecialization === "Assault Marine" && prev.specialization !== "Assault Marine") {
        if (!newTalents.includes("Swift Attack")) {
          newTalents.push("Swift Attack");
        }
      }

      if (prev.specialization === "Techmarine" && newSpecialization !== "Techmarine") {
        newTalents = newTalents.filter(t => t !== "Electro Graft Use" && t !== "Mechadendrite Use (Servo-Arm)");
      }
      if (newSpecialization === "Techmarine" && prev.specialization !== "Techmarine") {
        if (!newTalents.includes("Electro Graft Use")) newTalents.push("Electro Graft Use");
        if (!newTalents.includes("Mechadendrite Use (Servo-Arm)")) newTalents.push("Mechadendrite Use (Servo-Arm)");
      }

      let newSkills = prev.skills || [];
      if (prev.specialization === "Tactical Marine" && newSpecialization !== "Tactical Marine") {
        newSkills = newSkills.filter(s => s.name !== "Command");
      }
      if (newSpecialization === "Tactical Marine" && prev.specialization !== "Tactical Marine") {
        if (!newSkills.some(s => s.name === "Command")) {
          newSkills.push({ name: "Command", characteristic: "Fel", mastery: 1 });
        }
      }

      if (prev.specialization === "Techmarine" && newSpecialization !== "Techmarine") {
        newSkills = newSkills.filter(s => s.name !== "Speak Language (Techna-Lingua)" && s.name !== "Tech-Use");
      }
      if (newSpecialization === "Techmarine" && prev.specialization !== "Techmarine") {
        if (!newSkills.some(s => s.name === "Speak Language (Techna-Lingua)")) {
          newSkills.push({ name: "Speak Language (Techna-Lingua)", characteristic: "Int", mastery: 1 });
        } else {
          const s = newSkills.find(s => s.name === "Speak Language (Techna-Lingua)");
          if (s && s.mastery < 1) s.mastery = 1;
        }
        if (!newSkills.some(s => s.name === "Tech-Use")) {
          newSkills.push({ name: "Tech-Use", characteristic: "Int", mastery: 1 });
        } else {
          const s = newSkills.find(s => s.name === "Tech-Use");
          if (s && s.mastery < 1) s.mastery = 1;
        }
      }

      return {
        ...prev,
        specialization: newSpecialization,
        weapons: gear.weapons,
        additionalWargear: gear.additionalWargear,
        cybernetics: gear.cybernetics || [],
        abilities: newAbilities,
        traits: newTraits,
        talents: newTalents,
        skills: newSkills
      };
    });

    if (newSpecialization === "Librarian") {
      setShowForceWeaponModal(true);
      setForceWeaponSelectionState('selecting');
      setSelectedForceWeaponName(null);
    } else if (newSpecialization === "Apothecary") {
      setShowApothecaryAbilityModal(true);
      setApothecaryAbilitySelectionState('selecting');
      setSelectedApothecaryAbilityName(null);
    } else if (newSpecialization === "Assault Marine") {
      setShowAssaultMarineAbilityModal(true);
      setAssaultMarineAbilitySelectionState('selecting');
      setSelectedAssaultMarineAbilityName(null);
    } else if (newSpecialization === "Devastator Marine") {
      setShowDevastatorMarineAbilityModal(true);
      setDevastatorMarineAbilitySelectionState('selecting');
      setSelectedDevastatorMarineAbilityName(null);
    } else if (newSpecialization === "Tactical Marine") {
      setShowTacticalMarineAbilityModal(true);
      setTacticalMarineAbilitySelectionState('selecting');
      setSelectedTacticalMarineAbilityName(null);
    }
  };

  const handleForceWeaponChange = (weaponName: string) => {
    const isSword = weaponName === "Astartes Force Sword";
    const newWeapon: MeleeWeapon = isSword 
      ? { id: 'lib_force_sword', name: "Astartes Force Sword", damage: "1d10+2 R", pen: 2, special: "Balanced, Force" }
      : { id: 'lib_force_staff', name: "Astartes Force Staff", damage: "1d10+1 I", pen: 0, special: "Balanced, Force, +15 Invocation" };

    setCharacter(prev => {
      // Remove existing force weapon (check by name or special rule)
      const otherMelee = prev.weapons.melee.filter(w => !w.special.includes("Force"));
      return {
        ...prev,
        weapons: {
          ...prev.weapons,
          melee: [...otherMelee, newWeapon]
        }
      };
    });
  };

  const handleSpecialIssueAmmoChange = (ammoName: string) => {
    const ammoData = AMMO_DATABASE.find(a => a.name === ammoName);
    if (!ammoData) return;
    
    setCharacter(prev => {
      return {
        ...prev,
        ammunition: [...prev.ammunition, { name: ammoData.name, count: 1, remainingRounds: 28 }]
      };
    });
  };

  const handleTechmarineCyberneticChange = (cyberneticName: string) => {
    const cyberneticData = CYBERNETICS.find(c => c.name === cyberneticName);
    if (!cyberneticData) return;

    setCharacter(prev => {
      // Remove any existing cybernetics that aren't Servo-Arm
      const otherCybernetics = (prev.cybernetics || []).filter(c => c.name === "Servo-Arm");
      return {
        ...prev,
        cybernetics: [...otherCybernetics, { ...cyberneticData, quality: 'Common' }]
      };
    });
  };

  const handleAdvancedSpecialityChange = (val: string) => {
                      let newWeapons = character.weapons;
                      let newAdditionalWargear = character.additionalWargear;

                      let newAbilities = character.abilities || [];
                      let newTalents = character.talents || [];
                      let newSkills = [...(character.skills || [])];
                      let newCohesion = { ...character.cohesion };
                      let newCybernetics = [...character.cybernetics];
                      let newRenown = character.renown;

                      if (val === "Deathwatch Champion") {
                        const champGear = SPECIALIZATION_GEAR["Deathwatch Champion"];
                        if (champGear) {
                          if (champGear.weapons?.melee) {
                            newWeapons = {
                              ...newWeapons,
                              melee: [...newWeapons.melee, ...champGear.weapons.melee]
                            };
                          }
                          if (champGear.additionalWargear) {
                            newAdditionalWargear = [...newAdditionalWargear, ...champGear.additionalWargear];
                          }
                        }
                        
                        // Add Deathwatch Champion abilities
                        DEATHWATCH_CHAMPION_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });
                      } else if (character.advancedSpeciality === "Deathwatch Champion") {
                        // Remove Champion gear if switching away
                        const champGear = SPECIALIZATION_GEAR["Deathwatch Champion"];
                        if (champGear) {
                          if (champGear.weapons?.melee) {
                            const champMeleeIds = champGear.weapons.melee.map(w => w.id);
                            newWeapons = {
                              ...newWeapons,
                              melee: newWeapons.melee.filter(w => !champMeleeIds.includes(w.id))
                            };
                          }
                          if (champGear.additionalWargear) {
                            const champWargearIds = champGear.additionalWargear.map(w => w.id);
                            newAdditionalWargear = newAdditionalWargear.filter(w => !champWargearIds.includes(w.id));
                          }
                        }
                        
                        // Remove Deathwatch Champion abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_CHAMPION_ABILITIES.map(aa => aa.name).includes(a));
                      }

                      if (val === "Deathwatch Chaplain") {
                        const chaplainGear = SPECIALIZATION_GEAR["Deathwatch Chaplain"];
                        if (chaplainGear) {
                          if (chaplainGear.weapons?.melee) {
                            newWeapons = {
                              ...newWeapons,
                              melee: [...newWeapons.melee, ...chaplainGear.weapons.melee]
                            };
                          }
                          if (chaplainGear.additionalWargear) {
                            newAdditionalWargear = [...newAdditionalWargear, ...chaplainGear.additionalWargear];
                          }
                        }
                        
                        // Add Deathwatch Chaplain abilities
                        DEATHWATCH_CHAPLAIN_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });

                        // Add Talents
                        const chaplainTalents = ["Fearless", "Litany of Hate", "Hatred (Choose one)"];
                        chaplainTalents.forEach(t => {
                          if (!newTalents.includes(t)) {
                            newTalents.push(t);
                          }
                        });

                        // Increase Cohesion
                        newCohesion.max += 1;
                        newCohesion.current = Math.min(newCohesion.current + 1, newCohesion.max);
                      } else if (character.advancedSpeciality === "Deathwatch Chaplain") {
                        // Remove Chaplain gear if switching away
                        const chaplainGear = SPECIALIZATION_GEAR["Deathwatch Chaplain"];
                        if (chaplainGear) {
                          if (chaplainGear.weapons?.melee) {
                            const chaplainMeleeIds = chaplainGear.weapons.melee.map(w => w.id);
                            newWeapons = {
                              ...newWeapons,
                              melee: newWeapons.melee.filter(w => !chaplainMeleeIds.includes(w.id))
                            };
                          }
                          if (chaplainGear.additionalWargear) {
                            const chaplainWargearIds = chaplainGear.additionalWargear.map(w => w.id);
                            newAdditionalWargear = newAdditionalWargear.filter(w => !chaplainWargearIds.includes(w.id));
                          }
                        }
                        
                        // Remove Deathwatch Chaplain abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_CHAPLAIN_ABILITIES.map(aa => aa.name).includes(a));

                        // Remove Talents
                        const chaplainTalents = ["Fearless", "Litany of Hate"];
                        newTalents = newTalents.filter(t => !chaplainTalents.includes(t));
                        const hatredIndex = newTalents.findIndex(t => t.startsWith("Hatred ("));
                        if (hatredIndex !== -1) {
                          newTalents.splice(hatredIndex, 1);
                        }

                        // Decrease Cohesion
                        newCohesion.max = Math.max(0, newCohesion.max - 1);
                        newCohesion.current = Math.min(newCohesion.current, newCohesion.max);
                      }

                      if (val === "Deathwatch Epistolary") {
                        const epistolaryGear = SPECIALIZATION_GEAR["Deathwatch Epistolary"];
                        if (epistolaryGear) {
                          if (epistolaryGear.weapons?.melee) {
                            newWeapons = {
                              ...newWeapons,
                              melee: [...newWeapons.melee, ...epistolaryGear.weapons.melee]
                            };
                          }
                          if (epistolaryGear.additionalWargear) {
                            newAdditionalWargear = [...newAdditionalWargear, ...epistolaryGear.additionalWargear];
                          }
                        }
                        
                        // Add Deathwatch Epistolary abilities
                        DEATHWATCH_EPISTOLARY_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });
                      } else if (character.advancedSpeciality === "Deathwatch Epistolary") {
                        // Remove Epistolary gear if switching away
                        const epistolaryGear = SPECIALIZATION_GEAR["Deathwatch Epistolary"];
                        if (epistolaryGear) {
                          if (epistolaryGear.weapons?.melee) {
                            const epistolaryMeleeIds = epistolaryGear.weapons.melee.map(w => w.id);
                            newWeapons = {
                              ...newWeapons,
                              melee: newWeapons.melee.filter(w => !epistolaryMeleeIds.includes(w.id))
                            };
                          }
                          if (epistolaryGear.additionalWargear) {
                            const epistolaryWargearIds = epistolaryGear.additionalWargear.map(w => w.id);
                            newAdditionalWargear = newAdditionalWargear.filter(w => !epistolaryWargearIds.includes(w.id));
                          }
                        }
                        
                        // Remove Deathwatch Epistolary abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_EPISTOLARY_ABILITIES.map(aa => aa.name).includes(a));
                      }

                      if (val === "Deathwatch Keeper") {
                        const keeperGear = SPECIALIZATION_GEAR["Deathwatch Keeper"];
                        if (keeperGear) {
                          if (keeperGear.additionalWargear) {
                            newAdditionalWargear = [...newAdditionalWargear, ...keeperGear.additionalWargear];
                          }
                        }
                        
                        // Add Deathwatch Keeper abilities
                        DEATHWATCH_KEEPER_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });
                        
                        // Trigger weapon selection modal
                        setShowKeeperWeaponModal(true);
                      } else if (character.advancedSpeciality === "Deathwatch Keeper") {
                        // Remove Keeper gear if switching away
                        const keeperGear = SPECIALIZATION_GEAR["Deathwatch Keeper"];
                        if (keeperGear) {
                          if (keeperGear.weapons?.melee) {
                            newWeapons = {
                              ...newWeapons,
                              melee: newWeapons.melee.filter(w => !w.id.startsWith('dk_'))
                            };
                          }
                          if (keeperGear.additionalWargear) {
                            const keeperWargearIds = keeperGear.additionalWargear.map(w => w.id);
                            newAdditionalWargear = newAdditionalWargear.filter(w => !keeperWargearIds.includes(w.id));
                          }
                        }
                        
                        // Remove Deathwatch Keeper abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_KEEPER_ABILITIES.map(aa => aa.name).includes(a));
                      }

                      if (val === "Deathwatch Forge Master") {
                        const forgeMasterGear = SPECIALIZATION_GEAR["Deathwatch Forge Master"];
                        if (forgeMasterGear) {
                          if (forgeMasterGear.weapons?.melee) {
                            newWeapons = {
                              ...newWeapons,
                              melee: [...newWeapons.melee, ...forgeMasterGear.weapons.melee]
                            };
                          }
                          if (forgeMasterGear.additionalWargear) {
                            newAdditionalWargear = [...newAdditionalWargear, ...forgeMasterGear.additionalWargear];
                          }
                          if (forgeMasterGear.cybernetics) {
                            forgeMasterGear.cybernetics.forEach(c => {
                              const cyberDef = CYBERNETICS.find(cyb => cyb.name === c);
                              if (cyberDef && !newCybernetics.some(cyb => cyb.name === c)) {
                                newCybernetics.push({ ...cyberDef, craftsmanship: "Common" });
                                if (c === "Servo-Harness") {
                                  // Remove existing Servo-Arms first to avoid duplicates
                                  newWeapons = {
                                    ...newWeapons,
                                    melee: newWeapons.melee.filter(w => !w.name.includes("Servo-Arm"))
                                  };
                                  for (let i = 0; i < 2; i++) {
                                    newWeapons = {
                                      ...newWeapons,
                                      melee: [...newWeapons.melee, {
                                        id: `servo-arm-${Date.now()}-${Math.random()}`,
                                        name: `Servo-Arm (Common)`,
                                        damage: "2d10+14 I",
                                        pen: 10,
                                        special: "Unwieldy"
                                      }]
                                    };
                                  }
                                }
                              }
                            });
                          }
                        }
                        
                        // Add Deathwatch Forge Master abilities
                        DEATHWATCH_FORGE_MASTER_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });

                        // Add Trade (Forge Master) skill
                        if (!newSkills.some(s => s.name === "Trade (Forge Master)")) {
                          newSkills.push({ name: "Trade (Forge Master)", characteristic: "Int", mastery: 1 });
                        }
                      } else if (character.advancedSpeciality === "Deathwatch Forge Master") {
                        // Remove Forge Master gear if switching away
                        const forgeMasterGear = SPECIALIZATION_GEAR["Deathwatch Forge Master"];
                        if (forgeMasterGear) {
                          if (forgeMasterGear.weapons?.melee) {
                            const forgeMasterMeleeIds = forgeMasterGear.weapons.melee.map(w => w.id);
                            newWeapons = {
                              ...newWeapons,
                              melee: newWeapons.melee.filter(w => !forgeMasterMeleeIds.includes(w.id))
                            };
                          }
                          if (forgeMasterGear.additionalWargear) {
                            const forgeMasterWargearIds = forgeMasterGear.additionalWargear.map(w => w.id);
                            newAdditionalWargear = newAdditionalWargear.filter(w => !forgeMasterWargearIds.includes(w.id));
                          }
                          if (forgeMasterGear.cybernetics) {
                            newCybernetics = newCybernetics.filter(c => !forgeMasterGear.cybernetics!.includes(c.name));
                            if (forgeMasterGear.cybernetics.includes("Servo-Harness")) {
                              // Remove all Servo-Arms
                              newWeapons = {
                                ...newWeapons,
                                melee: newWeapons.melee.filter(w => !w.name.includes("Servo-Arm"))
                              };
                              // Add back 1 Servo-Arm if they are a Techmarine
                              if (character.specialization === "Techmarine") {
                                newWeapons = {
                                  ...newWeapons,
                                  melee: [...newWeapons.melee, {
                                    id: `servo-arm-${Date.now()}-${Math.random()}`,
                                    name: `Servo-Arm (Common)`,
                                    damage: "2d10+14 I",
                                    pen: 10,
                                    special: "Unwieldy"
                                  }]
                                };
                              }
                            }
                          }
                        }
                        
                        // Remove Deathwatch Forge Master abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_FORGE_MASTER_ABILITIES.map(aa => aa.name).includes(a));
                        
                        // Remove Trade (Forge Master) skill
                        newSkills = newSkills.filter(s => s.name !== "Trade (Forge Master)");
                      }

                      if (val === "Deathwatch Kill-Marine") {
                        // Add Kill-Marine abilities
                        DEATHWATCH_KILL_MARINE_ABILITIES.forEach(ability => {
                          if (!newAbilities.includes(ability.name)) {
                            newAbilities.push(ability.name);
                          }
                        });
                      } else if (character.advancedSpeciality === "Deathwatch Kill-Marine") {
                        // Remove Kill-Marine abilities
                        newAbilities = newAbilities.filter(a => !DEATHWATCH_KILL_MARINE_ABILITIES.map(aa => aa.name).includes(a));
                      }

                      if (val === "Deathwatch Captain") {
                        // Add Chainsword
                        newWeapons = {
                          ...newWeapons,
                          melee: [...newWeapons.melee, {
                            id: `chainsword-${Date.now()}`,
                            name: "Chainsword",
                            damage: "1d10+2 R",
                            pen: 2,
                            special: "Tearing"
                          }]
                        };
                        // Add Iron Halo if they have the honor
                        if (character.hasIronHalo) {
                          if (!newAdditionalWargear.some(w => w.name === "Iron Halo")) {
                            newAdditionalWargear.push({
                              id: `iron-halo-${Date.now()}`,
                              name: "Iron Halo",
                              description: "Provides a Force Field with a Protection Rating of 50. It does not overload."
                            });
                          }
                        }
                        // Trigger ability selection
                        setShowCaptainAbilityModal(true);
                      } else if (character.advancedSpeciality === "Deathwatch Captain") {
                        // Remove Chainsword
                        newWeapons = {
                          ...newWeapons,
                          melee: newWeapons.melee.filter(w => w.name !== "Chainsword")
                        };
                        // Remove Iron Halo
                        newAdditionalWargear = newAdditionalWargear.filter(w => w.name !== "Iron Halo");
                      }

                      let newTraits = character.traits || [];
                      let newCharacteristics = { ...character.characteristics };
                      let newArmor = { ...character.armor };

                      if (val === "First Company Veteran") {
                        setShowFirstCompanyVeteranAbilityModal(true);
                      } else if (val === "Sanguinary Priest") {
                        // Automatically add Scion of Sanguinius
                        if (!newAbilities.includes("Scion of Sanguinius")) {
                          newAbilities.push("Scion of Sanguinius");
                        }
                      } else if (val === "Ravenwing Veteran") {
                        if (!newAbilities.includes("Skilled Rider")) newAbilities.push("Skilled Rider");
                        if (!newAbilities.includes("Advanced Reconnaissance")) newAbilities.push("Advanced Reconnaissance");
                      } else if (val === "Deathwing Terminator") {
                        if (!newTalents.includes("Fearless")) newTalents.push("Fearless");
                        setShowDeathwingTerminatorAbilityModal(true);
                        
                        // Equip Terminator Armour
                        const terminator = ARMOR_PATTERNS["Astartes Terminator"];
                        if (terminator) {
                          newArmor = {
                            ...newArmor,
                            pattern: "Astartes Terminator",
                            head: terminator.head,
                            torso: terminator.torso,
                            rightArm: terminator.rightArm,
                            leftArm: terminator.leftArm,
                            rightLeg: terminator.rightLeg,
                            leftLeg: terminator.leftLeg,
                            abilities: [...terminator.abilities],
                            histories: newArmor.histories.slice(0, terminator.historySlots)
                          };
                        }
                      } else if (character.advancedSpeciality === "First Company Veteran") {
                        newAbilities = newAbilities.filter(a => !FIRST_COMPANY_VETERAN_ABILITIES.map(aa => aa.name).includes(a));
                      } else if (character.advancedSpeciality === "Sanguinary Priest") {
                        newAbilities = newAbilities.filter(a => !SANGUINARY_PRIEST_ABILITIES.map(aa => aa.name).includes(a));
                      } else if (character.advancedSpeciality === "Ravenwing Veteran") {
                        newAbilities = newAbilities.filter(a => !RAVENWING_VETERAN_ABILITIES.map(aa => aa.name).includes(a));
                      } else if (character.advancedSpeciality === "Deathwing Terminator") {
                        newTalents = newTalents.filter(t => t !== "Fearless");
                        newAbilities = newAbilities.filter(a => !DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a));
                        
                        // Revert to MK VII Aquila
                        const mk7 = ARMOR_PATTERNS["MK VII Aquila"];
                        if (mk7) {
                          newArmor = {
                            ...newArmor,
                            pattern: "MK VII Aquila",
                            head: mk7.head,
                            torso: mk7.torso,
                            rightArm: mk7.rightArm,
                            leftArm: mk7.leftArm,
                            rightLeg: mk7.rightLeg,
                            leftLeg: mk7.leftLeg,
                            abilities: [...mk7.abilities],
                            histories: newArmor.histories.slice(0, mk7.historySlots)
                          };
                        }
                      } else if (character.advancedSpeciality === "Wolf Scout") {
                        newAbilities = newAbilities.filter(a => a !== "Behind Enemy Lines");
                        newCharacteristics.Fel.bonus += 5;
                        newCharacteristics.Ag.bonus -= 5;
                        newSkills = newSkills.filter(s => s.name !== "Shadowing");
                        if (!newSkills.some(s => s.name === "Command")) {
                          newSkills.push({ name: "Command", characteristic: "Fel", mastery: 1 });
                        }
                        
                        // Revert to MK VII Aquila
                        const mk7 = ARMOR_PATTERNS["MK VII Aquila"];
                        if (mk7) {
                          newArmor = {
                            ...newArmor,
                            pattern: "MK VII Aquila",
                            head: mk7.head,
                            torso: mk7.torso,
                            rightArm: mk7.rightArm,
                            leftArm: mk7.leftArm,
                            rightLeg: mk7.rightLeg,
                            leftLeg: mk7.leftLeg,
                            abilities: [...mk7.abilities],
                            histories: newArmor.histories.slice(0, mk7.historySlots)
                          };
                        }
                        
                        // Revert weapons
                        newWeapons = {
                          ...newWeapons,
                          ranged: newWeapons.ranged.filter(w => w.id !== 'ws_stalker_pistol')
                        };
                        if (!newWeapons.ranged.some(w => w.id === 'sm_bolt_pistol')) {
                          const boltPistol = STANDARD_WARGEAR.weapons.ranged.find(w => w.id === 'sm_bolt_pistol');
                          if (boltPistol) {
                            newWeapons = {
                              ...newWeapons,
                              ranged: [...newWeapons.ranged, boltPistol]
                            };
                          }
                        }
                      } else if (character.advancedSpeciality === "Wolf Priest") {
                        newAbilities = newAbilities.filter(a => a !== "Morkai's Chosen" && a !== "Oath of War");
                        newTalents = newTalents.filter(t => t !== "Fearless" && t !== "Litany of Hate" && !t.startsWith("Hatred ("));
                        newSkills = newSkills.filter(s => s.name !== "Medicae");
                        newCohesion -= 1;
                        
                        // Remove wargear
                        const wpGear = SPECIALIZATION_GEAR["Wolf Priest"];
                        if (wpGear) {
                          if (wpGear.weapons?.melee) {
                            newWeapons.melee = newWeapons.melee.filter(w => !wpGear.weapons!.melee!.some(gw => gw.id === w.id));
                          }
                          if (wpGear.additionalWargear) {
                            newAdditionalWargear = newAdditionalWargear.filter(w => !wpGear.additionalWargear!.some(gw => gw.id === w.id));
                          }
                        }
                      } else if (character.advancedSpeciality === "Wolf Guard") {
                        newAbilities = newAbilities.filter(a => a !== "The Making of a Saga");
                        newAdditionalWargear = newAdditionalWargear.filter(w => w.id !== 'wolf_guard_extra_trapping');
                        
                        // Revert to MK VII Aquila
                        const mk7 = ARMOR_PATTERNS["MK VII Aquila"];
                        if (mk7) {
                          newArmor = {
                            ...newArmor,
                            pattern: "MK VII Aquila",
                            head: mk7.head,
                            torso: mk7.torso,
                            rightArm: mk7.rightArm,
                            leftArm: mk7.leftArm,
                            rightLeg: mk7.rightLeg,
                            leftLeg: mk7.leftLeg,
                            abilities: [...mk7.abilities],
                            histories: newArmor.histories.slice(0, mk7.historySlots)
                          };
                        }
                      } else if (character.advancedSpeciality === "Tyrannic War Veteran") {
                        newAbilities = newAbilities.filter(a => a !== "The Scars of Experience");
                        newTalents = newTalents.filter(t => t !== "Hatred (Tyranids)");
                        
                        // Remove wargear
                        const twvGear = SPECIALIZATION_GEAR["Tyrannic War Veteran"];
                        if (twvGear && twvGear.additionalWargear) {
                          newAdditionalWargear = newAdditionalWargear.filter(w => !twvGear.additionalWargear!.some(gw => gw.id === w.id));
                        }
                        
                        // Remove conditional weapons
                        if (character.specialization === "Apothecary" || character.specialization === "Tactical Marine") {
                          newWeapons.melee = newWeapons.melee.filter(w => w.id !== 'twv_chainsword');
                        } else if (character.specialization === "Assault Marine") {
                          newWeapons.ranged = newWeapons.ranged.filter(w => w.id !== 'twv_bolter');
                        }
                      } else if (character.advancedSpeciality === "Ultramarines Honour Guard") {
                        newAbilities = newAbilities.filter(a => a !== "Astartes Paragon");
                        newCohesion -= 2;
                        
                        // Remove wargear
                        const uhgGear = SPECIALIZATION_GEAR["Ultramarines Honour Guard"];
                        if (uhgGear && uhgGear.additionalWargear) {
                          newAdditionalWargear = newAdditionalWargear.filter(w => !uhgGear.additionalWargear!.some(gw => gw.id === w.id));
                        }
                      } else if (character.advancedSpeciality === "Sword Brother") {
                        newAbilities = newAbilities.filter(a => !SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a));
                      }

                      if (val === "Deathwatch Forge Master") {
                        const artificer = ARMOR_PATTERNS["Artificer"];
                        if (artificer) {
                          newArmor = {
                            ...newArmor,
                            pattern: "Artificer",
                            head: artificer.head,
                            torso: artificer.torso,
                            rightArm: artificer.rightArm,
                            leftArm: artificer.leftArm,
                            rightLeg: artificer.rightLeg,
                            leftLeg: artificer.leftLeg,
                            abilities: [...artificer.abilities],
                            histories: newArmor.histories.slice(0, artificer.historySlots)
                          };
                        }
                      } else if (val === "Wolf Scout") {
                        if (!newAbilities.includes("Behind Enemy Lines")) newAbilities.push("Behind Enemy Lines");
                        newAbilities = newAbilities.filter(a => a !== "Bolter Mastery" && a !== "Tactical Expertise");
                        newCharacteristics.Fel.bonus -= 5;
                        newCharacteristics.Ag.bonus += 5;
                        newSkills = newSkills.filter(s => s.name !== "Command");
                        if (!newSkills.some(s => s.name === "Shadowing")) {
                          newSkills.push({ name: "Shadowing", characteristic: "Ag", mastery: 1 });
                        }
                        
                        // Equip Scout Armour
                        const scoutArmour = ARMOR_PATTERNS["Astartes Scout Armour"];
                        if (scoutArmour) {
                          newArmor = {
                            ...newArmor,
                            pattern: "Astartes Scout Armour",
                            head: scoutArmour.head,
                            torso: scoutArmour.torso,
                            rightArm: scoutArmour.rightArm,
                            leftArm: scoutArmour.leftArm,
                            rightLeg: scoutArmour.rightLeg,
                            leftLeg: scoutArmour.leftLeg,
                            abilities: [...scoutArmour.abilities],
                            histories: []
                          };
                        }
                        
                        // Equip weapons
                        newWeapons = {
                          ...newWeapons,
                          ranged: newWeapons.ranged.filter(w => w.id !== 'sm_bolt_pistol')
                        };
                        const stalkerPistol = SPECIALIZATION_GEAR["Wolf Scout"]?.weapons?.ranged?.[0];
                        if (stalkerPistol && !newWeapons.ranged.some(w => w.id === stalkerPistol.id)) {
                          newWeapons = {
                            ...newWeapons,
                            ranged: [...newWeapons.ranged, stalkerPistol]
                          };
                        }
                      } else if (val === "Wolf Priest") {
                        if (!newAbilities.includes("Morkai's Chosen")) newAbilities.push("Morkai's Chosen");
                        if (!newAbilities.includes("Oath of War")) newAbilities.push("Oath of War");
                        if (!newTalents.includes("Fearless")) newTalents.push("Fearless");
                        if (!newTalents.includes("Litany of Hate")) newTalents.push("Litany of Hate");
                        if (!newTalents.some(t => t.startsWith("Hatred ("))) newTalents.push("Hatred (Choose one)");
                        if (!newSkills.some(s => s.name === "Medicae")) {
                          newSkills.push({ name: "Medicae", characteristic: "Int", mastery: 1 });
                        }
                        newCohesion += 1;
                        
                        // Equip wargear
                        const wpGear = SPECIALIZATION_GEAR["Wolf Priest"];
                        if (wpGear) {
                          if (wpGear.weapons?.melee) {
                            wpGear.weapons.melee.forEach(w => {
                              if (!newWeapons.melee.some(gw => gw.id === w.id)) {
                                newWeapons.melee.push(w);
                              }
                            });
                          }
                          if (wpGear.additionalWargear) {
                            wpGear.additionalWargear.forEach(w => {
                              if (!newAdditionalWargear.some(gw => gw.id === w.id)) {
                                newAdditionalWargear.push(w);
                              }
                            });
                          }
                        }
                      } else if (val === "Tyrannic War Veteran") {
                        if (!newAbilities.includes("The Scars of Experience")) newAbilities.push("The Scars of Experience");
                        if (!newTalents.includes("Hatred (Tyranids)")) newTalents.push("Hatred (Tyranids)");
                        
                        // Add 1d10 Renown (we'll just add 5 for simplicity as requested, or simulate a roll)
                        const renownRoll = Math.floor(Math.random() * 10) + 1;
                        newRenown += renownRoll;
                        
                        // Equip wargear
                        const twvGear = SPECIALIZATION_GEAR["Tyrannic War Veteran"];
                        if (twvGear && twvGear.additionalWargear) {
                          twvGear.additionalWargear.forEach(w => {
                            if (!newAdditionalWargear.some(gw => gw.id === w.id)) {
                              newAdditionalWargear.push(w);
                            }
                          });
                        }
                        
                        // Conditional weapons
                        if (character.specialization === "Apothecary" || character.specialization === "Tactical Marine") {
                          const chainsword = { id: 'twv_chainsword', name: "Astartes Chainsword", damage: "1d10+3 R", pen: 4, special: "Tearing, Balanced" };
                          if (!newWeapons.melee.some(w => w.id === chainsword.id)) {
                            newWeapons.melee.push(chainsword);
                          }
                        } else if (character.specialization === "Assault Marine") {
                          const bolter = { id: 'twv_bolter', name: "Astartes Bolter with Fire Selector", class: "Basic" as const, range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as any };
                          if (!newWeapons.ranged.some(w => w.id === bolter.id)) {
                            newWeapons.ranged.push(bolter);
                          }
                        }
                      } else if (val === "Wolf Guard") {
                        if (!newAbilities.includes("The Making of a Saga")) newAbilities.push("The Making of a Saga");
                        
                        // Equip Artificer Armour
                        const artificer = ARMOR_PATTERNS["Artificer"];
                        if (artificer) {
                          newArmor = {
                            ...newArmor,
                            pattern: "Artificer",
                            head: artificer.head,
                            torso: artificer.torso,
                            rightArm: artificer.rightArm,
                            leftArm: artificer.leftArm,
                            rightLeg: artificer.rightLeg,
                            leftLeg: artificer.leftLeg,
                            abilities: [...artificer.abilities],
                            histories: newArmor.histories.slice(0, artificer.historySlots)
                          };
                        }
                        
                        // Add an additional chapter trapping
                        const extraTrapping: WargearItem = {
                          id: 'wolf_guard_extra_trapping',
                          name: "Additional Chapter Trapping",
                          description: "An additional chapter trapping granted to Wolf Guards."
                        };
                        if (!newAdditionalWargear.some(gw => gw.id === extraTrapping.id)) {
                          newAdditionalWargear.push(extraTrapping);
                        }
                        
                        // Add Oath Ring 
                        const oathRing: WargearItem = {
                          id: 'wolf_guard_oath_ring',
                          name: "Oath Ring",
                          description: "The warriors of the Rout take great pride in the oaths sworn between brothers, and none are held more sacred than those bound by the Oath Ring. These rings are bestowed upon a Wolf Guard at the moment of his ascension—a mark of honor, authority, and unbreakable duty within the Chapter. \n\nAn oath sworn upon such a ring is made not only before one’s peers, but beneath the watchful gaze of the Allfather himself. To break such an oath is to invite ruin; forgiveness is rare, and retribution is swift and merciless, often delivered at the edge of a blade. \n\nEach ring is forged from a rare metal mined from the southern pole of Fenris, shaped into a thick, near-closed band adorned with wolf motifs and runic inscriptions. The design allows two warriors to clasp the ring together as they swear their bond. Most Oath Rings are integrated into the gauntlet of the bearer, detachable by a thought-mark command, though larger and more elaborate versions are sometimes crafted for warriors of especially high rank among the Space Wolves, also known as the Vlka Fenryka. \n\nRules: A Wolf Guard bearing an Oath Ring may compel allies or NPCs to swear a binding oath, forming a covenant between themselves, the Wolf Guard, and the Emperor. \n\nUpon swearing the oath, the Wolf Guard treats the affected characters (and those under their command) as if he possesses the Peer Talent with that group. \n\nIf an oath is broken, those individuals (and their subordinates) immediately count as having the Enemy Talent toward the Wolf Guard. \n\nShould conflict arise, this escalates to Hatred, reflecting the depth of the betrayal and the inevitability of violent retribution."
                        };
                        if (!newAdditionalWargear.some(gw => gw.id === oathRing.id)) {
                          newAdditionalWargear.push(oathRing);
                        }
                      } else if (val === "Ultramarines Honour Guard") {
                        if (!newAbilities.includes("Astartes Paragon")) newAbilities.push("Astartes Paragon");
                        newCohesion += 2;
                        
                        // Equip wargear
                        const uhgGear = SPECIALIZATION_GEAR["Ultramarines Honour Guard"];
                        if (uhgGear && uhgGear.additionalWargear) {
                          uhgGear.additionalWargear.forEach(w => {
                            if (!newAdditionalWargear.some(gw => gw.id === w.id)) {
                              newAdditionalWargear.push(w);
                            }
                          });
                        }

                        // Equip Artificer Armour
                        const artificer = ARMOR_PATTERNS["Artificer"];
                        if (artificer) {
                          newArmor = {
                            ...newArmor,
                            pattern: "Artificer",
                            head: artificer.head,
                            torso: artificer.torso,
                            rightArm: artificer.rightArm,
                            leftArm: artificer.leftArm,
                            rightLeg: artificer.rightLeg,
                            leftLeg: artificer.leftLeg,
                            abilities: [...artificer.abilities],
                            histories: newArmor.histories.slice(0, artificer.historySlots)
                          };
                        }
                      } else if (val === "Sword Brother") {
                        setShowSwordBrotherAbilityModal(true);
                      } else if (character.advancedSpeciality === "Deathwatch Forge Master") {
                        const mk7 = ARMOR_PATTERNS["MK VII Aquila"];
                        if (mk7) {
                          newArmor = {
                            ...newArmor,
                            pattern: "MK VII Aquila",
                            head: mk7.head,
                            torso: mk7.torso,
                            rightArm: mk7.rightArm,
                            leftArm: mk7.leftArm,
                            rightLeg: mk7.rightLeg,
                            leftLeg: mk7.leftLeg,
                            abilities: [...mk7.abilities],
                            histories: newArmor.histories.slice(0, mk7.historySlots)
                          };
                        }
                      }

                      const isDreadnought = (v: string) => ["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(v);

                      if (isDreadnought(val)) {
                        // Set Strength to 70 and Agility to 20
                        newCharacteristics.S.base = 70;
                        newCharacteristics.Ag.base = 20;

                        // Add Talent
                        if (!newTalents.includes("Peer (Adeptus Astartes)")) {
                          newTalents.push("Peer (Adeptus Astartes)");
                        }

                        // Add Traits
                        const dreadnoughtTraits = ["Auto-stabilised", "Engine of War", "Size (Enormous)", "Sturdy", "Weight of Years"];
                        dreadnoughtTraits.forEach(t => {
                          if (!newTraits.includes(t)) {
                            newTraits.push(t);
                          }
                        });
                      } else if (isDreadnought(character.advancedSpeciality)) {
                        // Reset Strength and Agility to base 40
                        newCharacteristics.S.base = 40;
                        newCharacteristics.Ag.base = 40;

                        // Remove Talent
                        newTalents = newTalents.filter(t => t !== "Peer (Adeptus Astartes)");

                        // Remove Traits
                        const dreadnoughtTraits = ["Auto-stabilised", "Engine of War", "Size (Enormous)", "Sturdy", "Weight of Years"];
                        newTraits = newTraits.filter(t => !dreadnoughtTraits.includes(t));
                      }

                      setCharacter({
                        ...character, 
                        advancedSpeciality: val,
                        weapons: newWeapons,
                        additionalWargear: newAdditionalWargear,
                        abilities: newAbilities,
                        talents: newTalents,
                        skills: newSkills,
                        traits: newTraits,
                        characteristics: newCharacteristics,
                        armor: newArmor,
                        cybernetics: newCybernetics,
                        cohesion: newCohesion,
                        renown: newRenown,
                        ...(val === "Deathwatch Black Shield" && !character.blackShieldChoices ? {
                          blackShieldChoices: {
                            attackPattern: "",
                            attackPatternName: "",
                            defensiveStance: "",
                            defensiveStanceName: "",
                            soloModeAbility: "",
                            soloModeAbilityName: ""
                          }
                        } : {})
                      });
                      if (val === "Deathwatch Black Shield") {
                        setShowBlackShieldModal(true);
                      }
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

    // Check if current specialization is restricted
    let newSpecialization = character.specialization;
    let newWeapons = character.weapons;
    let newAdditionalWargear = character.additionalWargear;
    let newCybernetics = character.cybernetics;

    if (data.restrictions.includes(newSpecialization)) {
      // Default to Tactical Marine if restricted, or the first available one
      newSpecialization = SPECIALIZATIONS.find(s => !data.restrictions.includes(s)) || "Tactical Marine";
      const gear = getGearForSpec(newSpecialization);
      newWeapons = gear.weapons;
      newAdditionalWargear = gear.additionalWargear;
      newCybernetics = gear.cybernetics || [];
    }

    const chapterAttackPatterns = Object.values(CHAPTER_ATTACK_PATTERNS)
      .filter(p => p.chapter === chapterName)
      .map(p => p.name);

    const chapterDefensiveStances = Object.values(CHAPTER_DEFENSIVE_STANCES)
      .filter(p => p.chapter === chapterName)
      .map(p => p.name);

    setCharacter(prev => ({
      ...prev,
      chapter: chapterName,
      specialization: newSpecialization,
      characteristics: newChars,
      chapterDemeanor: data.demeanorName,
      soloModeAbility: data.soloAbility,
      talents: [...new Set([...INITIAL_CHARACTER.talents, ...data.talents])],
      wounds: {
        ...prev.wounds,
        max: INITIAL_CHARACTER.wounds.max + (data.woundsBonus || 0)
      },
      weapons: newWeapons,
      additionalWargear: newAdditionalWargear,
      cybernetics: newCybernetics,
      squadModeAbilities: {
        defensive: [...INITIAL_CHARACTER.squadModeAbilities.defensive, ...chapterDefensiveStances],
        attack: [...INITIAL_CHARACTER.squadModeAbilities.attack, ...chapterAttackPatterns]
      }
    }));
  };

  const getAvailablePsychicPowers = () => {
    const allPowers = [...LIBRARIAN_PSYCHIC_POWERS, ...DEATHWATCH_EPISTOLARY_PSYCHIC_POWERS];
    
    return allPowers.filter(p => {
      const cat = p.category;
      if (!cat) return true;
      if (cat === "Telepathy powers" || cat === "Divination powers" || cat === "Codex powers" || cat === "Epistolary powers") return true;
      if (cat === `${character.chapter} powers`) return true;
      return false;
    });
  };

  const getPsychicPowerRedactionStatus = (powerName: string, characterState: CharacterData = character) => {
    const wp = getCharScore(characterState.characteristics.WP);
    const powers = characterState.psychicPowers || [];
    const rank = characterState.rank || 1;
    
    const allKnownPowers = [...LIBRARIAN_PSYCHIC_POWERS, ...DEATHWATCH_EPISTOLARY_PSYCHIC_POWERS];
    
    const telepathyPowers = powers.filter(p => {
      const def = allKnownPowers.find(lp => lp.name === p);
      return def && def.category === "Telepathy powers";
    });
    
    const reqs: { condition: boolean, description: string }[] = [];
    switch (powerName) {
      case "Astrotelepathy":
        reqs.push({ condition: telepathyPowers.length > 0, description: "One or more Telepathic powers" });
        break;
      case "Compel":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Dominate":
        reqs.push({ condition: powers.includes("Compel") && wp >= 50, description: "Compel, WP 50+" });
        break;
      case "Long-Range Telepathy":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Mind Probe":
        reqs.push({ condition: powers.includes("Mind Scan"), description: "Mind Scan" });
        break;
      case "Mind Scan":
        reqs.push({ condition: powers.includes("Long-Range Telepathy"), description: "Long-Range Telepathy" });
        break;
      case "Divination":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Lifting the Veil":
        reqs.push({ condition: powers.includes("Psychometry") && wp >= 40, description: "Psychometry, WP 40+" });
        break;
      case "Possibility Shield":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Psychometry":
        reqs.push({ condition: powers.includes("Augury"), description: "Augury" });
        break;
      case "Force Dome":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "The Gate of Infinity":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Machine Curse":
        reqs.push({ condition: wp >= 45, description: "WP 45+" });
        break;
      case "Veil of Time":
        reqs.push({ condition: rank >= 3 && wp >= 40, description: "Rank 3, WP 40+" });
        break;
      case "Vortex of Doom":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Blood Boil":
        reqs.push({ condition: rank >= 3 && wp >= 40, description: "Rank 3, WP 40+" });
        break;
      case "Fear the Darkness":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Shackle Soul":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Wings of Sanguinius":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Force Barrier":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Hellfire":
        reqs.push({ condition: rank >= 3 && wp >= 40, description: "Rank 3, WP 40+" });
        break;
      case "Mask of Shadows":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Mind Worm":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Fury of the Wolf Spirits":
        reqs.push({ condition: rank >= 5 && wp >= 40, description: "Rank 5, WP 40+" });
        break;
      case "Living Lightning":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Tempest’s Wrath":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Call to Arms":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Hammer of the Emperor":
        reqs.push({ condition: rank >= 5 && wp >= 60, description: "Rank 5, WP 60+" });
        break;
      case "Thunder's Shell":
        reqs.push({ condition: rank >= 3 && wp >= 40, description: "Rank 3, WP 40+" });
        break;
      case "Fury of the Ancients":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Glory of the Emperor":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "War Cry":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Word of the Emperor":
        reqs.push({ condition: rank >= 3 && wp >= 50, description: "Rank 3, WP 50+" });
        break;
      case "Deus Ex Ferrum":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Punish the Weak":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Corax's Ingenuity":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "The Unkindness of Deliverance":
        reqs.push({ condition: wp >= 50, description: "WP 50+" });
        break;
      case "Fury of the Salamander":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Nocturne’s Fire":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Vulkan’s Anvil":
        reqs.push({ condition: rank >= 3 && wp >= 45, description: "Rank 3, WP 45+" });
        break;
      case "Heart of the Khan":
        reqs.push({ condition: rank >= 3 && wp >= 50, description: "Rank 3, WP 50+" });
        break;
      case "Spirits of the Steppes":
        reqs.push({ condition: rank >= 5 && wp >= 50, description: "Rank 5, WP 50+" });
        break;
      case "Stormlance":
        reqs.push({ condition: wp >= 40, description: "WP 40+" });
        break;
      case "Alien Minds":
      case "Bond of Brotherhood":
        reqs.push({ condition: characterState.advancedSpeciality === "Deathwatch Epistolary", description: "Must be Deathwatch Epistolary" });
        break;
    }
    
    if (reqs.length === 0) return { isRedacted: false, description: "" };
    const allMet = reqs.every(r => r.condition);
    return {
      isRedacted: !allMet,
      description: reqs[0].description
    };
  };

  const getActiveDefensiveStances = () => {
    if (character.advancedSpeciality === "Deathwatch Black Shield") {
      const base = character.squadModeAbilities.defensive.filter(a => !CHAPTER_DEFENSIVE_STANCES[a]);
      if (character.blackShieldChoices?.defensiveStance) {
        base.push(character.blackShieldChoices.defensiveStance);
      }
      return base;
    }
    return character.squadModeAbilities.defensive;
  };

  const getActiveAttackPatterns = () => {
    if (!character.squadModeAbilities || Array.isArray(character.squadModeAbilities) || !character.squadModeAbilities.attack) return [];
    if (character.advancedSpeciality === "Deathwatch Black Shield") {
      const base = character.squadModeAbilities.attack.filter(a => !CHAPTER_ATTACK_PATTERNS[a]);
      if (character.blackShieldChoices?.attackPattern) {
        base.push(character.blackShieldChoices.attackPattern);
      }
      return base;
    }
    return character.squadModeAbilities.attack;
  };

  const renderSquadModeAbilities = () => (
    <div className="space-y-4">
      <div>
        <h6 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Defensive Stances</h6>
        <div className="flex flex-wrap gap-2">
          {getActiveDefensiveStances().length > 0 ? (
            getActiveDefensiveStances().map(a => {
              const codexAbility = CODEX_DEFENSIVE_STANCES.find(stance => stance.name === a);
              const chapterAbility = CHAPTER_DEFENSIVE_STANCES[a];
              const customName = (character.advancedSpeciality === "Deathwatch Black Shield" && a === character.blackShieldChoices?.defensiveStance && character.blackShieldChoices?.defensiveStanceName) ? character.blackShieldChoices.defensiveStanceName : undefined;
              
              if (codexAbility) {
                return <SquadModeAbilityTag key={a} ability={codexAbility} customName={customName} />;
              } else if (chapterAbility) {
                return <SquadModeAbilityTag key={a} ability={chapterAbility} customName={customName} />;
              }
              return (
                <span key={a} className="text-[10px] bg-[#ffd700]/10 border border-[#ffd700] px-3 py-1 rounded text-[#ffd700] font-bold uppercase tracking-widest">{customName || a}</span>
              );
            })
          ) : (
            <span className="text-[10px] text-gray-500 italic">No Defensive Stances active</span>
          )}
        </div>
      </div>
      <div>
        <h6 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Attack Patterns</h6>
        <div className="flex flex-wrap gap-2">
          {getActiveAttackPatterns().length > 0 ? (
            getActiveAttackPatterns().map(a => {
              const codexAbility = CODEX_ATTACK_PATTERNS.find(pattern => pattern.name === a);
              const chapterAbility = CHAPTER_ATTACK_PATTERNS[a];
              const customName = (character.advancedSpeciality === "Deathwatch Black Shield" && a === character.blackShieldChoices?.attackPattern && character.blackShieldChoices?.attackPatternName) ? character.blackShieldChoices.attackPatternName : undefined;

              if (codexAbility) {
                return <SquadModeAbilityTag key={a} ability={codexAbility} customName={customName} />;
              } else if (chapterAbility) {
                return <SquadModeAbilityTag key={a} ability={chapterAbility} customName={customName} />;
              }
              return (
                <span key={a} className="text-[10px] bg-[#ffd700]/10 border border-[#ffd700] px-3 py-1 rounded text-[#ffd700] font-bold uppercase tracking-widest">{customName || a}</span>
              );
            })
          ) : (
            <span className="text-[10px] text-gray-500 italic">No Attack Patterns active</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderSoloModeAbilities = () => {
    let specificSoloAbility = null;
    if (character.advancedSpeciality === "Deathwatch Black Shield" && character.blackShieldChoices?.soloModeAbility) {
      const ability = Object.values(CHAPTER_SOLO_MODE_ABILITIES).find(a => a.name === character.blackShieldChoices?.soloModeAbility);
      if (ability) {
        specificSoloAbility = (
          <SoloModeAbilityTag 
            key={ability.name} 
            ability={ability} 
            characterRank={character.rank} 
            activeSaga={character.activeSaga}
            onSagaChange={(saga) => setCharacter(prev => ({ ...prev, activeSaga: saga }))}
            customName={character.blackShieldChoices.soloModeAbilityName}
          />
        );
      }
    } else if (character.advancedSpeciality !== "Deathwatch Black Shield") {
      const abilities = Object.values(CHAPTER_SOLO_MODE_ABILITIES).filter(ability => ability.chapter === character.chapter || ability.name === character.soloModeAbility);
      if (abilities.length > 0) {
        specificSoloAbility = abilities.map(ability => (
          <SoloModeAbilityTag 
            key={ability.name} 
            ability={ability} 
            characterRank={character.rank} 
            activeSaga={character.activeSaga}
            onSagaChange={(saga) => setCharacter(prev => ({ ...prev, activeSaga: saga }))}
          />
        ));
      } else if (character.soloModeAbility) {
        specificSoloAbility = <span className="text-[10px] bg-[#8b0000] border border-[#a00000] px-3 py-1 rounded text-white font-bold uppercase tracking-widest">{character.soloModeAbility}</span>;
      }
    }

    return (
      <div className="flex flex-wrap gap-2">
        {specificSoloAbility}
        {GENERAL_SOLO_MODE_ABILITIES.map(ability => (
          <SoloModeAbilityTag 
            key={ability.name} 
            ability={ability} 
            characterRank={character.rank} 
            activeSaga={character.activeSaga}
            onSagaChange={(saga) => setCharacter(prev => ({ ...prev, activeSaga: saga }))}
          />
        ))}
      </div>
    );
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
        const selectedAmmo = AMMO_DATABASE.find(a => a.name === weaponAmmoType);
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
          ammoType: weaponAmmoType,
          ammoClass: selectedAmmo?.compatibleClass,
          ammoCategory: selectedAmmo?.ammoCategory
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
  const isDreadnoughtChar = ["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(character.advancedSpeciality);
  const isFatigued = isDreadnoughtChar ? false : character.fatigue > 0;
  const isUnconscious = isDreadnoughtChar ? false : character.fatigue > toughnessBonus;
  const selectedPersonalDemeanor = PERSONAL_DEMEANORS.find(d => d.name === character.personalDemeanor);

  // Curse logic
  const curseInfo = getCurseInfo(character.insanity);
  const cursePenalty = curseInfo.penalty;
  const currentLevelData = (curseInfo.level >= 1 && curseInfo.level <= 3) 
    ? (currentChapterData?.curseLevels?.[curseInfo.level as 1 | 2 | 3]) 
    : null;

  const calculateRangedWeaponProfile = (weapon: RangedWeapon) => {
    let range = weapon.range;
    let rangeValue = parseInt(range);
    const rangeUnit = range.replace(/[0-9]/g, '');
    let special = weapon.special;
    let pen = weapon.pen;
    let damage = weapon.damage;

    // Apply Ammo Modifiers
    if (weapon.ammoType) {
      const ammo = AMMO_DATABASE.find(a => a.name === weapon.ammoType);
      if (ammo) {
        if (ammo.modifiers !== '-') {
          special = special === '-' ? ammo.modifiers : `${special}, ${ammo.modifiers}`;
        }
        
        // Simple parsing for common modifiers
        if (ammo.modifiers.includes('Range x')) {
          const match = ammo.modifiers.match(/Range x([0-9.]+)/);
          if (match) {
            rangeValue = Math.floor(rangeValue * parseFloat(match[1]));
          }
        }
        if (ammo.modifiers.includes('Range /')) {
            const match = ammo.modifiers.match(/Range \/([0-9.]+)/);
            if (match) {
              rangeValue = Math.floor(rangeValue / parseFloat(match[1]));
            }
        }
        
        // Pen modifiers
        if (ammo.modifiers.includes('Pen +')) {
            const match = ammo.modifiers.match(/Pen \+([0-9]+)/);
            if (match) pen += parseInt(match[1]);
        } else if (ammo.modifiers.includes('Pen -')) {
            const match = ammo.modifiers.match(/Pen -([0-9]+)/);
            if (match) pen -= parseInt(match[1]);
        } else if (ammo.modifiers.match(/Pen \d+/)) {
             const match = ammo.modifiers.match(/Pen (\d+)/);
             if (match) pen = parseInt(match[1]);
        }

        // Damage modifiers (simple)
        if (ammo.modifiers.includes('Damage +')) {
             // This is hard to parse without a proper damage parser, but we can append to special
        }
      }
    }

    if (weapon.attachments) {
      weapon.attachments.forEach(attachmentName => {
        const attachment = WEAPON_ATTACHMENTS[attachmentName];
        if (attachment && attachment.rangeModifier) {
          rangeValue = Math.floor(rangeValue * attachment.rangeModifier);
        }
      });
    }

    const addDamageBonus = (dmg: string, bonus: number) => {
      const match = dmg.match(/^(\d+d\d+)(?:\+(\d+))?(.*)$/);
      if (match) {
        const dice = match[1];
        const flat = parseInt(match[2] || "0");
        const rest = match[3];
        return `${dice}+${flat + bonus}${rest}`;
      }
      return dmg + `+${bonus}`;
    };

    if (weapon.craftsmanship === "Exceptional") {
      damage = addDamageBonus(damage, 1);
      if (!special.includes("Reliable")) {
        special = special === '-' ? "Reliable" : `${special}, Reliable`;
      }
    } else if (weapon.craftsmanship === "Master-Crafted") {
      damage = addDamageBonus(damage, 2);
      if (!special.includes("Never Jams/Overheats")) {
        special = special === '-' ? "Never Jams/Overheats" : `${special}, Never Jams/Overheats`;
      }
    }

    return {
      ...weapon,
      range: `${rangeValue}${rangeUnit}`,
      special,
      pen,
      damage
    };
  };

  const calculateMeleeWeaponProfile = (weapon: MeleeWeapon) => {
    let damage = weapon.damage;
    let special = weapon.special;

    const addDamageBonus = (dmg: string, bonus: number) => {
      const match = dmg.match(/^(\d+d\d+)(?:\+(\d+))?(.*)$/);
      if (match) {
        const dice = match[1];
        const flat = parseInt(match[2] || "0");
        const rest = match[3];
        return `${dice}+${flat + bonus}${rest}`;
      }
      return dmg + `+${bonus}`;
    };

    if (weapon.craftsmanship === "Exceptional") {
      damage = addDamageBonus(damage, 1);
      if (!special.includes("+5 WS")) {
        special = special === '-' ? "+5 WS" : `${special}, +5 WS`;
      }
    } else if (weapon.craftsmanship === "Master-Crafted") {
      damage = addDamageBonus(damage, 2);
      if (!special.includes("+10 WS")) {
        special = special === '-' ? "+10 WS" : `${special}, +10 WS`;
      }
    }

    return {
      ...weapon,
      damage,
      special
    };
  };

  const toggleAttachment = (weaponId: string, attachmentName: string) => {
    setCharacter(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        ranged: prev.weapons.ranged.map(w => {
          if (w.id !== weaponId) return w;
          const attachments = w.attachments || [];
          if (attachments.includes(attachmentName)) {
            return { ...w, attachments: attachments.filter(a => a !== attachmentName) };
          } else {
            return { ...w, attachments: [...attachments, attachmentName] };
          }
        }),
        melee: prev.weapons.melee.map(w => {
          if (w.id !== weaponId) return w;
          const attachments = w.attachments || [];
          if (attachments.includes(attachmentName)) {
            return { ...w, attachments: attachments.filter(a => a !== attachmentName) };
          } else {
            return { ...w, attachments: [...attachments, attachmentName] };
          }
        })
      }
    }));
  };

  const defaultSubcategories = [
    "Common Lore (Adeptus Astartes)",
    "Common Lore (Deathwatch)",
    "Common Lore (Imperium)",
    "Common Lore (War)",
    "Forbidden Lore (Xenos)",
    "Scholastic Lore (Codex Astartes)",
    "Speak Language (High Gothic)",
    "Speak Language (Low Gothic)"
  ];

  const categoryPrefixes = [
    "Common Lore", 
    "Forbidden Lore", 
    "Scholastic Lore", 
    "Navigation", 
    "Pilot", 
    "Speak Language", 
    "Trade"
  ];

  const processedSkills: (Skill | { isCategory: true, name: string, description: string })[] = [];
  const addedCategories = new Set<string>();

  character.skills.forEach(skill => {
    const categoryMatch = categoryPrefixes.find(cat => skill.name.startsWith(cat + " ("));
    
    if (categoryMatch) {
      if (!addedCategories.has(categoryMatch)) {
        processedSkills.push({
          isCategory: true,
          name: categoryMatch,
          description: CATEGORY_DESCRIPTIONS[categoryMatch] || ""
        });
        addedCategories.add(categoryMatch);
      }
      
      if (skill.mastery > 0 || defaultSubcategories.includes(skill.name)) {
        processedSkills.push(skill);
      }
    } else {
      processedSkills.push(skill);
    }
  });

  const processedAllSkills: ({ name: string, characteristic: string } | { isCategory: true, name: string, description: string })[] = [];
  const addedAllCategories = new Set<string>();

  const availableAllSkills = ALL_SKILLS.filter(skill => {
    if (skill.name === "Trade (Forge Master)" && character.advancedSpeciality !== "Deathwatch Forge Master") {
      return false;
    }
    return true;
  });

  availableAllSkills.forEach(skill => {
    const categoryMatch = categoryPrefixes.find(cat => skill.name.startsWith(cat + " ("));
    
    if (categoryMatch) {
      if (!addedAllCategories.has(categoryMatch)) {
        processedAllSkills.push({
          isCategory: true,
          name: categoryMatch,
          description: CATEGORY_DESCRIPTIONS[categoryMatch] || ""
        });
        addedAllCategories.add(categoryMatch);
      }
      processedAllSkills.push(skill);
    } else {
      processedAllSkills.push(skill);
    }
  });

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
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowOathModal(true)}
            className="px-4 py-2 border-2 border-purple-800 text-purple-400 bg-purple-900/10 uppercase font-bold text-sm tracking-widest hover:bg-purple-900/30 transition-colors shadow-[0_0_10px_rgba(128,0,128,0.2)]"
          >
            Take Oath
          </button>
          <button
            onClick={() => setCharacter(prev => ({ ...prev, isSquadMode: !prev.isSquadMode }))}
            className={`px-4 py-2 border-2 uppercase font-bold text-sm tracking-widest transition-colors ${
              character.isSquadMode 
                ? 'border-[#ffd700] text-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_10px_rgba(255,215,0,0.3)]' 
                : 'border-[#8b0000] text-[#8b0000] bg-[#8b0000]/10 shadow-[0_0_10px_rgba(139,0,0,0.3)]'
            }`}
          >
            {character.isSquadMode ? 'Squad Mode' : 'Solo Mode'}
          </button>
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
            ...(character.specialization === 'Librarian' ? [{ id: 'psychic', Icon: Icons.Eye, label: 'Psychic Powers' }] : []),
            { id: 'skills', Icon: Icons.Shield, label: 'Talent, Traits and Skills' },
            { id: 'experience', Icon: Icons.Star, label: 'Experience' },
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
                  <div className="absolute bottom-2 left-0 right-0 px-1 text-center pointer-events-none text-[7px] font-bold text-red-600 uppercase tracking-tight whitespace-nowrap drop-shadow-md">+++ Interface to update visual record +++</div>
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
                      {character.chapter === "Awaiting chapter assignment" && (
                        <option value="Awaiting chapter assignment" disabled hidden>
                          Awaiting chapter assignment
                        </option>
                      )}
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
                  <select value={character.specialization} onChange={e => handleSpecializationChange(e.target.value)} className={`w-full bg-[#1a1a1a] border h-10 px-3 rounded text-white border-[#333] focus:border-[#8b0000] outline-none transition-colors`}>
                    {character.specialization === "Awaiting astartes specialization" && (
                      <option value="Awaiting astartes specialization" disabled hidden>
                        Awaiting astartes specialization
                      </option>
                    )}
                    {SPECIALIZATIONS.map(s => {
                      const isRestricted = currentChapterData?.restrictions.includes(s);
                      return (
                        <option key={s} value={s} disabled={isRestricted} className={isRestricted ? "text-red-600 font-bold" : ""}>
                          {s} {isRestricted ? '(REDACTED)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#ffd700] tracking-widest">Advanced Speciality</label>
                  <select 
                    value={character.advancedSpeciality} 
                    onChange={e => handleAdvancedSpecialityChange(e.target.value)} 
                    className="w-full bg-[#1a1a1a] border border-[#ffd700]/30 h-10 px-3 rounded text-[#ffd700] focus:border-[#ffd700] outline-none transition-colors"
                  >
                    <option value="None">None</option>
                    {ADVANCED_SPECIALITY_RULES.filter(rule => {
                      if (rule.requiredChapter && rule.requiredChapter !== character.chapter) return false;
                      if (rule.forbiddenChapter && rule.forbiddenChapter === character.chapter) return false;
                      return true;
                    }).map(rule => {
                      const result = rule.check(character, getCharScoreWrapper);
                      return (
                        <option key={rule.name} value={rule.name} disabled={!result.ok}>
                          {rule.name} {!result.ok ? `(REDACTED)` : ''}
                        </option>
                      );
                    })}
                  </select>
                  {(character.hasCruxTerminatus || character.hasIronHalo) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {character.hasCruxTerminatus && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded text-[#ffd700] text-[9px] font-bold uppercase tracking-widest shadow-[0_0_8px_rgba(255,215,0,0.1)]">
                          <span className="text-xs">†</span> Crux Terminatus
                        </div>
                      )}
                      {character.hasIronHalo && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded text-[#ffd700] text-[9px] font-bold uppercase tracking-widest shadow-[0_0_8px_rgba(255,215,0,0.1)]">
                          <span className="text-xs">☼</span> Iron Halo
                        </div>
                      )}
                    </div>
                  )}
                  {character.advancedSpeciality === "Deathwatch Black Shield" && (
                    <button
                      onClick={() => setShowBlackShieldModal(true)}
                      className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 hover:bg-[#ffd700]/10 text-[#ffd700] p-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Select Black Shield Tactics
                    </button>
                  )}
                  {character.advancedSpeciality === "Deathwatch Captain" && (
                    <button
                      onClick={() => setShowCaptainAbilityModal(true)}
                      className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 hover:bg-[#ffd700]/10 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      {character.captainAbility ? `Leader Ability: ${character.captainAbility}` : 'Select Leader Ability'}
                    </button>
                  )}
                  {character.advancedSpeciality === "First Company Veteran" && (
                    <button
                      onClick={() => setShowFirstCompanyVeteranAbilityModal(true)}
                      className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 hover:bg-[#ffd700]/10 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      {character.abilities?.find(a => FIRST_COMPANY_VETERAN_ABILITIES.some(aa => aa.name === a)) 
                        ? `Battle-hardened: ${character.abilities.find(a => FIRST_COMPANY_VETERAN_ABILITIES.some(aa => aa.name === a))}` 
                        : 'Select Battle-hardened Ability'}
                    </button>
                  )}
                  {character.advancedSpeciality === "Sanguinary Priest" && (
                    <div className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest text-center">
                      Priest Ability: Scion of Sanguinius
                    </div>
                  )}
                  {character.advancedSpeciality === "Ravenwing Veteran" && (
                    <div className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest text-center">
                      Ravenwing Veteran
                    </div>
                  )}
                  {character.advancedSpeciality === "Deathwing Terminator" && (
                    <button
                      onClick={() => setShowDeathwingTerminatorAbilityModal(true)}
                      className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 hover:bg-[#ffd700]/10 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      {character.abilities?.find(a => DEATHWING_TERMINATOR_ABILITIES.some(aa => aa.name === a)) 
                        ? `Never Forgive: ${character.abilities.find(a => DEATHWING_TERMINATOR_ABILITIES.some(aa => aa.name === a))}` 
                        : 'Select Never Forgive Ability'}
                    </button>
                  )}
                  {character.advancedSpeciality === "Sword Brother" && (
                    <button
                      onClick={() => setShowSwordBrotherAbilityModal(true)}
                      className="mt-2 w-full bg-[#111] border border-[#ffd700]/30 hover:bg-[#ffd700]/10 text-[#ffd700] p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      {character.abilities?.find(a => SWORD_BROTHER_ABILITIES.some(aa => aa.name === a)) 
                        ? `Veteran of the Endless Crusade: ${character.abilities.find(a => SWORD_BROTHER_ABILITIES.some(aa => aa.name === a))}` 
                        : 'Select Veteran of the Endless Crusade Ability'}
                    </button>
                  )}
                </div>
                <div className={`grid ${character.specialization === "Librarian" ? "grid-cols-4" : "grid-cols-3"} gap-2 col-span-2`}>
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
                  {character.specialization === "Librarian" && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-blue-400 tracking-widest whitespace-nowrap">Psychic Rating</label>
                      <input 
                        type="number" 
                        min="0" 
                        value={character.psychicRating || 0} 
                        onChange={e => setCharacter({...character, psychicRating: Math.max(0, parseInt(e.target.value) || 0)})} 
                        className="w-full bg-[#1a1a1a] border border-blue-900/50 p-2 rounded text-blue-300 text-center font-bold shadow-[0_0_10px_rgba(59,130,246,0.1)] focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all" 
                      />
                    </div>
                  )}
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
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Cohesion</span><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.cohesion?.current ?? 0} onChange={e => setCharacter({...character, cohesion: {...(character.cohesion || {max: 0}), current: parseInt(e.target.value) || 0}})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.cohesion?.max ?? 0} onChange={e => setCharacter({...character, cohesion: {...(character.cohesion || {current: 0}), max: parseInt(e.target.value) || 0}})}/></div></div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Wounds</span><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.wounds.current} onChange={e => setCharacter({...character, wounds: {...character.wounds, current: parseInt(e.target.value) || 0}})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.wounds.max} readOnly /></div></div>
                    {["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(character.advancedSpeciality) && (
                      <div className="text-[9px] text-red-500 italic mt-1">
                        Dreadnoughts can only be healed (repaired) using the Tech-use Skill.
                      </div>
                    )}
                    <div className="space-y-2"><div className="flex justify-between items-center"><div className="flex items-center gap-1 group relative"><span className="text-xs font-bold">Fatigue</span><div className="hidden group-hover:block absolute left-full ml-2 w-48 bg-black border border-[#444] p-2 text-[9px] text-gray-400 z-10">Fatigue {'>'} TB ({toughnessBonus}) = Unconscious. All tests -10.</div></div><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fatigue} onChange={e => setCharacter({...character, fatigue: parseInt(e.target.value) || 0})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-gray-500" value={toughnessBonus} readOnly /></div></div>{isFatigued && <div className="bg-[#8b0000]/20 border border-[#8b0000]/40 p-1.5 rounded text-[9px] font-bold text-red-500 uppercase flex flex-col gap-1"><span className="animate-pulse">● -10 Penalty Active</span>{isUnconscious && <span className="text-red-700 italic">UNCONSCIOUS</span>}</div>}</div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-red-600">Critical Wounds</span><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.criticalWounds} onChange={e => setCharacter({...character, criticalWounds: Math.min(8, Math.max(0, parseInt(e.target.value) || 0))})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-gray-500" value="8" readOnly /></div></div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold">Fate Points</span><div className="flex gap-2 items-center"><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fate.current} onChange={e => setCharacter({...character, fate: {...character.fate, current: parseInt(e.target.value) || 0}})}/><span className="text-gray-600">/</span><input className="w-10 bg-black border border-[#444] text-center rounded text-sm text-white" value={character.fate.max} onChange={e => setCharacter({...character, fate: {...character.fate, max: parseInt(e.target.value) || 0}})}/></div></div>
                    {character.advancedSpeciality === "Deathwatch Black Shield" && (
                      <div className="mt-2 p-2 bg-[#111] border border-[#ffd700]/30 rounded">
                        <div className="text-[9px] font-bold text-[#ffd700] uppercase mb-1 tracking-widest text-center">Price of Redemption</div>
                        <div className="text-[8px] text-gray-400 leading-tight space-y-1">
                          <p><span className="text-white font-bold">Reckless Assault:</span> Double movement, +10 WS/BS until start of next turn.</p>
                          <p><span className="text-white font-bold">Only in Death Does Duty End:</span> Ignore one Critical Damage effect (except death/limb loss) for the encounter.</p>
                          <p><span className="text-white font-bold">Strength in Ignorance:</span> Auto-succeed WP test against mind-affecting power/ability (degrees of success = WP Bonus).</p>
                        </div>
                      </div>
                    )}
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
                    {["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(character.advancedSpeciality) && (
                      <div className="text-[9px] text-yellow-500 italic mt-2">
                        Follows game rules for vehicles (Rites of Battle, p. 164).
                      </div>
                    )}
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
                    {character.weapons.ranged.map(baseWeapon => {
                      const weapon = calculateRangedWeaponProfile(baseWeapon);
                      return (
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
                            <div className="mt-2">
                              <select 
                                value={baseWeapon.craftsmanship || "Common"} 
                                onChange={e => updateRangedWeaponCraftsmanship(baseWeapon.id, e.target.value as "Common" | "Exceptional" | "Master-Crafted")} 
                                className="bg-[#111] border border-[#333] p-1 rounded text-white text-[10px] uppercase font-bold tracking-widest"
                              >
                                <option value="Common">Common</option>
                                <option value="Exceptional">Exceptional</option>
                                <option value="Master-Crafted">Master-Crafted</option>
                              </select>
                            </div>
                            <div className="text-[9px] text-[#8b0000] mt-1 uppercase font-mono flex flex-wrap gap-1 items-center">
                              Special: <SpecialRulesList rules={weapon.special} onUpdateRules={(newRules) => updateWeaponSpecialRules(baseWeapon.id, 'ranged', newRules)} />
                            </div>
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

                        {/* Attachments Selector */}
                        <div className="border-t border-[#222] pt-2 mt-2">
                          <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Modifications</div>
                          
                          {/* Active Attachments Chips */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(weapon.attachments || []).sort((a, b) => a.localeCompare(b)).map(attachmentName => (
                              <div key={attachmentName} className="relative z-10">
                                <AttachmentChip 
                                  name={attachmentName} 
                                  onRemove={() => toggleAttachment(weapon.id, attachmentName)} 
                                />
                              </div>
                            ))}
                          </div>

                          {/* Add Attachment Dropdown */}
                          <select 
                            className="w-full bg-black border border-[#333] text-[10px] text-gray-300 p-1 rounded focus:border-[#8b0000] outline-none"
                            value=""
                            onChange={(e) => {
                                if (e.target.value) {
                                    toggleAttachment(weapon.id, e.target.value);
                                }
                            }}
                          >
                            <option value="">+ Add Modification</option>
                            {Object.values(WEAPON_ATTACHMENTS).sort((a, b) => a.name.localeCompare(b.name)).map(attachment => {
                              // Check Class Compatibility (if defined)
                              const matchesClass = !attachment.compatibleClasses || attachment.compatibleClasses.length === 0 || attachment.compatibleClasses.includes(weapon.class || '');
                              
                              // Check Ammo Compatibility (if defined)
                              const matchesAmmo = !attachment.compatibleAmmoTypes || attachment.compatibleAmmoTypes.length === 0 || attachment.compatibleAmmoTypes.some(type => weapon.name.includes(type) || weapon.ammoType?.includes(type));

                              // Check ROF Compatibility for Motion Predictor
                              let matchesROF = true;
                              if (attachment.name === "Motion Predictor") {
                                const rofParts = weapon.rof.split('/');
                                const hasSemi = rofParts[1] && rofParts[1] !== '-';
                                const hasFull = rofParts[2] && rofParts[2] !== '-';
                                matchesROF = hasSemi || hasFull;
                              }

                              if (!matchesClass || !matchesAmmo || !matchesROF) return null;

                              const isAttached = weapon.attachments?.includes(attachment.name);

                              // Check Slot Compatibility (e.g., only one Sight)
                              if (attachment.slot) {
                                const existingAttachmentInSlot = (weapon.attachments || []).find(attName => {
                                  const att = WEAPON_ATTACHMENTS[attName];
                                  return att && att.slot === attachment.slot;
                                });
                                if (existingAttachmentInSlot && existingAttachmentInSlot !== attachment.name) return null;
                              }

                              if (isAttached) return null;

                              return (
                                <option key={attachment.name} value={attachment.name}>
                                  {attachment.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#222]">
                          <div className="flex items-center gap-3">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Current Mag:</div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className={`text-lg font-bold font-mono min-w-[3ch] text-center ${weapon.clip.current <= 5 ? 'text-red-500' : 'text-white'}`}>
                                {weapon.clip.current}
                              </div>
                              <span className="text-gray-600 font-mono mr-2">/ {weapon.clip.max}</span>
                              
                              <div className="flex items-center gap-1 bg-[#111] p-1 rounded border border-[#222]">
                                {(() => {
                                  const parts = weapon.rof ? weapon.rof.split('/').map(p => p.trim()) : [];
                                  const options = [];
                                  if (parts[0] && parts[0].toUpperCase() === 'S') options.push({ label: 'Single', cost: 1 });
                                  else if (parts[0] && !isNaN(parseInt(parts[0]))) options.push({ label: 'Single', cost: parseInt(parts[0]) });
                                  
                                  if (parts[1] && !isNaN(parseInt(parts[1]))) options.push({ label: 'Semi', cost: parseInt(parts[1]) });
                                  if (parts[2] && !isNaN(parseInt(parts[2]))) options.push({ label: 'Full', cost: parseInt(parts[2]) });
                                  
                                  if (options.length === 0) {
                                    return (
                                      <button onClick={() => updateAmmo(weapon.id, -1)} className="bg-black border border-[#333] hover:border-red-600 text-red-600 text-[9px] px-2 py-1 rounded uppercase font-bold tracking-tighter transition-all">Fire</button>
                                    );
                                  }
                                  
                                  return options.map((opt, idx) => (
                                    <button 
                                      key={idx}
                                      onClick={() => updateAmmo(weapon.id, -opt.cost)}
                                      disabled={weapon.clip.current < opt.cost}
                                      className="bg-black border border-[#333] hover:border-red-600 text-red-600 disabled:opacity-30 disabled:hover:border-[#333] text-[9px] px-2 py-1 rounded uppercase font-bold tracking-tighter transition-all"
                                      title={`Fires ${opt.cost} round${opt.cost > 1 ? 's' : ''}`}
                                    >
                                      {opt.label}
                                    </button>
                                  ));
                                })()}
                              </div>
                              
                              <div className="flex items-center gap-1 ml-1">
                                <button onClick={() => updateAmmo(weapon.id, -1)} className="w-5 h-5 flex items-center justify-center bg-black border border-[#333] hover:border-red-600 text-red-600 text-xs rounded transition-all" title="Remove 1 round manually">-</button>
                                <button onClick={() => updateAmmo(weapon.id, 1)} className="w-5 h-5 flex items-center justify-center bg-black border border-[#333] hover:border-green-600 text-green-600 text-xs rounded transition-all" title="Add 1 round manually">+</button>
                              </div>
                              <button onClick={() => reloadWeapon(weapon.id)} className="ml-2 bg-[#8b0000] hover:bg-red-700 text-white text-[9px] px-2 py-1 rounded uppercase font-bold tracking-tighter">Reload</button>
                            </div>
                          </div>
                          <div className="md:col-span-2 flex items-center gap-3">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter whitespace-nowrap">Load Type:</div>
                            {(() => {
                                let ammoClass = weapon.ammoClass;
                                if (!ammoClass) {
                                    if (weapon.name.includes("Bolt")) ammoClass = "Bolt";
                                    else if (weapon.name.includes("Shotgun")) ammoClass = "Shotgun";
                                    else if (weapon.name.includes("Plasma")) ammoClass = "Plasma";
                                    else if (weapon.name.includes("Melta")) ammoClass = "Melta";
                                    else if (weapon.name.includes("Flamer")) ammoClass = "Flame";
                                }

                                const compatibleAmmo = character.ammunition.filter(invItem => {
                                    const ammo = AMMO_DATABASE.find(a => a.name === invItem.name);
                                    return ammo && (ammo.compatibleClass === ammoClass || (weapon.ammoCategory && ammo.ammoCategory === weapon.ammoCategory));
                                }).map(item => item.name);
                                
                                if (compatibleAmmo.length > 0) {
                                     return (
                                        <select
                                            value={weapon.ammoType || ""}
                                            onChange={(e) => updateAmmoType(weapon.id, e.target.value)}
                                            className="flex-1 bg-black border border-[#222] text-xs p-1 text-gray-400 focus:text-white focus:border-[#8b0000] outline-none rounded"
                                        >
                                            {!compatibleAmmo.includes(weapon.ammoType || "") && weapon.ammoType && (
                                                <option value={weapon.ammoType}>{weapon.ammoType}</option>
                                            )}
                                            {compatibleAmmo.map(ammoName => (
                                                <option key={ammoName} value={ammoName}>{ammoName}</option>
                                            ))}
                                        </select>
                                     );
                                } else {
                                    return (
                                        <input 
                                          type="text" 
                                          value={weapon.ammoType || ""} 
                                          onChange={(e) => updateAmmoType(weapon.id, e.target.value)}
                                          placeholder="e.g. Kraken Rounds, Vengeance..."
                                          className="flex-1 bg-black border border-[#222] text-xs p-1 text-gray-400 focus:text-white focus:border-[#8b0000] outline-none rounded"
                                        />
                                    );
                                }
                            })()}
                          </div>
                        </div>
                      </div>
                    );
                    })}
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
                            <div className="text-[9px] text-orange-800 mt-1 uppercase font-mono flex flex-wrap gap-1 items-center">
                              Special: <SpecialRulesList rules={explosive.special} onUpdateRules={(newRules) => updateWeaponSpecialRules(explosive.id, 'explosives', newRules)} />
                            </div>
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
                  
                  {character.specialization === "Librarian" && !character.weapons.melee.some(w => w.special.includes("Force")) && (
                    <div 
                      onClick={() => setIsForceWeaponSelectorOpen(!isForceWeaponSelectorOpen)}
                      className="mb-4 relative bg-[#111] border-l-4 border-gray-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[120px] flex items-center justify-center group"
                    >
                      {!isForceWeaponSelectorOpen ? (
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-blue-400 transition-colors">
                          Interface to add Librarium-conclave sanctioned weaponry
                        </div>
                      ) : (
                        <div className="w-full max-w-xs animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                          <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold text-center mb-2">
                            Select Weaponry
                          </div>
                          <select 
                            className="w-full bg-[#0a0a0a] border border-blue-900/50 text-gray-300 text-xs p-2 rounded focus:outline-none focus:border-blue-500"
                            onChange={(e) => {
                              if (e.target.value) {
                                handleForceWeaponChange(e.target.value);
                                setIsForceWeaponSelectorOpen(false);
                              }
                            }}
                            defaultValue=""
                            autoFocus
                            onBlur={() => setIsForceWeaponSelectorOpen(false)}
                          >
                            <option value="" disabled>-- Select Force Weapon --</option>
                            <option value="Astartes Force Sword">Astartes Force Sword</option>
                            <option value="Astartes Force Staff">Astartes Force Staff</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.weapons.melee.map(baseWeapon => {
                      const weapon = calculateMeleeWeaponProfile(baseWeapon);
                      return (
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
                            <div className="mt-1">
                              <select 
                                value={weapon.craftsmanship || "Common"} 
                                onChange={e => updateMeleeWeaponCraftsmanship(weapon.id, e.target.value as "Common" | "Exceptional" | "Master-Crafted")} 
                                className="bg-[#111] border border-[#333] p-1 rounded text-white text-[10px] uppercase font-bold tracking-widest"
                              >
                                <option value="Common">Common</option>
                                <option value="Exceptional">Exceptional</option>
                                <option value="Master-Crafted">Master-Crafted</option>
                              </select>
                            </div>
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
                            <div className="text-[10px] italic text-gray-400 flex flex-wrap gap-1">
                              <SpecialRulesList rules={weapon.special} onUpdateRules={(newRules) => updateWeaponSpecialRules(baseWeapon.id, 'melee', newRules)} />
                            </div>
                            {weapon.special.includes("Force") && (
                              <ForceWeaponTag />
                            )}
                          </div>
                        </div>

                        {/* Melee Attachments Selector */}
                        <div className="border-t border-[#222] pt-2 mt-2">
                          <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Modifications</div>
                          
                          {/* Active Attachments Chips */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(weapon.attachments || []).sort((a, b) => a.localeCompare(b)).map(attachmentName => (
                              <div key={attachmentName} className="relative z-10">
                                <AttachmentChip 
                                  name={attachmentName} 
                                  onRemove={() => toggleAttachment(weapon.id, attachmentName)} 
                                />
                              </div>
                            ))}
                          </div>

                          {/* Add Attachment Dropdown */}
                          <select 
                            className="w-full bg-black border border-[#333] text-[10px] text-gray-300 p-1 rounded focus:border-[#8b0000] outline-none"
                            value=""
                            onChange={(e) => {
                                if (e.target.value) {
                                    toggleAttachment(weapon.id, e.target.value);
                                }
                            }}
                          >
                            <option value="">+ Add Modification</option>
                            {Object.values(WEAPON_ATTACHMENTS).sort((a, b) => a.name.localeCompare(b.name)).map(attachment => {
                              // Check Class Compatibility
                              // For Melee weapons, we check if 'Melee' is in compatibleClasses
                              const matchesClass = !attachment.compatibleClasses || attachment.compatibleClasses.length === 0 || attachment.compatibleClasses.includes('Melee');
                              
                              // Check Ammo Compatibility (usually none for melee, but good to check empty)
                              const matchesAmmo = !attachment.compatibleAmmoTypes || attachment.compatibleAmmoTypes.length === 0;

                              if (!matchesClass || !matchesAmmo) return null;

                              const isAttached = weapon.attachments?.includes(attachment.name);

                              if (isAttached) return null;

                              return (
                                <option key={attachment.name} value={attachment.name}>
                                  {attachment.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      );
                    })}
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
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Craftsmanship</label>
                      <select 
                        value={character.armor.craftsmanship || "Common"} 
                        onChange={e => updateArmorCraftsmanship(e.target.value as "Common" | "Exceptional" | "Master-Crafted")} 
                        className="w-full bg-black border border-[#333] p-2 rounded text-white gothic-font"
                      >
                        <option value="Common">Common</option>
                        <option value="Exceptional">Exceptional</option>
                        <option value="Master-Crafted">Master-Crafted</option>
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
                          <span className="text-2xl font-bold text-white leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] gothic-font">
                            {character.armor.head + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
                      </div>

                      {/* Torso */}
                      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">Torso</span>
                          <span className="text-2xl font-bold text-white leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] gothic-font">
                            {character.armor.torso + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
                      </div>

                      {/* Arms */}
                      <div className="absolute top-[35%] left-4 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">L.Arm</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">
                            {character.armor.leftArm + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
                      </div>
                      <div className="absolute top-[35%] right-4 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">R.Arm</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">
                            {character.armor.rightArm + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
                      </div>

                      {/* Legs */}
                      <div className="absolute bottom-12 left-6 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">L.Leg</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">
                            {character.armor.leftLeg + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
                      </div>
                      <div className="absolute bottom-12 right-6 flex flex-col items-center z-10">
                          <span className="text-[7px] text-gray-400 uppercase font-bold tracking-widest bg-black/60 px-1 rounded">R.Leg</span>
                          <span className="text-2xl font-bold text-red-600 leading-none drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] gothic-font">
                            {character.armor.rightLeg + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                          </span>
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
                            <div className="text-2xl font-bold text-white gothic-font">
                              {(character.armor[part as keyof Armor] as number) + (character.armor.craftsmanship === "Master-Crafted" && character.armor.pattern !== "Artificer" && character.armor.pattern !== "Artificer Armour" ? 1 : 0)}
                            </div>
                          </div>
                        );
                      })}
                      {character.armor.craftsmanship === "Exceptional" && (
                        <div className="col-span-2 text-[10px] text-[#ffd700] font-bold uppercase tracking-widest text-center mt-2">
                          Exceptional: +1 AP against first attack in any round
                        </div>
                      )}
                      {character.armor.craftsmanship === "Master-Crafted" && (
                        <div className="col-span-2 text-[10px] text-[#ffd700] font-bold uppercase tracking-widest text-center mt-2">
                          Master-Crafted: Weighs half normal amount
                        </div>
                      )}
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

                  <div className="space-y-4 pt-4 border-t border-[#333]">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-[#333] pb-1">Chapter Trappings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(character.armor.trappings || []).map(trappingSelection => {
                        const trapping = CHAPTER_TRAPPINGS.find(t => t.name === trappingSelection.name);
                        if (!trapping) return null;
                        
                        const selectedOption = trapping.options?.find(o => o.name === trappingSelection.selectedOption);
                        const ruleText = selectedOption ? selectedOption.rule : trapping.rule;

                        return (
                          <div key={trappingSelection.name} className="bg-[#111] border border-[#222] p-3 rounded group hover:border-[#ffd700]/50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[10px] font-bold uppercase tracking-tighter text-[#ffd700]">{trapping.name}</div>
                              <button 
                                onClick={() => {
                                  let newMeleeWeapons = [...character.weapons.melee];
                                  if (trapping.associatedWeapon) {
                                    const weaponIndex = newMeleeWeapons.findIndex(w => w.name === trapping.associatedWeapon!.name);
                                    if (weaponIndex !== -1) {
                                      newMeleeWeapons.splice(weaponIndex, 1);
                                    }
                                  }

                                  let newTalents = [...character.talents];
                                  if (trapping.associatedTalent) {
                                    newTalents = newTalents.filter(t => t !== trapping.associatedTalent);
                                  }

                                  let newCharacteristics = { ...character.characteristics };
                                  if (trappingSelection.selectedOption) {
                                    const selectedOpt = trapping.options?.find(o => o.name === trappingSelection.selectedOption);
                                    if (selectedOpt?.associatedCharacteristicModifier) {
                                      const { characteristic, value } = selectedOpt.associatedCharacteristicModifier;
                                      newCharacteristics[characteristic] = {
                                        ...newCharacteristics[characteristic],
                                        bonus: newCharacteristics[characteristic].bonus - value
                                      };
                                    }
                                  }

                                  setCharacter({
                                    ...character, 
                                    weapons: {
                                      ...character.weapons,
                                      melee: newMeleeWeapons
                                    },
                                    talents: newTalents,
                                    characteristics: newCharacteristics,
                                    armor: {
                                      ...character.armor, 
                                      trappings: character.armor.trappings.filter(t => t.name !== trappingSelection.name)
                                    }
                                  });
                                }}
                                className="text-[8px] text-gray-600 hover:text-red-500 font-bold uppercase tracking-tighter"
                              >
                                Purge Record
                              </button>
                            </div>
                            <div className="text-[10px] text-gray-400 leading-tight mb-1">{trapping.description}</div>
                            
                            {trapping.options ? (
                              <div className="mt-2 space-y-1">
                                <select
                                  className="w-full bg-black border border-[#333] text-[9px] text-gray-300 p-1 rounded focus:border-[#ffd700] outline-none"
                                  value={trappingSelection.selectedOption || ""}
                                  onChange={(e) => {
                                    const newOptionName = e.target.value;
                                    const previousOptionName = trappingSelection.selectedOption;
                                    
                                    let newCharacteristics = { ...character.characteristics };
                                    
                                    // Remove previous modifier if exists
                                    if (previousOptionName) {
                                      const prevOpt = trapping.options?.find(o => o.name === previousOptionName);
                                      if (prevOpt?.associatedCharacteristicModifier) {
                                        const { characteristic, value } = prevOpt.associatedCharacteristicModifier;
                                        newCharacteristics[characteristic] = {
                                          ...newCharacteristics[characteristic],
                                          bonus: newCharacteristics[characteristic].bonus - value
                                        };
                                      }
                                    }

                                    // Add new modifier if exists
                                    if (newOptionName) {
                                      const newOpt = trapping.options?.find(o => o.name === newOptionName);
                                      if (newOpt?.associatedCharacteristicModifier) {
                                        const { characteristic, value } = newOpt.associatedCharacteristicModifier;
                                        newCharacteristics[characteristic] = {
                                          ...newCharacteristics[characteristic],
                                          bonus: newCharacteristics[characteristic].bonus + value
                                        };
                                      }
                                    }

                                    setCharacter({
                                      ...character,
                                      characteristics: newCharacteristics,
                                      armor: {
                                        ...character.armor,
                                        trappings: character.armor.trappings.map(t => 
                                          t.name === trappingSelection.name ? { ...t, selectedOption: newOptionName } : t
                                        )
                                      }
                                    });
                                  }}
                                >
                                  <option value="" disabled>Select Option...</option>
                                  {trapping.options.map(opt => (
                                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                                  ))}
                                </select>
                                {selectedOption && (
                                  <div className="text-[9px] text-gray-500 italic mt-1">{selectedOption.rule}</div>
                                )}
                              </div>
                            ) : (
                              <div className="text-[9px] text-gray-500 italic">{ruleText}</div>
                            )}
                          </div>
                        );
                      })}
                      <div className="bg-[#1a1a1a] border border-dashed border-[#333] p-3 rounded flex items-center justify-center">
                        <select 
                          className="bg-transparent text-[10px] text-gray-500 uppercase font-bold outline-none cursor-pointer hover:text-gray-300 w-full text-center"
                          value=""
                          onChange={e => {
                            const trappingName = e.target.value;
                            if (trappingName && !(character.armor.trappings || []).some(t => t.name === trappingName)) {
                              const trapping = CHAPTER_TRAPPINGS.find(t => t.name === trappingName);
                              let newMeleeWeapons = [...character.weapons.melee];
                              
                              if (trapping?.associatedWeapon) {
                                newMeleeWeapons.push({
                                  id: Math.random().toString(36).substr(2, 9),
                                  ...trapping.associatedWeapon
                                });
                              }

                              let newTalents = [...character.talents];
                              if (trapping?.associatedTalent && !newTalents.includes(trapping.associatedTalent)) {
                                newTalents.push(trapping.associatedTalent);
                              }

                              setCharacter({
                                ...character,
                                weapons: {
                                  ...character.weapons,
                                  melee: newMeleeWeapons
                                },
                                talents: newTalents,
                                armor: {
                                  ...character.armor,
                                  trappings: [...(character.armor.trappings || []), { name: trappingName }]
                                }
                              });
                            }
                          }}
                        >
                          <option value="">+ Add Chapter Trapping</option>
                          {CHAPTER_TRAPPINGS
                            .filter(t => t.chapter === "All" || t.chapter === character.chapter)
                            .map(t => (
                              <option key={t.name} value={t.name} disabled={(character.armor.trappings || []).some(sel => sel.name === t.name)}>{t.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#333]">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-[#333] pb-1">Cybernetics</h4>
                    
                    {character.specialization === "Techmarine" && (character.cybernetics || []).filter(c => c.name !== "Servo-Arm").length === 0 && (
                      <div 
                        onClick={() => setIsTechmarineCyberneticSelectorOpen(!isTechmarineCyberneticSelectorOpen)}
                        className="relative bg-[#111] border-l-4 border-blue-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group mb-4"
                      >
                        {!isTechmarineCyberneticSelectorOpen ? (
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-blue-400 transition-colors">
                            Select Additional Common Cybernetic (Techmarine)
                          </div>
                        ) : (
                          <div className="w-full max-w-xs animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                            <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold text-center mb-2">
                              Select Cybernetic
                            </div>
                            <select 
                              className="w-full bg-[#0a0a0a] border border-blue-900/50 text-gray-300 text-xs p-2 rounded focus:outline-none focus:border-blue-500"
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleTechmarineCyberneticChange(e.target.value);
                                  setIsTechmarineCyberneticSelectorOpen(false);
                                }
                              }}
                              defaultValue=""
                              autoFocus
                              onBlur={() => setIsTechmarineCyberneticSelectorOpen(false)}
                            >
                              <option value="" disabled>-- Select Cybernetic --</option>
                              {CYBERNETICS.filter(c => c.name !== "Servo-Arm" && c.name !== "Servo-Harness").map(cybernetic => (
                                <option key={cybernetic.name} value={cybernetic.name}>{cybernetic.name}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(character.cybernetics || []).map((cybernetic, idx) => {
                        const isExpanded = expandedCybernetics.has(`sheet-${idx}`);
                        return (
                          <div 
                            key={idx} 
                            className="bg-[#111] border border-[#222] p-3 rounded group hover:border-blue-500/50 transition-colors cursor-pointer"
                            onClick={() => {
                              const newExpanded = new Set(expandedCybernetics);
                              if (isExpanded) {
                                newExpanded.delete(`sheet-${idx}`);
                              } else {
                                newExpanded.add(`sheet-${idx}`);
                              }
                              setExpandedCybernetics(newExpanded);
                            }}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[10px] font-bold uppercase tracking-tighter text-blue-400">
                                {cybernetic.name} {cybernetic.quality ? `(${cybernetic.quality})` : '(Common)'}
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newCybernetics = [...(character.cybernetics || [])];
                                  newCybernetics.splice(idx, 1);
                                  
                                  let newMeleeWeapons = [...character.weapons.melee].filter(w => !w.name.startsWith("Servo-Arm"));
                                  newCybernetics.forEach(c => {
                                    if (c.name === "Servo-Arm" || c.name === "Servo-Harness") {
                                      const q = c.quality || 'Common';
                                      const damage = (q === 'Exceptional' || q === 'Master-Crafted') ? "2d10+16 I" : "2d10+14 I";
                                      const special = (q === 'Exceptional' || q === 'Master-Crafted') ? "Unwieldy, +10 to Grapple Tests" : "Unwieldy";
                                      const count = c.name === "Servo-Harness" ? 2 : 1;
                                      for (let i = 0; i < count; i++) {
                                        newMeleeWeapons.push({
                                          id: `servo-arm-${Date.now()}-${Math.random()}`,
                                          name: `Servo-Arm (${q})`,
                                          damage: damage,
                                          pen: 10,
                                          special: special
                                        });
                                      }
                                    }
                                  });

                                  setCharacter({
                                    ...character, 
                                    cybernetics: newCybernetics,
                                    weapons: {
                                      ...character.weapons,
                                      melee: newMeleeWeapons
                                    }
                                  });
                                }}
                                className="text-[8px] text-gray-600 hover:text-red-500 font-bold uppercase tracking-tighter"
                              >
                                Purge
                              </button>
                            </div>
                            <div className="text-[10px] text-gray-400 leading-tight mb-1">
                              {isExpanded ? cybernetic.description : (cybernetic.summary || cybernetic.description)}
                            </div>
                            {isExpanded && (
                              <>
                                <div className="text-[9px] text-gray-500 italic mt-1">Location: {cybernetic.location}</div>
                                <div className="text-[9px] text-blue-500/80 italic mt-1">+{cybernetic.toughnessBonus ?? 2} Toughness Bonus to {cybernetic.location} (after Unnatural Toughness)</div>
                              </>
                            )}
                          </div>
                        );
                      })}
                      {(character.cybernetics || []).length === 0 && (
                        <div className="text-[10px] text-gray-600 italic p-2 col-span-2 text-center">No cybernetics installed. The flesh is weak.</div>
                      )}
                    </div>
                  </div>
                </div>

                <SectionHeader title="Additional Wargear" icon={<Icons.Wargear />} />
                <div className="space-y-4">
                  {character.specialization === "Tactical Marine" && !character.ammunition.some(a => AMMO_DATABASE.find(db => db.name === a.name)?.category === "Special Issue Ammo") && (
                    <div 
                      onClick={() => setIsSpecialIssueAmmoSelectorOpen(!isSpecialIssueAmmoSelectorOpen)}
                      className="relative bg-[#111] border-l-4 border-yellow-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                    >
                      {!isSpecialIssueAmmoSelectorOpen ? (
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-yellow-600 transition-colors">
                          Select Special Issue Ammunition (Tactical Marine)
                        </div>
                      ) : (
                        <div className="w-full max-w-xs animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                          <div className="text-[10px] uppercase tracking-widest text-yellow-600 font-bold text-center mb-2">
                            Select Special Issue Ammo
                          </div>
                          <select 
                            className="w-full bg-[#0a0a0a] border border-yellow-900/50 text-gray-300 text-xs p-2 rounded focus:outline-none focus:border-yellow-600"
                            onChange={(e) => {
                              if (e.target.value) {
                                handleSpecialIssueAmmoChange(e.target.value);
                                setIsSpecialIssueAmmoSelectorOpen(false);
                              }
                            }}
                            defaultValue=""
                            autoFocus
                            onBlur={() => setIsSpecialIssueAmmoSelectorOpen(false)}
                          >
                            <option value="" disabled>-- Select Ammunition --</option>
                            {AMMO_DATABASE.filter(a => a.category === "Special Issue Ammo" && a.compatibleClass === "Bolt").map(ammo => (
                              <option key={ammo.name} value={ammo.name}>{ammo.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.ammunition.map((ammo, idx) => (
                      <div key={`ammo-${idx}`} className="bg-[#111] border-l-4 border-yellow-600 p-4 rounded shadow-lg relative group">
                        <button 
                          onClick={() => setCharacter(prev => ({...prev, ammunition: prev.ammunition.filter((_, i) => i !== idx)}))}
                          className="absolute top-2 right-2 text-[7px] text-red-800 hover:text-red-500 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Return to Armoury
                        </button>
                        <div className="flex justify-between items-start mb-2 pr-8">
                          <div>
                            <div className="text-[10px] font-bold uppercase text-gray-500">Ammunition Supply</div>
                            <div className="text-sm text-white font-bold">{ammo.name}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 border-t border-[#222] pt-2">
                          <div>
                            <div className="text-[10px] uppercase text-gray-500 mb-1">Magazines</div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  const newAmmo = [...character.ammunition];
                                  if (newAmmo[idx].count > 0) newAmmo[idx].count--;
                                  setCharacter({...character, ammunition: newAmmo});
                                }}
                                className="w-5 h-5 bg-[#222] hover:bg-red-900/50 text-red-500 rounded flex items-center justify-center text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="font-mono text-white font-bold">{ammo.count}</span>
                              <button 
                                onClick={() => {
                                  const newAmmo = [...character.ammunition];
                                  newAmmo[idx].count++;
                                  setCharacter({...character, ammunition: newAmmo});
                                }}
                                className="w-5 h-5 bg-[#222] hover:bg-green-900/50 text-green-500 rounded flex items-center justify-center text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-gray-500 mb-1">Loose Rounds</div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  const newAmmo = [...character.ammunition];
                                  if (newAmmo[idx].remainingRounds > 0) newAmmo[idx].remainingRounds--;
                                  setCharacter({...character, ammunition: newAmmo});
                                }}
                                className="w-5 h-5 bg-[#222] hover:bg-red-900/50 text-red-500 rounded flex items-center justify-center text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="font-mono text-white font-bold">{ammo.remainingRounds}</span>
                              <button 
                                onClick={() => {
                                  const newAmmo = [...character.ammunition];
                                  newAmmo[idx].remainingRounds++;
                                  setCharacter({...character, ammunition: newAmmo});
                                }}
                                className="w-5 h-5 bg-[#222] hover:bg-green-900/50 text-green-500 rounded flex items-center justify-center text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <button 
                    onClick={() => setShowCyberneticsModal(true)}
                    className="w-full border-2 border-dashed border-[#333] p-4 text-xs hover:border-blue-500 hover:text-blue-400 transition-colors rounded uppercase tracking-widest font-bold mt-4"
                  >
                    +++ Yield your flesh, embrace the cold certainty of steel +++
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'psychic' && character.specialization === 'Librarian' && (
              <div className="space-y-8 animate-fadeIn">
                <SectionHeader title="Psychic Powers" icon={<Icons.Eye />} />
                
                <div className="flex items-center justify-between bg-[#111] border border-purple-900/50 p-4 rounded shadow-[0_0_15px_rgba(147,51,234,0.1)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500 flex items-center justify-center shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                      <Icons.Eye />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-widest">Psy Rating</h3>
                      <p className="text-xs text-purple-400">Current Power Level</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]">
                    {character.psychicRating || 3}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-[#333] pb-2">Known Techniques</h4>
                  {character.psychicPowers && character.psychicPowers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {character.psychicPowers.map(powerName => {
                        const combinedPowers = getAvailablePsychicPowers();
                        const powerDetails = combinedPowers.find(p => p.name === powerName);
                        return (
                          <div key={powerName} className="bg-[#111] border border-[#333] p-4 rounded hover:border-purple-500/50 transition-colors group">
                            <h5 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2 group-hover:text-purple-300">{powerName}</h5>
                            {powerDetails && (powerDetails as any).action && (
                              <div className="grid grid-cols-2 gap-2 mb-2 text-[10px] text-gray-400">
                                <div><span className="text-gray-500">Action:</span> {(powerDetails as any).action}</div>
                                <div><span className="text-gray-500">Opposed:</span> {(powerDetails as any).opposed}</div>
                                <div><span className="text-gray-500">Range:</span> {(powerDetails as any).range}</div>
                                <div><span className="text-gray-500">Sustained:</span> {(powerDetails as any).sustained}</div>
                              </div>
                            )}
                            <p className="text-[10px] text-gray-400 leading-relaxed whitespace-pre-wrap">{powerDetails?.description || "A psychic technique of the Adeptus Astartes."}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-[#111] border border-[#333] rounded">
                      <p className="text-gray-500 text-sm italic">No psychic techniques recorded in the manifest.</p>
                      <button 
                        onClick={() => {
                          setShowPsychicPowersModal(true);
                          setPsychicPowersSelectionState('selecting');
                          setSelectedPsychicPowers([]);
                        }}
                        className="mt-4 px-4 py-2 border border-purple-900 text-purple-400 text-xs uppercase tracking-widest rounded hover:bg-purple-900/20 transition-colors"
                      >
                        Select Initial Powers
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="flex flex-col gap-8 animate-fadeIn">
                <div>
                  <SectionHeader title="Skills" icon={<Icons.Shield />} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[processedSkills.slice(0, Math.ceil(processedSkills.length / 2)), processedSkills.slice(Math.ceil(processedSkills.length / 2))].map((skillSubset, idx) => (
                      <div key={idx} className="bg-[#111] border border-[#333] rounded overflow-hidden shadow-inner">
                        <table className="w-full text-xs">
                          <thead className="bg-[#1a1a1a]"><tr><th className="p-2 text-left uppercase text-gray-500">Skill</th><th className="p-2 text-center uppercase text-gray-500">Char</th><th className="p-2 text-center uppercase text-gray-500">Rank</th><th className="p-2 text-center uppercase text-gray-500">Target</th></tr></thead>
                          <tbody className="divide-y divide-[#222]">
                            {skillSubset.map((item, itemIdx) => {
                              if ('isCategory' in item) {
                                return (
                                  <React.Fragment key={`category-${item.name}-${itemIdx}`}>
                                    <tr 
                                      className="bg-[#1a1a1a] cursor-pointer hover:bg-[#222]"
                                      onClick={() => setExpandedSkill(expandedSkill === item.name ? null : item.name)}
                                    >
                                      <td colSpan={4} className="p-2 font-bold text-yellow-500 uppercase tracking-wider border-b border-[#333]">
                                        <div className="flex items-center gap-2">
                                          {expandedSkill === item.name ? <Icons.ChevronDown className="w-3 h-3" /> : <Icons.ChevronRight className="w-3 h-3" />}
                                          {item.name}
                                        </div>
                                      </td>
                                    </tr>
                                    {expandedSkill === item.name && (
                                      <tr>
                                        <td colSpan={4} className="p-3 bg-[#0a0a0a] text-gray-400 text-xs leading-relaxed border-b border-[#333] italic">
                                          {item.description}
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              }

                              const skill = item as Skill;
                              const charStat = character.characteristics[skill.characteristic];
                              const armorBonus = skill.characteristic === 'S' ? (ARMOR_PATTERNS[character.armor.pattern]?.strengthBonus || 0) : 0;
                              const score = getCharScore(charStat, armorBonus);
                              const masteryBonus = (skill.mastery - 1) * 10;
                              const isAdvanced = isAdvancedSkill(skill.name);
                              const isUntrained = skill.mastery === 0;
                              
                              let finalScore = 0;
                              if (isUntrained) {
                                if (isAdvanced) {
                                  finalScore = 0;
                                } else {
                                  finalScore = Math.ceil(score / 2) + (isFatigued ? -10 : 0) + cursePenalty;
                                }
                              } else {
                                finalScore = score + masteryBonus + (isFatigued ? -10 : 0) + cursePenalty;
                              }

                              let dreadnoughtNote = "";
                              if (["Deathwatch Dreadnought", "Furioso Dreadnought", "Librarian Dreadnought"].includes(character.advancedSpeciality)) {
                                if (skill.name === "Shadowing" || skill.name === "Silent Move") {
                                  finalScore -= 30;
                                  dreadnoughtNote = " (-30 Engine of War)";
                                }
                                if (skill.characteristic === "Int" || skill.characteristic === "Fel") {
                                  dreadnoughtNote = " (Requires 1d10 <= Int Bonus)";
                                }
                              }
                              
                              return (
                                <React.Fragment key={skill.name}>
                                  <tr 
                                    className={`hover:bg-[#1a1a1a] ${skill.description ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                      if (skill.description) {
                                        setExpandedSkill(expandedSkill === skill.name ? null : skill.name);
                                      }
                                    }}
                                  >
                                    <td className={`p-2 font-bold ${isAdvanced ? 'text-yellow-600' : 'text-gray-200'}`} title={isAdvanced ? "Advanced Skill" : "Basic Skill"}>
                                      <div className={`flex items-center gap-1 ${categoryPrefixes.some(prefix => skill.name.startsWith(prefix + " (")) ? "pl-4" : ""}`}>
                                        {skill.name}
                                        {dreadnoughtNote && <span className="text-red-500 text-[10px] ml-1">{dreadnoughtNote}</span>}
                                        {skill.description && (
                                          <span className="text-gray-500 text-[10px] opacity-50">
                                            {expandedSkill === skill.name ? '▼' : '▶'}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="p-2 text-center text-gray-600 font-mono">
                                      {skill.characteristic} <span className="text-gray-500">({score})</span>
                                    </td>
                                    <td className="p-2 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        {[1, 2, 3].map((level) => (
                                          <div 
                                            key={level}
                                            className={`w-3 h-3 border border-[#444] rounded-sm transition-colors ${
                                              skill.mastery >= level 
                                                ? 'bg-[#8b0000] border-[#8b0000] shadow-[0_0_4px_rgba(139,0,0,0.5)]' 
                                                : 'bg-[#1a1a1a]'
                                            }`}
                                            title={level === 1 ? "Trained" : level === 2 ? "+10 Bonus" : "+20 Bonus"}
                                          />
                                        ))}
                                      </div>
                                    </td>
                                    <td className={`p-2 text-center font-bold text-sm ${isAdvanced ? 'text-yellow-600' : 'text-[#8b0000]'}`}>
                                      {finalScore}
                                    </td>
                                  </tr>
                                  {expandedSkill === skill.name && skill.description && (
                                    <tr className="bg-[#111]">
                                      <td colSpan={4} className="p-3 border-t border-[#222]">
                                        <div className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                                          {skill.description}
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeader title="Talents & Traits" icon={<Icons.Sword />} />
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                      <h5 className="text-[10px] font-bold text-red-800 uppercase mb-3 border-b border-[#222] pb-1">Battle-Tested Talents</h5>
                      <div className="flex flex-wrap gap-2">
                        {character.talents.map(t => (
                          <div key={t} className="flex items-center gap-1">
                            <TalentTag talent={t} />
                            {t.includes("(Choose one)") && (
                              <select
                                className="bg-black border border-[#444] text-gray-400 text-[10px] rounded px-1 py-0.5"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    setCharacter(prev => ({
                                      ...prev,
                                      talents: prev.talents.map(talent => talent === t ? t.replace("(Choose one)", `(${e.target.value})`) : talent)
                                    }));
                                  }
                                }}
                              >
                                <option value="">Select...</option>
                                {t.startsWith("Hatred") && ['Chaos Space Marines', 'Daemons', 'Mutants', 'Psykers', 'Orks', 'Eldar', 'Tau', 'Kroot', 'Tyranids', 'Genestealers', 'Necrons', 'Xenos'].map(f => (
                                  <option key={f} value={f}>{f}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                      <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Physiological Traits</h5>
                      <div className="flex flex-wrap gap-2">
                        {character.traits.map(t => <TraitTag key={t} trait={t} />)}
                      </div>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                      <h5 className="text-[10px] font-bold text-[#ffd700] uppercase mb-3 border-b border-[#222] pb-1">Special Abilities</h5>
                      
                      {character.specialization === "Apothecary" && !character.abilities?.some(a => APOTHECARY_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setIsApothecaryAbilitySelectorOpen(!isApothecaryAbilitySelectorOpen)}
                          className="mb-4 relative bg-[#111] border-l-4 border-green-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          {!isApothecaryAbilitySelectorOpen ? (
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-green-400 transition-colors">
                              Select Apothecary Specialty Ability
                            </div>
                          ) : (
                            <div className="w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                              <div className="text-[10px] uppercase tracking-widest text-green-400 font-bold text-center mb-2">
                                Select Ability
                              </div>
                              <div className="space-y-2">
                                {APOTHECARY_ABILITIES.map(ability => (
                                  <div 
                                    key={ability.name}
                                    onClick={() => {
                                      setCharacter(prev => ({
                                        ...prev,
                                        abilities: [...(prev.abilities || []), ability.name]
                                      }));
                                      setIsApothecaryAbilitySelectorOpen(false);
                                    }}
                                    className="p-2 border border-[#333] hover:border-green-500/50 bg-black rounded cursor-pointer transition-colors"
                                  >
                                    <div className="text-xs font-bold text-green-400 mb-1">{ability.name}</div>
                                    <div className="text-[10px] text-gray-400 leading-tight">{ability.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {character.specialization === "Assault Marine" && !character.abilities?.some(a => ASSAULT_MARINE_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setIsAssaultMarineAbilitySelectorOpen(!isAssaultMarineAbilitySelectorOpen)}
                          className="mb-4 relative bg-[#111] border-l-4 border-red-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          {!isAssaultMarineAbilitySelectorOpen ? (
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-red-400 transition-colors">
                              Select Assault Marine Specialty Ability
                            </div>
                          ) : (
                            <div className="w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                              <div className="text-[10px] uppercase tracking-widest text-red-400 font-bold text-center mb-2">
                                Select Ability
                              </div>
                              <div className="space-y-2">
                                {ASSAULT_MARINE_ABILITIES.map(ability => (
                                  <div 
                                    key={ability.name}
                                    onClick={() => {
                                      setCharacter(prev => ({
                                        ...prev,
                                        abilities: [...(prev.abilities || []), ability.name]
                                      }));
                                      setIsAssaultMarineAbilitySelectorOpen(false);
                                    }}
                                    className="p-2 border border-[#333] hover:border-red-500/50 bg-black rounded cursor-pointer transition-colors"
                                  >
                                    <div className="text-xs font-bold text-red-400 mb-1">{ability.name}</div>
                                    <div className="text-[10px] text-gray-400 leading-tight">{ability.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {character.specialization === "Devastator Marine" && !character.abilities?.some(a => DEVASTATOR_MARINE_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setIsDevastatorMarineAbilitySelectorOpen(!isDevastatorMarineAbilitySelectorOpen)}
                          className="mb-4 relative bg-[#111] border-l-4 border-blue-600 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          {!isDevastatorMarineAbilitySelectorOpen ? (
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-blue-400 transition-colors">
                              Select Devastator Marine Specialty Ability
                            </div>
                          ) : (
                            <div className="w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                              <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold text-center mb-2">
                                Select Ability
                              </div>
                              <div className="space-y-2">
                                {DEVASTATOR_MARINE_ABILITIES.map(ability => (
                                  <div 
                                    key={ability.name}
                                    onClick={() => {
                                      setCharacter(prev => ({
                                        ...prev,
                                        abilities: [...(prev.abilities || []), ability.name]
                                      }));
                                      setIsDevastatorMarineAbilitySelectorOpen(false);
                                    }}
                                    className="p-2 border border-[#333] hover:border-blue-500/50 bg-black rounded cursor-pointer transition-colors"
                                  >
                                    <div className="text-xs font-bold text-blue-400 mb-1">{ability.name}</div>
                                    <div className="text-[10px] text-gray-400 leading-tight">{ability.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {character.specialization === "Tactical Marine" && character.advancedSpeciality !== "Wolf Scout" && !character.abilities?.some(a => TACTICAL_MARINE_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setIsTacticalMarineAbilitySelectorOpen(!isTacticalMarineAbilitySelectorOpen)}
                          className="mb-4 relative bg-[#111] border-l-4 border-gray-500 p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          {!isTacticalMarineAbilitySelectorOpen ? (
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-gray-300 transition-colors">
                              Select Tactical Marine Specialty Ability
                            </div>
                          ) : (
                            <div className="w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                              <div className="text-[10px] uppercase tracking-widest text-gray-300 font-bold text-center mb-2">
                                Select Ability
                              </div>
                              <div className="space-y-2">
                                {TACTICAL_MARINE_ABILITIES.map(ability => (
                                  <div 
                                    key={ability.name}
                                    onClick={() => {
                                      setCharacter(prev => ({
                                        ...prev,
                                        abilities: [...(prev.abilities || []), ability.name]
                                      }));
                                      setIsTacticalMarineAbilitySelectorOpen(false);
                                    }}
                                    className="p-2 border border-[#333] hover:border-gray-400/50 bg-black rounded cursor-pointer transition-colors"
                                  >
                                    <div className="text-xs font-bold text-gray-300 mb-1">{ability.name}</div>
                                    <div className="text-[10px] text-gray-400 leading-tight">{ability.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {character.advancedSpeciality === "First Company Veteran" && !character.abilities?.some(a => FIRST_COMPANY_VETERAN_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setShowFirstCompanyVeteranAbilityModal(true)}
                          className="mb-4 relative bg-[#111] border-l-4 border-[#ffd700] p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-[#ffd700] transition-colors">
                            Select Battle-hardened Specialty Ability
                          </div>
                        </div>
                      )}

                      {character.advancedSpeciality === "Deathwing Terminator" && !character.abilities?.some(a => DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setShowDeathwingTerminatorAbilityModal(true)}
                          className="mb-4 relative bg-[#111] border-l-4 border-[#ffd700] p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-[#ffd700] transition-colors">
                            Select Never Forgive Specialty Ability
                          </div>
                        </div>
                      )}

                      {character.advancedSpeciality === "Sword Brother" && !character.abilities?.some(a => SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a)) && (
                        <div 
                          onClick={() => setShowSwordBrotherAbilityModal(true)}
                          className="mb-4 relative bg-[#111] border-l-4 border-[#ffd700] p-4 rounded shadow-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors min-h-[80px] flex items-center justify-center group"
                        >
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center group-hover:text-[#ffd700] transition-colors">
                            Select Veteran of the Endless Crusade Specialty Ability
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {(character.abilities || []).map(a => <AbilityTag key={a} ability={a} character={character} setCharacter={setCharacter} />)}
                      </div>

                      {character.talents.includes("Icon of Duty") && (
                        <div className="mt-4 p-3 bg-[#111] border border-red-900/50 rounded">
                          <h5 className="text-[10px] font-bold text-red-500 uppercase mb-2">Icon of Duty (Active Effect)</h5>
                          <div className="text-[10px] text-gray-400 mb-2">Spend a Fate Point to activate one of the following effects for the encounter:</div>
                          <select
                            value={character.activeIconOfDutyEffect || ""}
                            onChange={(e) => setCharacter(prev => ({ ...prev, activeIconOfDutyEffect: e.target.value || undefined }))}
                            className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono text-xs"
                          >
                            <option value="">None (Inactive)</option>
                            <option value="Hardened Will">Hardened Will</option>
                            <option value="Fearsome Assault">Fearsome Assault</option>
                            <option value="Extreme Prejudice">Extreme Prejudice</option>
                          </select>
                          {character.activeIconOfDutyEffect === "Hardened Will" && (
                            <div className="mt-2 text-[10px] text-gray-300 bg-black p-2 rounded border border-[#222]">
                              The Chaplain and all allies within 10m gain a +10 bonus to Willpower Tests.
                            </div>
                          )}
                          {character.activeIconOfDutyEffect === "Fearsome Assault" && (
                            <div className="mt-2 text-[10px] text-gray-300 bg-black p-2 rounded border border-[#222]">
                              The Chaplain and all allies within 10m gain the Fear (1) Trait.
                            </div>
                          )}
                          {character.activeIconOfDutyEffect === "Extreme Prejudice" && (
                            <div className="mt-2 text-[10px] text-gray-300 bg-black p-2 rounded border border-[#222]">
                              The Chaplain and all allies within 10m gain the Hatred (Choose one) Talent against the same enemy as the Chaplain.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {character.isSquadMode ? (
                      <>
                        <div className="p-4 bg-[#1a1a1a] border border-[#ffd700] rounded shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                          <h5 className="text-[10px] font-bold text-[#ffd700] uppercase mb-3 border-b border-[#ffd700]/30 pb-1">Squad Mode</h5>
                          {renderSquadModeAbilities()}
                        </div>
                        <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded opacity-60">
                          <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Solo Mode</h5>
                          {renderSoloModeAbilities()}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-[#1a1a1a] border border-[#8b0000] rounded shadow-[0_0_10px_rgba(139,0,0,0.1)]">
                          <h5 className="text-[10px] font-bold text-red-500 uppercase mb-3 border-b border-[#8b0000]/30 pb-1">Solo Mode</h5>
                          {renderSoloModeAbilities()}
                        </div>
                        <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded opacity-60">
                          <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Squad Mode</h5>
                          {renderSquadModeAbilities()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="animate-fadeIn space-y-4">
                <SectionHeader title="Experience" icon={<Icons.Star />} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Experience Points</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Total XP</label>
                        <input 
                          type="number" 
                          value={character.xpTotal} 
                          onChange={e => setCharacter({...character, xpTotal: parseInt(e.target.value) || 0})}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Spent XP</label>
                        <input 
                          type="number" 
                          value={character.xpSpent} 
                          onChange={e => setCharacter({...character, xpSpent: parseInt(e.target.value) || 0})}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono"
                        />
                      </div>
                      <div className="pt-2 border-t border-[#222]">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] text-gray-500 uppercase font-bold">Available XP</span>
                          <span className="text-lg font-bold text-[#ffd700]">{character.xpTotal - character.xpSpent}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => { setLevelUpType('skill'); setShowLevelUpModal(true); }}
                            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                          >
                            Acquire Skill
                          </button>
                          <button 
                            onClick={() => { setLevelUpType('talent'); setShowLevelUpModal(true); }}
                            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                          >
                            Acquire Talent
                          </button>
                          <button 
                            onClick={() => { setLevelUpType('characteristic'); setShowLevelUpModal(true); }}
                            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                          >
                            Increase Characteristic
                          </button>
                          <button 
                            onClick={() => { setLevelUpType('ability'); setShowLevelUpModal(true); }}
                            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                          >
                            Acquire Ability
                          </button>
                          {character.specialization === 'Librarian' && (
                            <button 
                              onClick={() => { setLevelUpType('psychic power'); setShowLevelUpModal(true); }}
                              className="w-full col-span-2 bg-[#4a0080] hover:bg-[#6000a0] text-white font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                            >
                              Acquire Psychic Power
                            </button>
                          )}
                          {ADVANCED_SPECIALITY_RULES.filter(rule => {
                            if (rule.requiredChapter && rule.requiredChapter !== character.chapter) return false;
                            if (rule.forbiddenChapter && rule.forbiddenChapter === character.chapter) return false;
                            return true;
                          }).map(rule => {
                            const result = rule.check(character, getCharScoreWrapper);
                            if (result.ok && character.advancedSpeciality !== rule.name) {
                              return (
                                <button 
                                  key={rule.name}
                                  onClick={() => handleAdvancedSpecialityChange(rule.name)}
                                  className="w-full col-span-2 bg-[#ffd700]/20 hover:bg-[#ffd700]/40 text-[#ffd700] border border-[#ffd700]/50 font-bold uppercase tracking-widest text-[10px] py-2 rounded transition-colors"
                                >
                                  Acquire {rule.name}
                                </button>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Rank & Renown</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Rank</label>
                        <input 
                          type="number" 
                          min="1"
                          max="8"
                          value={character.rank} 
                          onChange={e => setCharacter({...character, rank: parseInt(e.target.value) || 1})}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Renown</label>
                        <input 
                          type="number" 
                          value={character.renown} 
                          onChange={e => setCharacter({...character, renown: parseInt(e.target.value) || 0})}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded mt-4">
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3 border-b border-[#222] pb-1">Advancement History</h5>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {(!character.advancementHistory || character.advancementHistory.length === 0) ? (
                      <p className="text-gray-500 text-xs italic">No advancements purchased yet.</p>
                    ) : (
                      character.advancementHistory.map((adv, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#111] border border-[#222] p-2 rounded">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold mr-2">[{adv.type}]</span>
                            <span className="text-white text-sm">{adv.name}</span>
                          </div>
                          <span className="text-[#ffd700] font-mono text-xs">{adv.cost} XP</span>
                        </div>
                      ))
                    )}
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

      {/* Level Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`bg-[#111] border-2 border-[#333] rounded-lg w-full ${levelUpType === 'talent' || levelUpType === 'psychic power' ? 'max-w-7xl' : 'max-w-md'} shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]`}>
            <div className="p-4 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center shrink-0">
              <h3 className="text-white gothic-font uppercase tracking-widest">
                {levelUpType === 'characteristic' ? 'Increase' : 'Acquire'} {levelUpType === 'ability' ? 'Special Ability' : levelUpType}
              </h3>
              <button 
                onClick={() => setShowLevelUpModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4 overflow-hidden flex-1">
              <div className="flex flex-col flex-1 min-h-0">
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1 shrink-0">
                  {levelUpType === 'characteristic' ? 'Characteristic Name (e.g. WS, BS, S)' : 'Name'}
                </label>
                {levelUpType === 'skill' ? (
                  <div className="space-y-2 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto border border-[#333] rounded bg-black custom-scrollbar">
                      <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1a1a1a] text-[10px] uppercase sticky top-0">
                          <tr>
                            <th className="p-2">Skill</th>
                            <th className="p-2">Char.</th>
                            <th className="p-2">Current</th>
                          </tr>
                        </thead>
                        <tbody>
                          {processedAllSkills.map((item, idx) => {
                            if ('isCategory' in item) {
                              return (
                                <tr 
                                  key={`cat-${item.name}-${idx}`} 
                                  className="bg-[#1a1a1a] cursor-pointer hover:bg-[#222]"
                                  onClick={() => setExpandedBuySkill(expandedBuySkill === item.name ? null : item.name)}
                                >
                                  <td colSpan={3} className="p-2 font-bold text-yellow-500 uppercase tracking-wider border-b border-[#333]">
                                    <div className="flex items-center gap-2">
                                      {expandedBuySkill === item.name ? <Icons.ChevronDown className="w-3 h-3" /> : <Icons.ChevronRight className="w-3 h-3" />}
                                      {item.name}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }

                            const skill = item;
                            const existing = character.skills.find(s => s.name.toLowerCase() === skill.name.toLowerCase());
                            const mastery = existing ? existing.mastery : 0;
                            const isSelected = levelUpName === skill.name;
                            const categoryMatch = categoryPrefixes.find(cat => skill.name.startsWith(cat + " ("));
                            
                            if (categoryMatch && expandedBuySkill !== categoryMatch) {
                              return null;
                            }

                            return (
                              <tr 
                                key={skill.name} 
                                onClick={() => setLevelUpName(skill.name)}
                                className={`cursor-pointer border-t border-[#222] hover:bg-[#222] ${isSelected ? 'bg-[#8b0000]/20 text-white' : ''}`}
                              >
                                <td className={`p-2 ${categoryMatch ? 'pl-6 text-gray-400' : ''}`}>{skill.name}</td>
                                <td className="p-2">{skill.characteristic}</td>
                                <td className="p-2">{mastery === 0 ? 'Untrained' : mastery === 1 ? 'Trained' : `+${(mastery - 1) * 10}`}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <input 
                      type="text" 
                      value={levelUpName}
                      onChange={e => setLevelUpName(e.target.value)}
                      placeholder="Or enter custom skill name..."
                      className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                    />
                  </div>
                ) : levelUpType === 'talent' ? (
                  <div className="space-y-2 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto border border-[#333] rounded bg-black custom-scrollbar">
                      <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1a1a1a] text-[10px] uppercase sticky top-0">
                          <tr>
                            <th className="p-2">Talent</th>
                            <th className="p-2">Req.</th>
                            <th className="p-2">Benefit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ALL_TALENTS.map((talent) => {
                            const isSelected = levelUpName === talent.name;
                            const MULTIPLE_TALENTS = [
                              "The Flesh is Weak",
                              "Psy Rating",
                              "Sound Constitution",
                              "Enemy",
                              "Peer",
                              "Rival",
                              "Good Reputation",
                              "Hatred",
                              "Resistance",
                              "Signature Wargear",
                              "Signature Wargear (Master)",
                              "Signature Wargear (Hero)",
                              "Astartes Weapon Specialisation",
                              "Basic Weapon Training",
                              "Heavy Weapon Training",
                              "Melee Weapon Training",
                              "Pistol Weapon Training",
                              "Two-Weapon Wielder",
                              "Artificer",
                              "Tyrannic War Stratagem"
                            ];
                            const canTakeMultiple = MULTIPLE_TALENTS.includes(talent.name);
                            const ownedCount = character.talents.filter(t => t === talent.name || t.startsWith(talent.name + " (") || t.startsWith(talent.name + " ")).length;
                            const hasTalent = ownedCount > 0 && !canTakeMultiple;
                            const meetsReqs = meetsAllRequirements(character, talent.requirements);
                            const isWolfScoutFelRestricted = character.advancedSpeciality === "Wolf Scout" && 
                              (talent.requirements.includes("Fel") || 
                               ["Barter", "Charm", "Command", "Deceive", "Disguise", "Inquiry", "Trade (Soothsayer)", "Trade (Trader)"].some(skill => talent.requirements.includes(skill)));
                            const isDisabled = (!meetsReqs && !hasTalent) || isWolfScoutFelRestricted;
                            
                            return (
                              <tr 
                                key={talent.name} 
                                onClick={() => {
                                  if (!isDisabled) setLevelUpName(talent.name);
                                }}
                                className={`border-t border-[#222] ${isDisabled ? 'opacity-40 bg-[#111] cursor-not-allowed' : 'cursor-pointer hover:bg-[#222]'} ${isSelected ? 'bg-[#8b0000]/20 text-white' : ''} ${hasTalent ? 'opacity-50' : ''}`}
                              >
                                <td className="p-2 font-bold">{talent.name} {ownedCount > 0 && `(Owned${ownedCount > 1 ? ` x${ownedCount}` : ''})`}</td>
                                <td className="p-2 text-xs">{talent.requirements}</td>
                                <td className="p-2 text-xs relative">
                                  {isDisabled ? (
                                    <span className="inline-block bg-black text-red-500 border border-red-500/50 px-2 py-1 text-[10px] tracking-widest font-mono uppercase">
                                      [REDACTED - INSUFFICIENT CLEARANCE]
                                    </span>
                                  ) : (
                                    talent.benefit
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <input 
                      type="text" 
                      value={levelUpName}
                      onChange={e => setLevelUpName(e.target.value)}
                      placeholder="Or enter custom talent name..."
                      className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2"
                    />
                    {(levelUpName === 'Enemy' || levelUpName === 'Good Reputation' || levelUpName === 'Peer' || levelUpName === 'Rival') && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2"
                      >
                        <option value="">Select Faction...</option>
                        {['Adeptus Arbites', 'Adeptus Astra Telepathica', 'Adeptus Astartes', 'Adeptus Mechanicus', 'Adepta Sororitas', 'Adeptus Titanicus', 'Administratum', 'Astropaths', 'Chartist Captains', 'Ecclesiarchy', 'Imperial Guard', 'Imperial Navy', 'Inquisition', 'Navigators', 'Officio Assassinorum', 'PDF', 'Planetary Governors', 'Rogue Trader', 'Schola Progenium', 'Scholastica Psykana'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Hatred' && (
                      <>
                        <select
                          value={levelUpSubOption}
                          onChange={e => setLevelUpSubOption(e.target.value)}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2"
                        >
                          <option value="">Select Group...</option>
                          {['Chaos Space Marines', 'Daemons', 'Mutants', 'Psykers', 'Orks', 'Eldar', 'Tau', 'Kroot', 'Tyranids', 'Genestealers', 'Necrons', 'Xenos'].map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                        {levelUpSubOption === 'Xenos' && (
                          <input
                            type="text"
                            value={levelUpCustomSubOption}
                            onChange={e => setLevelUpCustomSubOption(e.target.value)}
                            placeholder="Enter Xenos race..."
                            className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2"
                          />
                        )}
                      </>
                    )}
                    {levelUpName === 'Resistance' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Resistance...</option>
                        {['Cold', 'Fear', 'Heat', 'Poisons', 'Psychic Powers'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Tyrannic War Stratagem' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Stratagem...</option>
                        {['Bulwark', 'Cleansing Flame', 'Grenadier', 'Master of Venoms', 'Slaughter the Swarm', 'Withdraw'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Astartes Weapon Specialisation' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Weapon Group...</option>
                        {['Bolt', 'Las', 'Launcher', 'Melta', 'Primitive', 'Plasma', 'Solid projectiles', 'Universal', 'Chain', 'Shock', 'Power'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Basic Weapon Training' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Weapon Group...</option>
                        {['Bolt', 'Las', 'Launcher', 'Melta', 'Plasma', 'Primitive', 'Solid projectiles', 'Universal'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Heavy Weapon Training' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Weapon Group...</option>
                        {['Bolt', 'Las', 'Launcher', 'Melta', 'Plasma', 'Primitive', 'Solid projectiles', 'Universal'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Melee Weapon Training' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Weapon Group...</option>
                        {['Chain', 'Shock', 'Power', 'Primitive', 'Universal'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Pistol Weapon Training' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Weapon Group...</option>
                        {['Bolt', 'Las', 'Launcher', 'Melta', 'Plasma', 'Primitive', 'Solid projectiles', 'Universal'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {levelUpName === 'Two-Weapon Wielder' && (
                      <select
                        value={levelUpSubOption}
                        onChange={e => setLevelUpSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Type...</option>
                        {['Melee', 'Ballistic'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    )}
                    {(levelUpName === 'Signature Wargear' || levelUpName === 'Signature Wargear (Hero)') && (
                      <input
                        type="text"
                        value={levelUpCustomSubOption}
                        onChange={e => setLevelUpCustomSubOption(e.target.value)}
                        placeholder="Enter Wargear (e.g., Master-Crafted Flamer)..."
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      />
                    )}
                    {levelUpName === 'Artificer' && (
                      <select
                        value={levelUpCustomSubOption}
                        onChange={e => setLevelUpCustomSubOption(e.target.value)}
                        className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                      >
                        <option value="">Select Wargear...</option>
                        {character.weapons.melee?.map((item, i) => (
                          <option key={`m-${i}`} value={item.name}>{item.name}</option>
                        ))}
                        {character.weapons.ranged?.map((item, i) => (
                          <option key={`r-${i}`} value={item.name}>{item.name}</option>
                        ))}
                        {character.weapons.explosives?.map((item, i) => (
                          <option key={`e-${i}`} value={item.name}>{item.name}</option>
                        ))}
                        {character.additionalWargear?.map((item, i) => (
                          <option key={`w-${i}`} value={item.name}>{item.name}</option>
                        ))}
                        {character.armor?.name && (
                          <option value={character.armor.name}>{character.armor.name}</option>
                        )}
                      </select>
                    )}
                    {levelUpName === 'Signature Wargear (Master)' && (
                      <>
                        <input
                          type="text"
                          value={levelUpCustomSubOption}
                          onChange={e => setLevelUpCustomSubOption(e.target.value)}
                          placeholder="Enter Wargear..."
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                        />
                        <select
                          value={levelUpSubOption}
                          onChange={e => setLevelUpSubOption(e.target.value)}
                          className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono mt-2 shrink-0"
                        >
                          <option value="">Select Effect...</option>
                          <option value="Weapons: +10 to Attack Tests">Weapons: +10 to Attack Tests</option>
                          <option value="Armour: +10 to Dodge Tests">Armour: +10 to Dodge Tests</option>
                          <option value="Wargear: Re-roll failed Skill Tests">Wargear: Re-roll failed Skill Tests</option>
                          <option value="Any item: Gain +1 Cohesion">Any item: Gain +1 Cohesion</option>
                          <option value="Any item: Gain +2 Initiative">Any item: Gain +2 Initiative</option>
                          <option value="Any item: Gain +5 on WP tests">Any item: Gain +5 on WP tests</option>
                        </select>
                      </>
                    )}
                  </div>
                ) : levelUpType === 'psychic power' ? (
                  <div className="space-y-2 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto border border-[#333] rounded bg-black custom-scrollbar">
                      {Object.entries(
                        getAvailablePsychicPowers().reduce((acc, power) => {
                          const cat = power.category || 'Other powers';
                          if (!acc[cat]) acc[cat] = [];
                          acc[cat].push(power);
                          return acc;
                        }, {} as Record<string, typeof LIBRARIAN_PSYCHIC_POWERS>)
                      ).map(([category, powers]) => (
                        <div key={category} className="mb-4">
                          <div className="bg-[#1a1a1a] text-[10px] uppercase sticky top-0 p-2 font-bold text-[#ffd700] border-y border-[#333] z-10">
                            {category}
                          </div>
                          <table className="w-full text-left text-sm text-gray-400">
                            <tbody>
                              {powers.map((power) => {
                                const isSelected = levelUpName === power.name;
                                const hasPower = character.psychicPowers?.includes(power.name);
                                const redactionStatus = getPsychicPowerRedactionStatus(power.name);
                                const showRedacted = !hasPower && redactionStatus.isRedacted;
                                
                                return (
                                  <tr 
                                    key={power.name} 
                                    onClick={() => {
                                      if (!hasPower && !showRedacted) {
                                        setLevelUpName(power.name);
                                        if ('cost' in power) {
                                          setLevelUpCost(power.cost);
                                        }
                                      }
                                    }}
                                    className={`border-b border-[#222] ${hasPower ? 'opacity-40 bg-[#111] cursor-not-allowed' : (showRedacted ? 'opacity-50 min-h-20 bg-[#111] cursor-not-allowed' : 'cursor-pointer hover:bg-[#222]')} ${isSelected && !showRedacted ? 'bg-[#8b0000]/20 text-white' : ''}`}
                                  >
                                    <td className="p-2 font-bold w-1/3 align-top">
                                      <div>{showRedacted ? "[REDACTED]" : power.name}</div>
                                      {(power as any).action && !showRedacted && (
                                        <div className="mt-2 text-[10px] text-gray-400 space-y-1 font-normal">
                                          <div><span className="text-gray-500">Action:</span> {(power as any).action}</div>
                                          <div><span className="text-gray-500">Opposed:</span> {(power as any).opposed}</div>
                                          <div><span className="text-gray-500">Range:</span> {(power as any).range}</div>
                                          <div><span className="text-gray-500">Sustained:</span> {(power as any).sustained}</div>
                                        </div>
                                      )}
                                    </td>
                                    <td className={`p-2 text-xs whitespace-pre-wrap align-top ${showRedacted ? 'text-red-400 font-mono italic' : ''}`}>
                                      {showRedacted ? `WARNING: Access Denied.\n\nYou must fulfill the following requirements to reveal this psychic technique:\n- ${redactionStatus.description}` : power.description}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : levelUpType === 'characteristic' ? (
                  <select 
                    value={levelUpName}
                    onChange={e => setLevelUpName(e.target.value)}
                    className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono shrink-0"
                  >
                    <option value="">Select Characteristic...</option>
                    {Object.keys(character.characteristics).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    value={levelUpName}
                    onChange={e => setLevelUpName(e.target.value)}
                    placeholder={levelUpType === 'talent' ? "e.g. Iron Jaw" : "e.g. Siege Master"}
                    className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono shrink-0"
                  />
                )}
              </div>
              
              <div className="shrink-0">
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">XP Cost</label>
                <input 
                  type="number" 
                  value={levelUpCost || ''}
                  onChange={e => setLevelUpCost(parseInt(e.target.value) || 0)}
                  className="w-full bg-black border border-[#333] p-2 rounded text-white font-mono"
                />
              </div>
              
              <div className="pt-4 flex gap-3 shrink-0">
                <button 
                  onClick={() => setShowLevelUpModal(false)}
                  className="flex-1 bg-transparent border border-[#333] hover:bg-[#222] text-white font-bold uppercase tracking-widest text-[10px] py-3 rounded transition-colors"
                >
                  Purge Record
                </button>
                <button 
                  onClick={() => {
                    let finalName = levelUpName.trim();
                    if ((levelUpName === 'Enemy' || levelUpName === 'Good Reputation' || levelUpName === 'Peer' || levelUpName === 'Rival') && levelUpSubOption) {
                      finalName = `${levelUpName} (${levelUpSubOption})`;
                    } else if (levelUpName === 'Hatred' && levelUpSubOption) {
                      if (levelUpSubOption === 'Xenos') {
                        if (levelUpCustomSubOption.trim()) {
                          finalName = `Hatred (Xenos - ${levelUpCustomSubOption.trim()})`;
                        } else {
                          return;
                        }
                      } else {
                        finalName = `Hatred (${levelUpSubOption})`;
                      }
                    } else if (levelUpName === 'Resistance' && levelUpSubOption) {
                      finalName = `Resistance (${levelUpSubOption})`;
                    } else if (levelUpName === 'Tyrannic War Stratagem' && levelUpSubOption) {
                      finalName = `Tyrannic War Stratagem (${levelUpSubOption})`;
                    } else if (levelUpName === 'Astartes Weapon Specialisation' && levelUpSubOption) {
                      finalName = `Astartes Weapon Specialisation (${levelUpSubOption})`;
                    } else if (levelUpName === 'Basic Weapon Training' && levelUpSubOption) {
                      finalName = `Basic Weapon Training (${levelUpSubOption})`;
                    } else if (levelUpName === 'Heavy Weapon Training' && levelUpSubOption) {
                      finalName = `Heavy Weapon Training (${levelUpSubOption})`;
                    } else if (levelUpName === 'Melee Weapon Training' && levelUpSubOption) {
                      finalName = `Melee Weapon Training (${levelUpSubOption})`;
                    } else if (levelUpName === 'Pistol Weapon Training' && levelUpSubOption) {
                      finalName = `Pistol Weapon Training (${levelUpSubOption})`;
                    } else if (levelUpName === 'Two-Weapon Wielder' && levelUpSubOption) {
                      finalName = `Two-Weapon Wielder (${levelUpSubOption})`;
                    } else if (levelUpName === 'Signature Wargear' || levelUpName === 'Signature Wargear (Hero)' || levelUpName === 'Artificer') {
                      if (levelUpCustomSubOption.trim()) {
                        const baseName = `${levelUpName} (${levelUpCustomSubOption.trim()})`;
                        const count = character.talents.filter(t => t === baseName || t.startsWith(baseName + ' ')).length;
                        if (count > 0) {
                          finalName = `${baseName} ${count + 1}`;
                        } else {
                          finalName = baseName;
                        }
                      } else {
                        return;
                      }
                    } else if (levelUpName === 'Signature Wargear (Master)') {
                      if (levelUpCustomSubOption.trim() && levelUpSubOption) {
                        finalName = `Signature Wargear (Master) (${levelUpCustomSubOption.trim()} - ${levelUpSubOption})`;
                      } else {
                        return;
                      }
                    } else if (levelUpName === 'The Flesh is Weak' || levelUpName === 'Psy Rating' || levelUpName === 'Sound Constitution') {
                      const count = character.talents.filter(t => t === levelUpName || t.startsWith(levelUpName + ' ')).length;
                      if (count > 0) {
                        finalName = `${levelUpName} ${count + 1}`;
                      }
                    }

                    if (levelUpType === 'skill' && finalName.toLowerCase() === 'trade (forge master)' && character.advancedSpeciality !== 'Deathwatch Forge Master') {
                      return;
                    }

                    if (!finalName) return;
                    
                    setCharacter(prev => {
                      const newChar = { ...prev, xpSpent: prev.xpSpent + levelUpCost };
                      
                      if (levelUpType === 'talent') {
                        if (!newChar.talents.includes(finalName)) {
                          newChar.talents = [...newChar.talents, finalName].sort();
                          
                          if (levelUpName === 'Psy Rating' && newChar.specialization === 'Librarian') {
                            newChar.psychicRating = (newChar.psychicRating || 0) + 1;
                          } else if (levelUpName === 'Sound Constitution') {
                            newChar.wounds = {
                              current: newChar.wounds.current + 1,
                              max: newChar.wounds.max + 1
                            };
                          } else if (levelUpName === 'Artificer') {
                            const itemName = levelUpCustomSubOption.trim();
                            // Upgrade craftsmanship
                            const upgradeCraftsmanship = (current: string | undefined): "Common" | "Exceptional" | "Master-Crafted" => {
                              if (current === "Exceptional" || current === "Master-Crafted") return "Master-Crafted";
                              return "Exceptional";
                            };

                            // Check ranged weapons
                            const rIndex = newChar.weapons.ranged.findIndex(w => w.name === itemName);
                            if (rIndex >= 0) {
                              newChar.weapons.ranged[rIndex].craftsmanship = upgradeCraftsmanship(newChar.weapons.ranged[rIndex].craftsmanship);
                            } else {
                              // Check melee weapons
                              const mIndex = newChar.weapons.melee.findIndex(w => w.name === itemName);
                              if (mIndex >= 0) {
                                newChar.weapons.melee[mIndex].craftsmanship = upgradeCraftsmanship(newChar.weapons.melee[mIndex].craftsmanship);
                              } else {
                                // Check armor
                                if (newChar.armor.name === itemName) {
                                  newChar.armor.craftsmanship = upgradeCraftsmanship(newChar.armor.craftsmanship);
                                } else {
                                  // Check explosives
                                  const eIndex = newChar.weapons.explosives.findIndex(w => w.name === itemName);
                                  if (eIndex >= 0) {
                                    newChar.weapons.explosives[eIndex].craftsmanship = upgradeCraftsmanship(newChar.weapons.explosives[eIndex].craftsmanship);
                                  } else {
                                    // Check additional wargear
                                    const wIndex = newChar.additionalWargear.findIndex(w => w.name === itemName);
                                    if (wIndex >= 0) {
                                      newChar.additionalWargear[wIndex].craftsmanship = upgradeCraftsmanship(newChar.additionalWargear[wIndex].craftsmanship);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else if (levelUpType === 'skill') {
                        const existingSkillIndex = newChar.skills.findIndex(s => s.name.toLowerCase() === finalName.toLowerCase());
                        if (existingSkillIndex >= 0) {
                          const newSkills = [...newChar.skills];
                          newSkills[existingSkillIndex] = {
                            ...newSkills[existingSkillIndex],
                            mastery: newSkills[existingSkillIndex].mastery + 1
                          };
                          newChar.skills = newSkills;
                        } else {
                          const matchedSkill = ALL_SKILLS.find(s => s.name.toLowerCase() === finalName.toLowerCase());
                          newChar.skills = [...newChar.skills, {
                            name: matchedSkill ? matchedSkill.name : finalName,
                            characteristic: matchedSkill ? matchedSkill.characteristic as any : "Int",
                            mastery: 1,
                            description: matchedSkill ? "" : "Custom skill"
                          }].sort((a, b) => a.name.localeCompare(b.name));
                        }
                      } else if (levelUpType === 'characteristic') {
                        const charKey = Object.keys(newChar.characteristics).find(k => k.toLowerCase() === finalName.toLowerCase()) as keyof typeof newChar.characteristics;
                        if (charKey) {
                          newChar.characteristics = {
                            ...newChar.characteristics,
                            [charKey]: {
                              ...newChar.characteristics[charKey],
                              adv: newChar.characteristics[charKey].adv + 5
                            }
                          };
                        }
                      } else if (levelUpType === 'ability') {
                        if (!newChar.abilities.includes(finalName)) {
                          newChar.abilities = [...newChar.abilities, finalName].sort();
                        }
                      } else if (levelUpType === 'psychic power') {
                        if (!newChar.psychicPowers) newChar.psychicPowers = [];
                        if (!newChar.psychicPowers.includes(finalName)) {
                          newChar.psychicPowers = [...newChar.psychicPowers, finalName].sort();
                        }
                      }
                      
                      const newHistory = newChar.advancementHistory ? [...newChar.advancementHistory] : [];
                      newHistory.push({
                        type: levelUpType,
                        name: finalName,
                        cost: levelUpCost
                      });
                      newChar.advancementHistory = newHistory;
                      
                      return newChar;
                    });
                    
                    setShowLevelUpModal(false);
                    setLevelUpName('');
                    setLevelUpSubOption('');
                    setLevelUpCustomSubOption('');
                    setLevelUpCost(0);
                  }}
                  disabled={
                    !levelUpName.trim() || 
                    ((levelUpName === 'Enemy' || levelUpName === 'Good Reputation' || levelUpName === 'Peer' || levelUpName === 'Rival') && !levelUpSubOption) || 
                    (levelUpName === 'Hatred' && (!levelUpSubOption || (levelUpSubOption === 'Xenos' && !levelUpCustomSubOption.trim()))) ||
                    (levelUpName === 'Resistance' && !levelUpSubOption) ||
                    (levelUpName === 'Tyrannic War Stratagem' && !levelUpSubOption) ||
                    (levelUpName === 'Astartes Weapon Specialisation' && !levelUpSubOption) ||
                    (levelUpName === 'Basic Weapon Training' && !levelUpSubOption) ||
                    (levelUpName === 'Heavy Weapon Training' && !levelUpSubOption) ||
                    (levelUpName === 'Melee Weapon Training' && !levelUpSubOption) ||
                    (levelUpName === 'Pistol Weapon Training' && !levelUpSubOption) ||
                    (levelUpName === 'Two-Weapon Wielder' && !levelUpSubOption) ||
                    ((levelUpName === 'Signature Wargear' || levelUpName === 'Signature Wargear (Hero)' || levelUpName === 'Artificer') && !levelUpCustomSubOption.trim()) ||
                    (levelUpName === 'Signature Wargear (Master)' && (!levelUpCustomSubOption.trim() || !levelUpSubOption)) ||
                    levelUpCost < 0 || 
                    (character.xpTotal - character.xpSpent) < levelUpCost
                  }
                  className="flex-1 bg-[#8b0000] hover:bg-[#a00000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-[10px] py-3 rounded transition-colors"
                >
                  {levelUpType === 'talent' ? 'Approve talent acquisition' : 
                   levelUpType === 'skill' ? 'Approve skill acquisition' : 
                   levelUpType === 'ability' ? 'Approve ability acquisition' : 
                   levelUpType === 'psychic power' ? 'Approve psychic power acquisition' : 
                   'Approve change to inquisitorial record'}
                </button>
              </div>
              
              {(character.xpTotal - character.xpSpent) < levelUpCost && (
                <p className="text-red-500 text-xs text-center mt-2">Not enough Available XP.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deathwatch Captain Ability Modal */}
      {showCaptainAbilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111] border-2 border-[#ffd700]/30 rounded-lg w-full max-w-2xl shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden">
            <div className="p-4 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center">
              <h3 className="text-[#ffd700] gothic-font uppercase tracking-widest">Select Kill-team Leader Ability</h3>
            </div>
            <div className="p-6 space-y-4 bg-[#0c0c0c] max-h-[70vh] overflow-y-auto scrollbar-hide">
              <p className="text-xs text-gray-400 italic mb-4">
                "A Captain must choose the tools of victory before the first shot is fired."
              </p>
              {DEATHWATCH_CAPTAIN_ABILITIES.map((ability) => (
                <div 
                  key={ability.name}
                  onClick={() => {
                    setCharacter(prev => ({
                      ...prev,
                      captainAbility: ability.name,
                      abilities: [...(prev.abilities || []).filter(a => !DEATHWATCH_CAPTAIN_ABILITIES.some(aa => aa.name === a)), ability.name]
                    }));
                    setShowCaptainAbilityModal(false);
                  }}
                  className={`p-4 border rounded transition-all cursor-pointer group ${
                    character.captainAbility === ability.name 
                      ? 'bg-[#ffd700]/10 border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                      : 'bg-[#1a1a1a] border-[#333] hover:border-[#ffd700]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold uppercase tracking-wider ${character.captainAbility === ability.name ? 'text-[#ffd700]' : 'text-gray-300 group-hover:text-[#ffd700]'}`}>
                      {ability.name}
                    </h4>
                    {character.captainAbility === ability.name && (
                      <span className="text-[#ffd700] text-[10px] font-bold border border-[#ffd700] px-2 py-0.5 rounded">SELECTED</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#1a1a1a] text-center border-t border-[#333]">
              <button 
                onClick={() => setShowCaptainAbilityModal(false)} 
                className="bg-[#111] text-[#ffd700] px-8 py-2 rounded gothic-font uppercase tracking-widest text-xs hover:bg-[#ffd700]/10 transition-colors border border-[#ffd700]/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* First Company Veteran Ability Modal */}
      {showFirstCompanyVeteranAbilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111] border-2 border-[#ffd700]/30 rounded-lg w-full max-w-2xl shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden">
            <div className="p-4 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center">
              <h3 className="text-[#ffd700] gothic-font uppercase tracking-widest">Select Battle-hardened Ability</h3>
            </div>
            <div className="p-6 space-y-4 bg-[#0c0c0c] max-h-[70vh] overflow-y-auto scrollbar-hide">
              <p className="text-xs text-gray-400 italic mb-4">
                "The veteran draws upon a wealth of battlefield experience and combat training."
              </p>
              {FIRST_COMPANY_VETERAN_ABILITIES.map((ability) => (
                <div 
                  key={ability.name}
                  onClick={() => {
                    setCharacter(prev => ({
                      ...prev,
                      abilities: [...(prev.abilities || []).filter(a => !FIRST_COMPANY_VETERAN_ABILITIES.some(aa => aa.name === a)), ability.name]
                    }));
                    setShowFirstCompanyVeteranAbilityModal(false);
                  }}
                  className={`p-4 border rounded transition-all cursor-pointer group ${
                    character.abilities?.includes(ability.name) 
                      ? 'bg-[#ffd700]/10 border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                      : 'bg-[#1a1a1a] border-[#333] hover:border-[#ffd700]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold uppercase tracking-wider ${character.abilities?.includes(ability.name) ? 'text-[#ffd700]' : 'text-gray-300 group-hover:text-[#ffd700]'}`}>
                      {ability.name}
                    </h4>
                    {character.abilities?.includes(ability.name) && (
                      <span className="text-[#ffd700] text-[10px] font-bold border border-[#ffd700] px-2 py-0.5 rounded">SELECTED</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#1a1a1a] text-center border-t border-[#333]">
              <button 
                onClick={() => setShowFirstCompanyVeteranAbilityModal(false)} 
                className="bg-[#111] text-[#ffd700] px-8 py-2 rounded gothic-font uppercase tracking-widest text-xs hover:bg-[#ffd700]/10 transition-colors border border-[#ffd700]/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded group hover:border-[#ffd700] transition-colors cursor-pointer" onClick={() => {
                const newHasIronHalo = !character.hasIronHalo;
                let newAdditionalWargear = [...character.additionalWargear];
                
                if (character.advancedSpeciality === "Deathwatch Captain") {
                  if (newHasIronHalo) {
                    if (!newAdditionalWargear.some(w => w.name === "Iron Halo")) {
                      newAdditionalWargear.push({
                        id: `iron-halo-${Date.now()}`,
                        name: "Iron Halo",
                        description: "Provides a Force Field with a Protection Rating of 50. It does not overload."
                      });
                    }
                  } else {
                    newAdditionalWargear = newAdditionalWargear.filter(w => w.name !== "Iron Halo");
                  }
                }
                
                setCharacter({...character, hasIronHalo: newHasIronHalo, additionalWargear: newAdditionalWargear});
              }}>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold uppercase ${character.hasIronHalo ? 'text-[#ffd700]' : 'text-gray-600'}`}>Iron Halo</span>
                  <span className="text-[10px] text-gray-500 mt-1">A prestigious honor granted to those who show exceptional leadership and bravery. Incorporates a powerful conversion field.</span>
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center border-2 transition-all ${character.hasIronHalo ? 'border-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_10px_rgba(255,215,0,0.2)]' : 'border-[#333]'}`}>
                  {character.hasIronHalo && <span className="text-[#ffd700] text-xl font-bold leading-none">☼</span>}
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
          <div className="bg-[#111] border-2 border-[#333] rounded-lg w-full max-w-2xl shadow-[0_0_50px_rgba(139,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
            <div className={`p-3 transition-all duration-300 flex justify-between items-center ${isWeaponCloseHovered ? 'bg-[#8b0000]' : 'bg-transparent'}`}>
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
            <div className="p-4 space-y-3 bg-[#0c0c0c] overflow-y-auto custom-scrollbar">
              <div className="flex gap-2 p-1 bg-[#1a1a1a] rounded mb-2 overflow-x-auto scrollbar-hide shrink-0">
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('ranged')}
                  className={`flex-1 py-1.5 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'ranged' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Tactical (Ranged)
                </button>
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('melee')}
                  className={`flex-1 py-1.5 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'melee' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Close Combat (Melee)
                </button>
                <button 
                  disabled={isWeaponSubmitting}
                  onClick={() => setWeaponType('explosive')}
                  className={`flex-1 py-1.5 px-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all whitespace-nowrap ${weaponType === 'explosive' ? 'bg-[#8b0000] text-white' : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'}`}
                >
                  Explosives
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2 space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Pattern Designation</label>
                  <input 
                    disabled={isWeaponSubmitting}
                    value={newWeapon.name} 
                    onChange={e => setNewWeapon({...newWeapon, name: e.target.value})}
                    placeholder={weaponType === 'explosive' ? "e.g. Melta Bomb" : "e.g. Astartes Storm Bolter"}
                    className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                  />
                </div>

                {weaponType === 'ranged' && (
                  <div className="col-span-2 space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Class</label>
                    <div className="flex gap-1">
                      {['Pistol', 'Basic', 'Heavy', 'Mounted'].map((cls) => (
                        <button
                          key={cls}
                          disabled={isWeaponSubmitting}
                          onClick={() => setNewWeapon({...newWeapon, class: cls as any})}
                          className={`flex-1 py-1 px-1 text-[8px] font-bold uppercase tracking-widest rounded transition-all border ${newWeapon.class === cls ? 'bg-[#333] text-white border-white' : 'bg-[#1a1a1a] text-gray-500 border-[#333] hover:border-gray-500'}`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="col-span-4 grid grid-cols-4 gap-3 bg-[#151515] p-2 rounded border border-[#222]">
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-500 block">Dmg Dice (d10)</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      type="number"
                      min="1"
                      max="10"
                      value={weaponDamageDice} 
                      onChange={e => setWeaponDamageDice(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-500 block">Bonus Dmg</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      type="number"
                      value={weaponDamageBonus} 
                      onChange={e => setWeaponDamageBonus(parseInt(e.target.value) || 0)}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-500 block">Type</label>
                    <select 
                      disabled={isWeaponSubmitting}
                      value={weaponDamageType} 
                      onChange={e => setWeaponDamageType(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    >
                      <option value="X">Explosive</option>
                      <option value="R">Rending</option>
                      <option value="E">Energy</option>
                      <option value="I">Impact</option>
                      <option value="S">Shock</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-[#1a1a1a] rounded border border-[#333]">
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter">Profile</div>
                    <div className="text-sm font-bold text-white gothic-font">
                      {weaponDamageDice}d10{weaponDamageBonus >= 0 ? '+' : ''}{weaponDamageBonus} {weaponDamageType}
                    </div>
                  </div>
                </div>

                <div className="col-span-1 space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Pen</label>
                  <input 
                    disabled={isWeaponSubmitting}
                    type="number"
                    value={newWeapon.pen} 
                    onChange={e => setNewWeapon({...newWeapon, pen: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                  />
                </div>

                {weaponType !== 'melee' && (
                  <div className="col-span-1 space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Range</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      value={newWeapon.range} 
                      onChange={e => setNewWeapon({...newWeapon, range: e.target.value})}
                      placeholder="e.g. 100m"
                      className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                {weaponType === 'ranged' && (
                  <>
                    <div className="col-span-1 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">ROF</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        value={newWeapon.rof} 
                        onChange={e => setNewWeapon({...newWeapon, rof: e.target.value})}
                        placeholder="S/2/4"
                        className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Clip</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        type="number"
                        value={newWeapon.clip?.max} 
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setNewWeapon({...newWeapon, clip: { current: val, max: val }});
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Reload</label>
                      <input 
                        disabled={isWeaponSubmitting}
                        value={newWeapon.reload} 
                        onChange={e => setNewWeapon({...newWeapon, reload: e.target.value})}
                        placeholder="e.g. Full"
                        className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-500">Ammo Type</label>
                      <select 
                        disabled={isWeaponSubmitting}
                        value={weaponAmmoType} 
                        onChange={e => setWeaponAmmoType(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                      >
                        <option value="">Select Ammo...</option>
                        {AMMO_DATABASE.filter(a => a.category === 'Ammo').map(ammo => (
                          <option key={ammo.name} value={ammo.name}>{ammo.name}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {weaponType === 'explosive' && (
                   <div className="col-span-2 space-y-1">
                    <label className="text-[9px] uppercase font-bold text-gray-500">Quantity</label>
                    <input 
                      disabled={isWeaponSubmitting}
                      type="number"
                      min="1"
                      value={newWeapon.quantity?.max} 
                      onChange={e => {
                        const val = parseInt(e.target.value) || 1;
                        setNewWeapon({...newWeapon, quantity: { current: val, max: val }});
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-xs text-white focus:border-[#8b0000] outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                <div className="col-span-4 space-y-1">
                  <label className="text-[9px] uppercase font-bold text-gray-500">Special Rules</label>
                  <textarea 
                    disabled={isWeaponSubmitting}
                    value={newWeapon.special} 
                    onChange={e => setNewWeapon({...newWeapon, special: e.target.value})}
                    placeholder="e.g. Tearing, Reliable, Blast (5)..."
                    className="w-full bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs text-white focus:border-[#8b0000] outline-none h-10 disabled:opacity-50"
                  />
                  <div className="mt-1">
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 bg-[#151515] rounded border border-[#333] scrollbar-thin scrollbar-thumb-gray-700">
                      {Object.keys(SPECIAL_RULES).sort().map(rule => {
                        const isSelected = newWeapon.special.split(',').map(r => r.trim().split('(')[0].trim()).includes(rule);
                        return (
                          <button
                            key={rule}
                            disabled={isWeaponSubmitting}
                            onClick={() => {
                              const currentRules = newWeapon.special.split(',').map(r => r.trim()).filter(r => r);
                              const ruleIndex = currentRules.findIndex(r => r.split('(')[0].trim() === rule);
                              
                              if (ruleIndex >= 0) {
                                const newRules = [...currentRules];
                                newRules.splice(ruleIndex, 1);
                                setNewWeapon({...newWeapon, special: newRules.join(', ')});
                              } else {
                                setNewWeapon({...newWeapon, special: currentRules.concat(rule).join(', ')});
                              }
                            }}
                            className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                              isSelected 
                                ? 'bg-[#8b0000] text-white border-[#8b0000]' 
                                : 'bg-[#222] text-gray-400 border-[#333] hover:border-gray-500 hover:text-gray-200'
                            }`}
                            title={SPECIAL_RULES[rule]}
                          >
                            {rule}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-[#1a1a1a] text-center border-t border-[#222]">
              <button 
                onClick={handleRequestWeapon} 
                disabled={isWeaponSubmitting || !newWeapon.name}
                className={`bg-[#8b0000] text-white px-6 py-1.5 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent hover:border-[#ffd700]/30 min-h-[32px] flex items-center justify-center mx-auto ${isWeaponSubmitting ? 'bg-green-800' : 'hover:bg-[#a00000]'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isWeaponSubmitting ? "+++ request approved +++" : "Submit request to master of the forge"}
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
                {showCustomWargearView ? "Sanctioned Wargear Customization" : showReclusiamView ? "Reclusiam Reliquary" : showProtectiveView ? "Restricted Protective Wargear" : "Wargear Requisition"}
              </h3>
              <button 
                onClick={() => {
                  setShowWargearModal(false);
                  setShowCustomWargearView(false);
                  setIsWargearAccessGranted(false);
                  setShowReclusiamView(false);
                  setIsReclusiamAccessGranted(false);
                  setShowProtectiveView(false);
                  setIsProtectiveAccessGranted(false);
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
                    {SORTED_RELIC_WARGEAR.map((relic, idx) => {
                      const isVisible = relic.chapter === 'Deathwatch' || relic.chapter === character.chapter;
                      if (!isVisible) return null;

                      return (
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
                      );
                    })}
                  </div>
                </div>
              ) : showProtectiveView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  {PROTECTIVE_WARGEAR.map(item => (
                    <button
                      key={item.name}
                      onClick={() => addWargear(item)}
                      className="bg-[#111] border border-[#222] p-4 rounded text-left hover:border-[#8b0000] hover:bg-[#1a1a1a] transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-1">
                        <div className="text-[8px] text-[#8b0000] border border-[#8b0000] px-1 rounded uppercase tracking-tighter font-bold">
                          {item.type}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white uppercase tracking-widest mb-1 group-hover:text-red-500">{item.name}</div>
                      <div className="text-[10px] text-gray-400 leading-tight mb-2">
                        {item.summary}
                      </div>
                      <div className="text-[9px] text-gray-500 italic border-t border-[#222] pt-2 mt-2">
                        {item.description}
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={() => setShowProtectiveView(false)}
                    className="col-span-full mt-4 w-full text-[10px] text-gray-500 uppercase font-bold tracking-widest hover:text-gray-300 transition-colors"
                  >
                    Return to Standard Requisition
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
              {showReclusiamView && (
                <button 
                  onClick={() => {
                    if (selectedRelics.size === 0) return;
                    
                    setIsRelicRequisitionApproved(true);
                    
                    setCharacter(prev => {
                      let newCharacter = { ...prev };
                      
                      // Process all selected relics
                      selectedRelics.forEach(idx => {
                        const relic = SORTED_RELIC_WARGEAR[idx];
                        
                        // Skip relics not available to this chapter
                        if (relic.chapter !== 'Deathwatch' && relic.chapter !== prev.chapter) return;

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
                  className={`w-full py-3 rounded gothic-font uppercase tracking-widest text-xs transition-all border border-transparent flex items-center justify-center shadow-lg ${
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
              )}
              {showAmmoView && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-4 border-b border-[#333] pb-2">
                    <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">Ammunition Requisition</h3>
                    <button 
                      onClick={() => setShowAmmoView(false)}
                      className="text-[10px] text-red-500 hover:text-red-400 uppercase font-bold tracking-widest border border-red-900/30 px-2 py-1 rounded hover:bg-red-900/20 transition-colors"
                    >
                      Close Terminal
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {['Ammo', 'Special Issue Ammo'].map(category => (
                      <div key={category} className="space-y-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">{category}</h4>
                        {AMMO_DATABASE.filter(a => a.category === category).map(ammo => {
                           const isOwned = character.ammunition.some(a => a.name === ammo.name);
                           return (
                             <div key={ammo.name} className="bg-[#111] border border-[#222] p-2 rounded hover:border-gray-600 transition-colors">
                               <div className="flex justify-between items-start mb-1">
                                 <div className="font-bold text-gray-200 text-xs">{ammo.name}</div>
                                 <button
                                   onClick={() => {
                                     if (isOwned) {
                                       setCharacter(prev => ({...prev, ammunition: prev.ammunition.filter(a => a.name !== ammo.name)}));
                                     } else {
                                       // Default to 1 magazine and 0 loose rounds (or maybe 28 rounds if it's bolt?)
                                       // For simplicity, let's just initialize with 1 mag and 0 loose rounds.
                                       // Or maybe 0 loose rounds.
                                       setCharacter(prev => ({...prev, ammunition: [...prev.ammunition, { name: ammo.name, count: 1, remainingRounds: 0 }]}));
                                     }
                                   }}
                                   className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border transition-all ${isOwned ? 'bg-green-900/30 text-green-400 border-green-800 hover:bg-red-900/30 hover:text-red-400 hover:border-red-800' : 'bg-blue-900/20 text-blue-400 border-blue-800 hover:bg-blue-900/40 hover:text-white'}`}
                                 >
                                   {isOwned ? "Requisitioned" : "Request"}
                                 </button>
                               </div>
                               <div className="text-[10px] text-gray-500 mb-1">{ammo.description}</div>
                               <div className="text-[9px] font-mono text-yellow-600/80">{ammo.modifiers}</div>
                             </div>
                           );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!showCustomWargearView && !showReclusiamView && !showProtectiveView && !showAmmoView && (
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
                    setIsAmmoAccessGranted(true);
                    setTimeout(() => {
                      setIsAmmoAccessGranted(false);
                      setShowAmmoView(true);
                    }, 1000);
                  }}
                  className={`w-full py-2 mt-2 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent flex items-center justify-center ${
                    isAmmoAccessGranted 
                      ? 'bg-green-800 text-white' 
                      : 'bg-[#1a1a1a] text-gray-500 hover:text-white hover:border-[#8b0000]'
                  }`}
                >
                  {isAmmoAccessGranted ? "Access granted" : "Request Ammunition Supply"}
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
                <button 
                  onClick={() => {
                    setIsProtectiveAccessGranted(true);
                    setTimeout(() => {
                      setIsProtectiveAccessGranted(false);
                      setShowProtectiveView(true);
                    }, 1000);
                  }}
                  className={`w-full py-2 mt-2 rounded gothic-font uppercase tracking-widest text-[10px] transition-all border border-transparent flex items-center justify-center ${
                    isProtectiveAccessGranted 
                      ? 'bg-green-800 text-white' 
                      : 'bg-[#1a1a1a] text-gray-500 hover:text-white hover:border-[#8b0000]'
                  }`}
                >
                  {isProtectiveAccessGranted ? "+++ Access granted +++" : "+++ access additional restricted protective wargear +++"}
                </button>
                </>
              )}
              <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest text-center">
                {showCustomWargearView ? "Define custom wargear parameters for the Ordo Xenos archives" : showReclusiamView ? "Reclusiam Reliquary Access Terminal" : showProtectiveView ? "Restricted Protective Wargear Access" : showAmmoView ? "Select Ammunition Requisition" : "Select wargear to add to the character's manifest"}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCyberneticsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl bg-[#111] border border-[#333] shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#151515]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-blue-500"><Icons.Wargear /></div>
                <div>
                  <h3 className="text-white gothic-font uppercase tracking-widest">Cybernetics Requisition</h3>
                  <div className="text-[10px] text-blue-400 uppercase tracking-wider">The Flesh is Weak</div>
                </div>
              </div>
              <button 
                onClick={() => setShowCyberneticsModal(false)}
                className="text-gray-500 hover:text-white transition-colors p-2"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CYBERNETICS.map((cybernetic) => {
                  const installedCybernetic = (character.cybernetics || []).find(c => c.name === cybernetic.name);
                  const isInstalled = !!installedCybernetic;
                  const currentQuality = installedCybernetic?.quality || 'Common';
                  const isExpanded = expandedCybernetics.has(`modal-${cybernetic.name}`);
                  return (
                    <div 
                      key={cybernetic.name} 
                      className={`bg-[#1a1a1a] border ${isInstalled ? 'border-blue-500/50' : 'border-[#333]'} p-4 rounded hover:border-blue-500/30 transition-colors group relative flex flex-col cursor-pointer`}
                      onClick={() => {
                        const newExpanded = new Set(expandedCybernetics);
                        if (isExpanded) {
                          newExpanded.delete(`modal-${cybernetic.name}`);
                        } else {
                          newExpanded.add(`modal-${cybernetic.name}`);
                        }
                        setExpandedCybernetics(newExpanded);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-bold uppercase text-blue-400">{cybernetic.name}</div>
                        {isInstalled && <div className="text-[9px] text-green-500 uppercase font-bold">Installed</div>}
                      </div>
                      <div className="text-[10px] text-gray-400 mb-2 min-h-[40px]">
                        {isExpanded ? cybernetic.description : (cybernetic.summary || cybernetic.description)}
                      </div>
                      
                      {isExpanded && (
                        <>
                          <div className="text-[9px] text-gray-500 italic mb-1">Location: {cybernetic.location}</div>
                          <div className="text-[9px] text-blue-500/80 italic mb-3">+{cybernetic.toughnessBonus ?? 2} Toughness Bonus to {cybernetic.location} (after Unnatural Toughness)</div>
                          
                          {/* Modifiers display */}
                          {cybernetic.modifiers && (
                            <div className="mb-3 space-y-1">
                              {cybernetic.modifiers.characteristics && Object.entries(cybernetic.modifiers.characteristics).map(([char, val]) => (
                                <div key={char} className="text-[9px] text-blue-300">+{val} {char}</div>
                              ))}
                              {cybernetic.modifiers.traits?.map(trait => (
                                <div key={trait} className="text-[9px] text-blue-300">{trait}</div>
                              ))}
                              {cybernetic.modifiers.talents?.map(talent => (
                                <div key={talent} className="text-[9px] text-blue-300">{talent}</div>
                              ))}
                              {cybernetic.modifiers.skills?.map(skill => (
                                <div key={skill.name} className="text-[9px] text-blue-300">{skill.name} ({skill.description})</div>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      <div className="flex gap-1 mt-auto pt-2">
                        {(['Common', 'Exceptional', 'Master-Crafted'] as const).map(q => {
                          const isActive = isInstalled && currentQuality === q;
                          return (
                            <button
                              key={q}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isActive) {
                                  // Remove
                                  const newCybernetics = (character.cybernetics || []).filter(c => c.name !== cybernetic.name);
                                  
                                  let newMeleeWeapons = [...character.weapons.melee].filter(w => !w.name.startsWith("Servo-Arm"));
                                  newCybernetics.forEach(c => {
                                    if (c.name === "Servo-Arm" || c.name === "Servo-Harness") {
                                      const cq = c.quality || 'Common';
                                      const damage = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "2d10+16 I" : "2d10+14 I";
                                      const special = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "Unwieldy, +10 to Grapple Tests" : "Unwieldy";
                                      const count = c.name === "Servo-Harness" ? 2 : 1;
                                      for (let i = 0; i < count; i++) {
                                        newMeleeWeapons.push({
                                          id: `servo-arm-${Date.now()}-${Math.random()}`,
                                          name: `Servo-Arm (${cq})`,
                                          damage: damage,
                                          pen: 10,
                                          special: special
                                        });
                                      }
                                    }
                                  });

                                  setCharacter({
                                    ...character, 
                                    cybernetics: newCybernetics,
                                    weapons: {
                                      ...character.weapons,
                                      melee: newMeleeWeapons
                                    }
                                  });
                                } else {
                                  // Install or change quality
                                  const newCybernetics = (character.cybernetics || []).filter(c => c.name !== cybernetic.name);
                                  const finalCybernetics = [...newCybernetics, { ...cybernetic, quality: q }];
                                  
                                  let newMeleeWeapons = [...character.weapons.melee].filter(w => !w.name.startsWith("Servo-Arm"));
                                  finalCybernetics.forEach(c => {
                                    if (c.name === "Servo-Arm" || c.name === "Servo-Harness") {
                                      const cq = c.quality || 'Common';
                                      const damage = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "2d10+16 I" : "2d10+14 I";
                                      const special = (cq === 'Exceptional' || cq === 'Master-Crafted') ? "Unwieldy, +10 to Grapple Tests" : "Unwieldy";
                                      const count = c.name === "Servo-Harness" ? 2 : 1;
                                      for (let i = 0; i < count; i++) {
                                        newMeleeWeapons.push({
                                          id: `servo-arm-${Date.now()}-${Math.random()}`,
                                          name: `Servo-Arm (${cq})`,
                                          damage: damage,
                                          pen: 10,
                                          special: special
                                        });
                                      }
                                    }
                                  });

                                  setCharacter({
                                    ...character,
                                    cybernetics: finalCybernetics,
                                    weapons: {
                                      ...character.weapons,
                                      melee: newMeleeWeapons
                                    }
                                  });
                                }
                              }}
                              className={`flex-1 py-1.5 text-[8px] uppercase font-bold tracking-tighter border transition-colors ${
                                isActive
                                  ? 'bg-blue-900/40 border-blue-500 text-blue-300'
                                  : 'bg-[#111] border-[#333] text-gray-500 hover:bg-[#222] hover:text-gray-300 hover:border-[#555]'
                              }`}
                            >
                              {q}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Psychic Powers Selection Modal */}
      {showPsychicPowersModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-purple-900 w-full max-w-4xl p-6 relative shadow-[0_0_50px_rgba(147,51,234,0.3)] max-h-[90vh] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-purple-400 text-center uppercase tracking-wide mb-2 animate-pulse whitespace-nowrap">
              +++ Brother Librarian, Select Psychic Powers +++
            </h2>
            <p className="text-center text-gray-400 text-xs mb-6">Select 3 Psychic Powers to begin your journey.</p>

            <div className="overflow-y-auto pr-2 flex-1 space-y-6">
              {Object.entries(
                getAvailablePsychicPowers().reduce((acc, power) => {
                  const cat = power.category || 'Other powers';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(power);
                  return acc;
                }, {} as Record<string, typeof LIBRARIAN_PSYCHIC_POWERS>)
              ).map(([category, powers]) => (
                <div key={category}>
                  <h3 className="text-purple-400 text-sm font-bold uppercase tracking-widest border-b border-purple-900/50 pb-2 mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {powers.map((power) => {
                      const isSelected = selectedPsychicPowers.includes(power.name);
                      const isAcquired = psychicPowersSelectionState === 'acquired';
                      
                      const simulatedCharacter = {
                        ...character,
                        psychicPowers: selectedPsychicPowers,
                        rank: 1
                      };
                      const redactionStatus = getPsychicPowerRedactionStatus(power.name, simulatedCharacter);
                      const showRedacted = !isSelected && redactionStatus.isRedacted;
                      
                      const canSelect = !showRedacted && (isSelected || selectedPsychicPowers.length < 3);

                      return (
                        <button
                          key={power.name}
                          disabled={isAcquired || !canSelect || showRedacted}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedPsychicPowers(prev => prev.filter(p => p !== power.name));
                            } else if (canSelect) {
                              setSelectedPsychicPowers(prev => [...prev, power.name]);
                            }
                          }}
                          className={`relative p-4 border-2 transition-all duration-300 group text-left h-full flex flex-col ${
                            isSelected
                              ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.2)]'
                              : showRedacted
                                ? 'opacity-50 min-h-20 bg-[#111] border-[#222] cursor-not-allowed'
                                : isAcquired || !canSelect
                                  ? 'opacity-30 grayscale border-gray-800 cursor-not-allowed'
                                  : 'bg-[#111] border-purple-900/30 hover:border-purple-400 hover:bg-purple-900/10 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 bg-purple-500/10 animate-pulse pointer-events-none"></div>
                          )}
                          
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-sm font-bold uppercase tracking-widest ${
                              isSelected ? 'text-purple-400' : 'text-gray-300 group-hover:text-white'
                            }`}>
                              {showRedacted ? "[REDACTED]" : power.name}
                            </h3>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_5px_#a855f7]"></div>}
                          </div>
                          
                          {(power as any).action && !showRedacted && (
                            <div className="grid grid-cols-2 gap-2 mb-2 text-[10px] text-gray-400 w-full text-left">
                              <div><span className="text-gray-500">Action:</span> {(power as any).action}</div>
                              <div><span className="text-gray-500">Opposed:</span> {(power as any).opposed}</div>
                              <div><span className="text-gray-500">Range:</span> {(power as any).range}</div>
                              <div><span className="text-gray-500">Sustained:</span> {(power as any).sustained}</div>
                            </div>
                          )}
                          
                          <p className={`text-[10px] leading-relaxed flex-1 whitespace-pre-wrap ${showRedacted ? 'text-red-400 font-mono italic' : 'text-gray-400'}`}>
                            {showRedacted ? `WARNING: Access Denied.\n\nYou must fulfill the following requirements to reveal this psychic technique:\n- ${redactionStatus.description}` : power.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-[#333] pt-4">
              <div className="text-xs text-gray-400">
                Selected: <span className="text-purple-400 font-bold">{selectedPsychicPowers.length} / 3</span>
              </div>
              <button
                disabled={selectedPsychicPowers.length !== 3 || psychicPowersSelectionState === 'acquired'}
                onClick={() => {
                  setPsychicPowersSelectionState('acquired');
                  setTimeout(() => {
                    setCharacter(prev => ({
                      ...prev,
                      psychicPowers: [...(prev.psychicPowers || []), ...selectedPsychicPowers],
                      psychicRating: 3
                    }));
                    setShowPsychicPowersModal(false);
                  }, 1500);
                }}
                className="bg-purple-900/50 hover:bg-purple-800 text-white px-6 py-2 rounded text-xs uppercase tracking-widest font-bold border border-purple-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {psychicPowersSelectionState === 'acquired' ? 'Acquiring...' : 'Confirm Selection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apothecary Ability Selection Modal */}
      {showApothecaryAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-green-900 w-full max-w-3xl p-6 relative shadow-[0_0_50px_rgba(34,197,94,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-green-400 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother Apothecary, Select Specialty Ability +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {APOTHECARY_ABILITIES.map((ability) => {
                const isSelected = selectedApothecaryAbilityName === ability.name;
                const isAcquired = apothecaryAbilitySelectionState === 'acquired';

                return (
                  <button
                    key={ability.name}
                    disabled={isAcquired}
                    onClick={() => {
                      setSelectedApothecaryAbilityName(ability.name);
                      setApothecaryAbilitySelectionState('acquired');
                      
                      setTimeout(() => {
                        setCharacter(prev => ({
                          ...prev,
                          abilities: [...(prev.abilities || []), ability.name]
                        }));
                        setShowApothecaryAbilityModal(false);
                      }, 1500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected && isAcquired
                        ? 'bg-green-900/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] scale-105 z-10'
                        : isAcquired 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-green-900/30 hover:border-green-400 hover:bg-green-900/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                    }`}
                  >
                    {isSelected && isAcquired && (
                      <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-bold uppercase tracking-widest ${
                        isSelected && isAcquired ? 'text-green-400' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {ability.name}
                      </h3>
                      {isSelected && isAcquired && (
                        <span className="text-green-400 text-xs font-bold animate-bounce">ACQUIRED</span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-green-500 transition-all duration-500 ${
                      isSelected && isAcquired ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-green-600/50 font-mono uppercase tracking-widest">
                Awaiting input...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Black Shield Choices Modal */}
      {showBlackShieldModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-[#ffd700] w-full max-w-3xl p-6 relative shadow-[0_0_50px_rgba(255,215,0,0.3)] max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-[#ffd700] text-center uppercase tracking-wide mb-6 animate-pulse whitespace-nowrap">
              +++ Black Shield Tactics Selection +++
            </h2>

            <div className="space-y-6">
              {/* Solo Mode Ability */}
              <div className="bg-[#111] border border-[#333] p-4 rounded">
                <h3 className="text-sm font-bold text-[#ffd700] uppercase tracking-widest mb-3 border-b border-[#333] pb-2">Solo Mode Ability</h3>
                <select 
                  value={character.blackShieldChoices?.soloModeAbility || ""}
                  onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), soloModeAbility: e.target.value}})}
                  className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs mb-2"
                >
                  <option value="">Select Solo Mode Ability</option>
                  {Object.entries(CHAPTER_SOLO_MODE_ABILITIES).map(([name, ability]) => (
                    <option key={name} value={name}>{name} ({ability.chapter})</option>
                  ))}
                </select>
                {character.blackShieldChoices?.soloModeAbility && (
                  <input 
                    type="text" 
                    placeholder="Custom Name (Optional)" 
                    value={character.blackShieldChoices?.soloModeAbilityName || ""}
                    onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), soloModeAbilityName: e.target.value}})}
                    className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs"
                  />
                )}
              </div>

              {/* Attack Pattern */}
              <div className="bg-[#111] border border-[#333] p-4 rounded">
                <h3 className="text-sm font-bold text-[#ffd700] uppercase tracking-widest mb-3 border-b border-[#333] pb-2">Attack Pattern</h3>
                <select 
                  value={character.blackShieldChoices?.attackPattern || ""}
                  onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), attackPattern: e.target.value}})}
                  className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs mb-2"
                >
                  <option value="">Select Attack Pattern</option>
                  {Object.entries(CHAPTER_ATTACK_PATTERNS).map(([name, pattern]) => (
                    <option key={name} value={name}>{name} ({pattern.chapter})</option>
                  ))}
                </select>
                {character.blackShieldChoices?.attackPattern && (
                  <input 
                    type="text" 
                    placeholder="Custom Name (Optional)" 
                    value={character.blackShieldChoices?.attackPatternName || ""}
                    onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), attackPatternName: e.target.value}})}
                    className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs"
                  />
                )}
              </div>

              {/* Defensive Stance */}
              <div className="bg-[#111] border border-[#333] p-4 rounded">
                <h3 className="text-sm font-bold text-[#ffd700] uppercase tracking-widest mb-3 border-b border-[#333] pb-2">Defensive Stance</h3>
                <select 
                  value={character.blackShieldChoices?.defensiveStance || ""}
                  onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), defensiveStance: e.target.value}})}
                  className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs mb-2"
                >
                  <option value="">Select Defensive Stance</option>
                  {Object.entries(CHAPTER_DEFENSIVE_STANCES).map(([name, stance]) => (
                    <option key={name} value={name}>{name} ({stance.chapter})</option>
                  ))}
                </select>
                {character.blackShieldChoices?.defensiveStance && (
                  <input 
                    type="text" 
                    placeholder="Custom Name (Optional)" 
                    value={character.blackShieldChoices?.defensiveStanceName || ""}
                    onChange={e => setCharacter({...character, blackShieldChoices: {...(character.blackShieldChoices || {attackPattern: "", attackPatternName: "", defensiveStance: "", defensiveStanceName: "", soloModeAbility: "", soloModeAbilityName: ""}), defensiveStanceName: e.target.value}})}
                    className="w-full bg-[#1a1a1a] border border-[#444] p-2 rounded text-white text-xs"
                  />
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowBlackShieldModal(false)}
                className="bg-[#ffd700] text-black px-8 py-2 font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Confirm Selections
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assault Marine Ability Selection Modal */}
      {showAssaultMarineAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-red-900 w-full max-w-2xl p-6 relative shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-red-400 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother Assault Marine, Select Specialty Ability +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ASSAULT_MARINE_ABILITIES.map((ability) => {
                const isSelected = selectedAssaultMarineAbilityName === ability.name;
                const isAcquired = assaultMarineAbilitySelectionState === 'acquired';

                return (
                  <button
                    key={ability.name}
                    disabled={isAcquired}
                    onClick={() => {
                      setSelectedAssaultMarineAbilityName(ability.name);
                      setAssaultMarineAbilitySelectionState('acquired');
                      
                      setTimeout(() => {
                        setCharacter(prev => ({
                          ...prev,
                          abilities: [...(prev.abilities || []), ability.name]
                        }));
                        setShowAssaultMarineAbilityModal(false);
                      }, 1500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected && isAcquired
                        ? 'bg-red-900/20 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] scale-105 z-10'
                        : isAcquired 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-red-900/30 hover:border-red-400 hover:bg-red-900/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                    }`}
                  >
                    {isSelected && isAcquired && (
                      <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-bold uppercase tracking-widest ${
                        isSelected && isAcquired ? 'text-red-400' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {ability.name}
                      </h3>
                      {isSelected && isAcquired && (
                        <span className="text-red-400 text-xs font-bold animate-bounce">ACQUIRED</span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-red-500 transition-all duration-500 ${
                      isSelected && isAcquired ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-red-600/50 font-mono uppercase tracking-widest">
                Awaiting input...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Devastator Marine Ability Selection Modal */}
      {showDevastatorMarineAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-blue-900 w-full max-w-2xl p-6 relative shadow-[0_0_50px_rgba(37,99,235,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-blue-400 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother Devastator Marine, Select Specialty Ability +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEVASTATOR_MARINE_ABILITIES.map((ability) => {
                const isSelected = selectedDevastatorMarineAbilityName === ability.name;
                const isAcquired = devastatorMarineAbilitySelectionState === 'acquired';

                return (
                  <button
                    key={ability.name}
                    disabled={isAcquired}
                    onClick={() => {
                      setSelectedDevastatorMarineAbilityName(ability.name);
                      setDevastatorMarineAbilitySelectionState('acquired');
                      
                      setTimeout(() => {
                        setCharacter(prev => ({
                          ...prev,
                          abilities: [...(prev.abilities || []), ability.name]
                        }));
                        setShowDevastatorMarineAbilityModal(false);
                      }, 1500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected && isAcquired
                        ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)] scale-105 z-10'
                        : isAcquired 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-blue-900/30 hover:border-blue-400 hover:bg-blue-900/10 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]'
                    }`}
                  >
                    {isSelected && isAcquired && (
                      <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-bold uppercase tracking-widest ${
                        isSelected && isAcquired ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {ability.name}
                      </h3>
                      {isSelected && isAcquired && (
                        <span className="text-blue-400 text-xs font-bold animate-bounce">ACQUIRED</span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-blue-500 transition-all duration-500 ${
                      isSelected && isAcquired ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-blue-600/50 font-mono uppercase tracking-widest">
                Awaiting input...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Deathwing Terminator Ability Selection Modal */}
      {showDeathwingTerminatorAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-[#ffd700] w-full max-w-4xl p-8 relative shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            
            <button 
              onClick={() => {
                if (character.abilities?.some(a => DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a))) {
                  setShowDeathwingTerminatorAbilityModal(false);
                }
              }}
              className={`absolute top-4 right-4 text-gray-500 hover:text-[#ffd700] transition-colors ${!character.abilities?.some(a => DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-xl">×</span>
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#ffd700] uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                Never Forgive, Never Forget
              </h2>
              <div className="w-24 h-px bg-[#ffd700]/50 mx-auto mb-4"></div>
              <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                The Battle-Brother’s long years of experience allow him to select one of the following special abilities during the Preparation stage of each mission, gaining that ability’s benefits for the duration of that mission. However, the Battle-Brother must be wearing Terminator Armour to benefit from these abilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEATHWING_TERMINATOR_ABILITIES.map((ability) => {
                const isSelected = character.abilities?.includes(ability.name);
                const hasSelection = character.abilities?.some(a => DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a));
                
                return (
                  <button
                    key={ability.name}
                    onClick={() => {
                      // Remove any existing Deathwing Terminator abilities
                      const newAbilities = (character.abilities || []).filter(a => !DEATHWING_TERMINATOR_ABILITIES.map(aa => aa.name).includes(a));
                      
                      setCharacter(prev => ({
                        ...prev,
                        abilities: [...newAbilities, ability.name]
                      }));
                      
                      setTimeout(() => setShowDeathwingTerminatorAbilityModal(false), 500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected
                        ? 'bg-[#ffd700]/20 border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.2)] scale-105 z-10'
                        : hasSelection 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#ffd700]/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#ffd700]/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-bold uppercase tracking-widest ${
                        isSelected ? 'text-[#ffd700]' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {ability.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[#ffd700] text-xs font-bold animate-bounce">SELECTED</span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-[#ffd700] transition-all duration-500 ${
                      isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-[#ffd700]/50 font-mono uppercase tracking-widest">
                Awaiting selection...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sword Brother Ability Selection Modal */}
      {showSwordBrotherAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-[#ffd700] w-full max-w-4xl p-8 relative shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>
            
            <button 
              onClick={() => {
                if (character.abilities?.some(a => SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a))) {
                  setShowSwordBrotherAbilityModal(false);
                }
              }}
              className={`absolute top-4 right-4 text-gray-500 hover:text-[#ffd700] transition-colors ${!character.abilities?.some(a => SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-xl">×</span>
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#ffd700] uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                Veteran of the Endless Crusade
              </h2>
              <div className="w-24 h-px bg-[#ffd700]/50 mx-auto mb-4"></div>
              <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                To reflect this combat experience, Sword Brethren may choose one of the following special abilities during the Preparation phase of each Mission. These abilities represent the skills and experience gained through their years of endless warfare. Once chosen, the special ability cannot be changed until the Mission is completed and the Battle-Brother takes part in another Preparation phase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SWORD_BROTHER_ABILITIES.map((ability) => {
                const isSelected = character.abilities?.includes(ability.name);
                const hasSelection = character.abilities?.some(a => SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a));
                
                return (
                  <button
                    key={ability.name}
                    onClick={() => {
                      // Remove any existing Sword Brother abilities
                      const newAbilities = (character.abilities || []).filter(a => !SWORD_BROTHER_ABILITIES.map(aa => aa.name).includes(a));
                      
                      setCharacter(prev => ({
                        ...prev,
                        abilities: [...newAbilities, ability.name]
                      }));
                      setShowSwordBrotherAbilityModal(false);
                    }}
                    className={`text-left p-6 border transition-all duration-300 relative group overflow-hidden ${
                      isSelected
                        ? 'bg-[#ffd700]/20 border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.2)] scale-105 z-10'
                        : hasSelection 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#ffd700]/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#ffd700]/10 animate-pulse pointer-events-none"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-bold uppercase tracking-widest ${
                        isSelected ? 'text-[#ffd700]' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {ability.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[#ffd700] text-xs font-bold animate-bounce">SELECTED</span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-[#ffd700] transition-all duration-500 ${
                      isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tactical Marine Ability Selection Modal */}
      {showTacticalMarineAbilityModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-gray-500 w-full max-w-2xl p-6 relative shadow-[0_0_50px_rgba(107,114,128,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-gray-300 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother Tactical Marine, Select Specialty Ability +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TACTICAL_MARINE_ABILITIES.map((ability) => {
                const isSelected = selectedTacticalMarineAbilityName === ability.name;
                const isAcquired = tacticalMarineAbilitySelectionState === 'acquired';

                return (
                  <button
                    key={ability.name}
                    disabled={isAcquired}
                    onClick={() => {
                      setSelectedTacticalMarineAbilityName(ability.name);
                      setTacticalMarineAbilitySelectionState('acquired');
                      
                      setTimeout(() => {
                        setCharacter(prev => ({
                          ...prev,
                          abilities: [...(prev.abilities || []), ability.name]
                        }));
                        setShowTacticalMarineAbilityModal(false);
                      }, 1500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected && isAcquired
                        ? 'bg-green-900/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] scale-105 z-10'
                        : isAcquired 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-gray-600/30 hover:border-gray-400 hover:bg-gray-800/50 hover:shadow-[0_0_20px_rgba(156,163,175,0.2)]'
                    }`}
                  >
                    {isSelected && isAcquired && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 animate-fadeIn">
                        <div className="text-green-500 font-bold uppercase tracking-widest border border-green-500 px-4 py-2 bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                          +++ Ability Acquired +++
                        </div>
                      </div>
                    )}

                    <div className="text-xl font-bold text-gray-200 mb-4 group-hover:text-white transition-colors uppercase tracking-wide">
                      {ability.name}
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed flex-1">
                      {ability.description}
                    </p>

                    <div className={`absolute -bottom-px left-0 h-px bg-gray-400 transition-all duration-500 ${
                      isSelected && isAcquired ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-500/50 font-mono uppercase tracking-widest">
                Awaiting input...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keeper Weapon Selection Modal */}
      {showKeeperWeaponModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-red-900 w-full max-w-2xl p-6 relative shadow-[0_0_50px_rgba(139,0,0,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-red-400 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother Keeper, Choose your Power Weapon +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  name: "Astartes Power Sword", 
                  stats: "1d10+6 E, Pen 6", 
                  special: "Power Field, Balanced",
                  id: "dk_power_sword"
                },
                { 
                  name: "Astartes Power Axe", 
                  stats: "1d10+7 E, Pen 7", 
                  special: "Power Field, Unbalanced",
                  id: "dk_power_axe"
                },
                { 
                  name: "Astartes Power Maul", 
                  stats: "1d10+8 E, Pen 4", 
                  special: "Power Field, Shocking",
                  id: "dk_power_maul"
                }
              ].map((weapon) => {
                return (
                  <button
                    key={weapon.name}
                    onClick={() => {
                      setCharacter(prev => ({
                        ...prev,
                        weapons: {
                          ...prev.weapons,
                          melee: [...prev.weapons.melee, {
                            id: weapon.id,
                            name: weapon.name,
                            damage: weapon.stats.split(',')[0],
                            pen: parseInt(weapon.stats.split('Pen ')[1]) || 0,
                            special: weapon.special
                          }]
                        }
                      }));
                      setShowKeeperWeaponModal(false);
                    }}
                    className="relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col bg-[#111] border-red-900/30 hover:border-red-400 hover:bg-red-900/10 hover:shadow-[0_0_20px_rgba(139,0,0,0.2)]"
                  >
                    <div className="text-red-400 font-bold uppercase tracking-widest mb-2 group-hover:text-red-300">{weapon.name}</div>
                    <div className="text-[10px] text-gray-400 leading-relaxed mb-4">{weapon.stats}</div>
                    <div className="text-[9px] text-gray-500 italic mt-auto">{weapon.special}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Force Weapon Selection Modal */}
      {showForceWeaponModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border-2 border-blue-900 w-full max-w-2xl p-6 relative shadow-[0_0_50px_rgba(30,58,138,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
            
            <h2 className="text-lg gothic-font text-blue-400 text-center uppercase tracking-wide mb-8 animate-pulse whitespace-nowrap">
              +++ Brother librarian, Choose psychic focus +++
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  name: "Astartes Force Staff", 
                  stats: "1d10+1 I, Pen 0", 
                  special: "Balanced, Force, +15 to Invocation Tests",
                  id: "lib_force_staff"
                },
                { 
                  name: "Astartes Force Sword", 
                  stats: "1d10+2 R, Pen 2", 
                  special: "Balanced, Force",
                  id: "lib_force_sword"
                }
              ].map((weapon) => {
                const isSelected = selectedForceWeaponName === weapon.name;
                const isAcquired = forceWeaponSelectionState === 'acquired';

                return (
                  <button
                    key={weapon.name}
                    disabled={isAcquired}
                    onClick={() => {
                      setSelectedForceWeaponName(weapon.name);
                      setForceWeaponSelectionState('acquired');
                      
                      // Add weapon logic
                      setTimeout(() => {
                        handleForceWeaponChange(weapon.name);
                        setShowForceWeaponModal(false);
                        setShowPsychicPowersModal(true);
                        setPsychicPowersSelectionState('selecting');
                        setSelectedPsychicPowers([]);
                      }, 1500);
                    }}
                    className={`relative p-6 border-2 transition-all duration-500 group text-left h-full flex flex-col ${
                      isSelected && isAcquired
                        ? 'bg-green-900/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] scale-105 z-10'
                        : isAcquired 
                          ? 'opacity-30 grayscale border-gray-800'
                          : 'bg-[#111] border-blue-900/30 hover:border-blue-400 hover:bg-blue-900/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                    }`}
                  >
                    {isSelected && isAcquired && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 animate-fadeIn">
                        <div className="text-green-500 font-bold uppercase tracking-widest border border-green-500 px-2 py-1 sm:px-4 sm:py-2 bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.5)] whitespace-nowrap text-[10px] sm:text-xs">
                          +++ Wargear Acquired +++
                        </div>
                      </div>
                    )}

                    <div className="text-base font-bold text-gray-200 mb-2 group-hover:text-blue-300 transition-colors uppercase tracking-wide whitespace-nowrap">
                      {weapon.name}
                    </div>
                    <div className="space-y-2 text-xs text-gray-400 font-mono">
                      <div className="flex justify-between border-b border-gray-800 pb-1">
                        <span>Damage/Pen</span>
                        <span className="text-gray-300">{weapon.stats}</span>
                      </div>
                      <div className="pt-1">
                        <span className="block text-[10px] uppercase text-gray-600 mb-1">Special Rules</span>
                        <span className="text-blue-200/80 italic flex flex-wrap gap-1">
                          <SpecialRulesList rules={weapon.special} />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showOathModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111] border border-purple-900/50 rounded-lg w-full max-w-2xl shadow-[0_0_50px_rgba(128,0,128,0.3)] overflow-hidden flex flex-col relative max-h-[90vh]">
            <div className="p-4 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center shrink-0">
              <h3 className="text-purple-400 gothic-font uppercase tracking-widest text-lg">
                Oath Selection
              </h3>
              <button 
                onClick={() => setShowOathModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-sm text-gray-300 space-y-4">
              <p className="italic text-gray-400">
                "An oath sworn is a promise made before the Emperor. To break it is to invite ruin."
              </p>
              
              <div className="bg-[#1a1a1a] border border-[#333] rounded p-4">
                 <p className="text-xs text-gray-400 mb-4 tracking-wide leading-relaxed">
                   Before undertaking a mission, a Kill-team gathers to make their oaths. Select an oath that aligns with the mission parameters.
                 </p>
                 
                 <select 
                    className="w-full bg-black border border-purple-900/50 p-2 rounded text-white text-sm"
                  >
                    <option value="">Select an Oath...</option>
                    <option value="oath_of_duty">Oath of Duty</option>
                    <option value="oath_of_glory">Oath of Glory</option>
                    <option value="oath_of_knowledge">Oath of Knowledge</option>
                    <option value="oath_of_loyalty">Oath of Loyalty</option>
                  </select>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setShowOathModal(false)}
                  className="bg-purple-900 hover:bg-purple-800 text-white font-bold uppercase tracking-widest text-xs px-6 py-2 rounded transition-colors shadow-[0_0_15px_rgba(128,0,128,0.5)]"
                >
                  Swear Oath
                </button>
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
