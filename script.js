document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. THEME TOGGLE (with localStorage save) ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- 2. PROJECT FILTERING ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Active class shift
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // --- 3. CONTACT FORM VALIDATION ---
    const form = document.getElementById("contact-form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        // Simple check
        if(name.value.trim() === "") {
            document.getElementById("name-error").innerText = "Name is required";
            isValid = false;
        } else {
            document.getElementById("name-error").innerText = "";
        }

        if(!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            document.getElementById("email-error").innerText = "Enter a valid email address";
            isValid = false;
        } else {
            document.getElementById("email-error").innerText = "";
        }

        if(message.value.trim() === "") {
            document.getElementById("message-error").innerText = "Message cannot be empty";
            isValid = false;
        } else {
            document.getElementById("message-error").innerText = "";
        }

        if(isValid) {
            document.getElementById("form-success").innerText = "Thank you! Your message has been validation checked.";
            form.reset();
        }
    });

    // --- 4. SCROLL ANIMATION (Scroll reveal) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check run if sections already in view
});
