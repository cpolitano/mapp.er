class PinsController < ApplicationController

	def index
    @pins = Pin.all
    respond_to do |format|
        format.html
        format.json { render json: @pins }
    end    
	end

	def show
		@pin = Pin.find(params[:id])
	end

	def new
		@pin = Pin.new
	end

  def create
  		@pin = Pin.new(pin_params)
  	if @pin.save
      respond_to do |format|
      format.html { redirect_to @pin }
      format.json { render json: @pin }
      end
      redirect_to @pin, notice: 'Pin was successfully saved.'
  	else 
  	  render :new
  	end
  end

  def edit
  	@pin = Pin.find(params[:id])
  end

  def update
  	@pin = Pin.find(params[:id])
  	if @pin.update(pin_params)
  	redirect_to @pin
    else
      render 'edit'
  	end
  end

  def destroy
  	@pin = Pin.find(params[:id])
  	@pin.destroy
  	redirect_to pins_path
  end

  private

  def pin_params
  	params.require(:pin).permit(:longitude, :latitude)
  end

end