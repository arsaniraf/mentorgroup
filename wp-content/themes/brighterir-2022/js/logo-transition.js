// Get the logo image element
    const logoImg = document.querySelector('img');

    // Store the original logo source
    const originalLogoSrc = logoImg.src;

    // Replace 'URL_TO_YOUR_ALTERNATE_LOGO_IMAGE' with the actual URL of your alternate logo image
    const alternateLogoSrc = 'https://previews.dropbox.com/p/thumb/ACm3uP0Mn0a8nj_GagPnz1fPQIIUZEttPpkEghkFwAm3nrxzY83fyxu2gsf9-XFq3Pz4O8ZSrf9T3dhHvI0TpgDlrPqGmrG-iJK4l2GnUGdag8kz1LT2UGQGo4ejxf_bpTapAWpruv1PSC5YfIcuDDCfGvC1uNDazRqV8EO3sGbr6vGT3yedSNkZmVBuPfc8Pag58FPotsSzu4UiKgEtwsflAHHBswX85OFfR8zVRxofQfR61c6k-i5LIFGcwnvg3AqJrgUXeQVlJkBxHANF2ll2blqMJzmaGDu4O0HupNLSWT96Y6P8zbVRWXdCQq8EXLo/p.png'; 

    // Flag to track if the alternate logo is currently displayed
    let isAlternate = false;

    // Function to handle the scroll event
    const handleScroll = () => {
      // Check if the user has scrolled down more than 100 pixels and the alternate logo is not currently displayed
      if (window.scrollY > 100 && !isAlternate) {
        // Add a transition effect to the logo
        logoImg.style.transition = 'opacity 0.3s ease';
        // Fade out the logo
        logoImg.style.opacity = '0';

        // After 300ms (0.3s), swap the logo image and fade it back in
        setTimeout(() => {
          logoImg.src = alternateLogoSrc;
          logoImg.style.opacity = '1';
        }, 300);

        // Update the flag
        isAlternate = true;

      // Check if the user has scrolled back up to 100 pixels or less and the alternate logo is currently displayed
      } else if (window.scrollY <= 100 && isAlternate) {
        // Add a transition effect to the logo
        logoImg.style.transition = 'opacity 0.3s ease';
        // Fade out the logo
        logoImg.style.opacity = '0';

        // After 300ms (0.3s), swap the logo image back to the original and fade it back in
        setTimeout(() => {
          logoImg.src = originalLogoSrc;
          logoImg.style.opacity = '1';
        }, 300);

        // Update the flag
        isAlternate = false;
      }
    };

    // Add the scroll event listener to the window
    window.addEventListener('scroll', handleScroll);