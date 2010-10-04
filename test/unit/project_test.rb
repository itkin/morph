require 'test_helper'

class ProjectTest < ActiveSupport::TestCase

  def test_access_to_metadata
    assert_equal 3, projects(:mecca).metadata.size
  end

  def test_metadata_attributes_exists
    assert projects(:mecca).respond_to?(:metadata_attributes=)
  end

  def test_update
    project = projects(:project_5)
    assert project.update_attribute(:number, 7)
    assert_equal 6, projects(:project_7).number
    assert_equal 8, projects(:project_8).number
  end

  def test_update_with_no_change_to_metadata
    project = projects(:mecca)
    params = {
        :id => project.id,
        :metadata_attributes => project.metadata.inject({}){|hash,m| hash.update(rand * 1000000 => m.attributes) }
    }
    assert_no_difference "Metadata.count" do
      assert_no_difference "project.metadata.size" do
        project.update_attributes(params)
      end
    end
  end
end
