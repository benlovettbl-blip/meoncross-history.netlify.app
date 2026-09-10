/**
 * Meoncross School Chess Club Data Registry
 * Configured for Period 6 Thursdays
 * School Houses: Warrior, Dreadnought, Victory, Invincible
 * Year Groups: Years 7–11 (KS3 & KS4)
 */

export const HOUSES = {
  victory: {
    id: 'victory',
    name: 'Victory',
    color: '#2563eb',
    colorDark: '#1e40af',
    bgLight: '#eff6ff',
    borderColor: '#bfdbfe',
    ship: 'HMS Victory (1765)',
    motto: 'England Expects',
    style: 'Tactical harmony & coordinated pieces',
    icon: 'fa-anchor',
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    color: '#dc2626',
    colorDark: '#991b1b',
    bgLight: '#fef2f2',
    borderColor: '#fecaca',
    ship: 'HMS Warrior (1860)',
    motto: 'Strength & Fortitude',
    style: 'Unbreakable pawn structures & fortress endgames',
    icon: 'fa-shield-halved',
  },
  dreadnought: {
    id: 'dreadnought',
    name: 'Dreadnought',
    color: '#16a34a',
    colorDark: '#166534',
    bgLight: '#f0fdf4',
    borderColor: '#bbf7d0',
    ship: 'HMS Dreadnought (1906)',
    motto: 'Fear Nought',
    style: 'Bold attacks & rapid piece mobility',
    icon: 'fa-bolt',
  },
  invincible: {
    id: 'invincible',
    name: 'Invincible',
    color: '#ca8a04',
    colorDark: '#854d0e',
    bgLight: '#fefce8',
    borderColor: '#fef08a',
    ship: 'HMS Invincible (1907)',
    motto: 'Speed & Precision',
    style: 'Counter-attacking skirmishes & sharp tactics',
    icon: 'fa-chess-knight',
  },
};

export const SCORING_RULES = {
  WIN: 3,
  DRAW: 2,
  PARTICIPATION: 1, // Every player who completes a game earns points for their house!
  GAME_OF_WEEK_BONUS: 2,
};

// Clean slate start: No random/mock players seeded
export const INITIAL_PLAYERS = [];

// Clean slate start: No random/mock matches seeded
export const INITIAL_MATCHES = [];

