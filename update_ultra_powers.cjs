const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `  {
    name: "Scourge of Furies",
    category: "Ultramarines powers",
    description: "Unleash a barrage of psychic energy that seeks out the enemies of Macragge."
  },`;

const newPowers = `  {
    name: "Fury of the Ancients",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "No",
    range: "10 metres x PR",
    sustained: "No",
    description: "Calling upon the legends of his Chapter, the Librarian summons forth a ravening beast of ghostly flame and psychic energy. The flaming apparition then charges forward from the Librarian in a straight line, moving up to the extent of the power’s range before vanishing in a burst of energy. Those touched by the beast will suffer 1d5 x PR points of Energy damage and must make a Pinning Test with a penalty of –5 x PR."
  },
  {
    name: "Glory of the Emperor",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "No",
    description: "For the briefest of instants the Librarian channels the light of the Emperor, bathing all those nearby in His glory. The Librarian may affect a number of allies equal to his PR within line of sight and range of this power. Those affected are healed by the divine light and will recover Wounds equal to the Librarian’s PR. This healing cannot restore Critical Damage, nor will it take a creature above its starting Wound total.\\nChannelling this power is difficult and draining, and a Librarian may only use it a number of times each day (within a 24 hour period) equal to his Willpower Bonus."
  },
  {
    name: "Inspiring Word",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "No",
    range: "10 metre radius x PR",
    sustained: "Yes",
    description: "The Librarian calms the minds of nearby allies and completely dispels their fear and doubt. While this power is active, a number of allies equal to PR, and within range, are immune to the effects of Fear."
  },
  {
    name: "Paragon",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The Librarian lets his authority shine forth in a blaze of psychic energy, filling nearby allies with strength and resolve to emulate his glory. While this power is in effect, the Librarian can allow a number of allies equal to his PR within range of the power to use one of his characteristics. In effect, those benefiting from this power count as having a characteristic score equal to that of the Librarian, though if their own characteristic is higher they may choose to use that instead."
  },
  {
    name: "War Cry",
    category: "Ultramarines powers",
    action: "Half",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "No",
    description: "With a terrifying cry, the Librarian demoralises and stuns nearby foes, forcing them to cower before his might. This power can affect a number of foes equal to the Librarian’s PR. Those affected cannot use Reactions from the end of the Librarian’s turn to the start of his next turn."
  },
  {
    name: "Word of the Emperor",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian recites a sanctified prayer to the Emperor, speaking holy words that burn the minds of the unfaithful and cast out the spirits of the Warp. This power can affect a number of targets equal to the Librarian’s PR. Those affected will become Stunned for one Round. Targets with the Daemonic Trait are affected much more seriously by this power and will suffer 1d10 Explosive damage x PR and must make a Warp Instability Test. Finally, creatures targeted by this power suffering from Possession may immediately make a Challenging (+0) Willpower Test to break free."
  },`;

if (content.includes(target)) {
    content = content.replace(target, newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Ultramarines powers');
} else {
    console.log('Could not find anchor text');
}
