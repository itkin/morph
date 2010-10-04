class AddVideoIdToProjects < ActiveRecord::Migration
  def self.up
    add_column :projects, :video_id, :string
  end

  def self.down
    remove_column :projects, :video_id
  end
end