export const HISTORICAL_CHESS_SPOTLIGHTS = [
  {
    id: 'lewis_chessmen',
    title: 'The Isle of Lewis Vikings: The Berserker Charge (c. 1150–1200)',
    period: 'Medieval Europe & Scandinavia',
    badge: '12th Century Viking Lore',
    icon: 'fa-shield-halved',
    color: '#0284c7',
    excerpt:
      'Discovered buried in a sandbank on the Isle of Lewis in 1831, these walrus-ivory pieces show fierce Viking berserkers furiously biting the tops of their shields, proving how maritime raiders carried the strategic game of kings across northern sea routes.',
    didYouKnow:
      'In Norse sagas, berserkers were said to enter a trance-like fury (“berserkergang”), howling like wolves and immune to fire and iron before plunging into enemy shield-walls!',
    drill: {
      headline: 'The Berserker Shock Attack (2-Minute Tactical Drill)',
      scenario:
        'White has mobilized their knight and bishop against Black’s uncastled f7 square. Channel your inner Viking berserker: what aggressive sacrifice blows open Black’s king defences?',
      hint: 'Look for a forcing check on f7 that drags the Black monarch out into the cold.',
      solution:
        '1. Bxf7+! Kxf7 2. Ng5+ Ke8 3. Ne6! — The knight fork traps Black’s queen on d8, forcing an immediate resignation!',
      hingeQuestion:
        'Why did medieval kings consider chess an essential part of royal military education rather than just a pastime?',
    },
  },
  {
    id: 'napoleon_blunders',
    title: 'Napoleon’s Blunder: Overconfidence at Malmaison (1804)',
    period: 'French Revolution & Napoleonic Wars',
    badge: 'Napoleonic Campaign',
    icon: 'fa-horse-head',
    color: '#dc2626',
    excerpt:
      'Napoleon Bonaparte was notorious for playing chess at lightning speed, frequently knocking over pieces in impatience. Playing against Madame de Rémusat before his coronation as Emperor, Napoleon launched premature cavalry raids with his knights, leaving his rear guard defenseless.',
    didYouKnow:
      'Napoleon’s personal chess set from his exile on Saint Helena was carved from ivory with Chinese characters, sent to him by admiring British sympathizers.',
    drill: {
      headline: 'Punishing the Emperor’s Impatience (2-Minute Tactical Drill)',
      scenario:
        'Napoleon (playing White) has rushed his knights deep into Black’s camp without supporting his center pawns. Black to play and decisively trap the French vanguard.',
      hint: 'Find the backward pawn push or queen pin that cuts off Napoleon’s retreating knight.',
      solution:
        '1... d5! followed by 2... c6! — Cutting off the retreat path of White’s overextended knight on c7 and netting a full piece advantage.',
      hingeQuestion:
        'In both military warfare and chess, why is overextending your offensive lines without defending your supply chain fatal?',
    },
  },
  {
    id: 'cold_war_fischer',
    title: 'Reykjavík 1972: The Cold War on 64 Squares',
    period: 'The Cold War & Superpower Rivalry',
    badge: 'Cold War Geopolitics',
    icon: 'fa-chess-king',
    color: '#8b5cf6',
    excerpt:
      'At the height of the Cold War, the World Championship match in Iceland between American challenger Bobby Fischer and Soviet world champion Boris Spassky was treated as a titanic struggle between capitalism and communism, monitored directly by Henry Kissinger and the Kremlin.',
    didYouKnow:
      'The Soviet Union spent millions of roubles funding grandmaster training schools because holding the World Chess Championship was official state proof of communist intellectual supremacy.',
    drill: {
      headline: 'Fischer’s Game 6 Breakthrough (2-Minute Tactical Drill)',
      scenario:
        'Fischer famously surprised Spassky by playing 1. c4 (English Opening) instead of his customary 1. e4. In the middlegame, White has an open f-file and an active light-squared bishop. How does White deliver the positional coup de grâce?',
      hint: 'A devastating bishop sacrifice on e6 dismantles Black’s pawn wall and clears the path for the queen.',
      solution:
        '1. e5! dxe5 2. Ne4! — Transferring the knight to d6 while paralyzing Spassky’s dark-squared bishop, cementing an inescapable bind.',
      hingeQuestion:
        'How did proxy competitions like the 1972 World Chess Championship allow superpowers to compete without triggering nuclear war?',
    },
  },
  {
    id: 'the_turk_automaton',
    title: 'The Mechanical Turk: The Enlightenment Illusion (1770)',
    period: 'Enlightenment & Early Industrial Age',
    badge: 'Enlightenment Science & Illusion',
    icon: 'fa-gears',
    color: '#d97706',
    excerpt:
      'Built in 1770 by Wolfgang von Kempelen for Empress Maria Theresa of Austria, "The Turk" appeared to be a clockwork automaton capable of playing master-level chess, defeating Benjamin Franklin and Charles Babbage before being revealed as hiding a human master inside.',
    didYouKnow:
      'Seeing The Turk inspired inventor Charles Babbage to conceive the "Difference Engine", the mechanical precursor to modern digital computers!',
    drill: {
      headline: 'The Turk’s Clockwork Knight Fork (2-Minute Tactical Drill)',
      scenario:
        'The mechanical wooden mannequin tilts its head, opens its cabinet, and reaches out its mechanical arm. White to move and execute a triple fork against King, Rook, and Queen.',
      hint: 'Can you spot the octopus knight jumping onto c7 or e7?',
      solution:
        '1. Nc7+! Kd8 2. Nxa8 — Snaring Black’s rook in the corner while escaping unscathed through the b6 outpost.',
      hingeQuestion:
        'Why was 18th-century Enlightenment society so eager to believe that a machine could think and outwit human intelligence?',
    },
  },
  {
    id: 'elizabethan_statecraft',
    title: 'Elizabeth I & Walter Raleigh: The Chessboard of Empire (1588)',
    period: 'Early Elizabethan England & Maritime Expansion',
    badge: 'Elizabethan Statecraft',
    icon: 'fa-crown',
    color: '#059669',
    excerpt:
      'Queen Elizabeth I famously kept ornate chessboards at Greenwich Palace. Sir Walter Raleigh wrote that "the monarch on the board must balance pawns and castles as a queen balances courtiers, parliament, and fleet captains across stormy waters."',
    didYouKnow:
      'In medieval Europe, the piece we now call the Queen was originally the "Vizier" (counsellor) with very weak movement, but in 15th-century Europe she was granted sweeping powers across the whole board!',
    drill: {
      headline: 'The Queen’s Decisive Deflection (2-Minute Tactical Drill)',
      scenario:
        'Black’s king is huddled on g8 behind a wall of pawns, defended only by a weary rook. White’s Queen and Bishop command intersecting diagonals. How does White seal victory?',
      hint: 'Deflect the defending piece away from the back rank.',
      solution:
        '1. Qh7+! Kxh7 2. Rh5# — A classic Anastasia-style mating net showing the lethal speed of coordinated royal pieces.',
      hingeQuestion:
        'Why did the rise of strong female monarchs in the Renaissance (like Isabella of Castile and Elizabeth I) coincide with the chess Queen becoming the most powerful piece on the board?',
    },
  },
];
