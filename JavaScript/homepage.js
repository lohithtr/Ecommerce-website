document.addEventListener("DOMContentLoaded", function () {
  const welcomeMsg = document.getElementById("welcomeMsg");
  const authButtons = document.getElementById("authButtons");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loggedInUser = localStorage.getItem("loggedInUser");
  const storedData = JSON.parse(localStorage.getItem("signupData"));

  // Create button with consistent styling
  function createButton(text, id, href, className = "btn-auth") {
    const btn = document.createElement("a");
    btn.href = href;
    btn.id = id;
    btn.className = className;
    btn.textContent = text;
    return btn;
  }

  if (isLoggedIn && storedData) {
    let usernameToShow = "Guest";

    if (
      loggedInUser === storedData.username ||
      loggedInUser === storedData.email ||
      loggedInUser === storedData.phone
    ) {
      usernameToShow = storedData.username;
    }

    welcomeMsg.innerText = `Welcome, ${usernameToShow}`;
    welcomeMsg.classList.remove("d-none");

    const logoutBtn = createButton("Logout", "logoutBtn", "#");
    authButtons.appendChild(logoutBtn);

    // Logout functionality
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "login.html";
    });

    // Session timeout - 15 minutes
    let timeout;
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        alert("Session expired. Logging out.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      }, 15 * 60 * 1000); // 15 minutes
    }

    ["click", "mousemove", "keypress", "scroll"].forEach(evt => {
      document.addEventListener(evt, resetTimer);
    });

    resetTimer(); // Start the timer
  } else {
    welcomeMsg.classList.add("d-none");

    const loginBtn = createButton("Login", "loginBtn", "login.html");
    const signupBtn = createButton("Signup", "signupBtn", "signup.html");

    authButtons.appendChild(loginBtn);
    authButtons.appendChild(signupBtn);
  }

  // Toggle search box
  document.getElementById("searchToggle").addEventListener("click", function (e) {
    e.preventDefault();
    const searchBox = document.getElementById("searchInput");
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) {
      searchBox.focus();
    }
  });

  // Search navigation
  document.getElementById("searchInput").addEventListener("change", function () {
    const value = this.value.toLowerCase();
    if (value.includes("men")) window.location.href = "men.html";
    else if (value.includes("women")) window.location.href = "women.html";
    else if (value.includes("kids")) window.location.href = "kids.html";
    else if (value.includes("shoes")) window.location.href = "shoes.html";
    else if (value.includes("beauty")) window.location.href = "beauty.html";
    else if (value.includes("home")) window.location.href = "decor.html#home";
    else if (value.includes("decor")) window.location.href = "decor.html";
  });

  // Fetch cart count from localStorage or cart array
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    document.getElementById("cartCount").textContent = cart.length;
  }
  updateCartCount();

  // Slider functionality
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  setInterval(() => {
    nextBtn.click();
  }, 5000);
});

// Content-based slider logic
const contentSlides = document.querySelectorAll('.content-slide');
const contentPrevBtn = document.querySelector('.content-prev');
const contentNextBtn = document.querySelector('.content-next');
let contentCurrent = 0;

function showContentSlide(index) {
  contentSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

contentPrevBtn.addEventListener('click', () => {
  contentCurrent = (contentCurrent - 1 + contentSlides.length) % contentSlides.length;
  showContentSlide(contentCurrent);
});

contentNextBtn.addEventListener('click', () => {
  contentCurrent = (contentCurrent + 1) % contentSlides.length;
  showContentSlide(contentCurrent);
});

// Auto-switch every 5 seconds
setInterval(() => {
  contentNextBtn.click();
}, 5000);

// Carousel scroll
// let scrollAmount = 0;
// const scrollPerClick = 120;
// const carousel = document.getElementById("carousel");

// function moveCarousel(direction) {
//   scrollAmount += direction * scrollPerClick;
//   carousel.scrollTo({
//     left: scrollAmount,
//     behavior: "smooth"
//   });
// }

// Category Carousel functionality
const categoryTrack = document.getElementById('categoryTrack');
const prevCategoryBtn = document.getElementById('prevCategoryBtn');
const nextCategoryBtn = document.getElementById('nextCategoryBtn');
const scrollAmount = 350;
let scrollInterval;
let isHovered = false;
let isManuallyScrolling = false;
let manualScrollTimeout;

// Clone categories for seamless looping
categoryTrack.innerHTML += categoryTrack.innerHTML;

// Manual scroll buttons with auto-scroll pause
function manualScroll(direction) {
  stopAutoScroll();
  isManuallyScrolling = true;

  const offset = direction === 'next' ? scrollAmount : -scrollAmount;
  categoryTrack.scrollBy({ left: offset, behavior: 'smooth' });

  // Resume auto-scroll after 3 seconds of inactivity
  clearTimeout(manualScrollTimeout);
  manualScrollTimeout = setTimeout(() => {
    isManuallyScrolling = false;
    if (!isHovered) startAutoScroll();
  }, 3000);
}

prevCategoryBtn.addEventListener('click', () => manualScroll('prev'));
nextCategoryBtn.addEventListener('click', () => manualScroll('next'));

// Auto-scroll loop setup
function startAutoScroll() {
  scrollInterval = setInterval(() => {
    if (!isHovered && !isManuallyScrolling) {
      categoryTrack.scrollLeft += 1;

      // Loop effect: Reset to start when reaching cloned end
      if (categoryTrack.scrollLeft >= categoryTrack.scrollWidth / 2) {
        categoryTrack.scrollLeft = 0;
      }
    }
  }, 20); // Speed control
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
}

// Pause/resume on hover
const categories = document.querySelectorAll('.category');
categories.forEach(category => {
  category.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoScroll();
  });

  category.addEventListener('mouseleave', () => {
    isHovered = false;
    if (!isManuallyScrolling) startAutoScroll();
  });

  // Category navigation
  category.addEventListener('click', () => {
    const categoryId = category.querySelector('img').id;
    const categoryLinks = {
      men: '../HTML/men.html',
      women: '../HTML/women.html',
      kids: '../HTML/kids.html',
      jewellery: '../HTML/jewellery.html',
      shoes: '../HTML/shoes.html',
      beauty: '../HTML/beauty.html',
      decor: '../HTML/decor.html',
      home: '../HTML/home.html'
    };

    if (categoryLinks[categoryId]) {
      window.location.href = categoryLinks[categoryId];
    } else {
      console.warn('No page defined for category:', categoryId);
    }
  });
});

// Start auto-scroll on load
startAutoScroll();


document.addEventListener('DOMContentLoaded', function() {
  // Subscribe button functionality
  const subscribeBtn = document.getElementById('subscribeBtn');
  const emailInput = document.getElementById('emailSubscribe');
  
  subscribeBtn.addEventListener('click', function() {
    const email = emailInput.value.trim();
    
    if (email === '') {
      alert('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Store email in localStorage
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push(email);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Show success message
    alert('Thank you for subscribing!');
    
    // Clear the input field
    emailInput.value = '';
  });
  
  // Back to top button functionality 
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Toggle Search Box on Click
  document.getElementById("search-toggle").addEventListener("click", function (e) {
    e.preventDefault();
    const searchBox = document.getElementById("search-box");
    searchBox.style.display = (searchBox.style.display === "block") ? "none" : "block";
  });

  // Load Cart Count from Local Storage (or sessionStorage)
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cartItems.length;
  }

  // Call update on page load
  document.addEventListener("DOMContentLoaded", updateCartCount);