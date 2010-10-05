class AddNumberToParameters < ActiveRecord::Migration
  def self.up
    add_column :parameters, :number, :integer
  end

  def self.down
  end
end
