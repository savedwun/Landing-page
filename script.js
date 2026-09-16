// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CTA Button handlers
document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        if (buttonText.includes('Free Trial')) {
            alert('🎉 Welcome! Redirecting to free trial sign-up...\n\nReplace this alert with your actual sign-up form or redirect URL.');
        } else if (buttonText.includes('Strategy Call')) {
            alert('📞 Great choice! Redirecting to booking calendar...\n\nReplace this alert with your calendar booking link.');
        } else {
            alert('Thank you! Please complete the form to get started with GRiD CO.');
        }
    });
});

// FAQ toggle animation
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        
        // Close other open FAQs
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.style.maxHeight = null;
                otherAnswer.style.overflow = 'hidden';
                otherAnswer.style.transition = 'max-height 0.3s ease-out';
            }
        });

        // Toggle current answer
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.overflow = 'hidden';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out';
        }
    });
});

// Add smooth scrolling behavior on page load
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navigation link
    const links = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Form validation helper (for when you add actual forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Counter animation for social proof
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            // Animate numbers in proof items
            const h3 = entry.target.querySelector('h3');
            if (h3) {
                const text = h3.textContent;
                const numberMatch = text.match(/(\d+)/);
                
                if (numberMatch) {
                    const number = parseInt(numberMatch[1]);
                    if (number > 100) {
                        animateCounter(h3, number);
                    }
                }
            }
        }
    });
}, observerOptions);

// Observe proof items
document.querySelectorAll('.proof-item').forEach(item => {
    observer.observe(item);
});

// Log page analytics (integrate with your analytics service)
console.log('GRiD CO Landing Page Loaded');
console.log('Visitor landed on:', new Date().toLocaleString());
