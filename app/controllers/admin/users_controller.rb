class Admin::UsersController < Admin::ApplicationController

  def index
    @users = User.search(params[:search])
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    params[:user].delete(:password) if params[:user][:password].blank?
    params[:user].delete(:password_confirmation) if params[:user][:password_confirmation].blank?
    @user = User.new(params[:user])
    if @user.save
      index
      render :action => :index
    else
      render :action => :new
    end
  end

  def update
    @user = User.find(params[:id])
    params[:user].delete(:password) if params[:user][:password].blank?
    params[:user].delete(:password_confirmation) if params[:user][:password_confirmation].blank?
    if @user.update_attributes(params[:user])
      render :action => :update
    else
      response.status = 208
      render :action => :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :action => :index
  end
end
