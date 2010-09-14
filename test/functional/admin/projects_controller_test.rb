require 'test_helper'

class Admin::ProjectsControllerTest < ActionController::TestCase
  def setup
    @project = projects(:mecca)
  end

  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:projects)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_project
    assert_difference('Project.count') do
      post :create, :project => @project.attributes
    end
    assert_not_nil assigns(:projects)
  end

  def test_should_show_project
    get :show, :id => @project.to_param
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => @project.to_param
    assert_response :success
  end

  def test_should_update_project
    put :update, :id => @project.to_param, :project => @project.attributes
    assert_not_nil assigns(:project)
  end

  def test_should_destroy_project
    assert_difference('Project.count', -1) do
      delete :destroy, :id => @project.to_param
    end

    assert_not_nil assigns(:projects)
  end
end
