class Admin::ApplicationController < ApplicationController

  before_filter :authenticate_user!

  layout :get_layout

  def get_layout
    if request.xhr?
      false
    else
      'admin'
    end
  end


end
