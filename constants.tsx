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
    description: "Hulking size. +1 Agility Bonus to Base Movement. Enemy gets no attack bonus. -10 to Concealment and Silent Move."
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
}

export const ARMOR_PATTERNS: { [key: string]: ArmorPattern } = {
  "MK I Thunder": {
    name: "MK I Thunder",
    head: 6, torso: 8, rightArm: 6, leftArm: 6, rightLeg: 4, leftLeg: 4,
    abilities: ["Enhanced Strength (+15)", "Vox Link", "Magnetized Boot Soles", "Nutrient Recycling", "Noisier", "Poor Manual Dexterity (-15)"],
    historySlots: 1,
    strengthBonus: 15,
    manualDexterityPenalty: -15
  },
  "MK II Crusade": {
    name: "MK II Crusade",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Enhanced Strength (+25)", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Not built for stealth", "Legacy of the Great Crusade (+10)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20
  },
  "MK III Iron": {
    name: "MK III Iron",
    head: 9, torso: 10, rightArm: 9, leftArm: 9, rightLeg: 9, leftLeg: 9,
    abilities: ["Enhanced Strength (+25)", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Clanks and grinds", "Armored for assault", "Legacy of the Great Crusade (+5)", "Poor Manual Dexterity (-20)"],
    historySlots: 1,
    strengthBonus: 25,
    autoSensesBonus: 5,
    manualDexterityPenalty: -20
  },
  "MK IV Maximus": {
    name: "MK IV Maximus",
    head: 7, torso: 9, rightArm: 7, leftArm: 7, rightLeg: 7, leftLeg: 7,
    abilities: ["Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Echoes of brotherhood", "Poor Manual Dexterity"],
    historySlots: 3,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10
  },
  "MK V Heresy": {
    name: "MK V Heresy",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Enhanced Strength", "Auto-Senses (+5)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Marked from the heresy", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 5,
    manualDexterityPenalty: -10
  },
  "MK VI Corvus": {
    name: "MK VI Corvus",
    head: 8, torso: 9, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Enhanced Strength", "Auto-Senses (+15)", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Lightest variant", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 15,
    manualDexterityPenalty: -10
  },
  "MK VII Aquilla": {
    name: "MK VII Aquilla",
    head: 8, torso: 10, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10
  },
  "MK VIII Errant": {
    name: "MK VIII Errant",
    head: 8, torso: 11, rightArm: 8, leftArm: 8, rightLeg: 8, leftLeg: 8,
    abilities: ["Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "High collar", "Mark of command", "Poor Manual Dexterity"],
    historySlots: 1,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10
  },
  "Terminator": {
    name: "Terminator",
    head: 14, torso: 14, rightArm: 14, leftArm: 14, rightLeg: 14, leftLeg: 14,
    abilities: ["Enhanced Strength (+30)", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Terminator Actuators", "Terminator Squad Link", "Sensorium", "Poor Manual Dexterity", "Slow and steady"],
    historySlots: 2,
    strengthBonus: 30,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10
  },
  "Artificer": {
    name: "Artificer",
    head: 12, torso: 12, rightArm: 12, leftArm: 12, rightLeg: 12, leftLeg: 12,
    abilities: ["Enhanced Strength", "Auto-Senses", "Bio-monitor and Injectors", "Recoil Suppression", "Osmotic Gill Life Sustainer", "Vox Link", "Nutrient Recycling", "Magnetized Boot Soles", "Poor Manual Dexterity"],
    historySlots: 2,
    strengthBonus: 20,
    autoSensesBonus: 10,
    manualDexterityPenalty: -10
  },
  "Scout": {
    name: "Scout",
    head: 0, torso: 7, rightArm: 7, leftArm: 7, rightLeg: 5, leftLeg: 5,
    abilities: ["Vox Link", "Body Glove", "Anointment of Obfuscation", "Scout Vox", "Interlocutor Beacon", "Auto-injector Cuff"],
    historySlots: 1,
    strengthBonus: 0,
    autoSensesBonus: 0,
    manualDexterityPenalty: 0
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