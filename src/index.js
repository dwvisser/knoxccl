import $ from 'jquery';
import 'popper.js';
require('bootstrap-loader');
require('lazyload');
require('./main.css');

$( function() {

    async function load(id, url) {
        const response = await fetch(url);
        const body = await response.text();
        document.getElementById(id).innerHTML = body;
    }

    async function loadMeetingsTab() {
        await load('meetings', 'meetings.html');
        load('2019-feb-forum', 'flyers/2019-Feb-Forum.html');
        load('agenda-2017-10', 'agendas/2017-10.html');
        load('agenda-2017-11', 'agendas/2017-11.html');
    }

    function loadNewslettersAndPhotosTabs() {
        const newsPromise = load('newsletters', 'newsletters.html').then(
            Promise.all([load('newsletter-2017-10', 'newsletters/2017-10.html'),
                         load('newsletter-2017-11', 'newsletters/2017-11.html')]
            )
        );
        Promise.all([newsPromise, load('photos', 'photos.html')]).then(() => {
            lazyload(); // don't want to pass the Promise fulfillment value into lazyload
        });
    }

    function setupAboveFoldContent(){
        load('home', 'home.html');
        $('body').on('click', '.switch', function() {
            const match = $(this).attr('class').match(/to-tab-(\w+)/);
            if (match !== null && match.length > 1) {
                const tab = match[1];
                $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
        });
    }

    setupAboveFoldContent();
    load('about', 'about.html');
    loadMeetingsTab();
    loadNewslettersAndPhotosTabs();
});