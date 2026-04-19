const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `    description: "With a word of power and a clap of his mighty hands, the Rune Priest creates a deafening crack of thunder that rolls across the battlefield. All those within range of this power (friends or foes, though not including the Rune Priest) suffer 1d5 x PR Impact damage. This damage is reduced by Toughness as normal. However, only armour worn on the head protects against it. In addition, anyone suffering damage from this attack must make a Toughness Test with a penalty of –5 x PR or be deafened for 1d10 rounds (see page 260 for the effects of being deafened). Finally, fragile objects such as mundane glass, crystal or fine ceramics within the power’s range are shattered (though the GM has the final say on whether an object is affected)."
  },`;

const newPowers = `  {
    name: "Ancestors' Rage",
    category: "Storm Wardens powers",
    action: "Full",
    opposed: "No",
    range: "1 metre x PR",
    sustained: "Yes",
    description: "Calling upon the talents of dead heroes, the Librarian instils within himself or another exceptional skill at arms. While this power is in effect, the Librarian or a target of his choosing gains a number of Exotic Melee Weapons Talents of his choice equal to his PR, and increases his WS by +5 x PR (to a maximum of 95)."
  },
  {
    name: "Call to Arms",
    category: "Storm Wardens powers",
    action: "Extended (2)",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "Yes",
    description: "Plunging his will into the Immaterium, the Librarian calls forth ancestral spirits to fight on his side, and summons up a number of ancestral warriors equal to his PR to fight for him. These warriors use the Imperial Guardsman profile on page 376 and are armed and armoured as detailed there. They will not stray beyond the range of the power nor can they be used for anything but combat. When they are killed, both they and their gear will vanish into smoke."
  },
  {
    name: "Crown of Lightning",
    category: "Storm Wardens powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Librarian encases one of his foes in a crackling cage of lightning, searing his flesh and contorting his muscles. This power may only be used against a single target. The target suffers 1d10 Energy damage x PR counting as having the Shock Quality. If this power is sustained, the target suffers 2d10 Energy damage in each of the Librarian’s turns."
  },
  {
    name: "Hammer of the Emperor",
    category: "Storm Wardens powers",
    action: "Extended (5)",
    opposed: "No",
    range: "1 kilometre x PR",
    sustained: "No",
    description: "With the power of an orbital barrage, the Librarian calls down a mighty hammer of psychic energy with the power to lay waste to entire towns. The Librarian chooses a point within range and calls down the Hammer. The Hammer has a radius of 100 metres x PR. Anything within the area of effect is subjected to a moderate earthquake, inflicting 3d10 x PR damage on all structures, possibly causing them to collapse. Creatures within the area must make a Hard (–20) Agility Test to remain standing. This power cannot be used Fettered, and does not work indoors. This power is extraordinary taxing and inflicts 1d5 levels of Fatigue on the Librarian. In addition, the Librarian may not attempt to use the power again for at least 24 hours.\\nAt the GM’s discretion, falling buildings and raining debris may inflict 3d10 I damage on those in the area of effect who fail a Challenging (+0) Agility Test."
  },
  {
    name: "Mark of Scorn",
    category: "Storm Wardens powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "The Librarian casts a curse upon one of his foes, marking him for death at the hands of the righteous. This power only works on a single target. The target becomes Marked, and all successful melee attacks against him will gain a bonus to damage equal to the Librarian’s PR. In addition, any instances of Righteous Fury from melee attacks against him automatically occur without the need to pass a WS test."
  },
  {
    name: "Thunder's Shell",
    category: "Storm Wardens powers",
    action: "Half or Reaction",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian covers himself in a fine reactive psychic shield that gets stronger the more force brought against it. While this power is in effect, all attacks against the Librarian have their Penetration reduced by an amount equal to his PR (to a minimum of 0). In addition, attacks that ignore armour completely have this special ability negated by this power, instead inflicting normal damage against whatever armour the Librarian is wearing."
  },`;

if (content.includes(target)) {
    content = content.replace(target, target + "\\n" + newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully added Storm Wardens powers');
} else {
    console.log('Could not find anchor text');
}
