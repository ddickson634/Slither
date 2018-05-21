class ScoreController < ApplicationController
  def index
  end

  def new
        @score = Score.new
    end

  def create
      @score = Score.new(score_params)
          @score.user_id = current_user.id
         if @score.save
          redirect_to scores_path
       end
end

  def show
        @score = Score.find(params[:id])
  end

  def all_scores
    @scores = Score.all.sort_by{  |score| score.score }.reverse

  end

  private

  def score_params
    params.require(:score).permit(:email, :score)
  end

end
