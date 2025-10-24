'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to scroll to section with offset for header
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 100; // Approximate header height including padding
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        // Use requestAnimationFrame to ensure smooth scrolling
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Add highlight effect after scroll
          setTimeout(() => {
            element.classList.add('highlight-section');
            setTimeout(() => {
              element.classList.remove('highlight-section');
            }, 2000);
          }, 500);
        });
      }
    };

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove # from hash
      if (hash) {
        // Multiple attempts with increasing delays to ensure DOM is ready
        const attemptScroll = (attempts = 0) => {
          const element = document.getElementById(hash);
          if (element) {
            scrollToSection(hash);
          } else if (attempts < 15) {
            // Retry up to 15 times with increasing delay
            setTimeout(() => attemptScroll(attempts + 1), 50 * (attempts + 1));
          }
        };
        
        // Start with immediate attempt, then retry if needed
        attemptScroll();
      }
    };

    // Handle initial hash with multiple strategies
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Strategy 1: Immediate attempt
        setTimeout(() => handleHashChange(), 0);
        
        // Strategy 2: After DOM is fully loaded
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', handleHashChange);
        } else {
          setTimeout(() => handleHashChange(), 100);
        }
        
        // Strategy 3: After window load
        window.addEventListener('load', handleHashChange);
        
        // Strategy 4: Additional fallback for navigation from other pages
        setTimeout(() => handleHashChange(), 200);
        setTimeout(() => handleHashChange(), 500);
        setTimeout(() => handleHashChange(), 1000);
      }
    };

    // Handle click events on links with hash
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href*="#"]') as HTMLAnchorElement;
      
      if (link) {
        const hash = link.hash.substring(1);
        if (hash) {
          // Check if it's cross-page navigation (different path)
          const currentPath = window.location.pathname;
          let linkPath;
          
          try {
            if (link.href.startsWith('/')) {
              // Relative URL like /purchase-policy#section
              linkPath = link.href.split('#')[0];
            } else if (link.href.startsWith('http')) {
              // Absolute URL
              linkPath = new URL(link.href).pathname;
            } else {
              // Hash-only URL like #section
              linkPath = currentPath;
            }
          } catch (e) {
            linkPath = currentPath;
          }
          
          const isCrossPage = linkPath !== currentPath;
          
          if (isCrossPage) {
            // For cross-page navigation, let browser handle it naturally
            // The hash will be processed after navigation via handleInitialHash
            console.log('Cross-page navigation detected:', link.href);
          } else {
            // For same-page navigation, prevent default and handle manually
            event.preventDefault();
            window.history.pushState(null, '', link.href);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }
        }
      }
    };

    // Add CSS styles for highlight effect
    const addHighlightStyles = () => {
      if (!document.getElementById('global-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'global-scroll-styles';
        style.textContent = `
          .highlight-section {
            animation: highlightPulse 2s ease-in-out;
            transform: scale(1.02);
            transition: all 0.3s ease;
          }
          
          @keyframes highlightPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
              background-color: rgba(59, 130, 246, 0.05);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.3);
              background-color: rgba(59, 130, 246, 0.1);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              background-color: rgba(59, 130, 246, 0.05);
            }
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Add styles
    addHighlightStyles();

    // Handle initial hash
    handleInitialHash();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for clicks on links with hash
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('DOMContentLoaded', handleHashChange);
      window.removeEventListener('load', handleHashChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname]); // Re-run when pathname changes (navigation between pages)

  return null; // This component doesn't render anything
}