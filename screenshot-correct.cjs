const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the specific knowledge URL
    console.log('Navigating to http://localhost:5173/#/knowledge/');
    await page.goto('http://localhost:5173/#/knowledge/', { waitUntil: 'networkidle' });
    
    // Wait a moment for any dynamic content to load
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'knowledge-7-categories.png',
      fullPage: true 
    });
    
    console.log('Screenshot saved as knowledge-7-categories.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();