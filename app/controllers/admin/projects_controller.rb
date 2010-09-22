class Admin::ProjectsController < Admin::ApplicationController

  def index
    @projects = Project.search(params[:search]).paginate :per_page =>10, :page => params[:page], :order => 'created_at DESC'
  end

  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new(:metadata => [Metadata.new])
  end

  def edit
    @project = Project.find(params[:id])
  end

  def create
    @project = Project.new(params[:project])
    if @project.save
      @projects = Project.all
      responds_to_parent{ render :action => :index }
    else
      responds_to_parent{ render :action => :new }
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update_attributes(params[:project])
      responds_to_parent{ render :action => 'update.js.erb' }
    else
      render :action => :edit
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    @projects = Project.all
    render :action => :index
  end
end
