class Slider {
    constructor(id) {
        this.sliderBox = document.querySelector(".slider");
        this.photoFrame = this.sliderBox.querySelector(".photo-frame");
        this.photoContent = this.sliderBox.querySelector(".photo-content");
        this.photoLists = this.sliderBox.querySelectorAll(".photo-list");
        this.photoIndex = this.sliderBox.querySelector(".photo-index");
        this.leftBtn = this.sliderBox.querySelector(".slider-left-btn");
        this.rightBtn = this.sliderBox.querySelector(".slider-right-btn");

        this.frameWidth = this.photoFrame.clientWidth;
        this.photoLength = this.photoLists.length;

        this.index = 0;
        this.animation = false;

        this.init();
    }

    /**
     * 1.复制第一张图片，放在列表最后；并为图片列表设置长度
     * 2.初始化索引
     * 3.自动播放（鼠标移上去是，暂停）
     * 4.左右点击切换
     * 5.索引切换
     */
    init() {

    }

    copyPhoto() {
        const first = this.photoLists[0].cloneNode(true);
        this.photoContent.appendChild(first);
        this.photoContent.style.width = (this.photoLength + 1) * this.frameWidth + "px";
    }




}