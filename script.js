// Wait for DOM to be fully loaded
(function() {
  'use strict';

  // Initialize EmailJS when script loads
  if (typeof emailjs !== 'undefined') {
    emailjs.init("A_B2uh1owkPMg9iBz");
  }

  // Throttle scroll updates
  let tick = false;

  // Show video background on page load
  window.addEventListener('load', function() {
    setTimeout(function() {
      const videoBg = document.getElementById('videoBg');
      if (videoBg) {
        videoBg.classList.add('visible');
      }
    }, 500);
  });

  // Update layout based on scroll position
  function updateLayout() {
    const brand = document.getElementById('brand');
    const newBrand = document.getElementById('newBrand');
    const nav = document.getElementById('nav');
    const bg = document.getElementById('bg');
    const scroll = document.getElementById('scroll');
    const videoBg = document.getElementById('videoBg');
    
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    const scrollY = window.scrollY;
    const totalProgress = window.scrollY / (window.innerHeight * 3);
    
    // Phase 1: Start moving logo (10% scroll)
    if (progress > 0.1) {
      if (brand) brand.classList.add('moving');
      if (scroll) scroll.classList.add('hidden');
      if (newBrand) {
        newBrand.classList.add('visible');
        newBrand.classList.remove('hidden');
      }
    } else {
      if (brand) brand.classList.remove('moving');
      if (scroll) scroll.classList.remove('hidden');
      if (newBrand) {
        newBrand.classList.remove('visible');
        newBrand.classList.add('hidden');
      }
    }
    
    // Phase 2: Napis MUSI zniknąć przy 2 ekranach (66%)
    if (totalProgress > 0.66) {
      if (newBrand) {
        newBrand.classList.remove('visible');
        newBrand.classList.add('hidden');
      }
    } else if (progress > 0.1) {
      // Jeśli jesteśmy poniżej 66% ale powyżej 10%, napis powinien być widoczny
      if (newBrand) {
        newBrand.classList.add('visible');
        newBrand.classList.remove('hidden');
      }
    }
    
    // Phase 3: Menu pojawia się przy 2.2 ekranach (73%)
    if (totalProgress > 0.73) {
      if (bg) bg.classList.add('shrink');
      if (nav) nav.classList.add('visible');
    } else {
      if (bg) bg.classList.remove('shrink');
      if (nav) nav.classList.remove('visible');
    }
    
    // Hide video when scrolling down
    if (videoBg) {
      if (progress > 0.5) {
        videoBg.style.opacity = '0';
      } else {
        videoBg.style.opacity = '1';
      }
    }
    
    tick = false;
  }

  // Smooth scroll listener
  window.addEventListener('scroll', function() {
    if (!tick) {
      requestAnimationFrame(updateLayout);
      tick = true;
    }
  });

  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Scroll to top function
  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Modal data
  const modalData = {
    bbq: {
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
      title: 'Slow BBQ Grill',
      description: [
        'Nasze BBQ to prawdziwa uczta dla miłośników mięs. Wykorzystujemy tradycyjne metody wędzenia, które nadają potrawom wyjątkowy smak i aromat.',
        'W menu znajdziesz soczystą pulled pork, aromatyczne żeberka BBQ oraz delikatne brisket, wędzony przez 12 godzin dla uzyskania idealnej tekstury.',
        'Każde danie serwujemy z domowymi sosami i świeżymi dodatkami, tworząc niezapomniane doświadczenie kulinarne dla Twoich gości.'
      ]
    },
    wok: {
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200',
      title: 'Premium Wok & Azja',
      description: [
        'Zanurz się w aromatach Azji dzięki naszemu premium wokowi. Każde danie przygotowujemy na żywo, zachowując chrupkość warzyw i intensywność smaków.',
        'Oferujemy klasyczne dania jak Pad Thai, curry z krewetkami czy smażony ryż, ale także autorskie kompozycje łączące tradycję z nowoczesnością.',
        'Używamy tylko najświeższych składników i autentycznych azjatyckich przypraw, aby każdy kęs był prawdziwą podróżą do Dalekiego Wschodu.'
      ]
    },
    dessert: {
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200',
      title: 'Desery Fine Dining',
      description: [
        'Nasze desery to prawdziwe dzieła sztuki kulinarnej. Każdy element jest starannie przemyślany i wykonany z perfekcją godną restauracji ze gwiazdką Michelin.',
        'Od klasycznych tiramisu i panna cotty, po nowoczesne dekonstrukcje i molekularne eksperymenty - każdy deser to niezwykłe połączenie smaku, tekstury i estetyki.',
        'Wykorzystujemy sezonowe owoce, belgijską czekoladę i najlepsze składniki, aby stworzyć słodkie zakończenie Twojego eventu, które goście zapamiętają na długo.'
      ]
    }
  };

  // Open modal function
  function openModal(type) {
    const modal = document.getElementById('modal');
    const img = document.getElementById('modalImg');
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('modalText');
    
    if (modalData[type] && modal && img && title && text) {
      img.src = modalData[type].image;
      img.alt = modalData[type].title;
      title.textContent = modalData[type].title;
      text.innerHTML = modalData[type].description.map(function(p) { 
        return '<p>' + p + '</p>'; 
      }).join('');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal function
  window.closeModal = function() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing...');

    // Observe all sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });

    // Setup offer card click handlers
    const offerCards = document.querySelectorAll('.offer-card');
    console.log('Found offer cards:', offerCards.length);
    
    offerCards.forEach(function(card) {
      card.addEventListener('click', function() {
        const offerType = card.getAttribute('data-offer');
        console.log('Clicked offer card:', offerType);
        if (offerType) {
          openModal(offerType);
        }
      });
    });

    // Close button click handler
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        window.closeModal();
      });
    }

    // Close modal on background click
    const modal = document.getElementById('modal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          window.closeModal();
        }
      });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.closeModal();
      }
    });

    // Contact form submission
    const form = document.getElementById('form');
    console.log('Found form:', form ? 'yes' : 'no');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Get selected stations
        const stationCheckboxes = form.querySelectorAll('input[name="stations"]:checked');
        const selectedStations = Array.from(stationCheckboxes).map(function(cb) {
          const labels = {
            'grill': 'Slow BBQ Grill',
            'wok': 'Azjatycki Wok',
            'lody': 'Lody',
            'gotowanie': 'Live Cooking'
          };
          return labels[cb.value] || cb.value;
        }).join(', ');
        
        // Validate at least one station is selected
        if (selectedStations.length === 0) {
          alert('Proszę wybrać co najmniej jedną stację!');
          return;
        }
        
        // Get event type label
        const eventTypeSelect = form.event_type;
        const eventTypeLabel = eventTypeSelect.options[eventTypeSelect.selectedIndex].text;
        
        // Prepare email parameters
        const params = {
          name: form.name.value,
          email: form.email.value,
          phone: form.phone.value,
          date: form.date.value,
          guests: form.guests.options[form.guests.selectedIndex].text,
          budget: form.budget.options[form.budget.selectedIndex].text,
          event_type: eventTypeLabel,
          stations: selectedStations,
          message: form.message.value || 'Brak dodatkowej wiadomości'
        };
        
        console.log('Sending email with params:', params);
        
        // Show loading state
        const submitBtn = form.querySelector('.cta-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;
        
        // Check if emailjs is available
        if (typeof emailjs === 'undefined') {
          alert('❌ EmailJS nie został załadowany. Sprawdź połączenie internetowe.');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          return;
        }
        
        // Send email via EmailJS
        emailjs.send('service_51dzr7x', 'template_fy1svxl', params)
          .then(function() {
            console.log('Email sent successfully');
            alert('✅ Dziękujemy! Zapytanie zostało wysłane. Skontaktujemy się wkrótce.');
            form.reset();
          })
          .catch(function(err) {
            console.error('EmailJS Error:', err);
            alert('❌ Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.');
          })
          .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          });
      });
    }

    // Initialize layout
    updateLayout();
    console.log('Initialization complete');
  });

})();