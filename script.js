// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Testimonials Slider
    const sliderTrack = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (sliderTrack && prevBtn && nextBtn && testimonials.length) {
        let currentIndex = 0;
        const testimonialWidth = 100; // 100%
        
        // Set initial width for the track
        sliderTrack.style.width = `${testimonials.length * 100}%`;
        
        // Clone first testimonial and append to the end for infinite loop
        const firstTestimonialClone = testimonials[0].cloneNode(true);
        sliderTrack.appendChild(firstTestimonialClone);
        
        // Function to move the slider
        function moveSlider(index) {
            sliderTrack.style.transform = `translateX(-${index * testimonialWidth}%)`;
        }
        
        // Function to handle next slide
        function nextSlide() {
            currentIndex++;
            moveSlider(currentIndex);
            
            // If at the cloned slide, reset to first slide without animation
            if (currentIndex >= testimonials.length) {
                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    currentIndex = 0;
                    moveSlider(currentIndex);
                    setTimeout(() => {
                        sliderTrack.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }
        
        // Function to handle previous slide
        function prevSlide() {
            if (currentIndex === 0) {
                // Quick jump to the clone at the end
                sliderTrack.style.transition = 'none';
                currentIndex = testimonials.length;
                moveSlider(currentIndex);
                
                // Then animate to the last real slide
                setTimeout(() => {
                    sliderTrack.style.transition = 'transform 0.5s ease';
                    currentIndex--;
                    moveSlider(currentIndex);
                }, 50);
            } else {
                currentIndex--;
                moveSlider(currentIndex);
            }
        }
        
        // Add event listeners to buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play slider
        let sliderInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-play on hover
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Normally here you would send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Normally here you would send the email to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
    
    // Scroll animations
    function revealOnScroll() {
        const elementsToReveal = document.querySelectorAll('.section-title, .about-content, .portfolio-item, .team-member');
        
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // Initial call to revealOnScroll
    revealOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // Add a README modal for the assignment requirements
    const body = document.body;
    const readmeModalHTML = `
        <div id="readme-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center;">
            <div style="background:white; padding:30px; max-width:800px; max-height:80vh; overflow-y:auto; border-radius:10px;">
                <h2 style="margin-bottom:20px;">Develevate UI Portfolio - Project README</h2>
                <h3>Project Overview</h3>
                <p>This website serves as a UI portfolio for the Develevate team, showcasing our design work and services.</p>
                
                <h3>Features</h3>
                <ul style="margin-left:20px; margin-bottom:15px;">
                    <li>Responsive design that works on all devices</li>
                    <li>Portfolio filtering system to categorize projects</li>
                    <li>Interactive testimonial slider</li>
                    <li>Contact form with validation</li>
                    <li>Newsletter subscription</li>
                    <li>Animated scroll effects</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <ul style="margin-left:20px; margin-bottom:15px;">
                    <li>HTML5</li>
                    <li>CSS3 with custom variables and flexbox/grid layouts</li>
                    <li>Vanilla JavaScript for interactivity</li>
                    <li>Font Awesome for icons</li>
                    <li>Responsive design techniques</li>
                </ul>
                
                <h3>Project Structure</h3>
                <pre style="background:#f5f5f5; padding:15px; overflow-x:auto; margin-bottom:15px;">
├── index.html
├── style.css
└── script.js
                </pre>
                
                <h3>Team Collaboration</h3>
                <p>Our team used the following tools and practices for collaboration:</p>
                <ul style="margin-left:20px; margin-bottom:15px;">
                    <li>GitHub for version control</li>
                    <li>Regular code reviews</li>
                    <li>Consistent coding standards</li>
                    <li>Task division based on strengths</li>
                </ul>
                
                <button id="close-readme" style="background:var(--primary); color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Close</button>
            </div>
        </div>
    `;
    
    // Create a temporary div to hold the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = readmeModalHTML;
    
    // Append the modal to the body
    body.appendChild(tempDiv.firstElementChild);
    
    // Add README button
    const readmeButton = document.createElement('button');
    readmeButton.textContent = 'View README';
    readmeButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: var(--primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 999;
    `;
    body.appendChild(readmeButton);
    
    // README modal functionality
    const readmeModal = document.getElementById('readme-modal');
    const closeReadmeBtn = document.getElementById('close-readme');
    
    readmeButton.addEventListener('click', function() {
        readmeModal.style.display = 'flex';
    });
    
    closeReadmeBtn.addEventListener('click', function() {
        readmeModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    readmeModal.addEventListener('click', function(e) {
        if (e.target === readmeModal) {
            readmeModal.style.display = 'none';
        }
    });
});