


/**
 * Transitions between two panels with a text shuffle effect on the heading.
 * @param {string} panelASelector - CSS selector for the current panel (e.g., '.panel_1')
 * @param {string} panelBSelector - CSS selector for the target panel (e.g., '.panel_2')
 */
async function transitionPanels(panelASelector, panelBSelector) {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(1750);
    const panelA = document.querySelector(panelASelector);
    const panelB = document.querySelector(panelBSelector);
    
    if (!panelA || !panelB) return;

    const headingB = panelB.querySelector('h1');
    if (!headingB) return;

    // 1. CRITICAL: Capture the clean, intended target text FIRST before changing anything
    const targetText = headingB.textContent.trim();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@$#*+=-_";
    
    // 2. Safely handle the class toggles
    panelA.classList.remove('active');
    panelA.classList.add('hidden');
    
    panelB.classList.remove('hidden');
    panelB.classList.add('active');

    // 3. Setup the shuffle animation variables
    let iterations = 0;
    const duration = 30; // Higher = slower shuffle
    
    function shuffle() {
        headingB.innerText = targetText
            .split("")
            .map((letter, index) => {
                // Keep spaces intact so layout doesn't jitter
                if (letter === " ") return " ";
                
                // Reveal the correct letter once iterations pass this index
                if (index < iterations) {
                    return targetText[index];
                }
                
                // Return a random scrambling character
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        
        if (iterations >= targetText.length) {
            // 4. Force perfect match to the cached target text at the end
            headingB.innerText = targetText; 
        } else {
            iterations += targetText.length / duration;
            requestAnimationFrame(shuffle);
        }
    }
    
    // Start the animation loop
    requestAnimationFrame(shuffle);
}

let hasTransitioned = false;

window.addEventListener('scroll', () => {
    // Only run if we are past 40px AND we haven't transitioned yet
    if (window.scrollY > 40 && !hasTransitioned) {
        transitionPanels('.panel_1', '.panel_2');
        hasTransitioned = true; // Lock it down
    } 
    // Optional: Reset it if they scroll back to the very top
    else if (window.scrollY <= 40 && hasTransitioned) {
        transitionPanels('.panel_2', '.panel_1');
        hasTransitioned = false; // Unlock it
    }
});