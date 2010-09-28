require 'test_helper'

class Admin::VideosControllerTest < ActionController::TestCase
  def setup
    @video = videos(:one)
  end

  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:videos)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_video
    assert_difference('Video.count') do
      post :create, :video => @video.attributes
    end
    assert_response :success
  end

  def test_should_show_video
    get :show, :id => @video.to_param
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => @video.to_param
    assert_response :success
  end

  def test_should_update_video
    put :update, :id => @video.to_param, :video => @video.attributes
    assert_redirected_to video_path(assigns(:video))
  end

  def test_should_destroy_video
    assert_difference('Video.count', -1) do
      delete :destroy, :id => @video.to_param
    end
    assert_response :success
  end
end
