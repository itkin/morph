class User < ActiveRecord::Base
  cattr_reader :per_page
  @@per_page = 10

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, #:registerable,
         :recoverable, :rememberable, :trackable#, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me

  validates_confirmation_of :password
  validates_presence_of :password_confirmation, :unless => Proc.new{ |user| user.password.blank? }

  validates_presence_of :name, :email
  validates_presence_of :password, :if => Proc.new{|user| user.new_record? }

  def self.search(params = nil)
    str = params.to_s.split(' ').map{|word| "{:name.matches => \"%#{word}%\"} | {:email.matches => \"%#{word}%\"}"}.join(' | ')
    where eval(str)
  end
end
