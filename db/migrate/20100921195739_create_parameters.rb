class CreateParameters < ActiveRecord::Migration
  def self.up
    create_table(:parameters) do |t|
      t.string :key
      t.string :value
    end
  end

  def self.down
  end
end
