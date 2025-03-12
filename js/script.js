// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the Matrix rain
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&+,:;=?@#|\'<>-_%.*/(){}[]^!~'.split('');

// Set up the columns
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

// Array to track the y position of each falling character
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Parallax effect variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let parallaxFactor = 0.05; // Controls parallax intensity

// Track mouse position for parallax effect
document.addEventListener('mousemove', (e) => {
    // Calculate mouse position relative to center of screen
    mouseX = (e.clientX - window.innerWidth / 2) * parallaxFactor;
    mouseY = (e.clientY - window.innerHeight / 2) * parallaxFactor;
});

// Animation speed control - lower value means slower speed
const rainSpeed = 1.0;

// Draw the Matrix rain with parallax effect
function drawMatrixRain() {
    // Smooth transition to target parallax position
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    
    // Add a slight translucent black rectangle on top of previous frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
        // Apply parallax offset based on column position
        // Columns in the center have less movement than those at the edges
        const parallaxDepth = Math.abs((i / columns) - 0.5) * 2; // 0-1 depth factor
        const xOffset = targetX * parallaxDepth;
        const yOffset = targetY * parallaxDepth;
        
        // Choose a random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Draw the character with parallax offset
        ctx.fillText(text, (i * fontSize) + xOffset, (drops[i] * fontSize) + yOffset);
        
        // Move the drop down
        drops[i] += rainSpeed;
        
        // Randomly reset a drop to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
        }
        
        // Create depth effect with varying brightness
        // Columns with higher parallaxDepth are brighter (appear closer)
        const brightness = Math.floor(150 + (100 * parallaxDepth));
        ctx.fillStyle = `rgba(0, ${brightness}, 0, 0.8)`;
    }
}

// Control animation frame rate for Matrix rain
let lastTime = 0;
const frameInterval = 40; // Increase for slower updates (milliseconds between frames)

function animateMatrixRain(timestamp) {
    const elapsed = timestamp - lastTime;
    
    if (elapsed > frameInterval) {
        lastTime = timestamp;
        drawMatrixRain();
    }
    
    requestAnimationFrame(animateMatrixRain);
}

// Start the animation when the page loads
window.addEventListener('load', () => {
    requestAnimationFrame(animateMatrixRain);
});

// Ensure the canvas stays fullscreen and update parallax calculations on resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate number of columns
    const columns = Math.floor(canvas.width / fontSize);
    
    // Reset parallax targets on resize
    mouseX = 0;
    mouseY = 0;
    targetX = 0;
    targetY = 0;
});

// Mobile-specific parallax using device orientation
window.addEventListener('deviceorientation', (event) => {
    if (event.beta && event.gamma) {
        // Use device tilt for parallax on mobile
        mouseX = (event.gamma / 45) * window.innerWidth * parallaxFactor;
        mouseY = (event.beta / 45) * window.innerHeight * parallaxFactor;
    }
}, true);

// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    // Animate the burger menu bars
    const bars = document.querySelectorAll('.bar');
    bars[0].classList.toggle('bar-transform-1');
    bars[1].classList.toggle('bar-transform-2');
    bars[2].classList.toggle('bar-transform-3');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        
        // Reset burger menu bars
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.remove('bar-transform-1');
        bars[1].classList.remove('bar-transform-2');
        bars[2].classList.remove('bar-transform-3');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect for terminal responses
