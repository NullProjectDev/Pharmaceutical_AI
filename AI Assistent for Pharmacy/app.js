window.onscroll = function () {
  // Get the navigation bar element
  var navbar = document.querySelector(".main-nav");

  // Check if the page has been scrolled
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    // Add the "fixed" class to the navigation bar if scrolled
    navbar.classList.add("fixed");
  } else {
    // Remove the "fixed" class if not scrolled
    navbar.classList.remove("fixed");
  }
};

function openForm() {
  // Display the registration form and hide the success message
  document.getElementById('registration-form').style.display = 'block';
  document.getElementById('success-message').style.display = 'none';
  document.querySelector('.container').classList.add('blur');
}

function closeForm() {
  // Hide the registration form and remove the blur effect
  document.getElementById('registration-form').style.display = 'none';
  document.querySelector('.container').classList.remove('blur');
}

function register() {
  // Add registration logic here
  closeForm();
  document.getElementById('success-message').style.display = 'block';
  document.querySelector('.container').classList.add('blur');
}

function closeSuccessMessage() {
  // Hide the success message and remove the blur effect
  document.getElementById('success-message').style.display = 'none';
  document.body.style.filter = 'none';
  document.querySelector('.container').classList.remove('blur');
}

// Funcția pentru comutarea între formularul de login și cel de înregistrare
function toggleFormLogin() {
  var loginForm = document.getElementById("loginForm");
  var registerForm = document.getElementById("registerForm");

  // Verifică dacă formularul de login este afișat și comută între ele
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}

// Function to close Form
function closeFormLogin() {
  var loginForm = document.getElementById("loginForm");
  var registerForm = document.getElementById("registerForm");
  
  loginForm.style.display = "none";
  registerForm.style.display = "none";
}

function showPrescription(prescriptionNumber) {
  // Show the prescription box with the given prescription number
  var prescriptionBox = document.getElementById('prescriptionBox' + prescriptionNumber);
  prescriptionBox.style.display = 'block';
}

function hidePrescription(prescriptionNumber) {
  // Hide the prescription box with the given prescription number
  var prescriptionBox = document.getElementById('prescriptionBox' + prescriptionNumber);
  prescriptionBox.style.display = 'none';
}

let currentSlideIndex = 1;

function showSlide(index) {
  // Show the specified slide
  const sliderContainer = document.getElementById("slider-container");
  const slides = document.getElementsByClassName("slider-item");
  const dots = document.querySelectorAll(".dot");
  const leftSide = document.querySelector(".left-side");

  // Remove the "active-slide" class from all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active-slide");
  }

  // Set the current slide index within bounds
  if (index > slides.length) {
    currentSlideIndex = 1;
  } else if (index < 1) {
    currentSlideIndex = slides.length;
  } else {
    currentSlideIndex = index;
  }

  const translateValue = -(currentSlideIndex - 1) * 100 + "%";
  sliderContainer.style.transition = "transform 0.5s cubic-bezier(1, 2, 2, 1)";
  sliderContainer.style.transform = "translateX(" + translateValue + ")";

  // Add the "active-slide" class to the current slide
  slides[currentSlideIndex - 1].classList.add("active-slide");

  // Change the gradient direction in JavaScript with a smooth effect and add transition
  const gradientTransition = "background 10s ease-in";
  switch (currentSlideIndex) {
    case 1:
      leftSide.style.background = "linear-gradient(to top right, #00ccff, #00fad9)";
      leftSide.style.transition = gradientTransition;
      break;
    case 2:
      leftSide.style.background = "linear-gradient(to top right, #ff9900, #ffcc00)";
      leftSide.style.transition = gradientTransition;
      break;
    case 3:
      leftSide.style.background = "linear-gradient(to top right, #2E4053, #BB8FCE)";
      leftSide.style.transition = gradientTransition;
      break;
    // Add additional cases for each slide
    default:
      break;
  }

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex + 1 === currentSlideIndex);
  });
}

function onDotClick(index) {
  // Show the slide corresponding to the clicked dot
  showSlide(index);
}

function autoSlide() {
  // Automatically show the next slide
  showSlide(currentSlideIndex + 1);
}

setInterval(autoSlide, 10000); // Change the interval to 5000 milliseconds (5 seconds)

let currentIndex = 0;

function scrollShapes(direction) {
  const container = document.querySelector('.shape-container');
  const shapes = document.querySelectorAll('.shape');
  const shapeWidth = shapes[0].offsetWidth + parseInt(getComputedStyle(shapes[0]).marginRight);
  const containerWidth = container.offsetWidth;

  // Calculate how many shapes fit in the container
  const shapesInContainer = Math.floor(containerWidth / shapeWidth);

  // Add the "hide" class to all shapes
  shapes.forEach(shape => shape.classList.add('hide'));

  // Update the index for the next transition
  if (direction === -1 && currentIndex > 0) {
    // Move the container to the left to make the previous shape visible
    currentIndex -= 1;
  } else if (direction === 1 && currentIndex < shapes.length - shapesInContainer) {
    // Move the container to the right to make the next shape visible
    currentIndex += 1;
  }

  // Remove the "hide" class for visible shapes
  for (let i = currentIndex; i < currentIndex + shapesInContainer; i++) {
    shapes[i].classList.remove('hide');
  }

  // Calculate the necessary transformation to keep shape1 on the left
  const transformValue = -currentIndex * shapeWidth;

  container.style.transform = `translateX(${transformValue}px)`;

  // Add the "static" class to shape1 to make it static
  shapes[0].classList.toggle('static', currentIndex === 0);
}
