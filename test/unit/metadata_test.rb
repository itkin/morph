require 'test_helper'

class MetadataTest < ActiveSupport::TestCase

  def test_irregular_plural
    assert_equal 'metadata', Metadata.table_name
  end
end
