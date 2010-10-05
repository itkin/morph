class AddOnlineToProjects < ActiveRecord::Migration
  def self.up
    add_column :projects, :online, :boolean, :default => false
  end

  def self.down
  end
end
