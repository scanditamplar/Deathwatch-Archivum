const fs = require('fs');

const path = 'constants.tsx';
let data = fs.readFileSync(path, 'utf8');

const bloodRavensChapter = `  "Blood Ravens": {
    modifiers: { Int: 5 },
    talents: [],
    soloAbility: "Foreknowledge",
    restrictions: [],
    demeanorName: "Secrets of the Dark",
    demeanorSummary: "A thirst for uncovering the lost past and forbidden knowledge.",
    demeanorDescription: "The origins of the Blood Ravens are shrouded in mystery and the true nature and name of their Primarch is unknown to them. A Battle-Brother comes into the ranks of the Blood Ravens with a sense of curiosity to understand their ancestry, further fuelled by the principles of the Chapter and the value it places on knowledge and secrets. To a Blood Ravens Battle-Brother, the drive to gain knowledge can be too much, and where a more reluctant or cautious Imperial servant might leave a book unopened or a vault sealed, the Battle-Brother must learn of its contents.",
    summary: "Scholars of forbidden lore and seekers of truth.",
    curseName: "Deepening Mysteries",
    curseLevels: {
      1: { name: "Unhealthy Curiosity", summary: "Must pass a Challenging (+0) Willpower Test to not pursue a secret.", full: "The Battle-Brother’s quest for lore and knowledge has led him into dangerous places. Whenever the Battle-Brother is presented with the chance to learn a secret or uncover some knowledge either of importance to the Blood Ravens or pertaining to the Adeptus Astartes, he must make a Challenging (+0) Willpower Test to not pursue it." },
      2: { name: "Knowledgeable Obsessions", summary: "Must pass a Challenging (+0) Willpower Test to not learn more about an obsessive knowledge, even in danger.", full: "As a Blood Raven learns more forbidden lore, they can become obsessed with a particular subject. The GM chooses one of his Lore Skills. Whenever the Battle-Brother is presented with a chance to learn more about this obsessive knowledge he must do so. Only if it would put his own life or the lives of his squad in danger can he resist and even then only with a Challenging (+0) Willpower Test." },
      3: { name: "Unholy Enlightenment", summary: "Failing a Lore Skill Test twice costs one Round of action and 1 Insanity or Corruption Point.", full: "Whenever the Battle-Brother fails a Lore Skill Test of any kind, he must immediately Test again against the same Skill. If he fails again, then nothing has happened. If he passes, he is overwhelmed for a moment, costing him one Round of action and earning him either 1 Insanity Point or 1 Corruption point as chosen by the player. If he is squad leader, his squad also gains 1 IP or CP if they benefit from the knowledge." }
    }
  },`;

data = data.replace('export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {', 'export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {\n' + bloodRavensChapter);

const bloodRavensSolo = `  "Foreknowledge": {
    name: "Foreknowledge",
    requiredRank: 1,
    chapter: "Blood Ravens",
    effects: "Blood Ravens covet knowledge and use it as a weapon in battle to predict and counter the actions of their foes. Once per combat, the Battle-Brother may expend a Half Action to negate a single foe’s Reaction for that Round. Alternatively, as a Free Action, the Battle-Brother may make a Challenging (+0) Opposed Intelligence Test against a single foe (or a Horde) to determine its next action before he acts himself. If successful, the Battle-Brother may choose to either gain +10 to all Tests made against the foe this Turn or gain +10 to any Dodge or Parry Tests made against attacks from the foe until the start of his next Turn.",
    improvement: "At Rank 3, the Battle-Brother increases the bonuses to +20 on all Tests for that Turn or +20 on any Dodge and Parry Tests made against attacks until the start of his next Turn. At Rank 7 he can negate the Reaction of a single foe as a Free Action rather than a Half Action."
  },`;

data = data.replace('export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: SoloModeAbility } = {', 'export const CHAPTER_SOLO_MODE_ABILITIES: { [key: string]: SoloModeAbility } = {\n' + bloodRavensSolo);

const bloodRavensDefensive = `  "Battle Knowledge": {
    name: "Battle Knowledge",
    cost: 1,
    action: "Free Action",
    sustained: "Yes",
    chapter: "Blood Ravens",
    effects: "The Blood Ravens are masters of counter attack and counter defence, reacting with well-practised battle cunning to every action their opponents takes. When the Battle-Brother and those within Support Range of him use the Delay Action (see page 238 of the DEATHWATCH Core Rulebook) they can make a Full Action rather than a Half Action when they choose to act.",
    improvement: "At Rank 4, if Battle-Brothers are forced to make a Challenging (+0) Opposed Agility Test to see if they go before an enemy also using the Delay Action, they gain a +30 bonus to their roll."
  },`;

data = data.replace('export const CHAPTER_DEFENSIVE_STANCES: { [key: string]: SquadModeAbility } = {', 'export const CHAPTER_DEFENSIVE_STANCES: { [key: string]: SquadModeAbility } = {\n' + bloodRavensDefensive);

