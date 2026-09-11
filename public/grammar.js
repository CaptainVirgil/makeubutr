// The butter grammar. Templates with {slots}; slots are filled from the pools
// below. Shared verbatim by the page and by /threat, so a threat you get in the
// browser is a threat you could have got from the API.

const POOLS = {
  // How the churning happens.
  process: [
    'churn',
    'clarify',
    'whip',
    'render',
    'emulsify',
    'agitate',
    'cold-press',
    'slow-fold',
    'cream',
    'temper',
    'skim',
    'brown',
    'knead',
    'reduce',
  ],

  // What you become.
  form: [
    'a compound butter',
    'a single perfect pat',
    'ghee',
    'a spreadable paste',
    'eleven individually wrapped portions',
    'a beurre blanc',
    'the good kind, with flaky salt on top',
    'something you spread on toast without thinking',
    'a tub with a peel-back lid',
    'a stick, unsalted, no label',
    'brown butter, which is worse',
    'a decorative rose on a cold plate',
    'a pat shaped like a shell, for no reason',
    'cultured, and insufferable about it',
    'the tub your grandmother refilled with margarine',
    'a foil rectangle in a hotel dish',
    'drawn butter, in a small metal cup',
    'an anonymous smear on a diner plate',
  ],

  // Where this ends up.
  fate: [
    'and serve you at a brunch you were not invited to',
    'and leave you out on the counter until you are soft enough to spread',
    'and put you in the door of the fridge, where the light does not reach',
    'and use you sparingly, on weekends',
    'and forget you behind the jam',
    'and mention you in a recipe, once, in passing',
    'and let a child scrape you across cold bread',
    'and refuse to explain any of this to your family',
    'and freeze you for a holiday that never comes',
    'and finish a pan sauce with you',
    'and label you with a date, in pen, that is already wrong',
    'and set you beside a basket of bread nobody touches',
    'and scrape you off the knife with the side of the plate',
    'and carry you through a hot kitchen without hurrying',
    'and leave you in a window until you are useless',
    'and blame you, later, for the sauce breaking',
    'and pass you to the left without looking up',
  ],

  // The manner of the churning.
  manner: [
    'slowly',
    'at room temperature',
    'without raising my voice',
    'over low heat',
    'in a bowl I will not name',
    'by hand',
    'on a Tuesday',
    'in front of everyone',
    'with the patience of a dairy',
    'until the solids separate',
    'with both thumbs',
    'while explaining exactly why',
    'on a marble slab that has been in the freezer since Thursday',
    'quietly, during dinner service',
  ],

  // Quantities of consequence.
  quantity: [
    'every part of you',
    'what remains',
    'the fat',
    'your whole deal',
    'the part of you that melts',
    'whatever is spreadable',
  ],

  // A threatening dairy noun to invoke.
  apparatus: [
    'a churn',
    'a cheesecloth',
    'a wooden paddle',
    'a stand mixer on setting four',
    'a marble slab',
    'a butter bell',
    'a cold bowl and warmer hands',
    'a spurtle, historically',
    'a paddle that somebody\'s grandfather carved',
    'a thermometer I do not need',
  ],
};

const TEMPLATES = [
  'I will {process} you into {form}, {fate}.',
  'I will {process} you {manner}, {fate}.',
  'You will be {form} by morning.',
  'I am going to take {quantity} and {process} it {manner}.',
  'First {apparatus}. Then {form}. It does not take as long as you would hope.',
  'Nothing personal. I am simply going to {process} you into {form}.',
  'You will be {form}, and you will be told it is an honour.',
  'I will {process} {quantity} {manner}, {fate}.',
  'Ask anyone. I {process} people into {form}.',
  'There is {apparatus} with your name on it, and I will {process} you {manner}.',
  'They said it could not be done. I will {process} you into {form} anyway.',
  'You get one warning. The warning is: {form}.',
  'It ends the same way it always ends: {form}.',
  'Do not make me {process} you into {form}.',
  'By the time anyone notices, you will be {form}.',
];

function pick(list, rand) {
  return list[Math.floor(rand() * list.length)];
}

/**
 * Generate one threat.
 * @param {() => number} rand - a [0,1) random source. Defaults to Math.random.
 * @returns {string}
 */
export function makeThreat(rand = Math.random) {
  const template = pick(TEMPLATES, rand);
  return template.replace(/\{(\w+)\}/g, (_, slot) => pick(POOLS[slot], rand));
}

/** Rough count of distinct threats this grammar can produce. */
export function threatSpace() {
  return TEMPLATES.reduce((total, template) => {
    const slots = template.match(/\{(\w+)\}/g) || [];
    return total + slots.reduce((n, s) => n * POOLS[s.slice(1, -1)].length, 1);
  }, 0);
}
