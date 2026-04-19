const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const oldPower = `  {
    name: "Hellfire",
    category: "Dark Angels powers",
    description: "Summon the dark flames of Caliban to consume your foes."
  },`;

const newPowers = `  {
    name: "Force Barrier",
    category: "Dark Angels powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Wrapping himself in a blanket of power, the Librarian creates a potent but static psychic shell over himself. While this power is in effect, and as long as the Librarian does not move, he gains 3 AP x PR to all locations. In addition, if this power is manifested with a PR of 5 or more, all ranged attacks count as having a Penetration of 0."
  },
  {
    name: "Hellfire",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "No",
    range: "50 metres x PR",
    sustained: "No",
    description: "The Librarian summons a torrent of psychic fire to burn and char his foes. He may pick a point within range and engulf it in a cloud of flame with a radius of 2 metres x PR. All those within the area will suffer 1d10 Energy damage x PR. In addition, all those within the area of effect must make Challenging (+0) Agility Tests or be set on fire."
  },
  {
    name: "Mask of Shadows",
    category: "Dark Angels powers",
    action: "Half or Reaction",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "Covering his thoughts in darkness, the Librarian hides his mind from sight, confounding the efforts of enemy psykers or fearsome foes to psychically engage him. While this power is in effect, the Librarian is immune to the effects of all Telepathy powers unless created by a psyker with a Willpower greater than his own. In addition, the psyker suffers no ill effects to Cohesion or Willpower as a result of Fear."
  },
  {
    name: "Mind Worm",
    category: "Dark Angels powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "Driving deep into the target’s mind, the Librarian implants the seed of doubt and remorse, crippling the creature with indecision and guilt. This powers works against a single target. Those affected by the power suffer a –5 x PR to WS, BS, S, Ag, Int, and Fel (all to a minimum of 05). If this power is sustained then the target may make a new Opposed Willpower Test at the start of each of its turns to end the effects.\\nThis power also confers a +30 bonus to the psyker’s Interrogation skill."
  },
  {
    name: "True Strike",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "No",
    description: "Deadly against those with the psychic gift, the effects of a True Strike can smash an enemy psyker’s mind to pieces. If the Librarian performs a melee attack against a psyker (an individual Psy Rating of at least 1) within 1 Round x PR of activating the power, a successful attack will inflict an additional 2 points of damage x PR which cannot be reduced by armour or Toughness. In addition, an individual suffering damage from this power must make a Hard (–20) Willpower Test or lose access to his Psychic Powers for 1 Round.\\nThis power has no additional effects on individuals without a Psy Rating of at least 1."
  },
  {
    name: "Weaken Resolve",
    category: "Dark Angels powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Dark Angels Librarian forces his way into the minds of his foes, robbing them of their will to fight and eroding whatever resistance they possess. This power can affect a number of foes equal to the Librarian’s PR. Those affected have their Willpower characteristic temporarily reduced by –5 x PR (to a minimum of 1). This has corresponding effects on their Willpower Bonus. If this power is sustained, targets are allowed a new Opposed Willpower Test (using their reduced Willpower) to end its effects on them at the start of each of their turns."
  },`;

if (content.includes(oldPower)) {
    content = content.replace(oldPower, newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Dark Angels powers');
} else {
    console.log('Could not find old Hellfire entry');
}
