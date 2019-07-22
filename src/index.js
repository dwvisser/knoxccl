import $ from 'jquery';
import 'popper.js';
require('bootstrap-loader');
require('lazyload');
require('./main.css');

$( function() {

    async function loadToElement(id, url) {
        const response = await fetch(url);
        const body = await response.text();
        document.getElementById(id).innerHTML = body;
    }

    function loadMeetingsTab() {
        loadToElement('meetings', 'meetings.html').then(() => {
            loadToElement('2019-feb-forum', 'flyers/2019-Feb-Forum.html');
            loadToElement('agenda-2017-10', 'agendas/2017-10.html');
            loadToElement('agenda-2017-11', 'agendas/2017-11.html');
        });
    }

    function loadNewslettersAndPhotosTabs() {
        const newsPromise = loadToElement('newsletters', 'newsletters.html').then(
            Promise.all([loadToElement('newsletter-2017-10', 'newsletters/2017-10.html'),
                         loadToElement('newsletter-2017-11', 'newsletters/2017-11.html')]
            )
        );
        Promise.all([newsPromise,
                     loadToElement('photos', 'photos.html')]).then(function() {
            lazyload();
        });
    }

    function setupAboveFoldContent(){
        loadToElement('home', 'home.html');
        $('body').on('click', '.switch', function() {
            const match = $(this).attr('class').match(/to-tab-(\w+)/);
            if (match !== null && match.length > 1) {
            const tab = match[1];
            $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
        });
    }

    setupAboveFoldContent();
    loadToElement('about', 'about.html');
    // $('#about').load('about.html');
    loadMeetingsTab();
    loadNewslettersAndPhotosTabs();
});