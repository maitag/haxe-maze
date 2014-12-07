package;

import lime.app.Application;
import lime.graphics.RenderContext;
import lime.graphics.utils.ImageCanvasUtil;


class Main extends Application {
	
	private var image:ImageExtended;

	public function new () {
		
		super ();
		
	}
	
	
	public override function init (context:RenderContext):Void {
		
		image = new ImageExtended (null, 0, 0, window.width, window.height);
		image.genMazeSimpleIter(1, 1);
		
		switch (context) {
			
			case CANVAS (context):
				
				ImageCanvasUtil.sync (image);
				context.fillStyle = "#" + StringTools.hex (config.background, 6);
				context.fillRect (0, 0, window.width, window.height);
				context.drawImage (image.src, 0, 0, image.width, image.height);
			
			case DOM (element):
				
				ImageCanvasUtil.sync (image);
				element.style.backgroundColor = "#" + StringTools.hex (config.background, 6);
				element.appendChild (image.src);
			
			case FLASH (sprite):
				
				#if flash
				var bitmap = new flash.display.Bitmap (image.src);
				sprite.addChild (bitmap);
				#end
			
			case OPENGL (gl):
				
				OpenglRender.init(gl, config.background, image, 1);
			
			default:
			
		}
		
	}
	
	public override function render (context:RenderContext):Void {
		
		switch (context) {
			
			case OPENGL (gl):
				
				OpenglRender.render(gl, window.width, window.height);
				
			default:
			
		}
		
	}
	

	
	
}