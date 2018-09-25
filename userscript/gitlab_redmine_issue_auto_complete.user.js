// ==UserScript==
// @name         Gitlab Redmine Autocomplete
// @namespace    https://github.com/tf
// @version      0.1
// @description  Display auto complete suggestions for Redmine issues in Gitlab.
// @author       Tim Fischbach
// @match        https://gitlab.example.com/*
// @connect      redmine.example.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  var REDMINE_URL = 'https://redmine.example.com';

  console.log('Redmine auto complete user script active.');
  var projectSlug = getProjectSlugFromRedmineLink();

  if (!projectSlug) {
    return;
  }

  console.log('Auto complete for Redmine issues from project "' + projectSlug + '".');

  $('body').on('focus', '.js-gfm-input', function() {
    ensureSetup($(this));
  })

  function ensureSetup(input) {
    if (!input.data('redmineIssueAutoComplete')) {
      input.data('redmineIssueAutoComplete', true)
      setup(input);
    }
  }

  function setup(input) {
    ['REDMINE', 'r'].forEach(function(flag) {
      input.atwho({
        at: flag + "-",
        searchKey: 'label',
        displayTpl: '<li>${label}</li>',
        insertTpl: 'REDMINE-${id}',
        callbacks: {
          remoteFilter: fetchIssues,

          matcher: function(_, text) {
            var match = text.match(new RegExp('(?:^|\\s)' + flag + '-([0-9]+|[^0-9 ][^-]{0,20})$', 'i'));
            return match && match[1];
          }
        }
      });
    })
  }

  function getProjectSlugFromRedmineLink() {
    var trackerLink = $('a.shortcuts-external_tracker');

    if (trackerLink.text().trim() !== 'Redmine') {
      console.log('No Redmine tracker link found.');
      return;
    }

    var projectUrl = trackerLink.attr('href');
    var match = projectUrl.match(new RegExp(REDMINE_URL + '/projects/([a-z_-]+)'));

    if (!match) {
      console.warn('Expected Redmine project url of the form "' + REDMINE_URL + '/projects/<slug>". Found: "' + projectUrl +'"');
      return;
    }

    return match[1];
  }

  function fetchIssues(subject, callback) {
    var url = REDMINE_URL + '/issues/auto_complete?status=o&project_id=' + projectSlug +'&term=' + subject;

    GM_xmlhttpRequest( {
      method: 'GET',
      url: url,
      onerror: function() {
        console.error('An error occurred while fetching: ' + url);
        callback([]);
      },
      onload: function(response) {
        if (response.status !== 200) {
          console.warn('Redmine responded with ' + response.status + ': ' + url);
          callback([]);
          return;
        }

        if (response.finalUrl.indexOf(REDMINE_URL + '/login') >= 0) {
          console.warn('You need to be signed in to Redmine to retrieve auto complete suggestions.');
          callback([]);
          return;
        }
        else if (response.finalUrl != url) {
          console.warn('Unexpected redirect while retrieving Redmine auto complete suggestions.');
          callback([]);
          return;
        }

        try {
          callback(JSON.parse(response.responseText));
        }
        catch(e) {
          console.error('Redmine auto complete response could not be parsed: ', response.responseText);
        }
      }
    });
  }

})();
