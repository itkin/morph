class ApplicationController < ActionController::Base
  layout :get_layout

  before_filter :set_locale

  protect_from_forgery

  def set_locale
    session[:locale] = I18n.locale = params[:locale] || session[:locale]
  end

  def get_layout
    if devise_controller?
      'auth'
    else
      'application'
    end
  end
end
