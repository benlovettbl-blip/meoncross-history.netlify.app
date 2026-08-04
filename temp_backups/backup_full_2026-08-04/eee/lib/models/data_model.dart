class TimelineEvent {
  final String subtitle;
  final String text;
  final List<String> dates;
  final List<String> names;
  final List<String> stats;
  final List<String> tags;
  final String significance;

  TimelineEvent({
    required this.subtitle,
    required this.text,
    required this.dates,
    required this.names,
    required this.stats,
    required this.tags,
    required this.significance,
  });

  factory TimelineEvent.fromJson(Map<String, dynamic> json) {
    return TimelineEvent(
      subtitle: json['subtitle'] ?? '',
      text: json['text'] ?? '',
      dates: List<String>.from(json['dates'] ?? []),
      names: List<String>.from(json['names'] ?? []),
      stats: List<String>.from(json['stats'] ?? []),
      tags: List<String>.from(json['tags'] ?? []),
      significance: json['significance'] ?? '',
    );
  }
}

class TimelineSection {
  final String id;
  final String section;
  final String topic;
  final String title;
  final List<TimelineEvent> events;

  TimelineSection({
    required this.id,
    required this.section,
    required this.topic,
    required this.title,
    required this.events,
  });

  factory TimelineSection.fromJson(Map<String, dynamic> json) {
    var list = json['events'] as List? ?? [];
    List<TimelineEvent> eventList = list.map((e) => TimelineEvent.fromJson(e)).toList();
    return TimelineSection(
      id: json['id'] ?? '',
      section: json['section'] ?? '',
      topic: json['topic'] ?? '',
      title: json['title'] ?? '',
      events: eventList,
    );
  }
}

class QuizQuestion {
  final String id;
  final String question;
  final List<String> options;
  final String answer;
  final String type;

  QuizQuestion({
    required this.id,
    required this.question,
    required this.options,
    required this.answer,
    required this.type,
  });

  factory QuizQuestion.fromJson(Map<String, dynamic> json) {
    return QuizQuestion(
      id: json['id'] ?? '',
      question: json['question'] ?? '',
      options: List<String>.from(json['options'] ?? []),
      answer: json['answer'] ?? '',
      type: json['type'] ?? '',
    );
  }
}

class QuizTopic {
  final String id;
  final String theme;
  final String title;
  final List<QuizQuestion> questions;

  QuizTopic({
    required this.id,
    required this.theme,
    required this.title,
    required this.questions,
  });

  factory QuizTopic.fromJson(Map<String, dynamic> json) {
    var list = json['questions'] as List? ?? [];
    List<QuizQuestion> qList = list.map((e) => QuizQuestion.fromJson(e)).toList();
    return QuizTopic(
      id: json['id'] ?? '',
      theme: json['theme'] ?? '',
      title: json['title'] ?? '',
      questions: qList,
    );
  }
}

class PeelParagraph {
  final String point;
  final String evidence;
  final String explanation;
  final String link;

  PeelParagraph({
    required this.point,
    required this.evidence,
    required this.explanation,
    required this.link,
  });

  factory PeelParagraph.fromJson(Map<String, dynamic> json) {
    return PeelParagraph(
      point: json['point'] ?? '',
      evidence: json['evidence'] ?? '',
      explanation: json['explanation'] ?? '',
      link: json['link'] ?? '',
    );
  }
}

class DescribeModelAnswer {
  final String feature;
  final String detail;

  DescribeModelAnswer({
    required this.feature,
    required this.detail,
  });

  factory DescribeModelAnswer.fromJson(Map<String, dynamic> json) {
    return DescribeModelAnswer(
      feature: json['feature'] ?? '',
      detail: json['detail'] ?? '',
    );
  }
}

class ExplainModelAnswer {
  final String intro;
  final List<PeelParagraph> paragraphs;
  final String conclusion;

  ExplainModelAnswer({
    required this.intro,
    required this.paragraphs,
    required this.conclusion,
  });

  factory ExplainModelAnswer.fromJson(Map<String, dynamic> json) {
    var list = json['paragraphs'] as List? ?? [];
    List<PeelParagraph> pList = list.map((e) => PeelParagraph.fromJson(e)).toList();
    return ExplainModelAnswer(
      intro: json['intro'] ?? '',
      paragraphs: pList,
      conclusion: json['conclusion'] ?? '',
    );
  }
}

class EssayModelAnswer {
  final List<PeelParagraph> paragraphs;
  final String conclusion;

  EssayModelAnswer({
    required this.paragraphs,
    required this.conclusion,
  });

  factory EssayModelAnswer.fromJson(Map<String, dynamic> json) {
    var list = json['paragraphs'] as List? ?? [];
    List<PeelParagraph> pList = list.map((e) => PeelParagraph.fromJson(e)).toList();
    return EssayModelAnswer(
      paragraphs: pList,
      conclusion: json['conclusion'] ?? '',
    );
  }
}

class DescribeQuestion {
  final String id;
  final String topic;
  final String question;
  final String clue;
  final DescribeModelAnswer modelAnswer;

  DescribeQuestion({
    required this.id,
    required this.topic,
    required this.question,
    required this.clue,
    required this.modelAnswer,
  });

  factory DescribeQuestion.fromJson(Map<String, dynamic> json) {
    return DescribeQuestion(
      id: json['id'] ?? '',
      topic: json['topic'] ?? '',
      question: json['question'] ?? '',
      clue: json['clue'] ?? '',
      modelAnswer: DescribeModelAnswer.fromJson(json['modelAnswer'] ?? {}),
    );
  }
}

