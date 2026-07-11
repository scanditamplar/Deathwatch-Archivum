const fs = require('fs');

let constants = fs.readFileSync('constants.tsx', 'utf8');

// 1. Add Solo Mode "Zero Tolerance"
if (!constants.includes('"Zero Tolerance": {')) {
  const soloModeAddition = `
  "Zero Tolerance": {
    name: "Zero Tolerance",
    chapter: "Marines Errant",
    requiredRank: 1,
    effects: "The Marines Errant view any failure as a grievous flaw. While in Solo Mode, the Battle-Brother may re-roll any failed test when fighting against Daemons, Xenos or Heretics. He must accept the results of the second roll.",
    improvement: "At Rank 3, he gains a +10 to the re-roll. At Rank 5, he gains +20."
  },`;
  constants = constants.replace(
      /export const CHAPTER_SOLO_MODE_ABILITIES.*?\{/,
      "export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string } } = {" + soloModeAddition
  );
}

// 2. Add Squad Mode Defensive Stance
if (!constants.includes('name: "Preservation of Force",')) {
  const squadDefensiveAddition = `
  "Preservation of Force": {
    name: "Preservation of Force",
    chapter: "Marines Errant",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "The Marines Errant value their Battle-Brothers and wargear highly. The Battle-Brother and those in Support Range gain +2 to their Armour points on all locations.",
    improvement: "At Rank 4, the bonus increases to +4 Armour points."
  },`;
  constants = constants.replace(
      /export const CHAPTER_DEFENSIVE_STANCES.*?\{/,
      "export const CHAPTER_DEFENSIVE_STANCES: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {" + squadDefensiveAddition
  );
}

// 3. Add Squad Mode Attack Pattern
if (!constants.includes('name: "Void Strike",')) {
  const squadAttackAddition = `
  "Void Strike": {
    name: "Void Strike",
    chapter: "Marines Errant",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Coordinating fire to precisely eliminate targets without wasting ammunition. The Battle-Brother and those in Support Range gain +10 to Ballistic Skill tests and add +2 to the Penetration of their ranged weapons.",
    improvement: "At Rank 4, the bonus to Ballistic Skill increases to +20."
  },`;
  constants = constants.replace(
      /export const CHAPTER_ATTACK_PATTERNS.*?\{/,
      "export const CHAPTER_ATTACK_PATTERNS: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {" + squadAttackAddition
  );
}

// 4. Add Chapter Trapping
if (!constants.includes('name: "Covenant of the Void"')) {
  const trappingAddition = `
  {
    name: "Covenant of the Void",
    chapter: "Marines Errant",
    description: "A small vial of void-water or script of void-born treaties. The wearer may re-roll failed Dodge or Parry tests once per encounter."
  },`;
  constants = constants.replace(
      /export const CHAPTER_TRAPPINGS = \[/,
      "export const CHAPTER_TRAPPINGS = [" + trappingAddition
  );
}

// 5. Add Relic
if (!constants.includes('name: "Errant Vow"')) {
  const relicAddition = `
  {
    name: "Errant's Vow",
    chapter: "Marines Errant",
    description: "An ancient power sword carried by the chapter's champions through the void. It hums with contained void-energy.",
    rules: "Errant's Vow is a Master-Crafted Power Sword. When used, the wielder gains a +10 to Parry tests and inflicts +2 Damage against Xenos."
  },`;
  constants = constants.replace(
      /export const RELIC_WARGEAR = \[/,
      "export const RELIC_WARGEAR = [" + relicAddition
  );
}

// 6. Add Psychic Powers
if (!constants.includes('category: "Marines Errant powers"')) {
  const psychicPowersAddition = `
  {
    name: "Void Rift",
    category: "Marines Errant powers",
    action: "Half",
    opposed: "No",
    range: "20 metres x PR",
    sustained: "No",
    description: "The Librarian tears a temporary fissure into the void, unleashing the cold of the vacuum onto enemies. Targets in a 5 metre radius suffer 1d10 Energy Damage x PR with Pen 4, and must pass a Toughness Test or be Stunned for 1 round."
  },
  {
    name: "Astral Guidance",
    category: "Marines Errant powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Calling upon the navigation of the void, the Librarian guides his allies' strikes. The Librarian and allies within Support Range gain a bonus to Ballistic Skill tests equal to 5 x PR."
  },`;
  constants = constants.replace(
      /export const LIBRARIAN_PSYCHIC_POWERS = \[/,
      "export const LIBRARIAN_PSYCHIC_POWERS = [" + psychicPowersAddition
  );
}

fs.writeFileSync('constants.tsx', constants);
console.log('Added Marines Errant abilities, relic, trapping, and psychic powers.');
