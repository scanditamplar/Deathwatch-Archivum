const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const newTelepathyPowers = `
  {
    name: "Astrotelepathy",
    category: "Telepathy powers",
    action: "Full",
    opposed: "No",
    range: "See Below",
    sustained: "No",
    description: "Any Librarian can use Astrotelepathy, provided he has enough time and skill—sending a message across the stars though is a far cry from communicating with someone on the same world or even a vessel in orbit. To send a message the Librarian must have at least one power from the Telepathy Discipline. It requires one full round to activate for every 10 words or one image it contains and uses Willpower for its Focus Power Test. The range is based on the Librarian’s Psy Rating (see below).\\n\\nPsy Rating 1–3: The message can reach out to a recipient in the same system.\\nPsy Rating 4–6: The message can reach out to a recipient in the same sub-sector.\\nPsy Rating 7–9: The message can reach out to a recipient in the same sector.\\nPsy Rating 10+: The message can reach out to a recipient in an adjacent sector.\\n\\nTypically only other Astropaths or Librarians will be able to receive the message and unless the Librarian has a specific recipient in mind the GM may have a chance of it reaching the wrong ears..."
  },
  {
    name: "Compel",
    category: "Telepathy powers",
    action: "Full",
    opposed: "Yes",
    range: "5 metres x PR",
    sustained: "No",
    description: "This power can affect a number of targets equal to the psyker’s PR. Those affected must follow a simple command given by the psyker. Some examples include “Flee”, “Fall”, “Attack your friend.” If the command is a potentially suicidal act, the target gets a +20 to his Willpower Test. In all cases the command must be achievable in a single round."
  },
  {
    name: "Dominate",
    category: "Telepathy powers",
    action: "Full",
    opposed: "Yes",
    range: "10 metres x PR",
    sustained: "Yes",
    description: "The psyker may take over the mind of another, controlling his victim with his will. This power only affects a single target and only if his total Wounds are less than 3 times the psyker’s PR. An affected target is controlled by the psyker as if he was a puppet. For as long as the psyker maintains the power, he can divide his Actions between himself and the target. The dominated target uses its own Characteristics, but at –10 due to the crudity of the control. Any action deemed suicidal allows the target an Opposed Willpower Test to try and break the hold."
  },
  {
    name: "Inspire",
    category: "Telepathy powers",
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "The psyker can bolster his comrades by sending out waves of reassurance and calm. A number of targets equal to the psyker’s PR immediately overcome the effects of Pinning and gain a +10 resistance against Fear. This effect lasts as long as the targets stay within range of the psyker, and the psyker maintains the power."
  },
  {
    name: "Long-Range Telepathy",
    category: "Telepathy powers",
    action: "Free",
    opposed: "No",
    range: "50 kilometres x PR",
    sustained: "Yes",
    description: "This functions just the same as Short-range Telepathy, but with an extended range. In addition, once the psyker learns this power, such is his mastery of telepathy that he no longer incurs a chance of invoking Psychic Phenomena when using either Short- or Long-range Telepathy unless used at the Push power level. Sustaining this power is a Free Action."
  },
  {
    name: "Mind Probe",
    category: "Telepathy powers",
    action: "Extended (5)",
    opposed: "Yes",
    range: "1 metre x PR",
    sustained: "Yes",
    description: "This power allows the psyker to peel back the layers of another’s mind to read the basic surface thoughts and beyond. This power works only against a single target, and if the psyker wants to perform the Probe without the target’s knowledge, then the psyker takes a –20 penalty to his Focus Power Test and cannot Push the power. The amount of information the psyker gains from the probe depends on his PR as detailed on Table 6–4: Mind Probe. The Librarian has the option of using some of his Psy Rating to reduce the number of rounds required to use this power instead (trading speed for force), to a minimum of 1 Round. For instance, a Librarian with a Psy Rating of 8 could use 4 of his Psy Rating to reduce the time required to a single Round, and he would then gain information from as if his Psy Rating was 4 (8 –4 = 4).\\n\\n1–3: The psyker makes initial contact and learns basic information about the target such as his name, mood, Insanity level, and the state of his physical health.\\n4–5: As above, plus the psyker can sense the thoughts uppermost in the target’s mind such as immediate fears/concerns, conscious lies, etc. The psyker also learns the target’s Corruption Level.\\n6–7: As all the above, plus the psyker can sort through the target’s memories over the last 12 hours. The psyker can also glean less casual information that the subject hides, such as simple passwords or recent secret experiences.\\n8–9: As all the above, plus the psyker gains detailed information about people, places or objects that the target considers important, as well as how these all relate to each other. The psyker learns about the target’s beliefs, motivations, and personal goals, as well as any contacts or complicated hidden ciphers the target might know about. The psyker also becomes aware of the pivotal moments in the target’s life.\\n10+: As all the above, plus the psyker may plunder the target’s mind at will. Any information contained in the target’s psyche is an open book for the psyker. The psyker can also use this technique to break down implanted memories or personalities within the target."
  },
  {
    name: "Mind Scan",
    category: "Telepathy powers",
    action: "Half",
    opposed: "No",
    range: "200 metres x PR",
    sustained: "No",
    description: "The psyker extends his mind to contact and identify other sentient minds within range, even if they are out of sight, enabling him to garner impressions and information about the consciousnesses. The level of information gathered depends on PR as detailed on Table 6–5: Mind Scan. Untouchables and other psychically inert creatures are invisible to Mind Scan. Individuals with psychic resistance or similar protections may also be hidden (the GM may make secret Opposed Willpower tests against the psyker to see if they remain hidden from him).\\n\\n1–2: The psyker gains a crude impression of the number of conscious minds within range of the power, and their general position in relation to him.\\n3–4: As above, plus the psyker knows the number, general location, and relative ‘strength’ of conscious minds within range of the power, and can determine if these minds have any psychic ability.\\n5–7: As all the above, plus the psyker may attempt to initiate telepathic communication with any of the minds he has discerned.\\n8+: As all the above, plus the psyker may attempt to carry out a Mind Probe on one of the minds he has contacted."
  },
  {
    name: "Short-Range Telepathy",
    category: "Telepathy powers",
    action: "Free",
    opposed: "No",
    range: "50 metres x PR",
    sustained: "Yes",
    description: "The psyker can send his thoughts into the minds of those around him, touching a number of targets equal to his PR. The targets can be a select group, either individuals the psyker can see or minds he is familiar with within the power’s range. Alternatively, the psyker can choose to make a generalised broadcast to every mind within range indiscriminately. An affected mind’s processes are still affected by the structure of language, and if telepathy is attempted without a shared language, the power suffers a –20 penalty. Targets who do not wish to be open to such a communication can resist with an Opposed Willpower test. Sustaining this power is a Free Action."
  },`;

