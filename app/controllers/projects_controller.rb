class ProjectsController < ApplicationController

  def index
    @projects = Project.where('').paginate :per_page => Project.per_page, :page => params[:page]
  end

end
