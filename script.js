// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Donation Amount Selection
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountDiv = document.querySelector('.custom-amount');
const customAmount = document.getElementById('customAmount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.amount === 'custom') {
            customAmountDiv.style.display = 'block';
            customAmount?.focus();
        } else {
            customAmountDiv.style.display = 'none';
        }
    });
});

// FAQ Toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all other answers
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            if (q.nextElementSibling) {
                q.nextElementSibling.classList.remove('active');
            }
        });
        
        // Open clicked answer if it wasn't active
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy');
    });
}

// Form Submission Handlers
const donationForm = document.querySelector('.donation-form');
const contactForm = document.querySelector('.contact-form');

if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = donationForm.querySelector('input[type="text"]')?.value;
        const amount = document.querySelector('.amount-btn.active')?.dataset.amount;
        const customAmtValue = customAmount?.value;
        
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        const finalAmount = amount === 'custom' ? customAmtValue : amount;
        if (!finalAmount) {
            alert('Please select a donation amount');
            return;
        }
        
        // WhatsApp Integration
        const message = `Assalamu Alaikum, I want to donate Rs. ${finalAmount} to Jamia Fatima tu Zahra.`;
        const whatsappUrl = `https://wa.me/923455214326?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]')?.value;
        const email = contactForm.querySelector('input[type="email"]')?.value;
        const message = contactForm.querySelector('textarea')?.value;
        
        if (!name || !email || !message) {
            alert('Please fill all required fields');
            return;
        }
        
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Smooth Scroll for Navigation Links
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

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initial Setup
window.addEventListener('load', () => {
    // Set first amount button as active
    const firstAmountBtn = document.querySelector('.amount-btn:first-of-type');
    if (firstAmountBtn) {
        firstAmountBtn.classList.add('active');
    }
});
