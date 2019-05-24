import $ from 'jquery';
import 'popper.js';
require('bootstrap-loader');
require('./main.css');

$( function() {
    function loadMeetingsTab() {
        $('#meetings').load('meetings.html');
        $('#2019-feb-forum').load('flyers/2019-Feb-Forum.html');
        $('#agenda-2017-10').load('agendas/2017-10.html');
        $('#agenda-2017-11').load('agendas/2017-11.html');
    }

    function loadNewslettersTab() {
        $('#newsletters').load('newsletters.html');
        $('#newsletter-2017-10').load('newsletters/2017-10.html');
        $('#newsletter-2017-11').load('newsletters/2017-11.html');
    }

    function setupAboveFoldContent(){
        $('#home').load('home.html');
        $('.top-bottom-links').load('top-bottom-links.html');
        $('body').on('click', '.switch', function() {
            const match = $(this).attr('class').match(/to-tab-(\w+)/);
            if (match !== null && match.length > 1) {
            const tab = match[1];
            $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
        });
    }

    setupAboveFoldContent();
    $('#about').load('about.html');
    loadMeetingsTab();
    loadNewslettersTab();
    $('#photos').load('photos.html');
});