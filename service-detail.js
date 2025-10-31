// Service Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.15,
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

    // Animate highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(step);
    });

    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.service-gallery .gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate FAQ items
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate related cards
    const relatedCards = document.querySelectorAll('.related-card');
    relatedCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Sticky quick booking on mobile
    const quickBooking = document.querySelector('.quick-booking');
    const overview = document.querySelector('.overview-visual');
    
    if (window.innerWidth <= 900 && quickBooking && overview) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const overviewBottom = overview.offsetTop + overview.offsetHeight;
            
            if (currentScroll > overviewBottom && currentScroll > lastScroll) {
                quickBooking.style.position = 'fixed';
                quickBooking.style.bottom = '20px';
                quickBooking.style.left = '20px';
                quickBooking.style.right = '20px';
                quickBooking.style.zIndex = '100';
                quickBooking.style.maxWidth = 'calc(100% - 40px)';
            } else if (currentScroll < overviewBottom) {
                quickBooking.style.position = 'static';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Check URL for service parameter and pre-select in booking
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        // Store in sessionStorage for booking page
        sessionStorage.setItem('preselectedService', serviceParam);
    }

    // Parallax effect for hero
    const serviceHero = document.querySelector('.service-hero');
    if (serviceHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.4;
            serviceHero.style.backgroundPositionY = parallax + 'px';
        });
    }

    // Number counter animation for meta items
    const metaItems = document.querySelectorAll('.meta-item');
    metaItems.forEach(item => {
        const text = item.textContent;
        if (text.includes('₺')) {
            const priceMatch = text.match(/₺(\d+)/);
            if (priceMatch) {
                const price = parseInt(priceMatch[1]);
                const span = item.querySelector('span:last-child');
                
                let current = 0;
                const increment = price / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= price) {
                        current = price;
                        clearInterval(timer);
                    }
                    span.textContent = '₺' + Math.floor(current);
                }, 20);
            }
        }
    });

    // Smooth reveal for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(header);
    });
});
