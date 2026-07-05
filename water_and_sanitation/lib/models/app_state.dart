import 'dart:convert';
import 'package:flutter/material';
import 'package:flutter/services.dart' show rootBundle;
import 'package:shared_preferences/shared_preferences.dart';
import 'data_model.dart';

class AppState extends ChangeNotifier {
  AppDataset? _dataset;
  ThemeMode _themeMode = ThemeMode.system;
  final Set<String> _masteredLessons = {};
  final Map<String, int> _quizCardBoxes = {}; // Maps question.id to box number (1, 2, or 3)
  int _streak = 0;
  String _lastQuizDate = '';
  final Map<String, Map<String, String>> _examDrafts = {}; // Maps question.id to {'feature': '...', 'detail': '...'} or {'paragraphs': '...', 'conclusion': '...'}
  bool _isLoading = true;

  // Getters
  AppDataset? get dataset => _dataset;
  ThemeMode get themeMode => _themeMode;
  Set<String> get masteredLessons => _masteredLessons;
  Map<String, int> get quizCardBoxes => _quizCardBoxes;
  int get streak => _streak;
  String get lastQuizDate => _lastQuizDate;
  Map<String, Map<String, String>> get examDrafts => _examDrafts;
  bool get isLoading => _isLoading;

  AppState() {
    _init();
  }

  Future<void> _init() async {
    try {
      // 1. Load data.json
      final String jsonString = await rootBundle.loadString('assets/data.json');
      final Map<String, dynamic> jsonData = json.decode(jsonString);
      _dataset = AppDataset.fromJson(jsonData);

      // 2. Load SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      
      // Theme
      final themeStr = prefs.getString('theme_mode');
      if (themeStr == 'light') {
        _themeMode = ThemeMode.light;
      } else if (themeStr == 'dark') {
        _themeMode = ThemeMode.dark;
      } else {
        _themeMode = ThemeMode.system;
      }

      // Mastered Lessons
      final masteredList = prefs.getStringList('mastered_lessons') ?? [];
      _masteredLessons.addAll(masteredList);

      // Quiz Leitner Box mappings
      final box1List = prefs.getStringList('leitner_box_1') ?? [];
      final box2List = prefs.getStringList('leitner_box_2') ?? [];
      final box3List = prefs.getStringList('leitner_box_3') ?? [];
      for (var id in box1List) {
        _quizCardBoxes[id] = 1;
      }
      for (var id in box2List) {
        _quizCardBoxes[id] = 2;
      }
      for (var id in box3List) {
        _quizCardBoxes[id] = 3;
      }

      // Initialize any questions not in a box to Box 1
      if (_dataset != null) {
        for (var topic in _dataset!.quizData) {
          for (var q in topic.questions) {
            if (!_quizCardBoxes.containsKey(q.id)) {
              _quizCardBoxes[q.id] = 1;
            }
          }
        }
      }

      // Streaks
      _streak = prefs.getInt('quiz_streak') ?? 0;
      _lastQuizDate = prefs.getString('last_quiz_date') ?? '';

      // Exam drafts
      final draftsJsonStr = prefs.getString('exam_drafts');
      if (draftsJsonStr != null) {
        final Map<String, dynamic> rawDrafts = json.decode(draftsJsonStr);
        rawDrafts.forEach((qId, valMap) {
          _examDrafts[qId] = Map<String, String>.from(valMap);
        });
      }

    } catch (e) {
      // Handle error gracefully or print in debug
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Theme methods
  Future<void> toggleTheme(bool isDark) async {
    _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('theme_mode', isDark ? 'dark' : 'light');
  }

  // Lesson Mastery methods
  bool isLessonMastered(String lessonId) => _masteredLessons.contains(lessonId);

  Future<void> toggleLessonMastery(String lessonId) async {
    if (_masteredLessons.contains(lessonId)) {
      _masteredLessons.remove(lessonId);
    } else {
      _masteredLessons.add(lessonId);
    }
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('mastered_lessons', _masteredLessons.toList());
  }

  // Quiz Leitner Box methods
  int getCardBox(String qId) => _quizCardBoxes[qId] ?? 1;

  Future<void> moveCard(String qId, int targetBox) async {
    _quizCardBoxes[qId] = targetBox;
    notifyListeners();
    
    // Save to SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    final box1 = <String>[];
    final box2 = <String>[];
    final box3 = <String>[];

    _quizCardBoxes.forEach((id, box) {
      if (box == 1) box1.add(id);
      if (box == 2) box2.add(id);
      if (box == 3) box3.add(id);
    });

    await prefs.setStringList('leitner_box_1', box1);
    await prefs.setStringList('leitner_box_2', box2);
    await prefs.setStringList('leitner_box_3', box3);
  }

  // Quiz Streak methods
  Future<void> updateStreak() async {
    final todayStr = DateTime.now().toIso8601String().substring(0, 10);
    if (_lastQuizDate == todayStr) {
      return; // Already updated today
    }

    final yesterdayStr = DateTime.now().subtract(const Duration(days: 1)).toIso8601String().substring(0, 10);
    if (_lastQuizDate == yesterdayStr) {
      _streak += 1;
    } else {
      _streak = 1; // Streak broken or new streak
    }

    _lastQuizDate = todayStr;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('quiz_streak', _streak);
    await prefs.setString('last_quiz_date', _lastQuizDate);
  }

  Future<void> resetStreak() async {
    _streak = 0;
    _lastQuizDate = '';
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('quiz_streak', 0);
    await prefs.remove('last_quiz_date');
  }

  // Exam Drafts methods
  Map<String, String>? getDraft(String qId) => _examDrafts[qId];

  Future<void> saveDraft(String qId, Map<String, String> data) async {
    _examDrafts[qId] = data;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('exam_drafts', json.encode(_examDrafts));
  }
}
