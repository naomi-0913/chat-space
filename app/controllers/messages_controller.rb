class MessagesController < ApplicationController
  def index
  end

  def create
    if Message.create(message_params)
      redirect_to group_messages(@group)
    else
      render :index
    end
  end
  
  private
  def message_params
    params.require(:message).permit(:cotent, :image)
  end
end
