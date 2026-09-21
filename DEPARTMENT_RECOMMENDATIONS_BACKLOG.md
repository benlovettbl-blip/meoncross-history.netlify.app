# The History Department: Cumulative Recommendations Backlog & Innovation Tracker
**Permanent Departmental Innovation Register & Proactive Planning Ledger**  
*Maintained continuously across all sessions • Last Updated: 21 September 2026*

---

## 1. Operating Protocol
1. **Permanent Persistence:** Any proactive recommendation generated during pair-programming sessions is permanently registered here.
2. **Cumulative Accumulation:** New recommendations build up cumulatively. They are never discarded or forgotten simply because a session ends.
3. **User-Directed Clearance:** Items remain in `[PENDING]` status until the user explicitly directs the assistant to execute them (`"Do number X"`) or dismiss them (`"Clear recommendation X"`).
4. **Audit Trail:** When completed, an item transitions to `[COMPLETED]` with the completion date, git commit hash, and verified outcome.

---

## 2. Master Recommendations Ledger

| ID | Domain | Proactive Recommendation & Actionable Plan | Date Logged | Status | Resolution / Commit |
| :---: | :---: | :--- | :---: | :---: | :--- |
| **REC-001** | **Curriculum & Layout** | **Roll Out Key Individuals to KT1 & KT3:**<br>Hard-code structured `key_individual` profiles across all 4 lessons in Key Topic 1 (Arthur Balfour, David Ben-Gurion, King Hussein, Anthony Eden) and all 3 lessons in Key Topic 3 (Menachem Begin, Ariel Sharon, Yitzhak Rabin), eliminating AI fluff, standardizing strategic decisions, and synchronizing with web app & database. | 21 Sep 2026 | 🟩 **[COMPLETED]** | Fully injected into `units/cme_new/data.js`, `public/units/cme_new/data.js`, and `public/database.json`. Verified in live web app (`localhost:3003`). |
| **REC-002** | **Pedagogy & Layout** | **Act-Level Anchoring of Key Figures:**<br>Rather than placing every Key Figure strictly at the bottom of Act 4, anchor specific figures directly adjacent to the exact Act where their decisive action occurs (e.g., Moshe Dayan next to Operation Focus in KT 2.2; David Ben-Gurion next to the Declaration of Independence in KT 1.1; Ariel Sharon next to the Beirut siege in KT 3.2). | 21 Sep 2026 | 🟨 **[PENDING]** | Awaiting user instruction to execute. |
| **REC-003** | **Assessment & Pedagogy** | **Teacher Hinge Questions in Lesson Primers:**<br>Add a targeted hinge question to each lesson's `teacher_notes` linking the individual's strategic decisions directly to the exam enquiry (e.g., *"Hinge: To what extent did Nasser's closure of the Straits of Tiran make war inevitable, versus serving as political posturing?"*). | 21 Sep 2026 | 🟨 **[PENDING]** | Awaiting user instruction to execute. |
| **REC-004** | **Reprographics** | **Unified Multi-Topic Standard Textbook Engine:**<br>Upgrade `scripts/render_standard_textbook.cjs` to support command-line compilation of all three Middle East Key Topics (`node scripts/render_standard_textbook.cjs kt1`, `kt2`, `kt3`, or `all`), ensuring full 12-page publisher PDFs can be generated for KT1 and KT3 with uncropped photographic plates and zero page overflows. | 21 Sep 2026 | 🟩 **[COMPLETED]** | Built dedicated renderers `render_standard_textbook_kt1.cjs` and `render_standard_textbook_kt3.cjs` orchestrated by `render_standard_textbook.cjs`. All 3 textbooks compiled to strictly 12 pages with 0px overflow and uncropped archival plates. |
| **REC-005** | **Interactive Web App** | **Key Individuals Flashcard Modal Quick-Launch:**<br>Enable pupils to click directly on the embedded Key Figure card in the web app reading view to trigger the interactive 3D flip card modal, allowing instant retrieval quizzing on their strategic actions without leaving the lesson text. | 21 Sep 2026 | 🟨 **[PENDING]** | Awaiting user instruction to execute. |
| **REC-006** | **Interactive Web App** | **Dual-Spread In-Page Digital Reader Companion:**<br>Provide an interactive two-page book-spread reader in the web app UI that loads the publisher-standard HTML textbooks for KT1, KT2, and KT3, allowing pupils with laptops or tablets to read the textbooks as a physical-feeling book with integrated text-to-speech audio controls. | 21 Sep 2026 | 🟨 **[PENDING]** | Awaiting user instruction to execute. |
| **REC-007** | **Reprographics & Pedagogy** | **Edexcel Paper 2 Timeline Domino Sequence in Workbooks:**<br>Enrich the printed pupil workbooks for CME (`render_cme_kt1_twopage_workbook.cjs` and `render_cme_kt3_twopage_workbook.cjs`) to incorporate the Domino Flowchart timeline task for Do Nows, ensuring students draw causal and chronological arrows between randomized event blocks. | 21 Sep 2026 | 🟨 **[PENDING]** | Awaiting user instruction to execute. |
| **REC-008** | **Automation & CI/CD** | **Automated Synchronized Textbook Build Hook (`sync_unit.cjs`):**<br>Add the publisher textbook compilation (`node scripts/render_standard_textbook.cjs <topic>`) directly into the automated `scripts/sync_unit.cjs cme_new` pipeline, ensuring that whenever curriculum data or lesson texts are updated, the 12-page publisher PDFs and HTML companions are regenerated automatically in lockstep. | 21 Sep 2026 | 🟩 **[COMPLETED]** | Injected `render_standard_textbook.cjs all` into Step 3 of `scripts/sync_unit.cjs`, ensuring 12-page publisher textbooks and HTML companions are compiled in lockstep with workbooks and digital database. |

---

## 3. Departmental Innovation Categories
- **Curriculum & Knowledge:** Historical accuracy, primary source curation, Edexcel 1HI0 specification alignment.
- **Pedagogy & Dual-Coding:** Christine Counsell 4-Act structures, retrieval Do Now isolation, cognitive load balancing.
- **Reprographics & Print:** Page budget enforcement, 0px overflow, high-contrast printing, Pearson-standard ruling.
- **Web App Architecture:** Responsive mobile optimization, audio read-aloud synchronization, zero-latency state management.
