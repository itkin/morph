class CreateProjects < ActiveRecord::Migration
  def self.up
    create_table :projects do |t|
      t.string :title_en
      t.string :title_fr
      t.text :description_fr
      t.text :description_en

      t.timestamps
    end
  end

  def self.down
    drop_table :projects
  end
end
