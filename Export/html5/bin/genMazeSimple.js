(function ($hx_exports) { "use strict";
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = true;
ApplicationMain.create = function() {
	ApplicationMain.preloader = new lime.app.Preloader();
	ApplicationMain.preloader.onComplete = ApplicationMain.start;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	ApplicationMain.preloader.load(urls,types);
};
ApplicationMain.main = function() {
	ApplicationMain.config = { antialiasing : 0, background : 0, borderless : false, depthBuffer : false, fps : 0, fullscreen : false, height : 0, orientation : "", resizable : true, stencilBuffer : false, title : "genMazeSimple", vsync : false, width : 0};
};
ApplicationMain.start = function() {
	ApplicationMain.app = new Main();
	ApplicationMain.app.create(ApplicationMain.config);
	var result = ApplicationMain.app.exec();
};
var lime = {};
lime.AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime.AssetLibrary;
lime.AssetLibrary.__name__ = true;
lime.AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getImage: function(id) {
		return null;
	}
	,getPath: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function(handler) {
		handler(this);
	}
	,loadAudioBuffer: function(id,handler) {
		handler(this.getAudioBuffer(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadImage: function(id,handler) {
		handler(this.getImage(id));
	}
	,loadText: function(id,handler) {
		var callback = function(bytes) {
			if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
		};
		this.loadBytes(id,callback);
	}
	,__class__: lime.AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe.ds.StringMap();
	this.path = new haxe.ds.StringMap();
	this.className = new haxe.ds.StringMap();
	lime.AssetLibrary.call(this);
	var id;
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = true;
DefaultAssetLibrary.__super__ = lime.AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime.AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new lime.utils.ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getImage: function(id) {
		return lime.graphics.Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.images.get(key);
			return $r;
		}(this)));
	}
	,getPath: function(id) {
		return this.path.get(id);
	}
	,getText: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,list: function(type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		var items = [];
		var $it0 = this.type.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			if(requestedType == null || this.exists(id,type)) items.push(id);
		}
		return items;
	}
	,loadAudioBuffer: function(id,handler) {
		handler(this.getAudioBuffer(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadImage: function(id,handler) {
		handler(this.getImage(id));
	}
	,loadText: function(id,handler) {
		var callback = function(bytes) {
			if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
		};
		this.loadBytes(id,callback);
	}
	,__class__: DefaultAssetLibrary
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
lime.graphics = {};
lime.graphics.Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime.app.Application.__instance != null && lime.app.Application.__instance.windows != null && lime.app.Application.__instance.windows[0].currentRenderer != null) {
			var _g = lime.app.Application.__instance.windows[0].currentRenderer.context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime.graphics.ImageType.CANVAS;
				break;
			case 3:
				this.type = lime.graphics.ImageType.FLASH;
				break;
			default:
				this.type = lime.graphics.ImageType.DATA;
			}
		} else this.type = lime.graphics.ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime.graphics.ImageBuffer(null,width,height);
				lime.graphics.utils.ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime.graphics.ImageBuffer(new Uint8Array(width * height * 4),width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime.graphics.Image;
lime.graphics.Image.__name__ = true;
lime.graphics.Image.fromBase64 = function(base64,type,onload) {
	var image = new lime.graphics.Image();
	image.__fromBase64(base64,type,onload);
	return image;
};
lime.graphics.Image.fromBitmapData = function(bitmapData) {
	var buffer = new lime.graphics.ImageBuffer(null,bitmapData.width,bitmapData.height);
	buffer.__srcBitmapData = bitmapData;
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.fromBytes = function(bytes,onload) {
	var image = new lime.graphics.Image();
	image.__fromBytes(bytes,onload);
	return image;
};
lime.graphics.Image.fromCanvas = function(canvas) {
	var buffer = new lime.graphics.ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.fromFile = function(path,onload,onerror) {
	var image = new lime.graphics.Image();
	image.__fromFile(path,onload,onerror);
	return image;
};
lime.graphics.Image.fromImageElement = function(image) {
	var buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime.graphics.Image(buffer);
};
lime.graphics.Image.__base64Encode = function(bytes) {
	var extension;
	var _g = bytes.length % 3;
	switch(_g) {
	case 1:
		extension = "==";
		break;
	case 2:
		extension = "=";
		break;
	default:
		extension = "";
	}
	if(lime.graphics.Image.__base64Encoder == null) lime.graphics.Image.__base64Encoder = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString(lime.graphics.Image.__base64Chars));
	return lime.graphics.Image.__base64Encoder.encodeBytes(haxe.io.Bytes.ofData(bytes.byteView)).toString() + extension;
};
lime.graphics.Image.__isJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
};
lime.graphics.Image.__isPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
};
lime.graphics.Image.__isGIF = function(bytes) {
	bytes.position = 0;
	if(bytes.readByte() == 71 && bytes.readByte() == 73 && bytes.readByte() == 70 && bytes.readByte() == 38) {
		var b = bytes.readByte();
		return (b == 7 || b == 9) && bytes.readByte() == 97;
	}
	return false;
};
lime.graphics.Image.prototype = {
	clone: function() {
		lime.graphics.utils.ImageCanvasUtil.sync(this);
		var image = new lime.graphics.Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
		return image;
	}
	,colorTransform: function(rect,colorMatrix) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.colorTransform(rect.__toFlashRectangle(),lime.math._ColorMatrix.ColorMatrix_Impl_.__toFlashColorTransform(colorMatrix));
			break;
		default:
		}
	}
	,copyChannel: function(sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(this.buffer == null || sourceRect == null) return;
		if(destChannel == lime.graphics.ImageChannel.ALPHA && !this.get_transparent()) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 2:
			var srcChannel;
			switch(sourceChannel[1]) {
			case 0:
				srcChannel = 1;
				break;
			case 1:
				srcChannel = 2;
				break;
			case 2:
				srcChannel = 4;
				break;
			case 3:
				srcChannel = 8;
				break;
			}
			var dstChannel;
			switch(destChannel[1]) {
			case 0:
				dstChannel = 1;
				break;
			case 1:
				dstChannel = 2;
				break;
			case 2:
				dstChannel = 4;
				break;
			case 3:
				dstChannel = 8;
				break;
			}
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.copyChannel(sourceImage.buffer.get_src(),sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),srcChannel,dstChannel);
			break;
		default:
		}
	}
	,copyPixels: function(sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(this.buffer == null || sourceImage == null) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageCanvasUtil.convertToData(sourceImage);
			lime.graphics.utils.ImageDataUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 2:
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			if(alphaImage != null && alphaPoint != null) alphaPoint.offset(alphaImage.offsetX,alphaImage.offsetY);
			this.buffer.__srcBitmapData.copyPixels(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),alphaImage != null?alphaImage.buffer.get_src():null,alphaPoint != null?alphaPoint.__toFlashPoint():null,mergeAlpha);
			break;
		default:
		}
	}
	,encode: function(format,quality) {
		if(quality == null) quality = 90;
		if(format == null) format = "png";
		return null;
	}
	,fillRect: function(rect,color) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.fillRect(this,rect,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.fillRect(this,rect,color);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),color);
			break;
		default:
		}
	}
	,floodFill: function(x,y,color) {
		if(this.buffer == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.floodFill(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.floodFill(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.floodFill(x + this.offsetX,y + this.offsetY,color);
			break;
		default:
		}
	}
	,getPixel: function(x,y) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixel(this,x,y);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixel(this,x,y);
		case 2:
			return this.buffer.__srcBitmapData.getPixel(x + this.offsetX,y + this.offsetY);
		default:
			return 0;
		}
	}
	,getPixel32: function(x,y) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixel32(this,x,y);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixel32(this,x,y);
		case 2:
			return this.buffer.__srcBitmapData.getPixel32(x + this.offsetX,y + this.offsetY);
		default:
			return 0;
		}
	}
	,getPixels: function(rect) {
		if(this.buffer == null) return null;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime.graphics.utils.ImageCanvasUtil.getPixels(this,rect);
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			return lime.graphics.utils.ImageDataUtil.getPixels(this,rect);
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			return this.buffer.__srcBitmapData.getPixels(rect.__toFlashRectangle());
		default:
			return null;
		}
	}
	,resize: function(newWidth,newHeight) {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.resize(this,newWidth,newHeight);
			break;
		case 1:
			lime.graphics.utils.ImageDataUtil.resize(this,newWidth,newHeight);
			break;
		case 2:
			break;
		default:
		}
		this.buffer.width = newWidth;
		this.buffer.height = newHeight;
		this.offsetX = 0;
		this.offsetY = 0;
		this.width = newWidth;
		this.height = newHeight;
	}
	,setPixel: function(x,y,color) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixel(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixel(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.setPixel(x + this.offsetX,y + this.offsetX,color);
			break;
		default:
		}
	}
	,setPixel32: function(x,y,color) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixel32(this,x,y,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixel32(this,x,y,color);
			break;
		case 2:
			this.buffer.__srcBitmapData.setPixel32(x + this.offsetX,y + this.offsetY,color);
			break;
		default:
		}
	}
	,setPixels: function(rect,byteArray) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.setPixels(this,rect,byteArray);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.setPixels(this,rect,byteArray);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.setPixels(rect.__toFlashRectangle(),byteArray);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromBase64: function(base64,type,onload) {
		var _g = this;
		var image = new Image();
		var image_onLoaded = function(event) {
			_g.buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.offsetX = 0;
			_g.offsetY = 0;
			_g.width = _g.buffer.width;
			_g.height = _g.buffer.height;
			if(onload != null) onload(_g);
		};
		image.addEventListener("load",image_onLoaded,false);
		image.src = "data:" + type + ";base64," + base64;
	}
	,__fromBytes: function(bytes,onload) {
		var type = "";
		if(lime.graphics.Image.__isPNG(bytes)) type = "image/png"; else if(lime.graphics.Image.__isJPG(bytes)) type = "image/jpeg"; else if(lime.graphics.Image.__isGIF(bytes)) type = "image/gif"; else throw "Image tried to read a PNG/JPG ByteArray, but found an invalid header.";
		this.__fromBase64(lime.graphics.Image.__base64Encode(bytes),type,onload);
	}
	,__fromFile: function(path,onload,onerror) {
		var _g = this;
		var image = new Image();
		image.onload = function(_) {
			_g.buffer = new lime.graphics.ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.width = image.width;
			_g.height = image.height;
			if(onload != null) onload(_g);
		};
		image.onerror = function(_1) {
			if(onerror != null) onerror();
		};
		image.src = path;
		if(image.complete) {
		}
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == 0) this.width = buffer.width;
			if(this.height == 0) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this);
			lime.graphics.utils.ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,set_data: function(value) {
		return this.buffer.data = value;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,set_powerOfTwo: function(value) {
		if(value != this.get_powerOfTwo()) {
			var newWidth = 1;
			var newHeight = 1;
			while(newWidth < this.buffer.width) newWidth <<= 1;
			while(newHeight < this.buffer.height) newHeight <<= 1;
			var _g = this.type;
			switch(_g[1]) {
			case 0:
				break;
			case 1:
				lime.graphics.utils.ImageDataUtil.resizeBuffer(this,newWidth,newHeight);
				break;
			case 2:
				break;
			default:
			}
		}
		return value;
	}
	,get_premultiplied: function() {
		return this.buffer.premultiplied;
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_rect: function() {
		return new lime.math.Rectangle(0,0,this.width,this.height);
	}
	,get_src: function() {
		return this.buffer.get_src();
	}
	,set_src: function(value) {
		return this.buffer.set_src(value);
	}
	,get_transparent: function() {
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		return this.buffer.transparent = value;
	}
	,__class__: lime.graphics.Image
};
var ImageExtended = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	lime.graphics.Image.call(this,buffer,offsetX,offsetY,width,height,-4608,type);
};
$hxClasses["ImageExtended"] = ImageExtended;
ImageExtended.__name__ = true;
ImageExtended.__super__ = lime.graphics.Image;
ImageExtended.prototype = $extend(lime.graphics.Image.prototype,{
	genMazeSimple: function(x,y) {
		this.setPixel32(x,y,-16777216);
		var d = [-2,0,0,2,2,0,0,-2];
		while(d.length > 0) {
			var i = d.splice(2 * Math.floor(Math.random() * d.length / 2),2);
			var a = x + i[0];
			var b = y + i[1];
			if(a < 0 || b < 0 || a >= this.width || b >= this.height) continue;
			if(this.getPixel32(a,b) == -16777216) continue;
			if(a != x) this.setPixel32(Math.floor(x + (a - x) / 2),b,-16777216); else this.setPixel32(a,Math.floor(y + (b - y) / 2),-16777216);
			this.genMazeSimple(a,b);
		}
	}
	,gms: function(x,y) {
		this.setPixel32(x,y,-16777216);
		var d = [-2,0,0,2,2,0,0,-2];
		while(d.length > 0) {
			var i = d.splice(2 * Math.floor(Math.random() * d.length / 2),2);
			var a = x + i[0];
			var b = y + i[1];
			if(a > 0 && b > 0 && a < this.width && b < this.height && this.getPixel32(a,b) != -16777216) {
				this.setPixel32(a - Math.floor(i[0] / 2),b - Math.floor(i[1] / 2),-16777216);
				this.gms(a,b);
			}
		}
	}
	,genMazeSimpleIter: function(x,y) {
		var param_stack = [x,y,[-2,0,0,2,2,0,0,-2]];
		var count = 0;
		var maxcount = Math.floor((this.width - (this.width % 2 == 0?0:1)) * (this.height - (this.height % 2 == 0?0:1)) / 4);
		var x1;
		var y1;
		var d;
		while(param_stack.length > 0) {
			var d1 = param_stack.pop();
			var y2 = param_stack.pop();
			var x2 = param_stack.pop();
			if(d1.length == 8) {
				this.setPixel32(x2,y2,-16777216);
				if(++count >= maxcount) break;
			}
			var i = d1.splice(2 * Math.floor(Math.random() * d1.length / 2),2);
			var a = x2 + i[0];
			var b = y2 + i[1];
			if(d1.length > 0) {
				param_stack.push(x2);
				param_stack.push(y2);
				param_stack.push(d1);
			}
			if(a >= 0 && b >= 0 && a < this.width && b < this.height) {
				if(this.getPixel32(a,b) != -16777216) {
					if(a != x2) this.setPixel32(Math.floor(x2 + (a - x2) / 2),b,-16777216); else this.setPixel32(a,Math.floor(y2 + (b - y2) / 2),-16777216);
					param_stack.push(a);
					param_stack.push(b);
					param_stack.push([-2,0,0,2,2,0,0,-2]);
				}
			}
		}
	}
	,__class__: ImageExtended
});
lime.app = {};
lime.app.Module = function() {
};
$hxClasses["lime.app.Module"] = lime.app.Module;
lime.app.Module.__name__ = true;
lime.app.Module.prototype = {
	__class__: lime.app.Module
};
lime.app._Application = {};
lime.app._Application.UpdateEventInfo = function(type,deltaTime) {
	if(deltaTime == null) deltaTime = 0;
	this.type = type;
	this.deltaTime = deltaTime;
};
$hxClasses["lime.app._Application.UpdateEventInfo"] = lime.app._Application.UpdateEventInfo;
lime.app._Application.UpdateEventInfo.__name__ = true;
lime.app._Application.UpdateEventInfo.prototype = {
	clone: function() {
		return new lime.app._Application.UpdateEventInfo(this.type,this.deltaTime);
	}
	,__class__: lime.app._Application.UpdateEventInfo
};
lime.app.Event = function() {
	this.listeners = new Array();
	this.priorities = new Array();
	this.repeat = new Array();
};
$hxClasses["lime.app.Event"] = lime.app.Event;
lime.app.Event.__name__ = true;
lime.app.Event.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.priorities[i]) {
				this.listeners.splice(i,0,listener);
				this.priorities.splice(i,0,priority);
				this.repeat.splice(i,0,!once);
				return;
			}
		}
		this.listeners.push(listener);
		this.priorities.push(priority);
		this.repeat.push(!once);
	}
	,remove: function(listener) {
		var index = HxOverrides.indexOf(this.listeners,listener,0);
		if(index > -1) {
			this.listeners.splice(index,1);
			this.priorities.splice(index,1);
			this.repeat.splice(index,1);
		}
	}
	,__class__: lime.app.Event
};
lime.app.Application = function() {
	lime.app.Module.call(this);
	lime.app.Application.__instance = this;
	this.windows = new Array();
	if(!lime.app.Application.__registered) {
		lime.app.Application.__registered = true;
		lime.audio.AudioManager.init();
	}
};
$hxClasses["lime.app.Application"] = lime.app.Application;
lime.app.Application.__name__ = true;
lime.app.Application.__dispatch = function() {
	lime.app.Application.__instance.update(lime.app.Application.__eventInfo.deltaTime);
	var listeners = lime.app.Application.onUpdate.listeners;
	var repeat = lime.app.Application.onUpdate.repeat;
	var length = listeners.length;
	var i = 0;
	while(i < length) {
		listeners[i](lime.app.Application.__eventInfo.deltaTime);
		if(!repeat[i]) {
			lime.app.Application.onUpdate.remove(listeners[i]);
			length--;
		} else i++;
	}
};
lime.app.Application.__super__ = lime.app.Module;
lime.app.Application.prototype = $extend(lime.app.Module.prototype,{
	addWindow: function(window) {
		this.windows.push(window);
		window.create(this);
	}
	,create: function(config) {
		this.config = config;
		lime.ui.KeyEventManager.create();
		lime.ui.MouseEventManager.create();
		lime.ui.TouchEventManager.create();
		lime.ui.KeyEventManager.onKeyDown.add($bind(this,this.onKeyDown));
		lime.ui.KeyEventManager.onKeyUp.add($bind(this,this.onKeyUp));
		lime.ui.MouseEventManager.onMouseDown.add($bind(this,this.onMouseDown));
		lime.ui.MouseEventManager.onMouseMove.add($bind(this,this.onMouseMove));
		lime.ui.MouseEventManager.onMouseUp.add($bind(this,this.onMouseUp));
		lime.ui.MouseEventManager.onMouseWheel.add($bind(this,this.onMouseWheel));
		lime.ui.TouchEventManager.onTouchStart.add($bind(this,this.onTouchStart));
		lime.ui.TouchEventManager.onTouchMove.add($bind(this,this.onTouchMove));
		lime.ui.TouchEventManager.onTouchEnd.add($bind(this,this.onTouchEnd));
		lime.graphics.Renderer.onRenderContextLost.add($bind(this,this.onRenderContextLost));
		lime.graphics.Renderer.onRenderContextRestored.add($bind(this,this.onRenderContextRestored));
		lime.ui.Window.onWindowActivate.add($bind(this,this.onWindowActivate));
		lime.ui.Window.onWindowClose.add($bind(this,this.onWindowClose));
		lime.ui.Window.onWindowDeactivate.add($bind(this,this.onWindowDeactivate));
		lime.ui.Window.onWindowFocusIn.add($bind(this,this.onWindowFocusIn));
		lime.ui.Window.onWindowFocusOut.add($bind(this,this.onWindowFocusOut));
		lime.ui.Window.onWindowMove.add($bind(this,this.onWindowMove));
		lime.ui.Window.onWindowResize.add($bind(this,this.onWindowResize));
		var $window = new lime.ui.Window(config);
		var renderer = new lime.graphics.Renderer($window);
		$window.width = config.width;
		$window.height = config.height;
		$window.element = config.element;
		this.addWindow($window);
	}
	,exec: function() {
		
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.__triggerFrame();
		return 0;
	}
	,init: function(context) {
	}
	,onKeyDown: function(keyCode,modifier) {
	}
	,onKeyUp: function(keyCode,modifier) {
	}
	,onMouseDown: function(x,y,button) {
	}
	,onMouseMove: function(x,y,button) {
	}
	,onMouseUp: function(x,y,button) {
	}
	,onMouseWheel: function(deltaX,deltaY) {
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTouchEnd: function(x,y,id) {
	}
	,onTouchMove: function(x,y,id) {
	}
	,onTouchStart: function(x,y,id) {
	}
	,onWindowActivate: function() {
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
	}
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,__triggerFrame: function(_) {
		lime.app.Application.__eventInfo.deltaTime = 16;
		lime.app.Application.__dispatch();
		lime.graphics.Renderer.render();
		window.requestAnimationFrame($bind(this,this.__triggerFrame));
	}
	,get_window: function() {
		return this.windows[0];
	}
	,__class__: lime.app.Application
});
var Main = function() {
	lime.app.Application.call(this);
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.__super__ = lime.app.Application;
Main.prototype = $extend(lime.app.Application.prototype,{
	init: function(context) {
		this.image = new ImageExtended(null,0,0,this.windows[0].width,this.windows[0].height);
		this.image.genMazeSimpleIter(1,1);
		switch(context[1]) {
		case 1:
			var context1 = context[2];
			lime.graphics.utils.ImageCanvasUtil.sync(this.image);
			context1.fillStyle = "#" + StringTools.hex(this.config.background,6);
			context1.fillRect(0,0,this.windows[0].width,this.windows[0].height);
			context1.drawImage(this.image.get_src(),0,0,this.image.width,this.image.height);
			break;
		case 2:
			var element = context[2];
			lime.graphics.utils.ImageCanvasUtil.sync(this.image);
			element.style.backgroundColor = "#" + StringTools.hex(this.config.background,6);
			element.appendChild(this.image.get_src());
			break;
		case 3:
			var sprite = context[2];
			break;
		case 0:
			var gl = context[2];
			OpenglRender.init(gl,this.config.background,this.image,1);
			break;
		default:
		}
	}
	,render: function(context) {
		switch(context[1]) {
		case 0:
			var gl = context[2];
			OpenglRender.render(gl,this.windows[0].width,this.windows[0].height);
			break;
		default:
		}
	}
	,__class__: Main
});
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
Math.__name__ = true;
var OpenglRender = function() {
	haxe.Log.trace("static class for Lime OpenGL Rendering",{ fileName : "OpenglRender.hx", lineNumber : 31, className : "OpenglRender", methodName : "new"});
};
$hxClasses["OpenglRender"] = OpenglRender;
OpenglRender.__name__ = true;
OpenglRender.init = function(gl,background,image,scale) {
	OpenglRender.r = (background >> 16 & 255) / 255;
	OpenglRender.g = (background >> 8 & 255) / 255;
	OpenglRender.b = (background & 255) / 255;
	OpenglRender.a = (background >> 24 & 255) / 255;
	var vertexSource = "attribute vec4 aPosition;\r\n\t\t\tattribute vec2 aTexCoord;\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\t\r\n\t\t\tuniform mat4 uMatrix;\r\n\t\t\t\r\n\t\t\tvoid main(void) {\r\n\t\t\t\t\r\n\t\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\tgl_Position = uMatrix * aPosition;\r\n\t\t\t\t\r\n\t\t\t}";
	var fragmentSource = "precision mediump float;" + "varying vec2 vTexCoord;\r\n\t\t\tuniform sampler2D uImage0;\r\n\t\t\t\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = texture2D (uImage0, vTexCoord);\r\n\t\t\t}";
	OpenglRender.program = lime.utils.GLUtils.createProgram(vertexSource,fragmentSource);
	gl.useProgram(OpenglRender.program);
	OpenglRender.vertexAttribute = gl.getAttribLocation(OpenglRender.program,"aPosition");
	OpenglRender.textureAttribute = gl.getAttribLocation(OpenglRender.program,"aTexCoord");
	OpenglRender.matrixUniform = gl.getUniformLocation(OpenglRender.program,"uMatrix");
	var imageUniform = gl.getUniformLocation(OpenglRender.program,"uImage0");
	gl.enableVertexAttribArray(OpenglRender.vertexAttribute);
	gl.enableVertexAttribArray(OpenglRender.textureAttribute);
	gl.uniform1i(imageUniform,0);
	var data = [image.width * scale,image.height * scale,0,1,1,0,image.height * scale,0,0,1,image.width * scale,0,0,1,0,0,0,0,0,0];
	OpenglRender.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,OpenglRender.buffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	OpenglRender.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,OpenglRender.texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,image.buffer.width,image.buffer.height,0,gl.RGBA,gl.UNSIGNED_BYTE,image.get_data());
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D,null);
};
OpenglRender.changeTextureData = function(gl,image) {
	gl.bindTexture(gl.TEXTURE_2D,OpenglRender.texture);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,image.buffer.width,image.buffer.height,0,gl.RGBA,gl.UNSIGNED_BYTE,image.get_data());
};
OpenglRender.render = function(gl,width,height) {
	gl.viewport(0,0,width,height);
	gl.clearColor(OpenglRender.r,OpenglRender.g,OpenglRender.b,OpenglRender.a);
	gl.clear(gl.COLOR_BUFFER_BIT);
	var matrix = lime.math._Matrix4.Matrix4_Impl_.createOrtho(0,width,height,0,-1000,1000);
	gl.uniformMatrix4fv(OpenglRender.matrixUniform,false,matrix);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D,OpenglRender.texture);
	gl.bindBuffer(gl.ARRAY_BUFFER,OpenglRender.buffer);
	gl.vertexAttribPointer(OpenglRender.vertexAttribute,3,gl.FLOAT,false,20,0);
	gl.vertexAttribPointer(OpenglRender.textureAttribute,2,gl.FLOAT,false,20,12);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
