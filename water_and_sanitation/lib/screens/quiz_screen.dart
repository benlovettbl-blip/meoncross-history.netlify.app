import 'dart:math';
import 'package:flutter/material';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/data_model.dart';
import '../theme/theme.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  // Session State
  bool _inSession = false;
  List<QuizQuestion> _sessionQuestions = [];
  int _currentQuestionIndex = 0;
  String? _selectedOption;
  bool _answered = false;
  int _sessionCorrectCount = 0;
  
  // Leitner filtering
  int? _targetBoxFilter; // null means "All"
  
  // Animation/Flip State
  bool _showBack = false;

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final dataset = appState.dataset;

    if (dataset == null) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_inSession) {
      return _buildSessionView(context, appState);
    }

    return _buildDashboardView(context, appState);
  }

  // --- DASHBOARD VIEW ---
  Widget _buildDashboardView(BuildContext context, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    // Group questions by their current box
    int box1Count = 0;
    int box2Count = 0;
    int box3Count = 0;

    appState.quizCardBoxes.forEach((_, box) {
      if (box == 1) box1Count++;
      if (box == 2) box2Count++;
      if (box == 3) box3Count++;
    });

    final totalCards = box1Count + box2Count + box3Count;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Text(
            'Leitner Recall System',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            'Spaced repetition for long-term memory retrieval. Cards move up on correct answers and demote to Box 1 on mistakes.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 24),

          // Streak Info Panel
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: isDark
                    ? [const Color(0xFF1E284E), const Color(0xFF121C38)]
                    : [const Color(0xFFFFFBEB), const Color(0xFFFEF3C7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: isDark ? const Color(0x33FFFFFF) : const Color(0xFFFDE68A),
                width: 1,
              ),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.local_fire_department,
                  color: Colors.orange,
                  size: 32,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        appState.streak > 0
                            ? 'Daily Recall Streak: ${appState.streak} Days!'
                            : 'Start Your Streak Today',
                        style: TextStyle(
                          fontFamily: 'Outfit',
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          color: isDark ? Colors.white : const Color(0xFF92400E),
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        appState.streak > 0
                            ? 'Great job keeping up with daily revisions!'
                            : 'Complete any quiz session to start counting your daily streak.',
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? AppTheme.darkTextMuted : const Color(0xFFB45309),
                        ),
                      ),
                    ],
                  ),
                ),
                if (appState.streak > 0)
                  TextButton(
                    onPressed: () {
                      _showResetStreakDialog(context, appState);
                    },
                    style: TextButton.styleFrom(
                      foregroundColor: isDark ? Colors.red.shade300 : Colors.red.shade700,
                    ),
                    child: const Text('Reset'),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Leitner Boxes Dashboard Grid
          Row(
            children: [
              Expanded(
                child: _buildBoxCard(
                  context,
                  boxNumber: 1,
                  title: 'Box 1: Alert',
                  count: box1Count,
                  color: isDark ? AppTheme.lightAccentCrimson : Colors.red.shade700,
                  description: 'Needs urgent recall practice.',
                  onTap: box1Count > 0 ? () => _startSession(1, appState) : null,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildBoxCard(
                  context,
                  boxNumber: 2,
                  title: 'Box 2: Review',
                  count: box2Count,
                  color: isDark ? AppTheme.darkTextGold : AppTheme.lightTextGold,
                  description: 'Memory fading, needs checking.',
                  onTap: box2Count > 0 ? () => _startSession(2, appState) : null,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildBoxCard(
                  context,
                  boxNumber: 3,
                  title: 'Box 3: Mastered',
                  count: box3Count,
                  color: AppTheme.lightAccentGreen,
                  description: 'Secure, periodic revisions.',
                  onTap: box3Count > 0 ? () => _startSession(3, appState) : null,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Full Session Selector
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: totalCards > 0 ? () => _startSession(null, appState) : null,
              icon: const Icon(Icons.play_circle_fill),
              label: const Text('Start Mixed Revision (10 Random Cards)'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBoxCard(
    BuildContext context, {
    required int boxNumber,
    required String title,
    required int count,
    required Color color,
    required String description,
    required VoidCallback? onTap,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      elevation: 0,
      child: Container(
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: onTap != null ? color.withOpacity(0.3) : (isDark ? const Color(0x11FFFFFF) : const Color(0x11000000)),
            width: onTap != null ? 1.5 : 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    color: color,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '$count cards',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              description,
              style: TextStyle(
                fontSize: 12,
                color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: onTap,
                style: OutlinedButton.styleFrom(
                  foregroundColor: color,
                  side: BorderSide(color: color.withOpacity(0.5)),
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text('Practice Box', style: TextStyle(fontSize: 13)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- INITIALIZE SESSION ---
  void _startSession(int? boxNumber, AppState appState) {
    final dataset = appState.dataset;
    if (dataset == null) return;

    // Collect candidate questions based on the filter
    final List<QuizQuestion> pool = [];
    for (var topic in dataset.quizData) {
      for (var q in topic.questions) {
        final cardBox = appState.getCardBox(q.id);
        if (boxNumber == null || cardBox == boxNumber) {
          pool.add(q);
        }
      }
    }

    if (pool.isEmpty) return;

    // Shuffle pool and select up to 10 questions
    pool.shuffle(Random());
    final sessionCount = min(10, pool.length);

    setState(() {
      _targetBoxFilter = boxNumber;
      _sessionQuestions = pool.sublist(0, sessionCount);
      _currentQuestionIndex = 0;
      _inSession = true;
      _selectedOption = null;
      _answered = false;
      _sessionCorrectCount = 0;
      _showBack = false;
    });
  }

  // --- SESSION VIEW ---
  Widget _buildSessionView(BuildContext context, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    if (_currentQuestionIndex >= _sessionQuestions.length) {
      return _buildSummaryView(context, appState);
    }

    final question = _sessionQuestions[_currentQuestionIndex];
    final progressVal = (_currentQuestionIndex + 1) / _sessionQuestions.length;
    final currentBox = appState.getCardBox(question.id);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          // Progress bar
          Row(
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: progressVal,
                    minHeight: 6,
                    backgroundColor: isDark ? const Color(0xFF1E284E) : const Color(0xFFE2E8F0),
                    valueColor: AlwaysStoppedAnimation<Color>(Theme.of(context).colorScheme.primary),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                '${_currentQuestionIndex + 1}/${_sessionQuestions.length}',
                style: const TextStyle(
                  fontFamily: 'Outfit',
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // 3D Flip Card representation
          GestureDetector(
            onTap: () {
              setState(() {
                _showBack = !_showBack;
              });
            },
            child: TweenAnimationBuilder(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOut,
              tween: Tween<double>(begin: 0, end: _showBack ? pi : 0),
              builder: (context, double angle, child) {
                final isBack = angle >= pi / 2;
                return Transform(
                  transform: Matrix4.identity()
                    ..setEntry(3, 2, 0.001) // perspective
                    ..rotateY(angle),
                  alignment: Alignment.center,
                  child: isBack
                      ? Transform(
                          // Flip back content so it's not mirrored
                          transform: Matrix4.identity()..rotateY(pi),
                          alignment: Alignment.center,
                          child: _buildCardContent(
                            context,
                            title: 'ANSWER REVEALED',
                            color: AppTheme.lightAccentGreen,
                            content: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.check_circle_outline, color: AppTheme.lightAccentGreen, size: 36),
                                const SizedBox(height: 12),
                                Text(
                                  question.answer,
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                    fontFamily: 'Outfit',
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                    color: AppTheme.lightAccentGreen,
                                  ),
                                ),
                                const SizedBox(height: 16),
                                const Text(
                                  'Tap card to flip back to question.',
                                  style: TextStyle(fontSize: 12, color: Colors.grey, fontStyle: FontStyle.italic),
                                ),
                              ],
                            ),
                          ),
                        )
                      : _buildCardContent(
                          context,
                          title: 'BOX $currentBox CARD',
                          color: currentBox == 1
                              ? AppTheme.lightAccentCrimson
                              : (currentBox == 2 ? AppTheme.lightAccentGold : AppTheme.lightAccentGreen),
                          content: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                question.question,
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  fontFamily: 'Outfit',
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                ),
                              ),
                              const SizedBox(height: 16),
                              const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.flip, size: 14, color: Colors.grey),
                                  SizedBox(width: 4),
                                  Text(
                                    'Tap card to flip for answer',
                                    style: TextStyle(fontSize: 12, color: Colors.grey),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                );
              },
            ),
          ),
          const SizedBox(height: 24),

          // Options List
          Column(
            children: question.options.map((option) {
              final isCorrect = option == question.answer;
              final isSelected = option == _selectedOption;
              
              Color btnBorderColor = isDark ? const Color(0x33FFFFFF) : const Color(0x140F172A);
              Color btnBgColor = Colors.transparent;
              Color textAndIconColor = isDark ? Colors.white : Colors.black87;

              if (_answered) {
                if (isCorrect) {
                  btnBorderColor = AppTheme.lightAccentGreen;
                  btnBgColor = AppTheme.lightAccentGreen.withOpacity(0.12);
                  textAndIconColor = AppTheme.lightAccentGreen;
                } else if (isSelected) {
                  btnBorderColor = AppTheme.lightAccentCrimson;
                  btnBgColor = AppTheme.lightAccentCrimson.withOpacity(0.12);
                  textAndIconColor = AppTheme.lightAccentCrimson;
                }
              }

              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: _answered
                        ? null
                        : () {
                            setState(() {
                              _selectedOption = option;
                              _answered = true;
                              if (option == question.answer) {
                                _sessionCorrectCount++;
                                // Promote Box
                                final targetBox = (currentBox < 3) ? currentBox + 1 : 3;
                                appState.moveCard(question.id, targetBox);
                              } else {
                                // Demote to Box 1
                                appState.moveCard(question.id, 1);
                              }
                            });
                          },
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                      backgroundColor: btnBgColor,
                      disabledForegroundColor: textAndIconColor,
                      side: BorderSide(color: btnBorderColor, width: isSelected || (_answered && isCorrect) ? 2 : 1),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            option,
                            style: TextStyle(
                              fontSize: 14,
                              color: textAndIconColor,
                              fontWeight: isSelected || (_answered && isCorrect) ? FontWeight.bold : FontWeight.normal,
                            ),
                          ),
                        ),
                        if (_answered) ...[
                          if (isCorrect)
                            const Icon(Icons.check_circle, color: AppTheme.lightAccentGreen, size: 20)
                          else if (isSelected)
                            const Icon(Icons.cancel, color: AppTheme.lightAccentCrimson, size: 20),
                        ],
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 16),

          // Action Buttons
          if (_answered)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  _selectedOption == question.answer ? '🎉 Correct!' : '❌ Incorrect',
                  style: TextStyle(
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    color: _selectedOption == question.answer ? AppTheme.lightAccentGreen : AppTheme.lightAccentCrimson,
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _currentQuestionIndex++;
                      _selectedOption = null;
                      _answered = false;
                      _showBack = false;
                    });
                  },
                  child: const Text('Next Question'),
                ),
              ],
            )
          else
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () {
                    // Quit session
                    setState(() {
                      _inSession = false;
                    });
                  },
                  child: const Text('Quit Session'),
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildCardContent(
    BuildContext context, {
    required String title,
    required Color color,
    required Widget content,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      height: 180,
      decoration: BoxDecoration(
        color: isDark ? AppTheme.darkBgSurface : AppTheme.lightBgSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: color.withOpacity(0.4),
          width: 2,
        ),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(14),
        child: Stack(
          children: [
            // Top Accent tag
            Positioned(
              left: 12,
              top: 12,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: color,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ),
            // Center content
            Center(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 36, 20, 20),
                child: content,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- SUMMARY VIEW ---
  Widget _buildSummaryView(BuildContext context, AppState appState) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final total = _sessionQuestions.length;
    final pct = total > 0 ? _sessionCorrectCount / total : 0;

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  pct >= 0.7 ? Icons.stars : Icons.emoji_events,
                  color: AppTheme.lightAccentGold,
                  size: 64,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Revision Session Complete!',
                  style: TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'You scored $_sessionCorrectCount out of $total questions correctly.',
                  style: const TextStyle(fontSize: 14),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                
                // Progress Circle/Ring
                Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      width: 80,
                      height: 80,
                      child: CircularProgressIndicator(
                        value: pct,
                        strokeWidth: 8,
                        backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFE2E8F0),
                        valueColor: AlwaysStoppedAnimation<Color>(
                          pct >= 0.7 ? AppTheme.lightAccentGreen : (pct >= 0.4 ? AppTheme.lightAccentGold : AppTheme.lightAccentCrimson),
                        ),
                      ),
                    ),
                    Text(
                      '${(pct * 100).toInt()}%',
                      style: const TextStyle(
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 32),

                // Streak Banner Update
                FutureBuilder(
                  future: appState.updateStreak(),
                  builder: (context, snapshot) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.orange.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.orange.withOpacity(0.3)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.local_fire_department, color: Colors.orange, size: 20),
                          const SizedBox(width: 6),
                          Text(
                            'Daily Streak: ${appState.streak}d',
                            style: const TextStyle(
                              fontFamily: 'Outfit',
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                              color: Colors.orange,
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),

                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    OutlinedButton(
                      onPressed: () {
                        setState(() {
                          _inSession = false;
                        });
                      },
                      child: const Text('Back to Boxes'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        _startSession(_targetBoxFilter, appState);
                      },
                      child: const Text('Practice Again'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // --- RESET DIALOG ---
  void _showResetStreakDialog(BuildContext context, AppState appState) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Reset Streak?'),
          content: const Text('Are you sure you want to reset your daily learning streak? This cannot be undone.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                appState.resetStreak();
                Navigator.pop(context);
              },
              child: const Text('Reset', style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );
  }
}
