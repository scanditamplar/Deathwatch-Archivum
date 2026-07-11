const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Add "Flesh Tearers" to CHAPTERS
content = content.replace(
  /"Ultramarines", "Blood Angels", "Dark Angels", "Space Wolves", "Imperial Fists", "Storm Wardens", "Iron Hands", "White Scars", "Salamanders", "Raven Guard", "Black Templars"/g,
  '"Ultramarines", "Blood Angels", "Dark Angels", "Space Wolves", "Imperial Fists", "Storm Wardens", "Iron Hands", "White Scars", "Salamanders", "Raven Guard", "Black Templars", "Flesh Tearers"'
);

// 2. Add to CHAPTER_NAMES
const chapterNamesMatch = /"Black Templars": \{\n    first: \[.*?\],\n    last: \[.*?\]\n  \}/s;
const fleshTearersChapterName = `"Black Templars": {
    first: ["Adalhelm", "Aleja", "Ansgar", "Beregond", "Burchard", "Cadoc", "Cai", "Caw", "Dagar", "Doderic", "Drust", "Eberhard", "Edern", "Gareth", "Geraint", "Goronwy", "Idris", "Isolda", "Jowan", "Lorin", "Mael", "Medraut", "Niall", "Peredur", "Tristan", "Vortigern", "Wulfstan", "Yvain", "Zenon"],
    last: ["Agilard", "Balin", "Bors", "Culhwch", "Cynan", "Edmyg", "Erec", "Galahad", "Geraint", "Gwalchmei", "Howel", "Kaye", "Lamorak", "Lancelot", "Mabon", "Morholt", "Palamedes", "Pelleas", "Percival", "Sagramore", "Tristan", "Uwain"]
  },
  "Flesh Tearers": {
    first: ["Abantes", "Acastus", "Aemilius", "Agamemnon", "Ajax", "Alkaios", "Amias", "Apolon", "Ares", "Attis", "Balthasar", "Cael", "Cassius", "Castor", "Corbulo", "Erasmus", "Faustian", "Gabriel", "Gaius", "Hektor", "Iago", "Jael", "Julio", "Kael", "Leonid", "Lucius", "Magan", "Nassir", "Otho", "Phaeto", "Pollux", "Raf", "Sanguon", "Scipio", "Sev", "Simeon", "Tycho", "Varon", "Zael"],
    last: ["Abantes", "Acastus", "Aemilius", "Agamemnon", "Ajax", "Alkaios", "Amias", "Apolon", "Ares", "Attis", "Balthasar", "Cael", "Cassius", "Castor", "Corbulo", "Erasmus", "Faustian", "Gabriel", "Gaius", "Hektor", "Iago", "Jael", "Julio", "Kael", "Leonid", "Lucius", "Magan", "Nassir", "Otho", "Phaeto", "Pollux", "Raf", "Sanguon", "Scipio", "Sev", "Simeon", "Tycho", "Varon", "Zael"]
  }`;
content = content.replace(chapterNamesMatch, fleshTearersChapterName);


