// Function to toggle the chat container's visibility and state
function toggleChat() {
  // Get necessary DOM elements
  const chatContainer = document.querySelector(".chat-container");
  const chatCircle = document.querySelector(".chat-circle");
  const bodyElement = document.body;

  // Toggle "active" class on the chat container and body
  chatContainer.classList.toggle("active");
  bodyElement.classList.toggle("active");

  // Adjust chat container's size and change chat circle icon based on the active state
  if (chatContainer.classList.contains("active")) {
      chatContainer.classList.add("expanded");
      chatCircle.querySelector("img").src = "/img/Down.png";
  } else {
      chatContainer.classList.remove("expanded");
      chatCircle.querySelector("img").src = "/img/Chatbot.png";
  }

  // Set a timeout to toggle the "active" class on the body after a short delay
  setTimeout(function () {
      bodyElement.classList.toggle("active");
  }, 50);
}

// Automatically toggle the chat after 10 seconds when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
      toggleChat();
  }, 10000);
});

// Function to handle sending user messages
function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");

  // Get the user's message and trim any extra whitespace
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // Create a new message element for the user's input
  const userElement = document.createElement("div");
  userElement.className = "message sent";
  userElement.textContent = userMessage;
  chatBody.appendChild(userElement);
  userInput.value = ""; // Clear the input field

  // Adjust scroll position to show the latest message
  adjustChatBodyScroll(chatBody);

  // Generate a response from the bot based on the user's message
  generateBotResponse(userMessage);
}


