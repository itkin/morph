require 'test_helper'

class Admin::ParametersControllerTest < ActionController::TestCase
  def setup
    @admin_parameter = admin_parameters(:one)
  end

  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_parameters)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_admin_parameter
    assert_difference('Parameter.count') do
      post :create, :admin_parameter => @admin_parameter.attributes
    end
    assert_response :success
  end

  def test_should_show_admin_parameter
    get :show, :id => @admin_parameter.to_param
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => @admin_parameter.to_param
    assert_response :success
  end

  def test_should_update_admin_parameter
    put :update, :id => @admin_parameter.to_param, :admin_parameter => @admin_parameter.attributes
    assert_redirected_to admin_parameter_path(assigns(:admin_parameter))
  end

  def test_should_destroy_admin_parameter
    assert_difference('Parameter.count', -1) do
      delete :destroy, :id => @admin_parameter.to_param
    end
    assert_response :success
  end
end
