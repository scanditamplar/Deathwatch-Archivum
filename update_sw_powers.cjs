const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const oldPower = `  {
    name: "Living Lightning",
    category: "Space Wolves powers",
    description: "Call down the wrath of the storm upon your enemies."
  },`;

const newPowers = `  {
    name: "Fury of the Wolf Spirits",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest summons up the spirits of the Thunderwolves, Freki the Fierce and Geri the Cunning, unleashing them upon his foes. As long as this power is sustained, the Rune Priest is flanked by two spectral wolves that he may direct against his foes with a verbal command. The wolves cannot be damaged by attacks nor can they be grappled (though effects that end or disrupt the power will affect them as normal). They also cannot stray outside the range of the power. Each Round on the Librarian’s Initiative, each wolf may make a single melee attack against any target within range (they move automatically into contact with their foe and are not impeded by any kind of terrain). Each attack will automatically hit unless Dodged or Parried. Freki’s bite inflicts 1d10 x PR Rending damage, while Geri’s Bite inflicts 1d5 x PR Rending damage with a Penetration of 3 x PR. Any target that takes damage from either Freki or Geri must make a roll on the Shock Table (unless the target is immune to Fear) adding the damage taken to the result."
  },
  {
    name: "Living Lightning",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "30 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest cries out to the sky and calls forth a dancing bolt of sentient electricity arcing down from the heavens. While this power is in effect, the Rune Priest can direct the bolt of lightning against any target within range, changing targets between turns regardless of how far apart they are. Those struck by the lightning will suffer 1d10 x PR Energy damage with the Shocking quality. If the target passes a Challenging (+0) Agility Test, he reduces this damage by half (round up).\\nThis power can only be used outside under an open sky."
  },
  {
    name: "Storm Caller",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Rune Priest invokes the ancient rites of ice and snow, calling up a blizzard of psychic energy around himself and his allies. While this power is in effect, the Rune Priest and all allies within the power’s radius become shrouded in ethereal mist. All ranged attacks they make, or that are made against them, suffer a penalty of –5 x PR. Any ally who moves outside the range of the power immediately loses its effects."
  },
  {
    name: "Tempest’s Wrath",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "150 metre radius x PR",
    sustained: "Yes",
    description: "In a fearsome display of power, the Rune Priest calls upon the spirits of wind, storm, and snow, tearing the air with gales and tempests. While this power is in effect, any creature with the Hoverer or Flyer trait must pass a Strength Test at a penalty of –5 x PR to move through the air. Even those that pass the test have their Movement reduced by half. Flying vehicles are also affected, and their pilots suffer a penalty of –5 x PR on all Skill tests they must make to operate their craft. Flying vehicles also have their speed reduced by half. Finally, ranged attacks inside, into or out of the radius of effect have their shots fouled by the winds. Thrown and Primitive ranged weapons suffer a penalty of –5 x PR to hit, while all other ranged weapons suffer a penalty of –2 x PR to hit. This power may only be used on the surface of a planet with atmosphere, and even then, the power only functions when outside of a building or other confined space."
  },
  {
    name: "Thunderclap",
    category: "Space Wolves powers",
    action: "Full",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "No",
    description: "With a word of power and a clap of his mighty hands, the Rune Priest creates a deafening crack of thunder that rolls across the battlefield. All those within range of this power (friends or foes, though not including the Rune Priest) suffer 1d5 x PR Impact damage. This damage is reduced by Toughness as normal. However, only armour worn on the head protects against it. In addition, anyone suffering damage from this attack must make a Toughness Test with a penalty of –5 x PR or be deafened for 1d10 rounds (see page 260 for the effects of being deafened). Finally, fragile objects such as mundane glass, crystal or fine ceramics within the power’s range are shattered (though the GM has the final say on whether an object is affected)."
  },`;

if (content.includes(oldPower)) {
    content = content.replace(oldPower, newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Space Wolves powers');
} else {
    console.log('Could not find old Living Lightning entry');
}
