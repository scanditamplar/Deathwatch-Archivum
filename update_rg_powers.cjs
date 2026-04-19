const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `  {
    name: "Punish the Weak",
    category: "Iron Hands powers",
    action: "Full",
    opposed: "No",
    range: "1 metre radius x PR",
    sustained: "Yes",
    description: "After fighting alongside his Iron Hands Battle-Brothers for countless battles, the Librarian has learned how to spare their mechanical bodies while assailing his enemies. He summons forth a roiling tornado of force around himself, harshly tearing at the flesh of anyone not strong enough to stand against its assault. This power affects all creatures within 1 metre x PR of the Librarian, tearing at their weak flesh. The effected area blocks normal vision (Traits such as Dark Sight, Sonar Sense, or Unnatural Senses are needed to see clearly). Creatures within the area must succeed at a Hard (–20) Toughness Test or suffer 1d5 x PR Energy Damage, ignoring Armour and Toughness Bonus."
  },`;

const newPowers = `  {
    name: "Corax's Ingenuity",
    category: "Raven Guard powers",
    action: "Full",
    opposed: "No",
    range: "5 metres radius x PR",
    sustained: "No",
    description: "The Librarian plunges his mind into the Warp, harnessing its power. He is infused with power, embodying the pure ideals of Corax, and emanating his power to those around him. All Battle-Brothers in range may take an immediate half-action for which all enemies count as surprised. The Librarian may only use this power once per combat at the fettered level, to use this power again he must cast it at the push level."
  },
  {
    name: "Curse of the Raven",
    category: "Raven Guard powers",
    action: "Half",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "The Librarian curses an opponent, condemning him to death at the hands of the Emperor’s champions. Warp energies eat at the target’s mind, and reveal weaknesses in his defences that the Battle-Brothers can exploit. This power only works on a single target. While the power is sustained, all attacks against the cursed target gain additional Penetration equal to the Librarian’s PR."
  },
  {
    name: "The Unkindness of Deliverance",
    category: "Raven Guard powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian manifests his psychic power as an unkindness of ravens. Black as night, these ferocious birds swarm over his opponents. The Librarian can either have the ravens target one individual, dealing 1d10 x PR Rending Damage, or swarm a number of opponents equal to the Librarian’s PR, blinding them until the end of the Librarian’s next turn."
  },`;

if (content.includes(target)) {
    content = content.replace(target, target + "\n" + newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Raven Guard powers');
} else {
    console.log('Could not find anchor text');
}
