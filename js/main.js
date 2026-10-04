/* ============================================
   James Garner Music — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Sticky Nav Background on Scroll ---
  const nav = document.getElementById('nav');

  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load
  }

  // --- Scroll-triggered Fade In ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements if no IntersectionObserver
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // --- Contact Form Handler ---
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      const subjectSelect = form.querySelector('#subject');
      const subjectText = subjectSelect
        ? subjectSelect.options[subjectSelect.selectedIndex].text
        : 'General Enquiry';
 
      // Build a mailto: URL so the visitor's email client opens with the details prefilled.
      const subject = `${subjectText} — Website enquiry`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subjectText}`,
        '',
        'Message:',
        message
      ];
      const body = bodyLines.join('\n');
      const mailtoHref = `mailto:Jamesgarner1976@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.textContent = 'Opening email app…';
        btn.disabled = true;
      }
 
      // Trigger the user's mail client. We don't show a fake "sent" state.
      window.location.href = mailtoHref;
 
      // Restore button text after a short delay (in case the user returns)
      if (btn) {
        setTimeout(() => {
          btn.textContent = originalText || 'Send Message';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

});
