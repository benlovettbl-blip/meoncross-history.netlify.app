import 'package:flutter/material';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/data_model.dart';
import '../theme/theme.dart';

class TimelineScreen extends StatefulWidget {
  const TimelineScreen({super.key});

  @override
  State<TimelineScreen> createState() => _TimelineScreenState();
}

class _TimelineScreenState extends State<TimelineScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedTag = 'All';
  final Set<String> _expandedEventIds = {};

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final dataset = appState.dataset;

    if (dataset == null) {
      return const Center(child: CircularProgressIndicator());
    }

    // 1. Flatten all events with their sections
    final List<FlatEvent> allFlatEvents = [];
    final Set<String> allTags = {'All'};

    for (var section in dataset.timelineData) {
      for (var i = 0; i < section.events.length; i++) {
        final event = section.events[i];
        final id = '${section.id}_event_$i';
        allFlatEvents.add(FlatEvent(
          id: id,
          section: section,
          event: event,
        ));
        for (var tag in event.tags) {
          if (tag.trim().isNotEmpty) {
            allTags.add(tag.trim());
          }
        }
      }
    }

    // 2. Filter events by search query and selected tag
    final filteredEvents = allFlatEvents.where((flat) {
      final matchesTag = _selectedTag == 'All' ||
          flat.event.tags.any((t) => t.trim().toLowerCase() == _selectedTag.toLowerCase());

      if (!matchesTag) return false;

      if (_searchQuery.isEmpty) return true;

      final query = _searchQuery.toLowerCase();
      return flat.event.subtitle.toLowerCase().contains(query) ||
          flat.event.text.toLowerCase().contains(query) ||
          flat.event.significance.toLowerCase().contains(query) ||
          flat.event.dates.any((d) => d.toLowerCase().contains(query)) ||
          flat.event.names.any((n) => n.toLowerCase().contains(query)) ||
          flat.event.stats.any((s) => s.toLowerCase().contains(query)) ||
          flat.section.title.toLowerCase().contains(query);
    }).toList();

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Top Search and Filter Bar
        Container(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.darkBgSurface : AppTheme.lightBgSurface,
            border: Border(
              bottom: BorderSide(
                color: isDark ? const Color(0x22FFFFFF) : const Color(0x140F172A),
                width: 1,
              ),
            ),
          ),
          child: Column(
            children: [
              // Search Bar
              TextField(
                controller: _searchController,
                onChanged: (val) {
                  setState(() {
                    _searchQuery = val;
                  });
                },
                decoration: InputDecoration(
                  hintText: 'Search dates, plots, names, or terms...',
                  prefixIcon: const Icon(Icons.search, size: 20),
                  suffixIcon: _searchQuery.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear, size: 18),
                          onPressed: () {
                            _searchController.clear();
                            setState(() {
                              _searchQuery = '';
                            });
                          },
                        )
                      : null,
                  filled: true,
                  fillColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                  contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                  hintStyle: const TextStyle(fontSize: 14),
                ),
              ),
              const SizedBox(height: 12),
              // Tags horizontal filter
              SizedBox(
                height: 32,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: allTags.map((tag) {
                    final isSelected = _selectedTag == tag;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: ChoiceChip(
                        label: Text(
                          tag,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                            color: isSelected
                                ? Colors.white
                                : (isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted),
                          ),
                        ),
                        selected: isSelected,
                        selectedColor: Theme.of(context).colorScheme.primary,
                        backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                        onSelected: (selected) {
                          if (selected) {
                            setState(() {
                              _selectedTag = tag;
                            });
                          }
                        },
                        showCheckmark: false,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
                        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                          side: BorderSide(
                            color: isSelected
                                ? Colors.transparent
                                : (isDark ? const Color(0x11FFFFFF) : const Color(0x11000000)),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),

        // Timeline List
        Expanded(
          child: filteredEvents.isEmpty
              ? _buildEmptyState()
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
                  itemCount: filteredEvents.length,
                  itemBuilder: (context, index) {
                    final flat = filteredEvents[index];
                    final isExpanded = _expandedEventIds.contains(flat.id);
                    final isLast = index == filteredEvents.length - 1;

                    return IntrinsicHeight(
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          // Left side line representation
                          _buildTimelineIndicator(context, index, isLast, isExpanded),
                          
                          // Right side content card
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(bottom: 16.0, left: 12.0),
                              child: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    if (isExpanded) {
                                      _expandedEventIds.remove(flat.id);
                                    } else {
                                      _expandedEventIds.add(flat.id);
                                    }
                                  });
                                },
                                child: Card(
                                  margin: EdgeInsets.zero,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    side: BorderSide(
                                      color: isExpanded
                                          ? Theme.of(context).colorScheme.primary.withOpacity(0.4)
                                          : (isDark ? const Color(0x1AFFFFFF) : const Color(0x0F0F172A)),
                                      width: isExpanded ? 1.5 : 1,
                                    ),
                                  ),
                                  child: Padding(
                                    padding: const EdgeInsets.all(16.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        // Header: Section Badge & Topic
                                        Row(
                                          children: [
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                              decoration: BoxDecoration(
                                                color: AppTheme.lightAccentCrimson.withOpacity(0.1),
                                                borderRadius: BorderRadius.circular(4),
                                              ),
                                              child: Text(
                                                flat.section.section,
                                                style: const TextStyle(
                                                  color: AppTheme.lightAccentCrimson,
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 10,
                                                  fontFamily: 'Outfit',
                                                ),
                                              ),
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Text(
                                                flat.section.topic,
                                                style: TextStyle(
                                                  color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
                                                  fontSize: 11,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                                maxLines: 1,
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                            Icon(
                                              isExpanded ? Icons.expand_less : Icons.expand_more,
                                              size: 18,
                                              color: Colors.grey,
                                            ),
                                          ],
                                        ),
                                        const SizedBox(height: 8),

                                        // Title & Date
                                        Row(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Expanded(
                                              child: Text(
                                                flat.event.subtitle,
                                                style: const TextStyle(
                                                  fontFamily: 'Outfit',
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 16,
                                                ),
                                              ),
                                            ),
                                            if (flat.event.dates.isNotEmpty) ...[
                                              const SizedBox(width: 8),
                                              Container(
                                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                decoration: BoxDecoration(
                                                  color: isDark
                                                      ? AppTheme.lightAccentGold.withOpacity(0.15)
                                                      : AppTheme.lightAccentGold.withOpacity(0.1),
                                                  borderRadius: BorderRadius.circular(4),
                                                  border: Border.all(
                                                    color: AppTheme.lightAccentGold.withOpacity(0.3),
                                                    width: 1,
                                                  ),
                                                ),
                                                child: Text(
                                                  flat.event.dates.first,
                                                  style: const TextStyle(
                                                    color: AppTheme.lightTextGold,
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 11,
                                                    fontFamily: 'Outfit',
                                                  ),
                                                ),
                                              ),
                                            ]
                                          ],
                                        ),
                                        
                                        // Content Preview (if collapsed)
                                        if (!isExpanded) ...[
                                          const SizedBox(height: 6),
                                          Text(
                                            flat.event.text,
                                            style: TextStyle(
                                              fontSize: 13,
                                              color: isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted,
                                            ),
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ],

                                        // Expanded Details
                                        if (isExpanded) ...[
                                          const SizedBox(height: 12),
                                          const Divider(height: 1),
                                          const SizedBox(height: 12),
                                          _buildParsedText(context, flat.event.text),
                                          const SizedBox(height: 16),
                                          
                                          // Tags: Figures and Data
                                          if (flat.event.names.isNotEmpty) ...[
                                            _buildEventChips(context, 'Key Figures', flat.event.names, isDark ? Colors.blue.shade900 : Colors.blue.shade50, Colors.blue),
                                            const SizedBox(height: 8),
                                          ],
                                          if (flat.event.stats.isNotEmpty) ...[
                                            _buildEventChips(context, 'Key Data / Terms', flat.event.stats, isDark ? Colors.amber.shade900 : Colors.amber.shade50, Colors.amber.shade800),
                                            const SizedBox(height: 8),
                                          ],
                                          if (flat.event.tags.isNotEmpty) ...[
                                            _buildEventChips(context, 'Topics', flat.event.tags, isDark ? Colors.purple.shade900 : Colors.purple.shade50, Colors.purple),
                                            const SizedBox(height: 16),
                                          ],

                                          // Significance Block
                                          Container(
                                            width: double.infinity,
                                            padding: const EdgeInsets.all(12),
                                            decoration: BoxDecoration(
                                              color: isDark
                                                  ? const Color(0xFF1B284E).withOpacity(0.3)
                                                  : const Color(0xFFF8FAFC),
                                              borderRadius: BorderRadius.circular(8),
                                              border: const Border(
                                                left: BorderSide(color: AppTheme.lightAccentCrimson, width: 3),
                                              ),
                                            ),
                                            child: Column(
                                              crossAxisAlignment: CrossAxisAlignment.start,
                                              children: [
                                                const Row(
                                                  children: [
                                                    Icon(Icons.star, color: AppTheme.lightAccentGold, size: 14),
                                                    SizedBox(width: 4),
                                                    Text(
                                                      'HISTORICAL SIGNIFICANCE',
                                                      style: TextStyle(
                                                        fontFamily: 'Outfit',
                                                        fontWeight: FontWeight.bold,
                                                        fontSize: 10,
                                                        color: AppTheme.lightAccentCrimson,
                                                        letterSpacing: 0.5,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                const SizedBox(height: 4),
                                                Text(
                                                  flat.event.significance,
                                                  style: TextStyle(
                                                    fontSize: 13,
                                                    fontStyle: FontStyle.italic,
                                                    color: isDark ? AppTheme.darkTextMain : AppTheme.lightTextMain,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildTimelineIndicator(BuildContext context, int index, bool isLast, bool isExpanded) {
    final primaryColor = Theme.of(context).colorScheme.primary;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SizedBox(
      width: 24,
      child: Column(
        children: [
          // Dot
          Container(
            width: 14,
            height: 14,
            decoration: BoxDecoration(
              color: isExpanded ? primaryColor : (isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0)),
              shape: BoxShape.circle,
              border: Border.all(
                color: isExpanded ? Colors.white.withOpacity(0.8) : primaryColor.withOpacity(0.5),
                width: 2.5,
              ),
            ),
          ),
          // Vertical Line
          if (!isLast)
            Expanded(
              child: Container(
                width: 2,
                color: isExpanded ? primaryColor.withOpacity(0.5) : (isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0)),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.event_busy_outlined, size: 48, color: Colors.grey.withOpacity(0.6)),
            const SizedBox(height: 16),
            const Text(
              'No Events Found',
              style: TextStyle(fontFamily: 'Outfit', fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Try adjusting your search query or tag filters.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey, fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEventChips(BuildContext context, String title, List<String> items, Color bg, Color textColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title.toUpperCase(),
          style: const TextStyle(
            fontSize: 9,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
            color: Colors.grey,
          ),
        ),
        const SizedBox(height: 4),
        Wrap(
          spacing: 4.0,
          runSpacing: 4.0,
          children: items.map((item) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: bg,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: textColor.withOpacity(0.15)),
              ),
              child: Text(
                item,
                style: TextStyle(
                  color: textColor,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

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
        style: TextStyle(
          fontSize: 14,
          height: 1.5,
          color: Theme.of(context).colorScheme.onSurface,
          fontFamily: 'Plus Jakarta Sans',
        ),
        children: spans,
      ),
    );
  }
}

class FlatEvent {
  final String id;
  final TimelineSection section;
  final TimelineEvent event;

  FlatEvent({
    required this.id,
    required this.section,
    required this.event,
  });
}
