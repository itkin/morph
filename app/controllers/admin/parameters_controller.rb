class Admin::ParametersController < Admin::ApplicationController

  def index
    @parameters = Parameter.search(params[:search]).paginate(:per_page =>10, :page => params[:page])
  end

  def show
    @parameter = Parameter.find(params[:id])
  end

  def new
    @parameter = Parameter.new
  end

  def edit
    @parameter = Parameter.find(params[:id])
  end

  def create
    @parameter = Parameter.new(params[:parameter])
    if @parameter.save
      flash.now[:notice] = "Parameter a été créé"
      render :action => :index
    else
      flash.now[:warning] = "Parameter n'a pas pu etre créé"
      render :action => :new
    end
  end

  def update
    @parameter = Parameter.find(params[:id])
    if @parameter.update_attributes(params[:parameter])
      flash.now[:notice] = "Parameter a été mis à jour"
      render :action => :update
    else
      flash.now[:warning] = "Parameter n'a pas pu être mis à jour"
      render :action => :edit
    end
  end

  def destroy
    @parameter = Parameter.find(params[:id])
    if @parameter.destroy
      flash.now[:notice] = "Parameter a été détruit"
      render :action => :index
    else
      flash.now[:notice] = "Parameter n'a pas pu être détruit"
      render :text => nil
    end
  end
end
