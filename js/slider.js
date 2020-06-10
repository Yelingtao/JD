class Slider {
    constructor(id) {
        this.sliderBox = document.querySelector(id);
        this.photoContent = this.sliderBox.querySelectorAll(".photo-content");

        this.leftBtn = this.sliderBox.querySelector(".slider-left-btn");
        this.rightBtn = this.sliderBox.querySelector(".slider-right-btn");


        if (id == "#main-slider") {
            this.photoIndexBox = this.sliderBox.querySelector(".photo-index");
            this.sliderBox.style.width = 590 + "px";
        } else if (id == "#mod-advices") {
            this.sliderBox.style.width = 190 + "px";
            this.photoContent[0].style.margin = '0 0 5% 0';
            this.photoContent[1].style.margin = '0 0 5% 0';
        }


        this.photoListLength = this.photoContent[0].children.length;
        this.frameWidth = this.sliderBox.clientWidth;
        this.id = id;

        this.index = 0;
        this.animated = false;

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
        this.copyPhoto();
        if (this.id == "#main-slider") {
            this.initIndex();
            this.autoPlay();
        }

        this.rightLeftClick();
        this.photoContentListener();
    }

    copyPhoto() {
        for (let i = 0; i < this.photoContent.length; i++) {
            const first = this.photoContent[i].firstElementChild.cloneNode(true);
            this.photoContent[i].appendChild(first);
            this.photoContent[i].style.width = (this.photoListLength + 1) * this.frameWidth + "px";
        }


    }
    /**
     *1.获取图片的张数，根据张数生成索引的个数
     *2.添加索引点击监听事件，实现切换
     */
    initIndex() {
        let frg = document.createDocumentFragment();
        for (let i = 0; i < this.photoListLength; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-index", i)
            if (i == 0) {
                li.className = "active";
            }
            frg.appendChild(li);
        }
        this.photoIndexBox.children[0].style.width = this.photoListLength * 20 + "px";
        this.photoIndexBox.children[0].appendChild(frg);


        this.photoIndexBox.children[0].addEventListener("click", (e) => {
            let photoIndex = (e.target).getAttribute("data-index");
            if (photoIndex == this.index) {
                return;
            }
            if (this.animated) {
                return;
            }
            let offset = (photoIndex - this.index) * this.frameWidth;
            this.index = photoIndex;
            this.move(offset);
        });

    }


    autoPlay() {
        this.auto = setInterval(() => {
            this.rightBtn.click();
        }, 3000);

        this.sliderBox.addEventListener("mouseenter", () => {
            clearInterval(this.auto);
        });

        this.sliderBox.addEventListener("mouseleave", () => {
            this.auto = setInterval(() => {
                this.rightBtn.click();
            }, 3000);
        });
    }


    rightLeftClick() {
        this.rightBtn.addEventListener("click", () => {
            if (this.animated) {
                return;
            }

            this.index++;

            this.move(this.index * this.frameWidth);
            if (this.index == this.photoListLength) {
                this.index = 0;
            }


        });

        this.leftBtn.addEventListener("mouseenter", () => {
            for (let i = 0; i < this.photoContent.length; i++) {
                if (this.index == 0) {
                    this.index = this.photoListLength;
                    this.photoContent[i].style.transition = "none";
                    this.photoContent[i].style.transform = "translateX(" + -this.index * this.frameWidth + "px)";
                }
            }

        });

        this.leftBtn.addEventListener("click", () => {
            if (this.animated) {
                return;
            }
            if (this.index == 0) {
                this.index = this.photoListLength;
            } else {
                this.index--;
            }


            this.move(this.index * this.frameWidth);
            if (this.index == 0) {
                this.index = this.photoListLength;
            }

        });
    }


    photoContentListener() {

        for (let i = 0; i < this.photoContent.length; i++) {
            this.photoContent[i].addEventListener("transitionend", () => {
                this.photoContent[i].style.transition = "none";
                this.photoContent[i].style.transform = "translateX(" + -this.index * this.frameWidth + "px)";
            });
        }


    }

    move(offset) {
        this.animated = true;


        if (this.id == "#main-slider") {
            // 先清除所有索引的样式
            const num = this.photoIndexBox.children[0].children.length;
            for (let i = 0; i < num; i++) {
                this.photoIndexBox.children[0].children[i].className = "";
            }

            // 判断是第几张图片，然后把对应的索引添加上样式
            if (this.index == this.photoListLength || this.index == 0) {
                this.photoIndexBox.children[0].children[0].className = "active";
            } else {
                this.photoIndexBox.children[0].children[this.index].className = "active";
            }
        }


        for (let i = 0; i < this.photoContent.length; i++) {
            this.photoContent[i].style.transition = "transform .5s ease";
            this.photoContent[i].style.transform = "translateX(" + -offset + "px)";
        }


        // 判断是否正在移动的过程中，如果是，则不执行下一个移动
        let ani = setInterval(() => {
            this.animated = false;
            clearInterval(ani);
        }, 500);
    }
}