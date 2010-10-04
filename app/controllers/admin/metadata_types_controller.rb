class Admin::MetadataTypesController < Admin::ApplicationController

  def index
    @metadata_types = MetadataType.all
  end

  def show
    @metadata_type = MetadataType.find(params[:id])
  end

  def new
    @metadata_type = MetadataType.new
  end

  def edit
    @metadata_type = MetadataType.find(params[:id])
  end

  def create
    @metadata_type = MetadataType.new(params[:metadata_type])
    if @metadata_type.save
      index
      render :action => :create
    else
      render :action => :new
    end
  end

  def update
    @metadata_type = MetadataType.find(params[:id])
    if @metadata_type.update_attributes(params[:metadata_type])
      render :action => :update
    else
      render :action => :edit
    end
  end

  def destroy
    @metadata_type = MetadataType.find(params[:id])
    @metadata_type.destroy
    render :action => :index
  end

  def reorder
    @metadata_type = MetadataType.find(params[:id])
    @metadata_type.update_attribute(:number, params[:position])
    @metadata_types = MetadataType.find_all_by_id(params[:ids])
    render :json => @metadata_types.map(&:number)
  end

end
