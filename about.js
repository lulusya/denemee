// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate story section
    const storyText = document.querySelector('.story-text');
    const storyImage = document.querySelector('.story-image');
    
    if (storyText && storyImage) {
        storyText.style.opacity = '0';
        storyText.style.transform = 'translateX(-50px)';
        storyText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        storyImage.style.opacity = '0';
        storyImage.style.transform = 'translateX(50px)';
        storyImage.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        
        observer.observe(storyText);
        observer.observe(storyImage);
    }

    // Animate philosophy cards
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate stats with counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        const start = 0;
        const increment = numericValue / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (target.includes('K')) {
                displayValue = (displayValue / 1000).toFixed(0) + 'K';
            }
            if (isPlus) displayValue += '+';
            if (isPercentage) displayValue = '%' + displayValue;
            
            element.textContent = displayValue;
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.dataset.target || entry.target.textContent;
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        stat.dataset.target = stat.textContent;
        stat.textContent = '0';
        statsObserver.observe(stat);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        timelineObserver.observe(item);
    });

    // Value cards animation
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Products section animation
    const productsContent = document.querySelector('.products-content');
    const productsVisual = document.querySelector('.products-visual');
    
    if (productsContent && productsVisual) {
        productsContent.style.opacity = '0';
        productsContent.style.transform = 'translateX(-50px)';
        productsContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        productsVisual.style.opacity = '0';
        productsVisual.style.transform = 'translateX(50px)';
        productsVisual.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        
        observer.observe(productsContent);
        observer.observe(productsVisual);
    }

    // Product boxes stagger animation
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.9)';
        box.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const boxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.2 });
        
        boxObserver.observe(box);
    });

    // Feature items hover effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1 + 0.3}s, transform 0.5s ease ${index * 0.1 + 0.3}s`;
        observer.observe(item);
    });

    // Parallax effect for hero
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            aboutHero.style.backgroundPositionY = parallax + 'px';
        });
    }

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const storySection = document.querySelector('.story-section');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
