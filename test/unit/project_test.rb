require 'test_helper'

class ProjectTest < ActiveSupport::TestCase

  def test_access_to_metadata
    assert_equal 1, projects(:mecca).metadata.size
  end

  def test_metadata_attributes_exists
    assert projects(:mecca).respond_to?(:metadata_attributes=)
  end
end
