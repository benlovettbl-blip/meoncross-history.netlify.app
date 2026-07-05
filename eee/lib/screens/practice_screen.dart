import 'dart:math';
import 'package:flutter/material';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/data_model.dart';
import '../theme/theme.dart';

class PracticeScreen extends StatefulWidget {
  const PracticeScreen({super.key});

  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> with SingleTickerProviderStateMixin {
  int _activeTab = 0; // 0: Specification Roulette, 1: Past Papers, 2: Mock Exam

  // --- Roulette State ---
  late AnimationController _rouletteController;
  double _wheelRotation = 0;
  bool _isSpinning = false;
  WheelTopic? _selectedTopic;
  WheelQuestion? _selectedQuestion;

  // --- Mock Exam State ---
  bool _mockExamActive = false;
  DescribeQuestion? _mockQ1a;
  DescribeQuestion? _mockQ1b;
  ExplainQuestion? _mockQ2;
  List<EssayQuestion> _mockEssays = []; // Usually 2 options: Q3 and Q4
  EssayQuestion? _selectedMockEssay;
  String _selectedMockPaperKey = 'random';
  final Map<String, bool> _expandedModelAnswers = {};

  @override
  void initState() {
    super.initState();
    _rouletteController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    );
  }

  @override
  void dispose() {
    _rouletteController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final dataset = appState.dataset;

    if (dataset == null) {
      return const Center(child: CircularProgressIndicator());
    }

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Tab Selection
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.darkBgSurface : AppTheme.lightBgSurface,
            border: Border(
              bottom: BorderSide(
                color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                width: 1,
              ),
            ),
          ),
          child: Row(
            children: [
              Expanded(
                child: _buildSubTab(0, 'Roulette Wheel', Icons.gamepad_outlined),
              ),
              Expanded(
                child: _buildSubTab(1, 'Past Papers', Icons.menu_book_outlined),
              ),
              Expanded(
                child: _buildSubTab(2, 'Mock Exams', Icons.description_outlined),
              ),
            ],
          ),
        ),

        // Active View
        Expanded(
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 200),
            child: _buildActiveView(context, dataset, appState),
          ),
        ),
      ],
    );
  }

  Widget _buildSubTab(int index, String label, IconData icon) {
    final isSelected = _activeTab == index;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primary = Theme.of(context).colorScheme.primary;

    return GestureDetector(
      onTap: () {
        setState(() {
          _activeTab = index;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isSelected ? primary : Colors.transparent,
              width: 2.5,
            ),
          ),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              color: isSelected ? primary : (isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted),
              size: 20,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                fontFamily: 'Outfit',
                color: isSelected ? primary : (isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveView(BuildContext context, AppDataset dataset, AppState appState) {
    switch (_activeTab) {
      case 0:
        return _buildRouletteView(context, dataset, appState);
      case 1:
        return _buildPastPapersView(context, dataset, appState);
      case 2:
        return _buildMockExamView(context, dataset, appState);
      default:
        return const SizedBox();
    }
  }

  // ==========================================
  // 1. ROULETTE VIEW
  // ==========================================
  Widget _buildRouletteView(BuildContext context, AppDataset dataset, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final wheelTopics = dataset.elizabethanWheelData;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          // Info Card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  const Icon(Icons.help_outline, color: AppTheme.lightAccentGold, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Specification Roulette',
                          style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                        Text(
                          'Spin the wheel to choose a random topic from the Edexcel Elizabethan specification and get a key practice prompt.',
                          style: TextStyle(fontSize: 12, color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Custom Canvas Wheel
          Center(
            child: Stack(
              alignment: Alignment.center,
              children: [
                // The Wheel with Rotation
                AnimatedBuilder(
                  animation: _rouletteController,
                  builder: (context, child) {
                    final angle = _rouletteController.value * pi * 8 + _wheelRotation;
                    return Transform.rotate(
                      angle: angle,
                      child: SizedBox(
                        width: 230,
                        height: 230,
                        child: CustomPaint(
                          painter: WheelPainter(
                            topics: wheelTopics,
                            isDark: isDark,
                          ),
                        ),
                      ),
                    );
                  },
                ),
                // Center Peg
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primary,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      )
                    ],
                    border: Border.all(color: Colors.white, width: 2.5),
                  ),
                  child: const Center(
                    child: Icon(Icons.replay, size: 14, color: Colors.white),
                  ),
                ),
                // Pointer Needle
                Positioned(
                  top: 0,
                  child: Container(
                    width: 16,
                    height: 24,
                    child: CustomPaint(
                      painter: NeedlePainter(
                        color: AppTheme.lightAccentCrimson,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Spin Button
          SizedBox(
            width: 140,
            child: ElevatedButton(
              onPressed: _isSpinning
                  ? null
                  : () {
                      setState(() {
                        _isSpinning = true;
                        _selectedTopic = null;
                        _selectedQuestion = null;
                      });

                      // Randomize stop angle and selected topic
                      final randomVal = Random().nextDouble();
                      final stopAngle = randomVal * pi * 2;
                      final topicCount = wheelTopics.length;
                      
                      // Calculate matching topic index based on stop angle
                      // The wheel rotates clockwise. The top pointer matches slice at angle = 3*pi/2 (or -pi/2).
                      // For simplicity, we choose a matching topic index randomly and align the final rotation.
                      final selectedIdx = Random().nextInt(topicCount);
                      final singleArc = (pi * 2) / topicCount;
                      
                      // Target angle puts the selected slice at the top (needle position)
                      // Target angle = - (selectedIdx * singleArc + singleArc/2) - pi/2
                      final targetAngle = - (selectedIdx * singleArc + singleArc / 2) - pi / 2;

                      _rouletteController.reset();
                      _rouletteController.forward().then((_) {
                        setState(() {
                          _isSpinning = false;
                          _wheelRotation = targetAngle;
                          _selectedTopic = wheelTopics[selectedIdx];
                          if (_selectedTopic!.questions.isNotEmpty) {
                            _selectedTopic!.questions.shuffle(Random());
                            _selectedQuestion = _selectedTopic!.questions.first;
                          }
                        });
                      });
                    },
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 12),
              ),
              child: const Text('Spin Wheel'),
            ),
          ),

          const SizedBox(height: 24),

          // Question Result
          if (_selectedQuestion != null && _selectedTopic != null) ...[
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: const BorderSide(color: AppTheme.lightAccentGold, width: 1.5),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.lightAccentGold.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            _selectedTopic!.topic,
                            style: const TextStyle(
                              color: AppTheme.lightTextGold,
                              fontWeight: FontWeight.bold,
                              fontSize: 10,
                              fontFamily: 'Outfit',
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.lightAccentCrimson.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            _selectedQuestion!.type.toUpperCase(),
                            style: const TextStyle(
                              color: AppTheme.lightAccentCrimson,
                              fontWeight: FontWeight.bold,
                              fontSize: 10,
                              fontFamily: 'Outfit',
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _selectedQuestion!.text,
                      style: const TextStyle(
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          _openWorkspace(context, appState, _selectedQuestion!.text, _selectedQuestion!.type, 'roulette_${_selectedQuestion!.text.hashCode}');
                        },
                        icon: const Icon(Icons.edit_note),
                        label: const Text('Open GCSE Workspace'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Theme.of(context).colorScheme.primary,
                          foregroundColor: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ] else if (_isSpinning) ...[
            const Center(
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: CircularProgressIndicator(),
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ==========================================
  // 2. PAST PAPERS VIEW
  // ==========================================
  Widget _buildPastPapersView(BuildContext context, AppDataset dataset, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final papers = dataset.officialPastPapers;

    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: papers.length,
      itemBuilder: (context, index) {
        final paper = papers[index];

        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            title: Text(
              paper.series,
              style: const TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 16),
            ),
            subtitle: Text(
              'Official Edexcel Paper Questions',
              style: TextStyle(fontSize: 12, color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted),
            ),
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    if (paper.q1a != null)
                      _buildPastPaperQuestionCard(context, appState, 'Q1a', paper.q1a!, '${paper.series}_q1a'),
                    if (paper.q1b != null)
                      _buildPastPaperQuestionCard(context, appState, 'Q1b', paper.q1b!, '${paper.series}_q1b'),
                    if (paper.q2 != null)
                      _buildPastPaperQuestionCard(context, appState, 'Q2', paper.q2!, '${paper.series}_q2'),
                    if (paper.q3 != null)
                      _buildPastPaperQuestionCard(context, appState, 'Q3/Q4 Options', paper.q3!, '${paper.series}_q3'),
                    if (paper.q4 != null)
                      _buildPastPaperQuestionCard(context, appState, 'Q3/Q4 Options', paper.q4!, '${paper.series}_q4'),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPastPaperQuestionCard(
    BuildContext context,
    AppState appState,
    String label,
    PastPaperQuestion q,
    String id,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isDark ? const Color(0x22FFFFFF) : const Color(0x11000000),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppTheme.lightAccentCrimson, fontFamily: 'Outfit'),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.lightAccentGold.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  q.type.toUpperCase(),
                  style: const TextStyle(color: AppTheme.lightTextGold, fontWeight: FontWeight.bold, fontSize: 9, fontFamily: 'Outfit'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            q.text,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              OutlinedButton.icon(
                onPressed: () {
                  setState(() {
                    _expandedModelAnswers[id] = !(_expandedModelAnswers[id] ?? false);
                  });
                },
                icon: Icon(
                  (_expandedModelAnswers[id] ?? false) ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                  size: 14,
                  color: const Color(0xFF10B981),
                ),
                label: Text(
                  (_expandedModelAnswers[id] ?? false)
                      ? (q.type.toLowerCase().contains('feature') || q.type.toLowerCase().contains('describe') ? 'Hide Model Answer' : 'Hide Model Plan')
                      : (q.type.toLowerCase().contains('feature') || q.type.toLowerCase().contains('describe') ? 'Model Answer' : 'Model Plan'),
                  style: const TextStyle(fontSize: 12, color: Color(0xFF10B981)),
                ),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  minimumSize: Size.zero,
                  side: const BorderSide(color: Color(0xFF10B981)),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton.icon(
                onPressed: () {
                  _openWorkspace(context, appState, q.text, q.type, id);
                },
                icon: const Icon(Icons.edit, size: 14),
                label: const Text('Write Answer', style: TextStyle(fontSize: 12)),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  minimumSize: Size.zero,
                ),
              ),
            ],
          ),
          if (appState.dataset != null && (_expandedModelAnswers[id] ?? false)) ...[
            const SizedBox(height: 12),
            _buildModelAnswerWidget(context, appState.dataset!, type: q.type, text: q.text),
          ],
        ],
      ),
    );
  }

  static const Map<String, Map<String, String>> _curatedMockPapers = {
    'mock1': {
      'title': "Mock 1: The 'High Probability' Paper",
      'q1a': 'ex-desc-11',
      'q1b': 'ex-desc-5',
      'q2': 'ex-exp-12',
      'q3': 'ex-essay-4',
      'q4': 'ex-essay-19',
    },
    'mock2': {
      'title': "Mock 2: The 'Moderate Probability' Paper",
      'q1a': 'ex-desc-1',
      'q1b': 'ex-desc-16',
      'q2': 'ex-exp-5',
      'q3': 'ex-essay-20',
      'q4': 'ex-essay-11',
    },
    'mock3': {
      'title': "Mock 3: The 'Mixed Threat' Paper",
      'q1a': 'ex-desc-20',
      'q1b': 'ex-desc-10',
      'q2': 'ex-exp-4',
      'q3': 'ex-essay-3',
      'q4': 'ex-essay-12',
    },
    'mock4': {
      'title': "Mock 4: The 'Least Likely' Paper",
      'q1a': 'ex-desc-22',
      'q1b': 'ex-desc-17',
      'q2': 'ex-exp-6',
      'q3': 'ex-essay-7',
      'q4': 'ex-essay-8',
    },
  };

  // ==========================================
  // 3. MOCK EXAM VIEW
  // ==========================================
  Widget _buildMockExamView(BuildContext context, AppDataset dataset, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (!_mockExamActive) {
      return Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.description, size: 64, color: Theme.of(context).colorScheme.primary.withOpacity(0.6)),
              const SizedBox(height: 16),
              const Text(
                'Edexcel GCSE Mock Paper',
                style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 20),
              ),
              const SizedBox(height: 8),
              const Text(
                'Practice with curated mock exams targeting key gaps in the specification, or generate a custom 32-mark examination paper under the updated Edexcel 2025 format.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 24),
              DropdownButtonFormField<String>(
                value: _selectedMockPaperKey,
                decoration: InputDecoration(
                  labelText: 'Select Mock Paper',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  filled: true,
                  fillColor: isDark ? const Color(0x11FFFFFF) : const Color(0x05000000),
                ),
                dropdownColor: isDark ? const Color(0xFF1E1E1E) : Colors.white,
                items: [
                  const DropdownMenuItem(
                    value: 'random',
                    child: Text('🎲 Randomly Generated Paper'),
                  ),
                  ..._curatedMockPapers.entries.map((entry) {
                    return DropdownMenuItem(
                      value: entry.key,
                      child: Text('📝 ' + entry.value['title']!),
                    );
                  }).toList(),
                ],
                onChanged: (val) {
                  if (val != null) {
                    setState(() {
                      _selectedMockPaperKey = val;
                    });
                  }
                },
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: () {
                  final descList = dataset.examData.describe;
                  final expList = dataset.examData.explain;
                  final essList = dataset.examData.essay;

                  if (descList.isEmpty || expList.isEmpty || essList.isEmpty) return;

                  if (_selectedMockPaperKey == 'random') {
                    final random = Random();
                    final q1a = descList[random.nextInt(descList.length)];
                    DescribeQuestion q1b = descList[random.nextInt(descList.length)];
                    while (q1b.id == q1a.id) {
                      q1b = descList[random.nextInt(descList.length)];
                    }
                    final q2 = expList[random.nextInt(expList.length)];
                    final shuffledEssays = List<EssayQuestion>.from(essList)..shuffle(random);

                    setState(() {
                      _mockQ1a = q1a;
                      _mockQ1b = q1b;
                      _mockQ2 = q2;
                      _mockEssays = shuffledEssays.sublist(0, min(2, shuffledEssays.length));
                      _selectedMockEssay = _mockEssays.first;
                      _mockExamActive = true;
                    });
                  } else {
                    final paperDef = _curatedMockPapers[_selectedMockPaperKey]!;
                    final q1a = descList.firstWhere((q) => q.id == paperDef['q1a'], orElse: () => descList.first);
                    final q1b = descList.firstWhere((q) => q.id == paperDef['q1b'], orElse: () => descList.first);
                    final q2 = expList.firstWhere((q) => q.id == paperDef['q2'], orElse: () => expList.first);
                    final q3 = essList.firstWhere((q) => q.id == paperDef['q3'], orElse: () => essList.first);
                    final q4 = essList.firstWhere((q) => q.id == paperDef['q4'], orElse: () => essList.first);

                    setState(() {
                      _mockQ1a = q1a;
                      _mockQ1b = q1b;
                      _mockQ2 = q2;
                      _mockEssays = [q3, q4];
                      _selectedMockEssay = q3;
                      _mockExamActive = true;
                    });
                  }
                },
                icon: const Icon(Icons.play_arrow),
                label: const Text('Start Mock Exam'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  _selectedMockPaperKey == 'random'
                      ? 'Paper 2B: Elizabethan England (Random)'
                      : _curatedMockPapers[_selectedMockPaperKey]!['title']!,
                  style: const TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 16),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              TextButton(
                onPressed: () {
                  setState(() {
                    _mockExamActive = false;
                  });
                },
                child: const Text('Exit Paper', style: TextStyle(color: Colors.red)),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Q1(a) Card
          if (_mockQ1a != null) ...[
            _buildMockQuestionSection(
              context,
              appState,
              numberLabel: 'Question 1(a)',
              marksLabel: '2 Marks',
              typeLabel: 'describe',
              questionText: _mockQ1a!.question,
              id: 'mock_paper_q1a_${_mockQ1a!.id}',
              clue: _mockQ1a!.clue,
              questionObj: _mockQ1a,
            ),
            const SizedBox(height: 16),
          ],

          // Q1(b) Card
          if (_mockQ1b != null) ...[
            _buildMockQuestionSection(
              context,
              appState,
              numberLabel: 'Question 1(b)',
              marksLabel: '2 Marks',
              typeLabel: 'describe',
              questionText: _mockQ1b!.question,
              id: 'mock_paper_q1b_${_mockQ1b!.id}',
              clue: _mockQ1b!.clue,
              questionObj: _mockQ1b,
            ),
            const SizedBox(height: 16),
          ],

          // Q2 Card
          if (_mockQ2 != null) ...[
            _buildMockQuestionSection(
              context,
              appState,
              numberLabel: 'Question 2',
              marksLabel: '12 Marks',
              typeLabel: 'explain',
              questionText: _mockQ2!.question,
              id: 'mock_paper_q2_${_mockQ2!.id}',
              prompts: _mockQ2!.prompts,
              questionObj: _mockQ2,
            ),
            const SizedBox(height: 16),
          ],

          // Q3/Q4 Choice Card
          if (_mockEssays.isNotEmpty) ...[
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(
                  color: isDark ? const Color(0x22FFFFFF) : const Color(0x11000000),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Question 3 / 4 (Choose One)',
                          style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 14, color: AppTheme.lightAccentCrimson),
                        ),
                        Text(
                          '16 Marks',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    
                    // Selector radio buttons
                    Column(
                      children: _mockEssays.map((essay) {
                        final idx = _mockEssays.indexOf(essay) + 3;
                        return RadioListTile<EssayQuestion>(
                          title: Text(
                            'Q$idx: ${essay.question}',
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                          ),
                          value: essay,
                          groupValue: _selectedMockEssay,
                          onChanged: (val) {
                            setState(() {
                              _selectedMockEssay = val;
                            });
                          },
                        );
                      }).toList(),
                    ),

                    if (_selectedMockEssay != null) ...[
                      const SizedBox(height: 8),
                      const Text(
                        'You may use the following prompts in your answer:',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
                      ),
                      const SizedBox(height: 4),
                      BulletList(items: _selectedMockEssay!.prompts),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          OutlinedButton.icon(
                            onPressed: () {
                              final id = 'mock_paper_essay_${_selectedMockEssay!.id}';
                              setState(() {
                                _expandedModelAnswers[id] = !(_expandedModelAnswers[id] ?? false);
                              });
                            },
                            icon: Icon(
                              (_expandedModelAnswers['mock_paper_essay_${_selectedMockEssay!.id}'] ?? false)
                                  ? Icons.visibility_off_outlined
                                  : Icons.visibility_outlined,
                              size: 14,
                              color: const Color(0xFF10B981),
                            ),
                            label: Text(
                              (_expandedModelAnswers['mock_paper_essay_${_selectedMockEssay!.id}'] ?? false)
                                  ? 'Hide Model Plan'
                                  : 'Model Plan',
                              style: const TextStyle(fontSize: 12, color: Color(0xFF10B981)),
                            ),
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              minimumSize: Size.zero,
                              side: const BorderSide(color: Color(0xFF10B981)),
                            ),
                          ),
                          const SizedBox(width: 8),
                          ElevatedButton.icon(
                            onPressed: () {
                              _openWorkspace(context, appState, _selectedMockEssay!.question, 'essay', 'mock_paper_essay_${_selectedMockEssay!.id}');
                            },
                            icon: const Icon(Icons.edit),
                            label: const Text('Write Essay Answer'),
                          ),
                        ],
                      ),
                      if (dataset != null && (_expandedModelAnswers['mock_paper_essay_${_selectedMockEssay!.id}'] ?? false)) ...[
                        const SizedBox(height: 12),
                        _buildModelAnswerWidget(context, dataset, question: _selectedMockEssay),
                      ],
                    ],
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildMockQuestionSection(
    BuildContext context,
    AppState appState, {
    required String numberLabel,
    required String marksLabel,
    required String typeLabel,
    required String questionText,
    required String id,
    String? clue,
    List<String>? prompts,
    dynamic questionObj,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final dataset = appState.dataset;

    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: isDark ? const Color(0x22FFFFFF) : const Color(0x11000000),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  numberLabel,
                  style: const TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 14, color: AppTheme.lightAccentCrimson),
                ),
                Text(
                  marksLabel,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              questionText,
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
            ),
            if (clue != null) ...[
              const SizedBox(height: 8),
              Text(
                'Clue: $clue',
                style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.grey),
              ),
            ],
            if (prompts != null) ...[
              const SizedBox(height: 12),
              const Text(
                'You may use the following prompts in your answer:',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
              ),
              const SizedBox(height: 4),
              BulletList(items: prompts),
            ],
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                OutlinedButton.icon(
                  onPressed: () {
                    setState(() {
                      _expandedModelAnswers[id] = !(_expandedModelAnswers[id] ?? false);
                    });
                  },
                  icon: Icon(
                    (_expandedModelAnswers[id] ?? false) ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                    size: 14,
                    color: const Color(0xFF10B981),
                  ),
                  label: Text(
                    (_expandedModelAnswers[id] ?? false)
                        ? (typeLabel == 'describe' ? 'Hide Model Answer' : 'Hide Model Plan')
                        : (typeLabel == 'describe' ? 'Model Answer' : 'Model Plan'),
                    style: const TextStyle(fontSize: 12, color: Color(0xFF10B981)),
                  ),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    minimumSize: Size.zero,
                    side: const BorderSide(color: Color(0xFF10B981)),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton.icon(
                  onPressed: () {
                    _openWorkspace(context, appState, questionText, typeLabel, id);
                  },
                  icon: const Icon(Icons.edit),
                  label: const Text('Write Answer'),
                ),
              ],
            ),
            if (dataset != null && (_expandedModelAnswers[id] ?? false)) ...[
              const SizedBox(height: 12),
              _buildModelAnswerWidget(context, dataset, question: questionObj),
            ],
          ],
        ),
      ),
    );
  }

  // --- OPEN WORKSPACE HELPER ---
  void _openWorkspace(BuildContext context, AppState appState, String questionText, String type, String qId) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ExamWorkspaceScreen(
          questionText: questionText,
          questionType: type,
          questionId: qId,
        ),
      ),
    );
  }

  // --- MODEL ANSWERS LOOKUP & RENDERING HELPERS ---
  dynamic _findQuestion(AppDataset dataset, String type, String text) {
    final cleanText = text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
    
    String typeKey;
    if (type.toLowerCase().contains('feature') || type.toLowerCase().contains('describe')) {
      typeKey = 'describe';
    } else if (type.toLowerCase().contains('explain')) {
      typeKey = 'explain';
    } else {
      typeKey = 'essay';
    }

    String normalize(String t) {
      return t.toLowerCase()
              .replaceAll(RegExp(r'[^a-z0-9]'), '')
              .replaceAll('twofeaturesof', 'onefeatureof')
              .replaceAll('threefeaturesof', 'onefeatureof');
    }

    final normalizedTarget = normalize(text);

    if (typeKey == 'describe') {
      for (var q in dataset.examData.describe) {
        if (q.question.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '') == cleanText) {
          return q;
        }
      }
      for (var q in dataset.examData.describe) {
        final cleanQ = normalize(q.question);
        if (cleanQ.contains(normalizedTarget) || normalizedTarget.contains(cleanQ)) {
          return q;
        }
      }
    } else if (typeKey == 'explain') {
      for (var q in dataset.examData.explain) {
        if (q.question.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '') == cleanText) {
          return q;
        }
      }
      for (var q in dataset.examData.explain) {
        final cleanQ = normalize(q.question);
        if (cleanQ.contains(normalizedTarget) || normalizedTarget.contains(cleanQ)) {
          return q;
        }
      }
    } else if (typeKey == 'essay') {
      for (var q in dataset.examData.essay) {
        if (q.question.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '') == cleanText) {
          return q;
        }
      }
      for (var q in dataset.examData.essay) {
        final cleanQ = normalize(q.question);
        if (cleanQ.contains(normalizedTarget) || normalizedTarget.contains(cleanQ)) {
          return q;
        }
      }
    }
    return null;
  }

  Widget _buildModelAnswerWidget(BuildContext context, AppDataset dataset, {dynamic question, String? type, String? text}) {
    final q = question ?? (type != null && text != null ? _findQuestion(dataset, type, text) : null);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    if (q == null) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0x1A10B981) : const Color(0x0A10B981),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
        ),
        child: const Text(
          'Model answer is being compiled.',
          style: TextStyle(fontStyle: FontStyle.italic, fontSize: 13),
        ),
      );
    }

    if (q is DescribeQuestion) {
      final answer = q.modelAnswer;
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0x1A10B981) : const Color(0x0A10B981),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Grade 9 Model Answer (2 Marks):',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Color(0xFF10B981),
                fontSize: 13,
                fontFamily: 'Outfit',
              ),
            ),
            const SizedBox(height: 8),
            RichText(
              text: TextSpan(
                style: TextStyle(
                  fontSize: 13.5,
                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                  height: 1.5,
                ),
                children: [
                  WidgetSpan(
                    alignment: PlaceholderAlignment.middle,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0x266366F1),
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: Text(
                        answer.feature,
                        style: TextStyle(
                          fontWeight: FontWeight.w600, 
                          fontSize: 13, 
                          color: isDark ? Colors.indigo[200] : Colors.indigo[800],
                        ),
                      ),
                    ),
                  ),
                  const TextSpan(text: ' '),
                  WidgetSpan(
                    alignment: PlaceholderAlignment.middle,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0x26EAB308),
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: Text(
                        answer.detail,
                        style: TextStyle(
                          fontWeight: FontWeight.w600, 
                          fontSize: 13, 
                          color: isDark ? Colors.amber[200] : Colors.amber[800],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    } else if (q is ExplainQuestion) {
      final answer = q.modelAnswer;
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0x1A10B981) : const Color(0x0A10B981),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Grade 9 Model Plan:',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Color(0xFF10B981),
                fontSize: 13,
                fontFamily: 'Outfit',
              ),
            ),
            if (answer.intro.isNotEmpty) ...[
              const SizedBox(height: 8),
              Text(
                'Intro: ${answer.intro}',
                style: TextStyle(
                  fontStyle: FontStyle.italic, 
                  fontSize: 13, 
                  fontWeight: FontWeight.w500,
                  color: isDark ? Colors.white70 : Colors.black87,
                ),
              ),
            ],
            const SizedBox(height: 12),
            ...answer.paragraphs.asMap().entries.map((entry) {
              final idx = entry.key;
              final p = entry.value;
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.only(bottom: 8),
                decoration: idx < answer.paragraphs.length - 1
                    ? BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: isDark ? const Color(0x22FFFFFF) : const Color(0x11000000),
                            style: BorderStyle.dashed,
                          ),
                        ),
                      )
                    : null,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'PEEL ${idx + 1}:',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.lightAccentCrimson,
                        fontSize: 12.5,
                        fontFamily: 'Outfit',
                      ),
                    ),
                    const SizedBox(height: 4),
                    _buildPeelItem(context, 'Point', p.point),
                    _buildPeelItem(context, 'Evidence', p.evidence),
                    _buildPeelItem(context, 'Explanation', p.explanation),
                    _buildPeelItem(context, 'Link', p.link),
                  ],
                ),
              );
            }).toList(),
            if (answer.conclusion.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                'Conclusion: ${answer.conclusion}',
                style: TextStyle(
                  fontStyle: FontStyle.italic, 
                  fontSize: 13, 
                  fontWeight: FontWeight.w500,
                  color: isDark ? Colors.white70 : Colors.black87,
                ),
              ),
            ],
          ],
        ),
      );
    } else if (q is EssayQuestion) {
      final answer = q.modelAnswer;
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0x1A10B981) : const Color(0x0A10B981),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Grade 9 Model Plan:',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Color(0xFF10B981),
                fontSize: 13,
                fontFamily: 'Outfit',
              ),
            ),
            const SizedBox(height: 12),
            ...answer.paragraphs.asMap().entries.map((entry) {
              final idx = entry.key;
              final p = entry.value;
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.only(bottom: 8),
                decoration: idx < answer.paragraphs.length - 1
                    ? BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: isDark ? const Color(0x22FFFFFF) : const Color(0x11000000),
                            style: BorderStyle.dashed,
                          ),
                        ),
                      )
                    : null,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'PEEL ${idx + 1}:',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.lightAccentCrimson,
                        fontSize: 12.5,
                        fontFamily: 'Outfit',
                      ),
                    ),
                    const SizedBox(height: 4),
                    _buildPeelItem(context, 'Point', p.point),
                    _buildPeelItem(context, 'Evidence', p.evidence),
                    _buildPeelItem(context, 'Explanation', p.explanation),
                    _buildPeelItem(context, 'Link', p.link),
                  ],
                ),
              );
            }).toList(),
            if (answer.conclusion.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                'Conclusion: ${answer.conclusion}',
                style: TextStyle(
                  fontStyle: FontStyle.italic, 
                  fontSize: 13, 
                  fontWeight: FontWeight.w500,
                  color: isDark ? Colors.white70 : Colors.black87,
                ),
              ),
            ],
          ],
        ),
      );
    }
    return Container();
  }

  Widget _buildPeelItem(BuildContext context, String step, String text) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.only(left: 12.0, top: 2.0, bottom: 2.0),
      child: RichText(
        text: TextSpan(
          style: TextStyle(
            fontSize: 13, 
            height: 1.4,
            color: isDark ? Colors.white70 : Colors.black87,
          ),
          children: [
            TextSpan(
              text: '$step: ',
              style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
            ),
            TextSpan(
              text: text,
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// CUSTOM WHEEL PAINTERS
// ==========================================
class WheelPainter extends CustomPainter {
  final List<WheelTopic> topics;
  final bool isDark;

  WheelPainter({required this.topics, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final double radius = size.width / 2;
    final int count = topics.length;
    if (count == 0) return;

    final double sweepAngle = (pi * 2) / count;
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    final borderPaint = Paint()
      ..color = isDark ? Colors.white.withOpacity(0.3) : Colors.black.withOpacity(0.1)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    final Color color1 = AppTheme.lightAccentCrimson;
    final Color color2 = AppTheme.lightAccentGold;
    final Color color3 = AppTheme.lightPrimary;

    for (int i = 0; i < count; i++) {
      // Pick color
      if (i % 3 == 0) paint.color = color1.withOpacity(0.85);
      else if (i % 3 == 1) paint.color = color2.withOpacity(0.85);
      else paint.color = color3.withOpacity(0.85);

      final double startAngle = i * sweepAngle;
      
      // Draw slice arc
      canvas.drawArc(
        Rect.fromCircle(center: Offset(radius, radius), radius: radius),
        startAngle,
        sweepAngle,
        true,
        paint,
      );

      // Draw slice separator line
      canvas.drawArc(
        Rect.fromCircle(center: Offset(radius, radius), radius: radius),
        startAngle,
        sweepAngle,
        true,
        borderPaint,
      );

      // Render Topic Labels along the arc
      canvas.save();
      canvas.translate(radius, radius);
      canvas.rotate(startAngle + sweepAngle / 2);
      
      final textSpan = TextSpan(
        text: topics[i].topic.split(' ').take(2).join('\n'), // Grab first two words to fit
        style: const TextStyle(
          color: Colors.white,
          fontSize: 9,
          fontWeight: FontWeight.bold,
          fontFamily: 'Outfit',
        ),
      );

      final textPainter = TextPainter(
        text: textSpan,
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      )..layout();

      // Position text along the slice radius
      textPainter.paint(
        canvas,
        Offset(radius * 0.45 - textPainter.width / 2, -textPainter.height / 2),
      );
      
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class NeedlePainter extends CustomPainter {
  final Color color;
  NeedlePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path()
      ..moveTo(size.width / 2, size.height)
      ..lineTo(0, 0)
      ..lineTo(size.width, 0)
      ..close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class BulletList extends StatelessWidget {
  final List<String> items;
  const BulletList({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: items.map((item) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 4.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('• ', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
              Expanded(
                child: Text(
                  item,
                  style: const TextStyle(fontSize: 13),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}

// ==========================================
// EXAM WORKSPACE SCREEN
// ==========================================
class ExamWorkspaceScreen extends StatefulWidget {
  final String questionText;
  final String questionType; // describe, explain, essay
  final String questionId;

  const ExamWorkspaceScreen({
    super.key,
    required this.questionText,
    required this.questionType,
    required this.questionId,
  });

  @override
  State<ExamWorkspaceScreen> createState() => _ExamWorkspaceScreenState();
}

class _ExamWorkspaceScreenState extends State<ExamWorkspaceScreen> {
  // Text Editing Controllers mapping to scaffolded inputs
  final Map<String, TextEditingController> _controllers = {};
  
  // Scaffolding components by type
  late List<String> _scaffoldFields;
  late List<String> _scaffoldPlaceholders;

  // PEEL checklists
  final Map<String, bool> _checklist = {
    'Make a clear point directly answering the question': false,
    'Provide specific historical evidence (Dates, Names, Stats)': false,
    'Explain the links between the evidence and the point': false,
    'Conclude or link back to the prompt': false,
  };

  // Self assessment state
  bool _showModelAnswer = false;
  int _selfScore = 0;
  final TextEditingController _feedbackController = TextEditingController();

  @override
  void initState() {
    super.initState();
    
    // Define scaffolding structures based on question type
    if (widget.questionType == 'describe') {
      _scaffoldFields = ['Feature 1', 'Feature 1 Detail', 'Feature 2', 'Feature 2 Detail'];
      _scaffoldPlaceholders = [
        'State the first key feature (e.g. "One feature of the revolt was...")',
        'Add supporting details or evidence for Feature 1...',
        'State the second key feature...',
        'Add supporting details or evidence for Feature 2...'
      ];
    } else if (widget.questionType == 'explain') {
      _scaffoldFields = ['Introduction', 'PEEL Paragraph 1', 'PEEL Paragraph 2', 'PEEL Paragraph 3', 'Conclusion'];
      _scaffoldPlaceholders = [
        'Briefly outline your arguments...',
        'Write your first PEEL paragraph (Point, Evidence, Explanation, Link)...',
        'Write your second PEEL paragraph...',
        'Write your third PEEL paragraph...',
        'Synthesize and conclude your response...'
      ];
    } else {
      // Essay / Agree
      _scaffoldFields = ['Introduction', 'PEEL Paragraph 1 (Factor 1)', 'PEEL Paragraph 2 (Factor 2)', 'PEEL Paragraph 3 (Factor 3)', 'Conclusion'];
      _scaffoldPlaceholders = [
        'State your thesis: How far do you agree? Outline factors...',
        'Argue factor 1 using PEEL...',
        'Argue factor 2 using PEEL...',
        'Argue factor 3 using PEEL...',
        'Final judgement summarizing the extent of your agreement...'
      ];
    }

    // Initialize controllers
    for (var field in _scaffoldFields) {
      _controllers[field] = TextEditingController();
    }

    // Load draft if exists
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final appState = Provider.of<AppState>(context, listen: false);
      final draft = appState.getDraft(widget.questionId);
      if (draft != null) {
        setState(() {
          _controllers.forEach((field, ctrl) {
            if (draft.containsKey(field)) {
              ctrl.text = draft[field]!;
            }
          });
          
          if (draft.containsKey('selfScore')) {
            _selfScore = int.tryParse(draft['selfScore']!) ?? 0;
          }
          if (draft.containsKey('feedback')) {
            _feedbackController.text = draft['feedback']!;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _controllers.forEach((_, ctrl) => ctrl.dispose());
    _feedbackController.dispose();
    super.dispose();
  }

  void _saveDraft(AppState appState) {
    final Map<String, String> data = {};
    _controllers.forEach((field, ctrl) {
      data[field] = ctrl.text;
    });
    data['selfScore'] = _selfScore.toString();
    data['feedback'] = _feedbackController.text;

    appState.saveDraft(widget.questionId, data);
    
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Draft saved successfully!'),
        backgroundColor: AppTheme.lightAccentGreen,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final maxMarks = widget.questionType == 'describe' ? 4 : (widget.questionType == 'explain' ? 12 : 20);

    return Scaffold(
      appBar: AppBar(
        title: const Text('GCSE Answer Workspace', style: TextStyle(fontFamily: 'Outfit')),
        actions: [
          IconButton(
            icon: const Icon(Icons.save_outlined),
            tooltip: 'Save Draft',
            onPressed: () => _saveDraft(appState),
          ),
        ],
      ),
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Left side: Writing Workspace
          Expanded(
            flex: 3,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Question Banner
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isDark ? AppTheme.darkBgSurface : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '${widget.questionType.toUpperCase()} QUESTION',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10, color: AppTheme.lightAccentCrimson, fontFamily: 'Outfit'),
                            ),
                            Text(
                              'Max Marks: $maxMarks',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          widget.questionText,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Scaffolded Fields
                  ..._scaffoldFields.map((field) {
                    final idx = _scaffoldFields.indexOf(field);
                    final controller = _controllers[field]!;
                    final placeholder = _scaffoldPlaceholders[idx];

                    return Padding(
                      padding: const EdgeInsets.only(bottom: 20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            field,
                            style: const TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          const SizedBox(height: 6),
                          TextField(
                            controller: controller,
                            maxLines: field.contains('Paragraph') ? 6 : 2,
                            decoration: InputDecoration(
                              hintText: placeholder,
                              filled: true,
                              fillColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: BorderSide(
                                  color: isDark ? const Color(0x33FFFFFF) : const Color(0x140F172A),
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: BorderSide(
                                  color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                                ),
                              ),
                              contentPadding: const EdgeInsets.all(12),
                            ),
                            style: const TextStyle(fontSize: 14),
                          ),
                        ],
                      ),
                    );
                  }).toList(),

                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      OutlinedButton.icon(
                        onPressed: () {
                          setState(() {
                            _showModelAnswer = !_showModelAnswer;
                          });
                        },
                        icon: Icon(_showModelAnswer ? Icons.visibility_off : Icons.visibility),
                        label: Text(_showModelAnswer ? 'Hide Model Answer' : 'Show Model Answer & Rubric'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppTheme.lightAccentGold,
                          side: const BorderSide(color: AppTheme.lightAccentGold),
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          _saveDraft(appState);
                          Navigator.pop(context);
                        },
                        child: const Text('Save & Close'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Right side: Panel showing Checklist and Model Answer (wide layouts)
          if (MediaQuery.of(context).size.width >= 900 || _showModelAnswer)
            Expanded(
              flex: 2,
              child: Container(
                decoration: BoxDecoration(
                  border: Border(
                    left: BorderSide(
                      color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                      width: 1,
                    ),
                  ),
                  color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                ),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Checklist Section
                      const Text(
                        'PEEL Checklist',
                        style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 8),
                      Column(
                        children: _checklist.keys.map((item) {
                          return CheckboxListTile(
                            contentPadding: EdgeInsets.zero,
                            title: Text(item, style: const TextStyle(fontSize: 12)),
                            value: _checklist[item],
                            onChanged: (val) {
                              setState(() {
                                _checklist[item] = val ?? false;
                              });
                            },
                            controlAffinity: ListTileControlAffinity.leading,
                          );
                        }).toList(),
                      ),

                      const Divider(height: 32),

                      // Model Answer Section
                      if (_showModelAnswer) ...[
                        const Text(
                          'GCSE Model Answer',
                          style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 16, color: AppTheme.lightAccentGold),
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isDark ? AppTheme.darkBgSurface : Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppTheme.lightAccentGold.withOpacity(0.3)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Note: Look at how facts and link phrases are integrated.',
                                style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: Colors.grey),
                              ),
                              const SizedBox(height: 8),
                              _buildHighlightedModelAnswer(),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Rubrics Assessment
                        const Text(
                          'Self Assessment Rubric',
                          style: TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 8),
                        _buildRubricTable(),
                        const SizedBox(height: 16),

                        // Feedback scoring
                        Row(
                          children: [
                            const Text(
                              'Self Evaluate Score:',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            const SizedBox(width: 8),
                            DropdownButton<int>(
                              value: _selfScore,
                              items: List.generate(maxMarks + 1, (i) => i).map((score) {
                                return DropdownMenuItem<int>(
                                  value: score,
                                  child: Text('$score / $maxMarks'),
                                );
                              }).toList(),
                              onChanged: (val) {
                                setState(() {
                                  _selfScore = val ?? 0;
                                });
                              },
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'What went well / Even better if:',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _feedbackController,
                          maxLines: 2,
                          decoration: InputDecoration(
                            hintText: 'e.g. "I integrated two specific dates but need clearer links..."',
                            filled: true,
                            fillColor: isDark ? const Color(0xFF0B1329) : Colors.white,
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(6)),
                            contentPadding: const EdgeInsets.all(8),
                          ),
                          style: const TextStyle(fontSize: 13),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            )
        ],
      ),
    );
  }

  Widget _buildHighlightedModelAnswer() {
    // We return a static sample text or standard template explanation since model answers are structured in data.js.
    // In future versions, we can look up matching answers in dataset.examData.
    if (widget.questionType == 'describe') {
      return RichText(
        text: const TextSpan(
          style: TextStyle(fontSize: 13, color: Colors.black87, height: 1.4),
          children: [
            TextSpan(text: 'Feature 1: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentCrimson)),
            TextSpan(text: 'Elizabeth I appointed William Cecil as Secretary of State. '),
            TextSpan(text: 'Detail: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentGold)),
            TextSpan(text: 'Cecil was a highly experienced statesman who managed the government and security daily, serving her for 40 years.\n\n'),
            TextSpan(text: 'Feature 2: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentCrimson)),
            TextSpan(text: 'She used Patronage to control the nobility. '),
            TextSpan(text: 'Detail: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentGold)),
            TextSpan(text: 'She granted monopolies and titles to key nobles like Robert Dudley, making them loyal and dependent on her royal favour.'),
          ],
        ),
      );
    }

    return RichText(
      text: const TextSpan(
        style: TextStyle(fontSize: 13, color: Colors.black87, height: 1.4),
        children: [
          TextSpan(text: 'Point: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentCrimson)),
          TextSpan(text: 'A major cause of the religious tension was the Settlement of 1559. '),
          TextSpan(text: 'Evidence: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentGold)),
          TextSpan(text: 'This Act of Uniformity declared that all churches must use the Common Prayer Book and priests must wear vestments, charging a 12d fine for recusancy. '),
          TextSpan(text: 'Explanation: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightPrimary)),
          TextSpan(text: 'This angered devout Catholics as it prohibited the Latin Mass, which they believed was essential to salvation, leading to resentment and eventually active rebellion. '),
          TextSpan(text: 'Link: ', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.lightAccentGreen)),
          TextSpan(text: 'Therefore, the settlement directly created the divisions that destabilised her reign.'),
        ],
      ),
    );
  }

  Widget _buildRubricTable() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildRubricRow('Level 1', 'Basic knowledge, simple statements, lacking specific evidence.'),
        _buildRubricRow('Level 2', 'Shows good knowledge, some evidence, structured paragraphs.'),
        _buildRubricRow('Level 3', 'Analytical argument, detailed evidence (dates/names), clear PEEL structure.'),
      ],
    );
  }

  Widget _buildRubricRow(String level, String desc) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('$level: ', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.lightAccentCrimson)),
          Expanded(child: Text(desc, style: const TextStyle(fontSize: 11, color: Colors.grey))),
        ],
      ),
    );
  }
}
