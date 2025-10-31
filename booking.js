// Booking Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
	// Rezervasyon state
	const bookingState = {
		currentStep: 1,
		service: null,
		serviceName: '',
		duration: 0,
		price: 0,
		barber: null,
		barberName: '',
		date: null,
		time: null
	};

	// DOM Elements
	const steps = document.querySelectorAll('.booking-step');
	const stepDots = document.querySelectorAll('.step-dot');
	const stepLines = document.querySelectorAll('.step-line');
	
	// Step 1: Hizmet Seçimi
	const serviceOptions = document.querySelectorAll('.service-option');
	const step1NextBtn = document.querySelector('#step1 .btn-next');

	serviceOptions.forEach(option => {
		option.addEventListener('click', function() {
			serviceOptions.forEach(o => o.classList.remove('selected'));
			this.classList.add('selected');
			
			bookingState.service = this.dataset.service;
			bookingState.serviceName = this.querySelector('h3').textContent;
			bookingState.duration = this.dataset.duration;
			bookingState.price = this.dataset.price;
			
			step1NextBtn.disabled = false;
		});
	});

	step1NextBtn.addEventListener('click', () => goToStep(2));

	// Step 2: Zanaatkar ve Tarih/Saat
	const barberOptions = document.querySelectorAll('.barber-option');
	const step2NextBtn = document.querySelector('#step2 .btn-next');
	const step2BackBtn = document.querySelector('#step2 .btn-back');

	barberOptions.forEach(option => {
		option.addEventListener('click', function() {
			barberOptions.forEach(o => o.classList.remove('selected'));
			this.classList.add('selected');
			
			bookingState.barber = this.dataset.barber;
			bookingState.barberName = this.querySelector('h4').textContent;
			
			checkStep2Complete();
		});
	});

	// Calendar
	const calendarGrid = document.getElementById('calendarGrid');
	const currentMonthEl = document.getElementById('currentMonth');
	const prevMonthBtn = document.getElementById('prevMonth');
	const nextMonthBtn = document.getElementById('nextMonth');
	
	let currentDate = new Date();
	const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
	                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

	function renderCalendar(year, month) {
		calendarGrid.innerHTML = '';
		currentMonthEl.textContent = `${monthNames[month]} ${year}`;
		
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		// Haftanın günleri başlıkları
		const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
		dayNames.forEach(day => {
			const dayHeader = document.createElement('div');
			dayHeader.className = 'calendar-day-header';
			dayHeader.textContent = day;
			dayHeader.style.fontWeight = 'bold';
			dayHeader.style.color = 'var(--accent)';
			dayHeader.style.fontSize = '0.85rem';
			dayHeader.style.padding = '0.5rem';
			calendarGrid.appendChild(dayHeader);
		});
		
		// Boş günler
		for (let i = 0; i < firstDay; i++) {
			const emptyDay = document.createElement('div');
			calendarGrid.appendChild(emptyDay);
		}
		
		// Günler
		for (let day = 1; day <= daysInMonth; day++) {
			const dayDate = new Date(year, month, day);
			const dayEl = document.createElement('div');
			dayEl.className = 'calendar-day';
			dayEl.textContent = day;
			dayEl.dataset.date = dayDate.toISOString().split('T')[0];
			
			if (dayDate < today) {
				dayEl.classList.add('disabled');
			} else {
				dayEl.addEventListener('click', function() {
					if (!this.classList.contains('disabled')) {
						document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
						this.classList.add('selected');
						bookingState.date = this.dataset.date;
						checkStep2Complete();
					}
				});
			}
			
			calendarGrid.appendChild(dayEl);
		}
	}

	prevMonthBtn.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
	});

	nextMonthBtn.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
	});

	renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

	// Time Slots
	const timeSlots = document.querySelectorAll('.time-slot');
	timeSlots.forEach(slot => {
		slot.addEventListener('click', function() {
			if (!this.classList.contains('disabled')) {
				timeSlots.forEach(s => s.classList.remove('selected'));
				this.classList.add('selected');
				bookingState.time = this.dataset.time;
				checkStep2Complete();
			}
		});
	});

	function checkStep2Complete() {
		if (bookingState.barber && bookingState.date && bookingState.time) {
			step2NextBtn.disabled = false;
		}
	}

	step2NextBtn.addEventListener('click', () => {
		updateSummary();
		goToStep(3);
	});
	step2BackBtn.addEventListener('click', () => goToStep(1));

	// Step 3: Bilgiler ve Onay
	const bookingForm = document.getElementById('bookingForm');
	const termsCheckbox = document.getElementById('terms');
	const step3BackBtn = document.querySelector('#step3 .btn-back');
	const submitBtn = document.querySelector('.btn-submit');

	function validateForm() {
		const fullname = bookingForm.fullname.value.trim();
		const phone = bookingForm.phone.value.trim();
		const email = bookingForm.email.value.trim();
		const termsChecked = termsCheckbox.checked;
		
		if (fullname && phone && email && termsChecked) {
			submitBtn.disabled = false;
		} else {
			submitBtn.disabled = true;
		}
	}

	bookingForm.addEventListener('input', validateForm);
	termsCheckbox.addEventListener('change', validateForm);

	step3BackBtn.addEventListener('click', () => goToStep(2));
	
	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		completeBooking();
	});

	function updateSummary() {
		document.getElementById('summaryService').textContent = bookingState.serviceName;
		document.getElementById('summaryBarber').textContent = bookingState.barberName;
		document.getElementById('summaryDate').textContent = formatDate(bookingState.date);
		document.getElementById('summaryTime').textContent = bookingState.time;
		document.getElementById('summaryDuration').textContent = `${bookingState.duration} dakika`;
		document.getElementById('summaryPrice').textContent = `₺${bookingState.price}`;
	}

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const day = date.getDate();
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	}

	function completeBooking() {
		// Başarı ekranını göster
		steps.forEach(s => s.classList.remove('active'));
		document.getElementById('bookingSuccess').classList.add('show');
		
		// Rastgele rezervasyon numarası
		const confirmNumber = 'LB-2025-' + Math.floor(Math.random() * 9999);
		document.getElementById('confirmationNumber').textContent = confirmNumber;
		
		// Step indicator'ı tamamla
		stepDots.forEach(dot => dot.classList.add('completed'));
		stepLines.forEach(line => line.classList.add('completed'));
		
		// Sayfayı yukarı kaydır
		window.scrollTo({ top: 0, behavior: 'smooth' });
		
		console.log('Rezervasyon Tamamlandı:', bookingState);
	}

	function goToStep(stepNumber) {
		bookingState.currentStep = stepNumber;
		
		// Adımları güncelle
		steps.forEach((step, index) => {
			step.classList.remove('active');
			if (index + 1 === stepNumber) {
				step.classList.add('active');
			}
		});
		
		// Indicator'ı güncelle
		stepDots.forEach((dot, index) => {
			dot.classList.remove('active');
			if (index + 1 < stepNumber) {
				dot.classList.add('completed');
			}
			if (index + 1 === stepNumber) {
				dot.classList.add('active');
			}
			if (index + 1 > stepNumber) {
				dot.classList.remove('completed');
			}
		});
		
		stepLines.forEach((line, index) => {
			if (index + 1 < stepNumber) {
				line.classList.add('completed');
			} else {
				line.classList.remove('completed');
			}
		});
		
		// Sayfayı yukarı kaydır
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Telefon formatı
	const phoneInput = bookingForm.phone;
	phoneInput.addEventListener('input', function(e) {
		let value = e.target.value.replace(/\D/g, '');
		if (value.startsWith('90')) value = value.substring(2);
		if (value.length > 10) value = value.substring(0, 10);
		
		let formatted = '+90';
		if (value.length > 0) formatted += ' (' + value.substring(0, 3);
		if (value.length >= 4) formatted += ') ' + value.substring(3, 6);
		if (value.length >= 7) formatted += ' ' + value.substring(6, 8);
		if (value.length >= 9) formatted += ' ' + value.substring(8, 10);
		
		e.target.value = formatted;
	});
});
