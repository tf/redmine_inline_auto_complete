module RedmineInlineAutoComplete
  class Hooks < Redmine::Hook::ViewListener
    render_on(:view_layouts_base_html_head,
              partial: 'redmine_inline_auto_complete/hooks/header')

    render_on(:view_layouts_base_body_bottom,
              partial: 'redmine_inline_auto_complete/hooks/body_bottom')
  end
end
