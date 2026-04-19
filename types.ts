
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
  craftsmanship?: "Common" | "Exceptional" | "Master-Crafted";
}

export interface MeleeWeapon extends BaseWeapon {
  attachments?: string[];
}

export interface WeaponAttachment {
  name: string;
  description: string;
  rule: string;
  compatibleClasses: string[]; // e.g., ['Pistol', 'Basic', 'Melee']
  compatibleAmmoTypes?: string[]; // e.g., ['Bolt', 'Melta']
  rangeModifier?: number; // Multiplier, e.g., 0.7 for -30%
  slot?: string; // e.g., 'Sight'
}

export type AmmoCategory = 
  | 'Bolt shells'
  | 'Bullets'
  | 'Charge pack'
  | 'Exotic'
  | 'Fuel'
  | 'Needle precipitator'
  | 'Plasma flask'
  | 'Shells';

export interface RangedWeapon extends BaseWeapon {
  class?: 'Pistol' | 'Basic' | 'Heavy' | 'Mounted';
  range: string;
  rof: string;
  clip: { current: number; max: number };
  reload: string; // e.g., "Full", "1 Turn", "Half"
  ammoType?: string;
  ammoClass?: string; // e.g., 'Bolt', 'Plasma', 'Melta', 'Shotgun'
  ammoCategory?: AmmoCategory; // New field for ammo compatibility
  attachments?: string[]; // List of attachment names
}

export interface Ammo {
  name: string;
  category: 'Ammo' | 'Special Issue Ammo';
  compatibleClass: string;
  ammoCategory: AmmoCategory; // New field to link with weapon
  description: string;
  modifiers: string;
}

