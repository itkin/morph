class Metadata < ActiveRecord::Base

  set_table_name 'metadata'

  delegate :name, :to => :metadata_type, :prefix => true, :allow_nil => true

  default_scope :include => :metadata_type

  belongs_to :metadata_type
  belongs_to :project


end
