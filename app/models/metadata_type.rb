class MetadataType < ActiveRecord::Base
  cattr_reader :per_page
  @@per_page = 10

  has_many :metadata, :class_name => "Metadata"

  order_collection_by(:number)

  validates_presence_of :name

  def self.search(params = nil)
    str = params.to_s.split(' ').map{|word| "{:name.matches => \"%#{word}%\"}"}.join(' | ')
    where eval(str)
  end

end
