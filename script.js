// Lounge Barber - İleri Seviye İnteraktif JS

document.addEventListener('DOMContentLoaded', function () {
	
	// 1. Hero Parallax Efekti
	const heroContent = document.querySelector('[data-parallax]');
	if (heroContent) {
		document.addEventListener('mousemove', (e) => {
			const mouseX = e.clientX / window.innerWidth - 0.5;
			const mouseY = e.clientY / window.innerHeight - 0.5;
			heroContent.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
		});
	}

	// 2. Ekip Kartları 3D Flip
	const teamCards = document.querySelectorAll('[data-team-flip]');
	teamCards.forEach(card => {
		const flipBtns = card.querySelectorAll('.team-flip-btn');
		flipBtns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				card.classList.toggle('flipped');
			});
		});
	});

	// 3. Deneyim Kartları Tilt Efekti
	const experienceCards = document.querySelectorAll('[data-tilt]');
	experienceCards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const rotateX = (y - centerY) / 10;
			const rotateY = (centerX - x) / 10;
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
		});
		card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
		});
	});

	// 4. IntersectionObserver ile Animasyonlar
	const animatedEls = document.querySelectorAll('.concept-label, .concept-title, .story-line, .highlight-item, .visual-card, .section-header, .experience-card, .team-card, .testimonial-card, .insta-item');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1 });
	
	animatedEls.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(40px)';
		el.style.transition = 'opacity 0.8s cubic-bezier(.77,0,.18,1), transform 0.8s cubic-bezier(.77,0,.18,1)';
		observer.observe(el);
	});

	// 5. Sticky Header Küçültme (yalnızca ana sayfada)
	const header = document.querySelector('.main-header');
	const siteHeader = document.querySelector('.site-header');
	let lastScroll = 0;
	// Eski başlık için geriye dönük destek
	if (header) {
		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;
			if (currentScroll > 60) {
				header.style.padding = '0.5rem 2rem';
				header.style.background = 'rgba(0,0,0,0.8)';
			} else {
				header.style.padding = '1rem 2rem';
				header.style.background = 'rgba(0,0,0,0.5)';
			}
			lastScroll = currentScroll;
		});
	}
	// Yeni .site-header küçültme
	if (siteHeader) {
		window.addEventListener('scroll', () => {
			const sc = window.pageYOffset;
			if (sc > 60) siteHeader.classList.add('shrink');
			else siteHeader.classList.remove('shrink');
		});
	}

	// 6. Menü Magnetic Hover
	const navLinks = document.querySelectorAll('.nav-links a');
	navLinks.forEach(link => {
		link.addEventListener('mouseenter', function() {
			this.style.transform = 'scale(1.15)';
			this.style.color = 'var(--accent)';
		});
		link.addEventListener('mouseleave', function() {
			this.style.transform = 'scale(1)';
			this.style.color = 'var(--offwhite)';
		});
	});

	// 6.1 Aktif sayfa linkini vurgula
	(function highlightActiveNav() {
		const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
		// Eski nav (nav-links) için geriye dönük destek
		document.querySelectorAll('.nav-links .nav-link').forEach(a => {
			const href = (a.getAttribute('href') || '').toLowerCase();
			if ((path === '' || path === 'index.html') && href.includes('index.html')) a.classList.add('active');
			else if (path === 'about.html' && href.includes('about.html')) a.classList.add('active');
			else if (path === 'gallery.html' && href.includes('gallery.html')) a.classList.add('active');
		});
		// Yeni nav (.site-nav)
		document.querySelectorAll('.site-nav .nav-item').forEach(a => {
			const href = (a.getAttribute('href') || '').toLowerCase();
			if (href.startsWith('#')) return; // sayfa içi anchorlara aktif sınıf uygulamıyoruz
			if ((path === '' || path === 'index.html') && href.endsWith('index.html')) a.classList.add('active');
			else if (href.endsWith(path)) a.classList.add('active');
		});
	})();

	// 6.2 Mobil menü ve dropdown kontrolü (eski yapı)
	const menuToggle = document.querySelector('.menu-toggle');
	const navbar = document.querySelector('.navbar');
	if (menuToggle && navbar) {
		menuToggle.addEventListener('click', () => {
			navbar.classList.toggle('open');
		});
	}

	// 6.3 Yeni mobil çekmece
	const navToggle = document.querySelector('.nav-toggle');
	const drawer = document.getElementById('mobileDrawer');
	if (siteHeader && navToggle && drawer) {
		navToggle.addEventListener('click', () => {
			siteHeader.classList.toggle('drawer-open');
		});
		drawer.addEventListener('click', (e) => {
			if (e.target === drawer) {
				siteHeader.classList.remove('drawer-open');
			}
		});
		drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => siteHeader.classList.remove('drawer-open')));
	}

	// 7. İletişim Formu
	const contactForm = document.getElementById('contactForm');
	const formSuccess = document.getElementById('formSuccess');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			contactForm.style.display = 'none';
			formSuccess.classList.add('show');
			setTimeout(() => {
				contactForm.reset();
				contactForm.style.display = 'block';
				formSuccess.classList.remove('show');
			}, 4000);
		});
	}

	// 8. Smooth Scroll (sadece hedef mevcutsa engelle)
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			const target = href ? document.querySelector(href) : null;
			// Sayfa içi hedef varsa yumuşak kaydırma yap
			if (target) {
				e.preventDefault();
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			} else if (href === '#booking') {
				// Eski bağlantı uyumluluğu: #booking -> booking.html yönlendir
				e.preventDefault();
				window.location.href = 'booking.html';
			}
		});
	});

	// 9. Visual Cards Hover Efekti
	const visualCards = document.querySelectorAll('.visual-card');
	visualCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			visualCards.forEach(c => {
				if (c !== card) {
					c.style.filter = 'blur(3px) brightness(0.6)';
				}
			});
		});
		card.addEventListener('mouseleave', () => {
			visualCards.forEach(c => {
				c.style.filter = 'none';
			});
		});
	});

	// 10. CTA Ripple Effect
	const ctaBtns = document.querySelectorAll('.cta-btn');
	ctaBtns.forEach(btn => {
		btn.addEventListener('click', function(e) {
			const ripple = this.querySelector('.cta-ripple');
			if (ripple) {
				ripple.style.width = '300px';
				ripple.style.height = '300px';
				ripple.style.opacity = '0.3';
				setTimeout(() => {
					ripple.style.width = '0';
					ripple.style.height = '0';
					ripple.style.opacity = '0';
				}, 600);
			}
		});
	});

	console.log('🎨 Lounge Barber - İnteraktif Özellikler Yüklendi!');
});