const fs = require('fs');
let data = fs.readFileSync('constants.tsx', 'utf8');

// 1. Add to CHAPTERS
data = data.replace(
  /"Marines Errant"/,
  '"Marines Errant", "Crimson Fists"'
);

// 2. Add to CHAPTER_NAMES
const crimsonFistsNames = `
  "Crimson Fists": {
    first: ["Pedro", "Alessio", "Cortez", "Kantor", "Jarl", "Demetrius", "Rafael", "Manoel", "Juan"],
    last: ["Dorn", "Kantor", "Cortez", "Alvez", "Gomez", "Perez", "Ruiz", "Galan"]
  },`;
data = data.replace(
  /export const CHAPTER_NAMES: Record<string, \{ first: string\[\], last: string\[\] \}> = \{/,
  "export const CHAPTER_NAMES: Record<string, { first: string[], last: string[] }> = {" + crimsonFistsNames
);

// 3. Add to CHAPTER_DATA
const crimsonFistsData = `
  "Crimson Fists": {
    modifiers: { WP: 10 },
    talents: ["Hunter of Aliens"],
    soloAbility: "Ork Slayer",
    restrictions: [],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Favoured of the Deathwatch",
    demeanorSummary: "A great pride for their place in the Deathwatch and a great responsibility to live up to.",
    demeanorDescription: "For centuries the Crimson Fists have waged the Emperor’s wars against the alien, fighting in all corners of the galaxy against a vast myriad of xenos. However, none have suffered as much under the blades and bolts of the Chapter as the Orks... The result is that Crimson Fists have both a great pride for their place in the Deathwatch and a great responsibility to live up to. This can sometimes grate with their Kill-team as others consider them aloof and entitled, as if the right to wear the silvered should pad of the Deathwatch was always their due and not something to be earned only through glory and death.",
    summary: "Stubborn and valourous Ork slayers with a glorious history.",
    curseName: "Only Honour in Death",
    curseLevels: {
      1: { name: "No Retreat", summary: "Refuses to retreat (Challenging WP test to disengage).", full: "As the odds mount so does the Battle-Brother’s stubborn refusal to retreat... When the Battle-Brother wishes to retreat from a combat he must pass a Challenging (+0) Willpower Test to do so. If he fails he may not Test again until either he or one of his brothers is wounded." },
      2: { name: "Suffer not Defeat", summary: "Must attack most dangerous foe if takes >10 Dmg or ally falls.", full: "If the Battle-Brother suffers more than 10 points of Damage (after reduction for armour or Toughness) or if one of the members of his Kill-team is incapacitated or killed, he will renew the vigour of his attacks... In this circumstance he must attack, seeking out the most able or dangerous of his foes. In his following turn, he is allowed to make a Challenging (+0) Willpower Test to retreat or change his tactics." },
      3: { name: "Unto Death", summary: "Gladly accepts suicidal tasks and fights regardless of wounds.", full: "Once the Battle-Brother suffers Critical Damage, he gains a fatalistic desire to sell his life for the cause... He will fight on regardless of his wounds and continue to attack or place himself in the path of attacks... He will also gladly accept suicidal or near suicidal tasks without complaint." }
    }
  },`;
data = data.replace(
  /export const CHAPTER_DATA: \{ \[key: string\]: ChapterDetails \} = \{/,
  "export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {" + crimsonFistsData
);

// 4. Add to CHAPTER_SOLO_MODE_ABILITIES
const soloMode = `
  "Ork Slayer": {
    name: "Ork Slayer",
    requiredRank: 1,
    chapter: "Crimson Fists",
    effects: "When combating Orks, the Battle-Brother knows just where to target the creatures to cause the maximum amount of Damage. Damage inflicted by the Battle-Brother on an Ork from either a ranged or melee weapon is only reduced by half of the creature's Toughness Bonus—rounded up. Armour still reduces Damage as normal.",
    improvement: "At Rank 5 the Battle-Brother also becomes adept at picking out weak points in an Ork’s armour. The Battle-Brother increases the Pen of any ranged or melee attack against an Ork by 4."
  },`;
data = data.replace(
  /export const CHAPTER_SOLO_MODE_ABILITIES: \{ \[key: string\]: \{ name: string, requiredRank: number, effects: string, improvement: string, chapter\?: string \} \} = \{/,
  "export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string } } = {" + soloMode
);

// 5. Add to CHAPTER_ATTACK_PATTERNS
const attackPattern = `
  "Dedicated Kill-Team": {
    name: "Dedicated Kill-Team",
    chapter: "Crimson Fists",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "The Battle-Brother and those within support range can combine their Hunter of Alien bonuses if they choose to attack a single target. In a single turn each successive attack against a single foe by a squad member with the Hunter of Aliens Talent adds the bonus to hit and Damage of the one before. Squad members without the Hunter of Aliens Talent can also benefit from this ability and... gain the current bonus to hit and Damage... but add nothing themselves.",
    improvement: "At Rank 6 the Kill-team can spread its attacks out among a number of foes and the cumulative bonuses to hit and Damage will work against any xenos of the chosen type in the combat provided all of the Kill-team remain in Support Range."
  },`;
data = data.replace(
  /export const CHAPTER_ATTACK_PATTERNS: Record<string, \{ name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string \}> = \{/,
  "export const CHAPTER_ATTACK_PATTERNS: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {" + attackPattern
);


// 6. Add to CHAPTER_DEFENSIVE_STANCES
const defensiveStance = `
  "Last Stand": {
    name: "Last Stand",
    chapter: "Crimson Fists",
    action: "Free Action",
    cost: 1,
    sustained: true,
    effects: "While this ability is active, any Battle-Brother that falls in combat (either incapacitated or killed) will strengthen the group and provides those that remain with 3 Fate Points to share. These Fate Points cannot be burnt but can be spent to gain bonuses in all the normal ways. Any Battle-Brother may use these Fate Points instead of his own while he remains within Support Range of the fallen brother.",
    improvement: "At Rank 4 a fallen Battle-Brother provides the group with 4 additional Fate Points. At Rank 7 a Fallen Battle-Brother provides his Kill-team with 5 additional Fate Points."
  },`;
data = data.replace(
  /export const CHAPTER_DEFENSIVE_STANCES: Record<string, \{ name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string \}> = \{/,
  "export const CHAPTER_DEFENSIVE_STANCES: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {" + defensiveStance
);


// 7. Add to CHAPTER_TRAPPINGS
const trapping = `
  {
    name: "Ork Bone Talismans",
    chapter: "Crimson Fists",
    description: "Ork teeth and skulls are a common sight among the trophy rooms for the Crimson Fists Chapter and some Battle-Brothers carry these talismans into battle as a reminder of their prowess over the alien.",
    rule: "A Crimson Fists Space Marine may choose to carry an Ork Bone Talisman if he has the Hatred (Orks) Talent. The talisman allows the Battle-Brother to use the +10 bonus to attacks from his Hatred (Orks) Talent to be used for both Weapon Skill and Ballistic Skill. Orks fighting the Battle-Brother are incensed by such tokens and gain the Hatred Talent against him."
  },`;
data = data.replace(
  /export const CHAPTER_TRAPPINGS = \[/,
  "export const CHAPTER_TRAPPINGS = [\n" + trapping
);

fs.writeFileSync('constants.tsx', data);
