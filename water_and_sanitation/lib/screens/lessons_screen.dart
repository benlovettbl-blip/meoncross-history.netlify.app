import 'package:flutter/material';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/data_model.dart';
import '../theme/theme.dart';

class LessonsScreen extends StatelessWidget {
  const LessonsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final dataset = appState.dataset;

    if (dataset == null) {
      return const Center(child: CircularProgressIndicator());
    }

    final timeline = dataset.timelineData;
    final totalLessons = timeline.length;
    final masteredLessonsCount = timeline.where((t) => appState.isLessonMastered(t.id)).length;
    final percentMastered = totalLessons > 0 ? masteredLessonsCount / totalLessons : 0.0;

    // Leitner stats
    int box1Count = 0;
    int box2Count = 0;
    int box3Count = 0;
    appState.quizCardBoxes.forEach((_, box) {
      if (box == 1) box1Count++;
      if (box == 2) box2Count++;
      if (box == 3) box3Count++;
    });

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Welcome and Stats Card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20.0),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: isDark
                    ? [const Color(0xFF1E284E), const Color(0xFF121C38)]
                    : [const Color(0xFFEEF2F6), const Color(0xFFFFFFFF)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isDark ? const Color(0x33FFFFFF) : const Color(0x140F172A),
                width: 1.0,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.02),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                )
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Early Elizabethan England Study Hub',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Master key topics, recall dates and events, and practice exam answers.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 20),
                // Progress indicator
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Mastery Progress: $masteredLessonsCount/$totalLessons KTs',
                      style: const TextStyle(
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    Text(
                      '${(percentMastered * 100).toInt()}%',
                      style: TextStyle(
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: percentMastered,
                    minHeight: 10,
                    backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFE2E8F0),
                    valueColor: AlwaysStoppedAnimation<Color>(Theme.of(context).colorScheme.primary),
                  ),
                ),
                const SizedBox(height: 20),
                // Leitner Boxes overview
                Row(
                  children: [
                    Expanded(
                      child: _buildBoxStat(
                        context,
                        'Box 1: Alert',
                        box1Count.toString(),
                        isDark ? AppTheme.lightAccentCrimson : Colors.red.shade700,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _buildBoxStat(
                        context,
                        'Box 2: Review',
                        box2Count.toString(),
                        isDark ? AppTheme.darkTextGold : AppTheme.lightTextGold,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _buildBoxStat(
                        context,
                        'Box 3: Mastered',
                        box3Count.toString(),
                        AppTheme.lightAccentGreen,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          // 2. Section Title
          const Text(
            'Key Study Units',
            style: TextStyle(
              fontFamily: 'Outfit',
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          // 3. List of Key Topics
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: timeline.length,
            itemBuilder: (context, index) {
              final kt = timeline[index];
              final isMastered = appState.isLessonMastered(kt.id);

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  contentPadding: const EdgeInsets.all(16),
                  title: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.lightAccentCrimson,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          kt.section,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Outfit',
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          kt.topic,
                          style: TextStyle(
                            fontSize: 11,
                            color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                    ],
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 8),
                      Text(
                        kt.title,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontFamily: 'Outfit',
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Icon(
                            Icons.menu_book_outlined,
                            size: 16,
                            color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            '${kt.events.length} Study Cards',
                            style: TextStyle(
                              fontSize: 12,
                              color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
                            ),
                          ),
                          const Spacer(),
                          TextButton.icon(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => StudyScreen(ktSection: kt),
                                ),
                              );
                            },
                            icon: const Icon(Icons.arrow_forward, size: 16),
                            label: const Text('Study'),
                            style: TextButton.styleFrom(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                              backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.08),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  trailing: Transform.scale(
                    scale: 1.1,
                    child: Checkbox(
                      value: isMastered,
                      activeColor: AppTheme.lightAccentGreen,
                      onChanged: (val) {
                        appState.toggleLessonMastery(kt.id);
                      },
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildBoxStat(BuildContext context, String title, String count, Color color) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: color.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Text(
            count,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: color,
              fontFamily: 'Outfit',
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: Colors.grey,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class StudyScreen extends StatefulWidget {
  final TimelineSection ktSection;
  const StudyScreen({super.key, required this.ktSection});

  @override
  State<StudyScreen> createState() => _StudyScreenState();
}

class _StudyScreenState extends State<StudyScreen> {
  late PageController _pageController;
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final events = widget.ktSection.events;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final appState = Provider.of<AppState>(context);

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.ktSection.section,
              style: const TextStyle(fontSize: 12, color: AppTheme.lightAccentCrimson, fontWeight: FontWeight.bold),
            ),
            Text(
              widget.ktSection.title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'Outfit'),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
      body: events.isEmpty
          ? const Center(child: Text('No study cards in this topic.'))
          : Column(
              children: [
                // Top Progress indicator
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: (events.length > 1) ? _currentPage / (events.length - 1) : 1.0,
                            minHeight: 6,
                            backgroundColor: isDark ? const Color(0xFF1E284E) : const Color(0xFFE2E8F0),
                            valueColor: AlwaysStoppedAnimation<Color>(Theme.of(context).colorScheme.primary),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        '${_currentPage + 1}/${events.length}',
                        style: const TextStyle(fontFamily: 'Outfit', fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (idx) {
                      setState(() {
                        _currentPage = idx;
                      });
                    },
                    itemCount: events.length,
                    itemBuilder: (context, index) {
                      final event = events[index];
                      return SingleChildScrollView(
                        padding: const EdgeInsets.all(16.0),
                        child: Card(
                          elevation: 1,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                            side: BorderSide(
                              color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                              width: 1,
                            ),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // Subtitle
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        event.subtitle,
                                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                              fontFamily: 'Outfit',
                                              color: Theme.of(context).colorScheme.primary,
                                            ),
                                      ),
                                    ),
                                    if (event.dates.isNotEmpty)
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: AppTheme.lightAccentGold,
                                          borderRadius: BorderRadius.circular(4),
                                        ),
                                        child: Text(
                                          event.dates.join(', '),
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                            fontFamily: 'Outfit',
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 16),
                                // Body text with parsed markdown bold tags
                                _buildParsedText(context, event.text),
                                const SizedBox(height: 20),
                                // Key facts tags
                                if (event.names.isNotEmpty) ...[
                                  _buildTagSection(context, 'Key Figures', event.names, isDark ? Colors.blue.shade900 : Colors.blue.shade50, Colors.blue),
                                  const SizedBox(height: 12),
                                ],
                                if (event.stats.isNotEmpty) ...[
                                  _buildTagSection(context, 'Key Data / Terms', event.stats, isDark ? Colors.amber.shade900 : Colors.amber.shade50, Colors.amber.shade800),
                                  const SizedBox(height: 12),
                                ],
                                if (event.tags.isNotEmpty) ...[
                                  _buildTagSection(context, 'Topics', event.tags, isDark ? Colors.purple.shade900 : Colors.purple.shade50, Colors.purple),
                                  const SizedBox(height: 20),
                                ],
                                // Historical Significance Box
                                Container(
                                  width: double.infinity,
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF1B284E).withOpacity(0.4) : const Color(0xFFF8FAFC),
                                    borderRadius: BorderRadius.circular(10),
                                    border: const Border(
                                      left: BorderSide(color: AppTheme.lightAccentCrimson, width: 4),
                                    ),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Row(
                                        children: [
                                          Icon(Icons.star, color: AppTheme.lightAccentGold, size: 16),
                                          SizedBox(width: 4),
                                          Text(
                                            'HISTORICAL SIGNIFICANCE',
                                            style: TextStyle(
                                              fontFamily: 'Outfit',
                                              fontWeight: FontWeight.bold,
                                              fontSize: 11,
                                              color: AppTheme.lightAccentCrimson,
                                              letterSpacing: 1.0,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        event.significance,
                                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                              fontStyle: FontStyle.italic,
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                // Footer navigation buttons
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      ElevatedButton(
                        onPressed: _currentPage > 0
                            ? () {
                                _pageController.previousPage(
                                  duration: const Duration(milliseconds: 350),
                                  curve: Curves.easeInOut,
                                );
                              }
                            : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey.shade300,
                          foregroundColor: Colors.black87,
                        ),
                        child: const Text('Back'),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          if (_currentPage < events.length - 1) {
                            _pageController.nextPage(
                              duration: const Duration(milliseconds: 350),
                              curve: Curves.easeInOut,
                            );
                          } else {
                            // Completed all cards, toggle mastery if not already
                            if (!appState.isLessonMastered(widget.ktSection.id)) {
                              appState.toggleLessonMastery(widget.ktSection.id);
                            }
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Lesson Study Completed! KT Mastery Updated.'),
                                backgroundColor: AppTheme.lightAccentGreen,
                              ),
                            );
                            Navigator.pop(context);
                          }
                        },
                        child: Text(_currentPage == events.length - 1 ? 'Finish Study' : 'Next Card'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildTagSection(BuildContext context, String header, List<String> items, Color bg, Color textColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          header.toUpperCase(),
          style: const TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
            color: Colors.grey,
          ),
        ),
        const SizedBox(height: 6),
        Wrap(
          spacing: 6.0,
          runSpacing: 4.0,
          children: items.map((name) {
            return Chip(
              label: Text(
                name,
                style: TextStyle(color: textColor, fontSize: 11, fontWeight: FontWeight.bold),
              ),
              backgroundColor: bg,
              padding: EdgeInsets.zero,
              labelPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 0),
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(6),
                side: BorderSide(color: textColor.withOpacity(0.15)),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  // Simple Markdown Parser for **bold** text in RichText
  Widget _buildParsedText(BuildContext context, String rawText) {
    final List<TextSpan> spans = [];
    final RegExp regExp = RegExp(r'\*\*(.*?)\*\*');
    int start = 0;

    for (final Match match in regExp.allMatches(rawText)) {
      if (match.start > start) {
        spans.add(TextSpan(text: rawText.substring(start, match.start)));
      }
      spans.add(TextSpan(
        text: match.group(1),
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Theme.of(context).colorScheme.primary,
        ),
      ));
      start = match.end;
    }

    if (start < rawText.length) {
      spans.add(TextSpan(text: rawText.substring(start)));
    }

    return RichText(
      text: TextSpan(
        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Theme.of(context).colorScheme.onSurface,
            ),
        children: spans,
      ),
    );
  }
}
