const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const newDivinationPowers = `
  {
    name: "Augury",
    category: "Divination powers",
    action: "Extended (10)",
    opposed: "No",
    range: "Special",
    sustained: "No",
    description: "By reading the Emperor’s Tarot for a specific individual, the psyker can grant insight into what troubles lay ahead. During the reading both the psyker and the subject must remain in contact and no other actions may be taken by either of them. The psyker must then ask a specific question. It can be as detailed as “What must my Battle-Brothers overcome if they are to enter the Patriarch’s lair?” or as broad as “What dangers face the Chapter?” After that, the psyker reads the Emperor’s Tarot for the subject as they both concentrate on the question asked. At the end of this time the psyker interprets the Tarot and garners the results depending on his PR as detailed on Augury table. As with all forms of divination, the GM may decide how much or how little information the psyker can garner. The Warp is a capricious thing and seldom gives straight answers, often wrapping truths in riddles and lies.\\n\\n1–3: The psyker determines the most dangerous opposition that the subject will face.\\n4–6: As above, plus the psyker also determines other negative forces that may be present. The psyker can determine as many forces as his PR.\\n7–8: As all the above, plus the psyker determines the best advantage or tool that the subject can use for the situation.\\n9+: As all the above, plus the psyker may offer a single sentence of advice to the subject concerning the clearest path to their answer."
  },
  {
    name: "Divination",
    category: "Divination powers",
    action: "Extended (3)",
    opposed: "No",
    range: "Special",
    sustained: "No",
    description: "The psyker can use this power to locate and track down a single object or person in his immediate vicinity. The psyker can find anything, but there must be some degree of familiarity. Touching a lock and trying to find the key to that lock is fine, but just thinking “I want a key” without a corresponding lock won’t work. In the same vein, the psyker must have seen the person he wants to find, or the subject’s true name. The psyker’s Focus Power Test is modified as follows:\\n• The psyker is intimately familiar with target (e.g., he knows the subject well, or has an item that has been with the subject for a long time): +10\\n• The psyker possesses a portion of the subject (e.g., a fragment from the item, a lock of hair from a person, etc.): +5\\n• The subject is surrounded by others of its kind (e.g., a coin in a purse of coins, a person in a crowd, etc.): –10\\n• The subject is within 50 metres x PR of the psyker: +5\\n• The subject is over 2 km away from the psyker: –10\\n\\nIf the psyker successfully manifests the power, and the subject is within a number of kilometres equal or less than the psyker’s PR rating, he will get a rough idea of where the subject is located, based on his PR as detailed on Divination table.\\n\\n1–3: The psyker knows the rough direction of the subject.\\n4–6: The psyker knows the specific direction of the subject, and roughly how far away it is.\\n7+: The psyker knows the specific direction of the subject, and exactly how far away it is."
  },
  {
    name: "Lifting the Veil",
    category: "Divination powers",
    action: "Extended (5)",
    opposed: "No",
    range: "10 metres radius x PR",
    sustained: "No",
    description: "Lifting the Veil is an extension of the art of Psychometry and allows the psyker to look beyond individual psychic traces and relive the past of a place or item. As with Psychometry, the psyker can gain rough impressions from an object or a general area as long as it falls within the power’s radius. The level of information gained is dependent on the level of power used, as detailed on Table Lifting the Veil:\\n\\n1–3: The psyker detects the strongest emotion associated with the area or object.\\n4–5: As above, plus the psyker sees the general features of the people who experienced the emotion, and a rough impression of the events that transpired.\\n6–7: As all of the above, plus the psyker gets a clear image of the events from the area that left the strongest psychic impressions.\\n8–9: As all of the above, plus the psyker can identify all participants from that strongest event, including their careers, ranks, and names.\\n10+: As all of the above, plus the psyker determines other events that may have occurred in the area, in order of the relative strength of their psychic impressions, and gets a clear image of each event."
  },
  {
    name: "Possibility Shield",
    category: "Divination powers",
    action: "Half",
    opposed: "No",
    range: "5 metre radius x PR",
    sustained: "Yes",
    description: "Using his understanding of future events and his perception of the flow of time, the psyker surrounds himself and nearby allies in a possibility shield. While this power is active, the psyker and a number of allies equal to his PR within range of the psyker gain a +10 bonus to one roll each Round. In addition, due to his ability to see attacks before they are coming the psyker himself adds +5 x PR to all Dodge and Parry Tests."
  },
  {
    name: "Psychometry",
    category: "Divination powers",
    action: "Extended (10)",
    opposed: "No",
    range: "Touch",
    sustained: "No",
    description: "Learning to read the Emperor’s Tarot is in part the act of learning to divine the Emperor’s word from psychic impressions. Refining this skill allows the psyker to learn more about others from the crude psychic traces they leave behind on objects in the world around them. In this form, the psyker can gain rough impressions from a personal object such as an article of clothing or weapon. The level of information he gains depends on his PR as detailed on Table Psychometry.\\n\\n1–3: The psyker detects the strongest emotion associated with the area or object.\\n4–5: As above, plus the psyker can discern the general features of the person who experienced the emotion.\\n6–7: As all of the above, plus the psyker gets a clear image of the person who experienced the emotion.\\n8–9: As all of the above, plus the psyker can identify the person’s occupation (e.g. Career and Rank).\\n10+: As all of the above, plus the psyker can determine the person’s name."
  },
  {
    name: "Reading",
    category: "Divination powers",
    action: "Full",
    opposed: "No",
    range: "5 metres x PR",
    sustained: "Yes",
    description: "Diviners can read a person’s aura, the unconscious projection of his being in to the Warp. This is a very pale shadow, unnoticed by most beings, but a diviner can study this aura to learn about the person. When the psyker activates divination, he can attempt to read the aura of any person he can see. The level of information he gains depends on the PR at which he manifests the power as detailed on Table Reading.\\n\\nA psyker can only maintain this power on one target. If he wishes to divine the well-being of a different person, he must activate the power again.\\n\\n1–3: The psyker gains superficial impressions about the target person. This includes the three strongest emotions that the subject is currently experiencing, his race, whether or not he has any psychic powers, and a rough idea of his state of mental and physical wellbeing. Lastly, the psyker determines whether the target is an Untouchable.\\n4–5: As above, plus the psyker gets a deeper insight into all of the target’s feelings, and gains +10 to all Fellowship Tests he makes against the target while Reading is active. The psyker also gets a better idea about the target’s physical state, including his current Wounds and Fatigue levels. Finally, if the target has psychic abilities, the psyker can sense his power and find out his Psy Rating.\\n6–7: As all of the above, plus the psyker determines how many Insanity points the target has, as well as which addictions or madness he might be suffering from. If the target has psychic abilities, the psyker determines which discipline(s) he possesses.\\n8+: As all of the above, plus the psyker determines how many Corruption points the target has. Also, the psyker can determine if the aura is genuine, or has been produced by some other means."
  },`;

