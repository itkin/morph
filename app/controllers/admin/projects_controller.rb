class Admin::ProjectsController < Admin::ApplicationController

  before_filter :get_videos, :only => [:edit, :create, :new, :update]

  def get_videos
    @videos = Video.uploaded_by(Parameter::YOUTUBE_ACCOUNT.value)
  end

  def index
    @projects = Project.search(params[:search]).paginate :per_page => 4, :page => params[:page]
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
      index
      responds_to_parent { render :action => 'create.js.erb' }
    else
      responds_to_parent { render :action => 'new.js.erb' }
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update_attributes(params[:project])
      responds_to_parent { render :action => 'update.js.erb' }
    else
      responds_to_parent { render :action => 'edit.js.erb' }
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :text => nil
  end


  def reorder
    @project = Project.find(params[:id])
    @project.update_attribute(:number, params[:position])
    @projects = Project.find_all_by_id(params[:ids])
    render :json => @projects.map(&:number)
  end

end