class ExplainQuestion {
  final String id;
  final String topic;
  final String question;
  final List<String> prompts;
  final ExplainModelAnswer modelAnswer;

  ExplainQuestion({
    required this.id,
    required this.topic,
    required this.question,
    required this.prompts,
    required this.modelAnswer,
  });

  factory ExplainQuestion.fromJson(Map<String, dynamic> json) {
    return ExplainQuestion(
      id: json['id'] ?? '',
      topic: json['topic'] ?? '',
      question: json['question'] ?? '',
      prompts: List<String>.from(json['prompts'] ?? []),
      modelAnswer: ExplainModelAnswer.fromJson(json['modelAnswer'] ?? {}),
    );
  }
}

class EssayQuestion {
  final String id;
  final String topic;
  final String question;
  final List<String> prompts;
  final EssayModelAnswer modelAnswer;

  EssayQuestion({
    required this.id,
    required this.topic,
    required this.question,
    required this.prompts,
    required this.modelAnswer,
  });

  factory EssayQuestion.fromJson(Map<String, dynamic> json) {
    return EssayQuestion(
      id: json['id'] ?? '',
      topic: json['topic'] ?? '',
      question: json['question'] ?? '',
      prompts: List<String>.from(json['prompts'] ?? []),
      modelAnswer: EssayModelAnswer.fromJson(json['modelAnswer'] ?? {}),
    );
  }
}

class ExamData {
  final List<DescribeQuestion> describe;
  final List<ExplainQuestion> explain;
  final List<EssayQuestion> essay;

  ExamData({
    required this.describe,
    required this.explain,
    required this.essay,
  });

  factory ExamData.fromJson(Map<String, dynamic> json) {
    var descList = json['describe'] as List? ?? [];
    var expList = json['explain'] as List? ?? [];
    var essList = json['essay'] as List? ?? [];

    return ExamData(
      describe: descList.map((e) => DescribeQuestion.fromJson(e)).toList(),
      explain: expList.map((e) => ExplainQuestion.fromJson(e)).toList(),
      essay: essList.map((e) => EssayQuestion.fromJson(e)).toList(),
    );
  }
}

class WheelQuestion {
  final String type;
  final String text;

  WheelQuestion({
    required this.type,
    required this.text,
  });

  factory WheelQuestion.fromJson(Map<String, dynamic> json) {
    return WheelQuestion(
      type: json['type'] ?? '',
      text: json['text'] ?? '',
    );
  }
}

class WheelTopic {
  final String topic;
  final List<WheelQuestion> questions;

  WheelTopic({
    required this.topic,
    required this.questions,
  });

  factory WheelTopic.fromJson(Map<String, dynamic> json) {
    var list = json['questions'] as List? ?? [];
    return WheelTopic(
      topic: json['topic'] ?? '',
      questions: list.map((e) => WheelQuestion.fromJson(e)).toList(),
    );
  }
}

class PastPaperQuestion {
  final String type;
  final String text;

  PastPaperQuestion({
    required this.type,
    required this.text,
  });

  factory PastPaperQuestion.fromJson(Map<String, dynamic> json) {
    return PastPaperQuestion(
      type: json['type'] ?? '',
      text: json['text'] ?? '',
    );
  }
}

class PastPaper {
  final String series;
  final PastPaperQuestion? q1a;
  final PastPaperQuestion? q1b;
  final PastPaperQuestion? q2;
  final PastPaperQuestion? q3;
  final PastPaperQuestion? q4;

  PastPaper({
    required this.series,
    this.q1a,
    this.q1b,
    this.q2,
    this.q3,
    this.q4,
  });

  factory PastPaper.fromJson(Map<String, dynamic> json) {
    return PastPaper(
      series: json['series'] ?? '',
      q1a: json['q1a'] != null ? PastPaperQuestion.fromJson(json['q1a']) : null,
      q1b: json['q1b'] != null ? PastPaperQuestion.fromJson(json['q1b']) : null,
      q2: json['q2'] != null ? PastPaperQuestion.fromJson(json['q2']) : null,
      q3: json['q3'] != null ? PastPaperQuestion.fromJson(json['q3']) : null,
      q4: json['q4'] != null ? PastPaperQuestion.fromJson(json['q4']) : null,
    );
  }
}

class AppDataset {
  final List<TimelineSection> timelineData;
  final List<QuizTopic> quizData;
  final ExamData examData;
  final List<WheelTopic> elizabethanWheelData;
  final List<PastPaper> officialPastPapers;

  AppDataset({
    required this.timelineData,
    required this.quizData,
    required this.examData,
    required this.elizabethanWheelData,
    required this.officialPastPapers,
  });

  factory AppDataset.fromJson(Map<String, dynamic> json) {
    var tList = json['timelineData'] as List? ?? [];
    var qList = json['quizData'] as List? ?? [];
    var wList = json['elizabethanWheelData'] as List? ?? [];
    var pList = json['officialPastPapers'] as List? ?? [];

    return AppDataset(
      timelineData: tList.map((e) => TimelineSection.fromJson(e)).toList(),
      quizData: qList.map((e) => QuizTopic.fromJson(e)).toList(),
      examData: ExamData.fromJson(json['examData'] ?? {}),
      elizabethanWheelData: wList.map((e) => WheelTopic.fromJson(e)).toList(),
      officialPastPapers: pList.map((e) => PastPaper.fromJson(e)).toList(),
    );
  }
}
