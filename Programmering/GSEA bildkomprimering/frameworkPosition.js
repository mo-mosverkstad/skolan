class CanvasPosition {
    constructor(ctx) {
        this.ctx = ctx;
        this.border = 10;
        this.histogramSize = {w:101, h:256};
        this.imagesPerRow = 2;
        this.imagesPerColumn = 4;
        this.imageSize = {w:1, h:1};
        this.canvasSize = {w:1, h:1};
    }
    
    setImageSize(imageWidth, imageHeight) {
        this.imageSize.w = imageWidth;
        this.imageSize.h = imageHeight;
        this.setCanvasSize();
    }
    
    setImagesPerRow(num) {
        this.imagesPerRow = num;
        this.setCanvasSize();
    }
    
    setImagesPerColumn(num) {
        this.imagesPerColumn = num;
        this.setCanvasSize();
    }
    
    sethistogramSize(histogramWidth, histogramHeight) {
        this.histogramSize.w = histogramWidth;
        this.histogramSize.h = histogramHeight;
        this.setCanvasSize();
    }
    
    setCanvasSize() {
        this.canvasSize.w = (this.imageSize.w + this.histogramSize.w) * this.imagesPerRow + this.border * (this.imagesPerRow + 1);
        this.canvasSize.h = (Math.max(this.imageSize.h, this.histogramSize.h) + this.border) * this.imagesPerColumn;
        this.ctx.canvas.width  = canvasPosition.getCanvasSize().w;
        this.ctx.canvas.height = canvasPosition.getCanvasSize().h;
    }
    
    getCanvasSize() {
        return this.canvasSize;
    }
    
    getImagePosition(xn, yn) {
        return {x:(this.imageSize.w + this.border*3 + this.histogramSize.w * 2)*xn,
                y:(Math.max(this.imageSize.h, this.histogramSize.h) + this.border)*yn};
    }
    
    getHistogramPosition(xn, yn) {
        return {x:this.imageSize.w + this.border + (this.histogramSize.w + this.border) * xn,
                y:(Math.max(this.imageSize.h, this.histogramSize.h) + this.border) * (yn + 1)};
    }
    
    gethistogramSize() {
        return this.histogramSize;
    }
}