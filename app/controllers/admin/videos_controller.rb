class Admin::VideosController < Admin::ApplicationController
  include GData
  before_filter :ask_auth, :except => :authorise

  def ask_auth
    render :action => :auth_link unless session[:token]
  end

  def authorise
    client = GData::Client::DocList.new
    if params[:token]
      client.authsub_token = params[:token] # extract the single-use token from the URL query params
      session[:token] = client.auth_handler.upgrade()
      client.authsub_token = session[:token] if session[:token]
    end
    redirect_to :controller => :videos, :action => :index
  end

  def index
    @videos = Video.uploaded_by_user(:token => session[:token]).paginate(:per_page =>10, :page => params[:page])
  end

  def show
    @video = Video.find_by_id(params[:id], :token => session[:token])
  end

  def new
    @video = Video.new(:token => session[:token])
  end

  def edit
    @video = Video.find_by_id(params[:id], :token => session[:token])
  end

  def create
    @video = Video.new(params[:video])
    if @video.save
      index
      flash.now[:notice] = "Video a été créé"
      responds_to_parent {render :action => 'create.js.erb' }
    else
      flash.now[:warning] = "Video n'a pas pu etre créé"
      responds_to_parent {render :action => 'new.js.erb' }
    end
  end

  def update
    @video = Video.find_by_id(params[:id], :token => session[:token])
    if @video.update_attributes(params[:video])
      flash.now[:notice] = "Video a été mis à jour"
      responds_to_parent {render :action => 'update.js.erb' }
    else
      flash.now[:warning] = "Video n'a pas pu être mis à jour"
      responds_to_parent {render :action => 'edit.js.erb' }
    end
  end

  def destroy
    @video = Video.find_by_id(params[:id], :token => session[:token])
    if @video.destroy
      flash.now[:notice] = "Video a été détruit"
      render :text => nil
    else
      flash.now[:warning] = "Video n'a pas pu être détruit"
      render :text => nil
    end
  end
end