OpenglRender.prototype = {
	__class__: OpenglRender
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
var haxe = {};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.crypto = {};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = true;
haxe.crypto.BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = true;
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; return $x; };
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
};
js.Boot.isClass = function(o) {
	return o.__name__;
};
js.Boot.isEnum = function(e) {
	return e.__ename__;
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = true;
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
lime.AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe.ds.StringMap();
	this.font = new haxe.ds.StringMap();
	this.image = new haxe.ds.StringMap();
};
$hxClasses["lime.AssetCache"] = lime.AssetCache;
lime.AssetCache.__name__ = true;
lime.AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe.ds.StringMap();
			this.font = new haxe.ds.StringMap();
			this.image = new haxe.ds.StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime.AssetCache
};
lime.Assets = function() { };
$hxClasses["lime.Assets"] = lime.Assets;
lime.Assets.__name__ = true;
lime.Assets.exists = function(id,type) {
	lime.Assets.initialize();
	if(type == null) type = "BINARY";
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
};
lime.Assets.getAudioBuffer = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.audio.exists(id)) {
		var audio = lime.Assets.cache.audio.get(id);
		if(lime.Assets.isValidAudio(audio)) return audio;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(library.isLocal(symbolName,"SOUND")) {
				var audio1 = library.getAudioBuffer(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.audio.set(id,audio1);
				return audio1;
			} else haxe.Log.trace("[Assets] Audio asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 115, className : "lime.Assets", methodName : "getAudioBuffer"});
		} else haxe.Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 121, className : "lime.Assets", methodName : "getAudioBuffer"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 127, className : "lime.Assets", methodName : "getAudioBuffer"});
	return null;
};
lime.Assets.getBytes = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			if(library.isLocal(symbolName,"BINARY")) return library.getBytes(symbolName); else haxe.Log.trace("[Assets] String or ByteArray asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 164, className : "lime.Assets", methodName : "getBytes"});
		} else haxe.Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 170, className : "lime.Assets", methodName : "getBytes"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 176, className : "lime.Assets", methodName : "getBytes"});
	return null;
};
lime.Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.font.exists(id)) return lime.Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"FONT")) {
			if(library.isLocal(symbolName,"FONT")) {
				var font = library.getFont(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.font.set(id,font);
				return font;
			} else haxe.Log.trace("[Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 227, className : "lime.Assets", methodName : "getFont"});
		} else haxe.Log.trace("[Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 233, className : "lime.Assets", methodName : "getFont"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 239, className : "lime.Assets", methodName : "getFont"});
	return null;
};
lime.Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.image.exists(id)) {
		var image = lime.Assets.cache.image.get(id);
		if(lime.Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime.Assets.cache.enabled) lime.Assets.cache.image.set(id,image1);
				return image1;
			} else haxe.Log.trace("[Assets] Image asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 297, className : "lime.Assets", methodName : "getImage"});
		} else haxe.Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 303, className : "lime.Assets", methodName : "getImage"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 309, className : "lime.Assets", methodName : "getImage"});
	return null;
};
lime.Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime.Assets.libraries.get(name);
};
lime.Assets.getPath = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe.Log.trace("[Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 426, className : "lime.Assets", methodName : "getPath"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 432, className : "lime.Assets", methodName : "getPath"});
	return null;
};
lime.Assets.getText = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else haxe.Log.trace("[Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 469, className : "lime.Assets", methodName : "getText"});
		} else haxe.Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 475, className : "lime.Assets", methodName : "getText"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 481, className : "lime.Assets", methodName : "getText"});
	return null;
};
lime.Assets.initialize = function() {
	if(!lime.Assets.initialized) {
		lime.Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime.Assets.initialized = true;
	}
};
lime.Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled) {
		if(type == "IMAGE" || type == null) {
			if(lime.Assets.cache.image.exists(id)) return true;
		}
		if(type == "FONT" || type == null) {
			if(lime.Assets.cache.font.exists(id)) return true;
		}
		if(type == "SOUND" || type == "MUSIC" || type == null) {
			if(lime.Assets.cache.audio.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
};
lime.Assets.isValidAudio = function(buffer) {
	return buffer != null;
	return true;
};
lime.Assets.isValidImage = function(buffer) {
	return true;
};
lime.Assets.list = function(type) {
	lime.Assets.initialize();
	var items = [];
	var $it0 = lime.Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var libraryItems = library.list(type);
		if(libraryItems != null) items = items.concat(libraryItems);
	}
	return items;
};
lime.Assets.loadAudioBuffer = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.audio.exists(id)) {
		var audio = lime.Assets.cache.audio.get(id);
		if(lime.Assets.isValidAudio(audio)) {
			handler(audio);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(useCache && lime.Assets.cache.enabled) library.loadAudioBuffer(symbolName,function(audio1) {
				var value = audio1;
				lime.Assets.cache.audio.set(id,value);
				handler(audio1);
			}); else library.loadAudioBuffer(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 666, className : "lime.Assets", methodName : "loadAudioBuffer"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 672, className : "lime.Assets", methodName : "loadAudioBuffer"});
	handler(null);
};
lime.Assets.loadBytes = function(id,handler) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			library.loadBytes(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 702, className : "lime.Assets", methodName : "loadBytes"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 708, className : "lime.Assets", methodName : "loadBytes"});
	handler(null);
};
lime.Assets.loadImage = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	lime.Assets.initialize();
	if(useCache && lime.Assets.cache.enabled && lime.Assets.cache.image.exists(id)) {
		var image = lime.Assets.cache.image.get(id);
		if(lime.Assets.isValidImage(image)) {
			handler(image);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(useCache && lime.Assets.cache.enabled) library.loadImage(symbolName,function(image1) {
				lime.Assets.cache.image.set(id,image1);
				handler(image1);
			}); else library.loadImage(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 765, className : "lime.Assets", methodName : "loadImage"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 771, className : "lime.Assets", methodName : "loadImage"});
	handler(null);
};
lime.Assets.loadLibrary = function(name,handler) {
	lime.Assets.initialize();
	var data = lime.Assets.getText("libraries/" + name + ".json");
	if(data != null && data != "") {
		var info = JSON.parse(data);
		var library = Type.createInstance(Type.resolveClass(info.type),info.args);
		lime.Assets.libraries.set(name,library);
		library.eventCallback = lime.Assets.library_onEvent;
		library.load(handler);
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + name + "\"",{ fileName : "Assets.hx", lineNumber : 800, className : "lime.Assets", methodName : "loadLibrary"});
};
lime.Assets.loadText = function(id,handler) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			library.loadText(symbolName,handler);
			return;
		} else haxe.Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 891, className : "lime.Assets", methodName : "loadText"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 897, className : "lime.Assets", methodName : "loadText"});
	handler(null);
};
lime.Assets.registerLibrary = function(name,library) {
	if(lime.Assets.libraries.exists(name)) lime.Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime.Assets.library_onEvent;
	lime.Assets.libraries.set(name,library);
};
lime.Assets.unloadLibrary = function(name) {
	lime.Assets.initialize();
	var library = lime.Assets.libraries.get(name);
	if(library != null) {
		lime.Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	lime.Assets.libraries.remove(name);
};
lime.Assets.library_onEvent = function(library,type) {
	if(type == "change") lime.Assets.cache.clear();
};
lime._Assets = {};
lime._Assets.AssetType_Impl_ = function() { };
$hxClasses["lime._Assets.AssetType_Impl_"] = lime._Assets.AssetType_Impl_;
lime._Assets.AssetType_Impl_.__name__ = true;
lime.app._Application.UpdateEventType_Impl_ = function() { };
$hxClasses["lime.app._Application.UpdateEventType_Impl_"] = lime.app._Application.UpdateEventType_Impl_;
lime.app._Application.UpdateEventType_Impl_.__name__ = true;
lime.app.Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime.app.Preloader;
lime.app.Preloader.__name__ = true;
lime.app.Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				var image = new Image();
				lime.app.Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime.net.URLLoader();
				loader.set_dataFormat(lime.net.URLLoaderDataFormat.BINARY);
				lime.app.Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime.net.URLLoader();
				lime.app.Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime.app.Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime.app.Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime.net.URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		var node = window.document.createElement("span");
		node.innerHTML = "giItT1WQy@!-/#";
		var style = node.style;
		style.position = "absolute";
		style.left = "-10000px";
		style.top = "-10000px";
		style.fontSize = "300px";
		style.fontFamily = "sans-serif";
		style.fontVariant = "normal";
		style.fontStyle = "normal";
		style.fontWeight = "normal";
		style.letterSpacing = "0";
		window.document.body.appendChild(node);
		var width = node.offsetWidth;
		style.fontFamily = "'" + font + "'";
		var interval = null;
		var found = false;
		var checkFont = function() {
			if(node.offsetWidth != width) {
				if(!found) {
					found = true;
					return false;
				}
				_g.loaded++;
				if(interval != null) window.clearInterval(interval);
				node.parentNode.removeChild(node);
				node = null;
				_g.update(_g.loaded,_g.total);
				if(_g.loaded == _g.total) _g.start();
				return true;
			}
			return false;
		};
		if(!checkFont()) interval = window.setInterval(checkFont,50);
	}
	,start: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(loader) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime.app.Preloader
};
lime.audio = {};
lime.audio.ALAudioContext = function() {
	this.EXPONENT_DISTANCE_CLAMPED = 53254;
	this.EXPONENT_DISTANCE = 53253;
	this.LINEAR_DISTANCE_CLAMPED = 53252;
	this.LINEAR_DISTANCE = 53251;
	this.INVERSE_DISTANCE_CLAMPED = 53250;
	this.INVERSE_DISTANCE = 53249;
	this.DISTANCE_MODEL = 53248;
	this.DOPPLER_VELOCITY = 49153;
	this.SPEED_OF_SOUND = 49155;
	this.DOPPLER_FACTOR = 49152;
	this.EXTENSIONS = 45060;
	this.RENDERER = 45059;
	this.VERSION = 45058;
	this.VENDOR = 45057;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_OPERATION = 40964;
	this.INVALID_VALUE = 40963;
	this.INVALID_ENUM = 40962;
	this.INVALID_NAME = 40961;
	this.NO_ERROR = 0;
	this.SIZE = 8196;
	this.CHANNELS = 8195;
	this.BITS = 8194;
	this.FREQUENCY = 8193;
	this.FORMAT_STEREO16 = 4355;
	this.FORMAT_STEREO8 = 4354;
	this.FORMAT_MONO16 = 4353;
	this.FORMAT_MONO8 = 4352;
	this.UNDETERMINED = 4144;
	this.STREAMING = 4137;
	this.STATIC = 4136;
	this.SOURCE_TYPE = 4135;
	this.BYTE_OFFSET = 4134;
	this.SAMPLE_OFFSET = 4133;
	this.SEC_OFFSET = 4132;
	this.MAX_DISTANCE = 4131;
	this.CONE_OUTER_GAIN = 4130;
	this.ROLLOFF_FACTOR = 4129;
	this.REFERENCE_DISTANCE = 4128;
	this.BUFFERS_PROCESSED = 4118;
	this.BUFFERS_QUEUED = 4117;
	this.STOPPED = 4116;
	this.PAUSED = 4115;
	this.PLAYING = 4114;
	this.INITIAL = 4113;
	this.SOURCE_STATE = 4112;
	this.ORIENTATION = 4111;
	this.MAX_GAIN = 4110;
	this.MIN_GAIN = 4109;
	this.GAIN = 4106;
	this.BUFFER = 4105;
	this.LOOPING = 4103;
	this.VELOCITY = 4102;
	this.DIRECTION = 4101;
	this.POSITION = 4100;
	this.PITCH = 4099;
	this.CONE_OUTER_ANGLE = 4098;
	this.CONE_INNER_ANGLE = 4097;
	this.SOURCE_RELATIVE = 514;
	this.TRUE = 1;
	this.FALSE = 0;
	this.NONE = 0;
};
$hxClasses["lime.audio.ALAudioContext"] = lime.audio.ALAudioContext;
lime.audio.ALAudioContext.__name__ = true;
lime.audio.ALAudioContext.prototype = {
	bufferData: function(buffer,format,data,size,freq) {
		lime.audio.openal.AL.bufferData(buffer,format,data,size,freq);
	}
	,buffer3f: function(buffer,param,value1,value2,value3) {
		lime.audio.openal.AL.buffer3f(buffer,param,value1,value2,value3);
	}
	,buffer3i: function(buffer,param,value1,value2,value3) {
		lime.audio.openal.AL.buffer3i(buffer,param,value1,value2,value3);
	}
	,bufferf: function(buffer,param,value) {
		lime.audio.openal.AL.bufferf(buffer,param,value);
	}
	,bufferfv: function(buffer,param,values) {
		lime.audio.openal.AL.bufferfv(buffer,param,values);
	}
	,bufferi: function(buffer,param,value) {
		lime.audio.openal.AL.bufferi(buffer,param,value);
	}
	,bufferiv: function(buffer,param,values) {
		lime.audio.openal.AL.bufferiv(buffer,param,values);
	}
	,deleteBuffer: function(buffer) {
		lime.audio.openal.AL.deleteBuffer(buffer);
	}
	,deleteBuffers: function(buffers) {
		lime.audio.openal.AL.deleteBuffers(buffers);
	}
	,deleteSource: function(source) {
		lime.audio.openal.AL.deleteSource(source);
	}
	,deleteSources: function(sources) {
		lime.audio.openal.AL.deleteSources(sources);
	}
	,disable: function(capability) {
		lime.audio.openal.AL.disable(capability);
	}
	,distanceModel: function(distanceModel) {
		lime.audio.openal.AL.distanceModel(distanceModel);
	}
	,dopplerFactor: function(value) {
		lime.audio.openal.AL.dopplerFactor(value);
	}
	,dopplerVelocity: function(value) {
		lime.audio.openal.AL.dopplerVelocity(value);
	}
	,enable: function(capability) {
		lime.audio.openal.AL.enable(capability);
	}
	,genSource: function() {
		return lime.audio.openal.AL.genSource();
	}
	,genSources: function(n) {
		return lime.audio.openal.AL.genSources(n);
	}
	,genBuffer: function() {
		return lime.audio.openal.AL.genBuffer();
	}
	,genBuffers: function(n) {
		return lime.audio.openal.AL.genBuffers(n);
	}
	,getBoolean: function(param) {
		return lime.audio.openal.AL.getBoolean(param);
	}
	,getBooleanv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBooleanv(param,count);
	}
	,getBuffer3f: function(buffer,param) {
		return lime.audio.openal.AL.getBuffer3f(buffer,param);
	}
	,getBuffer3i: function(buffer,param) {
		return lime.audio.openal.AL.getBuffer3i(buffer,param);
	}
	,getBufferf: function(buffer,param) {
		return lime.audio.openal.AL.getBufferf(buffer,param);
	}
	,getBufferfv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBufferfv(buffer,param,count);
	}
	,getBufferi: function(buffer,param) {
		return lime.audio.openal.AL.getBufferi(buffer,param);
	}
	,getBufferiv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getBufferiv(buffer,param,count);
	}
	,getDouble: function(param) {
		return lime.audio.openal.AL.getDouble(param);
	}
	,getDoublev: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getDoublev(param,count);
	}
	,getEnumValue: function(ename) {
		return lime.audio.openal.AL.getEnumValue(ename);
	}
	,getError: function() {
		return lime.audio.openal.AL.getError();
	}
	,getErrorString: function() {
		return lime.audio.openal.AL.getErrorString();
	}
	,getFloat: function(param) {
		return lime.audio.openal.AL.getFloat(param);
	}
	,getFloatv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getFloatv(param,count);
	}
	,getInteger: function(param) {
		return lime.audio.openal.AL.getInteger(param);
	}
	,getIntegerv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getIntegerv(param,count);
	}
	,getListener3f: function(param) {
		return lime.audio.openal.AL.getListener3f(param);
	}
	,getListener3i: function(param) {
		return lime.audio.openal.AL.getListener3i(param);
	}
	,getListenerf: function(param) {
		return lime.audio.openal.AL.getListenerf(param);
	}
	,getListenerfv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getListenerfv(param,count);
	}
	,getListeneri: function(param) {
		return lime.audio.openal.AL.getListeneri(param);
	}
	,getListeneriv: function(param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getListeneriv(param,count);
	}
	,getProcAddress: function(fname) {
		return lime.audio.openal.AL.getProcAddress(fname);
	}
	,getSource3f: function(source,param) {
		return lime.audio.openal.AL.getSource3f(source,param);
	}
	,getSourcef: function(source,param) {
		return lime.audio.openal.AL.getSourcef(source,param);
	}
	,getSource3i: function(source,param) {
		return lime.audio.openal.AL.getSource3i(source,param);
	}
	,getSourcefv: function(source,param) {
		return lime.audio.openal.AL.getSourcefv(source,param);
	}
	,getSourcei: function(source,param) {
		return lime.audio.openal.AL.getSourcei(source,param);
	}
	,getSourceiv: function(source,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.AL.getSourceiv(source,param,count);
	}
	,getString: function(param) {
		return lime.audio.openal.AL.getString(param);
	}
	,isBuffer: function(buffer) {
		return lime.audio.openal.AL.isBuffer(buffer);
	}
	,isEnabled: function(capability) {
		return lime.audio.openal.AL.isEnabled(capability);
	}
	,isExtensionPresent: function(extname) {
		return lime.audio.openal.AL.isExtensionPresent(extname);
	}
	,isSource: function(source) {
		return lime.audio.openal.AL.isSource(source);
	}
	,listener3f: function(param,value1,value2,value3) {
		lime.audio.openal.AL.listener3f(param,value1,value2,value3);
	}
	,listener3i: function(param,value1,value2,value3) {
		lime.audio.openal.AL.listener3i(param,value1,value2,value3);
	}
	,listenerf: function(param,value) {
		lime.audio.openal.AL.listenerf(param,value);
	}
	,listenerfv: function(param,values) {
		lime.audio.openal.AL.listenerfv(param,values);
	}
	,listeneri: function(param,value) {
		lime.audio.openal.AL.listeneri(param,value);
	}
	,listeneriv: function(param,values) {
		lime.audio.openal.AL.listeneriv(param,values);
	}
	,source3f: function(source,param,value1,value2,value3) {
		lime.audio.openal.AL.source3f(source,param,value1,value2,value3);
	}
	,source3i: function(source,param,value1,value2,value3) {
		lime.audio.openal.AL.source3i(source,param,value1,value2,value3);
	}
	,sourcef: function(source,param,value) {
		lime.audio.openal.AL.sourcef(source,param,value);
	}
	,sourcefv: function(source,param,values) {
		lime.audio.openal.AL.sourcefv(source,param,values);
	}
	,sourcei: function(source,param,value) {
		lime.audio.openal.AL.sourcei(source,param,value);
	}
	,sourceiv: function(source,param,values) {
		lime.audio.openal.AL.sourceiv(source,param,values);
	}
	,sourcePlay: function(source) {
		lime.audio.openal.AL.sourcePlay(source);
	}
	,sourcePlayv: function(sources) {
		lime.audio.openal.AL.sourcePlayv(sources);
	}
	,sourceStop: function(source) {
		lime.audio.openal.AL.sourceStop(source);
	}
	,sourceStopv: function(sources) {
		lime.audio.openal.AL.sourceStopv(sources);
	}
	,sourceRewind: function(source) {
		lime.audio.openal.AL.sourceRewind(source);
	}
	,sourceRewindv: function(sources) {
		lime.audio.openal.AL.sourceRewindv(sources);
	}
	,sourcePause: function(source) {
		lime.audio.openal.AL.sourcePause(source);
	}
	,sourcePausev: function(sources) {
		lime.audio.openal.AL.sourcePausev(sources);
	}
	,sourceQueueBuffer: function(source,buffer) {
		lime.audio.openal.AL.sourceQueueBuffer(source,buffer);
	}
	,sourceQueueBuffers: function(source,nb,buffers) {
		lime.audio.openal.AL.sourceQueueBuffers(source,nb,buffers);
	}
	,sourceUnqueueBuffer: function(source) {
		return lime.audio.openal.AL.sourceUnqueueBuffer(source);
	}
	,sourceUnqueueBuffers: function(source,nb) {
		return lime.audio.openal.AL.sourceUnqueueBuffers(source,nb);
	}
	,speedOfSound: function(value) {
		lime.audio.openal.AL.speedOfSound(value);
	}
	,__class__: lime.audio.ALAudioContext
};
lime.audio.ALCAudioContext = function() {
	this.ALL_DEVICES_SPECIFIER = 4115;
	this.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
	this.ENUMERATE_ALL_EXT = 1;
	this.EXTENSIONS = 4102;
	this.DEVICE_SPECIFIER = 4101;
	this.DEFAULT_DEVICE_SPECIFIER = 4100;
	this.ALL_ATTRIBUTES = 4099;
	this.ATTRIBUTES_SIZE = 4098;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_VALUE = 40964;
	this.INVALID_ENUM = 40963;
	this.INVALID_CONTEXT = 40962;
	this.INVALID_DEVICE = 40961;
	this.NO_ERROR = 0;
	this.STEREO_SOURCES = 4113;
	this.MONO_SOURCES = 4112;
	this.SYNC = 4105;
	this.REFRESH = 4104;
	this.FREQUENCY = 4103;
	this.TRUE = 1;
	this.FALSE = 0;
};
$hxClasses["lime.audio.ALCAudioContext"] = lime.audio.ALCAudioContext;
lime.audio.ALCAudioContext.__name__ = true;
lime.audio.ALCAudioContext.prototype = {
	closeDevice: function(device) {
		return lime.audio.openal.ALC.closeDevice(device);
	}
	,createContext: function(device,attrlist) {
		return lime.audio.openal.ALC.createContext(device,attrlist);
	}
	,destroyContext: function(context) {
		lime.audio.openal.ALC.destroyContext(context);
	}
	,getContextsDevice: function(context) {
		return lime.audio.openal.ALC.getContextsDevice(context);
	}
	,getCurrentContext: function() {
		return lime.audio.openal.ALC.getCurrentContext();
	}
	,getError: function(device) {
		return lime.audio.openal.ALC.getError(device);
	}
	,getErrorString: function(device) {
		return lime.audio.openal.ALC.getErrorString(device);
	}
	,getIntegerv: function(device,param,count) {
		if(count == null) count = 1;
		return lime.audio.openal.ALC.getIntegerv(device,param,count);
	}
	,getString: function(device,param) {
		return lime.audio.openal.ALC.getString(device,param);
	}
	,makeContextCurrent: function(context) {
		return lime.audio.openal.ALC.makeContextCurrent(context);
	}
	,openDevice: function(deviceName) {
		return lime.audio.openal.ALC.openDevice(deviceName);
	}
	,processContext: function(context) {
		lime.audio.openal.ALC.processContext(context);
	}
	,suspendContext: function(context) {
		lime.audio.openal.ALC.suspendContext(context);
	}
	,__class__: lime.audio.ALCAudioContext
};
lime.audio.AudioBuffer = function() {
	this.id = 0;
};
$hxClasses["lime.audio.AudioBuffer"] = lime.audio.AudioBuffer;
lime.audio.AudioBuffer.__name__ = true;
lime.audio.AudioBuffer.fromBytes = function(bytes) {
	return null;
};
lime.audio.AudioBuffer.fromFile = function(path) {
	return null;
};
lime.audio.AudioBuffer.fromURL = function(url,handler) {
};
lime.audio.AudioBuffer.prototype = {
	dispose: function() {
	}
	,__class__: lime.audio.AudioBuffer
};
lime.audio.AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime.audio.AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime.audio.AudioContext; return $x; };
lime.audio.AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime.audio.AudioContext; return $x; };
lime.audio.AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime.audio.AudioContext; return $x; };
lime.audio.AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime.audio.AudioContext; return $x; };
lime.audio.AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime.audio.AudioContext; return $x; };
lime.audio.AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime.audio.AudioManager;
lime.audio.AudioManager.__name__ = true;
lime.audio.AudioManager.init = function(context) {
	if(context == null) try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;;
		lime.audio.AudioManager.context = lime.audio.AudioContext.WEB(new AudioContext ());
	} catch( e ) {
		lime.audio.AudioManager.context = lime.audio.AudioContext.HTML5(new lime.audio.HTML5AudioContext());
	} else lime.audio.AudioManager.context = context;
};
lime.audio.AudioManager.resume = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.processContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
lime.audio.AudioManager.shutdown = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			var currentContext = alc.getCurrentContext();
			if(currentContext != null) {
				var device = alc.getContextsDevice(currentContext);
				alc.makeContextCurrent(null);
				alc.destroyContext(currentContext);
				alc.closeDevice(device);
			}
			break;
		default:
		}
	}
};
lime.audio.AudioManager.suspend = function() {
	if(lime.audio.AudioManager.context != null) {
		var _g = lime.audio.AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.suspendContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
lime.audio.FlashAudioContext = function() {
};
$hxClasses["lime.audio.FlashAudioContext"] = lime.audio.FlashAudioContext;
lime.audio.FlashAudioContext.__name__ = true;
lime.audio.FlashAudioContext.prototype = {
	createBuffer: function(stream,context) {
		return null;
	}
	,getBytesLoaded: function(buffer) {
		return 0;
	}
	,getBytesTotal: function(buffer) {
		return 0;
	}
	,getID3: function(buffer) {
		return null;
	}
	,getIsBuffering: function(buffer) {
		return false;
	}
	,getIsURLInaccessible: function(buffer) {
		return false;
	}
	,getLength: function(buffer) {
		return 0;
	}
	,getURL: function(buffer) {
		return null;
	}
	,close: function(buffer) {
	}
	,extract: function(buffer,target,length,startPosition) {
		if(startPosition == null) startPosition = -1;
		return 0;
	}
	,load: function(buffer,stream,context) {
	}
	,loadCompressedDataFromByteArray: function(buffer,bytes,bytesLength) {
	}
	,loadPCMFromByteArray: function(buffer,bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
	}
	,play: function(buffer,startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0;
		return null;
	}
	,__class__: lime.audio.FlashAudioContext
};
lime.audio.HTML5AudioContext = function() {
	this.NETWORK_NO_SOURCE = 3;
	this.NETWORK_LOADING = 2;
	this.NETWORK_IDLE = 1;
	this.NETWORK_EMPTY = 0;
	this.HAVE_NOTHING = 0;
	this.HAVE_METADATA = 1;
	this.HAVE_FUTURE_DATA = 3;
	this.HAVE_ENOUGH_DATA = 4;
	this.HAVE_CURRENT_DATA = 2;
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime.audio.HTML5AudioContext;
lime.audio.HTML5AudioContext.__name__ = true;
lime.audio.HTML5AudioContext.prototype = {
	canPlayType: function(buffer,type) {
		if(buffer.src != null) return buffer.src.canPlayType(type);
		return null;
	}
	,createBuffer: function(urlString) {
		var buffer = new lime.audio.AudioBuffer();
		buffer.src = new Audio();
		buffer.src.src = urlString;
		return buffer;
	}
	,getAudioDecodedByteCount: function(buffer) {
		if(buffer.src != null) return buffer.src.audioDecodedByteCount;
		return 0;
	}
	,getAutoplay: function(buffer) {
		if(buffer.src != null) return buffer.src.autoplay;
		return false;
	}
	,getBuffered: function(buffer) {
		if(buffer.src != null) return buffer.src.buffered;
		return null;
	}
	,getController: function(buffer) {
		if(buffer.src != null) return buffer.src.controller;
		return null;
	}
	,getCurrentSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.currentSrc;
		return null;
	}
	,getCurrentTime: function(buffer) {
		if(buffer.src != null) return buffer.src.currentTime;
		return 0;
	}
	,getDefaultPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.defaultPlaybackRate;
		return 1;
	}
	,getDuration: function(buffer) {
		if(buffer.src != null) return buffer.src.duration;
		return 0;
	}
	,getEnded: function(buffer) {
		if(buffer.src != null) return buffer.src.ended;
		return false;
	}
	,getError: function(buffer) {
		if(buffer.src != null) return buffer.src.error;
		return null;
	}
	,getInitialTime: function(buffer) {
		if(buffer.src != null) return buffer.src.initialTime;
		return 0;
	}
	,getLoop: function(buffer) {
		if(buffer.src != null) return buffer.src.loop;
		return false;
	}
	,getMediaGroup: function(buffer) {
		if(buffer.src != null) return buffer.src.mediaGroup;
		return null;
	}
	,getMuted: function(buffer) {
		if(buffer.src != null) return buffer.src.muted;
		return false;
	}
	,getNetworkState: function(buffer) {
		if(buffer.src != null) return buffer.src.networkState;
		return 0;
	}
	,getPaused: function(buffer) {
		if(buffer.src != null) return buffer.src.paused;
		return false;
	}
	,getPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 1;
	}
	,getPlayed: function(buffer) {
		if(buffer.src != null) return buffer.src.played;
		return null;
	}
	,getPreload: function(buffer) {
		if(buffer.src != null) return buffer.src.preload;
		return null;
	}
	,getReadyState: function(buffer) {
		if(buffer.src != null) return buffer.src.readyState;
		return 0;
	}
	,getSeekable: function(buffer) {
		if(buffer.src != null) return buffer.src.seekable;
		return null;
	}
	,getSeeking: function(buffer) {
		if(buffer.src != null) return buffer.src.seeking;
		return false;
	}
	,getSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.src;
		return null;
	}
	,getStartTime: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 0;
	}
	,getVolume: function(buffer) {
		if(buffer.src != null) return buffer.src.volume;
		return 1;
	}
	,load: function(buffer) {
		if(buffer.src != null) return buffer.src.load();
	}
	,pause: function(buffer) {
		if(buffer.src != null) return buffer.src.pause();
	}
	,play: function(buffer) {
		if(buffer.src != null) return buffer.src.play();
	}
	,setAutoplay: function(buffer,value) {
		if(buffer.src != null) buffer.src.autoplay = value;
	}
	,setController: function(buffer,value) {
		if(buffer.src != null) buffer.src.controller = value;
	}
	,setCurrentTime: function(buffer,value) {
		if(buffer.src != null) buffer.src.currentTime = value;
	}
	,setDefaultPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.defaultPlaybackRate = value;
	}
	,setLoop: function(buffer,value) {
		if(buffer.src != null) buffer.src.loop = value;
	}
	,setMediaGroup: function(buffer,value) {
		if(buffer.src != null) buffer.src.mediaGroup = value;
	}
	,setMuted: function(buffer,value) {
		if(buffer.src != null) buffer.src.muted = value;
	}
	,setPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.playbackRate = value;
	}
	,setPreload: function(buffer,value) {
		if(buffer.src != null) buffer.src.preload = value;
	}
	,setSrc: function(buffer,value) {
		if(buffer.src != null) buffer.src.src = value;
	}
	,setVolume: function(buffer,value) {
		if(buffer.src != null) buffer.src.volume = value;
	}
	,__class__: lime.audio.HTML5AudioContext
};
lime.audio.openal = {};
lime.audio.openal.AL = function() { };
$hxClasses["lime.audio.openal.AL"] = lime.audio.openal.AL;
lime.audio.openal.AL.__name__ = true;
lime.audio.openal.AL.bufferData = function(buffer,format,data,size,freq) {
};
lime.audio.openal.AL.buffer3f = function(buffer,param,value1,value2,value3) {
};
lime.audio.openal.AL.buffer3i = function(buffer,param,value1,value2,value3) {
};
lime.audio.openal.AL.bufferf = function(buffer,param,value) {
};
lime.audio.openal.AL.bufferfv = function(buffer,param,values) {
};
lime.audio.openal.AL.bufferi = function(buffer,param,value) {
};
lime.audio.openal.AL.bufferiv = function(buffer,param,values) {
};
lime.audio.openal.AL.deleteBuffer = function(buffer) {
};
lime.audio.openal.AL.deleteBuffers = function(buffers) {
};
lime.audio.openal.AL.deleteSource = function(source) {
};
lime.audio.openal.AL.deleteSources = function(sources) {
};
lime.audio.openal.AL.disable = function(capability) {
};
lime.audio.openal.AL.distanceModel = function(distanceModel) {
};
lime.audio.openal.AL.dopplerFactor = function(value) {
};
lime.audio.openal.AL.dopplerVelocity = function(value) {
};
lime.audio.openal.AL.enable = function(capability) {
};
lime.audio.openal.AL.genSource = function() {
	return 0;
};
lime.audio.openal.AL.genSources = function(n) {
	return null;
};
lime.audio.openal.AL.genBuffer = function() {
	return 0;
};
lime.audio.openal.AL.genBuffers = function(n) {
	return null;
};
lime.audio.openal.AL.getBoolean = function(param) {
	return false;
};
lime.audio.openal.AL.getBooleanv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getBuffer3f = function(buffer,param) {
	return null;
};
lime.audio.openal.AL.getBuffer3i = function(buffer,param) {
	return null;
};
lime.audio.openal.AL.getBufferf = function(buffer,param) {
	return 0;
};
lime.audio.openal.AL.getBufferfv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getBufferi = function(buffer,param) {
	return 0;
};
lime.audio.openal.AL.getBufferiv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getDouble = function(param) {
	return 0;
};
lime.audio.openal.AL.getDoublev = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getEnumValue = function(ename) {
	return 0;
};
lime.audio.openal.AL.getError = function() {
	return 0;
};
lime.audio.openal.AL.getErrorString = function() {
	var _g = lime.audio.openal.AL.getError();
	switch(_g) {
	case 40961:
		return "INVALID_NAME: Invalid parameter name";
	case 40962:
		return "INVALID_ENUM: Invalid enum value";
	case 40963:
		return "INVALID_VALUE: Invalid parameter value";
	case 40964:
		return "INVALID_OPERATION: Illegal operation or call";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime.audio.openal.AL.getFloat = function(param) {
	return 0;
};
lime.audio.openal.AL.getFloatv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getInteger = function(param) {
	return 0;
};
lime.audio.openal.AL.getIntegerv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getListener3f = function(param) {
	return null;
};
lime.audio.openal.AL.getListener3i = function(param) {
	return null;
};
lime.audio.openal.AL.getListenerf = function(param) {
	return 0;
};
lime.audio.openal.AL.getListenerfv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getListeneri = function(param) {
	return 0;
};
lime.audio.openal.AL.getListeneriv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getProcAddress = function(fname) {
	return null;
};
lime.audio.openal.AL.getSource3f = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcef = function(source,param) {
	return 0;
};
lime.audio.openal.AL.getSource3i = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcefv = function(source,param) {
	return null;
};
lime.audio.openal.AL.getSourcei = function(source,param) {
	return 0;
};
lime.audio.openal.AL.getSourceiv = function(source,param,count) {
	if(count == null) count = 1;
	return null;
};
lime.audio.openal.AL.getString = function(param) {
	return null;
};
lime.audio.openal.AL.isBuffer = function(buffer) {
	return false;
};
lime.audio.openal.AL.isEnabled = function(capability) {
	return false;
};
lime.audio.openal.AL.isExtensionPresent = function(extname) {
	return false;
};
lime.audio.openal.AL.isSource = function(source) {
	return false;
};
lime.audio.openal.AL.listener3f = function(param,value1,value2,value3) {
};
lime.audio.openal.AL.listener3i = function(param,value1,value2,value3) {
};
lime.audio.openal.AL.listenerf = function(param,value) {
};
lime.audio.openal.AL.listenerfv = function(param,values) {
};
lime.audio.openal.AL.listeneri = function(param,value) {
};
lime.audio.openal.AL.listeneriv = function(param,values) {
};
lime.audio.openal.AL.source3f = function(source,param,value1,value2,value3) {
};
lime.audio.openal.AL.source3i = function(source,param,value1,value2,value3) {
};
lime.audio.openal.AL.sourcef = function(source,param,value) {
};
lime.audio.openal.AL.sourcefv = function(source,param,values) {
};
lime.audio.openal.AL.sourcei = function(source,param,value) {
};
lime.audio.openal.AL.sourceiv = function(source,param,values) {
};
lime.audio.openal.AL.sourcePlay = function(source) {
};
lime.audio.openal.AL.sourcePlayv = function(sources) {
};
lime.audio.openal.AL.sourceStop = function(source) {
};
lime.audio.openal.AL.sourceStopv = function(sources) {
};
lime.audio.openal.AL.sourceRewind = function(source) {
};
lime.audio.openal.AL.sourceRewindv = function(sources) {
};
lime.audio.openal.AL.sourcePause = function(source) {
};
lime.audio.openal.AL.sourcePausev = function(sources) {
};
lime.audio.openal.AL.sourceQueueBuffer = function(source,buffer) {
};
lime.audio.openal.AL.sourceQueueBuffers = function(source,nb,buffers) {
};
lime.audio.openal.AL.sourceUnqueueBuffer = function(source) {
	return 0;
};
lime.audio.openal.AL.sourceUnqueueBuffers = function(source,nb) {
	return null;
};
lime.audio.openal.AL.speedOfSound = function(value) {
};
lime.audio.openal.ALC = function() { };
$hxClasses["lime.audio.openal.ALC"] = lime.audio.openal.ALC;
lime.audio.openal.ALC.__name__ = true;
lime.audio.openal.ALC.closeDevice = function(device) {
	return false;
};
lime.audio.openal.ALC.createContext = function(device,attrlist) {
	return null;
};
lime.audio.openal.ALC.destroyContext = function(context) {
};
lime.audio.openal.ALC.getContextsDevice = function(context) {
	return null;
};
lime.audio.openal.ALC.getCurrentContext = function() {
	return null;
};
lime.audio.openal.ALC.getError = function(device) {
	return 0;
};
lime.audio.openal.ALC.getErrorString = function(device) {
	var _g = lime.audio.openal.ALC.getError(device);
	switch(_g) {
	case 40961:
		return "INVALID_DEVICE: Invalid device (or no device?)";
	case 40962:
		return "INVALID_CONTEXT: Invalid context (or no context?)";
	case 40963:
		return "INVALID_ENUM: Invalid enum value";
	case 40964:
		return "INVALID_VALUE: Invalid param value";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime.audio.openal.ALC.getIntegerv = function(device,param,size) {
	return null;
};
lime.audio.openal.ALC.getString = function(device,param) {
	return null;
};
lime.audio.openal.ALC.makeContextCurrent = function(context) {
	return false;
};
lime.audio.openal.ALC.openDevice = function(deviceName) {
	return null;
};
lime.audio.openal.ALC.processContext = function(context) {
};
lime.audio.openal.ALC.suspendContext = function(context) {
};
lime.audio.openal._ALContext = {};
lime.audio.openal._ALContext.ALContext_Impl_ = function() { };
$hxClasses["lime.audio.openal._ALContext.ALContext_Impl_"] = lime.audio.openal._ALContext.ALContext_Impl_;
lime.audio.openal._ALContext.ALContext_Impl_.__name__ = true;
lime.audio.openal._ALContext.ALContext_Impl_._new = function(handle) {
	return handle;
};
lime.audio.openal._ALDevice = {};
lime.audio.openal._ALDevice.ALDevice_Impl_ = function() { };
$hxClasses["lime.audio.openal._ALDevice.ALDevice_Impl_"] = lime.audio.openal._ALDevice.ALDevice_Impl_;
lime.audio.openal._ALDevice.ALDevice_Impl_.__name__ = true;
lime.audio.openal._ALDevice.ALDevice_Impl_._new = function(handle) {
	return handle;
};
lime.graphics.FlashRenderContext = function() {
};
$hxClasses["lime.graphics.FlashRenderContext"] = lime.graphics.FlashRenderContext;
lime.graphics.FlashRenderContext.__name__ = true;
lime.graphics.FlashRenderContext.prototype = {
	addChild: function(child) {
		return null;
	}
	,addChildAt: function(child,index) {
		return null;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		return false;
	}
	,dispatchEvent: function(event) {
		return false;
	}
	,getBounds: function(targetCoordinateSpace) {
		return null;
	}
	,getChildAt: function(index) {
		return null;
	}
	,getChildByName: function(name) {
		return null;
	}
	,getChildIndex: function(child) {
		return 0;
	}
	,getObjectsUnderPoint: function(point) {
		return null;
	}
	,getRect: function(targetCoordinateSpace) {
		return null;
	}
	,globalToLocal: function(point) {
		return null;
	}
	,globalToLocal3D: function(point) {
		return null;
	}
	,hasEventListener: function(type) {
		return false;
	}
	,hitTestObject: function(obj) {
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		return false;
	}
	,local3DToGlobal: function(point3d) {
		return null;
	}
	,localToGlobal: function(point) {
		return null;
	}
	,removeChild: function(child) {
		return null;
	}
	,removeChildAt: function(index) {
		return null;
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 2147483647;
		if(beginIndex == null) beginIndex = 0;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
	}
	,requestSoftKeyboard: function() {
		return false;
	}
	,setChildIndex: function(child,index) {
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,startTouchDrag: function(touchPointID,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,stopAllMovieClips: function() {
	}
	,stopDrag: function() {
	}
	,stopTouchDrag: function(touchPointID) {
	}
	,swapChildren: function(child1,child2) {
	}
	,swapChildrenAt: function(index1,index2) {
	}
	,toString: function() {
		return null;
	}
	,willTrigger: function(type) {
		return false;
	}
	,__class__: lime.graphics.FlashRenderContext
};
lime.graphics.Font = function(fontName) {
	this.fontName = fontName;
	this.glyphs = new haxe.ds.IntMap();
};
$hxClasses["lime.graphics.Font"] = lime.graphics.Font;
lime.graphics.Font.__name__ = true;
lime.graphics.Font.fromBytes = function(bytes) {
	var font = new lime.graphics.Font();
	return font;
};
lime.graphics.Font.fromFile = function(path) {
	var font = new lime.graphics.Font();
	font.__fromFile(path);
	return font;
};
lime.graphics.Font.prototype = {
	createImage: function() {
		this.glyphs = new haxe.ds.IntMap();
		return null;
	}
	,decompose: function() {
		return null;
	}
	,loadRange: function(size,start,end) {
	}
	,loadGlyphs: function(size,glyphs) {
		if(glyphs == null) glyphs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^`'\"/\\&*()[]{}<>|:;_-+=?,. ";
	}
	,__fromFile: function(path) {
		this.__fontPath = path;
	}
	,__class__: lime.graphics.Font
};
lime.graphics.GlyphRect = function(x,y,width,height,xOffset,yOffset) {
	if(yOffset == null) yOffset = 0;
	if(xOffset == null) xOffset = 0;
	this.x = x;
	this.y = y;
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.graphics.GlyphRect"] = lime.graphics.GlyphRect;
lime.graphics.GlyphRect.__name__ = true;
lime.graphics.GlyphRect.prototype = {
	__class__: lime.graphics.GlyphRect
};
lime.graphics.ImageChannel = $hxClasses["lime.graphics.ImageChannel"] = { __ename__ : true, __constructs__ : ["RED","GREEN","BLUE","ALPHA"] };
lime.graphics.ImageChannel.RED = ["RED",0];
lime.graphics.ImageChannel.RED.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.GREEN = ["GREEN",1];
lime.graphics.ImageChannel.GREEN.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.BLUE = ["BLUE",2];
lime.graphics.ImageChannel.BLUE.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageChannel.ALPHA = ["ALPHA",3];
lime.graphics.ImageChannel.ALPHA.__enum__ = lime.graphics.ImageChannel;
lime.graphics.ImageBuffer = function(data,width,height,bitsPerPixel) {
	if(bitsPerPixel == null) bitsPerPixel = 4;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime.graphics.ImageBuffer;
lime.graphics.ImageBuffer.__name__ = true;
lime.graphics.ImageBuffer.prototype = {
	clone: function() {
		var buffer = new lime.graphics.ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		buffer.set_src(this.get_src());
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js.Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js.Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,__class__: lime.graphics.ImageBuffer
};
lime.graphics.ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime.graphics.ImageType.CANVAS = ["CANVAS",0];
lime.graphics.ImageType.CANVAS.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.DATA = ["DATA",1];
lime.graphics.ImageType.DATA.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.FLASH = ["FLASH",2];
lime.graphics.ImageType.FLASH.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.CUSTOM = ["CUSTOM",3];
lime.graphics.ImageType.CUSTOM.__enum__ = lime.graphics.ImageType;
lime.graphics.RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CUSTOM"] };
lime.graphics.RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime.graphics.RenderContext; return $x; };
lime.graphics.RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime.graphics.RenderContext; return $x; };
lime.graphics.RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime.graphics.RenderContext; return $x; };
lime.graphics.RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime.graphics.RenderContext; return $x; };
lime.graphics.RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime.graphics.RenderContext; return $x; };
lime.graphics._Renderer = {};
lime.graphics._Renderer.RenderEventInfo = function(type,context) {
	this.type = type;
	this.context = context;
};
$hxClasses["lime.graphics._Renderer.RenderEventInfo"] = lime.graphics._Renderer.RenderEventInfo;
lime.graphics._Renderer.RenderEventInfo.__name__ = true;
lime.graphics._Renderer.RenderEventInfo.prototype = {
	clone: function() {
		return new lime.graphics._Renderer.RenderEventInfo(this.type,this.context);
	}
	,__class__: lime.graphics._Renderer.RenderEventInfo
};
lime.graphics.Renderer = function(window) {
	this.window = window;
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime.graphics.Renderer;
lime.graphics.Renderer.__name__ = true;
lime.graphics.Renderer.render = function() {
	lime.graphics.Renderer.eventInfo.type = 0;
	var _g = 0;
	var _g1 = lime.app.Application.__instance.windows;
	while(_g < _g1.length) {
		var $window = _g1[_g];
		++_g;
		if($window.currentRenderer != null) $window.currentRenderer.dispatch();
	}
};
lime.graphics.Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.context;
			switch(_g[1]) {
			case 0:
				this.window.canvas.addEventListener("webglcontextlost",$bind(this,this.handleCanvasEvent),false);
				this.window.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleCanvasEvent),false);
				break;
			default:
			}
		}
		if(!lime.graphics.Renderer.registered) lime.graphics.Renderer.registered = true;
	}
	,createContext: function() {
		if(this.window.div != null) this.context = lime.graphics.RenderContext.DOM(this.window.div); else if(this.window.canvas != null) {
			var options = { alpha : true, antialias : this.window.config.antialiasing > 0, depth : this.window.config.depthBuffer, premultipliedAlpha : true, stencil : this.window.config.stencilBuffer, preserveDrawingBuffer : false};
			var webgl = js.html._CanvasElement.CanvasUtil.getContextWebGL(this.window.canvas,options);
			if(webgl == null) this.context = lime.graphics.RenderContext.CANVAS(this.window.canvas.getContext("2d")); else {
				lime.graphics.opengl.GL.context = webgl;
				this.context = lime.graphics.RenderContext.OPENGL(lime.graphics.opengl.GL.context);
			}
		}
	}
	,dispatch: function() {
		var _g = lime.graphics.Renderer.eventInfo.type;
		switch(_g) {
		case 0:
			if(!lime.app.Application.__initialized) {
				lime.app.Application.__initialized = true;
				lime.app.Application.__instance.init(this.context);
			}
			lime.app.Application.__instance.render(this.context);
			var listeners = lime.graphics.Renderer.onRender.listeners;
			var repeat = lime.graphics.Renderer.onRender.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this.context);
				if(!repeat[i]) {
					lime.graphics.Renderer.onRender.remove(listeners[i]);
					length--;
				} else i++;
			}
			this.flip();
			break;
		case 1:
			this.context = null;
			var listeners1 = lime.graphics.Renderer.onRenderContextLost.listeners;
			var repeat1 = lime.graphics.Renderer.onRenderContextLost.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1]();
				if(!repeat1[i1]) {
					lime.graphics.Renderer.onRenderContextLost.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case 2:
			this.createContext();
			var listeners2 = lime.graphics.Renderer.onRenderContextRestored.listeners;
			var repeat2 = lime.graphics.Renderer.onRenderContextRestored.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2](this.context);
				if(!repeat2[i2]) {
					lime.graphics.Renderer.onRenderContextRestored.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		}
	}
	,flip: function() {
	}
	,handleCanvasEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			lime.graphics.Renderer.eventInfo.type = 1;
			this.dispatch();
			break;
		case "webglcontextrestored":
			this.createContext();
			lime.graphics.Renderer.eventInfo.type = 2;
			this.dispatch();
			break;
		default:
		}
	}
	,__class__: lime.graphics.Renderer
};
lime.graphics._Renderer.RenderEventType_Impl_ = function() { };
$hxClasses["lime.graphics._Renderer.RenderEventType_Impl_"] = lime.graphics._Renderer.RenderEventType_Impl_;
lime.graphics._Renderer.RenderEventType_Impl_.__name__ = true;
lime.graphics.opengl = {};
lime.graphics.opengl.GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime.graphics.opengl.GL;
lime.graphics.opengl.GL.__name__ = true;
lime.graphics.opengl.GL.activeTexture = function(texture) {
	lime.graphics.opengl.GL.context.activeTexture(texture);
};
lime.graphics.opengl.GL.attachShader = function(program,shader) {
	lime.graphics.opengl.GL.context.attachShader(program,shader);
};
lime.graphics.opengl.GL.bindAttribLocation = function(program,index,name) {
	lime.graphics.opengl.GL.context.bindAttribLocation(program,index,name);
};
lime.graphics.opengl.GL.bindBuffer = function(target,buffer) {
	lime.graphics.opengl.GL.context.bindBuffer(target,buffer);
};
lime.graphics.opengl.GL.bindFramebuffer = function(target,framebuffer) {
	lime.graphics.opengl.GL.context.bindFramebuffer(target,framebuffer);
};
lime.graphics.opengl.GL.bindRenderbuffer = function(target,renderbuffer) {
	lime.graphics.opengl.GL.context.bindRenderbuffer(target,renderbuffer);
};
lime.graphics.opengl.GL.bindTexture = function(target,texture) {
	lime.graphics.opengl.GL.context.bindTexture(target,texture);
};
lime.graphics.opengl.GL.blendColor = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.blendColor(red,green,blue,alpha);
};
lime.graphics.opengl.GL.blendEquation = function(mode) {
	lime.graphics.opengl.GL.context.blendEquation(mode);
};
lime.graphics.opengl.GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	lime.graphics.opengl.GL.context.blendEquationSeparate(modeRGB,modeAlpha);
};
lime.graphics.opengl.GL.blendFunc = function(sfactor,dfactor) {
	lime.graphics.opengl.GL.context.blendFunc(sfactor,dfactor);
};
lime.graphics.opengl.GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	lime.graphics.opengl.GL.context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
lime.graphics.opengl.GL.bufferData = function(target,data,usage) {
	lime.graphics.opengl.GL.context.bufferData(target,data,usage);
};
lime.graphics.opengl.GL.bufferSubData = function(target,offset,data) {
	lime.graphics.opengl.GL.context.bufferSubData(target,offset,data);
};
lime.graphics.opengl.GL.checkFramebufferStatus = function(target) {
	return lime.graphics.opengl.GL.context.checkFramebufferStatus(target);
};
lime.graphics.opengl.GL.clear = function(mask) {
	lime.graphics.opengl.GL.context.clear(mask);
};
lime.graphics.opengl.GL.clearColor = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.clearColor(red,green,blue,alpha);
};
lime.graphics.opengl.GL.clearDepth = function(depth) {
	lime.graphics.opengl.GL.context.clearDepth(depth);
};
lime.graphics.opengl.GL.clearStencil = function(s) {
	lime.graphics.opengl.GL.context.clearStencil(s);
};
lime.graphics.opengl.GL.colorMask = function(red,green,blue,alpha) {
	lime.graphics.opengl.GL.context.colorMask(red,green,blue,alpha);
};
lime.graphics.opengl.GL.compileShader = function(shader) {
	lime.graphics.opengl.GL.context.compileShader(shader);
};
lime.graphics.opengl.GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	lime.graphics.opengl.GL.context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
lime.graphics.opengl.GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	lime.graphics.opengl.GL.context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
lime.graphics.opengl.GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	lime.graphics.opengl.GL.context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
lime.graphics.opengl.GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	lime.graphics.opengl.GL.context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
lime.graphics.opengl.GL.createBuffer = function() {
	return lime.graphics.opengl.GL.context.createBuffer();
};
lime.graphics.opengl.GL.createFramebuffer = function() {
	return lime.graphics.opengl.GL.context.createFramebuffer();
};
lime.graphics.opengl.GL.createProgram = function() {
	return lime.graphics.opengl.GL.context.createProgram();
};
lime.graphics.opengl.GL.createRenderbuffer = function() {
	return lime.graphics.opengl.GL.context.createRenderbuffer();
};
lime.graphics.opengl.GL.createShader = function(type) {
	return lime.graphics.opengl.GL.context.createShader(type);
};
lime.graphics.opengl.GL.createTexture = function() {
	return lime.graphics.opengl.GL.context.createTexture();
};
lime.graphics.opengl.GL.cullFace = function(mode) {
	lime.graphics.opengl.GL.context.cullFace(mode);
};
lime.graphics.opengl.GL.deleteBuffer = function(buffer) {
	lime.graphics.opengl.GL.context.deleteBuffer(buffer);
};
lime.graphics.opengl.GL.deleteFramebuffer = function(framebuffer) {
	lime.graphics.opengl.GL.context.deleteFramebuffer(framebuffer);
};
lime.graphics.opengl.GL.deleteProgram = function(program) {
	lime.graphics.opengl.GL.context.deleteProgram(program);
};
lime.graphics.opengl.GL.deleteRenderbuffer = function(renderbuffer) {
	lime.graphics.opengl.GL.context.deleteRenderbuffer(renderbuffer);
};
lime.graphics.opengl.GL.deleteShader = function(shader) {
	lime.graphics.opengl.GL.context.deleteShader(shader);
};
lime.graphics.opengl.GL.deleteTexture = function(texture) {
	lime.graphics.opengl.GL.context.deleteTexture(texture);
};
lime.graphics.opengl.GL.depthFunc = function(func) {
	lime.graphics.opengl.GL.context.depthFunc(func);
};
lime.graphics.opengl.GL.depthMask = function(flag) {
	lime.graphics.opengl.GL.context.depthMask(flag);
};
lime.graphics.opengl.GL.depthRange = function(zNear,zFar) {
	lime.graphics.opengl.GL.context.depthRange(zNear,zFar);
};
lime.graphics.opengl.GL.detachShader = function(program,shader) {
	lime.graphics.opengl.GL.context.detachShader(program,shader);
};
lime.graphics.opengl.GL.disable = function(cap) {
	lime.graphics.opengl.GL.context.disable(cap);
};
lime.graphics.opengl.GL.disableVertexAttribArray = function(index) {
	lime.graphics.opengl.GL.context.disableVertexAttribArray(index);
};
lime.graphics.opengl.GL.drawArrays = function(mode,first,count) {
	lime.graphics.opengl.GL.context.drawArrays(mode,first,count);
};
lime.graphics.opengl.GL.drawElements = function(mode,count,type,offset) {
	lime.graphics.opengl.GL.context.drawElements(mode,count,type,offset);
};
lime.graphics.opengl.GL.enable = function(cap) {
	lime.graphics.opengl.GL.context.enable(cap);
};
lime.graphics.opengl.GL.enableVertexAttribArray = function(index) {
	lime.graphics.opengl.GL.context.enableVertexAttribArray(index);
};
lime.graphics.opengl.GL.finish = function() {
	lime.graphics.opengl.GL.context.finish();
};
lime.graphics.opengl.GL.flush = function() {
	lime.graphics.opengl.GL.context.flush();
};
lime.graphics.opengl.GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	lime.graphics.opengl.GL.context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
lime.graphics.opengl.GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	lime.graphics.opengl.GL.context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
lime.graphics.opengl.GL.frontFace = function(mode) {
	lime.graphics.opengl.GL.context.frontFace(mode);
};
lime.graphics.opengl.GL.generateMipmap = function(target) {
	lime.graphics.opengl.GL.context.generateMipmap(target);
};
lime.graphics.opengl.GL.getActiveAttrib = function(program,index) {
	return lime.graphics.opengl.GL.context.getActiveAttrib(program,index);
};
lime.graphics.opengl.GL.getActiveUniform = function(program,index) {
	return lime.graphics.opengl.GL.context.getActiveUniform(program,index);
};
lime.graphics.opengl.GL.getAttachedShaders = function(program) {
	return lime.graphics.opengl.GL.context.getAttachedShaders(program);
};
lime.graphics.opengl.GL.getAttribLocation = function(program,name) {
	return lime.graphics.opengl.GL.context.getAttribLocation(program,name);
};
lime.graphics.opengl.GL.getBufferParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getBufferParameter(target,pname);
};
lime.graphics.opengl.GL.getContextAttributes = function() {
	return lime.graphics.opengl.GL.context.getContextAttributes();
};
lime.graphics.opengl.GL.getError = function() {
	return lime.graphics.opengl.GL.context.getError();
};
lime.graphics.opengl.GL.getExtension = function(name) {
	return lime.graphics.opengl.GL.context.getExtension(name);
};
lime.graphics.opengl.GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return lime.graphics.opengl.GL.context.getFramebufferAttachmentParameter(target,attachment,pname);
};
lime.graphics.opengl.GL.getParameter = function(pname) {
	return lime.graphics.opengl.GL.context.getParameter(pname);
};
lime.graphics.opengl.GL.getProgramInfoLog = function(program) {
	return lime.graphics.opengl.GL.context.getProgramInfoLog(program);
};
lime.graphics.opengl.GL.getProgramParameter = function(program,pname) {
	return lime.graphics.opengl.GL.context.getProgramParameter(program,pname);
};
lime.graphics.opengl.GL.getRenderbufferParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getRenderbufferParameter(target,pname);
};
lime.graphics.opengl.GL.getShaderInfoLog = function(shader) {
	return lime.graphics.opengl.GL.context.getShaderInfoLog(shader);
};
lime.graphics.opengl.GL.getShaderParameter = function(shader,pname) {
	return lime.graphics.opengl.GL.context.getShaderParameter(shader,pname);
};
lime.graphics.opengl.GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return lime.graphics.opengl.GL.context.getShaderPrecisionFormat(shadertype,precisiontype);
};
lime.graphics.opengl.GL.getShaderSource = function(shader) {
	return lime.graphics.opengl.GL.context.getShaderSource(shader);
};
lime.graphics.opengl.GL.getSupportedExtensions = function() {
	return lime.graphics.opengl.GL.context.getSupportedExtensions();
};
lime.graphics.opengl.GL.getTexParameter = function(target,pname) {
	return lime.graphics.opengl.GL.context.getTexParameter(target,pname);
};
lime.graphics.opengl.GL.getUniform = function(program,location) {
	return lime.graphics.opengl.GL.context.getUniform(program,location);
};
lime.graphics.opengl.GL.getUniformLocation = function(program,name) {
	return lime.graphics.opengl.GL.context.getUniformLocation(program,name);
};
lime.graphics.opengl.GL.getVertexAttrib = function(index,pname) {
	return lime.graphics.opengl.GL.context.getVertexAttrib(index,pname);
};
lime.graphics.opengl.GL.getVertexAttribOffset = function(index,pname) {
	return lime.graphics.opengl.GL.context.getVertexAttribOffset(index,pname);
};
lime.graphics.opengl.GL.hint = function(target,mode) {
	lime.graphics.opengl.GL.context.hint(target,mode);
};
lime.graphics.opengl.GL.isBuffer = function(buffer) {
	return lime.graphics.opengl.GL.context.isBuffer(buffer);
};
lime.graphics.opengl.GL.isContextLost = function() {
	return lime.graphics.opengl.GL.context.isContextLost();
};
lime.graphics.opengl.GL.isEnabled = function(cap) {
	return lime.graphics.opengl.GL.context.isEnabled(cap);
};
lime.graphics.opengl.GL.isFramebuffer = function(framebuffer) {
	return lime.graphics.opengl.GL.context.isFramebuffer(framebuffer);
};
lime.graphics.opengl.GL.isProgram = function(program) {
	return lime.graphics.opengl.GL.context.isProgram(program);
};
lime.graphics.opengl.GL.isRenderbuffer = function(renderbuffer) {
	return lime.graphics.opengl.GL.context.isRenderbuffer(renderbuffer);
};
lime.graphics.opengl.GL.isShader = function(shader) {
	return lime.graphics.opengl.GL.context.isShader(shader);
};
lime.graphics.opengl.GL.isTexture = function(texture) {
	return lime.graphics.opengl.GL.context.isTexture(texture);
};
lime.graphics.opengl.GL.lineWidth = function(width) {
	lime.graphics.opengl.GL.context.lineWidth(width);
};
lime.graphics.opengl.GL.linkProgram = function(program) {
	lime.graphics.opengl.GL.context.linkProgram(program);
};
lime.graphics.opengl.GL.pixelStorei = function(pname,param) {
	lime.graphics.opengl.GL.context.pixelStorei(pname,param);
};
lime.graphics.opengl.GL.polygonOffset = function(factor,units) {
	lime.graphics.opengl.GL.context.polygonOffset(factor,units);
};
lime.graphics.opengl.GL.readPixels = function(x,y,width,height,format,type,pixels) {
	lime.graphics.opengl.GL.context.readPixels(x,y,width,height,format,type,pixels);
};
lime.graphics.opengl.GL.renderbufferStorage = function(target,internalformat,width,height) {
	lime.graphics.opengl.GL.context.renderbufferStorage(target,internalformat,width,height);
};
lime.graphics.opengl.GL.sampleCoverage = function(value,invert) {
	lime.graphics.opengl.GL.context.sampleCoverage(value,invert);
};
lime.graphics.opengl.GL.scissor = function(x,y,width,height) {
	lime.graphics.opengl.GL.context.scissor(x,y,width,height);
};
lime.graphics.opengl.GL.shaderSource = function(shader,source) {
	lime.graphics.opengl.GL.context.shaderSource(shader,source);
};
lime.graphics.opengl.GL.stencilFunc = function(func,ref,mask) {
	lime.graphics.opengl.GL.context.stencilFunc(func,ref,mask);
};
lime.graphics.opengl.GL.stencilFuncSeparate = function(face,func,ref,mask) {
	lime.graphics.opengl.GL.context.stencilFuncSeparate(face,func,ref,mask);
};
lime.graphics.opengl.GL.stencilMask = function(mask) {
	lime.graphics.opengl.GL.context.stencilMask(mask);
};
lime.graphics.opengl.GL.stencilMaskSeparate = function(face,mask) {
	lime.graphics.opengl.GL.context.stencilMaskSeparate(face,mask);
};
lime.graphics.opengl.GL.stencilOp = function(fail,zfail,zpass) {
	lime.graphics.opengl.GL.context.stencilOp(fail,zfail,zpass);
};
lime.graphics.opengl.GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	lime.graphics.opengl.GL.context.stencilOpSeparate(face,fail,zfail,zpass);
};
lime.graphics.opengl.GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	lime.graphics.opengl.GL.context.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
lime.graphics.opengl.GL.texParameterf = function(target,pname,param) {
	lime.graphics.opengl.GL.context.texParameterf(target,pname,param);
};
lime.graphics.opengl.GL.texParameteri = function(target,pname,param) {
	lime.graphics.opengl.GL.context.texParameteri(target,pname,param);
};
lime.graphics.opengl.GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	lime.graphics.opengl.GL.context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
lime.graphics.opengl.GL.uniform1f = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1f(location,x);
};
lime.graphics.opengl.GL.uniform1fv = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1fv(location,x);
};
lime.graphics.opengl.GL.uniform1i = function(location,x) {
	lime.graphics.opengl.GL.context.uniform1i(location,x);
};
lime.graphics.opengl.GL.uniform1iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform1iv(location,v);
};
lime.graphics.opengl.GL.uniform2f = function(location,x,y) {
	lime.graphics.opengl.GL.context.uniform2f(location,x,y);
};
lime.graphics.opengl.GL.uniform2fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform2fv(location,v);
};
lime.graphics.opengl.GL.uniform2i = function(location,x,y) {
	lime.graphics.opengl.GL.context.uniform2i(location,x,y);
};
lime.graphics.opengl.GL.uniform2iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform2iv(location,v);
};
lime.graphics.opengl.GL.uniform3f = function(location,x,y,z) {
	lime.graphics.opengl.GL.context.uniform3f(location,x,y,z);
};
lime.graphics.opengl.GL.uniform3fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform3fv(location,v);
};
lime.graphics.opengl.GL.uniform3i = function(location,x,y,z) {
	lime.graphics.opengl.GL.context.uniform3i(location,x,y,z);
};
lime.graphics.opengl.GL.uniform3iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform3iv(location,v);
};
lime.graphics.opengl.GL.uniform4f = function(location,x,y,z,w) {
	lime.graphics.opengl.GL.context.uniform4f(location,x,y,z,w);
};
lime.graphics.opengl.GL.uniform4fv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform4fv(location,v);
};
lime.graphics.opengl.GL.uniform4i = function(location,x,y,z,w) {
	lime.graphics.opengl.GL.context.uniform4i(location,x,y,z,w);
};
lime.graphics.opengl.GL.uniform4iv = function(location,v) {
	lime.graphics.opengl.GL.context.uniform4iv(location,v);
};
lime.graphics.opengl.GL.uniformMatrix2fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix2fv(location,transpose,v);
};
lime.graphics.opengl.GL.uniformMatrix3fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix3fv(location,transpose,v);
};
lime.graphics.opengl.GL.uniformMatrix4fv = function(location,transpose,v) {
	lime.graphics.opengl.GL.context.uniformMatrix4fv(location,transpose,v);
};
lime.graphics.opengl.GL.useProgram = function(program) {
	lime.graphics.opengl.GL.context.useProgram(program);
};
lime.graphics.opengl.GL.validateProgram = function(program) {
	lime.graphics.opengl.GL.context.validateProgram(program);
};
lime.graphics.opengl.GL.vertexAttrib1f = function(indx,x) {
	lime.graphics.opengl.GL.context.vertexAttrib1f(indx,x);
};
lime.graphics.opengl.GL.vertexAttrib1fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib1fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib2f = function(indx,x,y) {
	lime.graphics.opengl.GL.context.vertexAttrib2f(indx,x,y);
};
lime.graphics.opengl.GL.vertexAttrib2fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib2fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib3f = function(indx,x,y,z) {
	lime.graphics.opengl.GL.context.vertexAttrib3f(indx,x,y,z);
};
lime.graphics.opengl.GL.vertexAttrib3fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib3fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttrib4f = function(indx,x,y,z,w) {
	lime.graphics.opengl.GL.context.vertexAttrib4f(indx,x,y,z,w);
};
lime.graphics.opengl.GL.vertexAttrib4fv = function(indx,values) {
	lime.graphics.opengl.GL.context.vertexAttrib4fv(indx,values);
};
lime.graphics.opengl.GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	lime.graphics.opengl.GL.context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
lime.graphics.opengl.GL.viewport = function(x,y,width,height) {
	lime.graphics.opengl.GL.context.viewport(x,y,width,height);
};
lime.graphics.opengl.GL.get_version = function() {
	return 2;
};
lime.graphics.utils = {};
lime.graphics.utils.ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime.graphics.utils.ImageCanvasUtil;
lime.graphics.utils.ImageCanvasUtil.__name__ = true;
lime.graphics.utils.ImageCanvasUtil.colorTransform = function(image,rect,colorMatrix) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.colorTransform(image,rect,colorMatrix);
};
lime.graphics.utils.ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime.graphics.utils.ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
		lime.graphics.utils.ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.createImageData(sourceImage);
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.copyChannel(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
};
lime.graphics.utils.ImageCanvasUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime.math.Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime.math.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime.math.Vector2(sourceRect.x,sourceRect.y),lime.graphics.ImageChannel.ALPHA,lime.graphics.ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	lime.graphics.utils.ImageCanvasUtil.sync(image);
	if(!mergeAlpha) {
		if(image.get_transparent() && sourceImage.get_transparent()) image.buffer.__srcContext.clearRect(destPoint.x + image.offsetX,destPoint.y + image.offsetY,sourceRect.width + image.offsetX,sourceRect.height + image.offsetY);
	}
	lime.graphics.utils.ImageCanvasUtil.sync(sourceImage);
	if(sourceImage.buffer.get_src() != null) image.buffer.__srcContext.drawImage(sourceImage.buffer.get_src(),sourceRect.x + sourceImage.offsetX | 0,sourceRect.y + sourceImage.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x + image.offsetX | 0,destPoint.y + image.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0);
};
lime.graphics.utils.ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.webkitImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime.graphics.utils.ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.data == null) {
		buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height);
		if(image.type == lime.graphics.ImageType.CANVAS) buffer.data = buffer.__srcImageData.data; else buffer.data = new Uint8Array(buffer.__srcImageData.data);
	}
};
lime.graphics.utils.ImageCanvasUtil.fillRect = function(image,rect,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.sync(image);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & -16777216) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime.graphics.utils.ImageCanvasUtil.floodFill = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.floodFill(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.getPixel = function(image,x,y) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixel(image,x,y);
};
lime.graphics.utils.ImageCanvasUtil.getPixel32 = function(image,x,y) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixel32(image,x,y);
};
lime.graphics.utils.ImageCanvasUtil.getPixels = function(image,rect) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	return lime.graphics.utils.ImageDataUtil.getPixels(image,rect);
};
lime.graphics.utils.ImageCanvasUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		lime.graphics.utils.ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(buffer.get_src(),0,0,newWidth,newHeight);
	} else {
		var sourceCanvas = buffer.__srcCanvas;
		buffer.__srcCanvas = null;
		lime.graphics.utils.ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(sourceCanvas,0,0,newWidth,newHeight);
	}
};
lime.graphics.utils.ImageCanvasUtil.setPixel = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixel(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.setPixel32 = function(image,x,y,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixel32(image,x,y,color);
};
lime.graphics.utils.ImageCanvasUtil.setPixels = function(image,rect,byteArray) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.createImageData(image);
	lime.graphics.utils.ImageDataUtil.setPixels(image,rect,byteArray);
};
lime.graphics.utils.ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.type != lime.graphics.ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
lime.graphics.utils.ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime.graphics.utils.ImageDataUtil;
lime.graphics.utils.ImageDataUtil.__name__ = true;
lime.graphics.utils.ImageDataUtil.colorTransform = function(image,rect,colorMatrix) {
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset;
	var rowStart = Std["int"](rect.get_top() + image.offsetY);
	var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
	var columnStart = Std["int"](rect.get_left() + image.offsetX);
	var columnEnd = Std["int"](rect.get_right() + image.offsetX);
	var r;
	var g;
	var b;
	var a;
	var ex = 0;
	var _g = rowStart;
	while(_g < rowEnd) {
		var row = _g++;
		var _g1 = columnStart;
		while(_g1 < columnEnd) {
			var column = _g1++;
			offset = row * stride + column * 4;
			a = data[offset + 3] * colorMatrix[18] + colorMatrix[19] * 255 | 0;
			if(a > 255) ex = a - 255; else ex = 0;
			b = data[offset + 2] * colorMatrix[12] + colorMatrix[14] * 255 + ex | 0;
			if(b > 255) ex = b - 255; else ex = 0;
			g = data[offset + 1] * colorMatrix[6] + colorMatrix[9] * 255 + ex | 0;
			if(g > 255) ex = g - 255; else ex = 0;
			r = data[offset] * colorMatrix[0] + colorMatrix[4] * 255 + ex | 0;
			if(r > 255) data[offset] = 255; else data[offset] = r;
			if(g > 255) data[offset + 1] = 255; else data[offset + 1] = g;
			if(b > 255) data[offset + 2] = 255; else data[offset + 2] = b;
			if(a > 255) data[offset + 3] = 255; else data[offset + 3] = a;
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	var destIdx;
	switch(destChannel[1]) {
	case 0:
		destIdx = 0;
		break;
	case 1:
		destIdx = 1;
		break;
	case 2:
		destIdx = 2;
		break;
	case 3:
		destIdx = 3;
		break;
	}
	var srcIdx;
	switch(sourceChannel[1]) {
	case 0:
		srcIdx = 0;
		break;
	case 1:
		srcIdx = 1;
		break;
	case 2:
		srcIdx = 2;
		break;
	case 3:
		srcIdx = 3;
		break;
	}
	var srcStride = sourceImage.buffer.width * 4 | 0;
	var srcPosition = (sourceRect.x + sourceImage.offsetX) * 4 + srcStride * (sourceRect.y + sourceImage.offsetY) + srcIdx | 0;
	var srcRowOffset = srcStride - (4 * (sourceRect.width + sourceImage.offsetX) | 0);
	var srcRowEnd = 4 * (sourceRect.x + sourceImage.offsetX + sourceRect.width) | 0;
	var srcData = sourceImage.buffer.data;
	var destStride = image.buffer.width * 4 | 0;
	var destPosition = (destPoint.x + image.offsetX) * 4 + destStride * (destPoint.y + image.offsetY) + destIdx | 0;
	var destRowOffset = destStride - (4 * (sourceRect.width + image.offsetX) | 0);
	var destRowEnd = 4 * (destPoint.x + image.offsetX + sourceRect.width) | 0;
	var destData = image.buffer.data;
	var length = sourceRect.width * sourceRect.height | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		destData[destPosition] = srcData[srcPosition];
		srcPosition += 4;
		destPosition += 4;
		if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
		if(destPosition % destStride > destRowEnd) destPosition += destRowOffset;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime.math.Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime.math.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime.math.Vector2(sourceRect.x,sourceRect.y),lime.graphics.ImageChannel.ALPHA,lime.graphics.ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	var rowOffset = destPoint.y + image.offsetY - sourceRect.y - sourceImage.offsetY | 0;
	var columnOffset = destPoint.x + image.offsetX - sourceRect.x - sourceImage.offsetY | 0;
	var sourceData = sourceImage.buffer.data;
	var sourceStride = sourceImage.buffer.width * 4;
	var sourceOffset = 0;
	var data = image.buffer.data;
	var stride = image.buffer.width * 4;
	var offset = 0;
	if(!mergeAlpha || !sourceImage.get_transparent()) {
		var _g1 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g2 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g3 < _g2) {
				var column = _g3++;
				sourceOffset = row * sourceStride + column * 4;
				offset = (row + rowOffset) * stride + (column + columnOffset) * 4;
				data[offset] = sourceData[sourceOffset];
				data[offset + 1] = sourceData[sourceOffset + 1];
				data[offset + 2] = sourceData[sourceOffset + 2];
				data[offset + 3] = sourceData[sourceOffset + 3];
			}
		}
	} else {
		var sourceAlpha;
		var oneMinusSourceAlpha;
		var _g11 = Std["int"](sourceRect.get_top() + sourceImage.offsetY);
		var _g4 = Std["int"](sourceRect.get_bottom() + sourceImage.offsetY);
		while(_g11 < _g4) {
			var row1 = _g11++;
			var _g31 = Std["int"](sourceRect.get_left() + sourceImage.offsetX);
			var _g21 = Std["int"](sourceRect.get_right() + sourceImage.offsetX);
			while(_g31 < _g21) {
				var column1 = _g31++;
				sourceOffset = row1 * sourceStride + column1 * 4;
				offset = (row1 + rowOffset) * stride + (column1 + columnOffset) * 4;
				sourceAlpha = sourceData[sourceOffset + 3] / 255;
				oneMinusSourceAlpha = 1 - sourceAlpha;
				data[offset] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset] + data[offset] * oneMinusSourceAlpha | 0];
				data[offset + 1] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 1] + data[offset + 1] * oneMinusSourceAlpha | 0];
				data[offset + 2] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 2] + data[offset + 2] * oneMinusSourceAlpha | 0];
				data[offset + 3] = lime.graphics.utils.ImageDataUtil.__clamp[sourceData[sourceOffset + 3] + data[offset + 3] * oneMinusSourceAlpha | 0];
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.fillRect = function(image,rect,color) {
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	var rgba = r | g << 8 | b << 16 | a << 24;
	var data = image.buffer.data;
	if(rect.width == image.buffer.width && rect.height == image.buffer.height && rect.x == 0 && rect.y == 0 && image.offsetX == 0 && image.offsetY == 0) {
		var length = image.buffer.width * image.buffer.height;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			data[i] = r;
			data[i + 1] = g;
			data[i + 2] = b;
			data[i + 3] = a;
		}
	} else {
		var stride = image.buffer.width * 4;
		var offset;
		var rowStart = rect.y + image.offsetY | 0;
		var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
		var columnStart = rect.x + image.offsetX | 0;
		var columnEnd = Std["int"](rect.get_right() + image.offsetX);
		var _g1 = rowStart;
		while(_g1 < rowEnd) {
			var row = _g1++;
			var _g11 = columnStart;
			while(_g11 < columnEnd) {
				var column = _g11++;
				offset = row * stride + column * 4;
				data[offset] = r;
				data[offset + 1] = g;
				data[offset + 2] = b;
				data[offset + 3] = a;
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.floodFill = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = (y + image.offsetY) * (image.buffer.width * 4) + (x + image.offsetX) * 4;
	var hitColorR = data[offset];
	var hitColorG = data[offset + 1];
	var hitColorB = data[offset + 2];
	var hitColorA;
	if(image.get_transparent()) hitColorA = data[offset + 3]; else hitColorA = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	if(hitColorR == r && hitColorG == g && hitColorB == b && hitColorA == a) return;
	var dx = [0,-1,1,0];
	var dy = [-1,0,0,1];
	var minX = -image.offsetX;
	var minY = -image.offsetY;
	var maxX = minX + image.width;
	var maxY = minY + image.height;
	var queue = new Array();
	queue.push(x);
	queue.push(y);
	while(queue.length > 0) {
		var curPointY = queue.pop();
		var curPointX = queue.pop();
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var nextPointX = curPointX + dx[i];
			var nextPointY = curPointY + dy[i];
			if(nextPointX < minX || nextPointY < minY || nextPointX >= maxX || nextPointY >= maxY) continue;
			var nextPointOffset = (nextPointY * image.width + nextPointX) * 4;
			if(data[nextPointOffset] == hitColorR && data[nextPointOffset + 1] == hitColorG && data[nextPointOffset + 2] == hitColorB && data[nextPointOffset + 3] == hitColorA) {
				data[nextPointOffset] = r;
				data[nextPointOffset + 1] = g;
				data[nextPointOffset + 2] = b;
				data[nextPointOffset + 3] = a;
				queue.push(nextPointX);
				queue.push(nextPointY);
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.getPixel = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	if(image.get_premultiplied()) {
		var unmultiply = 255.0 / data[offset + 3];
		haxe.Log.trace(unmultiply,{ fileName : "ImageDataUtil.hx", lineNumber : 361, className : "lime.graphics.utils.ImageDataUtil", methodName : "getPixel"});
		return lime.graphics.utils.ImageDataUtil.__clamp[data[offset] * unmultiply | 0] << 16 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime.graphics.utils.ImageDataUtil.getPixel32 = function(image,x,y) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = data[offset + 3]; else a = 255;
	if(image.get_premultiplied() && a != 0) {
		var unmultiply = 255.0 / a;
		return a << 24 | (function($this) {
			var $r;
			var index = Math.round(data[offset] * unmultiply);
			$r = lime.graphics.utils.ImageDataUtil.__clamp[index];
			return $r;
		}(this)) << 16 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 1] * unmultiply | 0] << 8 | lime.graphics.utils.ImageDataUtil.__clamp[data[offset + 2] * unmultiply | 0];
	} else return a << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
};
lime.graphics.utils.ImageDataUtil.getPixels = function(image,rect) {
	var byteArray = new lime.utils.ByteArray(image.width * image.height * 4);
	var srcData = image.buffer.data;
	var srcStride = image.buffer.width * 4 | 0;
	var srcPosition = rect.x * 4 + srcStride * rect.y | 0;
	var srcRowOffset = srcStride - (4 * rect.width | 0);
	var srcRowEnd = 4 * (rect.x + rect.width) | 0;
	var length = 4 * rect.width * rect.height | 0;
	if(byteArray.allocated < length) byteArray.___resizeBuffer(byteArray.allocated = Std["int"](Math.max(length,byteArray.allocated * 2))); else if(byteArray.allocated > length) byteArray.___resizeBuffer(byteArray.allocated = length);
	byteArray.length = length;
	length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		byteArray.__set(i,srcData[srcPosition++]);
		if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
	}
	byteArray.position = 0;
	return byteArray;
};
lime.graphics.utils.ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		var a161 = lime.graphics.utils.ImageDataUtil.__alpha16[data[index + 3]];
		data[index] = data[index] * a161 >> 16;
		data[index + 1] = data[index + 1] * a161 >> 16;
		data[index + 2] = data[index + 2] * a161 >> 16;
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var newBuffer = new lime.graphics.ImageBuffer(new Uint8Array(newWidth * newHeight * 4),newWidth,newHeight);
	var imageWidth = image.width;
	var imageHeight = image.height;
	var data = image.get_data();
	var newData = newBuffer.data;
	var sourceIndex;
	var sourceIndexX;
	var sourceIndexY;
	var sourceIndexXY;
	var index;
	var sourceX;
	var sourceY;
	var u;
	var v;
	var uRatio;
	var vRatio;
	var uOpposite;
	var vOpposite;
	var _g = 0;
	while(_g < newHeight) {
		var y = _g++;
		var _g1 = 0;
		while(_g1 < newWidth) {
			var x = _g1++;
			u = (x + 0.5) / newWidth * imageWidth - 0.5;
			v = (y + 0.5) / newHeight * imageHeight - 0.5;
			sourceX = u | 0;
			sourceY = v | 0;
			sourceIndex = (sourceY * imageWidth + sourceX) * 4;
			if(sourceX < imageWidth - 1) sourceIndexX = sourceIndex + 4; else sourceIndexX = sourceIndex;
			if(sourceY < imageHeight - 1) sourceIndexY = sourceIndex + imageWidth * 4; else sourceIndexY = sourceIndex;
			if(sourceIndexX != sourceIndex) sourceIndexXY = sourceIndexY + 4; else sourceIndexXY = sourceIndexY;
			index = (y * newWidth + x) * 4;
			uRatio = u - sourceX;
			vRatio = v - sourceY;
			uOpposite = 1 - uRatio;
			vOpposite = 1 - vRatio;
			newData[index] = (data[sourceIndex] * uOpposite + data[sourceIndexX] * uRatio) * vOpposite + (data[sourceIndexY] * uOpposite + data[sourceIndexXY] * uRatio) * vRatio | 0;
			newData[index + 1] = (data[sourceIndex + 1] * uOpposite + data[sourceIndexX + 1] * uRatio) * vOpposite + (data[sourceIndexY + 1] * uOpposite + data[sourceIndexXY + 1] * uRatio) * vRatio | 0;
			newData[index + 2] = (data[sourceIndex + 2] * uOpposite + data[sourceIndexX + 2] * uRatio) * vOpposite + (data[sourceIndexY + 2] * uOpposite + data[sourceIndexXY + 2] * uRatio) * vRatio | 0;
			if(data[sourceIndexX + 3] == 0 || data[sourceIndexY + 3] == 0 || data[sourceIndexXY + 3] == 0) newData[index + 3] = 0; else newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newData;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime.graphics.utils.ImageDataUtil.resizeBuffer = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var data = image.get_data();
	var newData = new Uint8Array(newWidth * newHeight * 4);
	var sourceIndex;
	var index;
	var _g1 = 0;
	var _g = buffer.height;
	while(_g1 < _g) {
		var y = _g1++;
		var _g3 = 0;
		var _g2 = buffer.width;
		while(_g3 < _g2) {
			var x = _g3++;
			sourceIndex = (y * buffer.width + x) * 4;
			index = (y * newWidth + x) * 4;
			newData[index] = data[sourceIndex];
			newData[index + 1] = data[sourceIndex + 1];
			newData[index + 2] = data[sourceIndex + 2];
			newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newData;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime.graphics.utils.ImageDataUtil.setPixel = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	data[offset] = (color & 16711680) >>> 16;
	data[offset + 1] = (color & 65280) >>> 8;
	data[offset + 2] = color & 255;
	if(image.get_transparent()) data[offset + 3] = 255;
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.setPixel32 = function(image,x,y,color) {
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	if(image.get_transparent() && image.get_premultiplied()) {
		var a16 = lime.graphics.utils.ImageDataUtil.__alpha16[a];
		data[offset] = ((color & 16711680) >>> 16) * a16 >> 16;
		data[offset + 1] = ((color & 65280) >>> 8) * a16 >> 16;
		data[offset + 2] = (color & 255) * a16 >> 16;
		data[offset + 3] = a;
	} else {
		data[offset] = (color & 16711680) >>> 16;
		data[offset + 1] = (color & 65280) >>> 8;
		data[offset + 2] = color & 255;
		data[offset + 3] = a;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.setPixels = function(image,rect,byteArray) {
	var len = Math.round(4 * rect.width * rect.height);
	var data = image.buffer.data;
	var offset = Math.round(4 * image.buffer.width * (rect.y + image.offsetX) + (rect.x + image.offsetY) * 4);
	var pos = offset;
	var boundR = Math.round(4 * (rect.x + rect.width + image.offsetX));
	var width = image.buffer.width;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(pos % (width * 4) > boundR - 1) pos += width * 4 - boundR;
		data[pos] = byteArray.readByte();
		pos++;
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	var index;
	var a;
	var unmultiply;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		a = data[index + 3];
		if(a != 0) {
			unmultiply = 255.0 / a;
			data[index] = lime.graphics.utils.ImageDataUtil.__clamp[data[index] * unmultiply | 0];
			data[index + 1] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 1] * unmultiply | 0];
			data[index + 2] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 2] * unmultiply | 0];
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
lime.math = {};
lime.math._ColorMatrix = {};
lime.math._ColorMatrix.ColorMatrix_Impl_ = function() { };
$hxClasses["lime.math._ColorMatrix.ColorMatrix_Impl_"] = lime.math._ColorMatrix.ColorMatrix_Impl_;
lime.math._ColorMatrix.ColorMatrix_Impl_.__name__ = true;
lime.math._ColorMatrix.ColorMatrix_Impl_._new = function(data) {
	var this1;
	if(data != null && data.length == 20) this1 = data; else this1 = new Float32Array(lime.math._ColorMatrix.ColorMatrix_Impl_.__identity);
	return this1;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.clone = function(this1) {
	return lime.math._ColorMatrix.ColorMatrix_Impl_._new(new Float32Array(this1));
};
lime.math._ColorMatrix.ColorMatrix_Impl_.concat = function(this1,second) {
	var _g = this1;
	var value = _g[0] + second[0];
	_g[0] = value;
	value;
	var _g1 = this1;
	var value1 = _g1[6] + second[6];
	_g1[6] = value1;
	value1;
	var _g2 = this1;
	var value2 = _g2[12] + second[12];
	_g2[12] = value2;
	value2;
	var _g3 = this1;
	var value3 = _g3[18] + second[18];
	_g3[18] = value3;
	value3;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.copyFrom = function(this1,other) {
	this1.set(other);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 0;
	this1[6] = 1;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 0;
	this1[11] = 0;
	this1[12] = 1;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 0;
	this1[16] = 0;
	this1[17] = 0;
	this1[18] = 1;
	this1[19] = 0;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.__toFlashColorTransform = function(this1) {
	return null;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_alphaMultiplier = function(this1) {
	return this1[18];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_alphaMultiplier = function(this1,value) {
	this1[18] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_alphaOffset = function(this1) {
	return this1[19] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_alphaOffset = function(this1,value) {
	this1[19] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_blueMultiplier = function(this1) {
	return this1[12];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_blueMultiplier = function(this1,value) {
	this1[12] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_blueOffset = function(this1) {
	return this1[14] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_blueOffset = function(this1,value) {
	this1[14] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_color = function(this1) {
	return (this1[4] * 255 | 0) << 16 | (this1[9] * 255 | 0) << 8 | (this1[14] * 255 | 0);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_color = function(this1,value) {
	var value1 = value >> 16 & 255;
	this1[4] = value1 / 255;
	value1;
	var value2 = value >> 8 & 255;
	this1[9] = value2 / 255;
	value2;
	var value3 = value & 255;
	this1[14] = value3 / 255;
	value3;
	this1[0] = 0;
	0;
	this1[6] = 0;
	0;
	this1[12] = 0;
	0;
	return lime.math._ColorMatrix.ColorMatrix_Impl_.get_color(this1);
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_greenMultiplier = function(this1) {
	return this1[6];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_greenMultiplier = function(this1,value) {
	this1[6] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_greenOffset = function(this1) {
	return this1[9] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_greenOffset = function(this1,value) {
	this1[9] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_redMultiplier = function(this1) {
	return this1[0];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_redMultiplier = function(this1,value) {
	this1[0] = value;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get_redOffset = function(this1) {
	return this1[4] * 255;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set_redOffset = function(this1,value) {
	this1[4] = value / 255;
	return value;
};
lime.math._ColorMatrix.ColorMatrix_Impl_.get = function(this1,index) {
	return this1[index];
};
lime.math._ColorMatrix.ColorMatrix_Impl_.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
lime.math.Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime.math.Matrix3;
lime.math.Matrix3.__name__ = true;
lime.math.Matrix3.prototype = {
	clone: function() {
		return new lime.math.Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyColumnFrom: function(column,vector4) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(column == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyColumnTo: function(column,vector4) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			vector4.x = this.a;
			vector4.y = this.c;
			vector4.z = 0;
		} else if(column == 1) {
			vector4.x = this.b;
			vector4.y = this.d;
			vector4.z = 0;
		} else {
			vector4.x = this.tx;
			vector4.y = this.ty;
			vector4.z = 1;
		}
	}
	,copyFrom: function(sourceMatrix3) {
		this.a = sourceMatrix3.a;
		this.b = sourceMatrix3.b;
		this.c = sourceMatrix3.c;
		this.d = sourceMatrix3.d;
		this.tx = sourceMatrix3.tx;
		this.ty = sourceMatrix3.ty;
	}
	,copyRowFrom: function(row,vector4) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(row == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyRowTo: function(row,vector4) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			vector4.x = this.a;
			vector4.y = this.b;
			vector4.z = this.tx;
		} else if(row == 1) {
			vector4.x = this.c;
			vector4.y = this.d;
			vector4.z = this.ty;
		} else {
			vector4.x = 0;
			vector4.y = 0;
			vector4.z = 1;
		}
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(Matrix3) {
		return Matrix3 != null && this.tx == Matrix3.tx && this.ty == Matrix3.ty && this.a == Matrix3.a && this.b == Matrix3.b && this.c == Matrix3.c && this.d == Matrix3.d;
	}
	,deltaTransformVector2: function(Vector2) {
		return new lime.math.Vector2(Vector2.x * this.a + Vector2.y * this.c,Vector2.x * this.b + Vector2.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new lime.math.Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,toMozString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformVector2: function(pos) {
		return new lime.math.Vector2(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new lime.math.Matrix3();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformX: function(pos) {
		return pos.x * this.a + pos.y * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: lime.math.Matrix3
};
lime.math._Matrix4 = {};
lime.math._Matrix4.Matrix4_Impl_ = function() { };
$hxClasses["lime.math._Matrix4.Matrix4_Impl_"] = lime.math._Matrix4.Matrix4_Impl_;
lime.math._Matrix4.Matrix4_Impl_.__name__ = true;
lime.math._Matrix4.Matrix4_Impl_._new = function(data) {
	var this1;
	if(data != null && data.length == 16) this1 = data; else this1 = new Float32Array(lime.math._Matrix4.Matrix4_Impl_.__identity);
	return this1;
};
lime.math._Matrix4.Matrix4_Impl_.append = function(this1,lhs) {
	var m111 = this1[0];
	var m121 = this1[4];
	var m131 = this1[8];
	var m141 = this1[12];
	var m112 = this1[1];
	var m122 = this1[5];
	var m132 = this1[9];
	var m142 = this1[13];
	var m113 = this1[2];
	var m123 = this1[6];
	var m133 = this1[10];
	var m143 = this1[14];
	var m114 = this1[3];
	var m124 = this1[7];
	var m134 = this1[11];
	var m144 = this1[15];
	var m211 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,0);
	var m221 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,4);
	var m231 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,8);
	var m241 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,12);
	var m212 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,1);
	var m222 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,5);
	var m232 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,9);
	var m242 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,13);
	var m213 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,2);
	var m223 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,6);
	var m233 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,10);
	var m243 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,14);
	var m214 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,3);
	var m224 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,7);
	var m234 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,11);
	var m244 = lime.math._Matrix4.Matrix4_Impl_.get(lhs,15);
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime.math._Matrix4.Matrix4_Impl_.appendRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime.math._Matrix4.Matrix4_Impl_.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime.math._Matrix4.Matrix4_Impl_.appendTranslation(m,p.x,p.y,p.z);
	}
	lime.math._Matrix4.Matrix4_Impl_.append(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.appendScale = function(this1,xScale,yScale,zScale) {
	lime.math._Matrix4.Matrix4_Impl_.append(this1,lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime.math._Matrix4.Matrix4_Impl_.appendTranslation = function(this1,x,y,z) {
	this1[12] = this1[12] + x;
	this1[13] = this1[13] + y;
	this1[14] = this1[14] + z;
};
lime.math._Matrix4.Matrix4_Impl_.clone = function(this1) {
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array(this1));
};
lime.math._Matrix4.Matrix4_Impl_.copyColumnFrom = function(this1,column,vector) {
	switch(column) {
	case 0:
		this1[0] = vector.x;
		this1[1] = vector.y;
		this1[2] = vector.z;
		this1[3] = vector.w;
		break;
	case 1:
		this1[4] = vector.x;
		this1[5] = vector.y;
		this1[6] = vector.z;
		this1[7] = vector.w;
		break;
	case 2:
		this1[8] = vector.x;
		this1[9] = vector.y;
		this1[10] = vector.z;
		this1[11] = vector.w;
		break;
	case 3:
		this1[12] = vector.x;
		this1[13] = vector.y;
		this1[14] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw "Error, Column " + column + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyColumnTo = function(this1,column,vector) {
	switch(column) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[1];
		vector.z = this1[2];
		vector.w = this1[3];
		break;
	case 1:
		vector.x = this1[4];
		vector.y = this1[5];
		vector.z = this1[6];
		vector.w = this1[7];
		break;
	case 2:
		vector.x = this1[8];
		vector.y = this1[9];
		vector.z = this1[10];
		vector.w = this1[11];
		break;
	case 3:
		vector.x = this1[12];
		vector.y = this1[13];
		vector.z = this1[14];
		vector.w = this1[15];
		break;
	default:
		throw "Error, Column " + column + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyFrom = function(this1,other) {
	this1.set(other);
};
lime.math._Matrix4.Matrix4_Impl_.copythisFrom = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
	var l = array.length - index;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		this1[c] = array[c + index];
	}
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
};
lime.math._Matrix4.Matrix4_Impl_.copythisTo = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
	var l = this1.length;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		array[c + index] = this1[c];
	}
	if(transposeValues) lime.math._Matrix4.Matrix4_Impl_.transpose(this1);
};
lime.math._Matrix4.Matrix4_Impl_.copyRowFrom = function(this1,row,vector) {
	switch(row) {
	case 0:
		this1[0] = vector.x;
		this1[4] = vector.y;
		this1[8] = vector.z;
		this1[12] = vector.w;
		break;
	case 1:
		this1[1] = vector.x;
		this1[5] = vector.y;
		this1[9] = vector.z;
		this1[13] = vector.w;
		break;
	case 2:
		this1[2] = vector.x;
		this1[6] = vector.y;
		this1[10] = vector.z;
		this1[14] = vector.w;
		break;
	case 3:
		this1[3] = vector.x;
		this1[7] = vector.y;
		this1[11] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw "Error, Row " + Std.string((function($this) {
			var $r;
			var $int = row;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]));
};
lime.math._Matrix4.Matrix4_Impl_.createABCD = function(a,b,c,d,tx,ty) {
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]));
};
lime.math._Matrix4.Matrix4_Impl_.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]));
};
lime.math._Matrix4.Matrix4_Impl_.copyRowTo = function(this1,row,vector) {
	switch(row) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[4];
		vector.z = this1[8];
		vector.w = this1[12];
		break;
	case 1:
		vector.x = this1[1];
		vector.y = this1[5];
		vector.z = this1[9];
		vector.w = this1[13];
		break;
	case 2:
		vector.x = this1[2];
		vector.y = this1[6];
		vector.z = this1[10];
		vector.w = this1[14];
		break;
	case 3:
		vector.x = this1[3];
		vector.y = this1[7];
		vector.z = this1[11];
		vector.w = this1[15];
		break;
	default:
		throw "Error, Row " + row + " out of bounds [0, ..., 3]";
	}
};
lime.math._Matrix4.Matrix4_Impl_.copyToMatrix4 = function(this1,other) {
	(js.Boot.__cast(other , Float32Array)).set(this1);
};
lime.math._Matrix4.Matrix4_Impl_.deltaTransformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime.math.Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[3],x * this1[1] + y * this1[5] + z * this1[9] + this1[7],x * this1[2] + y * this1[6] + z * this1[10] + this1[11],0);
};
lime.math._Matrix4.Matrix4_Impl_.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 1;
	this1[6] = 0;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 1;
	this1[11] = 0;
	this1[12] = 0;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 1;
};
lime.math._Matrix4.Matrix4_Impl_.interpolate = function(thisMat,toMat,percent) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		lime.math._Matrix4.Matrix4_Impl_.set(m,i,lime.math._Matrix4.Matrix4_Impl_.get(thisMat,i) + (lime.math._Matrix4.Matrix4_Impl_.get(toMat,i) - lime.math._Matrix4.Matrix4_Impl_.get(thisMat,i)) * percent);
	}
	return m;
};
lime.math._Matrix4.Matrix4_Impl_.interpolateTo = function(this1,toMat,percent) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this1[i] = this1[i] + (lime.math._Matrix4.Matrix4_Impl_.get(toMat,i) - this1[i]) * percent;
	}
};
lime.math._Matrix4.Matrix4_Impl_.invert = function(this1) {
	var d = lime.math._Matrix4.Matrix4_Impl_.get_determinant(this1);
	var invertable = Math.abs(d) > 0.00000000001;
	if(invertable) {
		d = 1 / d;
		var m11 = this1[0];
		var m21 = this1[4];
		var m31 = this1[8];
		var m41 = this1[12];
		var m12 = this1[1];
		var m22 = this1[5];
		var m32 = this1[9];
		var m42 = this1[13];
		var m13 = this1[2];
		var m23 = this1[6];
		var m33 = this1[10];
		var m43 = this1[14];
		var m14 = this1[3];
		var m24 = this1[7];
		var m34 = this1[11];
		var m44 = this1[15];
		this1[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
		this1[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
		this1[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
		this1[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
		this1[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
		this1[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
		this1[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
		this1[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
		this1[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
		this1[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
		this1[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
		this1[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
		this1[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
		this1[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
		this1[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
		this1[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
	}
	return invertable;
};
lime.math._Matrix4.Matrix4_Impl_.pointAt = function(this1,pos,at,up) {
	if(at == null) at = new lime.math.Vector4(0,0,-1);
	if(up == null) up = new lime.math.Vector4(0,-1,0);
	var dir = new lime.math.Vector4(at.x - pos.x,at.y - pos.y,at.z - pos.z);
	var vup = new lime.math.Vector4(up.x,up.y,up.z,up.w);
	var right;
	dir.normalize();
	vup.normalize();
	var dir2 = new lime.math.Vector4(dir.x,dir.y,dir.z,dir.w);
	dir2.scaleBy(vup.x * dir.x + vup.y * dir.y + vup.z * dir.z);
	vup = new lime.math.Vector4(vup.x - dir2.x,vup.y - dir2.y,vup.z - dir2.z);
	if(Math.sqrt(vup.x * vup.x + vup.y * vup.y + vup.z * vup.z) > 0) vup.normalize(); else if(dir.x != 0) vup = new lime.math.Vector4(-dir.y,dir.x,0); else vup = new lime.math.Vector4(1,0,0);
	right = new lime.math.Vector4(vup.y * dir.z - vup.z * dir.y,vup.z * dir.x - vup.x * dir.z,vup.x * dir.y - vup.y * dir.x,1);
	right.normalize();
	this1[0] = right.x;
	this1[4] = right.y;
	this1[8] = right.z;
	this1[12] = 0.0;
	this1[1] = vup.x;
	this1[5] = vup.y;
	this1[9] = vup.z;
	this1[13] = 0.0;
	this1[2] = dir.x;
	this1[6] = dir.y;
	this1[10] = dir.z;
	this1[14] = 0.0;
	this1[3] = pos.x;
	this1[7] = pos.y;
	this1[11] = pos.z;
	this1[15] = 1.0;
};
lime.math._Matrix4.Matrix4_Impl_.prepend = function(this1,rhs) {
	var m111 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,0);
	var m121 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,4);
	var m131 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,8);
	var m141 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,12);
	var m112 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,1);
	var m122 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,5);
	var m132 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,9);
	var m142 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,13);
	var m113 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,2);
	var m123 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,6);
	var m133 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,10);
	var m143 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,14);
	var m114 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,3);
	var m124 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,7);
	var m134 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,11);
	var m144 = lime.math._Matrix4.Matrix4_Impl_.get(rhs,15);
	var m211 = this1[0];
	var m221 = this1[4];
	var m231 = this1[8];
	var m241 = this1[12];
	var m212 = this1[1];
	var m222 = this1[5];
	var m232 = this1[9];
	var m242 = this1[13];
	var m213 = this1[2];
	var m223 = this1[6];
	var m233 = this1[10];
	var m243 = this1[14];
	var m214 = this1[3];
	var m224 = this1[7];
	var m234 = this1[11];
	var m244 = this1[15];
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime.math._Matrix4.Matrix4_Impl_.prependRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime.math._Matrix4.Matrix4_Impl_.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime.math._Matrix4.Matrix4_Impl_.appendTranslation(m,p.x,p.y,p.z);
	}
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.prependScale = function(this1,xScale,yScale,zScale) {
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,lime.math._Matrix4.Matrix4_Impl_._new(new Float32Array([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0])));
};
lime.math._Matrix4.Matrix4_Impl_.prependTranslation = function(this1,x,y,z) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	lime.math._Matrix4.Matrix4_Impl_.set_position(m,new lime.math.Vector4(x,y,z));
	lime.math._Matrix4.Matrix4_Impl_.prepend(this1,m);
};
lime.math._Matrix4.Matrix4_Impl_.transformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime.math.Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[12],x * this1[1] + y * this1[5] + z * this1[9] + this1[13],x * this1[2] + y * this1[6] + z * this1[10] + this1[14],x * this1[3] + y * this1[7] + z * this1[11] + this1[15]);
};
lime.math._Matrix4.Matrix4_Impl_.transformVectors = function(this1,ain,aout) {
	var i = 0;
	while(i + 3 <= ain.length) {
		var x = ain[i];
		var y = ain[i + 1];
		var z = ain[i + 2];
		aout[i] = x * this1[0] + y * this1[4] + z * this1[8] + this1[12];
		aout[i + 1] = x * this1[1] + y * this1[5] + z * this1[9] + this1[13];
		aout[i + 2] = x * this1[2] + y * this1[6] + z * this1[10] + this1[14];
		i += 3;
	}
};
lime.math._Matrix4.Matrix4_Impl_.transpose = function(this1) {
	var othis = new Float32Array(this1);
	this1[1] = othis[4];
	this1[2] = othis[8];
	this1[3] = othis[12];
	this1[4] = othis[1];
	this1[6] = othis[9];
	this1[7] = othis[13];
	this1[8] = othis[2];
	this1[9] = othis[6];
	this1[11] = othis[14];
	this1[12] = othis[3];
	this1[13] = othis[7];
	this1[14] = othis[11];
};
lime.math._Matrix4.Matrix4_Impl_.getAxisRotation = function(x,y,z,degrees) {
	var m = lime.math._Matrix4.Matrix4_Impl_._new();
	var a1 = new lime.math.Vector4(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	lime.math._Matrix4.Matrix4_Impl_.set(m,0,c + a1.x * a1.x * t);
	lime.math._Matrix4.Matrix4_Impl_.set(m,5,c + a1.y * a1.y * t);
	lime.math._Matrix4.Matrix4_Impl_.set(m,10,c + a1.z * a1.z * t);
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,4,tmp1 + tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,1,tmp1 - tmp2);
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,8,tmp1 - tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,2,tmp1 + tmp2);
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	lime.math._Matrix4.Matrix4_Impl_.set(m,9,tmp1 + tmp2);
	lime.math._Matrix4.Matrix4_Impl_.set(m,6,tmp1 - tmp2);
	return m;
};
lime.math._Matrix4.Matrix4_Impl_.get_determinant = function(this1) {
	return (this1[0] * this1[5] - this1[4] * this1[1]) * (this1[10] * this1[15] - this1[14] * this1[11]) - (this1[0] * this1[9] - this1[8] * this1[1]) * (this1[6] * this1[15] - this1[14] * this1[7]) + (this1[0] * this1[13] - this1[12] * this1[1]) * (this1[6] * this1[11] - this1[10] * this1[7]) + (this1[4] * this1[9] - this1[8] * this1[5]) * (this1[2] * this1[15] - this1[14] * this1[3]) - (this1[4] * this1[13] - this1[12] * this1[5]) * (this1[2] * this1[11] - this1[10] * this1[3]) + (this1[8] * this1[13] - this1[12] * this1[9]) * (this1[2] * this1[7] - this1[6] * this1[3]);
};
lime.math._Matrix4.Matrix4_Impl_.get_position = function(this1) {
	return new lime.math.Vector4(this1[12],this1[13],this1[14]);
};
lime.math._Matrix4.Matrix4_Impl_.set_position = function(this1,val) {
	this1[12] = val.x;
	this1[13] = val.y;
	this1[14] = val.z;
	return val;
};
lime.math._Matrix4.Matrix4_Impl_.get = function(this1,index) {
	return this1[index];
};
lime.math._Matrix4.Matrix4_Impl_.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
lime.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime.math.Rectangle;
lime.math.Rectangle.__name__ = true;
lime.math.Rectangle.prototype = {
	clone: function() {
		return new lime.math.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new lime.math.Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new lime.math.Rectangle();
		return new lime.math.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new lime.math.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		if(this.width == 0 || this.height == 0) return toUnion.clone(); else if(toUnion.width == 0 || toUnion.height == 0) return this.clone();
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new lime.math.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) this.x = x;
		if(this.y > y) this.y = y;
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new lime.math.Vector2(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new lime.math.Vector2(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new lime.math.Vector2(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: lime.math.Rectangle
};
lime.math.Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime.math.Vector2;
lime.math.Vector2.__name__ = true;
lime.math.Vector2.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
lime.math.Vector2.interpolate = function(pt1,pt2,f) {
	return new lime.math.Vector2(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
lime.math.Vector2.polar = function(len,angle) {
	return new lime.math.Vector2(len * Math.cos(angle),len * Math.sin(angle));
};
lime.math.Vector2.prototype = {
	add: function(v) {
		return new lime.math.Vector2(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new lime.math.Vector2(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new lime.math.Vector2(this.x - v.x,this.y - v.y);
	}
	,__toFlashPoint: function() {
		return null;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: lime.math.Vector2
};
lime.math.Vector4 = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["lime.math.Vector4"] = lime.math.Vector4;
lime.math.Vector4.__name__ = true;
lime.math.Vector4.angleBetween = function(a,b) {
	var a0 = new lime.math.Vector4(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new lime.math.Vector4(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
lime.math.Vector4.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
lime.math.Vector4.get_X_AXIS = function() {
	return new lime.math.Vector4(1,0,0);
};
lime.math.Vector4.get_Y_AXIS = function() {
	return new lime.math.Vector4(0,1,0);
};
lime.math.Vector4.get_Z_AXIS = function() {
	return new lime.math.Vector4(0,0,1);
};
lime.math.Vector4.prototype = {
	add: function(a) {
		return new lime.math.Vector4(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new lime.math.Vector4(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector4) {
		this.x = sourceVector4.x;
		this.y = sourceVector4.y;
		this.z = sourceVector4.z;
	}
	,crossProduct: function(a) {
		return new lime.math.Vector4(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,subtract: function(a) {
		return new lime.math.Vector4(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector4(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: lime.math.Vector4
};
lime.net = {};
lime.net.URLLoader = function(request) {
	this.onSecurityError = new lime.app.Event();
	this.onProgress = new lime.app.Event();
	this.onOpen = new lime.app.Event();
	this.onIOError = new lime.app.Event();
	this.onHTTPStatus = new lime.app.Event();
	this.onComplete = new lime.app.Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime.net.URLLoaderDataFormat.TEXT);
	this.__data = "";
	this.__curl = lime.net.curl.CURLEasy.init();
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime.net.URLLoader;
lime.net.URLLoader.__name__ = true;
lime.net.URLLoader.prototype = {
	close: function() {
		lime.net.curl.CURLEasy.cleanup(this.__curl);
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var _g = this;
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.__onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) {
				var listeners = self.onHTTPStatus.listeners;
				var repeat = self.onHTTPStatus.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](_g,s);
					if(!repeat[i]) {
						self.onHTTPStatus.remove(listeners[i]);
						length--;
					} else i++;
				}
			}
			if(s != null && s >= 200 && s < 400) self.__onData(subject.response); else if(s == null) {
				var listeners1 = self.onIOError.listeners;
				var repeat1 = self.onIOError.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](_g,"Failed to connect or resolve host");
					if(!repeat1[i1]) {
						self.onIOError.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
			} else if(s == 12029) {
				var listeners2 = self.onIOError.listeners;
				var repeat2 = self.onIOError.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](_g,"Failed to connect to host");
					if(!repeat2[i2]) {
						self.onIOError.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
			} else if(s == 12007) {
				var listeners3 = self.onIOError.listeners;
				var repeat3 = self.onIOError.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3](_g,"Unknown host");
					if(!repeat3[i3]) {
						self.onIOError.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
			} else if(s == 0) {
				var listeners4 = self.onIOError.listeners;
				var repeat4 = self.onIOError.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat4[i4]) {
						self.onIOError.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
				var listeners5 = self.onSecurityError.listeners;
				var repeat5 = self.onSecurityError.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat5[i5]) {
						self.onSecurityError.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
			} else {
				var listeners6 = self.onIOError.listeners;
				var repeat6 = self.onIOError.repeat;
				var length6 = listeners6.length;
				var i6 = 0;
				while(i6 < length6) {
					listeners6[i6](_g,"Http Error #" + subject.status);
					if(!repeat6[i6]) {
						self.onIOError.remove(listeners6[i6]);
						length6--;
					} else i6++;
				}
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,lime.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,lime.net.URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open("GET",url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(js.Boot.__cast(method , String),url,true);
		} catch( e ) {
			var listeners = this.onIOError.listeners;
			var repeat = this.onIOError.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this,e.toString());
				if(!repeat[i]) {
					this.onIOError.remove(listeners[i]);
					length--;
				} else i++;
			}
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		var listeners1 = this.onOpen.listeners;
		var repeat1 = this.onOpen.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](this);
			if(!repeat1[i1]) {
				this.onOpen.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,__onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var listeners = this.onComplete.listeners;
		var repeat = this.onComplete.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this);
			if(!repeat[i]) {
				this.onComplete.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,__onProgress: function(event) {
		this.bytesLoaded = event.loaded;
		this.bytesTotal = event.total;
		var listeners = this.onProgress.listeners;
		var repeat = this.onProgress.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this,this.bytesLoaded,this.bytesTotal);
			if(!repeat[i]) {
				this.onProgress.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == lime.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime.net.URLLoader
};
lime.net.URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
lime.net.URLLoaderDataFormat.BINARY.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
lime.net.URLLoaderDataFormat.TEXT.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime.net.URLLoaderDataFormat.VARIABLES.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime.net.URLRequest;
lime.net.URLRequest.__name__ = true;
lime.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,lime.utils.ByteArray)) {
			res = res.slice();
			res.push(new lime.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime.net.URLRequest
};
lime.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime.net.URLRequestHeader;
lime.net.URLRequestHeader.__name__ = true;
lime.net.URLRequestHeader.prototype = {
	__class__: lime.net.URLRequestHeader
};
lime.net._URLRequestMethod = {};
lime.net._URLRequestMethod.URLRequestMethod_Impl_ = function() { };
$hxClasses["lime.net._URLRequestMethod.URLRequestMethod_Impl_"] = lime.net._URLRequestMethod.URLRequestMethod_Impl_;
lime.net._URLRequestMethod.URLRequestMethod_Impl_.__name__ = true;
lime.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["lime.net.URLVariables"] = lime.net.URLVariables;
lime.net.URLVariables.__name__ = true;
lime.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g1 = 0;
		while(_g1 < fields1.length) {
			var f1 = fields1[_g1];
			++_g1;
			var eq = f1.indexOf("=");
			if(eq > 0) Reflect.setField(this,StringTools.urlDecode(HxOverrides.substr(f1,0,eq)),StringTools.urlDecode(HxOverrides.substr(f1,eq + 1,null))); else if(eq != 0) Reflect.setField(this,decodeURIComponent(f1.split("+").join(" ")),"");
		}
	}
	,toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(encodeURIComponent(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,__class__: lime.net.URLVariables
};
lime.net.curl = {};
lime.net.curl._CURL = {};
lime.net.curl._CURL.CURL_Impl_ = function() { };
$hxClasses["lime.net.curl._CURL.CURL_Impl_"] = lime.net.curl._CURL.CURL_Impl_;
lime.net.curl._CURL.CURL_Impl_.__name__ = true;
lime.net.curl._CURL.CURL_Impl_.getDate = function(date,now) {
	return 0;
};
lime.net.curl._CURL.CURL_Impl_.globalCleanup = function() {
};
lime.net.curl._CURL.CURL_Impl_.globalInit = function(flags) {
	return 0;
};
lime.net.curl._CURL.CURL_Impl_.version = function() {
	return null;
};
lime.net.curl._CURL.CURL_Impl_.versionInfo = function(type) {
	return null;
};
lime.net.curl._CURL.CURL_Impl_.intGt = function(a,b) {
	return a > b;
};
lime.net.curl._CURLCode = {};
lime.net.curl._CURLCode.CURLCode_Impl_ = function() { };
$hxClasses["lime.net.curl._CURLCode.CURLCode_Impl_"] = lime.net.curl._CURLCode.CURLCode_Impl_;
lime.net.curl._CURLCode.CURLCode_Impl_.__name__ = true;
lime.net.curl.CURLEasy = function() { };
$hxClasses["lime.net.curl.CURLEasy"] = lime.net.curl.CURLEasy;
lime.net.curl.CURLEasy.__name__ = true;
lime.net.curl.CURLEasy.cleanup = function(handle) {
};
lime.net.curl.CURLEasy.duphandle = function(handle) {
	return 0;
};
lime.net.curl.CURLEasy.escape = function(handle,url,length) {
	return null;
};
lime.net.curl.CURLEasy.getinfo = function(handle,info) {
	return null;
};
lime.net.curl.CURLEasy.init = function() {
	return 0;
};
lime.net.curl.CURLEasy.pause = function(handle,bitMask) {
	return 0;
};
lime.net.curl.CURLEasy.perform = function(handle) {
	return 0;
};
lime.net.curl.CURLEasy.reset = function(handle) {
	return 0;
};
lime.net.curl.CURLEasy.setopt = function(handle,option,parameter) {
	return 0;
};
lime.net.curl.CURLEasy.strerror = function(code) {
	return null;
};
lime.net.curl.CURLEasy.unescape = function(handle,url,inLength,outLength) {
	return null;
};
lime.net.curl._CURLInfo = {};
lime.net.curl._CURLInfo.CURLInfo_Impl_ = function() { };
$hxClasses["lime.net.curl._CURLInfo.CURLInfo_Impl_"] = lime.net.curl._CURLInfo.CURLInfo_Impl_;
lime.net.curl._CURLInfo.CURLInfo_Impl_.__name__ = true;
lime.net.curl._CURLOption = {};
lime.net.curl._CURLOption.CURLOption_Impl_ = function() { };
$hxClasses["lime.net.curl._CURLOption.CURLOption_Impl_"] = lime.net.curl._CURLOption.CURLOption_Impl_;
lime.net.curl._CURLOption.CURLOption_Impl_.__name__ = true;
lime.net.curl._CURLVersion = {};
lime.net.curl._CURLVersion.CURLVersion_Impl_ = function() { };
$hxClasses["lime.net.curl._CURLVersion.CURLVersion_Impl_"] = lime.net.curl._CURLVersion.CURLVersion_Impl_;
lime.net.curl._CURLVersion.CURLVersion_Impl_.__name__ = true;
lime.system = {};
lime.system.System = function() { };
$hxClasses["lime.system.System"] = lime.system.System;
lime.system.System.__name__ = true;
lime.system.System.embed = $hx_exports.lime.embed = function(elementName,width,height,background) {
	var element = null;
	if(elementName != null) element = window.document.getElementById(elementName); else element = window.document.createElement("div");
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = element;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.create();
};
lime.system.System.findHaxeLib = function(library) {
	return "";
};
lime.system.System.load = function(library,method,args,lazy) {
	if(lazy == null) lazy = false;
	if(args == null) args = 0;
	if(lime.system.System.disableCFFI) return Reflect.makeVarArgs(function(_) {
		return { };
	});
	if(lazy) {
	}
	var result = null;
	return result;
};
lime.system.System.sysName = function() {
	return null;
};
lime.system.System.tryLoad = function(name,library,func,args) {
	return null;
};
lime.system.System.loaderTrace = function(message) {
};
lime.ui = {};
lime.ui._KeyCode = {};
lime.ui._KeyCode.KeyCode_Impl_ = function() { };
$hxClasses["lime.ui._KeyCode.KeyCode_Impl_"] = lime.ui._KeyCode.KeyCode_Impl_;
lime.ui._KeyCode.KeyCode_Impl_.__name__ = true;
lime.ui.KeyEventManager = function() { };
$hxClasses["lime.ui.KeyEventManager"] = lime.ui.KeyEventManager;
lime.ui.KeyEventManager.__name__ = true;
lime.ui.KeyEventManager.create = function() {
	lime.ui.KeyEventManager.eventInfo = new lime.ui._KeyEventManager.KeyEventInfo();
	window.addEventListener("keydown",lime.ui.KeyEventManager.handleEvent,false);
	window.addEventListener("keyup",lime.ui.KeyEventManager.handleEvent,false);
};
lime.ui.KeyEventManager.convertKeyCode = function(keyCode) {
	if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
	switch(keyCode) {
	case 16:
		return 1073742049;
	case 17:
		return 1073742048;
	case 18:
		return 1073742050;
	case 20:
		return 1073741881;
	case 144:
		return 1073741907;
	case 37:
		return 1073741904;
	case 38:
		return 1073741906;
	case 39:
		return 1073741903;
	case 40:
		return 1073741905;
	case 45:
		return 1073741897;
	case 46:
		return 127;
	case 36:
		return 1073741898;
	case 35:
		return 1073741901;
	case 33:
		return 1073741899;
	case 34:
		return 1073741902;
	case 112:
		return 1073741882;
	case 113:
		return 1073741883;
	case 114:
		return 1073741884;
	case 115:
		return 1073741885;
	case 116:
		return 1073741886;
	case 117:
		return 1073741887;
	case 118:
		return 1073741888;
	case 119:
		return 1073741889;
	case 120:
		return 1073741890;
	case 121:
		return 1073741891;
	case 122:
		return 1073741892;
	case 123:
		return 1073741893;
	}
	return keyCode;
};
lime.ui.KeyEventManager.handleEvent = function(event) {
	var _g = event.keyCode;
	switch(_g) {
	case 32:case 37:case 38:case 39:case 40:
		event.preventDefault();
		break;
	}
	lime.ui.KeyEventManager.eventInfo.keyCode = lime.ui.KeyEventManager.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
	if(event.type == "keydown") lime.ui.KeyEventManager.eventInfo.type = 0; else lime.ui.KeyEventManager.eventInfo.type = 1;
	var _g1 = lime.ui.KeyEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime.ui.KeyEventManager.onKeyDown.listeners;
		var repeat = lime.ui.KeyEventManager.onKeyDown.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime.ui.KeyEventManager.eventInfo.keyCode,lime.ui.KeyEventManager.eventInfo.modifier);
			if(!repeat[i]) {
				lime.ui.KeyEventManager.onKeyDown.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime.ui.KeyEventManager.onKeyUp.listeners;
		var repeat1 = lime.ui.KeyEventManager.onKeyUp.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime.ui.KeyEventManager.eventInfo.keyCode,lime.ui.KeyEventManager.eventInfo.modifier);
			if(!repeat1[i1]) {
				lime.ui.KeyEventManager.onKeyUp.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	}
};
lime.ui._KeyEventManager = {};
lime.ui._KeyEventManager.KeyEventInfo = function(type,keyCode,modifier) {
	if(modifier == null) modifier = 0;
	if(keyCode == null) keyCode = 0;
	this.type = type;
	this.keyCode = keyCode;
	this.modifier = modifier;
};
$hxClasses["lime.ui._KeyEventManager.KeyEventInfo"] = lime.ui._KeyEventManager.KeyEventInfo;
lime.ui._KeyEventManager.KeyEventInfo.__name__ = true;
lime.ui._KeyEventManager.KeyEventInfo.prototype = {
	clone: function() {
		return new lime.ui._KeyEventManager.KeyEventInfo(this.type,this.keyCode,this.modifier);
	}
	,__class__: lime.ui._KeyEventManager.KeyEventInfo
};
lime.ui._KeyEventManager.KeyEventType_Impl_ = function() { };
$hxClasses["lime.ui._KeyEventManager.KeyEventType_Impl_"] = lime.ui._KeyEventManager.KeyEventType_Impl_;
lime.ui._KeyEventManager.KeyEventType_Impl_.__name__ = true;
lime.ui.MouseEventManager = function() { };
$hxClasses["lime.ui.MouseEventManager"] = lime.ui.MouseEventManager;
lime.ui.MouseEventManager.__name__ = true;
lime.ui.MouseEventManager.create = function() {
	lime.ui.MouseEventManager.eventInfo = new lime.ui._MouseEventManager.MouseEventInfo();
};
lime.ui.MouseEventManager.handleEvent = function(event) {
	var _g = event.type;
	switch(_g) {
	case "mousedown":
		lime.ui.MouseEventManager.eventInfo.type = 0;
		break;
	case "mouseup":
		lime.ui.MouseEventManager.eventInfo.type = 1;
		break;
	case "mousemove":
		lime.ui.MouseEventManager.eventInfo.type = 2;
		break;
	case "wheel":
		lime.ui.MouseEventManager.eventInfo.type = 3;
		break;
	default:
		lime.ui.MouseEventManager.eventInfo.type = null;
	}
	if(lime.ui.MouseEventManager.eventInfo.type != 3) {
		if(lime.ui.MouseEventManager.window != null && lime.ui.MouseEventManager.window.element != null) {
			if(lime.ui.MouseEventManager.window.canvas != null) {
				var rect = lime.ui.MouseEventManager.window.canvas.getBoundingClientRect();
				lime.ui.MouseEventManager.eventInfo.x = (event.clientX - rect.left) * (lime.ui.MouseEventManager.window.width / rect.width);
				lime.ui.MouseEventManager.eventInfo.y = (event.clientY - rect.top) * (lime.ui.MouseEventManager.window.height / rect.height);
			} else if(lime.ui.MouseEventManager.window.div != null) {
				var rect1 = lime.ui.MouseEventManager.window.div.getBoundingClientRect();
				lime.ui.MouseEventManager.eventInfo.x = event.clientX - rect1.left;
				lime.ui.MouseEventManager.eventInfo.y = event.clientY - rect1.top;
			} else {
				var rect2 = lime.ui.MouseEventManager.window.element.getBoundingClientRect();
				lime.ui.MouseEventManager.eventInfo.x = (event.clientX - rect2.left) * (lime.ui.MouseEventManager.window.width / rect2.width);
				lime.ui.MouseEventManager.eventInfo.y = (event.clientY - rect2.top) * (lime.ui.MouseEventManager.window.height / rect2.height);
			}
		} else {
			lime.ui.MouseEventManager.eventInfo.x = event.clientX;
			lime.ui.MouseEventManager.eventInfo.y = event.clientY;
		}
	} else {
		lime.ui.MouseEventManager.eventInfo.x = event.deltaX;
		lime.ui.MouseEventManager.eventInfo.y = event.deltaY;
	}
	lime.ui.MouseEventManager.eventInfo.button = event.button;
	var _g1 = lime.ui.MouseEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime.ui.MouseEventManager.onMouseDown.listeners;
		var repeat = lime.ui.MouseEventManager.onMouseDown.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime.ui.MouseEventManager.eventInfo.x,lime.ui.MouseEventManager.eventInfo.y,lime.ui.MouseEventManager.eventInfo.button);
			if(!repeat[i]) {
				lime.ui.MouseEventManager.onMouseDown.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime.ui.MouseEventManager.onMouseUp.listeners;
		var repeat1 = lime.ui.MouseEventManager.onMouseUp.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime.ui.MouseEventManager.eventInfo.x,lime.ui.MouseEventManager.eventInfo.y,lime.ui.MouseEventManager.eventInfo.button);
			if(!repeat1[i1]) {
				lime.ui.MouseEventManager.onMouseUp.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	case 2:
		var listeners2 = lime.ui.MouseEventManager.onMouseMove.listeners;
		var repeat2 = lime.ui.MouseEventManager.onMouseMove.repeat;
		var length2 = listeners2.length;
		var i2 = 0;
		while(i2 < length2) {
			listeners2[i2](lime.ui.MouseEventManager.eventInfo.x,lime.ui.MouseEventManager.eventInfo.y,lime.ui.MouseEventManager.eventInfo.button);
			if(!repeat2[i2]) {
				lime.ui.MouseEventManager.onMouseMove.remove(listeners2[i2]);
				length2--;
			} else i2++;
		}
		break;
	case 3:
		var listeners3 = lime.ui.MouseEventManager.onMouseWheel.listeners;
		var repeat3 = lime.ui.MouseEventManager.onMouseWheel.repeat;
		var length3 = listeners3.length;
		var i3 = 0;
		while(i3 < length3) {
			listeners3[i3](lime.ui.MouseEventManager.eventInfo.x,lime.ui.MouseEventManager.eventInfo.y);
			if(!repeat3[i3]) {
				lime.ui.MouseEventManager.onMouseWheel.remove(listeners3[i3]);
				length3--;
			} else i3++;
		}
		break;
	}
};
lime.ui.MouseEventManager.registerWindow = function(_window) {
	var events = ["mousedown","mousemove","mouseup","wheel"];
	var _g = 0;
	while(_g < events.length) {
		var event = events[_g];
		++_g;
		_window.element.addEventListener(event,lime.ui.MouseEventManager.handleEvent,true);
	}
	lime.ui.MouseEventManager.window = _window;
	window.document.addEventListener("dragstart",function(e) {
		if(e.target.nodeName.toLowerCase() == "img") {
			e.preventDefault();
			return false;
		}
		return true;
	},false);
};
lime.ui._MouseEventManager = {};
lime.ui._MouseEventManager.MouseEventInfo = function(type,x,y,button) {
	if(button == null) button = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.type = type;
	this.x = x;
	this.y = y;
	this.button = button;
};
$hxClasses["lime.ui._MouseEventManager.MouseEventInfo"] = lime.ui._MouseEventManager.MouseEventInfo;
lime.ui._MouseEventManager.MouseEventInfo.__name__ = true;
lime.ui._MouseEventManager.MouseEventInfo.prototype = {
	clone: function() {
		return new lime.ui._MouseEventManager.MouseEventInfo(this.type,this.x,this.y,this.button);
	}
	,__class__: lime.ui._MouseEventManager.MouseEventInfo
};
lime.ui._MouseEventManager.MouseEventType_Impl_ = function() { };
$hxClasses["lime.ui._MouseEventManager.MouseEventType_Impl_"] = lime.ui._MouseEventManager.MouseEventType_Impl_;
lime.ui._MouseEventManager.MouseEventType_Impl_.__name__ = true;
lime.ui.TouchEventManager = function() { };
$hxClasses["lime.ui.TouchEventManager"] = lime.ui.TouchEventManager;
lime.ui.TouchEventManager.__name__ = true;
lime.ui.TouchEventManager.create = function() {
	lime.ui.TouchEventManager.eventInfo = new lime.ui._TouchEventManager.TouchEventInfo();
};
lime.ui.TouchEventManager.handleEvent = function(event) {
	event.preventDefault();
	var _g = event.type;
	switch(_g) {
	case "touchstart":
		lime.ui.TouchEventManager.eventInfo.type = 0;
		break;
	case "touchmove":
		lime.ui.TouchEventManager.eventInfo.type = 2;
		break;
	case "touchend":
		lime.ui.TouchEventManager.eventInfo.type = 1;
		break;
	default:
		lime.ui.TouchEventManager.eventInfo.type = null;
	}
	var touch = event.changedTouches[0];
	lime.ui.TouchEventManager.eventInfo.id = touch.identifier;
	if(lime.ui.TouchEventManager.window != null && lime.ui.TouchEventManager.window.element != null) {
		if(lime.ui.TouchEventManager.window.canvas != null) {
			var rect = lime.ui.TouchEventManager.window.canvas.getBoundingClientRect();
			lime.ui.TouchEventManager.eventInfo.x = (touch.clientX - rect.left) * (lime.ui.TouchEventManager.window.width / rect.width);
			lime.ui.TouchEventManager.eventInfo.y = (touch.clientY - rect.top) * (lime.ui.TouchEventManager.window.height / rect.height);
		} else if(lime.ui.TouchEventManager.window.div != null) {
			var rect1 = lime.ui.TouchEventManager.window.div.getBoundingClientRect();
			lime.ui.TouchEventManager.eventInfo.x = touch.clientX - rect1.left;
			lime.ui.TouchEventManager.eventInfo.y = touch.clientY - rect1.top;
		} else {
			var rect2 = lime.ui.TouchEventManager.window.element.getBoundingClientRect();
			lime.ui.TouchEventManager.eventInfo.x = (touch.clientX - rect2.left) * (lime.ui.TouchEventManager.window.width / rect2.width);
			lime.ui.TouchEventManager.eventInfo.y = (touch.clientY - rect2.top) * (lime.ui.TouchEventManager.window.height / rect2.height);
		}
	} else {
		lime.ui.TouchEventManager.eventInfo.x = touch.clientX;
		lime.ui.TouchEventManager.eventInfo.y = touch.clientY;
	}
	var _g1 = lime.ui.TouchEventManager.eventInfo.type;
	switch(_g1) {
	case 0:
		var listeners = lime.ui.TouchEventManager.onTouchStart.listeners;
		var repeat = lime.ui.TouchEventManager.onTouchStart.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](lime.ui.TouchEventManager.eventInfo.x,lime.ui.TouchEventManager.eventInfo.y,lime.ui.TouchEventManager.eventInfo.id);
			if(!repeat[i]) {
				lime.ui.TouchEventManager.onTouchStart.remove(listeners[i]);
				length--;
			} else i++;
		}
		break;
	case 1:
		var listeners1 = lime.ui.TouchEventManager.onTouchEnd.listeners;
		var repeat1 = lime.ui.TouchEventManager.onTouchEnd.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](lime.ui.TouchEventManager.eventInfo.x,lime.ui.TouchEventManager.eventInfo.y,lime.ui.TouchEventManager.eventInfo.id);
			if(!repeat1[i1]) {
				lime.ui.TouchEventManager.onTouchEnd.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		break;
	case 2:
		var listeners2 = lime.ui.TouchEventManager.onTouchMove.listeners;
		var repeat2 = lime.ui.TouchEventManager.onTouchMove.repeat;
		var length2 = listeners2.length;
		var i2 = 0;
		while(i2 < length2) {
			listeners2[i2](lime.ui.TouchEventManager.eventInfo.x,lime.ui.TouchEventManager.eventInfo.y,lime.ui.TouchEventManager.eventInfo.id);
			if(!repeat2[i2]) {
				lime.ui.TouchEventManager.onTouchMove.remove(listeners2[i2]);
				length2--;
			} else i2++;
		}
		break;
	}
};
lime.ui.TouchEventManager.registerWindow = function(window) {
	window.element.addEventListener("touchstart",lime.ui.TouchEventManager.handleEvent,true);
	window.element.addEventListener("touchmove",lime.ui.TouchEventManager.handleEvent,true);
	window.element.addEventListener("touchend",lime.ui.TouchEventManager.handleEvent,true);
	lime.ui.TouchEventManager.window = window;
};
lime.ui._TouchEventManager = {};
lime.ui._TouchEventManager.TouchEventInfo = function(type,x,y,id) {
	if(id == null) id = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.type = type;
	this.x = x;
	this.y = y;
	this.id = id;
};
$hxClasses["lime.ui._TouchEventManager.TouchEventInfo"] = lime.ui._TouchEventManager.TouchEventInfo;
lime.ui._TouchEventManager.TouchEventInfo.__name__ = true;
lime.ui._TouchEventManager.TouchEventInfo.prototype = {
	clone: function() {
		return new lime.ui._TouchEventManager.TouchEventInfo(this.type,this.x,this.y,this.id);
	}
	,__class__: lime.ui._TouchEventManager.TouchEventInfo
};
lime.ui._TouchEventManager.TouchEventType_Impl_ = function() { };
$hxClasses["lime.ui._TouchEventManager.TouchEventType_Impl_"] = lime.ui._TouchEventManager.TouchEventType_Impl_;
lime.ui._TouchEventManager.TouchEventType_Impl_.__name__ = true;
lime.ui._Window = {};
lime.ui._Window.WindowEventInfo = function(type,width,height,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.ui._Window.WindowEventInfo"] = lime.ui._Window.WindowEventInfo;
lime.ui._Window.WindowEventInfo.__name__ = true;
lime.ui._Window.WindowEventInfo.prototype = {
	clone: function() {
		return new lime.ui._Window.WindowEventInfo(this.type,this.width,this.height,this.x,this.y);
	}
	,__class__: lime.ui._Window.WindowEventInfo
};
lime.ui.Window = function(config) {
	this.config = config;
	if(!lime.ui.Window.registered) lime.ui.Window.registered = true;
};
$hxClasses["lime.ui.Window"] = lime.ui.Window;
lime.ui.Window.__name__ = true;
lime.ui.Window.prototype = {
	create: function(application) {
		this.setWidth = this.width;
		this.setHeight = this.height;
		if(js.Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.div = window.document.createElement("div");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.width == 0 && this.height == 0) {
			if(this.element != null) {
				this.width = this.element.clientWidth;
				this.height = this.element.clientHeight;
			} else {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			}
			this.fullscreen = true;
		}
		if(this.canvas != null) {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		} else {
			this.div.style.width = this.width + "px";
			this.div.style.height = this.height + "px";
		}
		this.handleDOMResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
		}
		lime.ui.MouseEventManager.registerWindow(this);
		lime.ui.TouchEventManager.registerWindow(this);
		window.addEventListener("focus",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("blur",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("resize",$bind(this,this.handleDOMEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleDOMEvent),false);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,dispatch: function() {
		var _g = lime.ui.Window.eventInfo.type;
		switch(_g) {
		case 0:
			var listeners = lime.ui.Window.onWindowActivate.listeners;
			var repeat = lime.ui.Window.onWindowActivate.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					lime.ui.Window.onWindowActivate.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case 1:
			var listeners1 = lime.ui.Window.onWindowClose.listeners;
			var repeat1 = lime.ui.Window.onWindowClose.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1]();
				if(!repeat1[i1]) {
					lime.ui.Window.onWindowClose.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case 2:
			var listeners2 = lime.ui.Window.onWindowDeactivate.listeners;
			var repeat2 = lime.ui.Window.onWindowDeactivate.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2]();
				if(!repeat2[i2]) {
					lime.ui.Window.onWindowDeactivate.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		case 3:
			var listeners3 = lime.ui.Window.onWindowFocusIn.listeners;
			var repeat3 = lime.ui.Window.onWindowFocusIn.repeat;
			var length3 = listeners3.length;
			var i3 = 0;
			while(i3 < length3) {
				listeners3[i3]();
				if(!repeat3[i3]) {
					lime.ui.Window.onWindowFocusIn.remove(listeners3[i3]);
					length3--;
				} else i3++;
			}
			break;
		case 4:
			var listeners4 = lime.ui.Window.onWindowFocusOut.listeners;
			var repeat4 = lime.ui.Window.onWindowFocusOut.repeat;
			var length4 = listeners4.length;
			var i4 = 0;
			while(i4 < length4) {
				listeners4[i4]();
				if(!repeat4[i4]) {
					lime.ui.Window.onWindowFocusOut.remove(listeners4[i4]);
					length4--;
				} else i4++;
			}
			break;
		case 5:
			this.x = lime.ui.Window.eventInfo.x;
			this.y = lime.ui.Window.eventInfo.y;
			var listeners5 = lime.ui.Window.onWindowMove.listeners;
			var repeat5 = lime.ui.Window.onWindowMove.repeat;
			var length5 = listeners5.length;
			var i5 = 0;
			while(i5 < length5) {
				listeners5[i5](lime.ui.Window.eventInfo.x,lime.ui.Window.eventInfo.y);
				if(!repeat5[i5]) {
					lime.ui.Window.onWindowMove.remove(listeners5[i5]);
					length5--;
				} else i5++;
			}
			break;
		case 6:
			this.width = lime.ui.Window.eventInfo.width;
			this.height = lime.ui.Window.eventInfo.height;
			var listeners6 = lime.ui.Window.onWindowResize.listeners;
			var repeat6 = lime.ui.Window.onWindowResize.repeat;
			var length6 = listeners6.length;
			var i6 = 0;
			while(i6 < length6) {
				listeners6[i6](lime.ui.Window.eventInfo.width,lime.ui.Window.eventInfo.height);
				if(!repeat6[i6]) {
					lime.ui.Window.onWindowResize.remove(listeners6[i6]);
					length6--;
				} else i6++;
			}
			break;
		}
	}
	,handleDOMEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "focus":
			lime.ui.Window.eventInfo.type = 3;
			this.dispatch();
			lime.ui.Window.eventInfo.type = 0;
			this.dispatch();
			break;
		case "blur":
			lime.ui.Window.eventInfo.type = 4;
			this.dispatch();
			lime.ui.Window.eventInfo.type = 2;
			this.dispatch();
			break;
		case "resize":
			var cacheWidth = this.width;
			var cacheHeight = this.height;
			this.handleDOMResize();
			if(this.width != cacheWidth || this.height != cacheHeight) {
				lime.ui.Window.eventInfo.type = 6;
				lime.ui.Window.eventInfo.width = this.width;
				lime.ui.Window.eventInfo.height = this.height;
				this.dispatch();
			}
			break;
		case "beforeunload":
			lime.ui.Window.eventInfo.type = 1;
			this.dispatch();
			break;
		}
	}
	,handleDOMResize: function() {
		var stretch = this.fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.width != this.element.clientWidth || this.height != this.element.clientHeight) {
					this.width = this.element.clientWidth;
					this.height = this.element.clientHeight;
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,move: function(x,y) {
	}
	,resize: function(width,height) {
		this.setWidth = width;
		this.setHeight = height;
	}
	,__class__: lime.ui.Window
};
lime.ui._Window.WindowFlags_Impl_ = function() { };
$hxClasses["lime.ui._Window.WindowFlags_Impl_"] = lime.ui._Window.WindowFlags_Impl_;
lime.ui._Window.WindowFlags_Impl_.__name__ = true;
lime.ui._Window.WindowEventType_Impl_ = function() { };
$hxClasses["lime.ui._Window.WindowEventType_Impl_"] = lime.ui._Window.WindowEventType_Impl_;
lime.ui._Window.WindowEventType_Impl_.__name__ = true;
lime.utils = {};
lime.utils.ByteArray = function(size) {
	if(size == null) size = 0;
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime.utils.ByteArray;
lime.utils.ByteArray.__name__ = true;
lime.utils.ByteArray.fromBytes = function(bytes) {
	var result = new lime.utils.ByteArray();
	result.byteView = new Uint8Array(bytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
};
lime.utils.ByteArray.readFile = function(path) {
	return null;
};
lime.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime.utils.ByteArray.prototype = {
	clear: function() {
		if(this.allocated < 0) this.___resizeBuffer(this.allocated = Std["int"](Math.max(0,this.allocated * 2))); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
		this.position = 0;
	}
	,compress: function(algorithm) {
	}
	,deflate: function() {
		this.compress(lime.utils.CompressionAlgorithm.DEFLATE);
	}
	,inflate: function() {
		this.uncompress(lime.utils.CompressionAlgorithm.DEFLATE);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,readByte: function() {
		var data = this.data;
		return data.getInt8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(offset < 0 || length < 0) throw "Read error - Out of bounds";
		if(length == 0) length = this.length - this.position;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = Std["int"](Math.max(lengthToEnsure,bytes.allocated * 2))); else if(bytes.allocated > lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readMultiByte: function(length,charSet) {
		return this.readUTFBytes(length);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,uncompress: function(algorithm) {
		haxe.Log.trace("Warning: ByteArray.uncompress on JS target requires the 'format' haxelib",{ fileName : "ByteArray.hx", lineNumber : 650, className : "lime.utils.ByteArray", methodName : "uncompress"});
	}
	,write_uncheck: function($byte) {
		__dollar__sset(b,this.position++,$byte & 255);
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(bytes.length == 0) return;
		if((function($this) {
			var $r;
			var aNeg = 0 < 0;
			var bNeg = offset < 0;
			$r = aNeg != bNeg?aNeg:0 > offset;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var aNeg1 = 0 < 0;
			var bNeg1 = length < 0;
			$r = aNeg1 != bNeg1?aNeg1:0 > length;
			return $r;
		}(this))) throw "Write error - Out of bounds";
		if((function($this) {
			var $r;
			var $int = length;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 0) length = bytes.length;
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position = this.position + length;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFile: function(path) {
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this.__getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__fromBytes: function(bytes) {
		this.byteView = new Uint8Array(bytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,__get: function(pos) {
		return this.data.getInt8(pos);
	}
	,__getBuffer: function() {
		return this.data.buffer;
	}
	,__getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime.utils.ByteArray
};
lime.utils.CompressionAlgorithm = $hxClasses["lime.utils.CompressionAlgorithm"] = { __ename__ : true, __constructs__ : ["DEFLATE","ZLIB","LZMA","GZIP"] };
lime.utils.CompressionAlgorithm.DEFLATE = ["DEFLATE",0];
lime.utils.CompressionAlgorithm.DEFLATE.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.ZLIB = ["ZLIB",1];
lime.utils.CompressionAlgorithm.ZLIB.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.LZMA = ["LZMA",2];
lime.utils.CompressionAlgorithm.LZMA.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.CompressionAlgorithm.GZIP = ["GZIP",3];
lime.utils.CompressionAlgorithm.GZIP.__enum__ = lime.utils.CompressionAlgorithm;
lime.utils.GLUtils = function() { };
$hxClasses["lime.utils.GLUtils"] = lime.utils.GLUtils;
lime.utils.GLUtils.__name__ = true;
lime.utils.GLUtils.compileShader = function(source,type) {
	var shader = lime.graphics.opengl.GL.context.createShader(type);
	lime.graphics.opengl.GL.context.shaderSource(shader,source);
	lime.graphics.opengl.GL.context.compileShader(shader);
	if(lime.graphics.opengl.GL.context.getShaderParameter(shader,35713) == 0) switch(type) {
	case 35633:
		throw "Error compiling vertex shader";
		break;
	case 35632:
		throw "Error compiling fragment shader";
		break;
	default:
		throw "Error compiling unknown shader type";
	}
	return shader;
};
lime.utils.GLUtils.createProgram = function(vertexSource,fragmentSource) {
	var vertexShader = lime.utils.GLUtils.compileShader(vertexSource,35633);
	var fragmentShader = lime.utils.GLUtils.compileShader(fragmentSource,35632);
	var program = lime.graphics.opengl.GL.context.createProgram();
	lime.graphics.opengl.GL.context.attachShader(program,vertexShader);
	lime.graphics.opengl.GL.context.attachShader(program,fragmentShader);
	lime.graphics.opengl.GL.context.linkProgram(program);
	if(lime.graphics.opengl.GL.context.getProgramParameter(program,35714) == 0) throw "Unable to initialize the shader program.";
	return program;
};
lime.utils.IDataInput = function() { };
$hxClasses["lime.utils.IDataInput"] = lime.utils.IDataInput;
lime.utils.IDataInput.__name__ = true;
lime.utils.IDataInput.prototype = {
	__class__: lime.utils.IDataInput
};
lime.utils.IMemoryRange = function() { };
$hxClasses["lime.utils.IMemoryRange"] = lime.utils.IMemoryRange;
lime.utils.IMemoryRange.__name__ = true;
lime.utils.IMemoryRange.prototype = {
	__class__: lime.utils.IMemoryRange
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var this1;
this1 = new Array(256);
lime.graphics.utils.ImageDataUtil.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	lime.graphics.utils.ImageDataUtil.__alpha16[i] = i * 65536 / 255 | 0;
}
var this2;
this2 = new Array(510);
lime.graphics.utils.ImageDataUtil.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime.graphics.utils.ImageDataUtil.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime.graphics.utils.ImageDataUtil.__clamp[i2] = 255;
}
lime.graphics.Image.__base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
ImageExtended.FG_COLOR = -16777216;
ImageExtended.BG_COLOR = -4608;
lime.app.Application.onUpdate = new lime.app.Event();
lime.app.Application.__eventInfo = new lime.app._Application.UpdateEventInfo();
js.Boot.__toStr = {}.toString;
lime.Assets.cache = new lime.AssetCache();
lime.Assets.libraries = new haxe.ds.StringMap();
lime.Assets.initialized = false;
lime._Assets.AssetType_Impl_.BINARY = "BINARY";
lime._Assets.AssetType_Impl_.FONT = "FONT";
lime._Assets.AssetType_Impl_.IMAGE = "IMAGE";
lime._Assets.AssetType_Impl_.MUSIC = "MUSIC";
lime._Assets.AssetType_Impl_.SOUND = "SOUND";
lime._Assets.AssetType_Impl_.TEMPLATE = "TEMPLATE";
lime._Assets.AssetType_Impl_.TEXT = "TEXT";
lime.app._Application.UpdateEventType_Impl_.UPDATE = 0;
lime.app.Preloader.images = new haxe.ds.StringMap();
lime.app.Preloader.loaders = new haxe.ds.StringMap();
lime.audio.openal.AL.NONE = 0;
lime.audio.openal.AL.FALSE = 0;
lime.audio.openal.AL.TRUE = 1;
lime.audio.openal.AL.SOURCE_RELATIVE = 514;
lime.audio.openal.AL.CONE_INNER_ANGLE = 4097;
lime.audio.openal.AL.CONE_OUTER_ANGLE = 4098;
lime.audio.openal.AL.PITCH = 4099;
lime.audio.openal.AL.POSITION = 4100;
lime.audio.openal.AL.DIRECTION = 4101;
lime.audio.openal.AL.VELOCITY = 4102;
lime.audio.openal.AL.LOOPING = 4103;
lime.audio.openal.AL.BUFFER = 4105;
lime.audio.openal.AL.GAIN = 4106;
lime.audio.openal.AL.MIN_GAIN = 4109;
lime.audio.openal.AL.MAX_GAIN = 4110;
lime.audio.openal.AL.ORIENTATION = 4111;
lime.audio.openal.AL.SOURCE_STATE = 4112;
lime.audio.openal.AL.INITIAL = 4113;
lime.audio.openal.AL.PLAYING = 4114;
lime.audio.openal.AL.PAUSED = 4115;
lime.audio.openal.AL.STOPPED = 4116;
lime.audio.openal.AL.BUFFERS_QUEUED = 4117;
lime.audio.openal.AL.BUFFERS_PROCESSED = 4118;
lime.audio.openal.AL.REFERENCE_DISTANCE = 4128;
lime.audio.openal.AL.ROLLOFF_FACTOR = 4129;
lime.audio.openal.AL.CONE_OUTER_GAIN = 4130;
lime.audio.openal.AL.MAX_DISTANCE = 4131;
lime.audio.openal.AL.SEC_OFFSET = 4132;
lime.audio.openal.AL.SAMPLE_OFFSET = 4133;
lime.audio.openal.AL.BYTE_OFFSET = 4134;
lime.audio.openal.AL.SOURCE_TYPE = 4135;
lime.audio.openal.AL.STATIC = 4136;
lime.audio.openal.AL.STREAMING = 4137;
lime.audio.openal.AL.UNDETERMINED = 4144;
lime.audio.openal.AL.FORMAT_MONO8 = 4352;
lime.audio.openal.AL.FORMAT_MONO16 = 4353;
lime.audio.openal.AL.FORMAT_STEREO8 = 4354;
lime.audio.openal.AL.FORMAT_STEREO16 = 4355;
lime.audio.openal.AL.FREQUENCY = 8193;
lime.audio.openal.AL.BITS = 8194;
lime.audio.openal.AL.CHANNELS = 8195;
lime.audio.openal.AL.SIZE = 8196;
lime.audio.openal.AL.NO_ERROR = 0;
lime.audio.openal.AL.INVALID_NAME = 40961;
lime.audio.openal.AL.INVALID_ENUM = 40962;
lime.audio.openal.AL.INVALID_VALUE = 40963;
lime.audio.openal.AL.INVALID_OPERATION = 40964;
lime.audio.openal.AL.OUT_OF_MEMORY = 40965;
lime.audio.openal.AL.VENDOR = 45057;
lime.audio.openal.AL.VERSION = 45058;
lime.audio.openal.AL.RENDERER = 45059;
lime.audio.openal.AL.EXTENSIONS = 45060;
lime.audio.openal.AL.DOPPLER_FACTOR = 49152;
lime.audio.openal.AL.SPEED_OF_SOUND = 49155;
lime.audio.openal.AL.DOPPLER_VELOCITY = 49153;
lime.audio.openal.AL.DISTANCE_MODEL = 53248;
lime.audio.openal.AL.INVERSE_DISTANCE = 53249;
lime.audio.openal.AL.INVERSE_DISTANCE_CLAMPED = 53250;
lime.audio.openal.AL.LINEAR_DISTANCE = 53251;
lime.audio.openal.AL.LINEAR_DISTANCE_CLAMPED = 53252;
lime.audio.openal.AL.EXPONENT_DISTANCE = 53253;
lime.audio.openal.AL.EXPONENT_DISTANCE_CLAMPED = 53254;
lime.audio.openal.ALC.FALSE = 0;
lime.audio.openal.ALC.TRUE = 1;
lime.audio.openal.ALC.FREQUENCY = 4103;
lime.audio.openal.ALC.REFRESH = 4104;
lime.audio.openal.ALC.SYNC = 4105;
lime.audio.openal.ALC.MONO_SOURCES = 4112;
lime.audio.openal.ALC.STEREO_SOURCES = 4113;
lime.audio.openal.ALC.NO_ERROR = 0;
lime.audio.openal.ALC.INVALID_DEVICE = 40961;
lime.audio.openal.ALC.INVALID_CONTEXT = 40962;
lime.audio.openal.ALC.INVALID_ENUM = 40963;
lime.audio.openal.ALC.INVALID_VALUE = 40964;
lime.audio.openal.ALC.OUT_OF_MEMORY = 40965;
lime.audio.openal.ALC.ATTRIBUTES_SIZE = 4098;
lime.audio.openal.ALC.ALL_ATTRIBUTES = 4099;
lime.audio.openal.ALC.DEFAULT_DEVICE_SPECIFIER = 4100;
lime.audio.openal.ALC.DEVICE_SPECIFIER = 4101;
lime.audio.openal.ALC.EXTENSIONS = 4102;
lime.audio.openal.ALC.ENUMERATE_ALL_EXT = 1;
lime.audio.openal.ALC.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
lime.audio.openal.ALC.ALL_DEVICES_SPECIFIER = 4115;
lime.graphics.Renderer.onRenderContextLost = new lime.app.Event();
lime.graphics.Renderer.onRenderContextRestored = new lime.app.Event();
lime.graphics.Renderer.onRender = new lime.app.Event();
lime.graphics.Renderer.eventInfo = new lime.graphics._Renderer.RenderEventInfo(0);
lime.graphics._Renderer.RenderEventType_Impl_.RENDER = 0;
lime.graphics._Renderer.RenderEventType_Impl_.RENDER_CONTEXT_LOST = 1;
lime.graphics._Renderer.RenderEventType_Impl_.RENDER_CONTEXT_RESTORED = 2;
lime.graphics.opengl.GL.DEPTH_BUFFER_BIT = 256;
lime.graphics.opengl.GL.STENCIL_BUFFER_BIT = 1024;
lime.graphics.opengl.GL.COLOR_BUFFER_BIT = 16384;
lime.graphics.opengl.GL.POINTS = 0;
lime.graphics.opengl.GL.LINES = 1;
lime.graphics.opengl.GL.LINE_LOOP = 2;
lime.graphics.opengl.GL.LINE_STRIP = 3;
lime.graphics.opengl.GL.TRIANGLES = 4;
lime.graphics.opengl.GL.TRIANGLE_STRIP = 5;
lime.graphics.opengl.GL.TRIANGLE_FAN = 6;
lime.graphics.opengl.GL.ZERO = 0;
lime.graphics.opengl.GL.ONE = 1;
lime.graphics.opengl.GL.SRC_COLOR = 768;
lime.graphics.opengl.GL.ONE_MINUS_SRC_COLOR = 769;
lime.graphics.opengl.GL.SRC_ALPHA = 770;
lime.graphics.opengl.GL.ONE_MINUS_SRC_ALPHA = 771;
lime.graphics.opengl.GL.DST_ALPHA = 772;
lime.graphics.opengl.GL.ONE_MINUS_DST_ALPHA = 773;
lime.graphics.opengl.GL.DST_COLOR = 774;
lime.graphics.opengl.GL.ONE_MINUS_DST_COLOR = 775;
lime.graphics.opengl.GL.SRC_ALPHA_SATURATE = 776;
lime.graphics.opengl.GL.FUNC_ADD = 32774;
lime.graphics.opengl.GL.BLEND_EQUATION = 32777;
lime.graphics.opengl.GL.BLEND_EQUATION_RGB = 32777;
lime.graphics.opengl.GL.BLEND_EQUATION_ALPHA = 34877;
lime.graphics.opengl.GL.FUNC_SUBTRACT = 32778;
lime.graphics.opengl.GL.FUNC_REVERSE_SUBTRACT = 32779;
lime.graphics.opengl.GL.BLEND_DST_RGB = 32968;
lime.graphics.opengl.GL.BLEND_SRC_RGB = 32969;
lime.graphics.opengl.GL.BLEND_DST_ALPHA = 32970;
lime.graphics.opengl.GL.BLEND_SRC_ALPHA = 32971;
lime.graphics.opengl.GL.CONSTANT_COLOR = 32769;
lime.graphics.opengl.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
lime.graphics.opengl.GL.CONSTANT_ALPHA = 32771;
lime.graphics.opengl.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
lime.graphics.opengl.GL.BLEND_COLOR = 32773;
lime.graphics.opengl.GL.ARRAY_BUFFER = 34962;
lime.graphics.opengl.GL.ELEMENT_ARRAY_BUFFER = 34963;
lime.graphics.opengl.GL.ARRAY_BUFFER_BINDING = 34964;
lime.graphics.opengl.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
lime.graphics.opengl.GL.STREAM_DRAW = 35040;
lime.graphics.opengl.GL.STATIC_DRAW = 35044;
lime.graphics.opengl.GL.DYNAMIC_DRAW = 35048;
lime.graphics.opengl.GL.BUFFER_SIZE = 34660;
lime.graphics.opengl.GL.BUFFER_USAGE = 34661;
lime.graphics.opengl.GL.CURRENT_VERTEX_ATTRIB = 34342;
lime.graphics.opengl.GL.FRONT = 1028;
lime.graphics.opengl.GL.BACK = 1029;
lime.graphics.opengl.GL.FRONT_AND_BACK = 1032;
lime.graphics.opengl.GL.CULL_FACE = 2884;
lime.graphics.opengl.GL.BLEND = 3042;
lime.graphics.opengl.GL.DITHER = 3024;
lime.graphics.opengl.GL.STENCIL_TEST = 2960;
lime.graphics.opengl.GL.DEPTH_TEST = 2929;
lime.graphics.opengl.GL.SCISSOR_TEST = 3089;
lime.graphics.opengl.GL.POLYGON_OFFSET_FILL = 32823;
lime.graphics.opengl.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
lime.graphics.opengl.GL.SAMPLE_COVERAGE = 32928;
lime.graphics.opengl.GL.NO_ERROR = 0;
lime.graphics.opengl.GL.INVALID_ENUM = 1280;
lime.graphics.opengl.GL.INVALID_VALUE = 1281;
lime.graphics.opengl.GL.INVALID_OPERATION = 1282;
lime.graphics.opengl.GL.OUT_OF_MEMORY = 1285;
lime.graphics.opengl.GL.CW = 2304;
lime.graphics.opengl.GL.CCW = 2305;
lime.graphics.opengl.GL.LINE_WIDTH = 2849;
lime.graphics.opengl.GL.ALIASED_POINT_SIZE_RANGE = 33901;
lime.graphics.opengl.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
lime.graphics.opengl.GL.CULL_FACE_MODE = 2885;
lime.graphics.opengl.GL.FRONT_FACE = 2886;
lime.graphics.opengl.GL.DEPTH_RANGE = 2928;
lime.graphics.opengl.GL.DEPTH_WRITEMASK = 2930;
lime.graphics.opengl.GL.DEPTH_CLEAR_VALUE = 2931;
lime.graphics.opengl.GL.DEPTH_FUNC = 2932;
lime.graphics.opengl.GL.STENCIL_CLEAR_VALUE = 2961;
lime.graphics.opengl.GL.STENCIL_FUNC = 2962;
lime.graphics.opengl.GL.STENCIL_FAIL = 2964;
lime.graphics.opengl.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
lime.graphics.opengl.GL.STENCIL_PASS_DEPTH_PASS = 2966;
lime.graphics.opengl.GL.STENCIL_REF = 2967;
lime.graphics.opengl.GL.STENCIL_VALUE_MASK = 2963;
lime.graphics.opengl.GL.STENCIL_WRITEMASK = 2968;
lime.graphics.opengl.GL.STENCIL_BACK_FUNC = 34816;
lime.graphics.opengl.GL.STENCIL_BACK_FAIL = 34817;
lime.graphics.opengl.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
lime.graphics.opengl.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
lime.graphics.opengl.GL.STENCIL_BACK_REF = 36003;
lime.graphics.opengl.GL.STENCIL_BACK_VALUE_MASK = 36004;
lime.graphics.opengl.GL.STENCIL_BACK_WRITEMASK = 36005;
lime.graphics.opengl.GL.VIEWPORT = 2978;
lime.graphics.opengl.GL.SCISSOR_BOX = 3088;
lime.graphics.opengl.GL.COLOR_CLEAR_VALUE = 3106;
lime.graphics.opengl.GL.COLOR_WRITEMASK = 3107;
lime.graphics.opengl.GL.UNPACK_ALIGNMENT = 3317;
lime.graphics.opengl.GL.PACK_ALIGNMENT = 3333;
lime.graphics.opengl.GL.MAX_TEXTURE_SIZE = 3379;
lime.graphics.opengl.GL.MAX_VIEWPORT_DIMS = 3386;
lime.graphics.opengl.GL.SUBPIXEL_BITS = 3408;
lime.graphics.opengl.GL.RED_BITS = 3410;
lime.graphics.opengl.GL.GREEN_BITS = 3411;
lime.graphics.opengl.GL.BLUE_BITS = 3412;
lime.graphics.opengl.GL.ALPHA_BITS = 3413;
lime.graphics.opengl.GL.DEPTH_BITS = 3414;
lime.graphics.opengl.GL.STENCIL_BITS = 3415;
lime.graphics.opengl.GL.POLYGON_OFFSET_UNITS = 10752;
lime.graphics.opengl.GL.POLYGON_OFFSET_FACTOR = 32824;
lime.graphics.opengl.GL.TEXTURE_BINDING_2D = 32873;
lime.graphics.opengl.GL.SAMPLE_BUFFERS = 32936;
lime.graphics.opengl.GL.SAMPLES = 32937;
lime.graphics.opengl.GL.SAMPLE_COVERAGE_VALUE = 32938;
lime.graphics.opengl.GL.SAMPLE_COVERAGE_INVERT = 32939;
lime.graphics.opengl.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
lime.graphics.opengl.GL.DONT_CARE = 4352;
lime.graphics.opengl.GL.FASTEST = 4353;
lime.graphics.opengl.GL.NICEST = 4354;
lime.graphics.opengl.GL.GENERATE_MIPMAP_HINT = 33170;
lime.graphics.opengl.GL.BYTE = 5120;
lime.graphics.opengl.GL.UNSIGNED_BYTE = 5121;
lime.graphics.opengl.GL.SHORT = 5122;
lime.graphics.opengl.GL.UNSIGNED_SHORT = 5123;
lime.graphics.opengl.GL.INT = 5124;
lime.graphics.opengl.GL.UNSIGNED_INT = 5125;
lime.graphics.opengl.GL.FLOAT = 5126;
lime.graphics.opengl.GL.DEPTH_COMPONENT = 6402;
lime.graphics.opengl.GL.ALPHA = 6406;
lime.graphics.opengl.GL.RGB = 6407;
lime.graphics.opengl.GL.RGBA = 6408;
lime.graphics.opengl.GL.LUMINANCE = 6409;
lime.graphics.opengl.GL.LUMINANCE_ALPHA = 6410;
lime.graphics.opengl.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
lime.graphics.opengl.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
lime.graphics.opengl.GL.UNSIGNED_SHORT_5_6_5 = 33635;
lime.graphics.opengl.GL.FRAGMENT_SHADER = 35632;
lime.graphics.opengl.GL.VERTEX_SHADER = 35633;
lime.graphics.opengl.GL.MAX_VERTEX_ATTRIBS = 34921;
lime.graphics.opengl.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
lime.graphics.opengl.GL.MAX_VARYING_VECTORS = 36348;
lime.graphics.opengl.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
lime.graphics.opengl.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
lime.graphics.opengl.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
lime.graphics.opengl.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
lime.graphics.opengl.GL.SHADER_TYPE = 35663;
lime.graphics.opengl.GL.DELETE_STATUS = 35712;
lime.graphics.opengl.GL.LINK_STATUS = 35714;
lime.graphics.opengl.GL.VALIDATE_STATUS = 35715;
lime.graphics.opengl.GL.ATTACHED_SHADERS = 35717;
lime.graphics.opengl.GL.ACTIVE_UNIFORMS = 35718;
lime.graphics.opengl.GL.ACTIVE_ATTRIBUTES = 35721;
lime.graphics.opengl.GL.SHADING_LANGUAGE_VERSION = 35724;
lime.graphics.opengl.GL.CURRENT_PROGRAM = 35725;
lime.graphics.opengl.GL.NEVER = 512;
lime.graphics.opengl.GL.LESS = 513;
lime.graphics.opengl.GL.EQUAL = 514;
lime.graphics.opengl.GL.LEQUAL = 515;
lime.graphics.opengl.GL.GREATER = 516;
lime.graphics.opengl.GL.NOTEQUAL = 517;
lime.graphics.opengl.GL.GEQUAL = 518;
lime.graphics.opengl.GL.ALWAYS = 519;
lime.graphics.opengl.GL.KEEP = 7680;
lime.graphics.opengl.GL.REPLACE = 7681;
lime.graphics.opengl.GL.INCR = 7682;
lime.graphics.opengl.GL.DECR = 7683;
lime.graphics.opengl.GL.INVERT = 5386;
lime.graphics.opengl.GL.INCR_WRAP = 34055;
lime.graphics.opengl.GL.DECR_WRAP = 34056;
lime.graphics.opengl.GL.VENDOR = 7936;
lime.graphics.opengl.GL.RENDERER = 7937;
lime.graphics.opengl.GL.VERSION = 7938;
lime.graphics.opengl.GL.NEAREST = 9728;
lime.graphics.opengl.GL.LINEAR = 9729;
lime.graphics.opengl.GL.NEAREST_MIPMAP_NEAREST = 9984;
lime.graphics.opengl.GL.LINEAR_MIPMAP_NEAREST = 9985;
lime.graphics.opengl.GL.NEAREST_MIPMAP_LINEAR = 9986;
lime.graphics.opengl.GL.LINEAR_MIPMAP_LINEAR = 9987;
lime.graphics.opengl.GL.TEXTURE_MAG_FILTER = 10240;
lime.graphics.opengl.GL.TEXTURE_MIN_FILTER = 10241;
lime.graphics.opengl.GL.TEXTURE_WRAP_S = 10242;
lime.graphics.opengl.GL.TEXTURE_WRAP_T = 10243;
lime.graphics.opengl.GL.TEXTURE_2D = 3553;
lime.graphics.opengl.GL.TEXTURE = 5890;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP = 34067;
lime.graphics.opengl.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
lime.graphics.opengl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
lime.graphics.opengl.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
lime.graphics.opengl.GL.TEXTURE0 = 33984;
lime.graphics.opengl.GL.TEXTURE1 = 33985;
lime.graphics.opengl.GL.TEXTURE2 = 33986;
lime.graphics.opengl.GL.TEXTURE3 = 33987;
lime.graphics.opengl.GL.TEXTURE4 = 33988;
lime.graphics.opengl.GL.TEXTURE5 = 33989;
lime.graphics.opengl.GL.TEXTURE6 = 33990;
lime.graphics.opengl.GL.TEXTURE7 = 33991;
lime.graphics.opengl.GL.TEXTURE8 = 33992;
lime.graphics.opengl.GL.TEXTURE9 = 33993;
lime.graphics.opengl.GL.TEXTURE10 = 33994;
lime.graphics.opengl.GL.TEXTURE11 = 33995;
lime.graphics.opengl.GL.TEXTURE12 = 33996;
lime.graphics.opengl.GL.TEXTURE13 = 33997;
lime.graphics.opengl.GL.TEXTURE14 = 33998;
lime.graphics.opengl.GL.TEXTURE15 = 33999;
lime.graphics.opengl.GL.TEXTURE16 = 34000;
lime.graphics.opengl.GL.TEXTURE17 = 34001;
lime.graphics.opengl.GL.TEXTURE18 = 34002;
lime.graphics.opengl.GL.TEXTURE19 = 34003;
lime.graphics.opengl.GL.TEXTURE20 = 34004;
lime.graphics.opengl.GL.TEXTURE21 = 34005;
lime.graphics.opengl.GL.TEXTURE22 = 34006;
lime.graphics.opengl.GL.TEXTURE23 = 34007;
lime.graphics.opengl.GL.TEXTURE24 = 34008;
lime.graphics.opengl.GL.TEXTURE25 = 34009;
lime.graphics.opengl.GL.TEXTURE26 = 34010;
lime.graphics.opengl.GL.TEXTURE27 = 34011;
lime.graphics.opengl.GL.TEXTURE28 = 34012;
lime.graphics.opengl.GL.TEXTURE29 = 34013;
lime.graphics.opengl.GL.TEXTURE30 = 34014;
lime.graphics.opengl.GL.TEXTURE31 = 34015;
lime.graphics.opengl.GL.ACTIVE_TEXTURE = 34016;
lime.graphics.opengl.GL.REPEAT = 10497;
lime.graphics.opengl.GL.CLAMP_TO_EDGE = 33071;
lime.graphics.opengl.GL.MIRRORED_REPEAT = 33648;
lime.graphics.opengl.GL.FLOAT_VEC2 = 35664;
lime.graphics.opengl.GL.FLOAT_VEC3 = 35665;
lime.graphics.opengl.GL.FLOAT_VEC4 = 35666;
lime.graphics.opengl.GL.INT_VEC2 = 35667;
lime.graphics.opengl.GL.INT_VEC3 = 35668;
lime.graphics.opengl.GL.INT_VEC4 = 35669;
lime.graphics.opengl.GL.BOOL = 35670;
lime.graphics.opengl.GL.BOOL_VEC2 = 35671;
lime.graphics.opengl.GL.BOOL_VEC3 = 35672;
lime.graphics.opengl.GL.BOOL_VEC4 = 35673;
lime.graphics.opengl.GL.FLOAT_MAT2 = 35674;
lime.graphics.opengl.GL.FLOAT_MAT3 = 35675;
lime.graphics.opengl.GL.FLOAT_MAT4 = 35676;
lime.graphics.opengl.GL.SAMPLER_2D = 35678;
lime.graphics.opengl.GL.SAMPLER_CUBE = 35680;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
lime.graphics.opengl.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
lime.graphics.opengl.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
lime.graphics.opengl.GL.POINT_SPRITE = 34913;
lime.graphics.opengl.GL.COMPILE_STATUS = 35713;
lime.graphics.opengl.GL.LOW_FLOAT = 36336;
lime.graphics.opengl.GL.MEDIUM_FLOAT = 36337;
lime.graphics.opengl.GL.HIGH_FLOAT = 36338;
lime.graphics.opengl.GL.LOW_INT = 36339;
lime.graphics.opengl.GL.MEDIUM_INT = 36340;
lime.graphics.opengl.GL.HIGH_INT = 36341;
lime.graphics.opengl.GL.FRAMEBUFFER = 36160;
lime.graphics.opengl.GL.RENDERBUFFER = 36161;
lime.graphics.opengl.GL.RGBA4 = 32854;
lime.graphics.opengl.GL.RGB5_A1 = 32855;
lime.graphics.opengl.GL.RGB565 = 36194;
lime.graphics.opengl.GL.DEPTH_COMPONENT16 = 33189;
lime.graphics.opengl.GL.STENCIL_INDEX = 6401;
lime.graphics.opengl.GL.STENCIL_INDEX8 = 36168;
lime.graphics.opengl.GL.DEPTH_STENCIL = 34041;
lime.graphics.opengl.GL.RENDERBUFFER_WIDTH = 36162;
lime.graphics.opengl.GL.RENDERBUFFER_HEIGHT = 36163;
lime.graphics.opengl.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
lime.graphics.opengl.GL.RENDERBUFFER_RED_SIZE = 36176;
lime.graphics.opengl.GL.RENDERBUFFER_GREEN_SIZE = 36177;
lime.graphics.opengl.GL.RENDERBUFFER_BLUE_SIZE = 36178;
lime.graphics.opengl.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
lime.graphics.opengl.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
lime.graphics.opengl.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
lime.graphics.opengl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
lime.graphics.opengl.GL.COLOR_ATTACHMENT0 = 36064;
lime.graphics.opengl.GL.DEPTH_ATTACHMENT = 36096;
lime.graphics.opengl.GL.STENCIL_ATTACHMENT = 36128;
lime.graphics.opengl.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
lime.graphics.opengl.GL.NONE = 0;
lime.graphics.opengl.GL.FRAMEBUFFER_COMPLETE = 36053;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
lime.graphics.opengl.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
lime.graphics.opengl.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
lime.graphics.opengl.GL.FRAMEBUFFER_BINDING = 36006;
lime.graphics.opengl.GL.RENDERBUFFER_BINDING = 36007;
lime.graphics.opengl.GL.MAX_RENDERBUFFER_SIZE = 34024;
lime.graphics.opengl.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
lime.graphics.opengl.GL.UNPACK_FLIP_Y_WEBGL = 37440;
lime.graphics.opengl.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
lime.graphics.opengl.GL.CONTEXT_LOST_WEBGL = 37442;
lime.graphics.opengl.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
lime.graphics.opengl.GL.BROWSER_DEFAULT_WEBGL = 37444;
lime.math._ColorMatrix.ColorMatrix_Impl_.__identity = [1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0];
lime.math.Matrix3.__identity = new lime.math.Matrix3();
lime.math._Matrix4.Matrix4_Impl_.__identity = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
lime.net._URLRequestMethod.URLRequestMethod_Impl_.DELETE = "DELETE";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.GET = "GET";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.HEAD = "HEAD";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.OPTIONS = "OPTIONS";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.POST = "POST";
lime.net._URLRequestMethod.URLRequestMethod_Impl_.PUT = "PUT";
lime.net.curl._CURL.CURL_Impl_.GLOBAL_SSL = 1;
lime.net.curl._CURL.CURL_Impl_.GLOBAL_WIN32 = 2;
lime.net.curl._CURL.CURL_Impl_.GLOBAL_ALL = 3;
lime.net.curl._CURL.CURL_Impl_.GLOBAL_NOTHING = 0;
lime.net.curl._CURL.CURL_Impl_.GLOBAL_DEFAULT = 3;
lime.net.curl._CURL.CURL_Impl_.GLOBAL_ACK_EINTR = 4;
lime.net.curl._CURLCode.CURLCode_Impl_.OK = 0;
lime.net.curl._CURLCode.CURLCode_Impl_.UNSUPPORTED_PROTOCOL = 1;
lime.net.curl._CURLCode.CURLCode_Impl_.FAILED_INIT = 2;
lime.net.curl._CURLCode.CURLCode_Impl_.URL_MALFORMAT = 3;
lime.net.curl._CURLCode.CURLCode_Impl_.NOT_BUILT_IN = 4;
lime.net.curl._CURLCode.CURLCode_Impl_.COULDNT_RESOLVE_PROXY = 5;
lime.net.curl._CURLCode.CURLCode_Impl_.COULDNT_RESOLVE_HOST = 6;
lime.net.curl._CURLCode.CURLCode_Impl_.COULDNT_CONNECT = 7;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_WEIRD_SERVER_REPLY = 8;
lime.net.curl._CURLCode.CURLCode_Impl_.REMOTE_ACCESS_DENIED = 9;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_ACCEPT_FAILED = 10;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_WEIRD_PASS_REPLY = 11;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_ACCEPT_TIMEOUT = 12;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_WEIRD_PASV_REPLY = 13;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_WEIRD_227_FORMAT = 14;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_CANT_GET_HOST = 15;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_COULDNT_SET_TYPE = 17;
lime.net.curl._CURLCode.CURLCode_Impl_.PARTIAL_FILE = 18;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_COULDNT_RETR_FILE = 19;
lime.net.curl._CURLCode.CURLCode_Impl_.QUOTE_ERROR = 21;
lime.net.curl._CURLCode.CURLCode_Impl_.HTTP_RETURNED_ERROR = 22;
lime.net.curl._CURLCode.CURLCode_Impl_.WRITE_ERROR = 23;
lime.net.curl._CURLCode.CURLCode_Impl_.UPLOAD_FAILED = 25;
lime.net.curl._CURLCode.CURLCode_Impl_.READ_ERROR = 26;
lime.net.curl._CURLCode.CURLCode_Impl_.OUT_OF_MEMORY = 27;
lime.net.curl._CURLCode.CURLCode_Impl_.OPERATION_TIMEDOUT = 28;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_PORT_FAILED = 30;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_COULDNT_USE_REST = 31;
lime.net.curl._CURLCode.CURLCode_Impl_.RANGE_ERROR = 33;
lime.net.curl._CURLCode.CURLCode_Impl_.HTTP_POST_ERROR = 34;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CONNECT_ERROR = 35;
lime.net.curl._CURLCode.CURLCode_Impl_.BAD_DOWNLOAD_RESUME = 36;
lime.net.curl._CURLCode.CURLCode_Impl_.FILE_COULDNT_READ_FILE = 37;
lime.net.curl._CURLCode.CURLCode_Impl_.LDAP_CANNOT_BIND = 38;
lime.net.curl._CURLCode.CURLCode_Impl_.LDAP_SEARCH_FAILED = 39;
lime.net.curl._CURLCode.CURLCode_Impl_.FUNCTION_NOT_FOUND = 41;
lime.net.curl._CURLCode.CURLCode_Impl_.ABORTED_BY_CALLBACK = 42;
lime.net.curl._CURLCode.CURLCode_Impl_.BAD_FUNCTION_ARGUMENT = 43;
lime.net.curl._CURLCode.CURLCode_Impl_.INTERFACE_FAILED = 45;
lime.net.curl._CURLCode.CURLCode_Impl_.TOO_MANY_REDIRECTS = 47;
lime.net.curl._CURLCode.CURLCode_Impl_.UNKNOWN_OPTION = 48;
lime.net.curl._CURLCode.CURLCode_Impl_.TELNET_OPTION_SYNTAX = 49;
lime.net.curl._CURLCode.CURLCode_Impl_.PEER_FAILED_VERIFICATION = 51;
lime.net.curl._CURLCode.CURLCode_Impl_.GOT_NOTHING = 52;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_ENGINE_NOTFOUND = 53;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_ENGINE_SETFAILED = 54;
lime.net.curl._CURLCode.CURLCode_Impl_.SEND_ERROR = 55;
lime.net.curl._CURLCode.CURLCode_Impl_.RECV_ERROR = 56;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CERTPROBLEM = 58;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CIPHER = 59;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CACERT = 60;
lime.net.curl._CURLCode.CURLCode_Impl_.BAD_CONTENT_ENCODING = 61;
lime.net.curl._CURLCode.CURLCode_Impl_.LDAP_INVALID_URL = 62;
lime.net.curl._CURLCode.CURLCode_Impl_.FILESIZE_EXCEEDED = 63;
lime.net.curl._CURLCode.CURLCode_Impl_.USE_SSL_FAILED = 64;
lime.net.curl._CURLCode.CURLCode_Impl_.SEND_FAIL_REWIND = 65;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_ENGINE_INITFAILED = 66;
lime.net.curl._CURLCode.CURLCode_Impl_.LOGIN_DENIED = 67;
lime.net.curl._CURLCode.CURLCode_Impl_.TFTP_NOTFOUND = 68;
lime.net.curl._CURLCode.CURLCode_Impl_.TFTP_PERM = 69;
lime.net.curl._CURLCode.CURLCode_Impl_.REMOTE_DISK_FULL = 70;
lime.net.curl._CURLCode.CURLCode_Impl_.TFTP_ILLEGAL = 71;
lime.net.curl._CURLCode.CURLCode_Impl_.TFTP_UNKNOWNID = 72;
lime.net.curl._CURLCode.CURLCode_Impl_.REMOTE_FILE_EXISTS = 73;
lime.net.curl._CURLCode.CURLCode_Impl_.TFTP_NOSUCHUSER = 74;
lime.net.curl._CURLCode.CURLCode_Impl_.CONV_FAILED = 75;
lime.net.curl._CURLCode.CURLCode_Impl_.CONV_REQD = 76;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CACERT_BADFILE = 77;
lime.net.curl._CURLCode.CURLCode_Impl_.REMOTE_FILE_NOT_FOUND = 78;
lime.net.curl._CURLCode.CURLCode_Impl_.SSH = 79;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_SHUTDOWN_FAILED = 80;
lime.net.curl._CURLCode.CURLCode_Impl_.AGAIN = 81;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_CRL_BADFILE = 82;
lime.net.curl._CURLCode.CURLCode_Impl_.SSL_ISSUER_ERROR = 83;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_PRET_FAILED = 84;
lime.net.curl._CURLCode.CURLCode_Impl_.RTSP_CSEQ_ERROR = 85;
lime.net.curl._CURLCode.CURLCode_Impl_.RTSP_SESSION_ERROR = 86;
lime.net.curl._CURLCode.CURLCode_Impl_.FTP_BAD_FILE_LIST = 87;
lime.net.curl._CURLCode.CURLCode_Impl_.CHUNK_FAILED = 88;
lime.net.curl._CURLCode.CURLCode_Impl_.NO_CONNECTION_AVAILABLE = 89;
lime.net.curl._CURLInfo.CURLInfo_Impl_.NONE = 0;
lime.net.curl._CURLInfo.CURLInfo_Impl_.EFFECTIVE_URL = 1048577;
lime.net.curl._CURLInfo.CURLInfo_Impl_.RESPONSE_CODE = 2097154;
lime.net.curl._CURLInfo.CURLInfo_Impl_.TOTAL_TIME = 3145731;
lime.net.curl._CURLInfo.CURLInfo_Impl_.NAMELOOKUP_TIME = 3145732;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CONNECT_TIME = 3145733;
lime.net.curl._CURLInfo.CURLInfo_Impl_.PRETRANSFER_TIME = 3145734;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SIZE_UPLOAD = 3145735;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SIZE_DOWNLOAD = 3145736;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SPEED_DOWNLOAD = 3145737;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SPEED_UPLOAD = 3145738;
lime.net.curl._CURLInfo.CURLInfo_Impl_.HEADER_SIZE = 2097163;
lime.net.curl._CURLInfo.CURLInfo_Impl_.REQUEST_SIZE = 2097164;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SSL_VERIFYRESULT = 2097165;
lime.net.curl._CURLInfo.CURLInfo_Impl_.FILETIME = 2097166;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CONTENT_LENGTH_DOWNLOAD = 3145743;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CONTENT_LENGTH_UPLOAD = 3145744;
lime.net.curl._CURLInfo.CURLInfo_Impl_.STARTTRANSFER_TIME = 3145745;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CONTENT_TYPE = 1048594;
lime.net.curl._CURLInfo.CURLInfo_Impl_.REDIRECT_TIME = 3145747;
lime.net.curl._CURLInfo.CURLInfo_Impl_.REDIRECT_COUNT = 2097172;
lime.net.curl._CURLInfo.CURLInfo_Impl_.PRIVATE = 1048597;
lime.net.curl._CURLInfo.CURLInfo_Impl_.HTTP_CONNECTCODE = 2097174;
lime.net.curl._CURLInfo.CURLInfo_Impl_.HTTPAUTH_AVAIL = 2097175;
lime.net.curl._CURLInfo.CURLInfo_Impl_.PROXYAUTH_AVAIL = 2097176;
lime.net.curl._CURLInfo.CURLInfo_Impl_.OS_ERRNO = 2097177;
lime.net.curl._CURLInfo.CURLInfo_Impl_.NUM_CONNECTS = 2097178;
lime.net.curl._CURLInfo.CURLInfo_Impl_.SSL_ENGINES = 4194331;
lime.net.curl._CURLInfo.CURLInfo_Impl_.COOKIELIST = 4194332;
lime.net.curl._CURLInfo.CURLInfo_Impl_.LASTSOCKET = 2097181;
lime.net.curl._CURLInfo.CURLInfo_Impl_.FTP_ENTRY_PATH = 1048606;
lime.net.curl._CURLInfo.CURLInfo_Impl_.REDIRECT_URL = 1048607;
lime.net.curl._CURLInfo.CURLInfo_Impl_.PRIMARY_IP = 1048608;
lime.net.curl._CURLInfo.CURLInfo_Impl_.APPCONNECT_TIME = 3145761;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CERTINFO = 4194338;
lime.net.curl._CURLInfo.CURLInfo_Impl_.CONDITION_UNMET = 2097187;
lime.net.curl._CURLInfo.CURLInfo_Impl_.RTSP_SESSION_ID = 1048612;
lime.net.curl._CURLInfo.CURLInfo_Impl_.RTSP_CLIENT_CSEQ = 2097189;
lime.net.curl._CURLInfo.CURLInfo_Impl_.RTSP_SERVER_CSEQ = 2097190;
lime.net.curl._CURLInfo.CURLInfo_Impl_.RTSP_CSEQ_RECV = 2097191;
lime.net.curl._CURLInfo.CURLInfo_Impl_.PRIMARY_PORT = 2097192;
lime.net.curl._CURLInfo.CURLInfo_Impl_.LOCAL_IP = 1048617;
lime.net.curl._CURLInfo.CURLInfo_Impl_.LOCAL_PORT = 2097194;
lime.net.curl._CURLInfo.CURLInfo_Impl_.TLS_SESSION = 4194347;
lime.net.curl._CURLOption.CURLOption_Impl_.URL = 10002;
lime.net.curl._CURLOption.CURLOption_Impl_.PORT = 3;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXY = 10004;
lime.net.curl._CURLOption.CURLOption_Impl_.USERPWD = 10005;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYUSERPWD = 10006;
lime.net.curl._CURLOption.CURLOption_Impl_.RANGE = 10007;
lime.net.curl._CURLOption.CURLOption_Impl_.ERRORBUFFER = 10010;
lime.net.curl._CURLOption.CURLOption_Impl_.WRITEFUNCTION = 20011;
lime.net.curl._CURLOption.CURLOption_Impl_.READFUNCTION = 20012;
lime.net.curl._CURLOption.CURLOption_Impl_.TIMEOUT = 13;
lime.net.curl._CURLOption.CURLOption_Impl_.INFILESIZE = 14;
lime.net.curl._CURLOption.CURLOption_Impl_.POSTFIELDS = 10015;
lime.net.curl._CURLOption.CURLOption_Impl_.REFERER = 10016;
lime.net.curl._CURLOption.CURLOption_Impl_.FTPPORT = 10017;
lime.net.curl._CURLOption.CURLOption_Impl_.USERAGENT = 10018;
lime.net.curl._CURLOption.CURLOption_Impl_.LOW_SPEED_LIMIT = 19;
lime.net.curl._CURLOption.CURLOption_Impl_.LOW_SPEED_TIME = 20;
lime.net.curl._CURLOption.CURLOption_Impl_.RESUME_FROM = 21;
lime.net.curl._CURLOption.CURLOption_Impl_.COOKIE = 22;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTPHEADER = 10023;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSPHEADER = 10023;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTPPOST = 10024;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLCERT = 10025;
lime.net.curl._CURLOption.CURLOption_Impl_.KEYPASSWD = 10026;
lime.net.curl._CURLOption.CURLOption_Impl_.CRLF = 27;
lime.net.curl._CURLOption.CURLOption_Impl_.QUOTE = 10028;
lime.net.curl._CURLOption.CURLOption_Impl_.WRITEHEADER = 10029;
lime.net.curl._CURLOption.CURLOption_Impl_.HEADERDATA = 10029;
lime.net.curl._CURLOption.CURLOption_Impl_.COOKIEFILE = 10031;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLVERSION = 32;
lime.net.curl._CURLOption.CURLOption_Impl_.TIMECONDITION = 33;
lime.net.curl._CURLOption.CURLOption_Impl_.TIMEVALUE = 34;
lime.net.curl._CURLOption.CURLOption_Impl_.CUSTOMREQUEST = 10036;
lime.net.curl._CURLOption.CURLOption_Impl_.STDERR = 10037;
lime.net.curl._CURLOption.CURLOption_Impl_.POSTQUOTE = 10039;
lime.net.curl._CURLOption.CURLOption_Impl_.WRITEINFO = 10040;
lime.net.curl._CURLOption.CURLOption_Impl_.VERBOSE = 41;
lime.net.curl._CURLOption.CURLOption_Impl_.HEADER = 42;
lime.net.curl._CURLOption.CURLOption_Impl_.NOPROGRESS = 43;
lime.net.curl._CURLOption.CURLOption_Impl_.NOBODY = 44;
lime.net.curl._CURLOption.CURLOption_Impl_.FAILONERROR = 45;
lime.net.curl._CURLOption.CURLOption_Impl_.UPLOAD = 46;
lime.net.curl._CURLOption.CURLOption_Impl_.POST = 47;
lime.net.curl._CURLOption.CURLOption_Impl_.DIRLISTONLY = 48;
lime.net.curl._CURLOption.CURLOption_Impl_.APPEND = 50;
lime.net.curl._CURLOption.CURLOption_Impl_.NETRC = 51;
lime.net.curl._CURLOption.CURLOption_Impl_.FOLLOWLOCATION = 52;
lime.net.curl._CURLOption.CURLOption_Impl_.TRANSFERTEXT = 53;
lime.net.curl._CURLOption.CURLOption_Impl_.PUT = 54;
lime.net.curl._CURLOption.CURLOption_Impl_.PROGRESSFUNCTION = 20056;
lime.net.curl._CURLOption.CURLOption_Impl_.PROGRESSDATA = 10057;
lime.net.curl._CURLOption.CURLOption_Impl_.XFERINFODATA = 10057;
lime.net.curl._CURLOption.CURLOption_Impl_.AUTOREFERER = 58;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYPORT = 59;
lime.net.curl._CURLOption.CURLOption_Impl_.POSTFIELDSIZE = 60;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTPPROXYTUNNEL = 61;
lime.net.curl._CURLOption.CURLOption_Impl_.INTERFACE = 10062;
lime.net.curl._CURLOption.CURLOption_Impl_.KRBLEVEL = 10063;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_VERIFYPEER = 64;
lime.net.curl._CURLOption.CURLOption_Impl_.CAINFO = 10065;
lime.net.curl._CURLOption.CURLOption_Impl_.MAXREDIRS = 68;
lime.net.curl._CURLOption.CURLOption_Impl_.FILETIME = 69;
lime.net.curl._CURLOption.CURLOption_Impl_.TELNETOPTIONS = 10070;
lime.net.curl._CURLOption.CURLOption_Impl_.MAXCONNECTS = 71;
lime.net.curl._CURLOption.CURLOption_Impl_.CLOSEPOLICY = 72;
lime.net.curl._CURLOption.CURLOption_Impl_.FRESH_CONNECT = 74;
lime.net.curl._CURLOption.CURLOption_Impl_.FORBID_REUSE = 75;
lime.net.curl._CURLOption.CURLOption_Impl_.RANDOM_FILE = 10076;
lime.net.curl._CURLOption.CURLOption_Impl_.EGDSOCKET = 10077;
lime.net.curl._CURLOption.CURLOption_Impl_.CONNECTTIMEOUT = 78;
lime.net.curl._CURLOption.CURLOption_Impl_.HEADERFUNCTION = 20079;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTPGET = 80;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_VERIFYHOST = 81;
lime.net.curl._CURLOption.CURLOption_Impl_.COOKIEJAR = 10082;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_CIPHER_LIST = 10083;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTP_VERSION = 84;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_USE_EPSV = 85;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLCERTTYPE = 10086;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLKEY = 10087;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLKEYTYPE = 10088;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLENGINE = 10089;
lime.net.curl._CURLOption.CURLOption_Impl_.SSLENGINE_DEFAULT = 90;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_USE_GLOBAL_CACHE = 91;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_CACHE_TIMEOUT = 92;
lime.net.curl._CURLOption.CURLOption_Impl_.PREQUOTE = 10093;
lime.net.curl._CURLOption.CURLOption_Impl_.DEBUGFUNCTION = 20094;
lime.net.curl._CURLOption.CURLOption_Impl_.DEBUGDATA = 10095;
lime.net.curl._CURLOption.CURLOption_Impl_.COOKIESESSION = 96;
lime.net.curl._CURLOption.CURLOption_Impl_.CAPATH = 10097;
lime.net.curl._CURLOption.CURLOption_Impl_.BUFFERSIZE = 98;
lime.net.curl._CURLOption.CURLOption_Impl_.NOSIGNAL = 99;
lime.net.curl._CURLOption.CURLOption_Impl_.SHARE = 10100;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYTYPE = 101;
lime.net.curl._CURLOption.CURLOption_Impl_.ACCEPT_ENCODING = 10102;
lime.net.curl._CURLOption.CURLOption_Impl_.PRIVATE = 10103;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTP200ALIASES = 10104;
lime.net.curl._CURLOption.CURLOption_Impl_.UNRESTRICTED_AUTH = 105;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_USE_EPRT = 106;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTPAUTH = 107;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_CTX_FUNCTION = 20108;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_CTX_DATA = 10109;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_CREATE_MISSING_DIRS = 110;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYAUTH = 111;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_RESPONSE_TIMEOUT = 112;
lime.net.curl._CURLOption.CURLOption_Impl_.SERVER_RESPONSE_TIMEOUT = 112;
lime.net.curl._CURLOption.CURLOption_Impl_.IPRESOLVE = 113;
lime.net.curl._CURLOption.CURLOption_Impl_.MAXFILESIZE = 114;
lime.net.curl._CURLOption.CURLOption_Impl_.INFILESIZE_LARGE = 30115;
lime.net.curl._CURLOption.CURLOption_Impl_.RESUME_FROM_LARGE = 30116;
lime.net.curl._CURLOption.CURLOption_Impl_.MAXFILESIZE_LARGE = 30117;
lime.net.curl._CURLOption.CURLOption_Impl_.NETRC_FILE = 10118;
lime.net.curl._CURLOption.CURLOption_Impl_.USE_SSL = 119;
lime.net.curl._CURLOption.CURLOption_Impl_.POSTFIELDSIZE_LARGE = 30120;
lime.net.curl._CURLOption.CURLOption_Impl_.TCP_NODELAY = 121;
lime.net.curl._CURLOption.CURLOption_Impl_.FTPSSLAUTH = 129;
lime.net.curl._CURLOption.CURLOption_Impl_.IOCTLFUNCTION = 20130;
lime.net.curl._CURLOption.CURLOption_Impl_.IOCTLDATA = 10131;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_ACCOUNT = 10134;
lime.net.curl._CURLOption.CURLOption_Impl_.COOKIELIST = 10135;
lime.net.curl._CURLOption.CURLOption_Impl_.IGNORE_CONTENT_LENGTH = 10136;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_SKIP_PASV_IP = 137;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_FILEMETHOD = 138;
lime.net.curl._CURLOption.CURLOption_Impl_.LOCALPORT = 139;
lime.net.curl._CURLOption.CURLOption_Impl_.LOCALPORTRANGE = 140;
lime.net.curl._CURLOption.CURLOption_Impl_.CONNECT_ONLY = 141;
lime.net.curl._CURLOption.CURLOption_Impl_.CONV_FROM_NETWORK_FUNCTION = 20142;
lime.net.curl._CURLOption.CURLOption_Impl_.CONV_TO_NETWORK_FUNCTION = 20143;
lime.net.curl._CURLOption.CURLOption_Impl_.CONV_FROM_UTF8_FUNCTION = 20144;
lime.net.curl._CURLOption.CURLOption_Impl_.MAX_SEND_SPEED_LARGE = 30145;
lime.net.curl._CURLOption.CURLOption_Impl_.MAX_RECV_SPEED_LARGE = 30146;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_ALTERNATIVE_TO_USER = 10147;
lime.net.curl._CURLOption.CURLOption_Impl_.SOCKOPTFUNCTION = 20148;
lime.net.curl._CURLOption.CURLOption_Impl_.SOCKOPTDATA = 10149;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_SESSIONID_CACHE = 150;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_AUTH_TYPES = 151;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_PUBLIC_KEYFILE = 10152;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_PRIVATE_KEYFILE = 10153;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_SSL_CCC = 154;
lime.net.curl._CURLOption.CURLOption_Impl_.TIMEOUT_MS = 155;
lime.net.curl._CURLOption.CURLOption_Impl_.CONNECTTIMEOUT_MS = 156;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTP_TRANSFER_DECODING = 157;
lime.net.curl._CURLOption.CURLOption_Impl_.HTTP_CONTENT_DECODING = 158;
lime.net.curl._CURLOption.CURLOption_Impl_.NEW_FILE_PERMS = 159;
lime.net.curl._CURLOption.CURLOption_Impl_.NEW_DIRECTORY_PERMS = 160;
lime.net.curl._CURLOption.CURLOption_Impl_.POSTREDIR = 161;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_HOST_PUBLIC_KEY_MD5 = 10162;
lime.net.curl._CURLOption.CURLOption_Impl_.OPENSOCKETFUNCTION = 20163;
lime.net.curl._CURLOption.CURLOption_Impl_.OPENSOCKETDATA = 10164;
lime.net.curl._CURLOption.CURLOption_Impl_.COPYPOSTFIELDS = 10165;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXY_TRANSFER_MODE = 166;
lime.net.curl._CURLOption.CURLOption_Impl_.SEEKFUNCTION = 20167;
lime.net.curl._CURLOption.CURLOption_Impl_.SEEKDATA = 10168;
lime.net.curl._CURLOption.CURLOption_Impl_.CRLFILE = 10169;
lime.net.curl._CURLOption.CURLOption_Impl_.ISSUERCERT = 10170;
lime.net.curl._CURLOption.CURLOption_Impl_.ADDRESS_SCOPE = 171;
lime.net.curl._CURLOption.CURLOption_Impl_.CERTINFO = 172;
lime.net.curl._CURLOption.CURLOption_Impl_.USERNAME = 10173;
lime.net.curl._CURLOption.CURLOption_Impl_.PASSWORD = 10174;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYUSERNAME = 10175;
lime.net.curl._CURLOption.CURLOption_Impl_.PROXYPASSWORD = 10176;
lime.net.curl._CURLOption.CURLOption_Impl_.NOPROXY = 10177;
lime.net.curl._CURLOption.CURLOption_Impl_.TFTP_BLKSIZE = 178;
lime.net.curl._CURLOption.CURLOption_Impl_.SOCKS5_GSSAPI_SERVICE = 10179;
lime.net.curl._CURLOption.CURLOption_Impl_.SOCKS5_GSSAPI_NEC = 180;
lime.net.curl._CURLOption.CURLOption_Impl_.PROTOCOLS = 181;
lime.net.curl._CURLOption.CURLOption_Impl_.REDIR_PROTOCOLS = 182;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_KNOWNHOSTS = 10183;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_KEYFUNCTION = 20184;
lime.net.curl._CURLOption.CURLOption_Impl_.SSH_KEYDATA = 10185;
lime.net.curl._CURLOption.CURLOption_Impl_.MAIL_FROM = 10186;
lime.net.curl._CURLOption.CURLOption_Impl_.MAIL_RCPT = 10187;
lime.net.curl._CURLOption.CURLOption_Impl_.FTP_USE_PRET = 188;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_REQUEST = 189;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_SESSION_ID = 10190;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_STREAM_URI = 10191;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_TRANSPORT = 10192;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_CLIENT_CSEQ = 193;
lime.net.curl._CURLOption.CURLOption_Impl_.RTSP_SERVER_CSEQ = 194;
lime.net.curl._CURLOption.CURLOption_Impl_.INTERLEAVEDATA = 10195;
lime.net.curl._CURLOption.CURLOption_Impl_.INTERLEAVEFUNCTION = 20196;
lime.net.curl._CURLOption.CURLOption_Impl_.WILDCARDMATCH = 197;
lime.net.curl._CURLOption.CURLOption_Impl_.CHUNK_BGN_FUNCTION = 20198;
lime.net.curl._CURLOption.CURLOption_Impl_.CHUNK_END_FUNCTION = 20199;
lime.net.curl._CURLOption.CURLOption_Impl_.FNMATCH_FUNCTION = 20200;
lime.net.curl._CURLOption.CURLOption_Impl_.CHUNK_DATA = 10201;
lime.net.curl._CURLOption.CURLOption_Impl_.FNMATCH_DATA = 10202;
lime.net.curl._CURLOption.CURLOption_Impl_.RESOLVE = 10203;
lime.net.curl._CURLOption.CURLOption_Impl_.TLSAUTH_USERNAME = 10204;
lime.net.curl._CURLOption.CURLOption_Impl_.TLSAUTH_PASSWORD = 10205;
lime.net.curl._CURLOption.CURLOption_Impl_.TLSAUTH_TYPE = 10206;
lime.net.curl._CURLOption.CURLOption_Impl_.TRANSFER_ENCODING = 207;
lime.net.curl._CURLOption.CURLOption_Impl_.CLOSESOCKETFUNCTION = 20208;
lime.net.curl._CURLOption.CURLOption_Impl_.CLOSESOCKETDATA = 10209;
lime.net.curl._CURLOption.CURLOption_Impl_.GSSAPI_DELEGATION = 210;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_SERVERS = 10211;
lime.net.curl._CURLOption.CURLOption_Impl_.ACCEPTTIMEOUT_MS = 212;
lime.net.curl._CURLOption.CURLOption_Impl_.TCP_KEEPALIVE = 213;
lime.net.curl._CURLOption.CURLOption_Impl_.TCP_KEEPIDLE = 214;
lime.net.curl._CURLOption.CURLOption_Impl_.TCP_KEEPINTVL = 215;
lime.net.curl._CURLOption.CURLOption_Impl_.SSL_OPTIONS = 216;
lime.net.curl._CURLOption.CURLOption_Impl_.MAIL_AUTH = 10217;
lime.net.curl._CURLOption.CURLOption_Impl_.SASL_IR = 218;
lime.net.curl._CURLOption.CURLOption_Impl_.XFERINFOFUNCTION = 20219;
lime.net.curl._CURLOption.CURLOption_Impl_.XOAUTH2_BEARER = 10220;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_INTERFACE = 10221;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_LOCAL_IP4 = 10222;
lime.net.curl._CURLOption.CURLOption_Impl_.DNS_LOCAL_IP6 = 10223;
lime.net.curl._CURLOption.CURLOption_Impl_.LOGIN_OPTIONS = 10224;
lime.net.curl._CURLVersion.CURLVersion_Impl_.FIRST = 0;
lime.net.curl._CURLVersion.CURLVersion_Impl_.SECOND = 1;
lime.net.curl._CURLVersion.CURLVersion_Impl_.THIRD = 2;
lime.net.curl._CURLVersion.CURLVersion_Impl_.FOURTH = 3;
lime.ui._KeyCode.KeyCode_Impl_.UNKNOWN = 0;
lime.ui._KeyCode.KeyCode_Impl_.BACKSPACE = 8;
lime.ui._KeyCode.KeyCode_Impl_.TAB = 9;
lime.ui._KeyCode.KeyCode_Impl_.RETURN = 13;
lime.ui._KeyCode.KeyCode_Impl_.ESCAPE = 27;
lime.ui._KeyCode.KeyCode_Impl_.SPACE = 32;
lime.ui._KeyCode.KeyCode_Impl_.EXCLAMATION = 33;
lime.ui._KeyCode.KeyCode_Impl_.QUOTE = 34;
lime.ui._KeyCode.KeyCode_Impl_.HASH = 35;
lime.ui._KeyCode.KeyCode_Impl_.DOLLAR = 36;
lime.ui._KeyCode.KeyCode_Impl_.PERCENT = 37;
lime.ui._KeyCode.KeyCode_Impl_.AMPERSAND = 38;
lime.ui._KeyCode.KeyCode_Impl_.SINGLE_QUOTE = 39;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_PARENTHESIS = 40;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_PARENTHESIS = 41;
lime.ui._KeyCode.KeyCode_Impl_.ASTERISK = 42;
lime.ui._KeyCode.KeyCode_Impl_.PLUS = 43;
lime.ui._KeyCode.KeyCode_Impl_.COMMA = 44;
lime.ui._KeyCode.KeyCode_Impl_.MINUS = 45;
lime.ui._KeyCode.KeyCode_Impl_.PERIOD = 46;
lime.ui._KeyCode.KeyCode_Impl_.SLASH = 47;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_0 = 48;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_1 = 49;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_2 = 50;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_3 = 51;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_4 = 52;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_5 = 53;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_6 = 54;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_7 = 55;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_8 = 56;
lime.ui._KeyCode.KeyCode_Impl_.NUMBER_9 = 57;
lime.ui._KeyCode.KeyCode_Impl_.COLON = 58;
lime.ui._KeyCode.KeyCode_Impl_.SEMICOLON = 59;
lime.ui._KeyCode.KeyCode_Impl_.LESS_THAN = 60;
lime.ui._KeyCode.KeyCode_Impl_.EQUALS = 61;
lime.ui._KeyCode.KeyCode_Impl_.GREATER_THAN = 62;
lime.ui._KeyCode.KeyCode_Impl_.QUESTION = 63;
lime.ui._KeyCode.KeyCode_Impl_.AT = 64;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_BRACKET = 91;
lime.ui._KeyCode.KeyCode_Impl_.BACKSLASH = 92;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_BRACKET = 93;
lime.ui._KeyCode.KeyCode_Impl_.CARET = 94;
lime.ui._KeyCode.KeyCode_Impl_.UNDERSCORE = 95;
lime.ui._KeyCode.KeyCode_Impl_.GRAVE = 96;
lime.ui._KeyCode.KeyCode_Impl_.A = 97;
lime.ui._KeyCode.KeyCode_Impl_.B = 98;
lime.ui._KeyCode.KeyCode_Impl_.C = 99;
lime.ui._KeyCode.KeyCode_Impl_.D = 100;
lime.ui._KeyCode.KeyCode_Impl_.E = 101;
lime.ui._KeyCode.KeyCode_Impl_.F = 102;
lime.ui._KeyCode.KeyCode_Impl_.G = 103;
lime.ui._KeyCode.KeyCode_Impl_.H = 104;
lime.ui._KeyCode.KeyCode_Impl_.I = 105;
lime.ui._KeyCode.KeyCode_Impl_.J = 106;
lime.ui._KeyCode.KeyCode_Impl_.K = 107;
lime.ui._KeyCode.KeyCode_Impl_.L = 108;
lime.ui._KeyCode.KeyCode_Impl_.M = 109;
lime.ui._KeyCode.KeyCode_Impl_.N = 110;
lime.ui._KeyCode.KeyCode_Impl_.O = 111;
lime.ui._KeyCode.KeyCode_Impl_.P = 112;
lime.ui._KeyCode.KeyCode_Impl_.Q = 113;
lime.ui._KeyCode.KeyCode_Impl_.R = 114;
lime.ui._KeyCode.KeyCode_Impl_.S = 115;
lime.ui._KeyCode.KeyCode_Impl_.T = 116;
lime.ui._KeyCode.KeyCode_Impl_.U = 117;
lime.ui._KeyCode.KeyCode_Impl_.V = 118;
lime.ui._KeyCode.KeyCode_Impl_.W = 119;
lime.ui._KeyCode.KeyCode_Impl_.X = 120;
lime.ui._KeyCode.KeyCode_Impl_.Y = 121;
lime.ui._KeyCode.KeyCode_Impl_.Z = 122;
lime.ui._KeyCode.KeyCode_Impl_.DELETE = 127;
lime.ui._KeyCode.KeyCode_Impl_.CAPS_LOCK = 1073741881;
lime.ui._KeyCode.KeyCode_Impl_.F1 = 1073741882;
lime.ui._KeyCode.KeyCode_Impl_.F2 = 1073741883;
lime.ui._KeyCode.KeyCode_Impl_.F3 = 1073741884;
lime.ui._KeyCode.KeyCode_Impl_.F4 = 1073741885;
lime.ui._KeyCode.KeyCode_Impl_.F5 = 1073741886;
lime.ui._KeyCode.KeyCode_Impl_.F6 = 1073741887;
lime.ui._KeyCode.KeyCode_Impl_.F7 = 1073741888;
lime.ui._KeyCode.KeyCode_Impl_.F8 = 1073741889;
lime.ui._KeyCode.KeyCode_Impl_.F9 = 1073741890;
lime.ui._KeyCode.KeyCode_Impl_.F10 = 1073741891;
lime.ui._KeyCode.KeyCode_Impl_.F11 = 1073741892;
lime.ui._KeyCode.KeyCode_Impl_.F12 = 1073741893;
lime.ui._KeyCode.KeyCode_Impl_.PRINT_SCREEN = 1073741894;
lime.ui._KeyCode.KeyCode_Impl_.SCROLL_LOCK = 1073741895;
lime.ui._KeyCode.KeyCode_Impl_.PAUSE = 1073741896;
lime.ui._KeyCode.KeyCode_Impl_.INSERT = 1073741897;
lime.ui._KeyCode.KeyCode_Impl_.HOME = 1073741898;
lime.ui._KeyCode.KeyCode_Impl_.PAGE_UP = 1073741899;
lime.ui._KeyCode.KeyCode_Impl_.END = 1073741901;
lime.ui._KeyCode.KeyCode_Impl_.PAGE_DOWN = 1073741902;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT = 1073741903;
lime.ui._KeyCode.KeyCode_Impl_.LEFT = 1073741904;
lime.ui._KeyCode.KeyCode_Impl_.DOWN = 1073741905;
lime.ui._KeyCode.KeyCode_Impl_.UP = 1073741906;
lime.ui._KeyCode.KeyCode_Impl_.NUM_LOCK = 1073741907;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DIVIDE = 1073741908;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MULTIPLY = 1073741909;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MINUS = 1073741910;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PLUS = 1073741911;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_ENTER = 1073741912;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_1 = 1073741913;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_2 = 1073741914;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_3 = 1073741915;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_4 = 1073741916;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_5 = 1073741917;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_6 = 1073741918;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_7 = 1073741919;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_8 = 1073741920;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_9 = 1073741921;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_0 = 1073741922;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PERIOD = 1073741923;
lime.ui._KeyCode.KeyCode_Impl_.APPLICATION = 1073741925;
lime.ui._KeyCode.KeyCode_Impl_.POWER = 1073741926;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_EQUALS = 1073741927;
lime.ui._KeyCode.KeyCode_Impl_.F13 = 1073741928;
lime.ui._KeyCode.KeyCode_Impl_.F14 = 1073741929;
lime.ui._KeyCode.KeyCode_Impl_.F15 = 1073741930;
lime.ui._KeyCode.KeyCode_Impl_.F16 = 1073741931;
lime.ui._KeyCode.KeyCode_Impl_.F17 = 1073741932;
lime.ui._KeyCode.KeyCode_Impl_.F18 = 1073741933;
lime.ui._KeyCode.KeyCode_Impl_.F19 = 1073741934;
lime.ui._KeyCode.KeyCode_Impl_.F20 = 1073741935;
lime.ui._KeyCode.KeyCode_Impl_.F21 = 1073741936;
lime.ui._KeyCode.KeyCode_Impl_.F22 = 1073741937;
lime.ui._KeyCode.KeyCode_Impl_.F23 = 1073741938;
lime.ui._KeyCode.KeyCode_Impl_.F24 = 1073741939;
lime.ui._KeyCode.KeyCode_Impl_.EXECUTE = 1073741940;
lime.ui._KeyCode.KeyCode_Impl_.HELP = 1073741941;
lime.ui._KeyCode.KeyCode_Impl_.MENU = 1073741942;
lime.ui._KeyCode.KeyCode_Impl_.SELECT = 1073741943;
lime.ui._KeyCode.KeyCode_Impl_.STOP = 1073741944;
lime.ui._KeyCode.KeyCode_Impl_.AGAIN = 1073741945;
lime.ui._KeyCode.KeyCode_Impl_.UNDO = 1073741946;
lime.ui._KeyCode.KeyCode_Impl_.CUT = 1073741947;
lime.ui._KeyCode.KeyCode_Impl_.COPY = 1073741948;
lime.ui._KeyCode.KeyCode_Impl_.PASTE = 1073741949;
lime.ui._KeyCode.KeyCode_Impl_.FIND = 1073741950;
lime.ui._KeyCode.KeyCode_Impl_.MUTE = 1073741951;
lime.ui._KeyCode.KeyCode_Impl_.VOLUME_UP = 1073741952;
lime.ui._KeyCode.KeyCode_Impl_.VOLUME_DOWN = 1073741953;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_COMMA = 1073741957;
lime.ui._KeyCode.KeyCode_Impl_.ALT_ERASE = 1073741977;
lime.ui._KeyCode.KeyCode_Impl_.SYSTEM_REQUEST = 1073741978;
lime.ui._KeyCode.KeyCode_Impl_.CANCEL = 1073741979;
lime.ui._KeyCode.KeyCode_Impl_.CLEAR = 1073741980;
lime.ui._KeyCode.KeyCode_Impl_.PRIOR = 1073741981;
lime.ui._KeyCode.KeyCode_Impl_.RETURN2 = 1073741982;
lime.ui._KeyCode.KeyCode_Impl_.SEPARATOR = 1073741983;
lime.ui._KeyCode.KeyCode_Impl_.OUT = 1073741984;
lime.ui._KeyCode.KeyCode_Impl_.OPER = 1073741985;
lime.ui._KeyCode.KeyCode_Impl_.CLEAR_AGAIN = 1073741986;
lime.ui._KeyCode.KeyCode_Impl_.CRSEL = 1073741987;
lime.ui._KeyCode.KeyCode_Impl_.EXSEL = 1073741988;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_00 = 1073742000;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_000 = 1073742001;
lime.ui._KeyCode.KeyCode_Impl_.THOUSAND_SEPARATOR = 1073742002;
lime.ui._KeyCode.KeyCode_Impl_.DECIMAL_SEPARATOR = 1073742003;
lime.ui._KeyCode.KeyCode_Impl_.CURRENCY_UNIT = 1073742004;
lime.ui._KeyCode.KeyCode_Impl_.CURRENCY_SUBUNIT = 1073742005;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LEFT_PARENTHESIS = 1073742006;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_RIGHT_PARENTHESIS = 1073742007;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LEFT_BRACE = 1073742008;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_RIGHT_BRACE = 1073742009;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_TAB = 1073742010;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_BACKSPACE = 1073742011;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_A = 1073742012;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_B = 1073742013;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_C = 1073742014;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_D = 1073742015;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_E = 1073742016;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_F = 1073742017;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_XOR = 1073742018;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_POWER = 1073742019;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PERCENT = 1073742020;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_LESS_THAN = 1073742021;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_GREATER_THAN = 1073742022;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_AMPERSAND = 1073742023;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DOUBLE_AMPERSAND = 1073742024;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_VERTICAL_BAR = 1073742025;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DOUBLE_VERTICAL_BAR = 1073742026;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_COLON = 1073742027;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_HASH = 1073742028;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_SPACE = 1073742029;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_AT = 1073742030;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_EXCLAMATION = 1073742031;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_STORE = 1073742032;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_RECALL = 1073742033;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_CLEAR = 1073742034;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_ADD = 1073742035;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_SUBTRACT = 1073742036;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_MULTIPLY = 1073742037;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_MEM_DIVIDE = 1073742038;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_PLUS_MINUS = 1073742039;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_CLEAR = 1073742040;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_CLEAR_ENTRY = 1073742041;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_BINARY = 1073742042;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_OCTAL = 1073742043;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_DECIMAL = 1073742044;
lime.ui._KeyCode.KeyCode_Impl_.NUMPAD_HEXADECIMAL = 1073742045;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_CTRL = 1073742048;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_SHIFT = 1073742049;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_ALT = 1073742050;
lime.ui._KeyCode.KeyCode_Impl_.LEFT_META = 1073742051;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_CTRL = 1073742052;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_SHIFT = 1073742053;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_ALT = 1073742054;
lime.ui._KeyCode.KeyCode_Impl_.RIGHT_META = 1073742055;
lime.ui._KeyCode.KeyCode_Impl_.MODE = 1073742081;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_NEXT = 1073742082;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_PREVIOUS = 1073742083;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_STOP = 1073742084;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_PLAY = 1073742085;
lime.ui._KeyCode.KeyCode_Impl_.AUDIO_MUTE = 1073742086;
lime.ui._KeyCode.KeyCode_Impl_.MEDIA_SELECT = 1073742087;
lime.ui._KeyCode.KeyCode_Impl_.WWW = 1073742088;
lime.ui._KeyCode.KeyCode_Impl_.MAIL = 1073742089;
lime.ui._KeyCode.KeyCode_Impl_.CALCULATOR = 1073742090;
lime.ui._KeyCode.KeyCode_Impl_.COMPUTER = 1073742091;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_SEARCH = 1073742092;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_HOME = 1073742093;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_BACK = 1073742094;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_FORWARD = 1073742095;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_STOP = 1073742096;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_REFRESH = 1073742097;
lime.ui._KeyCode.KeyCode_Impl_.APP_CONTROL_BOOKMARKS = 1073742098;
lime.ui._KeyCode.KeyCode_Impl_.BRIGHTNESS_DOWN = 1073742099;
lime.ui._KeyCode.KeyCode_Impl_.BRIGHTNESS_UP = 1073742100;
lime.ui._KeyCode.KeyCode_Impl_.DISPLAY_SWITCH = 1073742101;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_TOGGLE = 1073742102;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_DOWN = 1073742103;
lime.ui._KeyCode.KeyCode_Impl_.BACKLIGHT_UP = 1073742104;
lime.ui._KeyCode.KeyCode_Impl_.EJECT = 1073742105;
lime.ui._KeyCode.KeyCode_Impl_.SLEEP = 1073742106;
lime.ui.KeyEventManager.onKeyDown = new lime.app.Event();
lime.ui.KeyEventManager.onKeyUp = new lime.app.Event();
lime.ui._KeyEventManager.KeyEventType_Impl_.KEY_DOWN = 0;
lime.ui._KeyEventManager.KeyEventType_Impl_.KEY_UP = 1;
lime.ui.MouseEventManager.onMouseDown = new lime.app.Event();
lime.ui.MouseEventManager.onMouseMove = new lime.app.Event();
lime.ui.MouseEventManager.onMouseUp = new lime.app.Event();
lime.ui.MouseEventManager.onMouseWheel = new lime.app.Event();
lime.ui._MouseEventManager.MouseEventType_Impl_.MOUSE_DOWN = 0;
lime.ui._MouseEventManager.MouseEventType_Impl_.MOUSE_UP = 1;
lime.ui._MouseEventManager.MouseEventType_Impl_.MOUSE_MOVE = 2;
lime.ui._MouseEventManager.MouseEventType_Impl_.MOUSE_WHEEL = 3;
lime.ui.TouchEventManager.onTouchEnd = new lime.app.Event();
lime.ui.TouchEventManager.onTouchMove = new lime.app.Event();
lime.ui.TouchEventManager.onTouchStart = new lime.app.Event();
lime.ui._TouchEventManager.TouchEventType_Impl_.TOUCH_START = 0;
lime.ui._TouchEventManager.TouchEventType_Impl_.TOUCH_END = 1;
lime.ui._TouchEventManager.TouchEventType_Impl_.TOUCH_MOVE = 2;
lime.ui.Window.onWindowActivate = new lime.app.Event();
lime.ui.Window.onWindowClose = new lime.app.Event();
lime.ui.Window.onWindowDeactivate = new lime.app.Event();
lime.ui.Window.onWindowFocusIn = new lime.app.Event();
lime.ui.Window.onWindowFocusOut = new lime.app.Event();
lime.ui.Window.onWindowMove = new lime.app.Event();
lime.ui.Window.onWindowResize = new lime.app.Event();
lime.ui.Window.eventInfo = new lime.ui._Window.WindowEventInfo();
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_FULLSCREEN = 1;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_BORDERLESS = 2;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_RESIZABLE = 4;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_HARDWARE = 8;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_VSYNC = 16;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_HW_AA = 32;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_HW_AA_HIRES = 96;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_ALLOW_SHADERS = 128;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_REQUIRE_SHADERS = 256;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_DEPTH_BUFFER = 512;
lime.ui._Window.WindowFlags_Impl_.WINDOW_FLAG_STENCIL_BUFFER = 1024;
lime.ui._Window.WindowEventType_Impl_.WINDOW_ACTIVATE = 0;
lime.ui._Window.WindowEventType_Impl_.WINDOW_CLOSE = 1;
lime.ui._Window.WindowEventType_Impl_.WINDOW_DEACTIVATE = 2;
lime.ui._Window.WindowEventType_Impl_.WINDOW_FOCUS_IN = 3;
lime.ui._Window.WindowEventType_Impl_.WINDOW_FOCUS_OUT = 4;
lime.ui._Window.WindowEventType_Impl_.WINDOW_MOVE = 5;
lime.ui._Window.WindowEventType_Impl_.WINDOW_RESIZE = 6;
lime.utils.ByteArray.lime_byte_array_overwrite_file = lime.system.System.load("lime","lime_byte_array_overwrite_file",2);
lime.utils.ByteArray.lime_byte_array_read_file = lime.system.System.load("lime","lime_byte_array_read_file",1);
lime.utils.ByteArray.lime_lzma_decode = lime.system.System.load("lime","lime_lzma_decode",1);
lime.utils.ByteArray.lime_lzma_encode = lime.system.System.load("lime","lime_lzma_encode",1);
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
