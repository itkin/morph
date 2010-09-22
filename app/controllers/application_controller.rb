class ApplicationController < ActionController::Base
  layout :get_layout
  protect_from_forgery

  def get_layout
    if devise_controller?
      'auth'
    else
      'application'
    end
  end
end
