class PokemonsController < ApplicationController

  def create
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      Pokemon.create(trainer_id: params[:trainer_id], nickname: name, species: species)
  end

  def destroy
      Pokemon.find(params[:id]).delete
  end

end
