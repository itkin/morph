class Project < ActiveRecord::Base
  cattr_reader :per_page
  @@per_page = 5

  has_many :metadata, :dependent => :destroy do
    def with_type(metadata_type)
      select{|m| m.metadata_type_id == metadata_type.id}.uniq
    end
  end

  has_many :metadata_types, :through => :metadata, :uniq => true

  accepts_nested_attributes_for :metadata, :allow_destroy => true
  validates_associated :metadata

  order_collection_by(:number, :asc)

  def self.search(params = nil)
    str = params.to_s.split(' ').map{|word| "{:title_en.matches => \"%#{word}%\"} | {:title_fr.matches => \"%#{word}%\"}"}.join(' | ')
    where eval(str)
  end

  [:image_1, :image_2].each do |attr_name|
    has_attached_file attr_name, :styles => { :small => '54x27!', :normal => "140x77!" }
  end

  [:title, :description].each do |name|
    define_method name do |*lang|
      lang = lang.first || :en
      send "#{name}_#{lang}"
    end
  end

  validates_presence_of :title_fr, :title_en

  def video
    begin
      Video.find_by_id(video_id) if video_id
    rescue
      nil
    end
  end


end