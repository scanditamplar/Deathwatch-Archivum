import React from 'react';
import { CharacterData, Characteristics, BattleTrauma, ArmorAbility } from './types';

export const Icons = {
  Skull: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M9 12h.01M15 12h.01M12 15v2M10 20h4v2h-4z" />
      <path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20" />
    </svg>
  ),
  Sword: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" x2="19" y1="19" y2="13" />
      <line x1="16" x2="20" y1="16" y2="20" />
      <line x1="19" x2="21" y1="21" y2="19" />
    </svg>
  ),
  Wargear: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.83-2.83l-3.94 3.6z" />
      <path d="m10.29 3.86 3.98 3.98" />
      <path d="m9.1 9.1-2.8-2.8" />
      <path d="M5.8 12.2A4.99 4.99 0 1 0 11.8 18.2L21 9" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="1" />
    </svg>
  ),
  Scroll: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M15 2H6a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V11l-6-6z" />
      <path d="M15 2v4a3 3 0 0 0 3 3h4" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M10 9H8" />
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
      <path d="M8 18h8" />
    </svg>
  )
};

export const CHAPTERS = [
  "Ultramarines", "Blood Angels", "Dark Angels", "Space Wolves", "Imperial Fists", "Storm Wardens", "Iron Hands", "White Scars", "Salamanders", "Raven Guard", "Black Templars"
];

export interface CurseLevel {
  name: string;
  summary: string;
  full: string;
}

export interface ChapterDetails {
  modifiers: { [key in keyof Characteristics]?: number };
  woundsBonus?: number;
  talents: string[];
  soloAbility: string;
  restrictions: string[];
  implantsNote?: string;
  startingGear?: string[];
  demeanorName: string;
  demeanorSummary: string;
  demeanorDescription: string;
  summary: string;
  curseName: string;
  curseLevels: {
    1: CurseLevel;
    2: CurseLevel;
    3: CurseLevel;
  };
}

export const CHAPTER_DATA: { [key: string]: ChapterDetails } = {
  "Space Wolves": {
    modifiers: { Per: 5, Fel: 5 },
    talents: ["Heightened Senses (Smell)", "Counterattack"],
    soloAbility: "Wolf Senses",
    restrictions: ["Apothecary"],
    demeanorName: "Sons of Russ",
    demeanorSummary: "Ferocious and aggressive warriors who value duty, honour, and feats of arms over prayer.",
    demeanorDescription: "The Battle-Brothers of the Space Wolves are ferocious and aggressive warriors. Though far from mindless berserkers, they are certainly possessed of a feral exuberance for battle. They have an overriding sense of duty and honour, and are driven ever onwards by a strong desire to right the many wrongs that have befallen the Imperium. Space Wolves exhibit a fierce sense of loyalty to their comrades in arms. Although as devoted to the Emperor as any other Space Marine Chapter, the Space Wolves express their faith not in prayer and piety, but in feats of arms. While the Battle-Brothers of other Chapters may spend the night before battle in solemn meditation, the Space Wolves are more likely to mark the eve of battle in bawdy celebration. In temperament, most Space Wolves are blunt and plain speaking, even to the point of giving offence to those not used to their ways. They abhor pretension and despise politicking.",
    summary: "Renowned for sharp senses and feral heroism.",
    curseName: "Curse of the Wulfen",
    curseLevels: {
      1: { name: "Shadow of the Wolf", summary: "Fellowship reduced by –10/–20 when dealing with others.", full: "The wolf lurks close to the surface in the Battle-Brother and he feels its call in his blood. This can be unsettling for others, especially those not of the Adeptus Astartes. The Battle-Brother’s Fellowship is reduced by –10 when dealing with Space Marines who are not part of his Kill-team, and –20 when dealing with everyone else." },
      2: { name: "Prey’s Scent", summary: "Must pass Perception Test when bloodying a foe or lose actions.", full: "The keen senses of a Space Wolf can be as much a curse as a boon. Sometimes they can overpower the Battle-Brother, temporarily robbing him of his senses. The first time a foe is bloodied by the Space Wolf in battle he must make an Easy (+20) Perception Test. If he passes the test, he may only take a Half Action on his next Turn." },
      3: { name: "Fight or Fight", summary: "Willpower Test required to retreat or give ground.", full: "The Battle-Brother finds it hard to back down from fights in the face of naked aggression. Whenever the Space Wolf would be required to give ground or make a tactical retreat from foe, he must make a Hard (–20) Willpower Test to do so." }
    }
  },
  "Ultramarines": {
    modifiers: { Fel: 5, WP: 5 },
    talents: [],
    soloAbility: "Favoured Son",
    restrictions: [],
    demeanorName: "Honour the Codex",
    demeanorSummary: "Analytical, thorough, and disciplined warriors who follow the Codex Astartes to the letter.",
    demeanorDescription: "In all of their duties, from battle to study, the Ultramarines are thorough, analytical, and attentive to every detail. They are slow to anger and rarely make a rash decision. By constant recourse to the articles of faith enshrined within the Codex Astartes, the Ultramarines are able to face any eventuality with well-practised battle drills and established doctrine. In their dealings with Battle-Brothers from other Chapters, Ultramarines often fulfil the role of facilitator and peacemaker. While the Battle-Brothers of some Chapters display extremes of character, the Ultramarines are balanced in their approach, and often able to broker agreements between wildly differing points of view. This is evidenced in the fact that a high proportion of Deathwatch leaders are drawn from the Ultramarines.",
    summary: "Tactical flexibility and strict adherence to the Codex.",
    curseName: "The Pride of Ultramar",
    curseLevels: {
      1: { name: "The Emperor’s Finest", summary: "Always volunteer for most dangerous mission roles.", full: "Ultramarines consider themselves the Emperor’s favoured sons and the pride of the Imperium. This can lead members of the Chapter to consider others incapable or unable to complete missions that should by rights fall to the Ultramarines. The Battle-Brother always volunteers his Kill-team for the most dangerous or challenging Missions whenever possible." },
      2: { name: "Sons of the Codex", summary: "Cannot benefit from Squad Mode Actions called by Space Wolves or Black Templars.", full: "The Battle-Brother has been trained to follow the Codex Astartes to the letter and interpret its teachings flawlessly. Understandably, he is distrustful of those Chapters that do not adhere to the Codex. The Battle-Brother cannot benefit from Squad Mode Actions called by Space Marines of the Space Wolves or Black Templars Chapters." },
      3: { name: "Leaders not Followers", summary: "-2 Cohesion unless leader is a fellow Ultramarine or self.", full: "Ultramarines are natural leaders and make excellent battlefield commanders at all levels of command. This pride and training, however, can lead to them scorning or disregarding the leadership of those from other Chapter or Imperial forces. Unless the Battle-Brother is currently the Kill-team squad leader or the leader is a fellow Ultramarine, his Kill-team’s Cohesion is reduced by 2." }
    }
  },
  "Blood Angels": {
    modifiers: { WS: 5, Ag: 5 },
    talents: [],
    soloAbility: "Blood Frenzy",
    restrictions: [],
    demeanorName: "The Red Thirst",
    demeanorSummary: "Adestructive battle-fury and blood hunger held in check by nobility and humility.",
    demeanorDescription: "The Red Thirst is a Demeanour unique to Space Marines from the Blood Angels Chapter. Deep within the psyche of every Blood Angel is a destructive yearning, a battle fury and blood hunger that must be held in abeyance in every waking moment. Few Battle-Brothers can hold the Red Thirst in check unceasingly—it is far from unknown for Blood Angels to temporarily succumb to its lure at the height of battle. The Red Thirst is the Blood Angels’ darkest secret and greatest curse, but it is also their greatest salvation—for it brings with it a humility and understanding of their own failings which make them truly the most noble of the Space Marines.",
    summary: "Artistic warriors harboring a hidden combat rage.",
    curseName: "The Black Rage",
    curseLevels: {
      1: { name: "Bloodlust", summary: "Willpower Test to avoid finishing off surrendering foes.", full: "The Battle-Brother cannot stand to leave an enemy alive or end a fight without even a single kill. If an enemy surrenders or a fight looks like it will end without a foe’s death, the Battle-Brother must make a Challenging (+0) Willpower Test to avoid finishing them off or hacking down at least one foe." },
      2: { name: "Close Quarters Killing", summary: "Must favor melee over ranged and charge whenever possible.", full: "Those in the grip of the Black Rage favour close melee combat, where the blood of their foes stains their armour red. Unless there is no possible way to close with a foe, the Battle-Brother will always favour melee combat over ranged combat and will charge into the fray." },
      3: { name: "Uncontrollable Thirst", summary: "Must make Hard Willpower Test post-battle or drink enemy blood.", full: "In extreme cases, the Red Thirst translates into a literal thirst for blood. Once a battle is over, a Battle-Brother with Uncontrollable Thirst must make a Hard (–20) Willpower Test or spend at least a few minutes drinking the blood of his foes." }
    }
  },
  "Dark Angels": {
    modifiers: { BS: 5, Int: 5 },
    talents: [],
    soloAbility: "Stoic Defence",
    restrictions: [],
    demeanorName: "Sons of The Lion",
    demeanorSummary: "Secretive and introverted; suspicious of outsiders and impatience with those who pry.",
    demeanorDescription: "Although only the upper echelons of the Chapter are aware of the awful truth of the Dark Angels’ past, even those newly recruited are possessed of a secretive, even introverted nature. Outsiders are not to be trusted is drilled into recruits from an early stage. Many find the Dark Angels aloof and uncommunicative. They are impatient and unforgiving with strangers who pry into their affairs. They are notoriously intolerant of non-humans and will often refuse to fight alongside armies that include abhuman warriors or alien races. Their taciturn nature and stubborn refusal to accept anything other than total victory has served the Deathwatch well.",
    summary: "Brooding tacticians with ancient secrets.",
    curseName: "The Secret",
    curseLevels: {
      1: { name: "Dark Dreams", summary: "Start of mission Toughness Test or begin with Fatigue.", full: "The Battle-Brother is beset with memories of past times and deep, hidden secrets that cast a shadow over periods of rest and meditation. At the start of any mission, the Battle-Brother must pass a Challenging (+0) Toughness Test or begin play with a level of Fatigue." },
      2: { name: "Scorn of Outsiders", summary: "Command Skill restricted to Kill-team or Dark Angels.", full: "The Dark Angel has grown to view those outside the Chapter as misguided or ignorant of the truth and cannot bring himself to deal with them any more than necessary. The Battle-Brother cannot use the Command Skill on anyone who is not either a member of his Kill-team or a fellow Dark Angel." },
      3: { name: "Deep Suspicions", summary: "-2 Cohesion unless the team is solely Dark Angels.", full: "Trained in an atmosphere of silence and secrets, the Dark Angel has become very distrustful of anyone outside his Chapter and cannot take the words or promises of others at face value. Unless the Battle-Brother’s Kill-team is solely comprised of Dark Angels, its Cohesion is reduced by 2." }
    }
  },
  "Imperial Fists": {
    modifiers: { WP: 10 },
    talents: [],
    soloAbility: "Siege Master",
    restrictions: [],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Sons of Dorn",
    demeanorSummary: "Driven and focused warriors who prefer death to the perceived dishonour of defeat.",
    demeanorDescription: "Imperial Fists are driven and focussed. They study the Codex Astartes with dedication, yet their nature makes tactical re-deployment hard to comprehend—they will fight on regardless of consequences. When not in battle, they immerse themselves in history and war-science to silence doubts of potential failure. In battle, they refuse to take a step backwards or admit a foe’s superiority. They are disciplined and focused, preferring death over the remotest possibility of admitting defeat. This can cause friction with Kill-team leaders who order tactical withdrawals.",
    summary: "Unyielding defenders of the Imperium.",
    curseName: "Death before dishonor",
    curseLevels: {
      1: { name: "Suffer Not Failure", summary: "Truculent and obstructive when ordered to redeploy.", full: "The Battle-Brother believes himself deficient in some manner, real or imagined, and becomes truculent and obstructive when ordered to redeploy in the face of a stronger foe. When acting as the leader, he makes unreasonable demands and views disagreement as outright disobedience." },
      2: { name: "Beware Hubris", summary: "Brooding on past deeds, seeking even the slightest flaw.", full: "The Battle-Brother spends his every waking moment brooding on past battles, seeking even the slightest flaw in his own deeds. He condemns his own actions as falling short of the example set by his Primarch and seeks redemption in the fires of battle." },
      3: { name: "None Are Flawless", summary: "Obsessively fault-finding; unwilling to issue or accept orders that don't result in battle.", full: "The Battle-Brother obsessively reviews every detail of every mission, finding fault with his own actions and those of his Kill-team. He becomes withdrawn, maudlin, and confrontational, and unwilling to accept or issue any order that does not result in imminent battle." }
    }
  },
  "Iron Hands": {
    modifiers: { BS: 5, T: 5 },
    talents: [],
    soloAbility: "Steel Over Flesh",
    restrictions: [],
    startingGear: ["Exceptional craftsmanship bionic hand"],
    demeanorName: "Iron and Hate",
    demeanorSummary: "Abhorrence of weakness expressed through cold, mechanical tones and augmetic replacements.",
    demeanorDescription: "Iron Hands appear coldly inanimate, expressions shorn and replaced with steel. They abhor any trace of weakness, express cold mechanical anger, and are blunt and uncaring of offence given in their criticisms of allies. In battle, they are coldly resolute, Identifying enemy vulnerabilities and exploiting them ruthlessly. They scourge their flesh, reminding themselves of biological weakness. Only when biological inheritance is gone are they truly free of pain.",
    summary: "Cybernetic warriors shunning biological frailty.",
    curseName: "Steel Over Flesh",
    curseLevels: {
      1: { name: "A Disdain for Flesh", summary: "–20 penalty to Interaction Tests (reduced by cybernetics).", full: "The Battle-Brother perceives his own flesh as a hindrance. The Battle-Brother suffers a –20 penalty to all Interaction Skill Tests. This penalty is reduced to –10 if the Battle-Brother has three or more cybernetic implants, and removed if he has five or more." },
      2: { name: "Cold Fury", summary: "Willpower Test when confronted by enemy or weakness.", full: "The ruthlessness of the Iron Hands manifests more strongly. The Battle-Brother must take a Challenging (+0) Willpower Test when confronted by an enemy or something he considers “weak;” failure likely causes a feud or open violence." },
      3: { name: "Zero Tolerance", summary: "Refuses to fight with weak allies; -1d5 Cohesion if any member fails a test.", full: "The Battle-Brother will seek to remove any perceived source of weakness, to the point of refusing to fight alongside allied forces. If any member of the Kill-team fails a Challenging (+0) or easier Test, he may not benefit from Squad Mode. If Leader, Cohesion reduces by 1d5." }
    }
  },
  "Raven Guard": {
    modifiers: { Ag: 5, Per: 5 },
    talents: [],
    soloAbility: "Master of Shadows",
    restrictions: [],
    demeanorName: "Son of Night",
    demeanorSummary: "Dark and brooding predators who prefer patient observation to unnecessary conversation.",
    demeanorDescription: "Raven Guard are dark and brooding, often surly and recalcitrant. They are not given to unnecessary conversation, preferring to watch and listen, waiting for events to unfold to their advantage. They are extremely patient, never acting rashly, and appear motivated by an inner darkness. They often fight alongside others but may fail to share plans, leading to conflict. They are known for using allies as bait in elaborate traps.",
    summary: "Stealth specialists striking from darkness.",
    curseName: "Lure Of the Shadows",
    curseLevels: {
      1: { name: "Tactical Friction", summary: "Resistant or disobedient when ordered into direct attacks.", full: "The Battle-Brother finds the direct tactics used by other members of his Kill-team to be brutish and ineffective. When commanded into a direct attack that he finds foolhardy, the Battle-Brother is resistant, almost to the level of disobedience." },
      2: { name: "Brooding Presence", summary: "Does not benefit from non-Raven Guard Command or Charm skills.", full: "The Battle-Brother is quiet and brooding, only speaking when absolutely necessary. Team members feel uneasy around him. The Battle-Brother doesn’t benefit from the effects of non-Raven Guard characters using the Command or Charm (Inspire) Skills." },
      3: { name: "Shadow Superiority", summary: "Does not benefit from any non-Raven Guard Squad Mode Abilities.", full: "The Battle-Brother despises the tactics of his fellow Battle-Brothers, knowing that his more intelligent approach is the best way to victory. The Battle-Brother doesn’t benefit from the effects of non-Raven Guard Squad Mode Abilities." }
    }
  },
  "Salamanders": {
    modifiers: { T: 5, Int: 5 },
    talents: ["Resistance (Heat)"],
    soloAbility: "Fire-Born",
    restrictions: [],
    demeanorName: "Promethean Cult",
    demeanorSummary: "Level-headed and wise warriors who maintain family ties and value compassion for humans.",
    demeanorDescription: "The Salamanders embody self-reliance and the principle that a warrior must never give up, even to the point of obstinacy. They are stubborn in defence and relentless in attack, seeking excellence in all things. Level-headed and wise, they never make decisions rashly and rarely change them once made. They hold personal honour above all and show unusual compassion for ordinary humans.",
    summary: "Stubborn defenders and master craftsmen.",
    curseName: "Unyielding",
    curseLevels: {
      1: { name: "Unrelenting", summary: "Routine (+10) Willpower Test to change mind or reconsider a plan.", full: "The Battle-Brother cannot easily change his mind once he has decided upon something. When the Battle-Brother attempts to reconsider his situation or otherwise change his mind about something, he must pass a Routine (+10) Willpower Test or be forced to remain with his previous decision." },
      2: { name: "Intransigent", summary: "Refuses to compromise; Kill-team Cohesion reduced by 2.", full: "The Battle-Brother is unwilling to compromise and is difficult to reason with. His stubborn nature prevents him from regarding any alternatives. Unable to reconcile with the Kill-team, he chooses only to rely on himself, reducing Cohesion by 2." },
      3: { name: "Obstinate", summary: "Hard (-20) Willpower Test to change mind; shuns all Squad Mode instructions.", full: "The Battle-Brother is slow to decide and unlikely ever to change his views. The Level 1 Willpower Test is now Hard (–20). He cannot benefit from any Squad Mode abilities activated by any other character, as he will not listen to their instructions." }
    }
  },
  "Storm Wardens": {
    modifiers: { S: 5 },
    woundsBonus: 2,
    talents: [],
    soloAbility: "Thunder’s Call",
    restrictions: [],
    startingGear: ["Sacris claymore (replaces combat knife)"],
    demeanorName: "Aspire to Glory",
    demeanorSummary: "Clannish and aloof knights who value personal honor and seek out enemy champions for duels.",
    demeanorDescription: "Storm Wardens are committed to the tenets of personal honour and obligation. Clannish and aloof, they prefer to remain distant from the Imperium at large. A Storm Warden is slow to make friends, but protects companions fiercely. Honor is paramount; word is bond. They enjoy debate and crafting points to support arguments. In battle, they fight with fervor, seeking out enemy champions to test skills against.",
    summary: "Chivalrous highland warriors seeking glory.",
    curseName: "Thirst for Glory",
    curseLevels: {
      1: { name: "No Challenge Unanswered", summary: "Willpower Test to avoid engaging enemies who challenge or taunt.", full: "The Storm Wardens pride does not let him refuse a challenge or the chance for glory. Whenever an enemy challenges or taunts the Battle-Brother, he must make a Challenging (+0) Willpower Test or engage it in combat, favouring melee attacks." },
      2: { name: "A Fair Fight", summary: "Must use weapons of equal measure when answering a challenge.", full: "Overwhelmed with a need to act honourably, the Battle-Brother uses only weapons of equal measure when answering a challenge. If the foe is armed with weapons far inferior, he will cast aside bolter and chainsword and settle the matter with his fists." },
      3: { name: "Honour and Blood", summary: "Hard Willpower Test to disengage from a challenge if wounded.", full: "Storm Wardens seldom back down once a challenge has been accepted. If the Battle-Brother suffers a Wound after accepting a challenge, he must make a Hard (–20) Willpower Test to disengage or stop fighting his foe until it is dead." }
    }
  },
  "White Scars": {
    modifiers: { Ag: 5, WP: 5 },
    talents: [],
    soloAbility: "Swift Strike",
    restrictions: [],
    demeanorName: "Son of the Steppes",
    demeanorSummary: "A balance of wildness and discipline; patient honourable hunters who despise pretension.",
    demeanorDescription: "White Scars are complex individuals, a mix of tribal tradition and Astartes doctrine. They regard civilization trappings with suspicion. In character, they display a balanced mix of wildness and discipline. Often dour and severe, yet supremely honourable with a highly developed sense of justice. Each time they draw upon ferocity, they take a step closer to the precipice of bloodlust, requiring prodigious willpower to control.",
    summary: "Lightning-fast hunters of the steppes.",
    curseName: "Chogorian Savagry",
    curseLevels: {
      1: { name: "A Moment Unrestrained", summary: "Willpower Test (+10) when Charging or consume by reckless fury.", full: "The Battle-Brother’s discipline begins to slip, allowing untamed ferocity to emerge. When Charging an enemy, he must pass an Ordinary (+10) Willpower Test or become consumed by a reckless fury, taking unnecessary risks and pursuing the enemy until slain." },
      2: { name: "Suppressed Rage", summary: "–10 Fellowship; Willpower Test when challenged by an ally.", full: "Within the darkest reaches of the mind lurks the shadow of rage, seeking any opportunity to emerge. This imposes a –10 penalty on Fellowship tests and requires a Challenging (+0) Willpower Test when challenged by an ally to avoid Physical violence." },
      3: { name: "Uncontrolled Battle-lust", summary: "Seeks combat at every opportunity; resist tests suffer an additional –20 penalty.", full: "The Battle-Brother is incapable of suppressing that lust for combat. He will seek combat at every opportunity, and become restless and ill-tempered when there is no battle. The Willpower Tests to resist Levels 1 and 2 suffer an additional –20 penalty." }
    }
  },
  "Black Templars": {
    modifiers: { WS: 5, WP: 5 },
    talents: [],
    soloAbility: "Righteous Zeal",
    restrictions: ["Devastator Marine", "Librarian"],
    implantsNote: "Betcher’s gland and sus-an membrane are non-functional (no benefit).",
    demeanorName: "Zealous",
    demeanorSummary: "Invariably preparing for battle through prayer or training; intolerant of psychic power and alien influence.",
    demeanorDescription: "When not engaged in battle, Black Templars are found preparing for it through prayer, meditation, or exacting training rituals. They forego all but bare necessities to purify themselves. For those seconded to the Deathwatch, fighting alongside a Librarian is a particular trial. They pass every hour not fighting in deep contemplation and prayer, often cloistering themselves away in a personal shrine to the Emperor.",
    summary: "Crusading zealots shunning the warp.",
    curseName: "Burn the Witch",
    curseLevels: {
      1: { name: "Burn the Witch (Lvl 1)", summary: "–20 penalty to Fellowship tests used on characters with psychic abilities.", full: "The Battle-Brother is uncomfortable around psykers and feels their dark powers crawling on his flesh and burrowing into his brain. All Fellowship based tests used on characters with psychic abilities suffer a –20 penalty, as the Battle-Brother’s disquiet shows through." },
      2: { name: "Burn the Witch (Lvl 2)", summary: "Kill-team Cohesion reduced by 1 if a psyker ally is present.", full: "The Battle-Brother can scarcely stand the presence of psykers and abhors their sight. If there is a psyker in the Battle-Brother’s Kill-team (such as a Librarian Player Character) or he must work with a psyker ally, his Kill-team’s Cohesion is reduced by 1 (until such time as the psyker leaves or is killed)." },
      3: { name: "Burn the Witch (Lvl 3)", summary: "Must prioritize killing enemy psykers over all other foes.", full: "The Battle-Brother cannot stand any psykers to live and flies into a rage when he sees them. When fighting enemy psykers, the Battle-Brother must seek them out (choosing the most obviously powerful first) and kill them to the exclusion of all other foes. This can be especially problematic for the Kill-team, should they need to take a psyker alive." }
    }
  }
};