// 3. Add to CHAPTER_DATA
const chapterDataMatch = /"Black Templars": \{\n    modifiers: \{ WS: 5, WP: 5, Fel: -15 \},\n    talents: \["Righteous Zeal"\],\n    soloAbility: "Righteous Zeal",\n    restrictions: \["Librarian"\],\n    demeanorName: "Zealous",\n    curseName: "Burn the Witch",\n    curseLevels: \{[^{}]*\{[^{}]*\}[^{}]*\{[^{}]*\}[^{}]*\{[^{}]*\}[^{}]*\}\n  \}/;
const fleshTearersChapterData = `"Black Templars": {
    modifiers: { WS: 5, WP: 5, Fel: -15 },
    talents: ["Righteous Zeal"],
    soloAbility: "Righteous Zeal",
    restrictions: ["Librarian"],
    demeanorName: "Zealous",
    curseName: "Burn the Witch",
    curseLevels: {
      1: { name: "Burn the Witch (Lvl 1)", summary: "–20 penalty to Fellowship tests used on characters with psychic abilities.", full: "The Battle-Brother is uncomfortable around psykers and feels their dark powers crawling on his flesh and burrowing into his brain. All Fellowship based tests used on characters with psychic abilities suffer a –20 penalty, as the Battle-Brother’s disquiet shows through." },
      2: { name: "Burn the Witch (Lvl 2)", summary: "Kill-team Cohesion reduced by 1 if a psyker ally is present.", full: "The Battle-Brother can scarcely stand the presence of psykers and abhors their sight. If there is a psyker in the Battle-Brother’s Kill-team (such as a Librarian Player Character) or he must work with a psyker ally, his Kill-team’s Cohesion is reduced by 1 (until such time as the psyker leaves or is killed)." },
      3: { name: "Burn the Witch (Lvl 3)", summary: "Must prioritize killing enemy psykers over all other foes.", full: "The Battle-Brother cannot stand any psykers to live and flies into a rage when he sees them. When fighting enemy psykers, the Battle-Brother must seek them out (choosing the most obviously powerful first) and kill them to the exclusion of all other foes. This can be especially problematic for the Kill-team, should they need to take a psyker alive." }
    }
  },
  "Flesh Tearers": {
    modifiers: { WS: 5, Ag: 5, Fel: -15 },
    talents: ["Flesh Render"],
    soloAbility: "A Taste for Blood",
    demeanorName: "Unquenchable Thirst",
    curseName: "Dark Rage",
    curseLevels: {
      1: { name: "Extreme Frenzy", summary: "Difficult (-10) Willpower Test when taking damage or stressed to avoid Frenzy.", full: "The Battle-Brother completely loses control when he frenzies and finds it almost impossible to claw his way back to reason as long as there are foes to fight and blades drawn. Even when foes are not near, the madness of Frenzy grips him and he rages endlessly for battle and blood, howling out his anger and striking the ground with his blade. If the Battle-Brother has the Frenzy Talent, then he could lose control at any moment. Any time the Battle-Brother takes damage, is confronted with a clear threat, or is put in a position of great stress (as determined by the GM), the Battle-Brother must make a Difficult (–10) Willpower Test as a Free Action to avoid becoming Frenzied. If he passes, he is able to contain his fury for the duration of the encounter or until he is forced to make another test. If the he fails the Test, he immediately becomes Frenzied." },
      2: { name: "Blood Madness", summary: "Must engage in close combat. Hard (-20) Willpower Test to avoid hacking downs foes' corpses.", full: "The Flesh Tearers thirst for the blood of their foes when in the grips of the Red Thirst and long to see it spilled across the ground in great arcs and gouts. They also crave the feeling of hot blood on their skin and splattering across their armour staining the dark red a darker shade still. The Battle-Brother must engage foes in close combat if possible, either making melee attacks against them or shooting point black with pistols so that their blood spills at his feet. When he downs a foe, he must make a Hard (–20) Willpower Test to resist the urge to spend his next turn hacking or blasting the foe’s corpse apart. If the Battle-Brother is hit by an attack (though not if he is attacked and missed) while hacking at a foe, he will turn his attention to his new attacker instead." },
      3: { name: "Animal Within", summary: "-30 all non-combat tests. Hard (-20) WP to choose random target, otherwise attacks nearest.", full: "Near the end, a Flesh Tearer is little more than an animal filled with fury and madness striking out at all those around him. While he may still have lucid moments where he remembers the warrior he once was, these are fleeting and quickly gone to be replaced with only the thought of curseling and the thirst for blood. The Battle-Brother suffers a –30 to any Characteristic or Skill Test when not in combat. The Battle-Brother may not use any Skill which is based on Intelligence, Willpower or Fellowship. In combat, he must make a Hard (–20) Willpower Test to choose his target, otherwise he will attack the nearest target (friend or foe) determined randomly if there is more than one to choose from." }
    }
  }`;
content = content.replace(chapterDataMatch, fleshTearersChapterData);


fs.writeFileSync('constants.tsx', content);