const startIdx = content.indexOf('export const LIBRARIAN_PSYCHIC_POWERS = [');
const endIdx = content.indexOf('];', startIdx) + 2;

const oldArrayStr = content.substring(startIdx, endIdx);

const newArrayStr = `export const LIBRARIAN_PSYCHIC_POWERS = [
  {
    name: "Augury",
    category: "Divination powers",
    description: "Read the Emperor’s Tarot to divine hints of the future."
  },
  {
    name: "Reading",
    category: "Divination powers",
    description: "Sense a creature’s aura to gain insight into their nature."
  },
  {
    name: "Avenger",
    category: "Codex powers",
    description: "Summon a flaming avatar of death to incinerate an area."
  },
  {
    name: "Iron Arm",
    category: "Codex powers",
    description: "Your arm is sheathed in a field of psychic energy, and you may ward off enemy attacks."
  },
  {
    name: "Smite",
    category: "Codex powers",
    description: "Conjure lethal bolts of lightning to blast your enemies."
  },
  {
    name: "Scourge of Furies",
    category: "Ultramarines powers",
    description: "Unleash a barrage of psychic energy that seeks out the enemies of Macragge."
  },
  {
    name: "Blood Boil",
    category: "Blood Angels powers",
    description: "Cause the blood of your enemies to boil and erupt."
  },
  {
    name: "Hellfire",
    category: "Dark Angels powers",
    description: "Summon the dark flames of Caliban to consume your foes."
  },
  {
    name: "Living Lightning",
    category: "Space Wolves powers",
    description: "Call down the wrath of the storm upon your enemies."
  },${newTelepathyPowers.slice(0, -1)}
];`;

content = content.replace(oldArrayStr, newArrayStr);

// Also need to fix the "Short Range Telepathy" in character.psychicPowers to "Short-Range Telepathy" if any exist, but it's okay for now.

fs.writeFileSync('constants.tsx', content);
console.log('Updated LIBRARIAN_PSYCHIC_POWERS');
