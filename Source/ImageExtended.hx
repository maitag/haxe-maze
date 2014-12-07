package ;

import lime.graphics.Image;
import lime.graphics.ImageBuffer;
import lime.graphics.ImageType;

// coded by Sylvio Sell, 2014 rostock germany
// regards to all haxe, openfl lime humans
// (motivation from openfl-chat daily contest, thx alex ;)

class ImageExtended extends Image
{
	public static inline var FG_COLOR:Int = 0xff000000;
	public static inline var BG_COLOR:Int = 0xffffee00;
	

	public function new (buffer:ImageBuffer = null, offsetX:Int = 0, offsetY:Int = 0, width:Int = 0, height:Int = 0, color:Null<Int> = null, type:ImageType = null) {
		
		super (buffer, offsetX, offsetY, width, height, BG_COLOR, type);
		
	}

	
	public function genMazeSimple(x:Int, y:Int):Void {
		
		this.setPixel32(x, y, FG_COLOR);
		
		var d = [-2,0, 0,2, 2,0, 0,-2];
		while (d.length > 0)
		{
			var i = d.splice( 2 * Math.floor( Math.random() * d.length/2 ), 2);
			var a = x + i[0];
			var b = y + i[1];
			
			if (a < 0 || b < 0 || a >= this.width || b >= this.height) continue;
			if (this.getPixel32(a, b) == FG_COLOR) continue;

			if (a != x) this.setPixel32(Math.floor(x + ((a - x) / 2)), b, FG_COLOR);
			else this.setPixel32(a, Math.floor(y + ((b - y) / 2)), FG_COLOR);

			genMazeSimple(a, b);
			
		}
	}

	
	// shortened genMazeSimple function (daily contest;)
	public function gms(x,y) {
		setPixel32(x,y,FG_COLOR);
		var d=[-2,0,0,2,2,0,0,-2];
		while(d.length>0)
		{	var i=d.splice(2*Math.floor(Math.random()*d.length/2),2),a=x+i[0],b=y+i[1];
			if(a>0 && b>0 && a<width && b<height && getPixel32(a,b)!=FG_COLOR)
			{	setPixel32(a-Math.floor(i[0]/2),b-Math.floor(i[1]/2),FG_COLOR);
				gms(a,b);
			}
		}
	}

	
	// same (depth first) algorythm as iteration to avoid recursion limit
	public function genMazeSimpleIter(x:Int, y:Int):Void {
		
		var param_stack:Array<Dynamic> = [ x, y, [-2,0, 0,2, 2,0, 0,-2] ];
		var count = 0;
		var maxcount = Math.floor((this.width-((this.width % 2 == 0) ? 0 : 1))*(this.height-((this.height % 2 == 0) ? 0 : 1))/4);
		var x, y, d;

		while(param_stack.length > 0)
		{
			var d = param_stack.pop();
			var y = param_stack.pop();
			var x = param_stack.pop();
			
			if (d.length == 8) {
				this.setPixel32(x, y, FG_COLOR);
				if (++count >= maxcount) break;
			}
			
			var i = d.splice( 2 * Math.floor( Math.random() * d.length/2 ), 2);
			var a = x + i[0];
			var b = y + i[1];
				
			if (d.length > 0) {
				param_stack.push(x);
				param_stack.push(y);
				param_stack.push(d);
			}
				
			if (a>=0 && b>=0 && a<this.width && b<this.height) {
				if (this.getPixel32(a, b) != FG_COLOR) {
					if (a != x) this.setPixel32(Math.floor(x + ((a - x) / 2)), b, FG_COLOR);
					else this.setPixel32(a, Math.floor(y + ((b - y) / 2)), FG_COLOR);
					
					param_stack.push(a);
					param_stack.push(b);
					param_stack.push([-2,0, 0,2, 2,0, 0,-2]);
				}
			}	
		}
	}


}