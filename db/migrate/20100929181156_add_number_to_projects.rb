class AddNumberToProjects < ActiveRecord::Migration
  def self.up
    add_column :projects, :number, :integer
  end

  def self.down
  end
end
