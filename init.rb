require 'redmine'

Redmine::Plugin.register :redmine_inline_auto_complete do
  name 'Redmine Inline Auto Complete'
  author 'Tim Fischbach'
  description 'Auto complete issue numbers in descriptions and journal entries'
  version '0.1.0'
  url 'https://github.com/tf/redmine_inline_auto_complete'
  author_url 'https://github.com/tf'

  requires_redmine version_or_higher: '3.0'
end

require 'redmine_inline_auto_complete'
