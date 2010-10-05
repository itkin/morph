class ProjectsController < ApplicationController

  def index
    @projects = Project.where(:online => true).paginate :per_page => Project.per_page, :page => params[:page]
  end

end
