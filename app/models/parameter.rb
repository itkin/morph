class Parameter < ActiveRecord::Base

  cache_constants :key

  order_collection_by :number

  def self.search(params = nil)
    str = params.to_s.split(' ').map{|word| "{:key.matches => \"%#{word}%\"}"}.join(' | ')
    where eval(str)
  end



end
