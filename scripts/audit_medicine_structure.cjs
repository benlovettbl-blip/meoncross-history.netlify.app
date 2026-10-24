const path = require('path');

(async () => {
  const filePath = path.resolve('units/edexcel_medicine/data.js');
  const mod = await import('file:///' + filePath.replace(/\\/g, '/'));
  const unitData = mod.default || mod.unitData;
  const lessons = unitData ? unitData.lessons : [];
  console.log('Total lessons in edexcel_medicine:', lessons.length);

  lessons.forEach((l, idx) => {
    const hasHook = Boolean(l.hook_text);
    const hasBlurb = Boolean(l.blurb);
    const hasHistSetting = Boolean(l.historical_setting);
    const hasHistContext = Boolean(l.historical_context);
    const hasLede = Boolean(l.lede);
    const hasTeacherPrimer = Boolean(l.teacher_notes && l.teacher_notes.primer);
    const hasLearningObjectives = Boolean(l.learning_objectives && l.learning_objectives.length);
    const hasTeacherObjectives = Boolean(
      l.teacher_notes && l.teacher_notes.objectives && l.teacher_notes.objectives.length,
    );
    const hasSyllabusFocus = Boolean(l.syllabus_focus);
    const hasSpecFocus = Boolean(l.spec_focus || l.specification_focus);
    const hasEnquiry = Boolean(l.enquiry || l.key_enquiry || l.enquiry_question);

    console.log(`[L${idx + 1}] ID: ${l.id} | ${l.title}`);
    console.log(`    hook_text: ${hasHook ? 'YES (' + l.hook_text.length + ' chars)' : 'NO'}`);
    console.log(`    blurb: ${hasBlurb ? 'YES' : 'NO'}`);
    console.log(`    historical_setting: ${hasHistSetting ? 'YES' : 'NO'}`);
    console.log(
      `    learning_objectives: ${hasLearningObjectives ? 'YES (' + l.learning_objectives.length + ')' : 'NO'}`,
    );
    console.log(
      `    teacher_notes.objectives: ${hasTeacherObjectives ? 'YES (' + l.teacher_notes.objectives.length + ')' : 'NO'}`,
    );
    console.log(`    syllabus_focus: ${hasSyllabusFocus ? 'YES' : 'NO'}`);
    console.log(`    teacher_notes.primer: ${hasTeacherPrimer ? 'YES' : 'NO'}`);
  });
})();
