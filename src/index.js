import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core";

if ("customElements" in window) {
  require("dark-mode-toggle");
}

require("lazyload");
require("./main.scss");
require("../node_modules/bootstrap-icons/font/bootstrap-icons.css");

const tuesdays = require('./tuesdays');

document.addEventListener('DOMContentLoaded', function() {
  async function load(id, url) {
    const response = await fetch(url);
    const body = await response.text();
    document.getElementById(id).innerHTML = body;
  }

  async function loadMeetingsTab() {
    await load("meetings", "meetings.html");
    await Promise.all([load("agenda-2017-10", "agendas/2017-10.html"),
                       load("agenda-2017-11", "agendas/2017-11.html")]);
    showTab("meetings");
  }

  async function loadNewslettersAndMediaTabs() {
    // don't bother start loading this until now, but can be async
    import("lite-vimeo-embed");
    // Then, load the only files with <img class=lazyload/>
    await Promise.all([load("newsletters", "newsletters.html"),
                       load("media", "media.html")]);
    handleNewslettersSplashDiv();
    lazyload();  // Lazy Load, activate!
    showTab("media");
    // also, some old content without images
    await Promise.all([load("newsletter-2017-10", "newsletters/2017-10.html"),
                       load("newsletter-2017-11", "newsletters/2017-11.html")]);
    showTab("newsletters");
  }

  function handleNewslettersSplashDiv() {
    // There is a special recent news div in the newsletters tab.
    let splashSrc = document.querySelector('#splash_src');
    let splashExpires = Date.parse(
      splashSrc.attributes.getNamedItem('data-expires').value);
    let splashExpired = (Date.now() - splashExpires) >= 0;
    if (!splashExpired) {
      splashSrc.style.display = '';
      document.querySelector('#splash_dest').innerHTML = splashSrc.innerHTML;
    }
  }

  async function setupAboveFoldContent() {
    setUpDarkModeToggle();
    await load("home", "home.html");
    const options = {year: "numeric", month: "long", day: "numeric"};
    document.querySelector('#next-meeting-date').textContent =
      tuesdays.nextThirdTuesday().toLocaleDateString('en-US', options);
    const content = document.querySelector("#content-for-tabs");
    content.addEventListener("click", function(e) {
      var target = e.target;
        if (!target) { return; }  // if element doesn't exist
        if (target.classList.contains('switch')) {
          target.classList.forEach(function(value, key, listObj) {
            const found = value.match(/to-tab-(?<tab>\w+)/);
            if (found !== null) {
              const clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
              });
              document.querySelector(
                '#tabs-list button[data-bs-target="#' + found.groups.tab + '"]')
                .dispatchEvent(clickEvent);
            }
          });
        }
    });
    await loadAboutSection();
  }

  function setUpDarkModeToggle() {
    const toggle = document.querySelector("dark-mode-toggle");
    const body = document.body;

    // Set or remove the `dark` class the first time.
    if (toggle.mode === "dark") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }

    // Remember the user's last color scheme choice
    toggle.setAttribute("permanent", "");

    // Listen for toggle changes (which includes `prefers-color-scheme` changes)
    // and toggle the `dark` class accordingly.
    toggle.addEventListener("colorschemechange", () => {
      body.classList.toggle("dark-theme", toggle.mode === "dark");
    });
  }

  async function loadAboutSection() {
      await load("about", "about.html");
  }

  function showTab(tab_id) {
    document.getElementById(tab_id+"-tab").style.display = '';
  }

  async function loadAndShowTab(tab_id, resource) {
    await load(tab_id, resource);
    showTab(tab_id);
  }

  async function loadRestOfTabs() {
    loadAndShowTab("calendar", "calendar.html");
    loadMeetingsTab();
    loadNewslettersAndMediaTabs();
    loadAndShowTab("social", "social.html");
  }

  async function loadAllContent() {
    try {
      await setupAboveFoldContent();  // finish visible content load first
      loadRestOfTabs();
    } catch (e) {
      console.error(e);
    }
  }

  loadAllContent();
});
