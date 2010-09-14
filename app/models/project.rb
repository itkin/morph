class Project < ActiveRecord::Base



  [:image_1, :image_2].each do |attr_name|
    has_attached_file attr_name, :styles => { :small => '50x50', :normal => "140x77" }
  end

  [:title, :description].each do |name|
    define_method name do |*lang|
      lang = lang.first || :en
      send "#{name}_#{lang}"
    end
  end

  has_many :metadata, :include => :metadata_type

  validates_associated :metadata
  accepts_nested_attributes_for :metadata, :allow_destroy => true



end