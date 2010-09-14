class Metadata < ActiveRecord::Base

  set_table_name 'metadata'

  belongs_to :metadata_type
  belongs_to :project


end
