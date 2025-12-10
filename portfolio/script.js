

document.addEventListener('DOMContentLoaded', () => {
    const curtain = document.getElementById('curtain');
    // MAKE SURE your links have this class, or change this selector to 'a'
    const links = document.querySelectorAll('.main-menu-item'); 

    // --- PART 1: ENTRANCE (Page Load) ---
    // We use 'pageshow' so it works even if you use the Back button
    window.addEventListener('pageshow', (event) => {
        // Short delay ensures the DOM is ready for the animation
        setTimeout(() => {
            curtain.classList.add('lifted');
        }, 600);
    });

    // --- PART 2: EXIT (Link Click) ---
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if it's just a normal link (not a new tab or modifier key)
            if (link.target === '_blank' || e.ctrlKey || e.metaKey) return;

            e.preventDefault(); // Stop immediate load
            const targetUrl = link.href;

            // Drop the curtain (Remove the class that lifts it)
            curtain.classList.remove('lifted');

            // Wait for animation (600ms) then go
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600); 
        });
    });
});
