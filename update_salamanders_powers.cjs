const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `  {
    name: "The Unkindness of Deliverance",
    category: "Raven Guard powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian manifests his psychic power as an unkindness of ravens. Black as night, these ferocious birds swarm over his opponents. The Librarian can either have the ravens target one individual, dealing 1d10 x PR Rending Damage, or swarm a number of opponents equal to the Librarian’s PR, blinding them until the end of the Librarian’s next turn."
  },`;

const newPowers = `  {
    name: "Fury of the Salamander",
    category: "Salamanders powers",
    action: "Half",
    opposed: "No",
    range: "2d10 metres x PR",
    sustained: "No",
    description: "The Librarian conjures the flame and fury of his home world and the terrible lizards that dwell upon it, and drives it towards his enemies. The roiling flames twist and writhe into the form of an ancient and powerful drake, its malevolent visage inspiring dread. This power conjures a 1 metre wide line out to its maximum range which strikes everything along its path. Any creature, friend or foe, or object struck by this power takes 3d10+5 Energy Damage with a Pen equal to the Librarian’s Psy Rating, unless they spend their reaction and pass a Challenging (+0) Dodge Test. In addition, any creature or horde damaged but not killed/destroyed by this power must take a Fear Test as if exposed to a Fear (1) Creature."
  },
  {
    name: "Heat of the Furnace",
    category: "Salamanders powers",
    action: "Half",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The searing heat of the forge runs through the veins of the Salamanders, and the Librarian can turn that heat outwards, wreathing himself in flame that enemies cannot bear to be near, and which causes flesh to burn and blister at his touch. Any creature, friend or foe, within 1 x PR metres of the Librarian, must pass a Challenging (+0) Toughness Test or gain a level of Fatigue. In addition, the Librarian’s melee attacks deal additional damage equal to his Psy Rating, and any struck by those melee attacks must pass an Agility Test or catch on fire."
  },
  {
    name: "Nocturne’s Fire",
    category: "Salamanders powers",
    action: "Full",
    opposed: "No",
    range: "5 metres x PR",
    sustained: "Yes (but see text)",
    description: "The volcanic fury of Nocturne is a deep and powerful force, and terrifying when fully unleashed. Salamanders are reluctant to use this power unless absolutely necessary, for it can be difficult to control once unleashed. The area around the Librarian is suddenly engulfed in a raging inferno which few things can withstand. All creatures, friend or foe, within the area suffer 1d10 x PR Energy Damage with a Pen of 4, and must pass a Difficult (–10) Agility Test or catch light.\\nThe Librarian remains unharmed, but cannot move while this power is being sustained. Every turn this power is sustained, increase the effective Psy Rating by +1 (increasing the damage and range), and then compare the total damage rolled to the Librarian’s Willpower score—if the damage roll is higher, then the power must be sustained next turn, as its energies rage on uncontrolled."
  },
  {
    name: "Vulkan’s Anvil",
    category: "Salamanders powers",
    action: "Full",
    opposed: "No",
    range: "Self",
    sustained: "Yes",
    description: "The Librarian draws upon the unyielding endurance that the Salamanders are legendary for, becoming an anvil against the attacks of his enemies. There is little that can strike a Librarian down when he manifests this power. The Librarian gains a Force Field with a protection rating equal to 5 x Psy Rating. This force field cannot overload."
  },`;

if (content.includes(target)) {
    content = content.replace(target, target + "\n" + newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated powers');
} else {
    console.log('Could not find anchor text');
}
