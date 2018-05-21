class Score < ApplicationRecord
  def index
        @scores = Score.all.sort_by{  |score| score.score }.reverse
    end
end
