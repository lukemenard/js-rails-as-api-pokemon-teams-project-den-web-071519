Rails.application.routes.draw do
  resources :pokemons
  resources :trainers

  # get '/trainers' => 'trainers#index'
  # get '/trainers/:id' => 'trainers#show'
  #
  # get '/pokemon' => 'pokemon#index'
  # get '/pokemon/:id' => 'pokemon#show'

end
