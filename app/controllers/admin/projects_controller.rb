class Admin::ProjectsController < Admin::ApplicationController

  def index
    @projects = Project.all
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
      render :action => :index
    else
      render :action => :new
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.save
      render :action => :show
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
