
export interface Characteristic {
  base: number;
  bonus: number; // Chapter/Trait modifiers
  adv: number;   // XP Advances
}

export interface Characteristics {
  WS: Characteristic;
  BS: Characteristic;
  S: Characteristic;
  T: Characteristic;
  Ag: Characteristic;
  Int: Characteristic;
  Per: Characteristic;
  WP: Characteristic;
  Fel: Characteristic;
}

export interface Skill {
  name: string;
  characteristic: keyof Characteristics;
  mastery: number; // 0: Untrained, 1: Known, 2: +10, 3: +20
  description?: string;
}

export interface BaseWeapon {
  id: string;
  name: string;
  damage: string;
  pen: number;
  special: string;
}

export interface MeleeWeapon extends BaseWeapon {}

export interface RangedWeapon extends BaseWeapon {
  range: string;
  rof: string;
  clip: { current: number; max: number };
  reload: string; // e.g., "Full", "1 Turn", "Half"
  ammoType?: string;
}

export interface Explosive extends BaseWeapon {
  range: string;
  quantity: { current: number; max: number };
}

export interface ArmorAbility {
  name: string;
  description: string;
}

export interface Armor {
  name: string;
  pattern: string;
  histories: string[];
  head: number;
  torso: number;
  rightArm: number;
  leftArm: number;
  rightLeg: number;
  leftLeg: number;
  abilities: string[]; // Names of abilities
}

export interface WargearItem {
  id: string;
  name: string;
  description: string;
  summary?: string;
  notes?: string;
  quantity?: { current: number; max: number };
}

export interface BattleTrauma {
  name: string;
  summary: string;
  description: string;
}

export interface CharacterData {
  name: string;
  chapter: string;
  specialization: string;
  advancedSpeciality: string;
  hasCruxTerminatus: boolean;
  rank: number;
  renown: number; 
  xpTotal: number;
  xpSpent: number;
  wounds: { current: number; max: number };
  criticalWounds: number;
  fatigue: number;
  fate: { current: number; max: number };
  insanity: number;
  corruption: number;
  battleTraumas: string[]; // List of names
  additionalWargear: WargearItem[];
  characteristics: Characteristics;
  skills: Skill[];
  talents: string[];
  traits: string[];
  weapons: {
    melee: MeleeWeapon[];
    ranged: RangedWeapon[];
    explosives: Explosive[];
  };
  armor: Armor;
  history: string;
  personalDemeanor: string;
  chapterDemeanor: string;
  soloModeAbility: string;
}

export const INITIAL_CHARACTER: CharacterData = {
  name: "Brother Alaric",
  chapter: "Ultramarines",
  specialization: "Tactical Marine",
  advancedSpeciality: "None",
  hasCruxTerminatus: false,
  rank: 1,
  renown: 1,
  xpTotal: 13000,
  xpSpent: 12500,
  wounds: { current: 21, max: 21 },
  criticalWounds: 0,
  fatigue: 0,
  fate: { current: 3, max: 3 },
  insanity: 0,
  corruption: 0,
  battleTraumas: [],
  additionalWargear: [],
  characteristics: {
    WS: { base: 30, bonus: 0, adv: 0 },
    BS: { base: 30, bonus: 0, adv: 0 },
    S: { base: 30, bonus: 0, adv: 0 },
    T: { base: 30, bonus: 0, adv: 0 },
    Ag: { base: 30, bonus: 0, adv: 0 },
    Int: { base: 30, bonus: 0, adv: 0 },
    Per: { base: 30, bonus: 0, adv: 0 },
    WP: { base: 30, bonus: 0, adv: 0 },
    Fel: { base: 30, bonus: 0, adv: 0 },
  },
  skills: [
    { name: "Awareness", characteristic: "Per", mastery: 1 },
    { name: "Ciphers (Chapter Runes)", characteristic: "Int", mastery: 1 },
    { name: "Climb", characteristic: "S", mastery: 1 },
    { name: "Dodge", characteristic: "Ag", mastery: 1 },
    { name: "Command", characteristic: "Fel", mastery: 1 },
  ],
  talents: ["Ambidextrous", "Astartes Weapon Training", "Bulging Biceps"],
  traits: ["Unnatural Strength (x2)", "Unnatural Toughness (x2)"],
  weapons: {
    melee: [
      { id: 'm1', name: "Astartes Combat Knife", damage: "1d10+2 R", pen: 2, special: "-" }
    ],
    ranged: [
      { id: 'r1', name: "Astartes Bolter", range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds" }
    ],
    explosives: [
      { id: 'e1', name: "Frag Grenade", range: "SBx3m", damage: "2d10 X", pen: 0, special: "Blast (5)", quantity: { current: 3, max: 3 } },
      { id: 'e2', name: "Krak Grenade", range: "SBx3m", damage: "3d10+10 X", pen: 6, special: "-", quantity: { current: 2, max: 2 } }
    ]
  },
  armor: {
    name: "Mk VII Aquila Power Armor",
    pattern: "MK VII Aquilla",
    histories: ["None"],
    head: 8,
    torso: 10,
    rightArm: 8,
    leftArm: 8,
    rightLeg: 8,
    leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
  },
  history: "Hails from the world of Macragge. Served with distinction in the Tyrannic Wars.",
  personalDemeanor: "Stoic",
  chapterDemeanor: "Honour the Codex",
  soloModeAbility: "Tactical Flexibility",
};
