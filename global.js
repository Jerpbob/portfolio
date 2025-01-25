console.log('IT’S ALIVE!');

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
// );

// if (currentLink) {
//     currentLink.classList.add('current');
// }

const ARE_WE_HOME = document.documentElement.classList.contains('home');

let pages = [
    { url: 'portfolio', title: 'Home' },
    { url: 'portfolio/projects/', title: 'Projects' },
    { url: 'portfolio/contact/', title: 'Contact' },
    { url: 'portfolio/resume/', title: 'Resume' },
    { url: 'https://github.com/Jerpbob', title: 'Github' }
];
console.log(pages)
let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    if (!ARE_WE_HOME) {
        url = '../' + url;
        console.log("No we're not home.");
    }
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    else if (a.host !== location.host) {
        a.target = "_blank";
    }
    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select>
              <option value='light dark'>Light Dark</option>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
          </select>
      </label>`
);

let select = document.querySelector("select")

if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme
}

select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value
});

