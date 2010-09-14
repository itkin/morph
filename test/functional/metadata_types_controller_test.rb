require 'test_helper'

class MetadataTypesControllerTest < ActionController::TestCase
  setup do
    @metadata_type = metadata_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:metadata_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create metadata_type" do
    assert_difference('MetadataType.count') do
      post :create, :metadata_type => @metadata_type.attributes
    end

    assert_redirected_to metadata_type_path(assigns(:metadata_type))
  end

  test "should show metadata_type" do
    get :show, :id => @metadata_type.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @metadata_type.to_param
    assert_response :success
  end

  test "should update metadata_type" do
    put :update, :id => @metadata_type.to_param, :metadata_type => @metadata_type.attributes
    assert_redirected_to metadata_type_path(assigns(:metadata_type))
  end

  test "should destroy metadata_type" do
    assert_difference('MetadataType.count', -1) do
      delete :destroy, :id => @metadata_type.to_param
    end

    assert_redirected_to metadata_types_path
  end
end
