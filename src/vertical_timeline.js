export function renderVerticalTimeline(container, timelineData, unitData) {
    if (!timelineData || !Array.isArray(timelineData) || timelineData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #64748b; font-size: 1.1rem; padding: 40px;">No timeline events found for this unit.</p>';
        return;
    }

    // Attach global handler for opening lessons from timeline
    if (!window.openTimelineLesson) {
        window.openTimelineLesson = function(lessonId) {
            if (window.db && window.currentUnitId && window.db[window.currentUnitId]) {
                const ud = window.db[window.currentUnitId].data;
                if (ud && ud.lessons) {
                    const lesson = ud.lessons.find(l => l.id === lessonId);
                    if (lesson) {
                        window.dispatchEvent(new CustomEvent('renderLessonEvent', { detail: lesson }));
                    }
                }
            }
        };
    }

    // Determine the structure type
    const isGrouped = timelineData.length > 0 && timelineData[0].events && Array.isArray(timelineData[0].events);

    // Extract unique themes
    const themes = new Set();
    if (isGrouped) {
        timelineData.forEach(group => {
            group.events.forEach(evt => { if (evt.theme) themes.add(evt.theme); });
        });
    } else {
        timelineData.forEach(evt => { if (evt.theme) themes.add(evt.theme); });
    }

    let html = `
    <style>
        .timeline-filters {
            text-align: center;
            margin: 20px 0 30px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        .timeline-filter-btn {
            background: white;
            border: 2px solid #cbd5e1;
            color: #475569;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .timeline-filter-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
        .timeline-filter-btn.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        .timeline-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px 10px;
            position: relative;
        }
        .timeline-container::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            width: 4px;
            background: #cbd5e1;
            border-radius: 4px;
        }
        .timeline-group-title {
            position: sticky;
            top: -1px;
            margin: 30px 0 20px 0;
            padding: 10px 20px;
            background: var(--primary);
            color: white;
            border-radius: 8px;
            font-size: 1.25rem;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 100;
        }
        .timeline-event {
            position: relative;
            margin-bottom: 25px;
            padding-left: 60px;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        .timeline-event::before {
            content: '';
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: var(--accent-red);
            border: 4px solid white;
            border-radius: 50%;
            z-index: 2;
            box-shadow: 0 0 0 2px #cbd5e1;
        }
        .timeline-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .timeline-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            border-color: #cbd5e1;
        }
        .timeline-date {
            font-weight: 700;
            color: var(--primary);
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        .timeline-title {
            font-weight: 600;
            font-size: 1.05rem;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .timeline-desc {
            color: #475569;
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
        }
        .timeline-category {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 10px;
        }
        .timeline-kt {
            display: inline-block;
            background: #f1f5f9;
            color: #64748b;
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 500;
            margin-bottom: 8px;
            border: 1px solid #e2e8f0;
        }
        .timeline-image-wrapper {
            float: right;
            margin: 0 0 10px 15px;
            text-align: center;
            max-width: 150px;
        }
        .timeline-image {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .timeline-image-caption {
            font-size: 0.8rem;
            color: #64748b;
            margin-top: 5px;
            font-weight: 500;
        }
        /* Clearfix for the floated image */
        .timeline-card::after {
            content: "";
            display: table;
            clear: both;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
    </style>
    `;

    if (themes.size > 0) {
        html += `
        <div class="timeline-filters">
            <button class="timeline-filter-btn active" data-theme="all">All</button>
            ${Array.from(themes).map(theme => `<button class="timeline-filter-btn" data-theme="${theme}">${theme}</button>`).join('')}
        </div>
        `;
    }

    html += `
    <div class="timeline-container" id="timeline-container-main">
    `;

    let delay = 0;

    if (isGrouped) {
        timelineData.forEach(group => {
            // Strictly use lesson_banner_id if provided. This prevents banners from showing on incorrect groups.
            const targetLessonId = group.lesson_banner_id;
            const lessonObj = (targetLessonId && unitData && unitData.lessons) ? unitData.lessons.find(l => l.id === targetLessonId) : null;
            if (lessonObj) {
                html += `
                <div class="timeline-lesson-banner" style="position: sticky; top: -1px; z-index: 100; background: linear-gradient(135deg, #1e3a8a, #312e81); padding: 15px 20px; border-radius: 8px; margin: 40px 0 25px 0; display: flex; justify-content: space-between; align-items: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #a5b4fc;">
                    <div style="font-size: 1.15rem; font-weight: 600;"><i class="fa-solid fa-book-open" style="color: #fde047; margin-right: 12px;"></i> ${lessonObj.title || group.title}</div>
                    <button class="btn btn-primary" style="background: #10b981; border: none; padding: 6px 14px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.openTimelineLesson('${lessonObj.id}')"><i class="fa-solid fa-circle-play"></i> Jump to Lesson</button>
                </div>
                `;
            } else {
                html += `<div class="timeline-group-title">${group.title}</div>`;
            }
            
            group.events.forEach(evt => {
                html += `
                <div class="timeline-event" data-theme="${evt.theme || ''}" style="animation-delay: ${delay}s">
                    <div class="timeline-card">
                        ${evt.key_topic ? `<div class="timeline-kt">${evt.key_topic}</div>` : ''}
                        ${evt.image ? `
                        <div class="timeline-image-wrapper">
                            <img src="${evt.image}" class="timeline-image" alt="${evt.image_caption || evt.title || evt.text || 'Timeline Image'}">
                            ${evt.image_caption ? `<div class="timeline-image-caption">${evt.image_caption}</div>` : ''}
                        </div>
                        ` : ''}
                        ${evt.date ? `<div class="timeline-date">${evt.date}</div>` : ''}
                        <p class="timeline-desc">${evt.text}</p>
                        ${evt.category ? `<div class="timeline-category">${evt.category}</div>` : ''}
                    </div>
                </div>
                `;
                delay += 0.05;
            });
        });
    } else {
        timelineData.forEach(evt => {
            if (evt.lesson_banner_id && unitData && unitData.lessons) {
                const lessonObj = unitData.lessons.find(l => l.id === evt.lesson_banner_id);
                if (lessonObj) {
                    html += `
                    <div class="timeline-lesson-banner" style="position: sticky; top: -1px; background: linear-gradient(135deg, #1e3a8a, #312e81); padding: 15px 20px; border-radius: 8px; margin: 40px 0 25px 0; display: flex; justify-content: space-between; align-items: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #a5b4fc; z-index: 100;">
                        <div style="font-size: 1.15rem; font-weight: 600;"><i class="fa-solid fa-book-open" style="color: #fde047; margin-right: 12px;"></i> ${lessonObj.title}</div>
                        <button class="btn btn-primary" style="background: #10b981; border: none; padding: 6px 14px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.openTimelineLesson('${lessonObj.id}')"><i class="fa-solid fa-circle-play"></i> Jump to Lesson</button>
                    </div>
                    `;
                }
            }

            html += `
            <div class="timeline-event" data-theme="${evt.theme || ''}" style="animation-delay: ${delay}s">
                <div class="timeline-card">
                    ${evt.key_topic ? `<div class="timeline-kt">${evt.key_topic}</div>` : ''}
                    ${evt.image ? `
                    <div class="timeline-image-wrapper">
                        <img src="${evt.image}" class="timeline-image" alt="${evt.image_caption || evt.title || evt.text || 'Timeline Image'}">
                        ${evt.image_caption ? `<div class="timeline-image-caption">${evt.image_caption}</div>` : ''}
                    </div>
                    ` : ''}
                    ${evt.date ? `<div class="timeline-date">${evt.date}</div>` : ''}
                    ${evt.title ? `<div class="timeline-title">${evt.title}</div>` : ''}
                    ${evt.description ? `<p class="timeline-desc">${evt.description}</p>` : ''}
                    ${evt.text ? `<p class="timeline-desc">${evt.text}</p>` : ''}
                    ${evt.category ? `<div class="timeline-category">${evt.category}</div>` : ''}
                </div>
            </div>
            `;
            delay += 0.05;
        });
    }

    html += `</div>`;
    container.innerHTML = html;

    // Attach filter logic
    if (themes.size > 0) {
        const filterBtns = container.querySelectorAll('.timeline-filter-btn');
        const events = container.querySelectorAll('.timeline-event');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const selectedTheme = btn.dataset.theme;
                
                events.forEach(event => {
                    if (selectedTheme === 'all' || event.dataset.theme === selectedTheme) {
                        event.style.display = 'block';
                        // Reset animation to replay it
                        event.style.animation = 'none';
                        event.offsetHeight; // trigger reflow
                        event.style.animation = null;
                    } else {
                        event.style.display = 'none';
                    }
                });
            });
        });
    }
}
