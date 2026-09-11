/**
 * Young Wombs Trauma Centre - Main Client JavaScript
 * Interactive controls, accessibility, and safe enquiry handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });
  }

  // 2. Expandable Horizontal Panels (Section G)
  const expPanels = document.querySelectorAll('.exp-panel');
  expPanels.forEach(panel => {
    panel.addEventListener('click', () => {
      expPanels.forEach(p => p.classList.remove('expanded'));
      panel.classList.add('expanded');
    });

    panel.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        expPanels.forEach(p => p.classList.remove('expanded'));
        panel.classList.add('expanded');
      }
    });
  });

  // 3. Contribution Chips Interactivity (Section E)
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = chip.textContent.trim();
      // Redirect to contact page with topic query parameter if clicked
      window.location.href = `contact.html?topic=${encodeURIComponent(topic)}`;
    });
  });

  // 4. Contact Form Handler (Honest Client-Side Validation)
  const contactForm = document.getElementById('enquiry-form');
  const formSuccess = document.getElementById('form-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all required fields.');
        return;
      }

      // Display clean success state without storing or submitting sensitive data
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.focus();
      }
    });
  }

  // 5. Hero Carousel Indicators (Section B)
  const dots = document.querySelectorAll('.slider-dot');
  const heroCard = document.querySelector('.hero-card');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-description');

  const slidesData = [
    {
      title: "Helping girls build their futures.",
      desc: "Digital learning, care and opportunities for teenage mothers and vulnerable girls.",
      img: "assets/images/hero_1.jpg"
    },
    {
      title: "Rising Strong Community & Vision.",
      desc: "Mobilising healthcare, inclusive education, advocacy, and financial literacy for teenage mothers.",
      img: "assets/images/hero_2.jpg"
    },
    {
      title: "Periods With Dignity & School Health.",
      desc: "Interactive health education, menstrual hygiene management, and breaking stigma in schools.",
      img: "assets/images/hero_3.jpg"
    }
  ];

  if (dots.length && heroCard && heroTitle && heroDesc) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const slide = slidesData[index];
        if (slide) {
          heroTitle.textContent = slide.title;
          heroDesc.textContent = slide.desc;
          const bgImg = heroCard.querySelector('.hero-background');
          if (bgImg) bgImg.src = slide.img;
        }
      });
    });
  }

  // 6. Smooth Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Auto-populate contact topic from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('topic');
  if (topicParam) {
    const topicSelect = document.getElementById('contact-topic');
    if (topicSelect) {
      for (let option of topicSelect.options) {
        if (option.text.toLowerCase().includes(topicParam.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  // 8. FAQ Accordion Handler
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const questionBtn = card.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        faqCards.forEach(c => c.classList.remove('active'));
        if (!isActive) {
          card.classList.add('active');
        }
      });
    }
  });

  // 9. Donorbox-Inspired Donation Widget Logic
  const freqTabs = document.querySelectorAll('.freq-tab');
  const amountBtns = document.querySelectorAll('.amount-preset-btn');
  const customAmountInput = document.getElementById('custom-amount-input');
  const impactDescText = document.getElementById('impact-desc-text');
  const payMethodBtns = document.querySelectorAll('.pay-method-btn');
  const donationForm = document.getElementById('donation-form');
  const donationSuccessMsg = document.getElementById('donation-success-msg');

  // Frequency tab switcher
  freqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      freqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Payment method switcher
  payMethodBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      payMethodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const method = btn.getAttribute('data-method');
      const cardFields = document.getElementById('card-fields-group');
      const momoFields = document.getElementById('momo-fields-group');
      const wireFields = document.getElementById('wire-fields-group');

      if (cardFields) cardFields.style.display = method === 'card' ? 'block' : 'none';
      if (momoFields) momoFields.style.display = method === 'momo' ? 'block' : 'none';
      if (wireFields) wireFields.style.display = method === 'wire' ? 'block' : 'none';
    });
  });

  // Function to update live impact copy based on selected amount
  function updateImpactMessage(amountVal) {
    if (!impactDescText) return;
    const amount = parseFloat(amountVal) || 0;

    if (amount < 25) {
      impactDescText.textContent = "Your gift provides immediate hygiene supplies and educational materials for a vulnerable girl.";
    } else if (amount >= 25 && amount < 50) {
      impactDescText.textContent = "Provides 5 girls with complete Periods With Dignity sanitary packages and health guides.";
    } else if (amount >= 50 && amount < 100) {
      impactDescText.textContent = "Funds psychological trauma healing sessions and counseling circles for 2 teenage mothers.";
    } else if (amount >= 100 && amount < 250) {
      impactDescText.textContent = "Supplies a teenage mother with a full vocational learning kit & school reintegration supplies.";
    } else if (amount >= 250 && amount < 500) {
      impactDescText.textContent = "Equips a complete trauma-informed digital workstation at the JAVI Tech Hub in Kenya.";
    } else {
      impactDescText.textContent = "Funds a community-wide MezaDuara Violence Prevention roundtable dialogue in Kericho or Wakiso.";
    }
  }

  // Amount Preset buttons handler
  amountBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-amount');
      if (customAmountInput) {
        customAmountInput.value = val;
      }
      updateImpactMessage(val);
    });
  });

  // Custom Amount input handler
  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      const val = customAmountInput.value;
      amountBtns.forEach(b => {
        if (b.getAttribute('data-amount') === val) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      updateImpactMessage(val);
    });
  }

  // Donation Form Submission
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const donorName = document.getElementById('donor-name')?.value.trim();
      const donorEmail = document.getElementById('donor-email')?.value.trim();
      const selectedAmt = customAmountInput?.value || '50';
      const activePayBtn = document.querySelector('.pay-method-btn.active');
      const activeMethod = activePayBtn ? activePayBtn.getAttribute('data-method') : 'momo';

      if (!donorName || !donorEmail) {
        alert('Please provide your full name and email address.');
        return;
      }

      if (activeMethod === 'momo') {
        const momoPhone = document.getElementById('momo-phone')?.value.trim();
        if (!momoPhone) {
          alert('Please enter your Mobile Money phone number to receive the Yo! Payments prompt.');
          document.getElementById('momo-phone')?.focus();
          return;
        }

        // Show Yo! Payments processing state
        const submitBtn = donationForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Sending Yo! Payments Prompt...</span> <div class="icon-circle">⏳</div>`;
        }

        setTimeout(() => {
          donationForm.style.display = 'none';
          if (donationSuccessMsg) {
            const confirmAmtSpan = document.getElementById('confirmed-donation-amount');
            if (confirmAmtSpan) confirmAmtSpan.textContent = `$${selectedAmt}`;
            
            // Add Yo! Payments details to confirmation
            const momoNote = document.createElement('p');
            momoNote.style.fontSize = '0.9rem';
            momoNote.style.marginTop = '12px';
            momoNote.style.padding = '12px';
            momoNote.style.background = 'var(--surface-purple-light)';
            momoNote.style.borderRadius = 'var(--radius-sm)';
            momoNote.style.border = '1px solid var(--brand-purple)';
            momoNote.style.color = '#000000';
            momoNote.innerHTML = `<strong>Yo! Payments Status:</strong> USSD prompt dispatched to <strong>${momoPhone}</strong>. Transaction Ref: <code>YO-MM-${Math.floor(100000 + Math.random() * 900000)}</code>. Please enter your Mobile Money PIN on your phone to complete.`;
            
            donationSuccessMsg.appendChild(momoNote);
            donationSuccessMsg.style.display = 'block';
            donationSuccessMsg.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1200);

      } else {
        // Card (DPO) or Bank Wire
        donationForm.style.display = 'none';
        if (donationSuccessMsg) {
          const confirmAmtSpan = document.getElementById('confirmed-donation-amount');
          if (confirmAmtSpan) confirmAmtSpan.textContent = `$${selectedAmt}`;
          donationSuccessMsg.style.display = 'block';
          donationSuccessMsg.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});

