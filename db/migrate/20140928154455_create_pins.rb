class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
    	t.float :longitude
    	t.float :latitude
    end
  end
end
