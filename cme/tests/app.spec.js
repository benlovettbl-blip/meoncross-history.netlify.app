const { test, expect } = require('@playwright/test');

test.describe('App Visual and Logic Tests', () => {

  test('Chimneys are visible on the dashboard', async ({ page }) => {
    await page.goto('/');

    // Check if the brand subheader banner is visible
    const chimneyBanner = page.locator('#brand-subheader-banner');
    await expect(chimneyBanner).toBeVisible();

    // Check if the title text is correct
    const chimneyTitle = page.locator('#brand-subheader-title');
    await expect(chimneyTitle).toHaveText('Fareham Chimney Sweep Inc.');
  });

  test('Syllabus Scumbags pack triggers on mastery', async ({ page }) => {
    await page.goto('/');

    // We can simulate mastery by directly interacting with the window object,
    // or by clicking through the UI. Interacting with the window object is more robust
    // for testing the storage/Scumbag logic specifically without relying on specific DOM clicks
    // that might change in flashcards.
    
    // Simulate mastering all questions in subtopic_1_1 (which has card_balfour)
    await page.evaluate(() => {
      // Find subtopic 1.1 questions
      const topic1Questions = window.state.allQuestions.filter(q => q.subtopicId === 'subtopic_1_1');
      
      // Master all of them
      topic1Questions.forEach(q => {
        window.setMastered(q.id, true);
      });
    });

    // The pack-opening-overlay should now have the 'active' class
    const overlay = page.locator('#pack-opening-overlay');
    await expect(overlay).toHaveClass(/active/);

    // The card image inside should be updated to card_balfour.png
    const cardImg = page.locator('#pack-opening-card-image');
    await expect(cardImg).toHaveCSS('background-image', /card_balfour\.png/);
  });

});
