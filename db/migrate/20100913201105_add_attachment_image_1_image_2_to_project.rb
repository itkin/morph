class AddAttachmentImage1Image2ToProject < ActiveRecord::Migration
  def self.up
    add_column :projects, :image_1_file_name, :string
    add_column :projects, :image_1_content_type, :string
    add_column :projects, :image_1_file_size, :integer
    add_column :projects, :image_1_updated_at, :datetime
    add_column :projects, :image_2_file_name, :string
    add_column :projects, :image_2_content_type, :string
    add_column :projects, :image_2_file_size, :integer
    add_column :projects, :image_2_updated_at, :datetime
  end

  def self.down
    remove_column :projects, :image_1_file_name
    remove_column :projects, :image_1_content_type
    remove_column :projects, :image_1_file_size
    remove_column :projects, :image_1_updated_at
    remove_column :projects, :image_2_file_name
    remove_column :projects, :image_2_content_type
    remove_column :projects, :image_2_file_size
    remove_column :projects, :image_2_updated_at
  end
end
