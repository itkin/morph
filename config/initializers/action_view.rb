class ActionView::Base
  def render_js(*agrs)
    escape_javascript render(*agrs)
  end
end