const startIdx = content.indexOf('export const LIBRARIAN_PSYCHIC_POWERS = [');
const endIdx = content.indexOf('];', startIdx) + 2;

const oldArrayStr = content.substring(startIdx, endIdx);

// We need to extract the powers that are NOT Augury or Reading
const oldPowersStr = oldArrayStr.substring(oldArrayStr.indexOf('[') + 1, oldArrayStr.lastIndexOf(']'));

// We can use regex to remove Augury and Reading from oldPowersStr
// But it's easier to just reconstruct the array.
// Let's find the other powers in the array.
const powersToKeep = [
  "Avenger",
  "Iron Arm",
  "Smite",
  "Scourge of Furies",
  "Blood Boil",
  "Hellfire",
  "Living Lightning",
  "Astrotelepathy",
  "Compel",
  "Dominate",
  "Inspire",
  "Long-Range Telepathy",
  "Mind Probe",
  "Mind Scan",
  "Short-Range Telepathy"
];

// Let's just read the file, parse the array, and then write it back.
// Since it's a TSX file with some JS syntax, we can't just JSON.parse it.
// We'll just replace the whole array.

const newArrayStr = \`export const LIBRARIAN_PSYCHIC_POWERS = [
\${newDivinationPowers}
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
  },
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
  }
];\`;

content = content.replace(oldArrayStr, newArrayStr);

fs.writeFileSync('constants.tsx', content);
console.log('Updated LIBRARIAN_PSYCHIC_POWERS');
