import 'package:flutter/material';
import 'package:provider/provider.dart';
import 'models/app_state.dart';
import 'theme/theme.dart';
import 'screens/lessons_screen.dart';
import 'screens/timeline_screen.dart';
import 'screens/quiz_screen.dart';
import 'screens/practice_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppState(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);

    return MaterialApp(
      title: 'EEE Edexcel Revision',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: appState.themeMode,
      home: const MainNavigationShell(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const LessonsScreen(),
    const TimelineScreen(),
    const QuizScreen(),
    const PracticeScreen(),
  ];

  final List<Map<String, dynamic>> _navItems = [
    {
      'label': 'Lessons',
      'icon': Icons.menu_book_outlined,
      'activeIcon': Icons.menu_book,
    },
    {
      'label': 'Timeline',
      'icon': Icons.event_note_outlined,
      'activeIcon': Icons.event_note,
    },
    {
      'label': 'Recall Quiz',
      'icon': Icons.quiz_outlined,
      'activeIcon': Icons.quiz,
    },
    {
      'label': 'Practice',
      'icon': Icons.assignment_outlined,
      'activeIcon': Icons.assignment,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final width = MediaQuery.of(context).size.width;
    final isWide = width >= 768; // Web/Tablet breakpoint

    if (appState.isLoading) {
      return const Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text(
                'Loading Elizabethan Content...',
                style: TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      );
    }

    // App Bar
    final appBar = AppBar(
      title: Row(
        children: [
          Text(
            'EEE Edexcel Revision',
            style: TextStyle(
              fontFamily: 'Outfit',
              fontWeight: FontWeight.w800,
              fontSize: isWide ? 22 : 18,
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary.withOpacity(0.15),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              'UNIT 1',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
          ),
        ],
      ),
      actions: [
        // Streak indicator
        if (appState.streak > 0)
          Tooltip(
            message: 'Recall Quiz Streak',
            child: Row(
              children: [
                const Icon(Icons.local_fire_department, color: Colors.orange, size: 24),
                const SizedBox(width: 2),
                Text(
                  '${appState.streak}d',
                  style: const TextStyle(
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(width: 16),
              ],
            ),
          ),
        // Theme toggle
        IconButton(
          icon: Icon(
            appState.themeMode == ThemeMode.dark ? Icons.light_mode : Icons.dark_mode,
          ),
          onPressed: () {
            appState.toggleTheme(appState.themeMode != ThemeMode.dark);
          },
        ),
        const SizedBox(width: 8),
      ],
      elevation: 0,
      scrolledUnderElevation: 1.0,
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(
          color: Theme.of(context).dividerTheme.color ?? Colors.grey.withOpacity(0.2),
          height: 1,
        ),
      ),
    );

    if (isWide) {
      // Navigation Rail for Wide Screens
      return Scaffold(
        appBar: appBar,
        body: Row(
          children: [
            NavigationRail(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              labelType: NavigationRailLabelType.all,
              selectedIconTheme: IconThemeData(color: Theme.of(context).colorScheme.primary),
              unselectedIconTheme: const IconThemeData(color: Colors.grey),
              selectedLabelTextStyle: TextStyle(
                color: Theme.of(context).colorScheme.primary,
                fontWeight: FontWeight.bold,
                fontFamily: 'Outfit',
              ),
              unselectedLabelTextStyle: const TextStyle(
                color: Colors.grey,
                fontFamily: 'Outfit',
              ),
              destinations: _navItems.map((item) {
                return NavigationRailDestination(
                  icon: Icon(item['icon']),
                  selectedIcon: Icon(item['activeIcon']),
                  label: Text(item['label']),
                );
              }).toList(),
            ),
            const VerticalDivider(thickness: 1, width: 1),
            Expanded(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                child: _screens[_currentIndex],
              ),
            ),
          ],
        ),
      );
    } else {
      // Bottom Navigation Bar for Mobile
      return Scaffold(
        appBar: appBar,
        body: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: _screens[_currentIndex],
        ),
        bottomNavigationBar: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Divider(height: 1, thickness: 1),
            NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              destinations: _navItems.map((item) {
                return NavigationDestination(
                  icon: Icon(item['icon']),
                  selectedIcon: Icon(item['activeIcon']),
                  label: item['label'],
                );
              }).toList(),
            ),
          ],
        ),
      );
    }
  }
}
