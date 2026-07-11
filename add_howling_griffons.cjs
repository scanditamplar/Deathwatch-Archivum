const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. CHAPTERS
content = content.replace(
  '"Marines Errant", "Crimson Fists"',
  '"Marines Errant", "Crimson Fists", "Howling Griffons"'
);

// 2. CHAPTER_NAMES
const howlingGriffonsNames = `
  "Howling Griffons": {
    first: ["Orlando", "Armand", "Darius", "Pellas", "Garadon", "Lucian", "Titus", "Balthasar"],
    last: ["Furioso", "Kantor", "Vane", "Stahl", "Draco", "Marius", "Galeo", "Castigon"]
  },`;

content = content.replace(
  'export const CHAPTER_NAMES: Record<string, { first: string[], last: string[] }> = {',
  'export const CHAPTER_NAMES: Record<string, { first: string[], last: string[] }> = {' + howlingGriffonsNames
);

// 3. CHAPTER_DATA
const howlingGriffonsData = `
  "Howling Griffons": {
    modifiers: { WS: 5 },
    talents: ["Hatred (Word Bearers)"],
    skills: ["Forbidden Lore (Traitor Legions)"],
    soloAbility: "Tactical Assessment",
    restrictions: [],
    demeanorName: "Glorious Tradition",
    demeanorSummary: "Strict adherents to the Codex Astartes who hone their skills and pride themselves on a spotless history, save their bitter hatred for the Word Bearers.",
    demeanorDescription: "That the Battle-Brothers of the Howling Griffons strive to live up to the reputation of their Chapter as exemplars of the Adeptus Astartes has earned them many honours among their brethren. The number of victories won by the Howling Griffons would be deemed great were they even a Chapter of the Second Founding; for a Chapter of the 33rd millenium, their record is vast indeed. Few among the Adeptus Astartes can claim to have embodied the ideals of the Codex Astartes more fully than the Battle-Brothers of the Proud Eyrie. Resting heavily on the shoulders of each Battle-Brother is his personal honour, as well as that of his predecessors. It is the duty of each individual to stand as an example to all, that they might inspire their comrades to even greater feats of heroism in the name of the Emperor of Man and his glorious Imperium. The honour of the Chapter, the Primarch, the Emperor, and the Imperium all demand that the Battle-Brothers of the Adeptus Astartes make war across the stars, and no treatise has better captured the Space Marines’ capacity in battle than the Codex Astartes. To embrace that weighty tome is to know victory.",
    summary: "Strict adherents to the Codex Astartes carrying a bitter hatred for the Word Bearers.",
    curseName: "Cursing the Word",
    curseLevels: {
      1: { name: "The Price of Treachery", summary: "Routine (+20) Willpower Test when meeting a suspected traitor to restrain violent response.", full: "The Battle-Brother has become increasing obsessed with the Word Bearers treachery and relives their fateful ambush in his mind over and over again. While this spurs him on to seek out the hated Word Bearers, it also leads him to see treachery in other places, comparing the great crime perpetrated against his Chapter with other events as they unfold. The merest hint of treachery is enough to prompt a strong and violent response from the Battle-Brother, one which he may not be able to control. If the Battle-Brother comes into contact with a suspected traitor (to the Imperium, the Deathwatch, or his Chapter) he must make a Routine (+20) Willpower Test. If he passes, he can restrain himself but will be very unpleasant to the known or suspected traitor, while if he fails he will see it as his place to punish them, perhaps even with summary execution if their crime is great enough." },
      2: { name: "Trail of the Traitors", summary: "Routine (+20) Willpower Test to not jeopardize squad or subvert missions to seek out traitors or forbidden texts.", full: "As the Battle-Brothers hatred of traitors grows and his obsession with finding and exterminating the Word Bearers heightens, he will be loath to give up any mission or lead which could lead to them. On a mission, this could mean going out of his way to seek out known or suspected traitors or even changing the mission objectives to include their capture or destruction. In other settings, it can mean an obsessive thirst for knowledge and seeing out dangerous or forbidden texts if it means gaining a clue to the location and crimes of a traitor. In both instances, if the subverting of a mission or the seeking of knowledge would place the Battle-Brother or his squad in extreme danger, the GM may allow a Routine (+20) Willpower Test to resist, unless the action pertains directly to the Word Bearers and then no Test should be allowed." },
      3: { name: "In the Eye of Terror and Beyond", summary: "Always seeks to fight and destroy Chaos Space Marines, ignoring other threats or logic.", full: "The Battle-Brothers hunger to eradicate the Word Bearers and repay them for their crimes against the Chapter culminates in doing whatever it takes to see them destroyed. The Battle-Brother will always seek out Chaos Space Marines in any combat situation or mission, and if it falls within their power they will see their squad face off against Chaos Space Marines as often as possible, trying to ensure their deployment to warzones and campaigns where they might come face to face with them. When these hated foes are encountered, the Battle-Brother will do everything in his power to destroy them and see they do not escape, even if it means leaving others behind to chase them down wherever they might run." }
    }
  },`;

content = content.replace(
  'export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {',
  'export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {' + howlingGriffonsData
);

