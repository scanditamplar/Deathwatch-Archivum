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

export const SPECIAL_WARGEAR = [
  { 
    name: "Auspex", 
    summary: "+20 Awareness Tests. Tech-Use Test to detect invisible gases, bio-signs, or radiation (50m range).",
    description: "These devices are used to detect energy emissions, motion, and biological life signs. A character using an auspex gains a +20 bonus to Awareness Tests and may make a Tech-Use Test to spot things not normally detectable to human senses alone, such as invisible gases, nearby bio-signs, or ambient radiation. The standard range for an auspex is 50m, though walls more than 50cm thick and certain shielding materials can block the scanner." 
  },
  { 
    name: "Back banner", 
    summary: "Leader restores 1 bonus Cohesion point when spending a Fate Point for Cohesion.",
    description: "Back banners fly on ornate poles wrought with the Deathwatch symbol and icons of Imperial faith, mounted on a backpack power unit or rising from between the shoulder blades. These elaborate banners often tower as tall again as the Battle-Brother’s height itself, heralding the valour of the Emperor’s avenging angels to brother and foe alike. When the Kill-team’s leader spends a Fate Point to restore a point of Cohesion, he restores one bonus point of lost Cohesion if he is wearing a back banner." 
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
    name: "Deadlock (Toxin)", 
    summary: "Difficult (-10) T Test or suffer 1d10 Str Damage. Paralysis at 0 Str.",
    description: "This paralytic chemical causes the target’s muscles to seize, immobilising him for easy elimination or capture without rendering him unconscious. This toxin is most commonly found in the form of needler rounds. If the victim fails a Difficult (–10) Toughness Test, he suffers 1d10 temporary Strength Damage, plus a further 1d10 per degree of Failure. If he reaches “0” Strength, he is completely paralysed and unable to act. This paralysis and Strength Damage wears off in 2d5 minutes, minus the victim’s Toughness Bonus (minimum 1 minute).",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "De-tox", 
    summary: "Negates effects of gases/toxins. Immune for 1d10 Rounds.",
    description: "A more powerful form of the anti-toxins found in Astartes power armour, this drug can negate the effects of most dangerous gases and toxins if administered quickly enough. A dose of de-tox immediately ends the ongoing effects, both positive and negative, of any drugs, toxins, or gases affecting the character (unless the effect states that de-tox is not effective against them) and renders him immune for another 1d10 Rounds. Given that natural Space Marine resilience protects him against many of the common chemicals that pose a threat to other beings, de-tox is manually administered to avoid unintended interruption of injector system effects.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Delay Agent (Toxin)", 
    summary: "Causes drugs/toxins to take effect 1d5 hours later.",
    description: "Not a toxin in and of itself, a delay agent encapsulates the molecules of drugs and poisons with a slowly decaying non-reactive microshell that allows the payload to take effect substantially after delivery. Any drug or toxin may be cut with a delay agent, causing it to take effect 1d5 hours after it is administered.",
    quantity: { current: 1, max: 10 }
  },
  { 
    name: "Dilation field", 
    summary: "Grants Unnatural Agility/Speed. 1d10 Rounds use. -10 WS/BS on activation/deactivation turns.",
    description: "A dilation field grants the owner the Unnatural Agility and Unnatural Speed Traits. Activating the field is a Ready Action with all effects (including any change to the character’s place in the Initiative Order) beginning at the start of the next Round. Dilation fields consume huge amounts of power, and once activated remain on for only 1d10 Rounds before requiring 1 hour to recharge. Furthermore, the character is at –10 WS and BS on the first Turn the field goes into effect, and the first Turn after the field’s effects end, as he adjusts his timing. The interactions between dilation fields and force fields can have disastrous consequences, and only one type of field should be activated at a time on a character." 
  },
  { 
    name: "Grapnel", 
    summary: "Fires 100m wire. Manual/powered winch. Weapon: 1d10+2 R, Pen 2.",
    description: "Sometimes used by Space Marine Scout Squads in the field, a grapnel fires a hooked or magnetic grapnel from a bolt pistol, connected to the launcher with a thin but strong 100m wire. Once the grapnel attaches to the desired rock outcropping, gargoyle edifice or other anchor, the user can manually climb the line or activate a powered winch. In a pinch, a grapnel can also be used as a crude—and messy—projectile weapon, doing 1d10+2 R Damage with a Penetration of 2." 
  },
  { 
    name: "Genophage (Toxin)", 
    summary: "Custom made. Hard (-20) T Test or take 1d10+5 impact damage per round.",
    description: "Lethally effective, every dose of genophage is tailored to attack the weaknesses in the molecular structure of a particular individual. As such, it may never be simply Requisitioned, and must always be custom made. Victims of genophage stand little chance of resisting the quick-acting enzymes that immediately shut down circulatory and respiratory functions. Genophage is so deadly that it only needs to make contact with its intended target to be effective. If used in weapon form, this means the attack must deal at least 1 point of Damage after AP, but does not need to overcome TB. If contact is made, the target must pass a Hard (–20) Toughness Test. Failure indicates he takes 1d10+5 impact Damage with no reduction for armour or Toughness. This continues every Round until the victim either passes the Test or dies. If genophage is used upon a creature other than the individual it was made for, it simply has the standard Toxic effect.",
    quantity: { current: 1, max: 5 }
  },
  { 
    name: "Harness", 
    summary: "+30 Climb Tests. Prevents falling on failure.",
    description: "Offering more safety than a grapnel but less noise and bulk than a jump pack, this Battle-Brother-sized harness can be used to aid in safely descending from terrain or buildings. The simple harness fits over a character’s power amour. A hook-shaped magnetic clip can then be anchored to a wide variety of surfaces as the coiled safety line slowly unspools. The Battle-Brother gains a +30 bonus to Climb Tests, and will not fall if he fails." 
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
    name: "Psychic Hood", 
    summary: "Reaction to nullify psychic techniques within WP range. +5 Focus Power Tests.",
    description: "A character equipped with a psychic hood may spend his Reaction to attempt to nullify a psychic technique being used by another psyker within a number of metres equal to the character’s Willpower. This attempt should be declared before the enemy psyker makes his Focus Power roll. The psychic hood’s wearer first makes a Focus Power (Willpower) Test. Every degree of success imposes a –10 penalty on the enemy’s Focus Power Test. Alternatively, the wearer may attempt to nullify the effects of a Psychic Technique on himself only, regardless of Range. To do this, the character takes a Focus Power (Willpower) Test. If he succeeds, he is unaffected by the Psychic Technique, but any other targets or areas are affected normally. A nullification Test may trigger psychic phenomena based on Psychic Strength as normal. Additionally, the psychic hood grants the wearer a +5 bonus to all Focus Power Tests, including nullification attempts." 
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
    name: "Stummer", 
    summary: "+30 Silent Move Tests. Countermeasure against surveillance. 20 mins power.",
    description: "The reverse of a screamer, stummers generate sound waves to cancel out ambient sounds and noises made by moving personnel in a small area. A character carrying an active stummer gains a +30 to Silent Move Tests. The device may also be used as a countermeasure against vox-bugs and other surveillance attempts. A stummer typically has enough power for 20 minutes of continuous use before needing to be recharged, a process that takes about 1 hour." 
  },
  { 
    name: "Teleport Homer", 
    summary: "Signal transmitter for teleportation targeting or retrieval.",
    description: "These powerful signal transmitters allow ships equipped with a Teleportarium or similar technology to zero in on a person, object, or area. Teleport homers may be used to target points for squad deployment or to locate a moving individual who needs to be retrieved." 
  },
  { 
    name: "AUTO-SENSE GOGGLES", 
    summary: "Vision enhancements (photo-visor, preysense +20). Laser range finder grants +20 to allied artillery/aerospace BS.",
    description: "These bulky goggles (most often worn by Space Marine Scout snipers) provide the wearer with a number of vision enhancements. There are many models and variants of these goggles. Many of them combine the effects of photo-visors (no penalties due to darkness) and preysense (+20 to vision based Perception Tests at night or in the dark) sights, can detect and see a broad range of radioactivity frequencies, can record pict-captures, have a 5x optical enhancement, 5x micromagnification, and a number of coloured filters that can be flipped in and out of the view ports. These goggles also have an integral laser range finder that allows the wearer to act as a forward observer or fire controller for artillery and aerospace units by pinpointing targets, calculating firing solutions, and broadcasting the data to waiting units. When using the laser range finder to guide artillery or aerospace fire, the forward observer grants +20 to the allied unit’s Ballistic Skill Test." 
  },
  { 
    name: "CAMELEOLINE TARPAULIN", 
    summary: "+30 to all Concealment Tests for vehicles and emplacements.",
    description: "These thin, resilient tarpaulins are made of sheets of photosensitive, colour-shifting fabric that can take on the appearance of their surroundings. Issued in five metre by five metre sheets, cameleoline tarps can be hooked together to hide anything from a land speeder to a rhino to an entire encampment. Use of cameleoline tarps to hide vehicles and emplacements grants the user a +30 to all Concealment Tests." 
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
    name: "DIAGNOSTICATOR", 
    summary: "+20 bonus to Tech-use Tests when diagnosing or repairing equipment.",
    description: "This small, hand-held device contains a number of technological diagnostic tools and a small cogitator array that allows a Deathwatch Techmarine to diagnose what ails a machine’s spirit. It has a number of common plugs and adaptors that allow it to be plugged into nearly every machine of human manufacture, as well as sensors and scanners that can see through hulls and casings, detect microscopic cracks and material fatigue, and generally help the Techmarine in his daily obligations to the Omnissiah. A Techmarine using a machine-spirit Diagnostor gains a +20 bonus to all Tech-use Tests when diagnosing or repairing malfunctioning equipment." 
  },
  { 
    name: "Elucidator", 
    summary: "Analyzes and translates speech/text. Logic Test (-20) for alien languages.",
    description: "The Jericho Reach is rife with planets out of contact with the Imperium for thousands of years, pockets of humanity lost during the Age of Shadow or even before. During that time, their language may have diverged radically from Low Gothic. An elucidator is a hand-held device that can analyse speech or text, and translate it into a standard language and dialect (and vice versa). It is most useful in dealing with cultures whose languages have a basis in Low Gothic, requiring no Test to perform this function. However, a character with the Logic Skill may make a Difficult (–20) Test to use an elucidator to decipher basic meanings from truly alien languages. An elucidator’s output can display on its screen, project from its vox, or transmit through a vox channel." 
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
    name: "INFILTRIOL ENAMEL", 
    summary: "Masks bio-signature from Hive Fleet Dagon Tyranids. Lasts 1d10+10 hours.",
    description: "Treats power armour to mask bio-signature from Hive Fleet Dagon. Tyranid organisms do not recognise wearer as an enemy unless they approach closer than 2 x Perception Bonus meters. Discovering or attacking reveals the character. Lasts 1d10+10 hours. Psy-active Tyranids gain +20 to Awareness Tests to see through it.",
    quantity: { current: 1, max: 5 }
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
    name: "pict recorder", 
    summary: "Records and plays back live media. Some have holographic capabilities.",
    description: "Pict recorders (or simply picters) are relatively simple live-media recording devices, and some have holographic capabilities. Most also allow for playback as well as recording, and some are even built into dedicated pict-servitors so they can capture important battles, weapon tests, alien interrogations, and other dangerous events." 
  },
  { 
    name: "psy-focus", 
    summary: "+10 bonus to Invocation Skill Tests.",
    description: "Psykers and Librarians often use these items to help them focus their powers. A psy-focus could be a book of meditations, a blessed icon, or a carved witch stave from the Battle-Brother’s homeworld. When a psyker with a Psy-focus makes an Invocation Skill Test he gains a +10 bonus." 
  },
  { 
    name: "Restraints", 
    summary: "Strong enough to hold an Ork. Sized for human-shaped bodies.",
    description: "Despite their designation, Kill-teams’ Mission objectives are far more varied than simple target elimination. Live capture may be the means to an end or the goal itself. Simple but effective, Deathwatch restraints size to most roughly human-shaped bodies and are strong enough to hold even a thrashing Ork." 
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
    name: "targeter", 
    summary: "Combines Red-Dot and Telescopic sights. Dodge ranged attacks from user suffer -10 penalty.",
    description: "The Space Marine version of a Targeter encompasses several sights connected to a guidance cogitator array that improves overall accuracy. Rather than being hard-wired to a specific weapon, the array fixes at the shoulder or backpack unit and links into the power armour’s general targeting systems, providing its benefits to all ranged weapons the user wields regardless of their Class. A Targeter combines the effects of a Red-Dot Laser Sight and Telescopic Sight. In addition, its sophisticated target-lock system makes evading a shot from a weapon guided by it extremely difficult. Attempts to Dodge ranged attacks from a character equipped with a Targeter suffer a –10 penalty." 
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