// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Testimonial Rotation
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Show the selected testimonial
            testimonials[index].style.display = 'block';
        }
        
        // Initialize with the first testimonial
        showTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Clear previous error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            // Validate name
            if (nameInput && !nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            }
            
            // Validate email
            if (emailInput) {
                const emailValue = emailInput.value.trim();
                if (!emailValue) {
                    isValid = false;
                    showError(emailInput, 'Please enter your email');
                } else if (!isValidEmail(emailValue)) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email address');
                }
            }
            
            // Validate message
            if (messageInput && !messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            }
            
            // Prevent form submission if validation fails
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        
        // Add red border to input
        input.style.borderColor = '#dc3545';
        
        // Insert error message after input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
        
        // Remove error styling when user starts typing
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            if (this.nextSibling.classList && this.nextSibling.classList.contains('error-message')) {
                this.nextSibling.remove();
            }
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Class Filters
    const classFilters = document.querySelectorAll('.class-filter');
    const classItems = document.querySelectorAll('.class-card');
    
    if (classFilters.length > 0 && classItems.length > 0) {
        classFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                classFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter class items
                classItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.display = 'none';
    backToTopButton.style.backgroundColor = 'var(--primary-color)';
    backToTopButton.style.color = '#fff';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '40px';
    backToTopButton.style.height = '40px';
    backToTopButton.style.fontSize = '16px';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav {
                display: none;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: #fff;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 20px;
                z-index: 1000;
            }
            
            nav.active {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
            }
            
            nav ul li {
                margin: 10px 0;
                margin-left: 0;
            }
            
            .menu-toggle {
                display: block;
            }
            
            .menu-toggle.active i:before {
                content: "\\f00d";
            }
            
            header.sticky {
                padding: 10px 0;
                background-color: rgba(255, 255, 255, 0.95);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .feature-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .class-grid, .plan-grid, .footer-grid {
                grid-template-columns: 1fr;
            }
            
            .testimonial-slider {
                flex-direction: column;
            }
            
            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.feature-card, .class-card, .testimonial, .plan-card');
    
    if (animateElements.length > 0) {
        animateElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
        
        // Check if elements are in viewport
        function checkVisibility() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Check on page load
        checkVisibility();
        
        // Check on scroll
        window.addEventListener('scroll', checkVisibility);
    }
});
