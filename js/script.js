window.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML('afterbegin', '<div class="bg-pattern"></div>');
  
  const cursor = document.getElementById("cursor");
  if (!cursor) return;
  
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add("touch-device");
  }

  let mouseX = -100;
  let mouseY = -100;
  
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateCursor() {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    requestAnimationFrame(updateCursor);
  }
  
  requestAnimationFrame(updateCursor);

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    cursor.style.opacity = "0.8";
  });
  
  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.opacity = "0.6";
  });

  document.body.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (
      target.tagName === "A" || 
      target.tagName === "BUTTON" || 
      target.classList.contains("skill-card") ||
      target.closest(".skill-card") ||
      target.getAttribute("data-hover") === "true"
    ) {
      cursor.classList.add("hover");
    }
  });
  
  document.body.addEventListener("mouseout", (e) => {
    const target = e.target;
    if (
      target.tagName === "A" || 
      target.tagName === "BUTTON" || 
      target.classList.contains("skill-card") ||
      target.closest(".skill-card") ||
      target.getAttribute("data-hover") === "true"
    ) {
      cursor.classList.remove("hover");
    }
  });

  const nameElement = document.querySelector('h1');
  if (nameElement) {
    nameElement.innerHTML = `<span class="name-animation">${nameElement.textContent}</span>`;
  }

  const header = document.querySelector('header');
  if (header) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
      <div class="text">Scroll Down</div>
      <div class="icon"></div>
    `;
    header.appendChild(scrollIndicator);
  }

  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    const contactLinks = contactSection.querySelectorAll('p');
    
    const contactContainer = document.createElement('div');
    contactContainer.className = 'contact-methods';
    
    contactLinks.forEach(link => {
      if (link.querySelector('a')) {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.appendChild(link.querySelector('a').cloneNode(true));
        contactContainer.appendChild(contactItem);
      }
    });
    
    const heading = contactSection.querySelector('h2');
    heading.insertAdjacentElement('afterend', contactContainer);
    
    contactLinks.forEach(link => {
      if (link.parentNode === contactSection) {
        contactSection.removeChild(link);
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.classList.add('reveal-on-scroll');
    section.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(section);
  });

  const description = document.querySelector('.description');
  if (description) {
    const keywords = ['Rust', 'systems programming', 'cybersecurity', 'amateur radio'];
    let content = description.innerHTML;
    
    keywords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      content = content.replace(regex, '<span class="highlight">$1</span>');
    });
    
    description.innerHTML = content;
  }
  
  const skillCards = document.querySelectorAll('.skill-card');
  const delays = [0, 1.1, 0.7, 1.6, 0.3, 1.4, 0.9, 0.5];
  
  skillCards.forEach((card, index) => {
    card.classList.add('float');
    const delayIndex = index % delays.length;
    card.style.animationDelay = `${delays[delayIndex]}s`;
  });
});
