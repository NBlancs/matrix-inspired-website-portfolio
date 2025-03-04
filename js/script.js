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

// Animation speed control - lower value means slower speed
const rainSpeed = 1.0; // Reduced from default 1.0

// Draw the Matrix rain
function drawMatrixRain() {
    // Add a slight translucent black rectangle on top of previous frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down (slower speed now)
        drops[i] += rainSpeed;
        
        // Randomly reset a drop to the top (reduced probability for slower effect)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
        }
        
        // Vary the green brightness to create depth
        ctx.fillStyle = `rgba(0, ${Math.floor(Math.random() * 255)}, 0, 0.8)`;
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

// Ensure the canvas stays fullscreen
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
        // Increase the speed of the falling characters (but still slower than original)
        for (let i = 0; i < drops.length; i++) {
            drops[i] += 0.2;
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
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