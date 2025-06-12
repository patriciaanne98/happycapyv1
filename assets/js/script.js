// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isStars = target.includes('★');
        const isKPlus = target.includes('K+');
        
        let finalValue;
        if (isPercentage) {
            finalValue = parseInt(target);
        } else if (isStars) {
            finalValue = parseFloat(target);
        } else if (isKPlus) {
            finalValue = parseInt(target);
        } else {
            finalValue = parseInt(target);
        }
        
        let current = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                if (isPercentage) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (isStars) {
                    counter.textContent = current.toFixed(1) + '★';
                } else if (isKPlus) {
                    counter.textContent = Math.floor(current) + 'K+';
                } else {
                    counter.textContent = Math.floor(current);
                }
            }
        }, 50);
    });
}

// Trigger counter animation when stats section comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats'));