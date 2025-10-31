// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Aktif buton
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtreleme
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => 
            !item.classList.contains('hide')
        );
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleImages();
            currentImageIndex = visibleImages.indexOf(this);
            openLightbox(this);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const info = item.querySelector('.item-info');
        
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `
            <h3>${info.querySelector('h3').textContent}</h3>
            <p>${info.querySelector('p').textContent}</p>
        `;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        openLightbox(visibleImages[currentImageIndex]);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        openLightbox(visibleImages[currentImageIndex]);
    }

    // Load More functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let itemsToShow = 12;
    
    function updateVisibility() {
        const allItems = Array.from(galleryItems);
        allItems.forEach((item, index) => {
            if (index < itemsToShow) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        if (itemsToShow >= allItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn.addEventListener('click', function() {
        itemsToShow += 6;
        updateVisibility();
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    updateVisibility();

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
