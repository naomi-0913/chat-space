class Api::MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, :id).merge(user_id: current_user.id)
  end

end
