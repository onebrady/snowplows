const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the knowledge page
    await page.goto('http://localhost:5173/#/knowledge/', { waitUntil: 'networkidle' });
    
    // Wait a moment for any dynamic content
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'knowledge-page-layout.png',
      fullPage: true 
    });
    
    console.log('Screenshot saved as knowledge-page-layout.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();