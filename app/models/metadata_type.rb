class MetadataType < ActiveRecord::Base
  cattr_reader :per_page
  @@per_page = 10

  has_many :metadata, :class_name => "Metadata"

end