export const AMMO_DATABASE: Ammo[] = [
  { name: "Standard Bolt Rounds", category: "Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Standard explosive rounds.", modifiers: "-" },
  { name: "Kraken Rounds", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Adamantium core for armor piercing.", modifiers: "Pen 8, Range x1.5" },
  { name: "Metal Storm Rounds", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Proximity detonators for area denial.", modifiers: "Blast (2), Pen -2" },
  { name: "Stalker Rounds", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Subsonic rounds for stealth.", modifiers: "-30 to hear, 1/2 hear range, -2 Dmg. Stalker-pattern: No Dmg penalty, Undetectable." },
  { name: "Hellfire Rounds", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Mutagenic acid. Ignores Natural Armor. RF on 9-10. Gains Tearing. Heavy Bolter: S/-/- ROF, Blast (3). +1 Mag Dmg vs Hordes.", modifiers: "Ignores Nat. Armor, RF 9+, Tearing, Special (Heavy Bolter/Horde rules)" },
  { name: "Dragonfire Bolts", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Superheated gas. -2 Dmg. Target & within 2m Ag Test or Fire. Can target area (+20 to hit), 2m radius Ag Test vs Fire.", modifiers: "-2 Damage, Blast (2m), Ag Test vs Fire" },
  { name: "Vengeance Rounds", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Unstable flux core for anti-marine work.", modifiers: "Felling (1), Pen 9. Roll 91-100: Self-dmg (Wpn Dmg, Pen 5) to Arm, Jam." },
  { name: "Witch Bolts", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Disrupts psychic connection.", modifiers: "Psy Rating -1 (1d10 rnds), No Push. Warp Instability Test." },
  { name: "Implosion Shells", category: "Special Issue Ammo", compatibleClass: "Bolt", ammoCategory: "Bolt shells", description: "Target suffers 1d5 Agility Damage if they take damage.", modifiers: "1d5 Ag Dmg on hit" },
  { name: "Standard Bullets", category: "Ammo", compatibleClass: "Solid Projectile", ammoCategory: "Bullets", description: "Standard solid projectile rounds.", modifiers: "-" },
  { name: "Ignis Rounds (Bullets)", category: "Special Issue Ammo", compatibleClass: "Solid Projectile", ammoCategory: "Bullets", description: "Changes damage to Energy (E). Target Ag Test or set ablaze.", modifiers: "Dmg Type E, Ag Test vs Fire" },
  { name: "Penetrator Rounds (Bullets)", category: "Special Issue Ammo", compatibleClass: "Solid Projectile", ammoCategory: "Bullets", description: "Increases Pen by +5.", modifiers: "Pen +5" },
  { name: "Charge Pack", category: "Ammo", compatibleClass: "Las", ammoCategory: "Charge pack", description: "Standard energy cell.", modifiers: "-" },
  { name: "Exotic Rounds", category: "Ammo", compatibleClass: "Exotic", ammoCategory: "Exotic", description: "Specialized ammunition for exotic weapons.", modifiers: "Varies" },
  { name: "Razor-Web", category: "Special Issue Ammo", compatibleClass: "Exotic", ammoCategory: "Exotic", description: "-20 to escape. Escape attempts deal 2d10 R damage, Pen 8.", modifiers: "-20 Escape, 2d10 R Pen 8 on escape attempt" },
  { name: "Promethium Fuel", category: "Ammo", compatibleClass: "Flame", ammoCategory: "Fuel", description: "Standard fuel for flamer weapons.", modifiers: "-" },
  { name: "Needle Shards", category: "Ammo", compatibleClass: "Needle", ammoCategory: "Needle precipitator", description: "Crystalline toxins.", modifiers: "-" },
  { name: "Plasma Flask", category: "Ammo", compatibleClass: "Plasma", ammoCategory: "Plasma flask", description: "Hydrogen fuel flask.", modifiers: "-" },
  { name: "Standard Shells", category: "Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Standard shotgun shells.", modifiers: "-" },
  { name: "Breaching Rounds", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Changes damage to Explosive (X), Range reduced by half.", modifiers: "Dmg Type X, Range x0.5" },
  { name: "Ignis Rounds (Shells)", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Changes damage to Energy (E). Target Ag Test or set ablaze.", modifiers: "Dmg Type E, Ag Test vs Fire" },
  { name: "Penetrator Rounds (Shells)", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Increases Pen by +5. Loses Scatter.", modifiers: "Pen +5, No Scatter" },
  { name: "Shredder Rounds", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Increases Pen by +1, gains Tearing.", modifiers: "Pen +1, Tearing" },
  { name: "Slug Rounds", category: "Special Issue Ammo", compatibleClass: "Shotgun", ammoCategory: "Shells", description: "Loses Scatter. Gains Tearing and Felling (1).", modifiers: "No Scatter, Tearing, Felling (1)" },
];

export const WEAPON_ATTACHMENTS: { [key: string]: WeaponAttachment } = {
  "Arm Weapon Mounting": {
    name: "Arm Weapon Mounting",
    description: "This heavy bracing allows a single ranged weapon to be mounted along the arm, with specific hand movements or MIU input triggering the weapon. This allows the user to keep both hands free, and can have a strong visual impression as the Battle-Brother brings forth a storm of destruction with the sweep of his hand.",
    rule: "This upgrade reduces the weapon’s Range by 30%. It is also possible to mount a weapon at the shoulder instead of on the forearm, with the same effects.",
    compatibleClasses: ['Pistol', 'Basic'], // Assuming Aux Grenade Launcher is Basic or Pistol for now, or handled separately
    rangeModifier: 0.7
  },
  "Melee Attachment": {
    name: "Melee Attachment",
    description: "The value of a bayonet or similar combat attachment on a ranged weapon is unquestioned, giving the wielder versatility to deal with enemies close-up without having to change weapons. However, the common spear-like attachments made for normal human weapons would be an insult to both a Space Marine and his weapon. The Adeptus Astartes utilize fine, mono-edged blades and whirring chain attachments that are almost as effective in melee combat as a dedicated sword.",
    rule: "Melee attachments are available that allow the weapon to count as either a Combat Knife or a Chainsword in close combat, although in the latter case it lacks the Balanced Quality.",
    compatibleClasses: ['Basic'],
    compatibleAmmoTypes: []
  },
  "Deathwatch Suspensor": {
    name: "Deathwatch Suspensor",
    description: "Because a Deathwatch Kill-team is often deployed without support, the ultimate in battlefield flexibility is required. The anti-grav plates and studs of suspensors attach to a weapon or equipment, making it easier to use by offsetting some of the weight. Suspensors reduce the weight of a weapon by half, allowing Heavy weapons to be deployed in a wider range of situations.",
    rule: "When firing a weapon with suspensors, the operator counts as having the Auto-stabilised Trait—meaning he always counts as braced and may fire the weapon on semi or full-automatic as a Half Action and never suffers penalties for moving and firing.",
    compatibleClasses: ['Heavy'],
    compatibleAmmoTypes: []
  },
  "Fire Selector": {
    name: "Fire Selector",
    description: "A staple tool of the Deathwatch, a shot selector allows for speed and ease of switching between magazines of different ammunition, maximising tactical flexibility when deployed under uncertain parameters",
    rule: "A weapon with a fire selector can have up to three different clips added. At the start of the shooter’s Turn, he can use his fire selector to choose which clip he wishes to draw ammo from.",
    compatibleClasses: ['Pistol', 'Basic'],
    compatibleAmmoTypes: ['Bolt', 'Solid Projectile']
  },
  "Dipole Mag-Lock": {
    name: "Dipole Mag-Lock",
    description: "For warriors in power armour, mag-locks are as common as holsters for securing weapons. A dipole mag-lock can reverse its magnetic field to literally propel the weapon into the wielder’s hand.",
    rule: "Grants the Quick Draw Talent for the upgraded weapon. If the character already has Quick Draw, he may draw his weapon as part of a Parry.",
    compatibleClasses: ['Pistol', 'Basic', 'Melee'],
    compatibleAmmoTypes: []
  },
  "Motion Predictor": {
    name: "Motion Predictor",
    description: "A complex target-tracking cogitator in this device activates once the user has sighted the desired target. The Predictor then tracks the target, and when the trigger is pulled chases the target with all the rounds in a clip in one long burst.",
    rule: "Motion Predictor adds a +10 bonus to Ballistic Skill Tests but only functions when the weapon is fired on semi-automatic or fully automatic mode. Must be installed as a sight.",
    compatibleClasses: ['Pistol', 'Basic', 'Heavy'],
    compatibleAmmoTypes: [],
    slot: 'Sight'
  },
  "Preysense Sight": {
    name: "Preysense Sight",
    description: "This is a weapon sight that shows thermal images and reveals the hiding places of enemies who lurk in the darkness.",
    rule: "A character using a preysense sight suffers no penalties due to darkness and gains a +20 bonus to vision based Perception Tests at night.",
    compatibleClasses: ['Basic'],
    compatibleAmmoTypes: ['Las', 'Solid Projectile', 'Bolt', 'Plasma'],
    slot: 'Sight'
  },
  "Red-dot Laser Sight": {
    name: "Red-dot Laser Sight",
    description: "Mounted on astartes weapon to further improve the accuracy. The red light is the symbol of impending doom for heretics and xenos.",
    rule: "This is a laser sight that grants a +10 bonus to Ballistic Skill Tests when the weapon is fired on single shot.",
    compatibleClasses: ['Pistol', 'Basic'],
    compatibleAmmoTypes: ['Las', 'Solid Projectile', 'Bolt', 'Plasma'],
    slot: 'Sight'
  },
  "Silencer": {
    name: "Silencer",
    description: "Silencers lower the noise from a weapon’s discharge, preventing detection of the shot.",
    rule: "Awareness Tests to hear shots made with a silenced weapon suffer an additional –20 penalty and can only be attempted at half the normal distance.",
    compatibleClasses: ['Pistol', 'Basic'],
    compatibleAmmoTypes: ['Autogun', 'Autopistol', 'Needle Sniper Rifle']
  },
  "Telescopic Sight": {
    name: "Telescopic Sight",
    description: "Telescopic sights magnify the target’s image, making it easy to see. This is especially useful for long-range shots that need to hit a very specific target location.",
    rule: "A weapon with a telescopic sight ignores penalties for long and extreme range as long as the shooter takes a Full Action to Aim.",
    compatibleClasses: ['Basic'],
    compatibleAmmoTypes: ['Las', 'Solid Projectile', 'Bolt', 'Plasma'],
    slot: 'Sight'
  },
  "Tripod": {
    name: "Tripod",
    description: "When suspensors are not available, the tactically inferior but widely-available mode of bracing a heavy weapon is still quite viable: a tripod.",
    rule: "The three-legged stand provides a simple, stable platform for bracing a weapon on any relatively flat surface. However, the tripod requires remaining in a stationary position and fixes the weapon in a 180-degree arc of fire.",
    compatibleClasses: ['Heavy'],
    compatibleAmmoTypes: []
  },
  "Vox-operated": {
    name: "Vox-operated",
    description: "This upgrade integrates specifically-coded vox receivers into the weapon’s trigger mechanisms, so that the user can operate it by voice if needed.",
    rule: "Users can also operate the shot selector and switch firing modes if applicable merely by speaking the appropriate command. For security reasons each receiver is usually keyed to just one voice pattern. Additionally, if the weapon is equipped with a fire selector, the clip may also be selected simply by speaking aloud.",
    compatibleClasses: ['Pistol', 'Basic', 'Heavy', 'Grenade'],
    compatibleAmmoTypes: []
  }
};

export interface Explosive extends BaseWeapon {
  range: string;
  quantity: { current: number; max: number };
}

export interface ArmorAbility {
  name: string;
  description: string;
}

export interface ChapterTrapping {
  name: string;
  chapter: string;
  description: string;
  rule: string;
  options?: { 
    name: string; 
    rule: string;
    associatedCharacteristicModifier?: { characteristic: keyof Characteristics; value: number };
  }[];
  associatedWeapon?: Omit<MeleeWeapon, 'id'>;
  associatedTalent?: string;
}

export interface TrappingSelection {
  name: string;
  selectedOption?: string;
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
  trappings: TrappingSelection[]; // Selected trappings with options
  craftsmanship?: "Common" | "Exceptional" | "Master-Crafted";
}

export interface WargearItem {
  id: string;
  name: string;
  description: string;
  summary?: string;
  notes?: string;
  quantity?: { current: number; max: number };
  craftsmanship?: "Common" | "Exceptional" | "Master-Crafted";
  modifiers?: {
    traits?: string[];
    talents?: string[];
    skills?: Skill[]; // Or partial skill updates
    characteristics?: Partial<Characteristics>;
  };
}

export interface BattleTrauma {
  name: string;
  summary: string;
  description: string;
}

export interface AmmunitionInventory {
  name: string;
  count: number; // Number of magazines
  remainingRounds: number; // Rounds in the current magazine or loose rounds
}

export interface Cybernetic {
  name: string;
  summary?: string;
  description: string;
  location: string;
  toughnessBonus?: number;
  quality?: 'Common' | 'Exceptional' | 'Master-Crafted';
  modifiers?: {
    characteristics?: Partial<Characteristics>;
    skills?: Skill[];
    traits?: string[];
    talents?: string[];
  };
}

export interface CharacterData {
  name: string;
  chapter: string;
  specialization: string;
  advancedSpeciality: string;
  blackShieldChoices?: {
    attackPattern: string;
    attackPatternName: string;
    defensiveStance: string;
    defensiveStanceName: string;
    soloModeAbility: string;
    soloModeAbilityName: string;
  };
  hasCruxTerminatus: boolean;
  hasIronHalo: boolean;
  captainAbility?: string;
  veteranAbility?: string;
  isSquadMode: boolean;
  sagaTokens?: number;
  rank: number;
  renown: number; 
  xpTotal: number;
  xpSpent: number;
  wounds: { current: number; max: number };
  cohesion: { current: number; max: number };
  criticalWounds: number;
  fatigue: number;
  fate: { current: number; max: number };
  insanity: number;
  corruption: number;
  battleTraumas: string[]; // List of names
  cybernetics: Cybernetic[]; // New field
  ammunition: AmmunitionInventory[]; // List of owned ammo types
  additionalWargear: WargearItem[];
  characteristics: Characteristics;
  skills: Skill[];
  talents: string[];
  traits: string[];
  abilities: string[];
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
  activeSaga?: string;
  squadModeAbilities: {
    defensive: string[];
    attack: string[];
  };
  psychicRating?: number;
  psychicPowers?: string[];
  advancementHistory?: { type: string, name: string, cost: number }[];
  activeIconOfDutyEffect?: string;
}

export const STANDARD_WARGEAR = {
  weapons: {
    melee: [
      { id: 'sm_knife', name: "Astartes Combat Knife", damage: "1d10 R", pen: 2, special: "-" }
    ],
    ranged: [
      { id: 'sm_bolt_pistol', name: "Astartes Bolt Pistol", class: "Pistol" as const, range: "30m", rof: "S/2/-", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 14, max: 14 }, reload: "Full", ammoType: "Standard Bolt Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
    ],
    explosives: [
      { id: 'sm_frag', name: "Astartes Frag Grenade", range: "SBx3m", damage: "2d10+2 X", pen: 0, special: "Blast (4)", quantity: { current: 3, max: 3 } },
      { id: 'sm_krak', name: "Astartes Krak Grenade", range: "SBx3m", damage: "3d10+4 X", pen: 6, special: "-", quantity: { current: 3, max: 3 } }
    ]
  },
  additionalWargear: [
    { id: 'sm_repair_cement', name: "Repair Cement", description: "Used to repair damaged armor or equipment." }
  ]
};

export const SPECIALIZATION_GEAR: { [key: string]: { weapons?: { melee?: MeleeWeapon[], ranged?: RangedWeapon[], explosives?: Explosive[] }, additionalWargear?: WargearItem[], cybernetics?: string[] } } = {
  "Tactical Marine": {
    weapons: {
      ranged: [
        { id: 'tm_bolter', name: "Astartes Bolter with Fire Selector", class: "Basic" as const, range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    }
  },
  "Assault Marine": {
    weapons: {
      melee: [
        { id: 'am_chainsword', name: "Astartes Chainsword", damage: "1d10+3 R", pen: 3, special: "Balanced, Tearing" }
      ]
    },
    additionalWargear: [
      { id: 'am_jump_pack', name: "Jump Pack", description: "Allows for powered flight and jump actions." }
    ]
  },
  "Devastator Marine": {
    weapons: {
      ranged: [
        { id: 'dm_heavy_bolter', name: "Heavy Bolter", class: "Heavy" as const, range: "150m", rof: "-/-/6", damage: "1d10+12 X", pen: 5, special: "Tearing", clip: { current: 60, max: 60 }, reload: "Full", ammoType: "Standard Bolt Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    },
    additionalWargear: [
      { id: 'dm_backpack_ammo', name: "Backpack Ammo Supply", description: "Carries a large amount of ammunition for the heavy weapon." }
    ]
  },
  "Librarian": {
    weapons: {
      melee: [],
      ranged: [
        { id: 'tm_bolter', name: "Astartes Bolter", class: "Basic" as const, range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds", attachments: ["Fire Selector"], ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    }
  },
  "Deathwatch Epistolary": {
    weapons: {
      melee: [
        { id: 'de_force_weapon', name: "Force Weapon", damage: "1d10+2 R", pen: 2, special: "Balanced, Force" }
      ]
    },
    additionalWargear: [
      { id: 'de_psychic_hood', name: "Psychic Hood", description: "Provides a +5 bonus to Focus Power Tests and allows the user to nullify psychic powers." }
    ]
  },
  "Deathwatch Champion": {
    weapons: {
      melee: [
        { id: 'dc_power_sword', name: "Astartes Power Sword", damage: "1d10+6 E", pen: 6, special: "Power Field, Balanced" }
      ]
    },
    additionalWargear: [
      { id: 'dc_combat_shield', name: "Astartes Combat Shield", description: "Provides a Field Rating of 35 (overload 01-10) and +1 AP to the arm it is worn on." }
    ]
  },
  "Deathwatch Chaplain": {
    weapons: {
      melee: [
        { id: 'dch_crozius', name: "Crozius Arcanum", damage: "1d10+7 E", pen: 7, special: "Power Field, Balanced" }
      ]
    },
    additionalWargear: [
      { id: 'dch_skull_helm', name: "Skull Helm", description: "Proclaims rank and instills fear." },
      { id: 'dch_rosarius', name: "Rosarius", description: "Provides a Field Rating of 50 (overload 01-10)." }
    ]
  },
  "Apothecary": {
    weapons: {
      ranged: [
        { id: 'tm_bolter', name: "Astartes Bolter", class: "Basic" as const, range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds", attachments: ["Fire Selector"], ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    },
    additionalWargear: [
      { id: 'ap_narthecium', name: "Narthecium", description: "Medical gauntlet for treating wounds." },
      { id: 'ap_reductor', name: "Reductor", description: "Tool for extracting gene-seed." }
    ]
  },
  "Techmarine": {
    weapons: {
      melee: [
        { id: 'tm_omnissian_axe', name: "Omnissian Axe", damage: "2d10+4 E", pen: 6, special: "Power Field, Unbalanced" }
      ],
      ranged: [
        { id: 'tm_bolter', name: "Astartes Bolter with Fire Selector", class: "Basic" as const, range: "100m", rof: "S/2/4", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 28, max: 28 }, reload: "Full", ammoType: "Standard Bolt Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    },
    additionalWargear: [],
    cybernetics: ["Servo-Arm"]
  },
  "Deathwatch Forge Master": {
    weapons: {
      melee: [
        { id: 'dfm_power_axe', name: "Astartes Power Axe", damage: "1d10+7 E", pen: 7, special: "Power Field, Unbalanced" }
      ]
    },
    additionalWargear: [],
    cybernetics: ["Servo-Harness"]
  },
  "Deathwatch Keeper": {
    weapons: {
      melee: []
    },
    additionalWargear: [
      { id: 'dk_clavis', name: "Clavis", description: "A specialized tool used to bypass security systems and open ancient locks." }
    ]
  },
  "Ravenwing Veteran": {
    additionalWargear: [
      { id: 'rv_deathwatch_bike', name: "Deathwatch Bike", description: "A Space Marine Bike fitted with a Teleport Homer as standard issue wargear." }
    ]
  },
  "Deathwing Terminator": {
    additionalWargear: []
  },
  "Wolf Scout": {
    weapons: {
      ranged: [
        { id: 'ws_stalker_pistol', name: "Stalker pattern Silenced Bolt Pistol", class: "Pistol" as const, range: "30m", rof: "S/2/-", damage: "1d10+9 X", pen: 4, special: "Tearing", clip: { current: 14, max: 14 }, reload: "Full", ammoType: "Stalker Rounds", ammoClass: "Bolt", ammoCategory: "Bolt shells" as AmmoCategory }
      ]
    }
  },
  "Wolf Priest": {
    weapons: {
      melee: [
        { id: 'wp_crozius', name: "Crozius Arcanum", damage: "1d10+7 E", pen: 7, special: "Power Field, Balanced" }
      ]
    },
    additionalWargear: [
      { id: 'wp_skull_helm', name: "Wolf Skull Helm", description: "Proclaims rank and instills fear." },
      { id: 'wp_wolf_amulet', name: "Wolf Amulet", description: "Provides a Field Rating of 50 (overload 01-10)." },
      { id: 'wp_fang_of_morkai', name: "Fang of Morkai", description: "A specialized tool used by Wolf Priests." }
    ]
  },
  "Tyrannic War Veteran": {
    additionalWargear: [
      { id: 'twv_hellfire', name: "Hellfire Rounds (1 clip)", description: "Mutagenic acid. Ignores Natural Armor. RF on 9-10. Gains Tearing." }
    ]
  },
  "Ultramarines Honour Guard": {
    additionalWargear: [
      { id: 'uhg_master_crafted_upgrade', name: "Master-Crafted Weapon Upgrade", description: "May replace any one existing weapon with a Master-Crafted version of the same weapon." }
    ]
  }
};

export interface Talent {
  name: string;
  requirements: string;
  benefit: string;
}

export const ALL_TALENTS: Talent[] = [
  { name: "Abhor the Witch", requirements: "Adeptus Astartes", benefit: "Spend Fate Point before a mission to gain resistance to Psychic Powers." },
  { name: "Air of Authority", requirements: "Fel 30", benefit: "Affect more targets with Test." },
  { name: "Ambidextrous", requirements: "Ag 30", benefit: "Use either hand equally well." },
  { name: "Armour-Monger", requirements: "Techmarine", benefit: "Increase the efficacy of physical armour." },
  { name: "Artificer", requirements: "Salamanders", benefit: "Select a single item of standard issue or Signature Wargear. It is upgraded to Exceptional craftsmanship, or Master-Crafted if already Exceptional." },
  { name: "Assassin Strike", requirements: "Ag 40, Acrobatic", benefit: "On a successful Acrobatics Test after making a melee attack, character may move as a Free Action." },
  { name: "Astartes Weapon Training", requirements: "-", benefit: "-" },
  { name: "Astartes Weapon Specialisation", requirements: "-", benefit: "-" },
  { name: "Autosanguine", requirements: "—", benefit: "Heal 2 damage/day, always Lightly Damaged." },
  { name: "Basic Weapon Training", requirements: "—", benefit: "Use weapon group without penalty." },
  { name: "Bastion of Iron Will", requirements: "Psy Rating, Strong-Minded, WP 40", benefit: "Double Defensive Psy Rating for Opposed Tests." },
  { name: "Battle Rage", requirements: "Frenzy", benefit: "Parry while frenzied." },
  { name: "Berserk Charge", requirements: "—", benefit: "Gain +20 bonus when charging." },
  { name: "Binary Chatter", requirements: "—", benefit: "+10 bonus to control servitors." },
  { name: "Blademaster", requirements: "WS 30, Melee Weapon Training (any)", benefit: "Re-roll missed attack, once per Round." },
  { name: "Blind Fighting", requirements: "Per 30", benefit: "Suffer half the usual penalties when vision is obscured." },
  { name: "Bolter Drill", requirements: "Adeptus Astartes Weapon Training", benefit: "Get an extra shot when firing a bolt weapon on full or semi-auto." },
  { name: "Born In The Saddle", requirements: "White Scars", benefit: "No penalty for vehicle size when Dodging on a Bike. May turn 180 degrees by increasing Drive Test difficulty." },
  { name: "Bulging Biceps", requirements: "S 45", benefit: "Remove bracing requirement for certain weapons." },
  { name: "Call to Vengeance", requirements: "Adeptus Astartes, Fel 40", benefit: "Spend Full Action when a Battle-Brother is taken out of action to regain full Cohesion." },
  { name: "Catfall", requirements: "Ag 30", benefit: "Reduce falling damage." },
  { name: "Chem Geld", requirements: "—", benefit: "Immune to seduction, resistant to charm." },
  { name: "Chosen Representative", requirements: "Deathwatch Keeper, Fel 50, Peer", benefit: "The Battle-Brother gains +10 to all Fellowship Tests when dealing with Imperial Authorities and can spend a Fate point to gain the instant and total support of a local Imperial organisation or individual" },
  { name: "Cleanse and Purify", requirements: "Basic Weapons (Flame)", benefit: "Increases the effect of your flamer attacks." },
  { name: "Combat Formation", requirements: "Int 40", benefit: "Use Int Bonus for Initiative." },
  { name: "Combat Master", requirements: "WS 30", benefit: "Opponents get no bonus for outnumbering the character." },
  { name: "Combat Sense", requirements: "Per 40", benefit: "Use Per Bonus instead of Ag Bonus for Initiative." },
  { name: "Concealed Cavity", requirements: "—", benefit: "Character has a secret compartment on his person." },
  { name: "Counter Attack", requirements: "WS 40", benefit: "Gain free attack with successful Parry." },
  { name: "Crack Shot", requirements: "BS 40", benefit: "Deal +2 Critical Damage with ranged weapon." },
  { name: "Crippling Strike", requirements: "WS 50", benefit: "Deal +4 Critical Damage with melee weapon." },
  { name: "Crushing Blow", requirements: "S 40", benefit: "Deal +2 Damage with melee weapons." },
  { name: "Deadeye Shot", requirements: "BS 30", benefit: "Called Shots are at –10 penalty." },
  { name: "Death From Above", requirements: "Adeptus Astartes, Pilot (Personal)", benefit: "Cause greater damage when charging or dropping into combat using a jump pack." },
  { name: "Deathwatch Training", requirements: "Adeptus Astartes, member of the Deathwatch", benefit: "The Space Marine gains bonuses when fighting aliens." },
  { name: "Deathwing Assault", requirements: "Deathwing Terminator", benefit: "Against an enemy who is Surprised or Unaware, the Battle-Brother’s attacks gain the Proven (3) quality." },
  { name: "Deflect Shot", requirements: "Ag 50", benefit: "Character can parry primitive ranged attacks." },
  { name: "Detestation", requirements: "Hatred (any), Sword Brother", benefit: "Deal extra damage against hated enemies." },
  { name: "Die Hard", requirements: "WP 40", benefit: "Re-roll death chance incurred by blood loss." },
  { name: "Disarm", requirements: "Ag 30", benefit: "Force opponent to drop weapon." },
  { name: "Disturbing Voice", requirements: "—", benefit: "+10 bonus to Intimidate and Interrogation, –10 penalty to Fel." },
  { name: "Double Team", requirements: "—", benefit: "Gain additional +10 bonus for ganging up." },
  { name: "Dual Shot", requirements: "Ag 40, Two-Weapon Wielder", benefit: "One Ballistic Skill Test hits target twice." },
  { name: "Dual Strike", requirements: "Ag 40, Two-Weapon Wielder", benefit: "One Weapon Skill Test hits target twice." },
  { name: "Duty Unto Death", requirements: "WP 45", benefit: "Ignores the effects of injury, Fatigue, and Stunning during combat." },
  { name: "Electrical Succour", requirements: "Techmarine or Mechanicus Implants", benefit: "+10 bonus to T Tests to remove Fatigue." },
  { name: "Electro Graft Use", requirements: "—", benefit: "+10 bonus to Inquiry, Tech Use, Common Knowledge." },
  { name: "Enemy", requirements: "—", benefit: "An organisation or group particularly despises the character." },
  { name: "Energy Cache", requirements: "Techmarine or Mechanicus Implants", benefit: "Luminen Blast, Charge and Shock don’t cause Fatigue." },
  { name: "Enhanced Bionic Frame", requirements: "Machinator Array", benefit: "The character gains the Auto-stabilised Trait." },
  { name: "Eye of Vengeance", requirements: "Astartes Weapons Training, BS 50", benefit: "Fire a single shot to penetrate armour and increase the chance of Righteous Fury." },
  { name: "Exemplar of Honour", requirements: "Adeptus Astartes", benefit: "Exchange a Fate Point for a point of Cohesion." },
  { name: "Exotic Weapon Training", requirements: "—", benefit: "Gain proficiency with an exotic weapon type." },
  { name: "Favoured by the Warp", requirements: "WP 35", benefit: "Roll twice for Psychic Phenomena (see page 187) and take better result." },
  { name: "Fearless", requirements: "—", benefit: "Immune to Fear and Pinning." },
  { name: "Feedback Screech", requirements: "Techmarine or Mechanicus Implants", benefit: "30m radius, Test WP or lose Half Action." },
  { name: "Icon of Duty", requirements: "Deathwatch Chaplain", benefit: "Spend a Fate Point to gain Hardened Will, Fearsome Assault, or Extreme Prejudice for the encounter." },
  { name: "Ferric Lure", requirements: "Techmarine or Mechanicus Implants", benefit: "WP Test to call 1kg/WP Bonus of metal objects." },
  { name: "Ferric Summons", requirements: "Techmarine or Mechanicus Implants, Ferric Lure", benefit: "WP Test to call 2kg/WP Bonus of metal objects." },
  { name: "Flame Weapon Training", requirements: "—", benefit: "Gain proficiency with a group of flame weapons." },
  { name: "Flesh Render", requirements: "Adeptus Astartes", benefit: "Cause additional damage with chain weapons." },
  { name: "Foresight", requirements: "Int 30", benefit: "Contemplate to gain +10 bonus on next Test." },
  { name: "Frenzy", requirements: "—", benefit: "Enter psychotic rage to gain combat bonuses." },
  { name: "Furious Assault", requirements: "WS 35", benefit: "On a successful WS Test, gain a free second attack." },
  { name: "Good Reputation", requirements: "Fel 50, Peer", benefit: "The character has a good reputation amongst a certain group." },
  { name: "Gun Blessing", requirements: "Techmarine or Mechanicus Implants", benefit: "Un-jam Int Bonus guns in 10m radius." },
  { name: "Guerilla Training", requirements: "Raven Guard", benefit: "The Battle-Brother does not take the penalties to Silent Move and Concealment normally inflicted by power armour." },
  { name: "Gunslinger", requirements: "BS 40, Two-Weapon Wielder", benefit: "Fighting with two pistols incurs only –10 penalty." },
  { name: "Hammer Blow", requirements: "Adeptus Astartes", benefit: "Make a thunderous single strike with a melee weapon." },
  { name: "Hard Target", requirements: "Ag 40", benefit: "Opponents take –20 to BS Tests when character charges or runs." },
  { name: "Hardy", requirements: "T 40", benefit: "You always heal as if Lightly Damaged." },
  { name: "Hatred", requirements: "—", benefit: "Gain +10 bonus to attack hated creatures." },
  { name: "Heavy Weapon Training", requirements: "—", benefit: "Gain proficiency with a heavy weapon group." },
  { name: "Heightened Senses", requirements: "—", benefit: "Gain +10 bonus to particular sense." },
  { name: "Hip Shooting", requirements: "BS 40, Ag 40", benefit: "Gain a free attack while moving." },
  { name: "Honour or Death", requirements: "Ultramarines Honour Guard", benefit: "Once per combat, gain a benefit when attacking an Elite or Master in melee." },
  { name: "Hunter of Aliens", requirements: "—", benefit: "Gain an advantage in combating aliens." },
  { name: "Improved Warp Sense", requirements: "Warp Sense", benefit: "Allows Psyniscience Test as Free Action." },
  { name: "Independent Targeting", requirements: "BS 40", benefit: "Fire at two or more targets further than 10m apart." },
  { name: "Infused Knowledge", requirements: "Int 40", benefit: "Treat Common and Scholastic Lore as Basic Skills." },
  { name: "Inspire Wrath", requirements: "Fel 30", benefit: "Inspire crowds to anger." },
  { name: "Into the Jaws of Hell", requirements: "Iron Discipline", benefit: "Minions gain immunity to Pinning and Fear whilst in character’s presence." },
  { name: "Iron Discipline", requirements: "WP 30, Command", benefit: "Minions can re-roll Fear and Pinning Tests." },
  { name: "Iron Jaw", requirements: "T 40", benefit: "Test Toughness to overcome Stunning." },
  { name: "Jaded", requirements: "WP 30", benefit: "Never gain IP from ordinary horrors." },
  { name: "Killing Strike", requirements: "Adeptus Astartes", benefit: "Spend a Fate Point to make your melee attack impossible to parry or dodge." },
  { name: "Last Man Standing", requirements: "Nerves of Steel", benefit: "Immune to Pinning by Pistols and Basic Weapons. Improves Cover." },
  { name: "Leap Up", requirements: "Ag 30", benefit: "Stand up as a Free Action." },
  { name: "Light Sleeper", requirements: "Per 30", benefit: "Count as awake, even when asleep." },
  { name: "Lightning Attack", requirements: "Swift Attack", benefit: "Attack three times with a Full Action." },
  { name: "Lightning Reflexes", requirements: "—", benefit: "Add twice Ag Bonus to Initiative rolls." },
  { name: "Litany of Hate", requirements: "Hatred", benefit: "Extend benefits of Hatred to allies." },
  { name: "Logis Implant", requirements: "—", benefit: "+10 bonus on WS and BS on successful Tech-Use Test." },
  { name: "Luminen Blast", requirements: "Techmarine or Mechanicus Implants", benefit: "1d10+WP Bonus Energy Damage bolt. Causes Fatigue." },
  { name: "Luminen Charge", requirements: "Techmarine or Mechanicus Implants", benefit: "T Test to power/charge tech. Causes Fatigue." },
  { name: "Luminen Shock", requirements: "Techmarine or Mechanicus Implants", benefit: "1d10+3 Energy Damage shock. Causes Fatigue." },
  { name: "Machinator Array", requirements: "Techmarine or Mechanicus Implants", benefit: "The character has advanced Mechanicus augmetics." },
  { name: "Maglev Grace", requirements: "Techmarine or Mechanicus Implants", benefit: "Hover 1d10+TB minutes once per day." },
  { name: "Maglev Transcendence", requirements: "Techmarine or Mechanicus Implants, Maglev Grace", benefit: "Hover 2d10+TB minutes twice per day." },
  { name: "Marksman", requirements: "BS 35", benefit: "No penalties for firing at long or extreme range." },
  { name: "Master Chirurgeon", requirements: "Medicae", benefit: "+10 Perform advanced medical procedures." },
  { name: "Master Enginseer", requirements: "Tech Use +10, Mechanicus or Techmarine or Mechanicus Implants", benefit: "Use a Fate Point for automatic success." },
  { name: "Master Orator", requirements: "Fel 30", benefit: "Affect 10 times the normal numbers with a Fellowship Test." },
  { name: "Mechadendrite Use", requirements: "Techmarine or Mechanicus Implants", benefit: "The character can use a type of Mechadendrite." },
  { name: "Meditation", requirements: "—", benefit: "The character may enter a trance to remove Fatigue." },
  { name: "Mental Fortitude", requirements: "Ravenwing Veteran", benefit: "The Battle-Brother gains a +20 bonus on all Tests to resist gaining Corruption or Insanity Points, and on all Tests to resist any mind-influencing effects (including but not limited to psychic powers) that would subvert, cloud, alter, or control his mind." },
  { name: "Melee Weapon Training", requirements: "—", benefit: "Gain proficiency with a group of melee weapons." },
  { name: "Mental Rage", requirements: "Frenzy", benefit: "The character may use Psychic Powers while in the throes of frenzy." },
  { name: "Mighty Shot", requirements: "BS 40", benefit: "Deal +2 Damage with ranged attacks." },
  { name: "Mimic", requirements: "—", benefit: "The character can copy voices." },
  { name: "Nerves of Steel", requirements: "—", benefit: "Re-roll failed tests to avoid pinning." },
  { name: "Orthoproxy", requirements: "—", benefit: "+20 bonus to resist mind control or interrogation." },
  { name: "Paranoia", requirements: "—", benefit: "The character is alert for danger." },
  { name: "Patient Hunter", requirements: "Wolf Scout", benefit: "The Battle-Brother may treat the Shadowing and Silent Move Skills as if they were Perception-based Skills. This means that they will, for example, benefit from the Wolf Senses Solo Mode Ability. The effects of this talent do not apply if the Battle-Brother is wearing Terminator Armour." },
  { name: "Peer", requirements: "Fel 30", benefit: "Gain +10 bonus on Fel Tests to interact with organisation." },
  { name: "Pistol Weapon Training", requirements: "—", benefit: "Gain proficiency with a group of pistol weapons." },
  { name: "Polyglot", requirements: "Int 30, Fel 30", benefit: "The character has an innate ability with languages." },
  { name: "Precise Blow", requirements: "WS 40, Sure Strike", benefit: "No penalty for attacks against specific locations." },
  { name: "Preternatural Speed", requirements: "WS 40, Ag 50", benefit: "Use Swift and Lightning Attack as a Half Action and when charging." },
  { name: "Prosanguine", requirements: "—", benefit: "Heal 1d5 Damage once per day." },
  { name: "Psy Rating", requirements: "Librarian", benefit: "Become a more powerful Psyker, rated 1 –10." },
  { name: "Quick Draw", requirements: "—", benefit: "Ready as a Free Action." },
  { name: "Rapid Reaction", requirements: "Ag 40", benefit: "Test Ag to negate surprise." },
  { name: "Rapid Reload", requirements: "—", benefit: "Reduce reload time." },
  { name: "Resistance", requirements: "—", benefit: "Gain +10 bonus to Resistance Tests." },
  { name: "Rite of Awe", requirements: "Techmarine or Mechanicus Implants", benefit: "50m radius, –10 to all Tests due to Fear." },
  { name: "Rite of Fear", requirements: "Techmarine or Mechanicus Implants", benefit: "Fear Rating 1 for two minutes in a 50m radius." },
  { name: "Rite of Pure Thought", requirements: "Techmarine or Mechanicus Implants", benefit: "The character is immune to emotion." },
  { name: "Rite of Sanctioning", requirements: "Psy Rating", benefit: "Reduces Psychic Phenomenon." },
  { name: "Rival", requirements: "—", benefit: "A group or organisation bears the character animosity." },
  { name: "Scourge of Heretics", requirements: "—", benefit: "Gain an advantage when battling traitors and heretics." },
  { name: "Servo-harness Integration", requirements: "Techmarine Implants, Mechadendrite Use (Servo-arm)", benefit: "Gain the ability to use a Servo-harness." },
  { name: "Sharpshooter", requirements: "BS 40, Deadeye Shot", benefit: "No penalties for called shots." },
  { name: "Siegecraft", requirements: "Imperial Fists", benefit: "Improve Armour Points of a piece of cover by Int Bonus." },
  { name: "Sound Constitution", requirements: "—", benefit: "Gain an additional Wound." },
  { name: "Signature Wargear", requirements: "-", benefit: "One item up to 20 Requisition becomes standard issue." },
  { name: "Signature Wargear (Master)", requirements: "Signature Wargear", benefit: "One item up to 40 Requisition becomes standard issue and gain an additional benefit." },
  { name: "Signature Wargear (Hero)", requirements: "Signature Wargear (Master)", benefit: "One item up to 70 Requisition becomes standard issue." },
  { name: "Slayer of Daemons", requirements: "—", benefit: "Gain an advantage when fighting warp entities." },
  { name: "Sprint", requirements: "—", benefit: "Move more quickly in combat." },
  { name: "Stalwart Defence", requirements: "Adeptus Astartes", benefit: "Hold a chosen point with indomitable determination and a storm of fire." },
  { name: "Step Aside", requirements: "Ag 40, Dodge", benefit: "Gain extra Dodge in a Round." },
  { name: "Street Fighting", requirements: "—", benefit: "Deal +2 Critical Damage with knives or unarmed attacks." },
  { name: "Storm of Iron", requirements: "Adeptus Astartes", benefit: "Cause additional Damage against Hordes with ranged weapons." },
  { name: "Speaker of the Dead", requirements: "Wolf Priest", benefit: "While in Squad Mode, all of those in Support Range of the Wolf Priest add +10 to all Tests made with any Skill which the Wolf Priest is trained in. Additionally, the Wolf Priest may spend a Fate Point on behalf of any other member of the Kill-Team within Support Range, granting one of the normal benefits of spending a Fate Point to that character." },
  { name: "Strong Minded", requirements: "WP 30, Resistance (Psychic)", benefit: "Re-roll failed WP Tests made to resist Psychic Powers." },
  { name: "Sudden Attack", requirements: "Wolf Scout", benefit: "When attacking a Horde which is unaware of his presence, using ranged weapons or placed explosives, the Battle-Brother deals an additional 1d10 damage to the Horde’s Magnitude, and the Horde must make a Hard (–20) Pinning Test or become Pinned." },
  { name: "Sure Strike", requirements: "WS 30", benefit: "Choose location on a successful attack." },
  { name: "Survivor", requirements: "First Company Veteran", benefit: "Spend Fate Point to pass Toughness Test to avoid death/injury. +10 vs Toxic." },
  { name: "Swift Attack", requirements: "WS 35", benefit: "Attack twice with a Full Action." },
  { name: "Takedown", requirements: "—", benefit: "Make a special attack to Stun opponent." },
  { name: "Target Selection", requirements: "BS 50", benefit: "Shoot into melee without penalty." },
  { name: "Technical Knock", requirements: "Int 30", benefit: "Un-jam a gun as Half Action." },
  { name: "The Flesh is Weak", requirements: "—", benefit: "Replace parts of the body with iron and machine." },
  { name: "The Leader of the Pack", requirements: "Wolf Guard", benefit: "Gain bonuses when killing elite/master enemies and grant movement/attacks to allies." },
  { name: "Thrown Weapon Training", requirements: "—", benefit: "Gain proficiency with a group of thrown weapons." },
  { name: "Thunder Charge", requirements: "Adeptus Astartes", benefit: "Break enemies with the momentum of an armoured charge." },
  { name: "Total Recall", requirements: "Int 30", benefit: "The character can remember trivial facts and minor details." },
  { name: "True Grit", requirements: "T 40", benefit: "Reduce Critical Damage the character takes." },
  { name: "Two-Weapon Wielder", requirements: "WS 35 or BS 35, Ag 35", benefit: "Attack twice when wielding two weapons." },
  { name: "Tyrannic War Stratagem", requirements: "Tyrannic War Veteran", benefit: "Gain a +10 bonus on all command Tests that relate specifically to combating the Tyranids, and gains a single Stratagem." },
  { name: "Unarmed Master", requirements: "WS 45, Ag 40, Unarmed Warrior", benefit: "Attacks do 1d10+SB Damage and lack the Primitive trait." },
  { name: "Unarmed Warrior", requirements: "WS 35, Ag 35", benefit: "Deal 1d10 –3+SB with unarmed attacks." },
  { name: "Unbowed and Unbroken", requirements: "Adeptus Astartes, Fel 40", benefit: "Perform an act of defiance to remove Cohesion Damage suffered in previous turn." },
  { name: "Unshakeable Faith", requirements: "—", benefit: "The character may re-roll failed Fear Tests." },
  { name: "Wall of Steel", requirements: "Ag 35", benefit: "Gain extra Parry each Round." },
  { name: "Commanding Presence", requirements: "Deathwatch Captain", benefit: "Use Strength for Fellowship tests if higher. Never suffer more than -20 to Fellowship tests." },
  { name: "Warp Affinity", requirements: "Psy Rating", benefit: "Re-roll Psychic Phenomenon." },
  { name: "Warp Conduit", requirements: "Psy Rating, Strong Minded, WP 50", benefit: "+1 to Psy Rating when pushing." },
  { name: "Warp Sense", requirements: "Psy Rating, Psyniscience Skill, Per 30+", benefit: "Allows Psyniscience Test as Half Action." },
  { name: "Web of Peers", requirements: "Deathwatch Kill-Marine", benefit: "Roll 1d10 when meeting an NPC; if <= Fel Bonus, gain +10 on Fellowship Tests with them." },
  { name: "Weapon-Tech", requirements: "Techmarine", benefit: "Increase the efficacy of weapons wielded by the Techmarine or Mechanicus Implants." },
  { name: "Wisdom of the Ancients", requirements: "Adeptus Astartes, Int 40", benefit: "Spend a Fate Point to get insight on a situation." },
  { name: "Whirlwind of Death", requirements: "Adeptus Astartes", benefit: "Cause additional Damage against hordes in melee." }
];

export const ALL_SKILLS = [
  { name: "Acrobatics", characteristic: "Ag" },
  { name: "Awareness", characteristic: "Per" },
  { name: "Barter", characteristic: "Fel" },
  { name: "Charm", characteristic: "Fel" },
  { name: "Chem-Use", characteristic: "Int" },
  { name: "Command", characteristic: "Fel" },
  { name: "Common Lore (Adeptus Arbites)", characteristic: "Int" },
  { name: "Common Lore (Adeptus Astartes)", characteristic: "Int" },
  { name: "Common Lore (Adeptus Mechanicus)", characteristic: "Int" },
  { name: "Common Lore (Administratum)", characteristic: "Int" },
  { name: "Common Lore (Deathwatch)", characteristic: "Int" },
  { name: "Common Lore (Ecclesiarchy)", characteristic: "Int" },
  { name: "Common Lore (Imperial Creed)", characteristic: "Int" },
  { name: "Common Lore (Imperial Guard)", characteristic: "Int" },
  { name: "Common Lore (Imperial Navy)", characteristic: "Int" },
  { name: "Common Lore (Imperium)", characteristic: "Int" },
  { name: "Common Lore (Jericho Reach)", characteristic: "Int" },
  { name: "Common Lore (Tech)", characteristic: "Int" },
  { name: "Common Lore (War)", characteristic: "Int" },
  { name: "Deceive", characteristic: "Fel" },
  { name: "Disguise", characteristic: "Fel" },
  { name: "Dodge", characteristic: "Ag" },
  { name: "Evaluate", characteristic: "Int" },
  { name: "Forbidden Lore (Adeptus Astartes)", characteristic: "Int" },
  { name: "Forbidden Lore (Adeptus Mechanicus)", characteristic: "Int" },
  { name: "Forbidden Lore (Archeotech)", characteristic: "Int" },
  { name: "Forbidden Lore (the Black Library)", characteristic: "Int" },
  { name: "Forbidden Lore (Daemonology)", characteristic: "Int" },
  { name: "Forbidden Lore (Heresy)", characteristic: "Int" },
  { name: "Forbidden Lore (the Inquisition)", characteristic: "Int" },
  { name: "Forbidden Lore (Mutants)", characteristic: "Int" },
  { name: "Forbidden Lore (Psykers)", characteristic: "Int" },
  { name: "Forbidden Lore (the Traitor Legions)", characteristic: "Int" },
  { name: "Forbidden Lore (the Warp)", characteristic: "Int" },
  { name: "Forbidden Lore (Xenos)", characteristic: "Int" },
  { name: "Inquiry", characteristic: "Fel" },
  { name: "Interrogation", characteristic: "WP" },
  { name: "Intimidate", characteristic: "S" },
  { name: "Invocation", characteristic: "WP" },
  { name: "Literacy", characteristic: "Int" },
  { name: "Logic", characteristic: "Int" },
  { name: "Medicae", characteristic: "Int" },
  { name: "Navigation (Stellar)", characteristic: "Int" },
  { name: "Navigation (Surface)", characteristic: "Int" },
  { name: "Pilot (Flyers)", characteristic: "Ag" },
  { name: "Pilot (Ground Vehicle)", characteristic: "Ag" },
  { name: "Pilot (Personal)", characteristic: "Ag" },
  { name: "Pilot (Skimmer/Hover)", characteristic: "Ag" },
  { name: "Pilot (Space Craft)", characteristic: "Ag" },
  { name: "Pilot (Walker)", characteristic: "Ag" },
  { name: "Psyniscience", characteristic: "Per" },
  { name: "Scholastic Lore (Archaic)", characteristic: "Int" },
  { name: "Scholastic Lore (Astromancy)", characteristic: "Int" },
  { name: "Scholastic Lore (Beasts)", characteristic: "Int" },
  { name: "Scholastic Lore (Bureaucracy)", characteristic: "Int" },
  { name: "Scholastic Lore (Chymistry)", characteristic: "Int" },
  { name: "Scholastic Lore (Codex Astartes)", characteristic: "Int" },
  { name: "Scholastic Lore (Cryptology)", characteristic: "Int" },
  { name: "Scholastic Lore (Heraldry)", characteristic: "Int" },
  { name: "Scholastic Lore (Imperial Creed)", characteristic: "Int" },
  { name: "Scholastic Lore (Judgement)", characteristic: "Int" },
  { name: "Scholastic Lore (Legend)", characteristic: "Int" },
  { name: "Scholastic Lore (Numerology)", characteristic: "Int" },
  { name: "Scholastic Lore (Occult)", characteristic: "Int" },
  { name: "Scholastic Lore (Philosophy)", characteristic: "Int" },
  { name: "Scholastic Lore (Tactica Imperialis)", characteristic: "Int" },
  { name: "Scrutiny", characteristic: "Per" },
  { name: "Shadowing", characteristic: "Ag" },
  { name: "Speak Language (Eldar)", characteristic: "Int" },
  { name: "Speak Language (High Gothic)", characteristic: "Int" },
  { name: "Speak Language (Kroot)", characteristic: "Int" },
  { name: "Speak Language (Low Gothic)", characteristic: "Int" },
  { name: "Speak Language (Ork)", characteristic: "Int" },
  { name: "Speak Language (Tau)", characteristic: "Int" },
  { name: "Speak Language (Techna-Lingua)", characteristic: "Int" },
  { name: "Survival", characteristic: "Int" },
  { name: "Swim", characteristic: "S" },
  { name: "Tech-Use", characteristic: "Int" },
  { name: "Tracking", characteristic: "Int" },
  { name: "Trade (Archaeologist)", characteristic: "Int" },
  { name: "Trade (Armourer)", characteristic: "Ag" },
  { name: "Trade (Astrographer)", characteristic: "Ag" },
  { name: "Trade (Chymist)", characteristic: "Int" },
  { name: "Trade (Cryptographer)", characteristic: "Int" },
  { name: "Trade (Explorator)", characteristic: "Int" },
  { name: "Trade (Forge Master)", characteristic: "Int" },
  { name: "Trade (Linguist)", characteristic: "Int" },
  { name: "Trade (Remembrancer)", characteristic: "Int" },
  { name: "Trade (Shipwright)", characteristic: "Int" },
  { name: "Trade (Soothsayer)", characteristic: "Fel" },
  { name: "Trade (Technomat)", characteristic: "Int" },
  { name: "Trade (Trader)", characteristic: "Fel" },
  { name: "Wrangling", characteristic: "Int" }
];

export const INITIAL_CHARACTER: CharacterData = {
  name: "Brother Alaric",
  chapter: "Awaiting chapter assignment",
  specialization: "Awaiting astartes specialization",
  advancedSpeciality: "None",
  blackShieldChoices: {
    attackPattern: "",
    attackPatternName: "",
    defensiveStance: "",
    defensiveStanceName: "",
    soloModeAbility: "",
    soloModeAbilityName: ""
  },
  hasCruxTerminatus: false,
  hasIronHalo: false,
  captainAbility: "",
  veteranAbility: "",
  isSquadMode: false,
  sagaTokens: 0,
  rank: 1,
  renown: 1,
  xpTotal: 13000,
  xpSpent: 12500,
  wounds: { current: 21, max: 21 },
  cohesion: { current: 0, max: 0 },
  criticalWounds: 0,
  fatigue: 0,
  fate: { current: 3, max: 3 },
  insanity: 0,
  corruption: 0,
  battleTraumas: [],
  cybernetics: [],
  ammunition: [{ name: "Standard Bolt Rounds", count: 3, remainingRounds: 28 }],
  additionalWargear: [...STANDARD_WARGEAR.additionalWargear],
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
    { name: "Acrobatics", characteristic: "Ag", mastery: 0, description: `Acrobatics training supplements the character’s natural agility in attempting types of movement the less athletic would not even consider. Leaping between the spires of an Imperial cathedral, jumping over the heads of shorter foes and falling with grace all become possible. The difficulty of the test depends on the difficulty of the feat involved: dodging around the legs of an enraged Ork and leaping from stone to stone in a swirling magma flow would both present significant challenges. The more degrees of success obtained, the more stylish or dramatic the end result.

Skill Use: Full Action unless otherwise noted

Special uses
Disengage
When taking the Disengage Action in combat (see page 239), the character may make a Challenging (+0) Acrobatics Test to reduce it to a Half Action.

Jump And Leap
An Acrobatics Test may substitute for an Agility Test when jumping or a Strength Test when leaping, according to the appropriate rules on page 207.` },
    { name: "Awareness", characteristic: "Per", mastery: 1, description: `Awareness encompasses the character’s subconscious ability to react to things his conscious mind may not perceive. He can use this Skill to notice threats—such as ambushes, traps or cleverly hidden objects—or slight changes in the environment—such as a faint vibration of a far off Ork Squiggoth or the foul smell of a Daemonhost. When using Awareness against an opponent, the test is always opposed. This use includes noticing ambushes, spotting traps, and other things involving another’s actions. However, noticing environmental factors is a standard test. This use includes perceiving trace scents, motion, or similar things.

Skill Use: Free Action made in reaction to something.` },
    { name: "Barter", characteristic: "Fel", mastery: 1, description: `While the Adeptus Astartes seldom rely on trade in their duties, this skill can prove useful when dealing with civilian authorities, rogue traders, or the countless markets and supply chains that sustain the Emperor’s domains. The space marine can use barter to trade or haggle for better prices or negotiate favors from potential allies.` },
    { name: "Charm", characteristic: "Fel", mastery: 1, description: `The character can use Charm Skill to improve the disposition of others towards him, making a Charm Test whenever he wishes to change the minds of an individual or small group. The character need not make a Charm Test each time he speaks with others in a pleasant manner, but only when he wishes to change their opinion or disposition, or convince them to do something. All Charm Tests are opposed by Willpower and can affect a number of targets equal to the character’s Fellowship Bonus. The targets must be able to see and hear the character clearly, and share a common language.

Special uses
Inspire
Those in a position of authority can use the Charm Skill to inspire a group-related test, either with positive or negative reinforcement. Success provides a +10 bonus to the next Characteristic Test of the motivated group, such as passing a Willpower Test to resist Fear or recover from Pinning. Thus, a Battle-Brother might inspire lesser Imperial troopers to fight harder, or the Kill-team’s Brother-Chaplain might rouse his brothers with an impassioned prayer to the Emperor.` },
    { name: "Chem-Use", characteristic: "Int", mastery: 0, description: `The Chem-Use Skill allows the character to safely identify, handle, and prepare a variety of chemicals, toxins, poisons, and drugs. While Chem-Use covers the use and basic combination of these substances, the Trade (Chymist) Skill deals with their manufacture from base components.
Success in a Chem-Use Test, modified by the appropriate difficulty for the chemical or drug in question, indicates it has been administered, combined, or otherwise applied correctly, providing the desired results. Failure on the test indicates the dose was wasted without effect. See Chapter V: Armoury for more information on drugs, chemicals, and their effects.

Skill Use: Full Action; when using a medicae injector or narthecium, the Skill Test to administer a drug or antidote is reduced to a Half Action. Employing Chem-Use to apply particularly complex combinations of substances or toxins requires an Extended Test of duration and difficulty set by the GM for the treatment in question.` },
    { name: "Command", characteristic: "Fel", mastery: 1, description: `The character uses the Command Skill to both direct those under his authority and establish actions for groups to execute on command, such as launching an assault or ordering a regroup. This Skill is only effective upon those under the character’s authority. A successful Command Test indicates that those whom he directs follow his instructions in a timely manner. Failure on the Skill Test when used on an individual simply means that he does not follow the character’s directions, though additional Degrees of Failure can indicate that the underling accepts the task with no intention of actually doing it, or that he misinterprets the command or takes contradictory actions. For directing groups, Degrees of Success or Failure increase or decrease the time necessary to execute the orders, with three or more Degrees of Failure subjecting them to confused inaction. A Command Test can affect a number of targets equal to the character’s Fellowship Bonus. The targets must be able to see and hear the character—though this could be done remotely through a vox or pict-caster—and speak a common language.

Skill Use: Half Action for simple commands, Full Action for more involved direction

Special uses
Extend Support Range
As a Half Action the Battle-Brother nominated as the squad’s leader (see page 238) may extend his Kill-team’s Support Range (see page 213) by a number of metres equal to his Fellowship Bonus. For this Skill to work the Battle-Brother must be either within visual or vocal range of his Kill-team. This extension lasts until the start of the Battle-Brother’s next turn.` },
    { name: "Common Lore (Adeptus Arbites)", characteristic: "Int", mastery: 0, description: "Knowledge of the various arms and sub-sects of the Adeptus Arbites, including such things as rank structure, common procedures, and the basic tenets of Imperial justice." },
    { name: "Common Lore (Adeptus Astartes)", characteristic: "Int", mastery: 1, description: "An understanding of the role, function, and nature of the famed Imperial Space Marines, as well as a knowledge of the commonly known Chapters and their practices and areas of operation." },
    { name: "Common Lore (Adeptus Mechanicus)", characteristic: "Int", mastery: 0, description: "A general understanding of the symbols and practices of the Adeptus Mechanicus as well as their hierarchy, identifiable ranks, and the existence of the Sixteen Universal Laws." },
    { name: "Common Lore (Administratum)", characteristic: "Int", mastery: 0, description: "Broad knowledge of the labyrinthine workings, rules, traditions, and dictates of the Adeptus Administratum." },
    { name: "Common Lore (Deathwatch)", characteristic: "Int", mastery: 1, description: "Knowledge of the function and organisation of the Deathwatch, including its primary mandates and favoured practices." },
    { name: "Common Lore (Ecclesiarchy)", characteristic: "Int", mastery: 0, description: "Understanding of the structure of the Adeptus Ministorum and its role in the worship of the God-Emperor as divine, its organisation, greetings, and general practices." },
    { name: "Common Lore (Imperial Creed)", characteristic: "Int", mastery: 0, description: "Knowledge of the rites and practices of the Imperial Cult, the most common observances, festivals, and holidays in honour of the Emperor, and the most well-known saints." },
    { name: "Common Lore (Imperial Guard)", characteristic: "Int", mastery: 0, description: "Basic information about the ranking system, logistics, structure, and basic tactical and strategic practices of the Imperial Guard, as well as particularly famed regiments." },
    { name: "Common Lore (Imperial Navy)", characteristic: "Int", mastery: 0, description: "Basic information about the ranks, customs, uniforms, and particular traditions of the Imperial Navy, as well as famous admirals and ships." },
    { name: "Common Lore (Imperium)", characteristic: "Int", mastery: 1, description: "Knowledge of the segmentums, sectors, and most well-known worlds of the Imperium." },
    { name: "Common Lore (Jericho Reach)", characteristic: "Int", mastery: 0, description: "Information concerning the general astrography of the Reach, including known worlds, recorded inhabitants, and theatres of conflict." },
    { name: "Common Lore (Tech)", characteristic: "Int", mastery: 0, description: "An understanding of simple litanies and rituals to soothe and appease machine spirits." },
    { name: "Common Lore (War)", characteristic: "Int", mastery: 1, description: "Knowledge of great battles, notable and notorious commanders, heroes, and famous stratagems employed by the Imperium in its many campaigns." },
    { name: "Deceive", characteristic: "Fel", mastery: 1, description: `The Deceive Skill enables the character to mislead others as to his true intent. Any time he tells a lie, reveals only part of the truth, or spins information to his advantage with the intent to mislead someone, the character makes a Deceive Test. He need not make a Deceive Test every time he tells a lie, but only when that deception would change someone’s mind, opinion, or actions. Deceive is always an Opposed Test, using the character’s Deceive Skill against his opponent’s Scrutiny. A Deceive Test affects a number of targets equal to the character’s Fellowship Bonus. They must be able to see and hear the character clearly, either in person or via vox or pict-caster. They must also speak a common language.
Skill Use: 1 minute, or more for complex deceptions` },
    { name: "Disguise", characteristic: "Fel", mastery: 1, description: `Disguise is the skill used to alter one’s appearance to pass as another person or blend into a different group. It involves using clothing, makeup, posture, and behavior to avoid recognition and deceive observers during infiltration or covert operations.` },
    { name: "Dodge", characteristic: "Ag", mastery: 1, description: `Use the Dodge skill as a Reaction to nullify a successful handto-hand or ranged attack. Success on the Skill Test means the attack has been avoided and deals no damage. See Chapter VIII: Combat for more information on Dodge.
Skill Use: Reaction` },
    { name: "Forbidden Lore (Adeptus Astartes)", characteristic: "Int", mastery: 0, description: "Extensive knowledge of the practices, organisation, and homeworlds of the Imperial Space Marines and their Chapters, including hints and rumours of their myriad of secret rituals and methods of recruitment and training." },
    { name: "Forbidden Lore (Adeptus Mechanicus)", characteristic: "Int", mastery: 0, description: "An in-depth understanding of followers of the Machine God, including such things as their rituals, observances, common beliefs, core philosophies, and specific knowledge of the Universal Laws." },
    { name: "Forbidden Lore (Archeotech)", characteristic: "Int", mastery: 0, description: "Knowledge of the great, lost tech devices of past times and clues to their mysterious functions and purposes." },
    { name: "Forbidden Lore (the Black Library)", characteristic: "Int", mastery: 0, description: "Secret knowledge concerning the Black Library, its forbidden contents, horrific guardians, and the unspeakable xenos that toil within its confines." },
    { name: "Forbidden Lore (Daemonology)", characteristic: "Int", mastery: 0, description: "The crawling information about some of the most infamous warp entities and their twisted physical manifestations." },
    { name: "Forbidden Lore (Heresy)", characteristic: "Int", mastery: 0, description: "Wisdom concerning acts and practices deemed heretical by the Imperium, the most contemptible heretics of history, and their acts." },
    { name: "Forbidden Lore (the Inquisition)", characteristic: "Int", mastery: 0, description: "An understanding of the secretive organisation of the Imperium, its common tenets, and famous Inquisitors." },
    { name: "Forbidden Lore (Mutants)", characteristic: "Int", mastery: 0, description: "The study of stable and unstable mutations within humanity, their cancerous development over time, and some of the studies and books on the topic." },
    { name: "Forbidden Lore (Psykers)", characteristic: "Int", mastery: 0, description: "Skill in identifying psykers, the physical effects of their powers, the danger they cause, and the general extent of their capabilities." },
    { name: "Forbidden Lore (the Traitor Legions)", characteristic: "Int", mastery: 0, description: "The secrets of the lost Space Marine Legions, their names, and the sad tale of their fall from grace." },
    { name: "Forbidden Lore (the Warp)", characteristic: "Int", mastery: 0, description: "An understanding of the energy of the warp, its interaction and interrelation with realspace, and how its tides and eddies affect travel between the stars." },
    { name: "Forbidden Lore (Xenos)", characteristic: "Int", mastery: 1, description: "Knowledge of the minor and major alien species known to the Imperium, the threat they pose, and their general appearance." },
    { name: "Inquiry", characteristic: "Fel", mastery: 1, description: `The character can use the Inquiry Skill to gain information by asking questions, making conversation, or simple eavesdropping. Inquiry allows the character to pick up general information about an area: its news, recent events, and more. Additional Degrees of Success reveal more detailed or more secretive tidings. Inquiry can also be used as an Investigation Skill, allowing the character to hunt after a particular item of information from either individuals or resources, such as the Chapter’s librarium. This use is virtually always an Extended Test, with difficulty and duration set by the GM.
Skill Use: 1 hour or more` },
    { name: "Interrogation", characteristic: "WP", mastery: 0, description: `The Interrogation skill allows the character to extract information from an unwilling subject. The application differs from torture, where a subject will frequently say anything to stop the ordeal. Rather, interrogation represents skilled application of psychology, various devices, serums, and other techniques. The GM may modify the difficulty of the test according to the availability of tools, facilities, and other conditions. Interrogation is always an Opposed Test, pitting the character’s Interrogation Skill against an opponent’s Willpower. If the interrogator wins the Opposed Test, he gets one answer plus one answer for each Degree of Success. If the victim wins the Opposed Test, the interrogator get nothing of worth. Two or more Degrees of Failure inflict 1d10 plus the interrogator’s Willpower Bonus in damage against the victim and prevents any further interrogation for 1d5 days. If the interrogator suffers four or more Degrees of Failure, the victim takes the same damage and gains a +30 bonus to Willpower Tests made to resist Interrogation at the hands of the interrogator or his allies. Each Interrogation Test inflicts one level of Fatigue on the target.
Skill Use: 1d5 hours` },
    { name: "Intimidate", characteristic: "S", mastery: 1, description: `The character uses Intimidate Tests to pressure individuals to give in to his demands. The character does not make an Intimidate Test every time he makes a threat, but only when it involves coercion. Though Intimidate lists Strength as its associated Characteristic, the character may substitute either Intelligence or Fellowship if the threat involves more subtle methods than brute force, such as blackmail or humiliation. An Intimidate Test affects a number of targets equal to the character’s Strength, Intelligence, or Fellowship Bonus, depending on the characteristic used for the test. The targets must be able to see and hear the character clearly, either in person or via pict or vox-caster, and speak a common language.
Skill Use: Full Action
Special uses
War Cry
As part of a Charge Action a character may use the Intimidate skill to make a war cry. This is a Free Action that targets the recipient or recipients of the character’s charge—i.e. those he will end up in combat with and make melee attacks against. The character then makes an Intimidate Test, based on Strength, opposed by the target’s Willpower. If the character is successful, the target suffers –10 to all Parry and Dodge tests against the charging character.
Creatures immune to the effects of Fear and other mindeffecting psychology are immune to the effects of a war cry.

Distract (Deathwatch Champion Only)
As a Half Action, a Deathwatch Champion may make an Opposed Intimidation vs. Willpower Test against a single enemy within line of sight. If the Champion wins, the target must spend its next turn either moving towards the Champion or attacking him. In addition, the target suffers a –10 penalty to all ranged attacks made against the Champion. This effect lasts for a number of rounds equal to the Champion’s Fellowship Bonus. A Champion may only use this ability once per combat against a given foe, and it has no effect on Daemons or creatures immune to Fear.` },
    { name: "Invocation", characteristic: "Int", mastery: 0, description: `An Invocation test is a Full Action. For the duration of the Round, the character clears his mind of external influence and focuses his will more intently. This may be through recitation of mantras, use of psychic foci, or meditation. A successful test indicates that the character’s mind is ready to channel a greater amount of the warp than usual, while still limiting his exposure. On the next Round, the character adds +1 to the final Psy Rating of any Fettered Power Test.
Failure on the Invocation Test indicates that the character’s attempts to focus have backfired, and he must take a –1 penalty to the final Psy Rating of a Fettered Power Test. If this reduces the Psy Rating to zero, the power fails to activate.
Skill Use: Full Action` },
    { name: "Literacy", characteristic: "Int", mastery: 1, description: `The Literacy skill allows the character to read and write any language he speaks. Everyday activities do not require Literacy Tests, but situations involving regional variations, damaged manuscripts, archaic usage, or colloquial phrases necessitate a Skill Test.
Skill Use: 1 minute for 1 page of text, roughly 750 words` },
    { name: "Logic", characteristic: "Int", mastery: 1, description: `The character uses Logic to solve problems, decipher puzzles, and deal with other situations involving demonstration and inference. A Logic Test might infer the missing symbol in a series or solve a particularly troublesome mathematical equation. The character can also use the Skill to prepare a reasoned argument for debate or philosophical exchange. The preparations of complex reasoning or complicated problems are Extended Tests.
Skill Use: 1 minute, or longer for particularly complex problems` },
    { name: "Medicae", characteristic: "Int", mastery: 0, description: `The Medicae Skill helps diagnose and treat injuries by suturing wounds, applying counterseptic, and use of medical devices such as the narthecium. On individual patients, Medicae provides first aid and extended care, for short and long-term treatment. On larger groups of wounded, Medicae can help save the lives of those that can be saved and apply the Emperor’s grace to those who cannot, resulting in fewer overall deaths. It can also help diagnose widespread medical problems and apply the ounce of prevention before the pound of cure becomes necessary.
Skill Use: Full Action
Special uses
First Aid
The Medicae Skill performs first aid for the injured, removing a small amount of damage by suturing lacerations, bandaging abrasions, and plugging punctures. A successful Medicae Test removes Damage equal to the character’s Intelligence Bonus on lightly damaged characters, or 1 Damage from heavily or critically damaged characters. Performing First Aid is a full round action. First Aid may only be applied to each wound once and is a full round action by you and your patient. Extended Care
Using the Medicae Skill for extended care speeds the healing process. The character can properly treat a number of patients equal to his Intelligence Bonus. Each additional patient imposes a cumulative –10 penalty to Medicae Tests to provide extended care. For lightly damaged patients, make one test at the end of each day. For heavily or critically damaged patients, test once at the end of each week. Success allows each patient to remove twice the normal Damage—removing Critical Damage first—plus 1 additional Damage for each Degree of Success. Failure does not adversely affect the character’s patients, who heal at the normal rate. Two or three Degrees of Failure indicates that all lightly and heavily damaged patients take 1 Damage each, using sudden death to resolve any Critical Damage (see page 250). Four or more Degrees of Failure indicates all patients take 1d10 Damage, using sudden death to resolve Critical Damage.
For additional information on Healing, see Chapter VIII: Combat.
Diagnose
The Medicae Skill can also be used to diagnose disease and other ailments, both on one’s fellow characters and also on the crew at large. On individuals, a successful Skill Test yields the name of the ailment and basic treatments. When used on groups, a successful Skill Test prevents casualties to the Crew Population due to disease or malnutrition due to extended voyages.
Harvest Gene-Seed
As part of an Apothecary’s battlefield duties, he trains in the use of harvesting the gene-seeds of his fallen brothers. An Apothecary may use this Skill to extract the gene-seed from a fallen Space Marine with the use of a narthecium (See page 271 for details).` },
    { name: "Navigation (Stellar)", characteristic: "Int", mastery: 0, description: "The knowledge required to determine position and chart courses through space using star charts, celestial bodies, and void-navigation instruments." },
    { name: "Navigation (Surface)", characteristic: "Int", mastery: 1, description: "The ability to determine position and plot routes across planetary terrain using maps, landmarks, instruments, or environmental cues." },
    { name: "Pilot (Flyers)", characteristic: "Ag", mastery: 0 },
    { name: "Pilot (Ground Vehicle)", characteristic: "Ag", mastery: 1 },
    { name: "Pilot (Personal)", characteristic: "Ag", mastery: 0 },
    { name: "Pilot (Skimmer/Hover)", characteristic: "Ag", mastery: 0 },
    { name: "Pilot (Space Craft)", characteristic: "Ag", mastery: 0 },
    { name: "Pilot (Walker)", characteristic: "Ag", mastery: 0 },
    { name: "Psyniscience", characteristic: "Per", mastery: 0, description: `Those with the Psyniscience Skill sense the currents and eddies of the warp. The character can use the Skill to detect the presence or absence of daemons, and the use of psychic powers. The Skill also allows detection of psychic phenomena, disturbances, voids, or other areas where the flow of the immaterium has been unsettled or disrupted. The general results of Psyniscience Tests are summarised on Table 3–4: Psyniscience.
Skill Use: Full Action` },
    { name: "Scholastic Lore (Archaic)", characteristic: "Int", mastery: 0, description: "An understanding of the Imperium’s dark past, its proscribed eras, and how the long millennia have changed the face of mankind." },
    { name: "Scholastic Lore (Astromancy)", characteristic: "Int", mastery: 0, description: "A knowledge of stars, singularities, and the worlds around them, as well as theoretical understanding of how to use telescopes, astrolithic charts, and the like." },
    { name: "Scholastic Lore (Beasts)", characteristic: "Int", mastery: 0, description: "An understanding of the genus and families of animals and familiarity with the characteristics and appearance of many semi-sentient creatures." },
    { name: "Scholastic Lore (Bureaucracy)", characteristic: "Int", mastery: 0, description: "A familiarity with the rules and regulations involved with governments, particularly the Adeptus Administratum, and their many and varied departments, bureaus, and policies." },
    { name: "Scholastic Lore (Chymistry)", characteristic: "Int", mastery: 0, description: "A knowledge of chemicals, their alchemical applications in a number of uses, and their prevalence or scarcity throughout the Imperium." },
    { name: "Scholastic Lore (Codex Astartes)", characteristic: "Int", mastery: 1, description: "Understanding and interpreting the sacred Codex Astartes and how it relates to the organisation, deployment, and tactics of the Space Marine Chapters." },
    { name: "Scholastic Lore (Cryptology)", characteristic: "Int", mastery: 0, description: "An understanding of codes, ciphers, cryptographs, secret languages, and numerical keys. This may be used to either create or decipher encryptions." },
    { name: "Scholastic Lore (Heraldry)", characteristic: "Int", mastery: 0, description: "A grasp of the principles and devices of heraldry, as well as a knowledge of the most common seals and heraldic devices used by the Imperium’s most noble houses and families." },
    { name: "Scholastic Lore (Imperial Creed)", characteristic: "Int", mastery: 0, description: "An understanding of the specific rituals and practices of the Ecclesiarchy, from the traditional construction of their temples to specific points from its texts. This information may be used to conduct the rituals for others." },
    { name: "Scholastic Lore (Judgement)", characteristic: "Int", mastery: 0, description: "Knowledge of the proper punishments for the myriad of crimes and heresies punishable by Imperial law." },
    { name: "Scholastic Lore (Legend)", characteristic: "Int", mastery: 0, description: "Going beyond archaic knowledge, this encompasses the most secretive portions of Imperial history, such as the Dark Age of Technology, the Age of Strife, the Great Crusade, and the Horus Heresy." },
    { name: "Scholastic Lore (Numerology)", characteristic: "Int", mastery: 0, description: "An understanding of the mysterious link between numbers and the physical universe, from Catastrophe theory to the Sadleirian litany." },
    { name: "Scholastic Lore (Occult)", characteristic: "Int", mastery: 0, description: "An understanding of occult rituals, theories, and superstitions, as well as the better-known mystical uses of occult items." },
    { name: "Scholastic Lore (Philosophy)", characteristic: "Int", mastery: 0, description: "Knowledge concerning the theories of thought, belief, existence, and other intangibles. As it also includes logic and debate, it may be used for argument or creating philosophical works." },
    { name: "Scholastic Lore (Tactica Imperialis)", characteristic: "Int", mastery: 0, description: "The theories of the Tactica Imperialis, as well as other systems of war, troop deployment, and battle techniques used by the Imperium." },
    { name: "Scrutiny", characteristic: "Per", mastery: 0, description: `The Scrutiny Skill helps assess the people or objects encountered in the game. The character uses it to determine an individual’s truthfulness, his motives, personality, and temperament. It can also be used to examine an object in detail, noticing small details and characteristics that might pass unseen in a casual inspection. Scrutiny is an Opposed Test against the target’s Deceive when trying to perceive falsehoods, or some other deceptions. However, Scrutiny does not reveal hidden secrets or a target’s carefully concealed intent, and should never replace good roleplaying in an interactive situation. This skill counters the Opposed Tests of many manipulative Interaction skills, such as Charm, Deceive, and Intimidate.
Skill Use: Full Action though special uses may require more time` },
    { name: "Shadowing", characteristic: "Ag", mastery: 0, description: `Shadowing allows the character to follow others, either on foot, in vehicles, and even aboard shuttles and starships. It contrasts with Concealment because it involves movement and blending into one’s surroundings. On foot, it might involve using physical cover or the press of bodies in a crowd; in a vehicle, techniques might include false turns or using a nearby cargo hauler as cover; aboard ships, it can entail the use of asteroids or other stellar objects or busy space lanes around major systems. Shadowing Tests are always Opposed Tests against the opponent’s Awareness or Scrutiny Skill. A single Shadowing Test is sufficient to follow the opponent unseen for 1 minute.
Skill Use: 1 minute` },
    { name: "Silent Move", characteristic: "Ag", mastery: 1, description: `Use the Silent Move Skill any time silence and secrecy are essential in the character’s activities. The GM sets the difficulty of the test depending on the environment: the echoing steel halls of a space hulk yield a greater difficulty than the carpeted throne room of a planetary governor. Silent Move Tests are always Opposed Tests against the opponent’s Awareness or Scrutiny Skill.
Skill Use: Free Action as part of Movement` },
    { name: "Speak Language (Eldar)", characteristic: "Int", mastery: 0, description: "Though no human can hope to capture the subtle nuances and sub-tones of this extremely complex and ancient language, it is enough to make one’s meaning clear." },
    { name: "Speak Language (High Gothic)", characteristic: "Int", mastery: 1, description: "The official language of the Imperium, used by Imperial officials, nobility, members of the Ecclesiarchy, and those involved in high-level negotiations." },
    { name: "Speak Language (Kroot)", characteristic: "Int", mastery: 0, description: "The native chirping language of the Kroot is almost impossible for a human to emulate, however, with training and a good ear, it can be understood." },
    { name: "Speak Language (Low Gothic)", characteristic: "Int", mastery: 1, description: "The common tongue of the Imperium, used by the countless millions of ordinary citizens." },
    { name: "Speak Language (Ork)", characteristic: "Int", mastery: 0, description: "More grunts and physical violence than an actual language, it is possible for humans to speak and understand it, though it is doubtful they would be able to survive a conversation." },
    { name: "Speak Language (Tau)", characteristic: "Int", mastery: 0, description: "The language of the Tau Empire, spoken by the Tau themselves and shared by their multitude of alien subjects." },
    { name: "Speak Language (Techna-Lingua)", characteristic: "Int", mastery: 0, description: "The official language of the Adeptus Mechanicus, this binary language has been optimised for rapid communication of technical data and servitor commands." },
    { name: "Survival", characteristic: "Int", mastery: 0, description: `The Survival Skill allows the character to endure prolonged periods in unusual or alien environments. Space Marines do not die of exposure to the elements, and their implants allow them to survive on even the most inedible of flora and fauna. Thus, the Survival Skill most often applies to normal humans or those Space Marines who learned this skill before becoming an Initiate in their Chapter. A skilled outdoorsman, the character can find edible plants, hunt for game, and determine if food is safe for consumption. He can also construct viable shelters from native materials or improvised substances and ensure they’re located away from flood chutes or the territory of predators. The difficulty of these tests depends on the location: barren deserts provide much greater challenge than the verdant tropical forests. This skill can also apply to man-made environments, such as artificial worlds, the depths of the underhive, or the belly of massive starships. In this case, the Skill can provide safe resting areas away from plasma venting and knowledge about which sacred unguents also provide minimal nutrition.
Skill Use: Various` },
    { name: "Tech-Use", characteristic: "Int", mastery: 0, description: `Tech-Use allows the character to use or repair complex mechanical items or fathom the workings of unknown technical artefacts. Using a basic piece of equipment under typical circumstances requires no test, such as using a voxcaster or opening a shuttle hatch. Tech-Use Tests are necessary for unusual or unfamiliar gear, malfunctioning or broken items, and any situation where conditions are less than ideal, such as attempting to use the same vox-caster near a plasma core or coaxing the machine spirit of a strange vessel’s warp drive to reignite its fires. The character can also use Tech-Use to repair damaged or defective items, using an Extended Test of duration and difficulty set by the GM depending on the item’s complexity and the extent of the damage. Tech-Use does not include building an item from scratch, which requires the relevant Trade Skill. A Tech-Use Test to determine the function of a complex system takes 1 minute, but the GM may adjust this depending on the complexity. Tests made to repair items are Extended Tests, the duration of which depends upon its size and complexity.
Skill Use: 1 minute, or more for more complex systems` },
    { name: "Tracking", characteristic: "Int", mastery: 1, description: `With the Tracking Skill, the character can follow the signs left by his quarry, allowing him to hunt them down. Following obvious tracks does not require a Skill Test, and is considered part of a character’s movement. In instances where the time or elements have eroded the signs or where the very environment makes seeing them difficult, such as darkness or fog, Tracking Tests are required. The difficulty depends on the condition of the traces and the tracker’s surroundings. When following any tracks where the difficulty of the test is more than Challenging (+0), the tracker’s Movement rate drops to half. Cunning or devious quarry may attempt to conceal or erase their tracks. In any case where an opponent has attempted to do this, make an Opposed Test made against the prey’s Concealment.
Skill Use: Free Action made as part of Movement` },
    { name: "Trade (Archaeologist)", characteristic: "Int", mastery: 0, description: "Used to locate, examine and analyse ancient ruins and artefacts." },
    { name: "Trade (Armourer)", characteristic: "Ag", mastery: 0, description: "Used to design, upgrade and forge weaponry, from personal to starship sized." },
    { name: "Trade (Astrographer)", characteristic: "Ag", mastery: 0, description: "Used to create two and three-dimensional representations of stellar locations and warp routes." },
    { name: "Trade (Chymist)", characteristic: "Int", mastery: 0, description: "Used to create poisons, drugs, and a wide variety of other compounds." },
    { name: "Trade (Cryptographer)", characteristic: "Int", mastery: 0, description: "Used to create or decode ciphers, codes, and other puzzles." },
    { name: "Trade (Explorator)", characteristic: "Int", mastery: 0, description: "Used in the exploration of unknown stellar regions." },
    { name: "Trade (Forge Master)", characteristic: "Int", mastery: 0, description: "The Battle-Brother is adept at manufacturing weapons, armour and countless other tools of war. Given time and the right equipment (usually never found outside a Forge World or Chapter Fortress Monastery) he can create much of the basic gear used by the Adeptus Astartes and repair even its greatest machines of war. A player may use this skill in place of any Tech-use skill test if he is dealing with Astartes equipment." },
    { name: "Trade (Linguist)", characteristic: "Int", mastery: 0, description: "Used to learn or decipher new languages, both spoken and written." },
    { name: "Trade (Remembrancer)", characteristic: "Int", mastery: 0, description: "Used to recount events in a variety of art forms, from sculpture to poetry." },
    { name: "Trade (Shipwright)", characteristic: "Int", mastery: 0, description: "Used to design, upgrade, and create voidcapable vessels." },
    { name: "Trade (Soothsayer)", characteristic: "Fel", mastery: 0, description: "Used to foretell the future by a number of interpretive arts, though its effectiveness is suspect." },
    { name: "Trade (Technomat)", characteristic: "Int", mastery: 0, description: "Used to maintain and repair technological devices, but through rote memorisation rather than true understanding." },
    { name: "Trade (Trader)", characteristic: "Fel", mastery: 0 },
  ],
  talents: [
    "Ambidextrous",
    "Astartes Weapon Training",
    "Bulging Biceps",
    "Deathwatch Training",
    "Heightened Senses (Sight, Sound)",
    "Killing Strike",
    "Nerves of Steel",
    "Quick Draw",
    "Resistance (Psychic Powers)",
    "True Grit",
    "Unarmed Master",
    "Unarmed Warrior"
  ],
  traits: ["Unnatural Strength (x2)", "Unnatural Toughness (x2)"],
  abilities: [],
  weapons: {
    melee: [...STANDARD_WARGEAR.weapons.melee],
    ranged: [...STANDARD_WARGEAR.weapons.ranged],
    explosives: [...STANDARD_WARGEAR.weapons.explosives]
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
    trappings: [],
  },
  history: "Awaiting history assignment.",
  personalDemeanor: "Stoic",
  chapterDemeanor: "Awaiting chapter assignment",
  soloModeAbility: "Awaiting chapter assignment",
  squadModeAbilities: {
    defensive: [
      "Dig In",
      "Go To Ground",
      "Regroup",
      "Soak Fire",
      "Strongpoint",
      "Tactical Spacing",
      "Overwatch",
      "Stealth Advance"
    ],
    attack: [
      "Bolter Assault",
      "Fire for Effect",
      "Fire Support",
      "Furious Charge",
      "Squad Advance",
      "Tank Buster"
    ]
  },
  psychicRating: 0,
  psychicPowers: [],
  advancementHistory: [],
};
