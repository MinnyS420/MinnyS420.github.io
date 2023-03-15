const menu = document.querySelector("#menu");
const btnSend = document.querySelector('.btn-send');
const recipes = document.querySelectorAll('.recipe');

menu.addEventListener("click", function (e) {
    const links = document.querySelector(".nav-links");
    links.classList.toggle("show-nav-links");
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-show");
        }
    });
});

document.querySelectorAll('.slide-in').forEach(x => observer.observe(x));

/**
 * A function that takes a
 * @param {string} category and filters the recipes on button click
 */
function filterRecipes(category) {
    recipes.forEach(recipe => {
        if (category === 'all') {
            recipe.style.display = 'block';
        } else if (recipe.classList.contains(category)) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        };
    });
};

const categories = {
    '#showAll': 'all',
    '#showMeat': 'meat',
    '#showSalad': 'salad',
    '#showAppetizer': 'appetizers',
    '#showDessert': 'dessert'
};

for (const buttonID in categories) {
    const button = document.querySelector(buttonID);
    if (button) {
        button.addEventListener('click', () => {
            filterRecipes(categories[buttonID]);
        });
    };
};

if (btnSend) {
    btnSend.addEventListener('click', function () {
        alert('Your information has been sent successfully!');
        document.querySelector('form').reset();
    });
};