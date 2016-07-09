require 'test_helper'

class WorksControllerTest < ActionController::TestCase
  test "should get index_music" do
    get :index_music
    assert_response :success
  end

  test "should get index_words" do
    get :index_words
    assert_response :success
  end

  test "should get index_design" do
    get :index_design
    assert_response :success
  end

end
