const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const target = `  {
    name: "Word of the Emperor",
    category: "Ultramarines powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "No",
    description: "The Librarian recites a sanctified prayer to the Emperor, speaking holy words that burn the minds of the unfaithful and cast out the spirits of the Warp. This power can affect a number of targets equal to the Librarian’s PR. Those affected will become Stunned for one Round. Targets with the Daemonic Trait are affected much more seriously by this power and will suffer 1d10 Explosive damage x PR and must make a Warp Instability Test. Finally, creatures targeted by this power suffering from Possession may immediately make a Challenging (+0) Willpower Test to break free."
  },`;

const newPowers = `  {
    name: "Deus Ex Ferrum",
    category: "Iron Hands powers",
    action: "Full",
    opposed: "No",
    range: "1 metre radius x PR",
    sustained: "Yes",
    description: "The Iron Hands Librarian focuses his mind and links his iron will to the strength of his augmetics, bolstering himself and his allies. The Librarian and a number of Battle-Brothers equal to his Psy Rating within a number of metres of the Librarian equal to his Psy Rating gain a +10 bonus to both Strength and Toughness. This bonus is increased by +5 for every cybernetic possessed by the affected Space Marine (The Flesh Is Weak Talent counts its level towards these requirements). If used at the Unfettered Level, this Power is a Half Action. If used at the Push Level, this Power is a Free Action."
  },
  {
    name: "Betrayal of Flesh",
    category: "Iron Hands powers",
    action: "Half",
    opposed: "No",
    range: "10 metres x PR",
    sustained: "No",
    description: "Harnessing his hatred for weakness, the Iron Hands Librarian sunders the flesh of his enemies with a blast of psychic power, reducing his enemies to dust. This power must be targeted at a single creature. However, it may affect others nearby, depending on its strength. The Librarian does not need to make a BS Test to hit the target. However, his Focus Power Test is modified as if he was making a ranged attack (using bonuses and penalties for range, lighting, and so forth). This power deals 1d10 Energy Damage x PR with a Penetration equal to PR and the Felling (1) Quality to the targeted creature, as well as any creatures within 1 metre x PR. If used against a Horde at the Push Level, this power inflicts a number of hits equal to the Librarian’s Psy Rating +1d10 instead of its normal effects. This power has no effect against a target with the Daemonic or Machine Traits."
  },
  {
    name: "Punish the Weak",
    category: "Iron Hands powers",
    action: "Full",
    opposed: "No",
    range: "1 metre radius x PR",
    sustained: "Yes",
    description: "After fighting alongside his Iron Hands Battle-Brothers for countless battles, the Librarian has learned how to spare their mechanical bodies while assailing his enemies. He summons forth a roiling tornado of force around himself, harshly tearing at the flesh of anyone not strong enough to stand against its assault. This power affects all creatures within 1 metre x PR of the Librarian, tearing at their weak flesh. The effected area blocks normal vision (Traits such as Dark Sight, Sonar Sense, or Unnatural Senses are needed to see clearly). Creatures within the area must succeed at a Hard (–20) Toughness Test or suffer 1d5 x PR Energy Damage, ignoring Armour and Toughness Bonus."
  },`;

if (content.includes(target)) {
    content = content.replace(target, target + "\\n" + newPowers);
    fs.writeFileSync('constants.tsx', content);
    console.log('Successfully updated Iron Hands powers');
} else {
    console.log('Could not find anchor text');
}
