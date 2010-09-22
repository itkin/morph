class Parameter < ActiveRecord::Base

  cache_constants :key

  def self.search(params=nil)
    where(params)
  end



end
