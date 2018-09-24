jQuery(function($) {
  $('textarea.wiki-edit').each(function() {
    $(this).atwho({
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
  });

  function fetchIssues(term, callback) {
    $.getJSON(
      REDMINE_INLINE_AUTO_COMPLETE_ISSUE_BASE_URL + '&term=' + term
    ).success(callback);
  }
});