const bloodRavensAttack = `  "Psychic Conclave": {
    name: "Psychic Conclave",
    cost: 2,
    action: "Half Action",
    sustained: "Yes",
    chapter: "Blood Ravens",
    effects: "Blood Ravens Librarians are skilled in using their abilities to predict the actions of their enemies. The Librarians within the Battle-Brother’s squad may choose to confer psychic powers with a range of 'Self' to those within Support Range. The chosen Battle-Brother becomes the recipient for the psychic power and benefits from all of its effects. The Librarian must choose at the start of each Turn to continue conferring the power, shift it, or use it himself. The power is activated and sustained as normal. More than one Librarian can benefit from this, and multiple powers can be conferred onto the same Battle-Brother.",
    improvement: "At Rank 4, activating the power becomes a Free Action. At Rank 7, psychic powers conferred on other Battle-Brothers do not count for that Round against the number of powers a Librarian is sustaining and thus do not reduce the Psy Rating of other powers."
  },`;

data = data.replace('export const CHAPTER_ATTACK_PATTERNS: { [key: string]: SquadModeAbility } = {', 'export const CHAPTER_ATTACK_PATTERNS: { [key: string]: SquadModeAbility } = {\n' + bloodRavensAttack);

const bloodRavensTrapping = `  {
    name: "Librarium Texts (Blood Ravens)",
    chapter: "Blood Ravens",
    description: "Blood Ravens Battle-Brothers have access to vast amounts of knowledge from the vaults of their Chapter. A Battle-Brother carrying Librarium texts must choose a single Lore Skill (which can be either Common, Scholastic, or Forbidden) as his area of focus. When using the Lore Skill on a subject his texts cover, he gains a +3 bonus to the Test."
  },`;

data = data.replace('export const CHAPTER_TRAPPINGS: ChapterTrapping[] = [', 'export const CHAPTER_TRAPPINGS: ChapterTrapping[] = [\n' + bloodRavensTrapping);

const bloodRavensRelic = `  {
    name: "Lucian's Rod (Blood Ravens)",
    chapter: "Blood Ravens",
    description: "Lucian was a legendary hero of the Blood Ravens, who some claim could not channel his prodigious psychic powers through any normal force weapon. He had a special force staff crafted for his use, a weapon which amplified his talents tenfold. Rules: Lucian’s Rod is an Astartes force staff that grants a +20 to the Focus Power Test to channel power through the weapon with its Force Quality. However, it requires great power behind the blow to function, and the Force Quality cannot be used with an effective Psy Rating of less than 5 (after being modified by Power Level).",
    weaponProfile: "Melee, 1d10+3 I, Pen 0, Balanced, Force"
  },`;

data = data.replace('export const RELIC_WARGEAR: RelicItem[] = [', 'export const RELIC_WARGEAR: RelicItem[] = [\n' + bloodRavensRelic);

const bloodRavensPowers = `  {
    name: "Battle Sight",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "10m x Psy Rating Radius",
    sustained: "No",
    description: "Blood Ravens Librarians can pierce the fog of war with a thought, casting their mind far and wide across practically any distance. A Librarian may use this psychic power in two different ways. The first use reveals the position of all enemies within range that have hostile intentions toward the Librarian (i.e. intend to do the Librarian harm), and allows the Librarian to ignore penalties for Concealment when making attacks against enemies revealed by Battle Sight until the start of his next Turn.\\n\\nThe second use is to gain a broad strategic overview. As part of preparation for a mission a Librarian who is acting as Squad Leader can choose to use Battle Sight rather than selecting an Oath. The Librarian can then choose one of the Mission Objectives and add 1d5 Kill Markers x Psy Rating toward its completion. Used in this way, Battle Sight does not require a Focus Power test and cannot incur Perils of the Warp.",
    xpCost: 1500,
    prerequisite: "Int 40"
  },
  {
    name: "Truth Seeker",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Blood Ravens Librarians spend much of their lives seeking knowledge and looking into the origins of their Chapter. Truth Seeker allows a Librarian to find details and clues that he might have otherwise missed. While this power is active, the Librarian is more aware of minor details, and gains a +15 to all Intelligence Tests and Skill Tests based on Intelligence, as well as Scrutiny Tests. In addition, if he is unsure of which direction to proceed in an investigation he can make an unmodified Intelligence to gain a clue from the GM. The nature of the clue and its exact worth are up to the GM (usually once per game session).",
    xpCost: 1000
  },
  {
    name: "Warp Whispers",
    category: "Blood Ravens powers",
    action: "Half Action",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "The Librarian can listen to the babblings of the Warp and perceive the secrets of its denizens. When the Librarian activates this power, he learns a number of “secrets” equal to his Psy Rating. He can then use these “secrets” to gain insight into his immediate future and may spend up to one ‘secret’ on each of his Turns. For every “secret” used, he gains either a +10 bonus to a single Test, ignores a single point of Damage, or increases the Damage he inflicts by 2. “Secrets” not used by the end of the game session are lost.\\n\\nWarp Whispers is not without its dangers. If the power is used Fettered, any roll of doubles on the Focus Power Test forces an automatic roll on Perils of the Warp. If used Unfettered, the Librarian automatically suffers a Perils of the Warp. If the power is used at the Push level, the Librarian must automatically roll on Perils of the Warp, with a +20 modifier.",
    xpCost: 1000,
    prerequisite: "WP 40"
  },`;

data = data.replace('export const LIBRARIAN_PSYCHIC_POWERS: LibrarianPsychicPower[] = [', 'export const LIBRARIAN_PSYCHIC_POWERS: LibrarianPsychicPower[] = [\n' + bloodRavensPowers);

fs.writeFileSync(path, data);
console.log('Successfully updated constants.tsx for Blood Ravens');
