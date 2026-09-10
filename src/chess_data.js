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

export const BETH_HARMON_PUZZLES = [
  {
    id: 'beth_borgov_1968',
    title: 'Beth Harmon vs. Vasily Borgov (Moscow 1968)',
    tag: 'The Queen’s Gambit Finale',
    difficulty: 'Intermediate',
    toMove: 'White to Move & Deliver Checkmate in 2',
    intro:
      'In the climactic finale of The Queen’s Gambit, Beth Harmon looks up at the ceiling of the Moscow tournament hall, visualizing the pieces moving in reverse. She spots the brilliant queen deflection sacrifice that shatters the Soviet fortress.',
    hint: 'Look for an aggressive queen sacrifice on the h-file (h7) that pulls the Black king into an inescapable rook battery.',
    board: [
      ['.', '.', '.', 'q', '.', 'r', 'k', '.'], // rank 8 (0)
      ['p', 'p', '.', '.', 'b', 'p', 'p', 'p'], // rank 7 (1)
      ['.', '.', 'p', '.', '.', '.', '.', '.'], // rank 6 (2)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', '.', '.', 'Q', '.', '.', '.'], // rank 4 (4) White Queen on e4 [4,4]
      ['.', 'P', '.', '.', '.', '.', '.', '.'], // rank 3 (5)
      ['P', '.', '.', '.', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['.', '.', '.', 'R', '.', '.', 'K', '.'], // rank 1 (7) White Rook on d1 [7,3]
    ],
    solutionMoves: '1. Qxh7+! Kxh7 2. Rh4# (or 2. Rh3# / 2. Rh1#)',
    solutionExplanation:
      'By boldly sacrificing her queen on h7, Beth forces Borgov’s king onto an open square with zero escape routes, allowing the rook on the open file to deliver an immediate, unavoidable checkmate!',
    steps: [
      {
        step: 0,
        expectedFrom: [4, 4], // e4 (Q)
        expectedTo: [1, 7], // h7
        expectedPiece: 'Q',
        successMsg:
          '💥 Brilliant Queen Sacrifice! 1. Qxh7+! Beth pulls the Soviet champion out of the fortress!',
        replyFrom: [0, 6], // g8 (k)
        replyTo: [1, 7], // h7
        replyPiece: 'k',
        replyMsg:
          'Vasily Borgov captures the Queen: 1... Kxh7. White to deliver the final checkmate!',
      },
      {
        step: 1,
        expectedFrom: [7, 3], // d1 (R)
        expectedTo: [
          [4, 7], // Rh4#
          [5, 7], // Rh3#
          [6, 7], // Rh2#
          [7, 7], // Rh1#
          [3, 7], // Rh5#
        ],
        expectedPiece: 'R',
        successMsg:
          '🏆 CHECKMATE! 2. Rh4# — The open h-file battery seals victory! Beth Harmon is World Champion!',
      },
    ],
  },
  {
    id: 'morphy_opera_1858',
    title: 'Paul Morphy’s Opera Game (Paris 1858)',
    tag: 'Immortal Masterpiece',
    difficulty: 'Club Standard',
    toMove: 'White to Move & Force Checkmate in 2',
    intro:
      'Played in a private box during a performance of The Barber of Seville at the Paris Opera. American genius Paul Morphy proved that rapid tactical development beats raw material every time.',
    hint: 'A queen sacrifice on b8 forces Black’s knight to abandon its post defending the critical d8 back rank.',
    board: [
      ['.', '.', '.', 'r', 'k', '.', '.', 'r'], // rank 8 (0)
      ['p', 'p', 'p', 'q', '.', 'p', 'p', 'p'], // rank 7 (1)
      ['.', '.', 'n', '.', '.', '.', '.', '.'], // rank 6 (2) Black Knight on c6 [2,2]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', 'B', '.', 'P', '.', '.', '.'], // rank 4 (4) White Bishop on c4 [4,2]
      ['.', 'Q', '.', '.', '.', '.', '.', '.'], // rank 3 (5) White Queen on b3 [5,1]
      ['P', 'P', 'P', '.', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['.', '.', '.', 'R', 'K', '.', '.', 'R'], // rank 1 (7) White Rook on d1 [7,3]
    ],
    solutionMoves: '1. Qb8+! Nxb8 2. Rd8#',
    solutionExplanation:
      'Morphy’s famous 1. Qb8+! deflects the defending knight, clearing the way for 2. Rd8# where the rook and bishop form an airtight mating net on the back rank.',
    steps: [
      {
        step: 0,
        expectedFrom: [5, 1], // b3 (Q)
        expectedTo: [0, 1], // b8
        expectedPiece: 'Q',
        successMsg: '💥 Immortal Queen Sacrifice 1. Qb8+! Morphy forces the defending knight away!',
        replyFrom: [2, 2], // c6 (n)
        replyTo: [0, 1], // b8
        replyPiece: 'n',
        replyMsg:
          'Black captures with the Knight: 1... Nxb8. The back rank is undefended! Deliver checkmate!',
      },
      {
        step: 1,
        expectedFrom: [7, 3], // d1 (R)
        expectedTo: [0, 3], // d8
        expectedPiece: 'R',
        successMsg:
          '🏆 CHECKMATE! 2. Rd8# — The Rook and Bishop create an inescapable back-rank mating net!',
      },
    ],
  },
  {
    id: 'fischer_1956',
    title: 'Bobby Fischer’s Game of the Century (New York 1956)',
    tag: 'Prodigy Windmill',
    difficulty: 'Advanced',
    toMove: 'Black (13-Year-Old Fischer) to Play & Win',
    intro:
      'At just 13 years of age, Bobby Fischer shocked International Master Donald Byrne with an unfathomable queen sacrifice that became known as the Game of the Century.',
    hint: 'Leave your queen attacked on b6! Look at Black’s light-squared bishop springing to e6.',
    board: [
      ['r', '.', '.', '.', '.', 'r', 'k', '.'], // rank 8 (0)
      ['p', 'p', '.', '.', '.', 'p', 'b', 'p'], // rank 7 (1)
      ['.', '.', 'n', 'p', 'b', 'n', 'p', '.'], // rank 6 (2) Black Bishop on e6 [2,4]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', '.', '.', 'P', '.', '.', '.'], // rank 4 (4)
      ['.', '.', 'N', '.', '.', 'N', '.', '.'], // rank 3 (5)
      ['P', 'P', '.', '.', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['R', '.', 'B', 'Q', 'K', '.', '.', 'R'], // rank 1 (7)
    ],
    solutionMoves: '17... Be6!! 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+',
    solutionExplanation:
      'Rather than retreating his queen, young Fischer offered it as bait! Once White captured on b6, Fischer launched a legendary discovered check windmill that netted an overwhelming material advantage.',
    steps: [
      {
        step: 0,
        expectedFrom: [2, 4], // e6
        expectedTo: [3, 3], // d5 or active square
        expectedPiece: 'b',
        successMsg:
          '💥 Fischer’s Legendary Master Move 17... Be6!! White cannot survive the discovered windmill!',
      },
    ],
  },
];

// ==========================================
// 11-YEAR-OLD ROOKIE ACADEMY: BEGINNER MISSIONS
// Interactive step-by-step training challenges
// ==========================================
export const BEGINNER_ROOKIE_PUZZLES = [
  {
    id: 'rookie_pawn_promotion',
    title: 'Mission 1: The Pawn Power Race (Promotion!)',
    tag: 'Pawn Superpower',
    difficulty: 'Rookie · Step 1',
    toMove: 'White to Move: Crown your Pawn into an Almighty Queen',
    intro:
      'Your brave soldier pawn on e7 has marched across the entire battlefield. It is just one step away from the final rank! Push it forward to e8 to unlock its ultimate superpower: transforming into an almighty Queen!',
    hint: 'Click on your White Pawn on e7 and move it forward one square to e8.',
    board: [
      ['k', '.', '.', '.', '.', '.', '.', '.'], // rank 8 (0) Black King on a8
      ['.', '.', '.', '.', 'P', '.', '.', '.'], // rank 7 (1) White Pawn on e7 [1,4]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 6 (2)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 4 (4)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 3 (5)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 2 (6)
      ['.', '.', '.', '.', 'K', '.', '.', '.'], // rank 1 (7) White King on e1
    ],
    solutionMoves: '1. e8=Q+! (Pawn transforms into a Queen)',
    solutionExplanation:
      'When a humble 1-point pawn reaches the opposite edge of the board, it promotes into any piece you want — almost always a 9-point Queen! White is now completely winning.',
    steps: [
      {
        step: 0,
        expectedFrom: [1, 4], // e7
        expectedTo: [0, 4], // e8
        expectedPiece: 'P',
        successMsg:
          '👑 SUPERPOWER UNLOCKED! 1. e8=Q+! Your pawn reaches the end and transforms into a Queen! The Black King is in check!',
        replyFrom: [0, 0], // a8
        replyTo: [0, 1], // b8
        replyPiece: 'k',
        replyMsg:
          'The Black King scrambles to b8 to escape check. You successfully promoted your first pawn!',
      },
    ],
  },
  {
    id: 'rookie_knight_fork',
    title: 'Mission 2: The Knight’s L-Hop Royal Fork!',
    tag: 'Knight Magic',
    difficulty: 'Rookie · Step 2',
    toMove: 'White to Move: Attack King & Queen at the Exact Same Time!',
    intro:
      'The Knight is the only piece that can jump over other pieces! It moves in an "L" shape: 2 squares in one direction, then 1 step turn. Can you hop your Knight into d5 to attack BOTH the Black King and Queen at once? This double attack is called a FORK!',
    hint: 'Hop your Knight from c3 to d5! Count: 2 squares up and 1 square right.',
    board: [
      ['.', '.', '.', '.', 'k', '.', '.', '.'], // rank 8 (0) Black King on e8 [0,4]
      ['.', '.', 'q', '.', '.', '.', '.', '.'], // rank 7 (1) Black Queen on c7 [1,2]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 6 (2)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 4 (4)
      ['.', '.', 'N', '.', '.', '.', '.', '.'], // rank 3 (5) White Knight on c3 [5,2]
      ['P', 'P', 'P', '.', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['.', '.', '.', '.', 'K', '.', '.', '.'], // rank 1 (7) White King on e1
    ],
    solutionMoves: '1. Nd5+! (Forking the King and Queen)',
    solutionExplanation:
      'A "Fork" is when one piece attacks two enemy pieces simultaneously. Because the King is in check, Black must save the King, allowing White to capture the Queen next move!',
    steps: [
      {
        step: 0,
        expectedFrom: [5, 2], // c3
        expectedTo: [3, 3], // d5
        expectedPiece: 'N',
        successMsg:
          '🐴 ROYAL FORK! 1. Nd5+! Your Knight hops into the center, checking the King AND attacking the Queen!',
        replyFrom: [0, 4], // e8
        replyTo: [0, 5], // f8
        replyPiece: 'k',
        replyMsg:
          'The King must run to f8 to get out of check! Next turn, you get to snap up the Black Queen for free!',
      },
    ],
  },
  {
    id: 'rookie_scholars_defense',
    title: 'Mission 3: Defending the Sneaky Scholar’s Mate!',
    tag: 'King Shield',
    difficulty: 'Rookie · Step 3',
    toMove: 'Black to Move: Spot the Danger & Block the Checkmate',
    intro:
      'White is trying to pull off the notorious 4-move "Scholar’s Mate" trick! The White Queen on h5 and Bishop on c4 are both aiming like lasers at your weak f7 pawn. If White plays Qxf7#, the game is over! Spot the threat and push your pawn to create an iron shield!',
    hint: 'Push your pawn on g7 forward one square to g6 to block the Queen’s path and kick her away!',
    board: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // rank 8 (0)
      ['p', 'p', 'p', 'p', '.', 'p', 'p', 'p'], // rank 7 (1) g7 pawn is on [1,6]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 6 (2) g6 is [2,6]
      ['.', '.', '.', '.', 'p', '.', '.', 'Q'], // rank 5 (3) Black e5 [3,4], White Qh5 [3,7]
      ['.', '.', 'B', '.', 'P', '.', '.', '.'], // rank 4 (4) White Bc4 [4,2], White e4 [4,4]
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 3 (5)
      ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['R', 'N', 'B', '.', 'K', '.', 'N', 'R'], // rank 1 (7)
    ],
    solutionMoves: '1... g6! (Blocks the diagonal and attacks the Queen)',
    solutionExplanation:
      'By playing 1... g6, Black shuts down White’s attack instantly. The Queen is blocked from f7 and attacked at the same time, forcing White to waste time retreating!',
    steps: [
      {
        step: 0,
        expectedFrom: [1, 6], // g7
        expectedTo: [2, 6], // g6
        expectedPiece: 'p',
        successMsg:
          '🛡️ TRAP DEFENDED! 1... g6! Your brave pawn creates a barrier blocking the Queen from f7 AND attacks her!',
        replyFrom: [3, 7], // h5
        replyTo: [5, 5], // f3
        replyPiece: 'Q',
        replyMsg:
          'White’s Queen is forced to retreat to f3 in defeat. You outsmarted the oldest trick in the book!',
      },
    ],
  },
  {
    id: 'rookie_ladder_mate',
    title: 'Mission 4: The Lawn Mower (Rook Ladder Mate!)',
    tag: 'Checkmate Pattern',
    difficulty: 'Rookie · Step 4',
    toMove: 'White to Move: Roll the Second Rook to Trap the King',
    intro:
      'Two Rooks working together are like a pair of lawn mowers cutting the grass! The White Rook on a7 already cuts off the 7th rank so the Black King cannot escape forward. Roll your second Rook from b1 all the way up to b8 to deliver checkmate!',
    hint: 'Slide your Rook from b1 all the way to b8 on the back rank.',
    board: [
      ['.', '.', '.', '.', 'k', '.', '.', '.'], // rank 8 (0) Black King on e8 [0,4]
      ['R', '.', '.', '.', '.', '.', '.', '.'], // rank 7 (1) White Rook on a7 [1,0] (cuts off rank 7)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 6 (2)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 5 (3)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 4 (4)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 3 (5)
      ['.', '.', '.', '.', '.', '.', '.', '.'], // rank 2 (6)
      ['.', 'R', '.', '.', 'K', '.', '.', '.'], // rank 1 (7) White Rook on b1 [7,1], White King on e1
    ],
    solutionMoves: '1. Rb8# (The Lawn Mower Ladder Mate)',
    solutionExplanation:
      'Rook on a7 guards the 7th rank; Rook on b8 attacks the King on the 8th rank. The King has zero legal escape squares. Checkmate!',
    steps: [
      {
        step: 0,
        expectedFrom: [7, 1], // b1
        expectedTo: [0, 1], // b8
        expectedPiece: 'R',
        successMsg:
          '🏆 LAWN MOWER CHECKMATE! 1. Rb8# — The King is trapped on the back rank with nowhere to run! Flawless teamwork!',
      },
    ],
  },
  {
    id: 'rookie_free_piece',
    title: 'Mission 5: Snatch the Free "Hanging" Piece!',
    tag: 'Board Vision',
    difficulty: 'Rookie · Step 5',
    toMove: 'White to Move: Capture Black’s Unprotected Bishop',
    intro:
      'In chess, when a player moves a piece and forgets to defend it with another piece, it is called a "hanging" piece! Black carelessly moved their Bishop onto e5 with no defenders. Use your powerful Queen on d4 to capture it for free (+3 points)!',
    hint: 'Your Queen on d4 can glide diagonally or straight. Capture the undefended Black Bishop on e5!',
    board: [
      ['r', '.', 'b', 'q', 'k', '.', '.', 'r'], // rank 8 (0)
      ['p', 'p', 'p', '.', '.', 'p', 'p', 'p'], // rank 7 (1)
      ['.', '.', 'n', '.', '.', '.', '.', '.'], // rank 6 (2)
      ['.', '.', '.', '.', 'b', '.', '.', '.'], // rank 5 (3) Black Bishop on e5 [3,4] (Hanging!)
      ['.', '.', '.', 'Q', '.', '.', '.', '.'], // rank 4 (4) White Queen on d4 [4,3]
      ['.', '.', 'N', '.', '.', 'N', '.', '.'], // rank 3 (5)
      ['P', 'P', 'P', '.', '.', 'P', 'P', 'P'], // rank 2 (6)
      ['R', '.', 'B', '.', 'K', '.', '.', 'R'], // rank 1 (7)
    ],
    solutionMoves: '1. Qxe5 (Winning the free bishop)',
    solutionExplanation:
      'Always look for free pieces! The Bishop had zero defenders, so White captures it cleanly and gains an immediate 3-point advantage.',
    steps: [
      {
        step: 0,
        expectedFrom: [4, 3], // d4
        expectedTo: [3, 4], // e5
        expectedPiece: 'Q',
        successMsg:
          '🎯 SNATCHED! 1. Qxe5! You captured the hanging Bishop for free (+3 points). Always keep your eyes open for undefended pieces!',
      },
    ],
  },
];

// ==========================================
// 11-YEAR-OLD BEGINNER'S PIECE ENCYCLOPEDIA
// Visual guide to how all 6 warriors move
// ==========================================
export const BEGINNER_PIECES_GUIDE = [
  {
    id: 'pawn',
    name: 'The Pawn',
    nickname: 'The Brave Soldier',
    value: '1 Point',
    symbol: '♙',
    colorHex: '#64748b',
    tagline: 'Smallest piece on the board, but with the greatest destiny!',
    movementSummary:
      'Marches forward 1 square (or 2 squares on its very first move). Captures 1 square diagonally forward.',
    rules: [
      'Marches straight forward only — pawns can NEVER walk backwards!',
      'First move bonus: from its starting home square, a pawn can choose to leap 2 squares forward.',
      'Capturing rule: captures enemy pieces 1 square DIAGONALLY forward (it cannot take pieces directly in front).',
      'Superpower: if it marches all the way to the 8th rank, it transforms into a Queen (Promotion)!',
    ],
    funMnemonic: 'Step straight, strike sideways!',
    matrixCoords: [
      [1, 2], // 1 square forward
      [0, 2], // 2 squares forward (first move)
      [1, 1], // diagonal capture left
      [1, 3], // diagonal capture right
    ],
  },
  {
    id: 'knight',
    name: 'The Knight',
    nickname: 'The Jumping Horse',
    value: '3 Points',
    symbol: '♘',
    colorHex: '#0284c7',
    tagline: 'The only piece that can jump over anyone on the board!',
    movementSummary:
      'Moves in an "L" shape: 2 steps in one direction, then 1 step turn. Always changes square color on each move.',
    rules: [
      'The jumper: leaping over friends or enemies does not stop its stride.',
      'Movement count: 2 squares forward/back/left/right + 1 square sideways like a capital "L".',
      'Color changer: if it starts on a white square, it lands on a black square, and vice-versa.',
      'Master of the Fork: fantastic at jumping into enemy camps and attacking two pieces at once!',
    ],
    funMnemonic: 'One, Two, Turn! (Or: Long-Long-Turn!)',
    matrixCoords: [
      [0, 1],
      [0, 3],
      [1, 0],
      [1, 4],
      [3, 0],
      [3, 4],
      [4, 1],
      [4, 3],
    ],
  },
  {
    id: 'bishop',
    name: 'The Bishop',
    nickname: 'The Diagonal Archer',
    value: '3 Points',
    symbol: '♗',
    colorHex: '#8b5cf6',
    tagline: 'Glides across the board at lightning speed on diagonals!',
    movementSummary:
      'Moves diagonally as far as it wants, as long as no other piece blocks its vision.',
    rules: [
      'Color loyal: you start with one Light-Squared Bishop and one Dark-Squared Bishop.',
      'A Light-Squared Bishop can NEVER touch a black square in its entire life!',
      'Long-range sniper: can strike an enemy from across the whole board in a single move.',
      'Pair power: keeping both bishops on the board controls both square colors like a crossfire.',
    ],
    funMnemonic: 'Stay on your color track and slice diagonally!',
    matrixCoords: [
      [0, 0],
      [1, 1],
      [3, 3],
      [4, 4],
      [0, 4],
      [1, 3],
      [3, 1],
      [4, 0],
    ],
  },
  {
    id: 'rook',
    name: 'The Rook',
    nickname: 'The Castle Tower',
    value: '5 Points',
    symbol: '♖',
    colorHex: '#16a34a',
    tagline: 'A heavy powerhouse that smashes through open files and ranks!',
    movementSummary:
      'Moves in straight lines like a giant plus sign (+): forward, backward, left, or right as far as it wants.',
    rules: [
      'Cross mover: straight up, straight down, straight left, straight right.',
      'Heavy hitter: worth 5 points — equal to an entire bishop plus two pawns!',
      'Castle dance: teams up with the King for the special "Castling" move.',
      'Lawn mower battery: two rooks on adjacent ranks can roll down the board to deliver checkmate!',
    ],
    funMnemonic: 'Up, down, left, right — straight lines of castle might!',
    matrixCoords: [
      [0, 2],
      [1, 2],
      [3, 2],
      [4, 2],
      [2, 0],
      [2, 1],
      [2, 3],
      [2, 4],
    ],
  },
  {
    id: 'queen',
    name: 'The Queen',
    nickname: 'The Superhero Empress',
    value: '9 Points',
    symbol: '♕',
    colorHex: '#d97706',
    tagline: 'The most powerful piece on the board — Rook and Bishop combined!',
    movementSummary:
      'Moves in ANY direction (straight or diagonal) as far as she wants. Cross (+) and X combined!',
    rules: [
      'Super combination: possesses the straight powers of a Rook AND diagonal powers of a Bishop.',
      'Super valuable: worth 9 points! Never trade your Queen for a minor piece like a knight or bishop.',
      'Golden advice: do not bring your Queen out too early in the opening, or enemy pieces will chase her around!',
      'Checkmate deliverer: the Queen delivers more checkmates than any other piece on the board.',
    ],
    funMnemonic: 'Every direction, any distance — the ultimate superhero!',
    matrixCoords: [
      [0, 2],
      [1, 2],
      [3, 2],
      [4, 2],
      [2, 0],
      [2, 1],
      [2, 3],
      [2, 4],
      [0, 0],
      [1, 1],
      [3, 3],
      [4, 4],
      [0, 4],
      [1, 3],
      [3, 1],
      [4, 0],
    ],
  },
  {
    id: 'king',
    name: 'The King',
    nickname: 'The Commander',
    value: 'Priceless (The Whole Game!)',
    symbol: '♔',
    colorHex: '#e11d48',
    tagline: 'The most important piece of all. If he falls, the battle is over!',
    movementSummary:
      'Moves 1 square in any direction. Can never move into danger or onto a square attacked by the enemy.',
    rules: [
      'One step at a time: moves 1 square in any direction (straight or diagonal).',
      'Never captured: the King is never taken off the board. When trapped with no escape, it is CHECKMATE!',
      'Check alert: when an enemy attacks your King, you MUST deal with it immediately (remember C-P-R!).',
      'The bodyguard: tuck your King behind three pawns by castling early in every game.',
    ],
    funMnemonic: 'One careful step at a time — protect your Commander at all costs!',
    matrixCoords: [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  },
];

// ==========================================
// 11-YEAR-OLD GOLDEN HABITS & RULES
// Plain-English memory anchors for beginners
// ==========================================
export const BEGINNER_GOLDEN_RULES = [
  {
    id: 'cpr_rule',
    title: 'The C-P-R Rule (When in Check!)',
    badge: 'Emergency Defense',
    icon: 'fa-heart-pulse',
    color: '#ef4444',
    summary:
      'When the opponent shouts "Check!", your King is under direct fire. You MUST respond immediately using one of the three C-P-R remedies:',
    points: [
      '<strong>C — Capture:</strong> Can you take the piece that is attacking your King?',
      '<strong>P — Protect (Block):</strong> Can you slide a piece between the attacker and your King as a shield?',
      '<strong>R — Run:</strong> Can your King step onto a safe, unattacked square to escape?',
    ],
    catchphrase: 'If you cannot Capture, Protect, or Run — it is CHECKMATE and the game is won!',
  },
  {
    id: 'setup_rules',
    title: 'Board Setup: White on Right & Queen on Her Color',
    badge: 'Pre-Game Ritual',
    icon: 'fa-chess-board',
    color: '#2563eb',
    summary:
      'Before moving a single piece, always double-check these two universal chess setup rules:',
    points: [
      '<strong>"White on the Right":</strong> Look at the bottom-right corner square facing you (h1 or a8). It MUST be a white/light square! If it is dark, rotate your board 90 degrees.',
      '<strong>"Queen on Her Own Color":</strong> The White Queen always sits on the White square (d1). The Black Queen always sits on the Black square (d8). The Kings sit beside them!',
    ],
    catchphrase: 'White on right, Queen on her color — every single time!',
  },
  {
    id: 'opening_habits',
    title: 'The 3 Golden Opening Habits',
    badge: 'First 5 Moves',
    icon: 'fa-trophy',
    color: '#ca8a04',
    summary:
      'Great grandmasters and Meoncross champions follow these 3 steps in the opening of every game:',
    points: [
      '<strong>1. Control the Center Courtyard:</strong> Push your center pawns (e4 or d4) to claim the middle of the board.',
      '<strong>2. Develop Knights & Bishops:</strong> Bring out your minor pieces toward the center before you touch your Queen or rooks.',
      '<strong>3. Castle Your King to Safety:</strong> Castle within the first 6–8 moves to tuck your King into a safe fortress behind pawns.',
    ],
    catchphrase: 'Center, Knights, Castle — that is how you win the opening!',
  },
  {
    id: 'castling_superpower',
    title: 'Castling: The King & Castle Dance',
    badge: 'Special Move',
    icon: 'fa-dungeon',
    color: '#16a34a',
    summary:
      'Castling is the only move in chess where you get to move TWO pieces in a single turn!',
    points: [
      '<strong>How it works:</strong> The King slides TWO squares toward the corner Rook. The Rook leaps over the King to sit right next to him!',
      '<strong>Kingside Castling (Short):</strong> King moves 2 squares right (to g1), Rook hops to f1.',
      '<strong>Queenside Castling (Long):</strong> King moves 2 squares left (to c1), Rook hops to d1.',
      '<strong>Golden condition:</strong> You cannot castle if your King has already moved, or if the King has to jump through check!',
    ],
    catchphrase: 'Slide two, hop over — your King is tucked safely in the fortress!',
  },
];
