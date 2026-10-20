document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector("#nav-toggle");
    const navMenu = document.querySelector("#primary-nav");
    const navLinks = document.querySelectorAll("#primary-nav a");

    // Toggle menu on button click
    navToggle.addEventListener("click", function (event) {
        event.preventDefault();
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when any link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-category");

    if (!menuTabs.length || !menuCategories.length) {
        return;
    }

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
        });
    });

    const hashTarget = window.location.hash.replace("#", "");
    if (hashTarget && document.getElementById(hashTarget)) {
        setActiveCategory(hashTarget);
    }
});
