const fs = require('fs');

['generate_textbooks.js', 'generate_pupil_workbooks.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove Q prefix from topic formatting since it's now handled by gcse_task.qNum string concatenation
    if (file === 'generate_textbooks.js') {
        content = content.replace(
            /html \+= `<p style="font-weight: bold; font-size: 13pt;">\$\{lesson\.gcse_task\.qNum \? `Q\$\{lesson\.gcse_task\.qNum\}\. ` : ''\}\$\{topicText\}<\/p>`;/g,
            'html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : \'\'}${topicText}</p>`;'
        );
        content = content.replace(
            /html \+= `<p style="font-weight: bold; font-size: 13pt;">\$\{lesson\.gcse_task\.qNum \? `Q\$\{lesson\.gcse_task\.qNum\}\. ` : ''\}How useful are Sources A and B for an enquiry into \$\{topicText\}\?<\/p>`;/g,
            'html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : \'\'}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;'
        );
    }
    
    // Make sure we number gcse_task in pupil workbooks correctly
    if (file === 'generate_pupil_workbooks.js') {
        content = content.replace(
            /let tariff = getTariffBadge\(topicText\); topicText = tariff\.cleanTopic; html \+= `<p style="font-weight: bold; font-size: 13pt;">\$\{lesson\.gcse_task\.qNum \? `Q\$\{lesson\.gcse_task\.qNum\}\. ` : ""\}How useful are Sources A and B for an enquiry into \$\{topicText\}\?\$\{tariff\.badgeHtml\}<\/p>`;/g,
            'let tariff = getTariffBadge(topicText); topicText = tariff.cleanTopic; html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}How useful are Sources A and B for an enquiry into ${topicText}?${tariff.badgeHtml}</p>`;'
        );
        content = content.replace(
            /let tariff = getTariffBadge\(topicText\); topicText = tariff\.cleanTopic; html \+= `<p style="font-weight: bold; font-size: 13pt;">\$\{lesson\.gcse_task\.qNum \? `Q\$\{lesson\.gcse_task\.qNum\}\. ` : ""\}\$\{topicText\}\$\{tariff\.badgeHtml\}<\/p>`;/g,
            'let tariff = getTariffBadge(topicText); topicText = tariff.cleanTopic; html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}${topicText}${tariff.badgeHtml}</p>`;'
        );
    }
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed gcse_task strings.');