// 4. CHAPTER_SOLO_MODE_ABILITIES
const howlingGriffonsSolo = `
  "Howling Griffons": {
    name: "Tactical Assessment",
    requiredRank: 1,
    effects: "Keen of mind and shrewd tacticians all, the Howling Griffons are able to make the best of a poor tactical situation and take advantage of resources and positions few would recognise as beneficial. This ability can be activated at the end of the Battle-Brother’s Turn in the Initiative Order during combat. When this ability is activated, the Battle-Brother immediately swaps positions in the Initiative Order with an enemy who has already acted during the current Combat Round. The Battles-Brother’s Turn is then over and the Initiative Order proceeds onward from the end of his original position.",
    improvement: "At Rank 5 when the Howling Griffons Battle-Brother uses this ability, in addition to all other effects, for the full following Combat Round, he gains a +10 bonus to all Tests against the opponent with which he traded places in the Initiative Order. At Rank 7, the target opponent takes a –10 penalty to all Tests for the full following Combat Round in addition to all other effects."
  },`;

content = content.replace(
  'export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string } } = {',
  'export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: { name: string, requiredRank: number, effects: string, improvement: string, chapter?: string } } = {' + howlingGriffonsSolo
);

// 5. CHAPTER_ATTACK_PATTERNS
const howlingGriffonsAttack = `
  "Howling Griffons": {
    name: "Synchronised Assault",
    chapter: "Howling Griffons",
    action: "Half Action",
    cost: 2,
    sustained: true,
    effects: "Calling upon years of training using the doctrines of the Codex Astartes and their own personal tactics, the Howling Griffons can execute swift and stunning attacks where every member of the squad works in perfect union with their brothers. The Battle-Brother and other members of his squad within Support Range can swap their Initiative order with other members of their Kill-team without penalty and without the need to use the Delay Action. Immediately upon starting his turn, a Battle-Brother can choose to either use it for himself or give it to another member of his squad, who then acts in his place. The Battle-Brother then takes the initiative place of the squad member who has taken his turn and will not act again until that time, unless of course another member of the squad chooses to grant him their own placing in the Initiative order. Regardless of the Battle-Brother’s new Initiative placing, he may still not act more than once a turn.",
    improvement: "At Rank 4 a Battle-Brother using this ability which gives up his initiative placing to act later in the turn gains a +10 to his first test as he is able to better survey the situation. At Rank 7 this +10 bonus to tests applies to all tests he makes in his turn."
  },`;

content = content.replace(
  'export const CHAPTER_ATTACK_PATTERNS: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {',
  'export const CHAPTER_ATTACK_PATTERNS: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {' + howlingGriffonsAttack
);

// 6. CHAPTER_DEFENSIVE_STANCES
const howlingGriffonsDefensive = `
  "Howling Griffons": {
    name: "Staggered Defence",
    chapter: "Howling Griffons",
    action: "Free Action",
    cost: 3,
    sustained: true,
    effects: "Just as a well-executed attack can be devastating when every Battle-Brother works in flawless cooperation, a well constructed defensive formation can allow every member of a squad to cover the other and move to their defence should they come under attack or be threatened. Battle-Brothers within Support Range of each other can provide each other with a defensive bonus provided they have line of sight to at least one other member of the squad. Against ranged attacks, this grants a Battle-Brother a +10 to Dodge attempts as his brothers cover his position and warn him of incoming attacks. Against melee attack, Battle-Brothers can use the Ganging Up bonus they would normally receive on Weapon Skill Tests against a foe as a bonus to their Parry attempts against that same foe.",
    improvement: "At Rank 5 the bonus to Dodge attempts increases to +20."
  },`;

content = content.replace(
  'export const CHAPTER_DEFENSIVE_STANCES: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {',
  'export const CHAPTER_DEFENSIVE_STANCES: Record<string, { name: string, chapter: string, action: string, cost: number, sustained: boolean, effects: string, improvement: string }> = {' + howlingGriffonsDefensive
);

// 7. CHAPTER_TRAPPINGS
const howlingGriffonsTrapping = `
  {
    name: "Night World Battle Livery",
    chapter: "Howling Griffons",
    description: "In certain circumstances, a Chapter may be permitted to make use of variant livery on their armour, painting it with different designs specific to an individual campaign or engagement. During several of its engagements, the Howling Griffons have been sanctioned to use such livery, giving up the bold quarters red and yellow they normally employ. Among these official Codex patterns and colours is the Night World Battle Livery. A Howling Griffons Battle-Brother may choose to paint his armour in Night World Camouflage before a mission if it will involve stealth or reconnaissance elements. While his armour is painted in this way, he gains a +10 to silent move Skill Tests.",
    rule: "If painted before a mission involving stealth/recon elements, grants a +10 to silent move Skill Tests." // Added a short summary rule to match the structure
  },`;

content = content.replace(
  'export const CHAPTER_TRAPPINGS = [',
  'export const CHAPTER_TRAPPINGS = [' + howlingGriffonsTrapping
);

fs.writeFileSync('constants.tsx', content);

console.log('Script executed');
