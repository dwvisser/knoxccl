import $ from "jquery";
import "popper.js";
require("bootstrap-loader");

if ("customElements" in window) {
  require("dark-mode-toggle");
}

require("lazyload");
require("@fortawesome/fontawesome-free/css/brands.css");
require("@fortawesome/fontawesome-free/css/solid.css");
require("@fortawesome/fontawesome-free/css/fontawesome.css");
require("./main.css");

$(function() {
  async function load(id, url) {
    const response = await fetch(url);
    const body = await response.text();
    document.getElementById(id).innerHTML = body;
    $('#jq-version').text($.fn.jquery);
    $('#bs-version').text($.fn.tab.Constructor.VERSION);
  }

  async function loadMeetingsTab() {
    await load("meetings", "meetings.html");
    return Promise.all([
      load("agenda-2017-10", "agendas/2017-10.html"),
      load("agenda-2017-11", "agendas/2017-11.html")
    ]);
  }

  async function loadNewslettersTab() {
    await load("newsletters", "newsletters.html");
    return Promise.all([
      load("newsletter-2017-10", "newsletters/2017-10.html"),
      load("newsletter-2017-11", "newsletters/2017-11.html")
    ]);
  }

  async function loadNewslettersAndMediaTabs() {
    await Promise.all([loadNewslettersTab(), load("media", "media.html")]);
    lazyload();
  }

  function logError(e) {
    console.log(`Error: {e.message}`);
  }

  async function setupAboveFoldContent() {
    setUpDarkModeToggle();
    await load("home", "home.html").catch(logError);
    const options = {year: "numeric", month: "long", day: "numeric"};
    const t3 = nextThirdTuesday().toLocaleDateString('en-US', options);
    $('#next-meeting-date').text(t3);
    $("body").on("click", ".switch", function() {
      const match = $(this)
        .attr("class")
        .match(/to-tab-(\w+)/);
      if (match !== null && match.length > 1) {
        const tab = match[1];
        $('.nav-tabs a[href="#' + tab + '"]').tab("show");
      }
    });
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

  function firstTuesdayDayOfMonth(year, month) {
    const tuesday = 2;  // Date uses Sunday = 0 .. Saturday == 6
    const first_of_month_weekday = new Date(year, month, 1).getDay();
    const delta = tuesday - first_of_month_weekday;
    const offset = delta >= 0 ? 1 : 6;
    return Math.sign(delta) * delta + offset;
  }

  function thirdTuesday(year, month) {
    return new Date(year, month, firstTuesdayDayOfMonth(year, month) + 14)
  }

  function nextThirdTuesday() {
    const now = new Date(Date.now());
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const thisMonthThirdTuesday = thirdTuesday(nowYear, nowMonth);
    return now <= thisMonthThirdTuesday ? thisMonthThirdTuesday :
      nextMonthThirdTuesday(nowYear, nowMonth);
  }

  function nextMonthThirdTuesday(nowYear, nowMonth) {
    const before_december = nowMonth < 11;
    const nextYear = before_december ? nowYear : nowYear + 1;
    const nextMonth = before_december ? nowMonth + 1 : 1;
    return thirdTuesday(nextYear, nextMonth);
  }

  setupAboveFoldContent();
  load("about", "about.html").catch(logError);
  load("calendar", "calendar.html").catch(logError);
  loadMeetingsTab().catch(logError);
  loadNewslettersAndMediaTabs().catch(logError);
  load("social", "social.html").catch(logError);
});
