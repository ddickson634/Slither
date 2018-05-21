class ApplicationController < ActionController::Base
  def update_resource(object, attributes)
   object.update_attributes(attributes)
end
end