export const ARMOR_ABILITIES: { [key: string]: ArmorAbility } = {
  "Enhanced Strength": {
    name: "Enhanced Strength",
    description: "Increase the Battle-Brother’s Strength by +20. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+15)": {
    name: "Enhanced Strength (+15)",
    description: "Increase the Battle-Brother’s Strength by +15. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+25)": {
    name: "Enhanced Strength (+25)",
    description: "Increase the Battle-Brother’s Strength by +25. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Enhanced Strength (+30)": {
    name: "Enhanced Strength (+30)",
    description: "Increase the Battle-Brother’s Strength by +30. The effect on SB is calculated after the Unnatural Strength multiplier."
  },
  "Auto-Senses": {
    name: "Auto-Senses",
    description: "Dark Sight, Heightened Senses (+10 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Auto-Senses (+5)": {
    name: "Auto-Senses (+5)",
    description: "Dark Sight, Heightened Senses (+5 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Auto-Senses (+15)": {
    name: "Auto-Senses (+15)",
    description: "Dark Sight, Heightened Senses (+15 Sight/Sound), Immunity to photon/stun grenades, Called Shot is a Half Action."
  },
  "Bio-monitor and Injectors": {
    name: "Bio-monitor and Injectors",
    description: "+10 to resist Toxic, 6 doses of pain suppressors (ignore Critical Effects for 1d10 rounds), Stun negated after 1 round."
  },
  "Recoil Suppression": {
    name: "Recoil Suppression",
    description: "Fire Basic weapons 1-Handed. Basic weapons still may not be used in Close Combat."
  },
  "Giant Among Men": {
    name: "Giant Among Men",
    description: "A Space Marine in power armour is Hulking. This increases his Base Movement by 1; however, the grace afforded by his Black Carapace negates the modifier enemies would otherwise have to attack him. He still suffers the usual penalties to Concealment and Silent Move for being heavily armoured."
  },
  "Poor Manual Dexterity": {
    name: "Poor Manual Dexterity",
    description: "-10 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Poor Manual Dexterity (-15)": {
    name: "Poor Manual Dexterity (-15)",
    description: "-15 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Poor Manual Dexterity (-20)": {
    name: "Poor Manual Dexterity (-20)",
    description: "-20 for Delicate tasks. Non-Astartes Ranged Weapons cannot be used."
  },
  "Osmotic Gill Life Sustainer": {
    name: "Osmotic Gill Life Sustainer",
    description: "Environmentally sealed with adequate oxygen supply as long as power is maintained."
  },
  "Vox Link": {
    name: "Vox Link",
    description: "Standard vox and data transmission. View squadmate vitals."
  },
  "Nutrient Recycling": {
    name: "Nutrient Recycling",
    description: "2 weeks without food: Test Toughness or suffer Fatigue. Difficulty increases every 2 weeks."
  },
  "Magnetized Boot Soles": {
    name: "Magnetized Boot Soles",
    description: "Activated to provide Magboots."
  },
  "Noisier": {
    name: "Noisier",
    description: "–10 penalty to Concealment and Silent Move Tests."
  },
  "Not built for stealth": {
    name: "Not built for stealth",
    description: "–10 penalty to Concealment and Silent Move."
  },
  "Legacy of the Great Crusade (+10)": {
    name: "Legacy of the Great Crusade (+10)",
    description: "Squad Leader adds +10 to prevent Cohesion Damage. +20 Fellowship with Space Marines."
  },
  "Legacy of the Great Crusade (+5)": {
    name: "Legacy of the Great Crusade (+5)",
    description: "Squad Leader adds +5 to prevent Cohesion Damage. +20 Fellowship with Space Marines."
  },
  "Clanks and grinds": {
    name: "Clanks and grinds",
    description: "–20 penalty to Concealment and Silent Move."
  },
  "Armored for assault": {
    name: "Armored for assault",
    description: "Rear AP is 6 for all parts."
  },
  "Echoes of brotherhood": {
    name: "Echoes of brotherhood",
    description: "+15 Fellowship with Space Marines."
  },
  "Marked from the heresy": {
    name: "Marked from the heresy",
    description: "+10 Fellowship with Space Marines, –10 penalty with Inquisitors."
  },
  "Lightest variant": {
    name: "Lightest variant",
    description: "+10 bonus to Agility."
  },
  "High collar": {
    name: "High collar",
    description: "Attack on head (8-10 on d10) hits body instead."
  },
  "Mark of command": {
    name: "Mark of command",
    description: "+5 to Command Tests."
  },
  "Terminator Actuators": {
    name: "Terminator Actuators",
    description: "Heavy/Mounted weapons fired one-handed. Auto-Stabilised Trait."
  },
  "Terminator Squad Link": {
    name: "Terminator Squad Link",
    description: "Squad Rank +1 if 2+ Terminators in squad."
  },
  "Sensorium": {
    name: "Sensorium",
    description: "Provides the same capabilities as an auspex."
  },
  "Body Glove": {
    name: "Body Glove",
    description: "+10 to any toughness tests to resist contact poisons, radiation, acids, or chemicals."
  },
  "Anointment of Obfuscation": {
    name: "Anointment of Obfuscation",
    description: "–10 to any Tech-use or Scrutiny tests for anyone trying to detect the wearer."
  },
  "Scout Vox": {
    name: "Scout Vox",
    description: "Long-range (35km), encrypted, multi-band vox system."
  },
  "Interlocutor Beacon": {
    name: "Interlocutor Beacon",
    description: "Identifies wearer as ally; acts as emergency distress beacon."
  },
  "Auto-injector Cuff": {
    name: "Auto-injector Cuff",
    description: "+5 to resist Toxic. 2 doses of pain suppressors (ignore Critical Effects for 1d10 rounds). Negate stun after 1d5 rounds."
  },
  "Slow and steady": {
    name: "Slow and steady",
    description: "A Terminator cannot Run, and the wearer suffers –20 to Agility, and cannot Dodge (but may still Parry)."
  }
};

export interface ArmorPattern {
  name: string;
  head: number;
  torso: number;
  rightArm: number;
  leftArm: number;
  rightLeg: number;
  leftLeg: number;
  abilities: string[];
  historySlots: number;
  strengthBonus?: number;
  autoSensesBonus?: number;
  manualDexterityPenalty?: number;
  imageUrl?: string;
}

export const ARMOR_PATTERNS: { [key: string]: ArmorPattern } = {
  "MK I Thunder": {
    name: "MK I Thunder",
    head: 6, torso: 8, rightArm: 6, leftArm: 6, rightLeg: 4, leftLeg: 4,
    abilities: ["Giant Among Men", "Enhanced Strength (+15)", "Vox Link", "Magnetized Boot Soles", "Nutrient Recycling", "Noisier", "Poor Manual Dexterity (-15)"],
    historySlots: 1,
    strengthBonus: 15,
    manualDexterityPenalty: -15,
    imageUrl: "https://i.ibb.co/hxgHyNqL/MKI.png"
  },
  "MK II Crusade": {
    name: "MK II Crusade",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Giant Among Men", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Not built for stealth", "Legacy of the Great Crusade (+10)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20,
    imageUrl: "https://i.ibb.co/DPq41rP2/MK-II.png"
  },
  "MK III Iron": {
    name: "MK III Iron",
    head: 9, torso: 10, rightArm: 9, leftArm: 9, rightLeg: 9, leftLeg: 9,
    abilities: ["Giant Among Men", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Clanks and grinds", "Armored for assault", "Legacy of the Great Crusade (+5)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20,
    imageUrl: "https://i.ibb.co/0j5pWZgF/MK-III.png"
  },
  "MK IV Maximus": {
    name: "MK IV Maximus",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Echoes of brotherhood", "Poor Manual Dexterity"],
    historySlots: 3,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/mj4zRQ8/MK-IV.png"
  },
  "MK V Heresy": {
    name: "MK V Heresy",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Marked from the heresy", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 5,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/ZpQtMM9N/MK-V.png"
  },
  "MK VI Corvus": {
    name: "MK VI Corvus",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses (+15)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Lightest variant", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 15,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/YFGPZN0y/MK-VI.png"
  },
  "MK VII Aquilla": {
    name: "MK VII Aquilla",
    head: 8, torso: 10, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/gZqNJXL2/MK-VII.png"
  },
  "MK VIII Errant": {
    name: "MK VIII Errant",
    head: 8, torso: 11, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "High collar", "Mark of command", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/Y73xXJCD/MK-VIII.png"
  },
  "Terminator": {
    name: "Terminator",
    head: 14, torso: 14, rightArm: 14, leftArm: 14, rightLeg: 14, leftLeg: 14,
    abilities: ["Giant Among Men", "Enhanced Strength (+30)", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Terminator Actuators", "Terminator Squad Link", "Sensorium", "Poor Manual Dexterity", "Slow and steady"],
    historySlots: 2,
    strengthBonus: 30,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/V8NY8YC/Terminator.png"
  },
  "Artificer": {
    name: "Artificer",
    head: 12, torso: 12, rightArm: 12, leftArm: 12, rightLeg: 12, leftLeg: 12,
    abilities: ["Giant Among Men", "Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10,
    imageUrl: "https://i.ibb.co/Z6k49QdF/Artificer.png"
  },
  "Scout": {
    name: "Scout",
    head: 0, torso: 7, rightArm: 7, leftArm: 7, rightLeg: 5, leftLeg: 5,
    abilities: ["Vox Link", "Body Glove", "Anointment of Obfuscation", "Scout Vox", "Interlocutor Beacon", "Auto-injector Cuff"],
    historySlots: 1,
    strengthBonus: 0,
    autoSensesBonus: 0,
    manualDexterityPenalty: 0,
    imageUrl: "https://i.ibb.co/yc17K2dT/Scout.png"
  }
};

export const ARMOR_HISTORIES: { [key: string]: ArmorAbility } = {
  "None": {
    name: "None",
    description: "No specific history recorded for this suit."
  },
  "Cower Not Before the Enemy": {
    name: "Cower Not Before the Enemy",
    description: "–20 to all Silent Move and Concealment Tests. +10 bonus to Command Tests."
  },
  "None shall escape the Emperor’s Wrath": {
    name: "None shall escape the Emperor’s Wrath",
    description: "+5 bonus to BS. –10 penalty to Dodge in melee."
  },
  "Thine arm be the scourge of the impure": {
    name: "Thine arm be the scourge of the impure",
    description: "+5 WS. When wearing the suit’s helmet, BS tests suffer a –5 penalty."
  },
  "Death is Joy": {
    name: "Death is Joy",
    description: "Add +2 Damage to Critical Damage attacks. Increase damage to a Horde’s Magnitude by 1."
  },
  "A Fury like lightning": {
    name: "A Fury like lightning",
    description: "+5 bonus to Agility, and +1 to Initiative rolls."
  },
  "Thy strength be legend": {
    name: "Thy strength be legend",
    description: "+10 bonus to Strength (added after Unnatural Strength modifications)."
  },
  "Terror be thy friend": {
    name: "Terror be thy friend",
    description: "Wearer gains the Fear (1) Trait against any foe engaged in melee (or increases Fear Rating by 1)."
  },
  "Lead from the front": {
    name: "Lead from the front",
    description: "Add +1 Cohesion to your Squad’s total."
  },
  "Bring Death from Afar": {
    name: "Bring Death from Afar",
    description: "No penalties for moving and firing with pistol/basic weapons on semi/full auto. Heavy weapons count as basic for moving/firing semi/full auto."
  },
  "To forget is to forgive. Forget nothing": {
    name: "To forget is to forgive. Forget nothing",
    description: "Gain the Hatred (choose one) Talent."
  }
};

export const BATTLE_TRAUMAS: BattleTrauma[] = [
  {
    name: "Battle Rage",
    summary: "Singles out enemies for fury; fixated on destruction after Righteous Fury.",
    description: "The Battle-Brother singles out particular enemies for the Emperor’s fury and becomes fixated on killing them. This most often occurs when facing powerful foes such as enemy commanders or war machines. The Battle-Brother is driven to destroy them without regard for lesser foes or anything less than vital Mission Objectives. Whenever the Battle-Brother scores Righteous Fury on a foe, he becomes fixated on its destruction and must kill it. The Space Marine must then direct his attacks against this target to the exclusion of all else until it is slain. When Battle Rage is triggered, the Battle-Brother may make a Challenging (+0) Willpower Test to avoid its effects. The GM may also allow a similar Willpower Test if the Battle-Brother or his Kill-team are clearly in danger from a more powerful source."
  },
  {
    name: "Ear of the Emperor",
    summary: "Potential secret Tertiary Objectives assigned by the Emperor per mission.",
    description: "All Battle-Brothers pray to the Emperor to guide their hand in battle and help them to do their righteous duty. Some, however, hear his voice and even converse with him through their dreams and mediations. For the most part this has no effect on the Battle-Brother’s daily existence, and even his fellow brothers will see little unusual in his constant prayer and religious muttering. Sometimes the Emperor can demand unusual service from the Battle-Brother, which may be at odds with the goals of his Kill-team. At the start of a Mission, the GM rolls a dice. If the result is odd, then the Emperor has chosen the PC for a special Objective which the GM tells him about in secret. This should be a Tertiary Objective and can be literally anything, even something that is completely at odds with the Mission’s primary goal."
  },
  {
    name: "Ancestral spirits",
    summary: "Ancestor personality surfaces for 1d5 hours upon specific trigger events.",
    description: "All Space Marine revere their ancestors, tracing the line of heroes and commanders back to their primarch and the founding of their Chapter. Some experience this connection far more vividly than others and can find themselves having memories of things they didn’t do or places they have not visited. This is known as ancestral spirits, the mind of a long-dead Battle-Brother passed down through the blood—a mind that in times of stress can even push its way to the surface. The GM secretly chooses a trigger for the Battle-Brother based on an event or encounter related to his ancestral spirit. When the trigger event occurs, the Battle-Brother makes a Challenging (+0) Willpower Test or his ancestor surfaces for 1d5 hours. During this time he still has control of himself but his personality may change, he will choose actions that might be out of character, and he may muse wistfully about his role in battles centuries past."
  },
  {
    name: "Righteous contempt",
    summary: "–20 Fellowship when dealing with humans; refusal to seek human assistance.",
    description: "While Space Marines begin their life as men, the implantation of their Chapter’s gene-seed shapes their flesh and mind into something far greater and in the end no longer entirely human. All Battle-Brothers accept this superiority as part of reaching their pinnacle as a warrior and serving the Emperor, but for some it can make them scornful or dismissive of “lesser” beings. The Battle-Brother has no time for those not of the Adeptus Astartes and has, to a degree, lost touch with his humanity. When dealing with humans the character’s Fellowship is lowered by –20. In addition, he never willingly seeks the help of humans, who he views as weak and untrustworthy."
  },
  {
    name: "Endless Redemption",
    summary: "Driven to complete all mission objectives regardless of personal cost or danger.",
    description: "Some Battle-Brothers feel the weight of the Imperium on their shoulders and consider themselves solely responsible for the preservation and protection of the Emperor’s domain. This is where the lines of duty and fanaticism can become blurred, and the reality of battle becomes mired in the individual’s personal zeal. This is known as the endless redemption, a sin of duty carried by the Battle-Brother that can never be repaid regardless of the amount of glory or blood laid at its feet. The Battle-Brother is driven by duty and must not fail at all costs. When undertaking a Mission, he must attempt to complete all Objectives regardless of cost and danger. In extreme circumstances the GM may allow the character a Challenging (+0) Willpower Test to resist this duty and retreat if attempting an Objective would mean almost certain death."
  }
];

export const RELIC_WARGEAR = [
  {
    name: "Armour of the Remorseless Crusader",
    chapter: "Black Templars",
    type: "armor",
    summary: "Artificer Armour with Hexagrammic Wards and Master-Crafted Sanctified Sword.",
    description: "In addition to the normal benefits of artificer armour, hexagrammic wards provide +20 to Tests made to resist psychic effects, and double the suit’s armour points against psychic or warp attacks that deal damage. It retains full armour value against attacks with the Warp Weapon effect. The Armour of the Remorseless Crusader also incorporates a Master-Crafted, Sanctified sword that can extend from the forearm. This artificer armour is one of a trinity crafted by the Black Templars. Each suit is gilded with detestations of the warp and said to have the blood of saints layered into the thousandfolded adamantite of its construction. The Armour of the Pitiless Crusader and the Fearless Crusader remain with the Chapter, but one unit was tithed to the Deathwatch.",
    stats: {
      armor: {
        name: "Armour of the Remorseless Crusader",
        pattern: "Artificer Armour",
        abilities: ["Hexagrammic Wards", "Master-Crafted Sanctified Sword"],
        head: 12,
        torso: 13,
        rightArm: 12,
        leftArm: 12,
        rightLeg: 12,
        leftLeg: 12
      },
      weapon: {
        name: "Armour of the Remorseless Crusader (Sword)",
        damage: "1d10+8 R",
        pen: 6,
        special: "Sanctified, Master-Crafted"
      }
    }
  },
  {
    name: "Chalice of Vision",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Grant +10 to all WS, BS, and Skill Tests, and Unnatural Perception Trait for 1 hour.",
    description: "The shrouded motives of the Omega Vault revealed this ornate gold chalice the day Watch Captain Mordigael assumed his role as Master of the Vigil. Unknown hands engraved it with the image of Sanguinius’ final battle and set a reservoir of a ritual compounds in its base that releases when the cup is filled. The resulting draught can be used in the Rite of Vision, said to grant a Blood Angel the same almost prescient clarity their Primarch possessed. Bearers of the Chalice typically carry a flask of scarlet sacramental wine to use with the relic. Rules: Those who imbibe from the Chalice gain +10 to all WS, BS, and Skill Tests, and the Unnatural Perception Trait for 1 hour. Dire consequences exist for those who violate the strictures against performing the Rite of the Vision too often. At the GM’s discretion, those who drink from the Chalice may experience strange oracular visions that my reveal hints about the future.",
    modifiers: {
      traits: ["Unnatural Perception (Temporary)"]
    }
  },
  {
    name: "Deathroar",
    chapter: "Dark Angels",
    type: "weapon",
    summary: "Plasma Pistol. Maximal setting does not cause Overheats.",
    description: "This venerated Plasma Pistol was recently left to the Deathwatch by Captain Raziel of the Dark Angels, who gave his life to hold a fortress on the edge of the Cellebos Warzone against Chaos sieges until reinforcements arrived. Deathroar contains the power of a heavy weapon in its small casing. The super-heated air around the muzzle as the weapon discharges produces a unique sound reminiscent of predatory felines from which Deathroar derives its name. Rules: Firing Deathroar on Maximal setting does not cause the Overheats Quality.",
    stats: {
      weapon: {
        name: "Deathroar",
        class: "Pistol",
        damage: "2d10+13 E",
        pen: 10,
        special: "Blast(1), Felling (1), Volatile",
        range: "40m",
        rof: "S/-/-",
        clip: { current: 10, max: 10 },
        reload: "3 Full",
        ammoType: "Plasma Flask"
      }
    }
  },
  {
    name: "Frost Blade",
    chapter: "Space Wolves",
    type: "weapon",
    summary: "Master-crafted chain/power weapon. +3 Damage on Critical Hits.",
    description: "Frost blades are master works from the Space Wolves’ Iron Priests—each incredibly rare and prestigious. The teeth of these icy chain weapons are always cut from nigh-unbreakable substances such as Kraken fangs or tempered diamond. The unique power fields enveloping frost blades have a distinct blue cast. Rules: A frost blade combines the best of a chain weapon and a power weapon, and adds +3 Damage when an attack from the weapon causes Critical Damage.",
    stats: {
      weapon: {
        name: "Frost Blade",
        damage: "1d10+11 E",
        pen: 9,
        special: "Balanced, Power Field, Tearing"
      }
    }
  },
  {
    name: "Helm of Varthion",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "+10 to Attack rolls, +3 Weapon Pen, +1 Effective Rank for Cohesion/Solo Mode.",
    description: "Sergeant Varthion is a legend on Watch Fortress Erioch. Long before Warmaster Achilus ever dreamed of conquest through the Warp Gate, the Deathwatch kept vigil over it. In the fourth century of M41, Varthion and his squad destroyed a xenos warhost hundreds of times their number in defence of the Gate. Records conflict as to which side of the Gate originated the enemy assault, but accounts of the aftermath in the control structure are identical. They describe alien corpses of an aspect uncatalogued before or since, “in such volumes that Varthion’s squad stood atop them like Titans astride a demolished hive.” Rules: The Ultramarine Sergeant’s ancient helm contains the pinnacle of augury sensors and prophesier readouts. It grants +10 to all Attack rolls, and unerringly divines the enemy’s weakest point, granting a +3 bonus to the Penetration of any weapon wielded by the helm’s wearer. A dedicated cogitator bank also provides tactical recommendations based on thousands of years of compiled Ultramarines combat theory. This increases the wearer’s effective Rank by 1 for purposes of calculating Cohesion or for Ultramarines Chapter abilities in Solo Mode.",
    modifiers: {
      traits: ["Helm of Varthion (+10 Atk, +3 Pen, +1 Eff. Rank)"]
    }
  },
  {
    name: "Adamantine Mantle",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Negates 2 AP from incoming attacks. +10 to Feint. Foes suffer -10 WS when in Defensive Stance.",
    description: "These intricately worked cloaks take their name from the most common variation: small adamantine scales worked into a protective yet flexible defensive covering. Similar, personalised designs exist, all using unbreakable materials to form an impressive cloak. Each one is the labour of decades by master artificers, who temper each individual scale and thread for maximum resilience. Their work is then blessed by Chaplains before finally being laid upon the shoulders of its first bearer. The mantle protects him not just through its physical strength, but also by making his movements more difficult to predict as the opaque cloak whirls about him in combat. Rules: An adamantine mantle negates 2 points of Armour Penetration from any incoming attack. The wearer gains a +10 to his Opposed Weapon Skill Test to Feint, and if he takes the Defensive Stance Action, foes suffer an additional –10 on Weapon Skill Tests to attack him.",
    modifiers: {
      traits: ["Adamantine Mantle (Negates 2 AP, +10 Feint, -10 Enemy WS in Defensive Stance)"]
    }
  },
  {
    name: "Deathwatch Relic Blade",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Two-handed power weapon. Destroys non-power field weapons on Parry. 25% chance to destroy Power Field weapons.",
    description: "A standard power sword is no better than a flimsy metal spike in the humbling aura of a relic blade. Remembrancer works from the Horus Heresy depict these magnificent power weapons in the hands of its heroes, and accounts can be found through the ages of how their wielders turned the tides of key battles. Few enough have survived the millennia, and only a precious handful of those are reserved for the Deathwatch. Rules: Relic blades take various forms, but are always a great weapon of some fashion. They require two hands for even a Space Marine to wield. A relic blade that successfully Parries a weapon without the Power Field Quality automatically destroys the attacker’s weapon. It has the same effect on weapons used to Parry it, shearing through such inferior defences and striking as though opposition was never rendered. A relic blade has a 25% chance to destroy a weapon normally immune to Power Fields (including one with a Power Field) that is not also a Relic.",
    stats: {
      weapon: {
        name: "Deathwatch Relic Blade",
        damage: "2d10+7 E",
        pen: 9,
        special: "Power Field, Two-handed. Destroys non-Power Field weapons on Parry. 25% chance to destroy Power Field weapons."
      }
    }
  },
  {
    name: "Scapulan Bolter",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Master-crafted bolter with Fire Selector, Targeter, and Melee Attachment. Never Jams. Re-roll 96-100.",
    description: "The Deathwatch of the Jericho Reach is strangely silent about the history of Watch Station Skapula, and how this lethal bolter remains from the abandoned station. Techmarines fortunate enough to examine the advanced weapon frequently debate the number and nature of machine spirits necessary to achieve its flawless performance, but the most widely accepted theories place a union of over one hundred machine spirits within the casing of tenebrous alloys. Rules: In addition to accuracy and power unrivalled in other bolters of its size, the Skapulan Bolter integrates a Fire Selector, a Targeter, and a melee attachment equivalent to a Master-Crafted combat knife. The gun never Jams, and any Attack roll of 96–100 may be re-rolled as the machine spirits —however many they may be— strive for perfection.",
    stats: {
      weapons: [
        {
          name: "Skapulan Bolter",
          class: "Basic",
          range: "120m",
          rof: "S/2/4",
          damage: "2d10+9 X",
          pen: 7,
          clip: { current: 28, max: 28 },
          reload: "Full",
          special: "Accurate, Tearing, Never Jams, Re-roll 96-100",
          ammoType: "Standard Bolt Rounds"
        },
        {
          name: "Skapulan Bolter (Melee)",
          damage: "1d10+2 R",
          pen: 2,
          special: "Master-Crafted"
        }
      ]
    }
  },
  {
    name: "Angelus Bolter",
    chapter: "Blood Angels",
    type: "weapon",
    summary: "Wrist-mounted bolter. Hands-free usage. Special Bloodshard rounds.",
    description: "A bolter variant used exclusively by the Blood Angels and their successor Chapters, the Angelus Bolter is a wrist mounted, drum feed weapon. This allows the Battle-Brother to keep both hands free while laying down a withering hail of close range fire. Angelus Bolters also make use of unique Bloodshard bolt rounds, crafted with monofilament tips, which can cut through armour with ease to deliver the round’s explosive payload. Rules: The Angelus Bolter does not require a Battle-Brother to use either of his hands, though in any Turn in which it is fired, he cannot use the hand or arm mounting the weapon to make other attacks.",
    stats: {
      weapon: {
        name: "Angelus Bolter",
        class: "Basic",
        range: "50m",
        rof: "S/3/-",
        damage: "1d10+9 X",
        pen: 6,
        clip: { current: 36, max: 36 },
        reload: "2 Full",
        special: "Tearing, Wrist-Mounted (Hands-free)",
        ammoType: "Bloodshard Rounds"
      }
    }
  },
  {
    name: "Gilded Boltgun",
    chapter: "Ultramarines",
    type: "weapon",
    summary: "Master-crafted. +10 Fellowship Tests. Reduces Cohesion cost for Ultramarine Squad Mode abilities.",
    description: "Among the oldest and most stable of all the Chapters, the vaults of the Ultramarines are well stocked with some of the finest examples of Imperial weaponry known to exist. One example is the Gilded Boltgun, a master-crafted artificer weapon of unsurpassed beauty and artistry; a weapon fit for a Sector Lord, or a Space Marine Captain. No record remains of how this weapon made its way to the Jericho Reach, but it has been used by some of the most heralded Ultramarines to serve in the Reach. Rules: The Gilded Boltgun is a master craftsmanship weapon. It is also an impressive status symbol, its dazzling radiance plain for all to see, and adds +10 to all Fellowship Tests and Skills Tests based on Fellowship when carried. Ultramarines especially respect a Battle-Brother honoured to carry such a weapon and, while the Battle-Brother wielding the Gilded Boltgun is Squad Leader, all Ultramarine Squad Mode abilities reduce their cohesion cost by 1 (to a minimum of 1).",
    stats: {
      weapon: {
        name: "Gilded Boltgun",
        class: "Basic",
        range: "100m",
        rof: "S/2/4",
        damage: "1d10+9 X",
        pen: 4,
        clip: { current: 30, max: 30 },
        reload: "Full",
        special: "Tearing, Master-Crafted",
        ammoType: "Standard Bolt Rounds"
      }
    },
    modifiers: {
      traits: ["Gilded Boltgun (+10 Fel Tests, -1 Cohesion Cost for Squad Leader)"]
    }
  },
  {
    name: "Hellfire Flamer",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Ignores Natural Armour. Righteous Fury on 9 or 10.",
    description: "Modification of the tech that created Hellfire Bolt Rounds, the Hellfire Flamer was recovered from the Omega Vault shortly after the first reports of Hive Fleet Dagon reached the Watch Fortress. Mixing potent mutagenic acids into the refined promethium mix, the fire from a Hellfire Flamer eats away at chitin and bone with alarming speed, making it an ideal weapon for facing Tyranids. Rules: Hits from a Hellfire Flamer ignore Natural Armour and will inflict Righteous Fury on a die result of 9 or 0.",
    stats: {
      weapon: {
        name: "Hellfire Flamer",
        class: "Basic",
        range: "20m",
        rof: "S/-/-",
        damage: "1d10+9 E",
        pen: 5,
        clip: { current: 6, max: 6 },
        reload: "2 Full",
        special: "Flame, Tearing. Ignores Natural Armour. Righteous Fury on 9 or 10.",
        ammoType: "Hellfire Promethium"
      }
    }
  },
  {
    name: "Raven Pattern Shotgun",
    chapter: "Raven Guard",
    type: "weapon",
    summary: "-30 to Awareness tests to hear shots.",
    description: "Raven Guard scouts are among the best recon the Astartes has to offer, forging ahead of the Chapter, identifying targets for quick strikes and disrupting enemy logistics. For this reason, Raven Guard serving in the Jericho Reach Deathwatch are commonly deployed to strike missions in the Canis Salient, using their stealth to operate behind enemy lines and strike high value Tau targets. During a recent strike mission, shotgun fire gave away a scout’s position and compromised the entire mission. In response, Harl Greyweaver used an ancient technique incorporating flash and sound suppressors into the scout’s muzzle (a long black cylinder attached to the weapon’s barrel) making it completely silent when fired, without reducing damage or the ability to make use of variant forms of ammo. This modification was met with such great success that Greyweaver is willing to provide his time and skill to any Raven Guard who has proven himself worthy of the upgrade. Rules: The weapon as -30 to awareness tests to hear shots made with Raven pattern shotgun. And can be fired within normal range.",
    stats: {
      weapon: {
        name: "Raven Pattern Shotgun",
        class: "Basic",
        range: "30m",
        rof: "S/-/-",
        damage: "1d10+6 I",
        pen: 0,
        clip: { current: 18, max: 18 },
        reload: "Full",
        special: "Reliable, Scatter. -30 to Awareness tests to hear shots.",
        ammoType: "Shotgun Shells"
      }
    }
  },
  {
    name: "Surturs Breath",
    chapter: "Salamanders",
    type: "weapon",
    summary: "Heavy Flamer. Target must make Hard (-20) WP Test or roll on Shock Table.",
    description: "Just as the Salamanders know well how to protect themselves from flame, so too are they adept at its use. Many Salamanders alter their flamer with unique modifications and upgrades they have learned over a long career. One such modified flamer has a reputation with the members of the Deathwatch operating in the Reach. Legend says it once belonged to a particularly vicious Salamander by the name of Surtur who used a unique propellant that made the Flamer shoot at an extended range with terrifying ultraviolet fire. Rules: When a target is hit by the Surtur’s Breath, in addition to its normal effects (i.e. dealing damage and potentially setting the target on fire) they must make a Hard (-20) Willpower Test. If they fail they must roll on the Shock Table (see the Deathwatch rulebook page 277) just as if they had failed a Fear Test. The additional equipment required to store and inject the propellant significantly adds to the bulk of the flamer, making it heavier and more unwieldy than normal.",
    stats: {
      weapon: {
        name: "Surturs Breath",
        class: "Heavy",
        range: "40m",
        rof: "S/-/-",
        damage: "1d10+12 E",
        pen: 5,
        clip: { current: 8, max: 8 },
        reload: "2 Full",
        special: "Flame. Target must make Hard (-20) WP Test or roll on Shock Table.",
        ammoType: "Ultraviolet Promethium"
      }
    }
  },
  {
    name: "Artificer Omnissian Axe",
    chapter: "Deathwatch",
    type: "weapon",
    requiredSpecialization: "Techmarine",
    summary: "Master-crafted. +10 Fel Tests (Machine Cult). Counts as Combi-Tool.",
    description: "Among the cog-toothed power axes of the Tech-Marines there also exist rare and ancient examples of artificer tech. These potent weapons combine all the brutal power of the Astartes Pattern Omnissian Axe with forgotten forgings and flawless craftsmanship. Rules: In addition to its improved profile, an Artificer Omnissian Axe is also always a master-crafted melee weapon and adds +10 to Fellowship Tests when dealing with members of the Machine Cult. Like an Astartes Pattern Omnissian Axe it also counts as a Combi-Tool.",
    stats: {
      weapon: {
        name: "Artificer Omnissian Axe",
        damage: "1d10+9 E",
        pen: 7,
        special: "Power Field, Unbalanced, Master-Crafted, Combi-Tool, +10 Fel (Machine Cult)"
      }
    },
    modifiers: {
      traits: ["Artificer Omnissian Axe (+10 Fel vs Machine Cult)"]
    }
  },
  {
    name: "Chogoris Lightning Blade",
    chapter: "White Scars",
    type: "weapon",
    summary: "Ancient silver power sword. Light as a feather when activated.",
    description: "An ancient White Scars relic, the Chogoris Lightning Blade is a dazzling silver power sword with a jagged blade crafted in the shape of a lightning bolt. Seemingly heavy and unbalanced upon first inspection, the sword appears more a ceremonial piece than the true weapon of war. When its power field is activated it springs to life, blue radiance arcing from its edge and intricate, hidden suspensors in its hilt making it as light as a feather. The Chogoris Lightning Blade was passed to the Deathwatch by the White Scars Battle-Brother Kubilei upon his death fighting near the Hadex Anomaly.",
    stats: {
      weapon: {
        name: "Chogoris Lightning Blade",
        damage: "1d10+7 E",
        pen: 10,
        special: "Balanced, Power Field"
      }
    }
  },
  {
    name: "Cruciform of the Crusade",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Counts as Thunder Hammer (Pen 0, No Power Field). Squad Mode abilities cost -1 Cohesion (min 1).",
    description: "In the early days of the Achilus Crusade there were many bloody battles to establish the Imperium’s foothold within the Jericho Reach. In one such battle a squad of Battle-Brothers was dispatched to deal with the emergence of a Chaos Cult during the Argoth uprisings. In the course of the battle the Battle-Brothers were forced to make a stand in an Imperial Chapel, where they held their ground for several days. At one point in the fighting a heretic missile knocked the Aquila down from the chapel’s spire. Enraged by the affront to the God-Emperor one of the Battle-Brothers dropped his weapons and hefted the eight foot stone cross and eagle on his shoulder, charging the heretic lines, instantly followed by his brothers and ending the battle in less than an hour of bloody carnage. Since then, the Aquila, known as the Cruciform of the Crusade, has been a relic for the Deathwatch of the Jericho Reach. Rules: The cross may be carried into battle by a Battle-Brother or by one of their followers. The cross takes two hands to hold so a character who carries it can carry no other weapons, though it counts as an Astartes Thunder Hammer, with a Pen of 0 and no Power Field (see Deathwatch page 155) when wielded in melee. In addition, when in the presence of the cross, all Squad Mode abilities cost one less Cohesion point to activate (to a minimum of 1).",
    stats: {
      weapon: {
        name: "Cruciform of the Crusade",
        damage: "2d10+5 I",
        pen: 0,
        special: "Concussive, Unwieldy, Two-handed. -1 Cohesion Cost for Squad Mode abilities."
      }
    },
    modifiers: {
      traits: ["Cruciform of the Crusade (-1 Cohesion Cost)"]
    }
  },
  {
    name: "Duelling Tulwar",
    chapter: "White Scars",
    type: "weapon",
    summary: "Free Standard Attack when using Defensive Stance.",
    description: "Reputed to have its origins from the mountain tribes of Chogoris, the Duelling Tulwar is a White Scars ritual weapon. Its short, curved blade makes it ideal for quick, short cuts, allowing the wielder greater speed in combat, switching between defensive and offensive stances with a flick of his wrist. Rules: The Duelling Tulwar allows a Battle-Brother to make a single Standard Attack as a Free Action with the weapon when he uses the Defensive Stance Action.",
    stats: {
      weapon: {
        name: "Duelling Tulwar",
        damage: "1d10+2 R",
        pen: 0,
        special: "Balanced, Primitive. Free Attack on Defensive Stance."
      }
    }
  },
  {
    name: "Glaive Encarmine",
    chapter: "Blood Angels",
    type: "weapon",
    summary: "Two-handed power weapon. Balanced.",
    description: "The Glaives Encarmine are broad two-handed blades wielded by the Sanguinary Guard. Crafted long ago by using forgotten methods and techniques, few weapons in the Blood Angels armouries approach the elegance and mastery of manufacture embodied in the Glaive Encarmine. In battle, a skilled Battle-Brother can wield such a weapon as easily as he might a combat knife, sweeping it back and forth in swift, graceful arcs of death and taking life with each effortless blow. Rules: A Glaive Encarmine requires two hands to use.",
    stats: {
      weapon: {
        name: "Glaive Encarmine",
        damage: "2d10+2 E",
        pen: 6,
        special: "Balanced, Power Field, Two-handed"
      }
    }
  },
  {
    name: "Honour Blades",
    chapter: "Ultramarines",
    type: "weapon",
    summary: "Broadsword & Poniard set. Grants Wall of Steel and +20 Parry.",
    description: "Presented to champions of the Chapter, Honour Blades are a matching Broadsword and Poniard power blade set. Wielded together, the blades are perfectly matched and provide the champion with an expert defence and attack. Rules: When used together, Honour Blades grant the wielder the Wall of Steel Talent unless he already has it, and also grant a further +20 to Parry Tests (in addition to the +10 for the Balanced Special Quality).",
    stats: {
      weapon: {
        name: "Honour Blades",
        damage: "1d10+5 E",
        pen: 6,
        special: "Balanced, Power Field. Grants Wall of Steel. +20 to Parry Tests."
      }
    },
    modifiers: {
      talents: ["Wall of Steel"],
      traits: ["Honour Blades (+20 Parry)"]
    }
  },
  {
    name: "Needle of Truth",
    chapter: "Dark Angels",
    type: "weapon",
    summary: "Power sword. Daemons/Heretics suffer -20 WP Tests if they see it.",
    description: "It is the task of the Dark Angel Interrogator-Chaplains to extract truth from those captured by the Chapter, as well as protect its secrets and maintain its spiritual well being. The Needle of Truth is an ancient blade which was taken by the Chapter to the Jericho Reach to uncover the secrets this new sector harboured, especially rumours of the Fallen. Rules: In addition to being a finely crafted power sword, the Needle of Truth has a terrible power over heretics and while its blade is bared any daemon or follower of the Dark Gods suffers a –20 penalty to all Willpower Tests provided they can draw line of sight to it.",
    stats: {
      weapon: {
        name: "Needle of Truth",
        damage: "1d10+7 E",
        pen: 6,
        special: "Balanced, Power Field. -20 WP to Daemons/Heretics in LoS."
      }
    },
    modifiers: {
      traits: ["Needle of Truth (-20 WP to Daemons/Heretics)"]
    }
  },
  {
    name: "Power Lance",
    chapter: "White Scars",
    type: "weapon",
    summary: "Reach (2m). Charge from vehicle/beast adds SB to damage.",
    description: "A signature weapon of the White Scars, the Power Lance mounts a power blade on the end of a long shaft. This makes the weapon ideal for charging from the back of vehicles or striking at foes while beyond the reach of their weapons. Rules: When making a Charge Action with a Power Lance from the back of a beast or vehicle, the Battle-Brother adds additional damage equal to his Strength Bonus. The Battle-Brother can strike foes with a Power Lance up to 2m away from himself and does not count as being engaged in melee combat with them unless they also have a similar reach with their weapons.",
    stats: {
      weapon: {
        name: "Power Lance",
        damage: "1d10+6 E",
        pen: 7,
        special: "Power Field. Reach (2m). Charge from vehicle/beast adds SB damage."
      }
    }
  },
  {
    name: "The Righteous Fist",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Power Fist. +8 Damage vs Hulking or larger targets.",
    description: "A weapon from the first battles against Hive Fleet Dagon, the Righteous Fist is a massive pitted and scarred powerfist reputed to have crushed the skull of a Carnifex with a single blow. Repaired by the Tech Marines of Watch Fortress Erioch, the Fist excels at taking on large targets, where its oversized grip is perfect for massive necks and limbs. Rules: When attacking a target of Hulking size or larger (see Deathwatch page 134) the Battle-Brother adds +8 to any damage he deals with the Righteous Fist.",
    stats: {
      weapon: {
        name: "The Righteous Fist",
        damage: "2d10+SBx2 E",
        pen: 9,
        special: "Power Field, Unwieldy. +8 Damage vs Hulking+ targets."
      }
    }
  },
  {
    name: "Rune Staff",
    chapter: "Space Wolves",
    type: "weapon",
    requiredSpecialization: "Librarian",
    summary: "Force Staff. Channel psychic powers on hit instead of extra damage.",
    description: "Rune Staff is as much a symbol of power as it is a weapon. Rune Staffs are used to enhance a Rune Priest’s powers, helping him to channel his gift into powerful blows, much like the method used to turn a force weapon into a lethal instrument of death. Rules: Rune Staff counts as a Force Staff (see Deathwatch page 155). When he strikes a foe he can channel his power as normal (making a Focus Test opposed by his target’s Willpower), but instead of inflicting additional damage, he can trigger one of his psychic powers as a Free Action, with a Psy Rating of 1 for each degree of success he scores over his target. Only powers with a specified target can be used in this way and must be targeted at the creature being struck with the Rune Staff. This trigger ignores the restrictions on using multiple psychic powers in a turn. Only a Rune Priest (Space Wolves Librarian) can use a Rune Staff.",
    stats: {
      weapon: {
        name: "Rune Staff",
        damage: "1d10+1 I",
        pen: 0,
        special: "Balanced, Force. Channel psychic power on hit."
      }
    }
  },
  {
    name: "The Shadow in the Sky",
    chapter: "Raven Guard",
    type: "weapon",
    summary: "Power Sword. Grants Precise Blow Talent and +10 Parry.",
    description: "An ancient weapon of the Chapter, the Shadow in the Sky is a long, curved power sword like the talon of a bird. Perfectly balanced and with a razor’s edge, it seems to move with a mind of its own when in the hands of a Raven Guard Battle-Brother. Rules: A Battle-Brother that wields the Shadow in the Sky gains the Precise Blow Talent unless he already has it, and a +10 on all Parry Tests (in addition to the +10 for the weapon’s Balanced special quality).",
    stats: {
      weapon: {
        name: "The Shadow in the Sky",
        damage: "1d10+5 E",
        pen: 6,
        special: "Balanced, Power Field. Grants Precise Blow. +10 Parry."
      }
    },
    modifiers: {
      talents: ["Precise Blow"],
      traits: ["The Shadow in the Sky (+10 Parry)"]
    }
  },
  {
    name: "Shard of Bekrin",
    chapter: "Deathwatch",
    type: "weapon",
    summary: "Broken Power Sword. +10 Fel (Astartes). Felling (2) vs Tyranids.",
    description: "Among those defending the Shrine World of Bekrin from the invasion of Hive Fleet Dagon was Tarvos, a Blood Angel Battle-Brother in the service of the Deathwatch. During the evacuation of the world’s clergy, Tarvos gave his life defeating a Hive Tyrant in a glorious display of heroism. Though his body was not recovered, his broken power sword was returned to the armoury of Watch Fortress Erioch. Remarkably, the weapon still hums with power though half its length is gone, and those that look upon its stained blade at once feel the power of the brother who once wielded it. The blade has since become a relic of the Deathwatch in the Jericho Reach and has found use both as an icon of valour and a weapon, especially against the Tyranid Swarms. Rules: The Shard of Bekrin grants those carrying it +10 Fellowship when dealing with Adeptus Astartes. In addition, when used against Tyranids it gains the Felling (2) Special Quality.",
    stats: {
      weapon: {
        name: "Shard of Bekrin",
        damage: "1d10+4 E",
        pen: 5,
        special: "Power Field, Unwieldy. +10 Fel (Astartes). Felling (2) vs Tyranids."
      }
    },
    modifiers: {
      traits: ["Shard of Bekrin (+10 Fel vs Astartes)"]
    }
  },
  {
    name: "Great Wolf Pelt",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "Counts as Wolf Pelt. +10 Fel (Space Marines). +20 Loyalty to Fenrisian Wolf Followers.",
    description: "Among the wargear of the Space Wolves are wolf pelts from some of the greatest Fenrisian Wolves to serve the Chapter. Some of these pelts are large even for a Space Marine, trailing behind them and hanging over their armour like a tide of fur. A Battle-Brother wearing such a pelt honours the memory of the wolf by carrying it once more into battle. Rules: A Great Wolf Pelt counts as a Wolf Pelt (see Deathwatch page 170) and adds +10 to all Fellowship Tests when dealing with Space Marines. A Great Wolf Pelt never truly loses its smell and, while wearing it, the Loyalty of any Fenrisian Wolf Followers the Battle-Brother has is increased by +20.",
    modifiers: {
      traits: ["Great Wolf Pelt (+10 Fel vs Space Marines, +20 Wolf Loyalty)"]
    }
  },
  {
    name: "Salamanders' Mantle",
    chapter: "Salamanders",
    type: "wargear",
    summary: "Counts as Adamantine Mantle. Immune to Fire.",
    description: "Crafted from the skins of the lava salamanders native to Nocturne, the Salamanders’ Mantle is a scaled cloak worn by heroes of the Chapter. As well as the status symbol of wearing such a mantle, the scales of the Nocturne salamanders also provide unrivalled protection against fire. Rules: The Salamanders’ Mantle counts as an Adamantine Mantle (Deathwatch page 168), and while a Battle-Brother is wearing it he cannot be set on fire and need never take an Agility Test to see if he is set on fire when hit by weapons with the Flame Special Quality.",
    modifiers: {
      traits: ["Salamanders' Mantle (Immune to Fire)"]
    }
  },
  {
    name: "Mantle of the Fallen Wolf",
    chapter: "Space Wolves",
    type: "wargear",
    summary: "Counts as Wolf Pelt. Squad Leader: +2d10 Req, -10 Renown req for gear.",
    description: "Wolf Priests are the spiritual leaders and councillors of the Chapter and well–respected by all Battle-Brothers. The mantles of the Wolf Priests are usually crafted from the furs of the great wolves of Fenris and are adorned with tokens and fetishes of the Chapter. The Mantle of the Fallen Wolf is one such item, passed to the Jericho Reach Deathwatch by its previous owner who fell defeating a greater daemon in the Hadex Anomaly. To wear such a cloak is a great honour and marks out a Battle-Brother as a trusted member of his Chapter and a respected member of the Adeptus Astartes. Rules: The Mantle of the Fallen Wolf counts as a Wolf Pelt (see Deathwatch page 170). In addition, if the Battle-Brother is Squad Leader, once the mantle is acquired (using Renown and Requisition), it adds an additional 2d10 Requisition points to the Kill-team’s Requisition pool and reduces the Renown restriction of all weapons, armour, and gear (though not relics or Chapter specific items) by 10.",
    modifiers: {
      traits: ["Mantle of the Fallen Wolf (Squad Leader bonuses)"]
    }
  },
  {
    name: "Artificer Bionics",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Upgrades Exceptional Cybernetics. Increases bonus by +10.",
    description: "The Iron Hands are masters of bionics and often replace undamaged limbs with cybernetics to enhance themselves with greater strength, speed, or endurance. Artificer Bionics represents the height of this craft and the greatest examples of cybernetics available to the Imperium. Rules: Artificer Bionics is an upgrade for any kind of Exceptional Cybernetics (see Deathwatch page 176), increasing the bonus the bionic component provides by +10. Thus an Exceptional Bionic arm would provide +20 to Tech-Use and Strength Tests while a Cybernetic Sense would add +30 to rolls to resist attacks on that sense. In the case of Cybernetics which don’t provide bonuses, the Battle-Brother gains a +10 to Characteristic Tests when they directly relate to the use of the Cybernetic.",
    modifiers: {
      traits: ["Artificer Bionics (+10 to Cybernetic bonuses)"]
    }
  },
  {
    name: "Omni-Tool",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Improved Combi-Tool. +20 Tech-Use. Repair servitors (1d5 dmg).",
    description: "Through the Millennia the Forge Masters of Watch Fortress Erioch work to master and perfect the technology of the Deathwatch, often creating devices far superior to those used in the Imperium at large. This is the case with the Omni-Tool, an improved version of the ubiquitous Combi-Tool. Rules: For all intents and purposes, the Omni-Tool functions as a Combi-Tool, though it adds +20 to Tech-Use Skill Tests rather than +10. The Omni-Tool is also specifically designed to repair bionics and servitors and, as a Full Action, a Battle-Brother may remove 1d5 Damage from a servitor provided it has at least 1 Wound remaining.",
    modifiers: {
      traits: ["Omni-Tool (+20 Tech-Use, Repair Servitors)"]
    }
  },
  {
    name: "Blood Chalice",
    chapter: "Blood Angels",
    type: "wargear",
    requiredSpecialization: "Sanguinary Priest",
    summary: "Full Action to restore full Wounds, remove Fatigue/Damage/Crit. Costs 1 Fate Point.",
    description: "Blood Chalices were said to have contained the very essence of Sanguinius himself. Lost through war and catastrophe over the centuries, only a handful of Blood Chalices now remain; they are only entrusted to the most faithful and deserving members of the Chapter. Rules: A Battle-Brother may drink from the Blood Chalice (as a Full Action) and restore himself to his full complement of wounds, removing any Fatigue, Damage, or Critical Damage he has taken (though not restoring lost limbs or other permanent injuries). Drinking of the Chalice is not without its cost, however, and every time a Battle-Brother does so he must spend a Fate Point. Only Sanguinary Priests are ever entrusted with a Blood Chalice.",
    modifiers: {
      traits: ["Blood Chalice (Heal Full Wounds for 1 Fate Point)"]
    }
  },
  {
    name: "Blood of Heroes",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "+1d5 Cohesion. Enter Squad Mode as Free Action once per mission.",
    description: "It was during the first battles of the Greyhell front against the accursed Tau that the Blood of Heroes was created. The Chapter records that a single Blood Angel, outnumbered and alone, stood against an entire cadre of alien warriors, blessed by a single drop of blood from each of his fallen brothers gathered in a vial and held close to his chest. The Battle-Brother claimed his brothers spoke to him through their blood and strengthened his will to survive against his foes. After testing the truth of the Battle-Brother’s tale, the Chapter’s Chaplains declared the gathered blood a relic of the Reach and a reminder of the duty all Blood Angels owe to the Crusade. If a Battle-Brother carries the Blood of Heroes into battle, he will feel the presence of the essence of the fallen warriors it holds. Rules: The Battle-Brother adds 1d5 Cohesion to the group, whether he is the leader or not, and once during the Mission may enter Squad Mode as a Free Action without the need to make a test.",
    modifiers: {
      traits: ["Blood of Heroes (+1d5 Cohesion, Free Squad Mode 1/mission)"]
    }
  },
  {
    name: "Death Mask",
    chapter: "Blood Angels",
    type: "wargear",
    summary: "Fear Rating 1 (Cumulative).",
    description: "Fashioned from the likenesses of the fallen, Blood Angel heroes wear Death Masks both to honour the dead and strike terror into their foes. There can be no denying their power when one sees the coruscating golden energy arching across the mask’s surface and the baleful light shining from its eyes. Rules: A Battle-Brother wearing a Death Mask gains a Fear Rating of 1. This Fear Rating is cumulative with the Fear Rating gained for other sources such as psychic powers or wargear (i.e. Winged Jump Pack). A Death Mask is worn over a Battle-Brother power armour helmet and provides no additional protection.",
    modifiers: {
      traits: ["Death Mask (Fear 1, Cumulative)"]
    }
  },
  {
    name: "Digital Housing",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Bionic Arm Upgrade. Incorporate Digital Flamer, Laser, or Melta.",
    description: "Unlike limbs of flesh and blood, bionic attachments can often be modified, changed, or altered prior to battle simply by removing a few bolts. Originally used by Forge Master Greyweaver when he waded into combat, Digital Housing is an upgrade for a bionic arm which allows the user to incorporate an Astartes Digital Weapon into his cybernetic limb. Those Iron Hands that make a name for themselves at Watch Fortress Erioch have a chance to acquire one of the few Digital Housings that have been crafted by the Forge Master in his time in service to the Deathwatch. Rules: Before each mission, the Battle-Brother with the Digital Housing can then choose to have his arm fitted with either a Digital Flamer, Digital Laser, or Digital Melta weapon (see Deathwatch page 153). The weapon follows all the normal rules for firing ranged weapons (though as it is part of the bionic arm it cannot be dropped) and the Battle-Brother cannot use his arm for any other task when firing it.",
    modifiers: {
      traits: ["Digital Housing (Digital Weapon in Bionic Arm)"]
    }
  },
  {
    name: "Exsanguinator",
    chapter: "Blood Angels",
    type: "wargear",
    requiredSpecialization: "Sanguinary Priest",
    summary: "Counts as Narthecium and Combat Knife. +5 Renown for harvesting Blood Angel gene-seed.",
    description: "Used by Sanguinary Priests to harvest the gene-seed of fallen comrades, the Exsanguinator is both a sophisticated medical device and close quarters weapon. When a Battle-Brother falls in combat, it is the duty of the Sanguinary Priests to either restore him or safeguard his genetic heritage for future Battle-Brothers, storing it away in the Exsanguinator. Rules: An Exsanguinator counts as a Narthecium (see Deathwatch page 173) in all respects. Additionally, in any Mission in which it is used to harvest the gene-seed of a fallen Blood Angel, the Battle-Brother receives bonus +5 Renown. Exsanguinators also count as Astartes combat knives in combat.",
    stats: {
      weapon: {
        name: "Exsanguinator (Combat Knife)",
        damage: "1d10 R",
        pen: 2,
        special: "Counts as Narthecium. +5 Renown (Blood Angel gene-seed)."
      }
    },
    modifiers: {
      traits: ["Exsanguinator (Narthecium, +5 Renown on harvest)"]
    }
  },
  {
    name: "First Company Relic",
    chapter: "Ultramarines",
    type: "wargear",
    summary: "Fearless Talent. +20 Opposed Tests vs Tyranids. Squad Leader shares benefits with Ultramarines.",
    description: "When the Ultramarines lost their First Company during the defence of Macragge against Hive Fleet Behemoth, it was a terrible blow to the Chapter and it took them many years to fully recover. Watch Captain Prascus of the Jericho Reach is known for carrying around a small, rent piece of armour from their last stand. He claims that the memory of his Battle-Brothers’ sacrifice emboldens him in combat. Inspired by Prascus’ devotion, many Ultramarines serving in the Jericho Reach have begun carrying such tokens. Rules: A Battle-Brother bearing a First Company Relic gains the Fearless Talent. Such relics also steel the Battle-Brother’s will against the influence of Tyranids, as they remember the price paid by their brothers and struggle harder to resist. The Battle-Brother gains a +20 bonus on any Opposed Tests made against Tyranids. If the Battle-Brother is Squad Leader, then all the benefits of the relic are also passed on to any Ultramarines in his squad.",
    modifiers: {
      talents: ["Fearless"],
      traits: ["First Company Relic (+20 Opposed vs Tyranids, Share with Ultramarines)"]
    }
  },
  {
    name: "The Glorious Standard",
    chapter: "Deathwatch",
    type: "wargear",
    summary: "Allies in LoS: Free Squad Mode, +10 WP.",
    description: "The Adeptus Astartes have a history of many proud and glorious victories; they stand for the might of the Emperor and His triumph over His foes. The Glorious Standard recounts this legacy in a complex pattern of images and heraldry, from the carnage and fire of the Horus Heresy through the first clashes with the Tyranids to their current exploits, such as supporting the Achilus Crusade. Rules: A Battle-Brother that carries the Glorious Standard becomes a rally point for the Astartes, infusing them with the righteousness of the Emperor. While it is held aloft, any Battle-Brother which can draw line of sight to the Glorious Standard may enter Squad Mode as a Free Action without a test. Furthermore they gain a +10 on all Willpower Tests.",
    modifiers: {
      traits: ["The Glorious Standard (Allies in LoS: Free Squad Mode, +10 WP)"]
    }
  },
  {
    name: "The Heart of Iron",
    chapter: "Iron Hands",
    type: "wargear",
    summary: "Regeneration (5) Trait. Immune to Fatigue. Drains Toughness over time.",
    description: "A relic of the Dark Age of Technology, the Heart of Iron is a bionic of a kind unknown outside the vaults of the Iron Hands. Worn under armour, it looks not unlike a mechanical spider wrapped around a Battle-Brother’s chest, where it links to his organs via monofilament tendrils and maintains his life (keeping his twin hearts beating) despite even the most terrible of injuries. Rules: A Battle-Brother that bonds with the Heart of Iron gains the Regeneration (5) Trait and becomes immune to the effects of Fatigue. The heart comes at a cost however; if it is worn for lengthy periods it slowly drains a Battle-Brother’s vitality even as it strives to keep his organs functioning. If the heart is worn for more than a single mission, the Battle-Brother suffers 1d10+5 temporary damage to his Toughness, with each further mission inflicting another 1d10+5 temporary Toughness damage. If it is not removed and the Battle-Brother’s Toughness is reduced to 0 or less he will die.",
    modifiers: {
      traits: ["Regeneration (5)", "The Heart of Iron (Immune to Fatigue, Toughness Drain)"]
    }
  },
  {
    name: "Pain Glove",
    chapter: "Imperial Fists",
    type: "wargear",
    summary: "Used post-mission. Bonus Insanity/Corruption removal when spending XP.",
    description: "A tool of both torture and penitence, the Pain Glove is a cage of ancient technology and cunning design that the Imperial Fists have used for centuries to test their strength, punish the unworthy, and cleanse themselves. Rules: Unlike other kinds of wargear, the Pain Glove can only be used after a mission is over (in the downtime between missions), though it must still be acquired using the requisition for the mission. After a mission, the Battle-Brother can enter the Pain Glove to cleanse himself and reaffirm his faith in the Emperor and the Chapter. When the player spends experience points to buy off Insanity or Corruption (see Deathwatch page 282) he will lose an additional 1d5 Insanity Points and 1 Corruption Point with the aid of the Pain Glove.",
    modifiers: {
      traits: ["Pain Glove (Bonus Insanity/Corruption removal)"]
    }
  },
  {
    name: "Promethean's Blessing",
    chapter: "Salamanders",
    type: "wargear",
    summary: "Weapon Upgrade (Chain/Power). Adds Flame Quality.",
    description: "Chain and power weapons are often deadly enough, especially in the hands of the Astartes, but Chapters sometimes modify these weapons to enhance their already impressive effects. One such modified device is known as Promethean’s Blessing. Gifted to the armoury of Watch Fortress Erioch in a forgotten age, this device is an inverse heat sink, which uses the excess power generated by the motor of a chain blade or the charge core of a power weapon to project flame along its edge. Rules: This has little extra effect on the weapon’s damage (a few flames are only a distraction when adamantine teeth are tearing open your flesh), but does have a chance of setting the target on fire, just as if the weapon had the Flame Special Quality. Promethean’s Blessing is a weapon upgrade which can be applied to any chain or power melee weapon.",
    modifiers: {
      traits: ["Promethean's Blessing (Adds Flame Quality to Chain/Power Weapon)"]
    }
  }
];

export const SPECIAL_WARGEAR = [
  { 
    name: "Auspex", 
    summary: "+20 Awareness Tests. Tech-Use Test to detect invisible gases, bio-signs, or radiation (50m range).",
    description: "These devices are used to detect energy emissions, motion, and biological life signs. A character using an auspex gains a +20 bonus to Awareness Tests and may make a Tech-Use Test to spot things not normally detectable to human senses alone, such as invisible gases, nearby bio-signs, or ambient radiation. The standard range for an auspex is 50m, though walls more than 50cm thick and certain shielding materials can block the scanner." 
  },
  { 
    name: "AUTO-SENSE GOGGLES", 
    summary: "Vision enhancements (photo-visor, preysense +20). Laser range finder grants +20 to allied artillery/aerospace BS.",
    description: "These bulky goggles (most often worn by Space Marine Scout snipers) provide the wearer with a number of vision enhancements. There are many models and variants of these goggles. Many of them combine the effects of photo-visors (no penalties due to darkness) and preysense (+20 to vision based Perception Tests at night or in the dark) sights, can detect and see a broad range of radioactivity frequencies, can record pict-captures, have a 5x optical enhancement, 5x micromagnification, and a number of coloured filters that can be flipped in and out of the view ports. These goggles also have an integral laser range finder that allows the wearer to act as a forward observer or fire controller for artillery and aerospace units by pinpointing targets, calculating firing solutions, and broadcasting the data to waiting units. When using the laser range finder to guide artillery or aerospace fire, the forward observer grants +20 to the allied unit’s Ballistic Skill Test." 
  },
  { 
    name: "Back banner", 
    summary: "Leader restores 1 bonus Cohesion point when spending a Fate Point for Cohesion.",
    description: "Back banners fly on ornate poles wrought with the Deathwatch symbol and icons of Imperial faith, mounted on a backpack power unit or rising from between the shoulder blades. These elaborate banners often tower as tall again as the Battle-Brother’s height itself, heralding the valour of the Emperor’s avenging angels to brother and foe alike. When the Kill-team’s leader spends a Fate Point to restore a point of Cohesion, he restores one bonus point of lost Cohesion if he is wearing a back banner." 
  },
  { 
    name: "CAMELEOLINE TARPAULIN", 
    summary: "+30 to all Concealment Tests for vehicles and emplacements.",
    description: "These thin, resilient tarpaulins are made of sheets of photosensitive, colour-shifting fabric that can take on the appearance of their surroundings. Issued in five metre by five metre sheets, cameleoline tarps can be hooked together to hide anything from a land speeder to a rhino to an entire encampment. Use of cameleoline tarps to hide vehicles and emplacements grants the user a +30 to all Concealment Tests." 
  },
  { 
    name: "Camo-cloak", 
    summary: "+20 Concealment Tests. When stationary, wearer counts as one range bracket farther away.",
    description: "A sharpshooter wearing a camo-cloak gains a +20 bonus to all Concealment Tests. When stationary, the wearer counts as being one range bracket farther away when targeted by ranged weapons." 
  },
  { 
    name: "Cartograph", 
    summary: "+10 Navigation (Surface) Tests. Tracks coordinates, provides bearing to locations, and stores maps.",
    description: "This specialised data-slate accepts geographical and navigational information on a planet, either from existing data-banks or gathered by a ship’s Augur Arrays in orbit. Its geo-locator tracks the user’s planetary coordinates, enabling it to provide distance and bearing to any known location. This provides a +10 to all Navigation (Surface) Tests. It is also capable of storing detailed maps and schematics, which can be useful for objective approach planning. Many cartographs are also equipped with a small holo-projector that displays three-dimensional maps of its contents." 
  },
  { 
    name: "Charm", 
    summary: "Keepsake or holy relic. (Player: add details below).",
    description: "A charm is a keepsake, holy relic, or good luck token that is intended to draw the benevolent eye of the Emperor, a Primarch, or other patron to the bearer. They take myriad forms including such things as fragments of blessed bolter casings, water from holy seas, and pelts of sacred animals." 
  },
  { 
    name: "Chrono", 
    summary: "Dependable timepiece.",
    description: "Chronos are timepieces, which are dependable and simple to use. General models are usually hand-held or worn on the wrist, while Space Marines typically rely on the ones built into their armour." 
  },
  { 
    name: "CLAVIS", 
    summary: "Bypasses Imperial locks/defences. +30 Security Test. +10 Medicae on wearer.",
    description: "A clavis is a special silvered vambrace, a piece of armour granted to Space Marines upon becoming a Deathwatch Keeper. Created during the Dark Age of Technology, the workings of the clavis are not fully understood by the Adeptus Mechanicus, but it is known that it interfaces with the Space Marine’s nervous system and monitors his vital signs. The clavis acts as a unique and complex key that contains a myriad of Inquisitional override codes and other, more arcane systems that allow it to bypass nearly any technological seal. The clavis communicates with light, vibration, and other, less-known means to unseal magnetic locks and shield barriers at the Keeper’s command. Servitors and other autodefences register the Keeper as a friend and stand down in his presence. The clavis is what allows a Keeper to walk his vigil undisturbed and reach nearly any secure zone. Effect: The clavis bypasses nearly any Imperial lock, seal, or automated defence system. If a roll is required, the clavis allows its wearer full use of the Security Skill even if he does not possess it, and in addition adds a +30 bonus to any Security Test. In addition, Medicae Tests used on the wearer of a clavis gain a +10 bonus due to the device’s ability to monitor its wearer’s vital information." 
  },
  { 
    name: "Codex Astartes", 
    summary: "Sacred text of Roboute Guilliman. Guiding doctrine for most Chapters.",
    description: "The entirety of the Codex Astartes fills immense librariums, but many Space Marines carry the heart of this sacred text into battle. Of course, interpretations of what passages form the core of the codex vary even more than the forms it has been transcribed into over the millennia since the Second Founding. From hand-copied tomes bound in etched leather to crystal-circuited datacrypts, the collected wisdom of Roboute Guilliman, the Primarch of the Ultramarines—and arguably the most celebrated war tactician the Imperium has ever seen—endures in forms uncounted. It is also the guiding doctrine for how most Chapters operate today. Many Battle-Brothers, particularly the descendants of Guilliman, never pass a day without studying from this text." 
  },
  { 
    name: "COMBAT WEBBING", 
    summary: "Belt and suspenders with various pouches (Clip, Medicae, Vox, Grenade, etc.).",
    description: "Astartes combat webbing consists of a sturdy web belt and detachable load-bearing suspenders. The belt and load-bearing suspenders are five centimetres wide and adjustable to fit nearly every body size, as well as over standard Astartes Scout armour. The webbing is designed to carry hard and soft-sided pouches for equipment and ammunition that a scout needs readily at hand. These pouches come in a variety of sizes, and range in use from magazine pouches to medikits to holsters and drop pouches. The pouches connect to the belt and suspenders with a series of semi-permanent clips that can be undone with any flat-bladed tool. Common pouches include: Clip Pouch, Medicae Pouch (+20 Medicae), Vox Pouch, Grenade Pouch, Knife Sheath, Shotgun Pouch, Sidearm Holster, Drop Pouch." 
  },
  { 
    name: "Combi tool", 
    summary: "+10 bonus to Tech-Use Tests.",
    description: "Commonly found in the hands of Techmarines, combi-tools are versatile, if somewhat bizarre, mechanical devices. They are spindled with small implements that interface, cut, solder, and anoint, granting a +10 bonus to Tech-Use Tests." 
  },
  { 
    name: "data-slate", 
    summary: "Stores and reads text, schematics, video, and audio.",
    description: "Data-slates are commonplace in the Imperium—the primary means of storing and reading printed text, schematics, and other media such as video (pict) or audio (vox) recordings. Models range from cheap, single purpose devices built to play only a certain recording, to sophisticated models that can rerecord new information and transmit and receive data from other devices." 
  },
  { 
    name: "Deadlock (Toxin)", 
    summary: "Difficult (-10) T Test or suffer 1d10 Str Damage. Paralysis at 0 Str.",
    description: "This paralytic chemical causes the target’s muscles to seize, immobilising him for easy elimination or capture without rendering him unconscious. This toxin is most commonly found in the form of needler rounds. If the victim fails a Difficult (–10) Toughness Test, he suffers 1d10 temporary Strength Damage, plus a further 1d10 per degree of Failure. If he reaches “0” Strength, he is completely paralysed and unable to act. This paralysis and Strength Damage wears off in 2d5 minutes, minus the victim’s Toughness Bonus (minimum 1 minute).",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Delay Agent (Toxin)", 
    summary: "Causes drugs/toxins to take effect 1d5 hours later.",
    description: "Not a toxin in and of itself, a delay agent encapsulates the molecules of drugs and poisons with a slowly decaying non-reactive microshell that allows the payload to take effect substantially after delivery. Any drug or toxin may be cut with a delay agent, causing it to take effect 1d5 hours after it is administered.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "De-tox", 
    summary: "Negates effects of gases/toxins. Immune for 1d10 Rounds.",
    description: "A more powerful form of the anti-toxins found in Astartes power armour, this drug can negate the effects of most dangerous gases and toxins if administered quickly enough. A dose of de-tox immediately ends the ongoing effects, both positive and negative, of any drugs, toxins, or gases affecting the character (unless the effect states that de-tox is not effective against them) and renders him immune for another 1d10 Rounds. Given that natural Space Marine resilience protects him against many of the common chemicals that pose a threat to other beings, de-tox is manually administered to avoid unintended interruption of injector system effects.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "DIAGNOSTICATOR", 
    summary: "+20 bonus to Tech-use Tests when diagnosing or repairing equipment.",
    description: "This small, hand-held device contains a number of technological diagnostic tools and a small cogitator array that allows a Deathwatch Techmarine to diagnose what ails a machine’s spirit. It has a number of common plugs and adaptors that allow it to be plugged into nearly every machine of human manufacture, as well as sensors and scanners that can see through hulls and casings, detect microscopic cracks and material fatigue, and generally help the Techmarine in his daily obligations to the Omnissiah. A Techmarine using a machine-spirit Diagnostor gains a +20 bonus to all Tech-use Tests when diagnosing or repairing malfunctioning equipment." 
  },
  { 
    name: "Dilation field", 
    summary: "Grants Unnatural Agility/Speed. 1d10 Rounds use. -10 WS/BS on activation/deactivation turns.",
    description: "A dilation field grants the owner the Unnatural Agility and Unnatural Speed Traits. Activating the field is a Ready Action with all effects (including any change to the character’s place in the Initiative Order) beginning at the start of the next Round. Dilation fields consume huge amounts of power, and once activated remain on for only 1d10 Rounds before requiring 1 hour to recharge. Furthermore, the character is at –10 WS and BS on the first Turn the field goes into effect, and the first Turn after the field’s effects end, as he adjusts his timing. The interactions between dilation fields and force fields can have disastrous consequences, and only one type of field should be activated at a time on a character." 
  },
  { 
    name: "Elucidator", 
    summary: "Analyzes and translates speech/text. Logic Test (-20) for alien languages.",
    description: "The Jericho Reach is rife with planets out of contact with the Imperium for thousands of years, pockets of humanity lost during the Age of Shadow or even before. During that time, their language may have diverged radically from Low Gothic. An elucidator is a hand-held device that can analyse speech or text, and translate it into a standard language and dialect (and vice versa). It is most useful in dealing with cultures whose languages have a basis in Low Gothic, requiring no Test to perform this function. However, a character with the Logic Skill may make a Difficult (–20) Test to use an elucidator to decipher basic meanings from truly alien languages. An elucidator’s output can display on its screen, project from its vox, or transmit through a vox channel." 
  },
  { 
    name: "Genophage (Toxin)", 
    summary: "Custom made. Hard (-20) T Test or take 1d10+5 impact damage per round.",
    description: "Lethally effective, every dose of genophage is tailored to attack the weaknesses in the molecular structure of a particular individual. As such, it may never be simply Requisitioned, and must always be custom made. Victims of genophage stand little chance of resisting the quick-acting enzymes that immediately shut down circulatory and respiratory functions. Genophage is so deadly that it only needs to make contact with its intended target to be effective. If used in weapon form, this means the attack must deal at least 1 point of Damage after AP, but does not need to overcome TB. If contact is made, the target must pass a Hard (–20) Toughness Test. Failure indicates he takes 1d10+5 impact Damage with no reduction for armour or Toughness. This continues every Round until the victim either passes the Test or dies. If genophage is used upon a creature other than the individual it was made for, it simply has the standard Toxic effect.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Grapnel", 
    summary: "Fires 100m wire. Manual/powered winch. Weapon: 1d10+2 R, Pen 2.",
    description: "Sometimes used by Space Marine Scout Squads in the field, a grapnel fires a hooked or magnetic grapnel from a bolt pistol, connected to the launcher with a thin but strong 100m wire. Once the grapnel attaches to the desired rock outcropping, gargoyle edifice or other anchor, the user can manually climb the line or activate a powered winch. In a pinch, a grapnel can also be used as a crude—and messy—projectile weapon, doing 1d10+2 R Damage with a Penetration of 2." 
  },
  { 
    name: "GRAV CHUTE", 
    summary: "Safe fall from any height using suspensor fields.",
    description: "On occasion, Space Marine Scout Squads must deploy stealthily, unable to utilise more common methods like teleportation or drop pods. Under those unusual circumstances, the Scouts utilise an Astartes grav chute. Grav chutes rely on suspensor fields to counter gravity and slow descent. Unlike a jump pack, which allows the user to leap into the air, a grav chute’s lower power output only allows for a safe, guided fall such as a combat drop from a transport. It allows for a safe fall from any height." 
  },
  { 
    name: "GRAV-FLARES", 
    summary: "Illuminates 10km area for 2d10 minutes.",
    description: "Fired from integral tube launchers, Grav-flares are used to light large swaths of terrain. With a small rocket motor to get it to altitude and a low-power grav-system similar to a grav plate to keep it there, these extremely high-intensity chemical flares can illuminate an area roughly ten kilometres across and lasts for 2d10 minutes. They come in red, white, green, gold, and blue.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Harness", 
    summary: "+30 Climb Tests. Prevents falling on failure.",
    description: "Offering more safety than a grapnel but less noise and bulk than a jump pack, this Battle-Brother-sized harness can be used to aid in safely descending from terrain or buildings. The simple harness fits over a character’s power amour. A hook-shaped magnetic clip can then be anchored to a wide variety of surfaces as the coiled safety line slowly unspools. The Battle-Brother gains a +30 bonus to Climb Tests, and will not fall if he fails." 
  },
  { 
    name: "INFILTRIOL ENAMEL", 
    summary: "Masks bio-signature from Hive Fleet Dagon Tyranids. Lasts 1d10+10 hours.",
    description: "Treats power armour to mask bio-signature from Hive Fleet Dagon. Tyranid organisms do not recognise wearer as an enemy unless they approach closer than 2 x Perception Bonus meters. Discovering or attacking reveals the character. Lasts 1d10+10 hours. Psy-active Tyranids gain +20 to Awareness Tests to see through it.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Injector", 
    summary: "Full Action to administer 1 dose of drug/toxin. Melee rules for unwilling targets.",
    description: "Injectors carried by the Adeptus Astartes are usually hyposprays that require helmets to be removed so that skin contact can be made. An injector can hold a single dose of any drug (or toxin), which a character may administer as a Full Action. An injector may be used on an unwilling target through standard melee combat rules as though it were a weapon, but the injector itself deals no Damage and cannot penetrate armour.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Jump Pack", 
    summary: "Allows safe falls, short jumps (double Base Movement), or maximal thrust (Flyer 12 for 1 min).",
    description: "A Jump Pack requires the Pilot (Personal) skill to operate effectively. An Astartes Jump Pack allows for a safe, guided fall from any height, and any number of short jumps. Such jumps allow the Battle-Brother to double his Base Movement and travel in any direction without regard for obstacles. For all other purposes, he counts as having taken the appropriate Movement action. He must land by the end of his Turn. Alternatively, the pack can use maximal thrust to duplicate the Flyer (12) trait for up to a minute before the turbines require a minute to cool." 
  },
  { 
    name: "lamp/ glow-globe", 
    summary: "Illuminates area a dozen metres in diameter. Lasts 1d5 hours.",
    description: "These common devices can illuminate an area a dozen or more metres in diameter. A typical lamp lasts 1d5 hours before it needs to be recharged." 
  },
  { 
    name: "Locus Seeker", 
    summary: "Pair of devices (caller/seeker) for tracking over sectors. Navigation Test to plot course.",
    description: "A locus seeker is actually a pair of devices. The smaller component, the locus caller, is a dull metal sphere only millimetres in diameter. The larger component is a small, translucent globe with a needle of identical metal suspended mysteriously inside. The needle, called the locus seeker, is usually carved in the shape of a grasping talon and reaches unerringly towards the caller, with no observed limits on its distance. Plotting a course towards the caller using the globe requires the appropriate Navigation Test with a Difficulty based on how much distance lies between the two." 
  },
  { 
    name: "LUMINATOR SIGNAL FLARE CAPSULES", 
    summary: "Steady (5m light, 1d10h) or Stroboscopic (distress, 1d5h) modes. One-use.",
    description: "Roughly half the size of a standard bolt round, these high intensity beacons have two operating modes, steady and stroboscopic. In steady mode they are used for marking and illuminating, and can light an area five metres in diameter. In stroboscopic mode the Luminator Flare flashes on and off hundreds of times per minute and is typically used as a distress beacon. Unlike lamp packs or glow globes, Luminator Flares are one-use only—simply discarded when they run out of power. Luminators last 1d10 hours in steady mode, and 1d5 hours in stroboscopic mode.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Magboots", 
    summary: "Adhere to metallic surfaces. Halves Agility Bonus (recalculate Movement) when active.",
    description: "Astartes power armour can be upgraded to contain strong electromagnets built into the boot soles, allowing the wearer to adhere to metallic surfaces such as exterior hull plating. These magnets may be activated or de-activated at the beginning of the wearer’s Turn. Magboots reduce Agility Bonus (recalculate Movement accordingly) by half when used, but otherwise allow normal movement in low- or zero- gravity areas provided there is a suitable surface to walk upon. Standalone versions of Magboots can be found outside the Adeptus Astartes." 
  },
  { 
    name: "Magnoculars", 
    summary: "Powerful vision aids. Advanced models give range, heat detection, and pict-captures.",
    description: "These are powerful vision aids that magnify distant objects. More advanced, high-quality magnoculars can also give range read-outs, detect heat sources, calculate target location positioning, and take pict-captures of a view for later analysis." 
  },
  { 
    name: "Multikey", 
    summary: "+30 to Security Tests when opening locks.",
    description: "As it can open most standard Imperial locks, a multikey is reason for suspicion in the hands of a common citizen. For organisations like the Deathwatch they are indispensable, as it is considerably faster and quieter to infiltrate the enemy’s fortifications than to blast through them. A character with a multikey gains a +30 bonus to any Security Test when trying to open locks." 
  },
  { 
    name: "Narthecium", 
    summary: "+20 Medicae Tests on Astartes. Raises Lightly Damaged threshold to 3x TB. Doubles healing.",
    description: "A narthecium grants a +20 Bonus to Medicae Tests made on a Space Marine patient. It also raises the Threshold at which the patient is considered Lightly Damaged to 3 times his Toughness Bonus, and doubles the amount of damage healed by first aid. A narthecium also holds ten doses of any one drug. The drug must be acquired separately." 
  },
  { 
    name: "Pain Suppressant", 
    summary: "Ignore Critical Effects for 1d10 Rounds.",
    description: "The same chemical is found in most Astartes power armour injectors and allows a character to ignore Critical Effects for 1d10 Rounds. Additional doses are often carried in nartheciums, and may also be used in the Sacraments of Renewal to refill power armour injectors with a Routine (+10) Tech-Use Test.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "pict recorder", 
    summary: "Records and plays back live media. Some have holographic capabilities.",
    description: "Pict recorders (or simply picters) are relatively simple live-media recording devices, and some have holographic capabilities. Most also allow for playback as well as recording, and some are even built into dedicated pict-servitors so they can capture important battles, weapon tests, alien interrogations, and other dangerous events." 
  },
  { 
    name: "Psychic Hood", 
    summary: "Reaction to nullify psychic techniques within WP range. +5 Focus Power Tests.",
    description: "A character equipped with a psychic hood may spend his Reaction to attempt to nullify a psychic technique being used by another psyker within a number of metres equal to the character’s Willpower. This attempt should be declared before the enemy psyker makes his Focus Power roll. The psychic hood’s wearer first makes a Focus Power (Willpower) Test. Every degree of success imposes a –10 penalty on the enemy’s Focus Power Test. Alternatively, the wearer may attempt to nullify the effects of a Psychic Technique on himself only, regardless of Range. To do this, the character takes a Focus Power (Willpower) Test. If he succeeds, he is unaffected by the Psychic Technique, but any other targets or areas are affected normally. A nullification Test may trigger psychic phenomena based on Psychic Strength as normal. Additionally, the psychic hood grants the wearer a +5 bonus to all Focus Power Tests, including nullification attempts." 
  },
  { 
    name: "psy-focus", 
    summary: "+10 bonus to Invocation Skill Tests.",
    description: "Psykers and Librarians often use these items to help them focus their powers. A psy-focus could be a book of meditations, a blessed icon, or a carved witch stave from the Battle-Brother’s homeworld. When a psyker with a Psy-focus makes an Invocation Skill Test he gains a +10 bonus." 
  },
  { 
    name: "Reductor", 
    summary: "Progenoid removal 1 Round/gland. Melee weapon: 1d10+2 R, Pen 10 (no SB).",
    description: "A reductor reduces the time to remove the Progenoid glands to 1 Round per gland (2 for a full recovery). Although generally regarded as disrespectful to the machine’s sombre purpose, it can also be used as a melee weapon that does 1d10+2 R with a Penetration of 10. If used as a weapon, a reductor does not add the Battle-Brother’s SB to Damage; its design emphasises control and precision, but does not provide adequate leverage to take advantage of the wielder’s strength." 
  },
  { 
    name: "Repair Cement", 
    summary: "Seals power armour breaches instantly. Takes one Round, no Test required.",
    description: "Repair Cement is a spray-gel composed of dual tubes of polyplas allomers that bond instantly with each other to seal power armour damage. It is typically used for quick field repair of breaches until the armour can be attended properly by a follower of the Omnissiah. A Space Marine learns how to use repair cement as soon as he is issued power armour; its application takes one Round but requires no Test.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Restraints", 
    summary: "Strong enough to hold an Ork. Sized for human-shaped bodies.",
    description: "Despite their designation, Kill-teams’ Mission objectives are far more varied than simple target elimination. Live capture may be the means to an end or the goal itself. Simple but effective, Deathwatch restraints size to most roughly human-shaped bodies and are strong enough to hold even a thrashing Ork." 
  },
  { 
    name: "ResusCitex", 
    summary: "Revives unconscious characters. Reverts Fatigue to TB if in excess.",
    description: "This stimm is intended to revive an unconscious comrade. It immediately wakes an unconscious character. If the character has taken Fatigue levels in excess of his Toughness Bonus, it reverts the level of Fatigue to a number equal to his TB. It has no effect on conscious characters suffering Fatigue levels equal to or less than their TB.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Sacred Unguents", 
    summary: "Immune to Jamming for one clip size or unjams weapon.",
    description: "Sacred unguents blessed by the Omnissiah are much sought after for their mystical properties when applied to machines. If applied to a weapon (a Full Action) it becomes immune to Jamming for a number of shots equal to its clip size. If the weapon is Jammed and the unguent is then applied, it immediately unjams, but there is no further effect.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "SIEGE AUSPEX", 
    summary: "Powerful scanner (20m range) to find stress fractures and hidden passages.",
    description: "The siege auspex is a powerful scanner that can see through the densest materials to find their weak points. These items are used for finding stress fractures, reinforced or up-armoured areas, hidden passages, power conduits, and the numerous other items of interest to a siege engineer. The machine-spirits of a siege auspex, while canny, can only see so far through solid objects and have a fixed range of about 20 metres." 
  },
  { 
    name: "signum", 
    summary: "+5 Ballistic Skill to Squad Mode members. Full Action + Tech-Use for +10 until end of next Round.",
    description: "A signum is a sensorium and transmitter array that can be mounted on a Battle-Brother’s armour. It broadcasts enhanced tactical readings to all members of a Squad, allowing them to benefit from the targeting data. While a character equipped with a signum is in Squad Mode, all characters in Squad Mode receive a +5 bonus to Ballistic Skill Tests. If the equipped character spends a Full Action and succeeds on a Tech-Use Test, this bonus increases to +10 until the end of the next Round. The effects of multiple signums are not cumulative." 
  },
  { 
    name: "signum link", 
    summary: "Web of interconnected autosenses. Benefit from ganging up rules for melee/ranged attacks in Squad Mode.",
    description: "A signum is a useful tool alone, but by equipping the targeting systems of one or more squad members with a signum link, they can make optimal use of the signum’s readings to achieve unparalleled acts of teamwork by forming a web of their interconnected autosenses. This allows all participating members to make a concerted attack on the same foe, striking with a coordinated precision that makes their assault all but inescapable. To form a signum web, at least one member of a Squad must be equipped with a signum. One or more other characters in the squad then equip their armour with signum links. All characters in Squad Mode on the web (via the signum or a link) may benefit from the rules for ganging up on an opponent, regardless of whether they are engaged in melee or using ranged attacks." 
  },
  { 
    name: "STALKER FLARES", 
    summary: "Invisible chemical markers detectable only through photo/preysense sights.",
    description: "Invisible to the naked eye, these small chemical markers can only be detected through photo or preysense sights or by those using auto-sense goggles. They allow Space Marines to mark trails and landing zones in ways difficult or impossible to detect by enemy forces.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Stummer", 
    summary: "+30 Silent Move Tests. Countermeasure against surveillance. 20 mins power.",
    description: "The reverse of a screamer, stummers generate sound waves to cancel out ambient sounds and noises made by moving personnel in a small area. A character carrying an active stummer gains a +30 to Silent Move Tests. The device may also be used as a countermeasure against vox-bugs and other surveillance attempts. A stummer typically has enough power for 20 minutes of continuous use before needing to be recharged, a process that takes about 1 hour." 
  },
  { 
    name: "targeter", 
    summary: "Combines Red-Dot and Telescopic sights. Dodge ranged attacks from user suffer -10 penalty.",
    description: "The Space Marine version of a Targeter encompasses several sights connected to a guidance cogitator array that improves overall accuracy. Rather than being hard-wired to a specific weapon, the array fixes at the shoulder or backpack unit and links into the power armour’s general targeting systems, providing its benefits to all ranged weapons the user wields regardless of their Class. A Targeter combines the effects of a Red-Dot Laser Sight and Telescopic Sight. In addition, its sophisticated target-lock system makes evading a shot from a weapon guided by it extremely difficult. Attempts to Dodge ranged attacks from a character equipped with a Targeter suffer a –10 penalty." 
  },
  { 
    name: "Teleport Homer", 
    summary: "Signal transmitter for teleportation targeting or retrieval.",
    description: "These powerful signal transmitters allow ships equipped with a Teleportarium or similar technology to zero in on a person, object, or area. Teleport homers may be used to target points for squad deployment or to locate a moving individual who needs to be retrieved." 
  },
  { 
    name: "VIVISECTION GAGE", 
    summary: "+10 Medicae (research) or +10 Interrogation/Intimidation. Weapon: 1d5+5 R, Tearing, Toxic.",
    description: "Primarily a tool used by Deathwatch Techmarines and Apothecaries, especially those affiliated with the Magos Biologis, this wicked looking device is used mainly to maintain the ranks of Deathwatch servitors. The hand itself contains augmentation similar to that of a cybernetic hand, and the fingers contain a number of laser cutters, bio-solvents, auto-injectors, shears and flensing instruments. When used by a Techmarine or Apothecary for the purposes of research or maintaining servitors, the vivsection gage grants the user a +10 bonus to all Medicae Tests. When pressed into service as an interrogation device, it grants the wearer +10 to Interrogation and Intimidation Tests, deals 1d5+5 R damage, and possesses the Tearing and Toxic Qualities." 
  }
];

export const SPECIALIZATIONS = [
  "Tactical Marine", "Assault Marine", "Devastator Marine", "Librarian", "Apothecary", "Techmarine"
];

export const PERSONAL_DEMEANORS = [
  { name: "Calculating", description: "The Space Marine’s mind is highly analytical..." },
  { name: "Gregarious", description: "The Space Marine is a charismatic and talkative sort..." },
  { name: "Hot-Blooded", description: "The Space Marine is quick to temper and aggressive in all things." },
  { name: "Studious", description: "The Space Marine values lore and learning." },
  { name: "Taciturn", description: "The Space Marine is a brooding individual." },
  { name: "Pious", description: "The Space Marine cherishes faith in his Primarch and the Emperor." },
  { name: "Stoic", description: "No test of endurance is too much." },
  { name: "Scornful", description: "Pity has no place in this Space Marine’s heart." },
  { name: "Ambitious", description: "This Space Marine’s gaze is ever-lifted towards his goal." },
  { name: "Proud", description: "Dignity and honour are important." }
];

export interface AdvancedSpecialityRule {
  name: string;
  check: (char: CharacterData, getScore: (key: keyof Characteristics) => number) => { ok: boolean; reason?: string };
}

export const ADVANCED_SPECIALITY_RULES: AdvancedSpecialityRule[] = [
  {
    name: "Deathwatch Black Shield",
    check: (char) => ({ ok: char.rank >= 1 })
  },
  {
    name: "Deathwatch Champion",
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (char.renown < 40) reasons.push("Renown 40+");
      if (getScore('WS') < 50) reasons.push("WS 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Chaplain",
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (getScore('WP') < 45) reasons.push("WP 45+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (['Librarian', 'Techmarine'].includes(char.specialization)) reasons.push("Not Librarian/Techmarine");
      if (char.chapter === "Space Wolves") reasons.push("Not Space Wolf");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Dreadnought",
    check: (char) => {
      const reasons = [];
      if (char.fate.current > 0) reasons.push("0 Fate Points");
      if (char.renown < 60) reasons.push("Renown 60+");
      if (char.specialization === "Librarian") reasons.push("Not Librarian");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Epistolary",
    check: (char) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (char.specialization !== "Librarian") reasons.push("Must be Librarian");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Forge Master",
    check: (char) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (char.specialization !== "Techmarine") reasons.push("Must be Techmarine");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Keeper",
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (char.renown < 50) reasons.push("Renown 50+");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Kill-Marine",
    check: (char, getScore) => {
      const reasons = [];
      if (char.rank < 1) reasons.push("Rank 1+");
      if (getScore('Fel') < 40) reasons.push("Fel 40+");
      if (['Techmarine', 'Apothecary'].includes(char.specialization)) reasons.push("Not Tech/Apoth");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "Deathwatch Captain",
    check: (char) => {
      const reasons = [];
      if (char.rank < 5) reasons.push("Rank 5+");
      if (char.renown < 60) reasons.push("Renown 60+");
      if (!char.hasCruxTerminatus) reasons.push("Crux Terminatus Required");
      const commandSkill = char.skills.find(s => s.name === "Command");
      if (!commandSkill || commandSkill.mastery < 3) reasons.push("Command +20 Required");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  },
  {
    name: "First Company Veteran",
    check: (char) => {
      const reasons = [];
      if (char.rank < 4) reasons.push("Rank 4+");
      if (!char.hasCruxTerminatus) reasons.push("Crux Terminatus Required");
      return { ok: reasons.length === 0, reason: reasons.join(", ") };
    }
  }
];