// Function to generate a bot response based on user input
function generateBotResponse(userMessage) {
    const chatBody = document.getElementById("chatBody");
    const botElement = document.createElement("div");
    botElement.className = "message received";

    // Define medication links for different types of pain
    const medicationLinks = {
        headache: "/index.html#medicine-section",
        stomachache: "/index.html#medicine-section",
        legPain: "/index.html#medicine-section",
        chestPain: "/index.html#medicine-section",
        handPain: "/index.html#medicine-section",
        backPain: "/index.html#medicine-section",
        eyePain: "/index.html#medicine-section",
        neckPain: "/index.html#medicine-section",
        earPain: "/index.html#medicine-section",
        genitalPain: "/index.html#medicine-section",
        jointPain: "/index.html#medicine-section",
        heartPain: "/index.html#medicine-section",
    };


    // Define keywords for different types of pain
    const lowerCaseUserMessage = userMessage.toLowerCase();
    const headacheKeywords = [
        "headache",
        "head",
        "migraine",
        "throbbing pain",
        "pounding head",
        "cephalalgia",
        "head pain",
        "tension headache",
        "cluster headache",
        "sinus headache",
        "dull ache",
        "splitting headache",
        "frontal headache",
        "occipital headache",
        "temporal headache",
        "sharp pain",
        "constant head pain",
        "persistent headache",
        "dull throbbing",
        "pressure in the head",
    ];

    const greetingKeywords = [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
    ];

    const stomachacheKeywords = [
        "stomachache",
        "stomach is aching",
        "stomach keeps hurting",
        "abdominal pain",
        "bellyache",
        "stomach",
        "cramps",
        "upset stomach",
        "indigestion",
        "gastric pain",
    ];

    const legPainKeywords = [
        "leg pain",
        "foot pain",
        "aching legs",
        "legs",
        "leg",
        "cramping legs",
        "numbness in legs",
        "tingling in legs",
        "muscle pain in legs",
    ];

    const chestPainKeywords = [
        "chest pain",
        "heart pain",
        "heartache",
        "heart",
        "chestw",
        "tightness in chest",
        "angina",
        "cardiac discomfort",
        "heart pain",
        "angina",
        "heartburn",
        "cardiac discomfort",
    ];

    const backPainKeywords = [
        "back pain",
        "lower back pain",
        "upper back pain",
        "spinal discomfort",
        "muscle strain in back",
        "dull backache",
        "sharp pain in back",
        "chronic back pain",
        "back muscle stiffness",
        "aching spine",
        "painful spine",
        "spine soreness",
        "back pain relief",
    ];

    const eyePainKeywords = [
        "eye pain",
        "ocular discomfort",
        "eye ache",
        "pain behind eyes",
        "burning eyes",
        "eyes",
        "watery eyes",
        "sensitive eyes",
        "dry eyes",
        "foreign body sensation in eyes",
        "stabbing eye pain",
        "persistent eye pain",
        "throbbing eyes",
        "pressure behind eyes",
        "light sensitivity",
        "blurred vision",
    ];

    const neckPainKeywords = [
        "neck pain",
        "throat",
        "neck",
        "cervical discomfort",
        "stiff neck",
        "sore neck",
        "pain in neck muscles",
        "neck ache",
        "throbbing neck",
        "strained neck",
        "neck stiffness",
        "aching neck",
        "sharp neck pain",
        "persistent neck pain",
        "tight neck",
        "neck muscle pain",
        "crick in the neck",
        "throat pain",
        "throat discomfort",
        "sore throat",
        "painful throat",
        "scratchy throat",
        "irritated throat",
    ];

    const earPainKeywords = [
        "ear pain",
        "earache",
        "ear discomfort",
        "pain in the ears",
        "ear pressure",
        "ringing in ears",
        "itchy ears",
        "swollen ears",
        "throbbing ears",
        "sharp ear pain",
        "dull ear pain",
        "stabbing ear pain",
        "persistent ear pain",
        "ear infection",
    ];

    const genitalPainKeywords = [
        "genital pain",
        "pelvic pain",
        "pain in genital area",
        "groin pain",
        "testicular pain",
        "vaginal pain",
        "penile pain",
        "pelvic discomfort",
        "genital soreness",
        "burning sensation in genital area",
        "genital swelling",
        "genital itching",
        "painful urination",
        "pain during intercourse",
    ];

    const jointPainKeywords = [
        "joint pain",
        "joint discomfort",
        "aching joints",
        "pain in joints",
        "stiff joints",
    ];

    // Check if user's message contains keywords for headache
    if (
        headacheKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["headache"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        // Create HTML content for the bot's response
        botElement.innerHTML = `
        <div class="medication-message">
        In case of a headache, we recommend using pill <span class="red-text">Paracetamol</span> or 
        <span class="red-text">Ibuprofen</span>.<br><br>
        Please read the instructions carefully and consult your doctor for guidance on using this medication.
        It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
        If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
        Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
        ${link.outerHTML}
        </div>
      `;
    } else if (
        stomachacheKeywords.some((keyword) =>
            lowerCaseUserMessage.includes(keyword)
        )
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["stomachache"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        botElement.innerHTML = `
      <div class="medication-message">
      In case of a stomachache, we recommend using pill 
        <span class="red-text">Omeprazol 20mg</span> 
        or 
        <span class="red-text">Imodium Instant Melts</span>.<br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.<br><br>
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.<br><br>
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        legPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["legPain"];
        link.textContent = "Learn more";
        botElement.innerHTML = `
      <div class="medication-message">
      In case of leg pain, we recommend using 
        <span class="red-text">Aleve Arthritis 220MG</span> <br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        chestPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["chestPain"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        botElement.innerHTML = `
      <div class="medication-message">
      In case of heart pain, we recommend using pill 
        <span class="red-text">Propranolol Tablets 40MG</span> 
        or 
        <span class="red-text">Nitroglycerin</span>.<br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.<br>
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.<br>
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        backPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["backPain"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        botElement.innerHTML = `
      <div class="medication-message">
      In case of back pain, we recommend using 
        <span class="red-text">Backaid Max Relief Caplets</span>.<br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        eyePainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["eyePain"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        botElement.innerHTML = `
      <div class="medication-message">
      In case of eye pain, we recommend using 
        <span class="red-text">Artificial Tears</span> 
        or 
        <span class="red-text">Antihistamine Eye Drops</span>.<br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        neckPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["neckPain"];
        link.textContent = "Learn more";
        link.classList.add("learn-more-link");
        botElement.innerHTML = `
        <div class="medication-message">
        In case of neck pain, we recommend using pill 
            <span class="red-text">Strepsils Extra</span> 
            or 
            <span class="red-text">Cepacol Lozenges</span>.<br><br>
        Please read the instructions carefully and consult your doctor for guidance on using this medication.
        It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
        If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
        Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
        ${link.outerHTML}
        </div>
        `;
    } else if (
        earPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["earPain"];
        link.classList.add("learn-more-link");
        link.textContent = "Learn more";
        botElement.innerHTML = `
      <div class="medication-message">
      In case of ear pain, we recommend using 
        <span class="red-text">Cl-ear Pain Relief Ear Drops</span> 
        or 
        <span class="red-text">Marie Originals Earache Relief Drops</span>.<br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        genitalPainKeywords.some((keyword) =>
            lowerCaseUserMessage.includes(keyword)
        )
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["genitalPain"];
        link.classList.add("learn-more-link");
        link.textContent = "Learn more";
        botElement.innerHTML = `
      <div class="medication-message">
      In case of genital pain, we recommend using 
        <span class="red-text">Genital Herpes Treatment</span> 
        or 
        <span class="red-text">Lipsore 5% Cream</span>.<br><br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br><br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br><br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        jointPainKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        const link = document.createElement("a");
        link.href = medicationLinks["jointPain"];
        link.classList.add("learn-more-link");
        link.textContent = "Learn more";
        botElement.innerHTML = `
      <div class="medication-message">
      In case of joint pain, we recommend using 
        <span class="red-text">Ibuprofen 200mg</span> 
        or 
        <span class="red-text">Feldene Melt Tablets 20mg</span>.<br>
      Please read the instructions carefully and consult your doctor for guidance on using this medication.<br>
      It's important to follow the recommended dosage and any specific instructions provided by your healthcare professional.<br>
      If you experience any adverse effects or have concerns about the medication, do not hesitate to seek medical advice.<br>
      Your health and well-being are our top priorities, and we encourage you to prioritize your safety by consulting with a healthcare professional before using any medication.<br>
      ${link.outerHTML}
    </div>
  `;
    } else if (
        greetingKeywords.some((keyword) => lowerCaseUserMessage.includes(keyword))
    ) {
        botElement.innerHTML = `
      <div class="medication-message">
      Hello! How can I assist you with medical information today?
    </div>
  `;
    }
    else {
        botElement.innerHTML = `
        <div class="apology-message">
          We apologize, but currently, we specialize in providing medical information and medication recommendations.
          How can we assist you with any medical concerns or medication advice?
          Please let us know what ails you, and we'll do our best to provide assistance.
        </div>
      `;
    }

    // Append the bot's response to the chat body
    chatBody.appendChild(botElement);
    // Adjust scroll position to show the latest message
    adjustChatBodyScroll(chatBody);
}

// Function to adjust the scroll position in the chat body
function adjustChatBodyScroll(chatBody) {
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Event listener for adjusting the input field's height as the user types
document.getElementById("userInput").addEventListener("input", function () {
  adjustInputHeight(this);
});

// Event listener for handling Enter key press to send a message
document.getElementById("userInput").addEventListener("keydown", function (event) {
  handleEnter(event);
});

// Event listener for adjusting the chat body scroll on content change
document.getElementById("chatBody").addEventListener("DOMSubtreeModified", function () {
  const chatBody = document.getElementById("chatBody");
  adjustChatBodyScroll(chatBody);
});

// Function to adjust the input field's height based on its content
function adjustInputHeight(input) {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
}

// Function to handle Enter key press in the input field
function handleEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
  }
}