document.addEventListener("DOMContentLoaded", function () {
    // --- Mobile Primary Navigation Toggle System ---
    const navToggle = document.querySelector("#nav-toggle");
    const navMenu = document.querySelector("#primary-nav");
    const navLinks = document.querySelectorAll("#primary-nav a");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function (event) {
            event.preventDefault();
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", function () {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // --- Interactive Tabbed Menu Segment Swapping System ---
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-category");

    if (menuTabs.length && menuCategories.length) {
        const setActiveCategory = (targetId) => {
            menuCategories.forEach(category => {
                category.classList.toggle("active", category.id === targetId);
            });

            menuTabs.forEach(tab => {
                tab.classList.toggle("active", tab.dataset.target === targetId);
            });
        };

        menuTabs.forEach(tab => {
            tab.addEventListener("click", function (event) {
                event.preventDefault();
                setActiveCategory(tab.dataset.target);

                const menuSection = document.querySelector("#menu");
                if (menuSection) {
                    menuSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });

        const hashTarget = window.location.hash.replace("#", "");
        const matchedElement = document.getElementById(hashTarget);
        if (hashTarget && matchedElement && matchedElement.classList.contains('menu-category')) {
            setActiveCategory(hashTarget);
        } else {
            setActiveCategory("menu-antipasti");
        }
    }

    // --- Interactive Gallery Drag/Scroll Slider Swap Engine ---
    const thumbs = document.querySelectorAll(".slider-thumb");
    const featuredImg = document.querySelector("#gallery-featured-img");
    const counterText = document.querySelector("#selection-count-text");

    if (thumbs.length && featuredImg && counterText) {
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", function (e) {
                if (!this.classList.contains("active")) {
                    e.preventDefault();
                    e.stopPropagation();

                    thumbs.forEach(t => t.classList.remove("active"));
                    this.classList.add("active");

                    featuredImg.style.opacity = 0.3;
                    setTimeout(() => {
                        featuredImg.src = this.href;
                        featuredImg.alt = this.querySelector("img").alt;
                        featuredImg.style.opacity = 1;
                    }, 150);

                    const newTitle = this.getAttribute("data-title") || "Selection";
                    counterText.textContent = newTitle.split("—")[0].trim();
                }
            });
        });
    }

    // --- Cross-Device Phone Routing Call System ---
    const phoneTriggerButtons = document.querySelectorAll(".phone-click-action");
    const phoneModal = document.querySelector("#phone-modal");
    const closePhoneModalBtn = document.querySelector("#close-phone-modal");

    if (phoneTriggerButtons.length && phoneModal && closePhoneModalBtn) {

        phoneTriggerButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                const isMobileDevice = window.matchMedia("(max-width: 48rem)").matches ||
                    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

                if (!isMobileDevice) {
                    e.preventDefault();
                    phoneModal.classList.add("is-visible");
                    phoneModal.setAttribute("aria-hidden", "false");
                }
            });
        });

        closePhoneModalBtn.addEventListener("click", function () {
            phoneModal.classList.remove("is-visible");
            phoneModal.setAttribute("aria-hidden", "true");
        });

        phoneModal.addEventListener("click", function (e) {
            if (e.target === phoneModal) {
                phoneModal.classList.remove("is-visible");
                phoneModal.setAttribute("aria-hidden", "true");
            }
        });
    }
});