function typeWriterEffect() {
    const responses = document.querySelectorAll('.response');
    
    responses.forEach(response => {
        const text = response.textContent.trim();
        const words = text.split(' ');
        
        // Clear the original text
        response.textContent = '';
        
        // Type each word with a delay
        let wordIndex = 0;
        const typeInterval = setInterval(() => {
            if (wordIndex < words.length) {
                response.textContent += words[wordIndex] + ' ';
                wordIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    });
}

// Initialize typing effect when scrolled to About section
const aboutSection = document.getElementById('about');
let typingInitialized = false;

window.addEventListener('scroll', () => {
    const position = aboutSection.getBoundingClientRect();
    
    // Check if About section is in view
    if (position.top < window.innerHeight && position.bottom >= 0 && !typingInitialized) {
        typeWriterEffect();
        typingInitialized = true;
    }
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show a success message
    const successMessage = document.createElement('p');
    successMessage.classList.add('response');
    successMessage.style.color = 'var(--matrix-green)';
    successMessage.textContent = 'Message transmitted successfully. I will contact you soon.';
    
    contactForm.reset();
    contactForm.appendChild(successMessage);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Add glitch effect to elements on scroll
const glitchOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            if (!element.classList.contains('glitched')) {
                element.classList.add('glitched');
                
                // Create glitch effect
                setTimeout(() => {
                    element.classList.remove('glitched');
                }, 500);
            }
        }
    });
};

// Listen for scroll events to trigger glitch effects
window.addEventListener('scroll', () => {
    glitchOnScroll();
});

// Add more interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Cursor follower (Matrix-style trace effect)
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Create trailing effect particle
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
    
    // Add CSS for cursor follower and particles
    const style = document.createElement('style');
    style.innerHTML = `
        .cursor-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--matrix-green);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        
        .cursor-particle {
            position: fixed;
            width: 5px;
            height: 5px;
            background: var(--matrix-green);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0.8;
            z-index: 9998;
            animation: fadeOut 1s forwards;
        }
        
        @keyframes fadeOut {
            0% { opacity: 0.8; width: 5px; height: 5px; }
            100% { opacity: 0; width: 0; height: 0; }
        }
        
        .bar-transform-1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .bar-transform-2 {
            opacity: 0;
        }
        
        .bar-transform-3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Enhance Matrix effect on hover over hero section
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        // Increase parallax sensitivity when hovering over hero
        parallaxFactor = 0.1;
        
        // Increase the speed of the falling characters
        for (let i = 0; i < drops.length; i++) {
            drops[i] += 0.2;
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        // Reset parallax sensitivity
        parallaxFactor = 0.05;
        
        // Reset the speed
        for (let i = 0; i < drops.length; i++) {
            if (drops[i] > 0) {
                drops[i] -= 0.2;
            }
        }
    });
});

// Lazy load images for better performance
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
});

// Certificate slider functionality
document.addEventListener('DOMContentLoaded', () => {
    // Certificate data
    const certificates = [
        { 
            path: 'assets/Certificates/js-cert.png', 
            title: 'The Origins III: JavaScript',
            issuer: 'Codédex',
            date: 'January 12, 2025',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/certifice_devphil-1.png', 
            title: 'Python Programming Basics to Advanced',
            issuer: 'DEVSIGN Philippines',
            date: '2023',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Sonder 2025_ Designing a Future that Lasts - Attendee Certificate-1.png', 
            title: 'Sonder 2025: Google Dev World Tour in Indonesia',
            issuer: 'Google Developer Groups on Campus',
            date: 'January 11, 2024',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/ph-vn-sonder-2025.png', 
            title: 'Sonder 2025: Google Dev World Tour in Vietnam',
            issuer: 'Google Developer Groups on Campus',
            date: 'February 22, 2025',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Ignatian Leadership-1.png', 
            title: 'Ignatian Leadership - Forming Leaders with Character',
            issuer: 'Xavier University Senior High School - Ateneo De Cagayan',
            date: 'January 12, 2022',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Human Rights and Development-1.png', 
            title: 'Human Rights and Gender Development',
            issuer: 'Xavier University Senior High School - Ateneo De Cagayan',
            date: 'October 15, 2022',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Work Immersion 1-1.png', 
            title: 'Work Immersion - Labor and Employment',
            issuer: 'Department of Labor and Employment Region 10, Public Employment Service Office - CDO, and Xavier University Senior High School - Ateneo De Cagayan',
            date: 'April 23, 2022',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Research Capacity Building-1.png', 
            title: 'Research Capacity Building',
            issuer: 'Xavier University Senior High School - Ateneo De Cagayan',
            date: 'November 24, 2021',
            type: 'image'
        },
        { 
            path: 'assets/Certificates/Wonders of Waters Science Webinar - BLANCO, NOEL JHUMEL Certificate-1.png', 
            title: 'Wonders of Water Science',
            issuer: 'Xavier University Senior High School - Ateneo De Cagayan',
            date: 'September 15, 2021',
            type: 'image'
        }
    ];

    const certificateTrack = document.querySelector('.certificate-track');
    const dotsContainer = document.querySelector('.certificate-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // If the certificate section isn't loaded yet, exit the function
    if (!certificateTrack || !dotsContainer || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Create certificate elements
    certificates.forEach((cert, index) => {
        // Create certificate item
        const certItem = document.createElement('div');
        certItem.className = 'certificate-item';
        
        // Create certificate content based on type
        if (cert.type === 'image') {
            // Create image element
            const img = document.createElement('img');
            img.src = cert.path;
            img.alt = cert.title;
            img.addEventListener('click', () => showFullscreen(cert.path, cert.title, 'image'));
            certItem.appendChild(img);
        } else if (cert.type === 'pdf') {
            // Create iframe for PDF
            const iframe = document.createElement('iframe');
            iframe.src = cert.path;
            iframe.title = cert.title;
            certItem.appendChild(iframe);
            
            // Add click handler for fullscreen PDF
            certItem.addEventListener('click', () => showFullscreen(cert.path, cert.title, 'pdf'));
        }
        
        // Create certificate overlay with info
        const overlay = document.createElement('div');
        overlay.className = 'certificate-overlay';
        overlay.innerHTML = `
            <h3>${cert.title}</h3>
            <p>Issued by: ${cert.issuer}</p>
            <p>Date: ${cert.date}</p>
        `;
        
        // Append elements
        certItem.appendChild(overlay);
        certificateTrack.appendChild(certItem);
        
        // Create dot indicator
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set initial transform
    updateSliderPosition();
    
    // Handle next/prev buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSliderPosition();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, certificates.length - 1);
        updateSliderPosition();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
    }
    
    // Update slider position
    function updateSliderPosition() {
        certificateTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.disabled = currentIndex === certificates.length - 1;
        nextBtn.style.opacity = currentIndex === certificates.length - 1 ? '0.5' : '1';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSliderPosition();
        } else if (e.key === 'ArrowRight') {
            currentIndex = Math.min(currentIndex + 1, certificates.length - 1);
            updateSliderPosition();
        }
    });
    
    // Fullscreen view functionality
    function showFullscreen(path, title, type) {
        // Create fullscreen container if it doesn't exist
        let fullscreenView = document.querySelector('.fullscreen-view');
        
        if (!fullscreenView) {
            fullscreenView = document.createElement('div');
            fullscreenView.className = 'fullscreen-view';
            
            const content = document.createElement('div');
            content.className = 'fullscreen-content';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-fullscreen';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            closeBtn.addEventListener('click', () => {
                fullscreenView.classList.remove('active');
            });
            
            content.appendChild(closeBtn);
            fullscreenView.appendChild(content);
            document.body.appendChild(fullscreenView);
        }
        
        // Get content container
        const contentContainer = fullscreenView.querySelector('.fullscreen-content');
        contentContainer.innerHTML = '';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-fullscreen';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            fullscreenView.classList.remove('active');
        });
        contentContainer.appendChild(closeBtn);
        
        // Add content based on type
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = path;
            img.alt = title;
            contentContainer.appendChild(img);
        } else if (type === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = path;
            iframe.title = title;
            contentContainer.appendChild(iframe);
        }
        
        fullscreenView.classList.add('active');
        
        // Close on escape key
        document.addEventListener('keydown', function handleEsc(e) {
            if (e.key === 'Escape') {
                fullscreenView.classList.remove('active');
                document.removeEventListener('keydown', handleEsc);
            }
        });
    }
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    certificateTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    certificateTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            currentIndex = Math.min(currentIndex + 1, certificates.length - 1);
            updateSliderPosition();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSliderPosition();
        }
    }
});