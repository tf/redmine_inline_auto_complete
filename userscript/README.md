# GitLab Redmine Issue Auto Complete Userscript

Display inline auto complete suggestions for Redmine issues in GitLab
projects with linked Redmine projects.

## Requirements

* Tested with Chrome/Tampermonkey 4.7

## Installation

* Download and install
  [`gitlab_redmine_issue_auto_complete.user.js`](./gitlab_redmine_issue_auto_complete.user.js).

* Replace the example GitLab and Redmine urls.

* Ensure the Redmine integration is enabled for your project (There
  has to be a "Redmine" menu item in the GitLab project sidebar which
  links to the corresponding Redmine project).

* Ensure you are signed in to Redmine.

## Usage

Now navigate to a GitLab page with a text area that supports GitLab
friendly markdown (e.g. the description field a merge request form).

* Enter either `REDMINE-` or `r-`.

* Start typing a search string directly after the hyphen.

* Select an issue from the displayed auto complete drop down.

* The string is completed with an issue reference of the form
  `REDMINE-123`.

Suggestions are fetched via cross site XHR. Permissions of the
currently signed in Redmine user determine which available
suggestions.

GitLab also supports linking to Redmine issues with references of the
from `#123`. This is only supported, though, when GitLab issues have
been turned off. The long form is always supported. GitLab does not
care about the prefix.

Since GitLab tries (and fails) to auto complete `#` issue references
even when GitLab issues have been turned off, thie userscript only
handles the long form case.

## Troubleshooting

Check console output for warnings and errors.
