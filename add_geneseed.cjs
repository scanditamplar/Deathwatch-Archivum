const fs = require('fs');
let code = fs.readFileSync('constants.tsx', 'utf8');

const newConstants = `
export const GENE_SEED_PURITIES: Record<string, { description: string }> = {
  "Pure": {
    description: "The new Chapter is a direct descendent of its Progenitor. It is likely to maintain close contact with its Progenitor and many brother Successors, and follows the traditions of its peers closely. Characters drawn from such Chapters follow all of the rules for those of their Progenitor."
  },
  "A New Generation": {
    description: "Attempts have been made to “breed out” real or perceived flaws in the Progenitor’s gene-stock, introducing some divergence. Such Chapters often go on to define their own traditions and write their own histories, looking forward to the future more than back to the past. Some links may be maintained with the Progenitor Chapter, but it is just as likely that the new Chapter strikes out entirely on its own. Characters drawn from this Chapter follow all of the rules for those drawn from its Progenitor, but are not tied to the Progenitor’s Chapter Demeanour. Instead of using the Progenitor’s Chapter Demeanour, choose or roll on Table 1–5: Codex Demeanours to randomly select one of the new Codex Demeanours."
  },
  "Altered Stock": {
    description: "For whatever reason, the Chapter’s gene-seed has subtly altered, causing some zygotes to become deficient. While some links are maintained with the Progenitor, the Battle-Brothers of the Chapter may be shunned, for they appear subtly different to their brethren. Characters drawn from this Chapter follow the normal rules for the Progenitor, but must roll on Table 1–7: Gene-Seed Deficiencies."
  },
  "Flawed": {
    description: "A major flaw has been introduced, marking the Chapter apart from its brother Successors. Chapters suffering some kind of flaw are often forced to forge their own destiny, either embracing their fate or raging against it. Some go on to earn glory despite their flaw, while others are consumed by it, burning brightly, if all too briefly. Characters drawn from this Chapter follow the usual rules for the Progenitor, but have a 50/50 chance of either using the Chapter Demeanour or rolling on Table 1–5: Codex Demeanours. In addition, they must roll on Table 1–8: Chapter Flaws."
  }
};

export const GENE_SEED_DEFICIENCIES: Record<string, { description: string }> = {
  "Hyper-stimulated Omophagea": {
    description: "Having tasted the flesh of the foe once, the Chapter’s Battle-Brothers develop an addiction to the processes allowed by the Omophagea. A player character confronted with the opportunity to partake of the flesh of a fallen enemy must pass a Challenging (+0) Willpower Test or do so immediately, whether he wants to or not."
  },
  "Oversensitive Occulobe": {
    description: "The organ that allows the Space Marines to see in low light conditions has become overly sensitised, working exceptionally well in the dark but suffering in full light conditions. The character can see in total dark as if it were merely low light, and low light as if it were full light. However, should he remove his helmet in full light conditions he will suffer –10 to all Awareness Tests."
  },
  "Mutated Catalepsean Node": {
    description: "The implant that allows the Battle-Brother to enter a half-sleep in which he can remain alert for danger has become dangerously mutated. The Space Marine is unable to sleep normally, and stays awake for days, even weeks on end without effect. However, when sleep does come, sometimes with little or no warning, it is wont to last for many days on end."
  },
  "Oolitic Secretions": {
    description: "The Chapter’s oolitic kidney function is unbalanced in such a way that the Battle-Brother’s skin is turned an unusual colour due to its secretions. The Space Sharks (for example) have grey skin, while the Salamanders’ is the colour of volcanic rock. A whole range of other colours is possible, and the more extreme might be viewed by some as a seriously disturbing mutation."
  },
  "Disturbing Voice": {
    description: "Due to a malfunction in or related to the function of the Betcher’s gland, the Chapter’s brethren exhibit unusual vocal characteristics. Some cannot speak above a sibilant whisper for example, while others have deep, booming voices or speak with an otherworldly cant. Allies might find it truly terrifying. All Space Marines with this deficiency have the Disturbing Voice Talent."
  },
  "Lost Zygote": {
    description: "One of the Chapter’s zygotes has entirely ceased to function. Choose one of the Implants described on page 36 of the DEATHWATCH Rulebook. The in game benefits of this Implant no longer apply. In some cases the player should agree with the GM exactly what effect this has on the character, as the effects of some implants are wrapped up in other character abilities, Skills and Talents."
  },
  "Doomed": {
    description: "A Chapter that loses the ability to replicate either the Black Carapace or Progenoid zygotes is ultimately doomed. Without the former the future generations of Space Marines will not be able to interface with their power armour, and without the latter there will be no future generations at all. Battle-Brothers with this mutation are unaffected themselves, but know that unless their Chapter’s Apothecaries can affect a cure, they are the very last of their line."
  },
  "Multiple Instabilities": {
    description: "Roll d3 more times on this table, re-rolling multiples of the same result (including this one)."
  }
};
`;

code = code + '\n' + newConstants;
fs.writeFileSync('constants.tsx', code);
