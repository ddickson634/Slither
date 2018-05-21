Rails.application.routes.draw do
  devise_for :users
    root 'pages#index'

    get '/scores', to: 'score#all_scores'

    post '/scores', to: 'score#create'

end
