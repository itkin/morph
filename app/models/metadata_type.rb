class MetadataType < ActiveRecord::Base

  has_many :metadata, :class_name => "Metadata"

end
