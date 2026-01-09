document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navCloseBtn = document.getElementById('nav-close-btn');

    // Smooth Section Switching
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            
            // If it's a tel: or external link (and has no data-target), don't prevent default
            if (!targetId) return;

            e.preventDefault();
            
            // Switch active section
            sections.forEach(section => {
                section.classList.remove('active');
                if(section.id === targetId) {
                    section.classList.add('active');
                    // Reset animations for the new section so they play again or check visibility
                    setTimeout(() => observeElements(section), 100);
                }
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Close Mobile Menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = ''; // Allow scrolling
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (navCloseBtn) navCloseBtn.addEventListener('click', toggleMobileMenu);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/98');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/98');
            navbar.classList.add('bg-white/95');
        }
    });

    // --- Animation Logic (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    function observeElements(context = document) {
        const animatedElements = context.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Initialize animations for the default active section (Home)
    // Small delay to ensure DOM is ready
    setTimeout(() => observeElements(), 100);

    // --- Form Handling ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation visualization
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending Request...';
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            
            setTimeout(() => {
                alert('Thank you! Your appointment request has been received. We will contact you shortly to confirm.');
                bookingForm.reset();
                btn.innerText = originalText;
                btn.classList.remove('opacity-75', 'cursor-not-allowed');
            }, 1500);
        });
    }
});
