jQuery(function($) {
  $('body').on('focus', 'textarea.wiki-edit', function() {
    ensureSetup($(this));
  });

  function ensureSetup(input) {
    if (!input.data('redmineIssueAutoComplete')) {
      input.data('redmineIssueAutoComplete', true)
      setup(input);
    }
  }

  function setup(input) {
    $(input).atwho({
      at: "#",
      searchKey: 'label',
      displayTpl: '<li>${label}</li>',
      insertTpl: '#${id}',
      acceptSpaceBar: true,
      callbacks: {
        remoteFilter: fetchIssues,

        matcher: function(flag, text) {
          var match = text.match(/(^|\s)#([0-9]+|[^0-9][^#]{0,20})$/);
          return match && match[2];
        }
      }
    });
  }

  function fetchIssues(term, callback) {
    $.getJSON(
      REDMINE_INLINE_AUTO_COMPLETE_ISSUE_BASE_URL + '&term=' + term
    ).success(callback);
  }
});
