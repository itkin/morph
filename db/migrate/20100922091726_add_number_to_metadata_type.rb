class AddNumberToMetadataType < ActiveRecord::Migration
  def self.up
    add_column :metadata_types, :number, :integer
    add_index :metadata_types, :number
  end

  def self.down
  end
end
