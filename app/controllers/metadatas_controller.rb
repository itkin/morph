class MetadatasController < ApplicationController

  def index
    @metadatas = Metadata.all
  end

  def show
    @metadata = Metadata.find(params[:id])
  end

  def new
    @metadata = Metadata.new
  end

  def edit
    @metadata = Metadata.find(params[:id])
  end

  def create
    @metadata = Metadata.new(params[:metadata])
    if @metadata.save
      render :action => :index
    else
      render :action => :new
    end
  end

  def update
    @metadata = Metadata.find(params[:id])
    if @metadata.save
      render :action => :update
    else
      render :action => :edit
    end
  end

  def destroy
    @metadata = Metadata.find(params[:id])
    @metadata.destroy
    render :action => :index
  end
end
