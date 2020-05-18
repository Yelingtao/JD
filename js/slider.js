/**
 * 轮播图
 * 1.自动播放
 * 2.左右点击切换
 * 3.索引切换
 * 4.无限循环，无缝衔接
 */
class Slider {
    /**
     * 构造函数 
     * 1.获取相框（视野）
     * 2.获取装相片列表的div   photo-content
     * 3.获取相片列表  div     photo-list
     * 4.获取索引的 div   photoIndex-box
     * 5.获取相框的宽度
     * 6.获取有几张图片
     * 7.index 用于控制索引以及控制图片的移动
     * 8.auto用于控制定时无限自动轮播
     * 9.animated 状态：如果为true，表示正在移动，则不再响应事件
    */
    constructor(id) {
        this.frame = document.querySelector(id);
        this.photoContent = this.frame.querySelector(".photo-content");
        this.photoList = this.frame.querySelectorAll(".photo-list");
        this.indexBox = this.frame.querySelector(".photoIndex-box");

        this.sliderWidth = this.frame.clientWidth;
        this.photoListLength = this.photoList.length;
        this.index = 0;
        this.auto = null;
        this.animated = false;

        this.init();
    }


    init() {
        this.initIndexPoint();
        this.copyPhoto();
        this.leftRightClick();
        this.autoPlay();
        
        this.photoContent.addEventListener("transitionend", () => {
            this.photoContent.style.transition = "none";
            this.photoContent.style.transform = "translateX(" + -this.index*this.sliderWidth + "px)";
        });

        this.frame.querySelector(".left-btn").addEventListener("mouseenter", () => {
            if (this.index == 0) {
                this.index=this.photoListLength;
                this.photoContent.style.transition = "none";
                this.photoContent.style.transform = "translateX(" + -this.index*this.sliderWidth + "px)";
            }
        });
    }

    /**
     * 自动播放
     */
    autoPlay() {
        this.auto = setInterval(() => {
            this.frame.querySelector(".right-btn").click();
        }, 3000);

        this.photoContent.addEventListener("mouseenter", () => {
            clearInterval(this.auto);
        });

        this.photoContent.addEventListener("mouseleave", () => {
            this.auto = setInterval(() => {
                this.frame.querySelector(".right-btn").click();
            }, 3000);
        });

    }

    


    /**
     * 点击箭头切换
     * 1.判断是否正在移动，如果是，则return
     * 2.判断index是否越界，如果是，则return
     * 3.移动
     * 4.判断index，用于无缝衔接
     */
    leftRightClick() {
       this.frame.querySelector(".right-btn").addEventListener("click", () => {
           if(this.animated || this.index == this.photoListLength){
               return;
           }else{
                this.index++;
           }
           
           
           this.move(this.index*this.sliderWidth);
           this.index === this.photoListLength?this.index=0:'';
       });

        this.frame.querySelector(".left-btn").addEventListener("click", () => {
            if(this.animated || this.index == 0){
                return;
            }else{
                this.index--;
           }
            this.move(this.index*this.sliderWidth);
            this.index == 0?this.index=this.photoListLength:'';
        });
    }

    /**
     * 初始化索引:有几张图片就添加几个索引
     * 1.创建一个doucumentFragment
     * 2.循环创建li，并未li添加属性，方便点击移动使用
     * 3.往doucumentFragment逐一添加li
     * 4.把循环添加好的doucumentFragment添加到index里（ol里），并为ol设置宽度
     * 5.添加监听 >> 5.1获取你点击的当前节点的index；
     *           >> 5.2判断你点击的节点是否就是正在显示的节点，如果是，则return
     *           >> 5.3计算移动的距离，调用移动方法，并重新设置index的值
     */
    initIndexPoint() {
        let frg = document.createDocumentFragment();
        for (let i = 0; i < this.photoListLength; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-index", i + 1);
            if (i == 0) {
                li.className = "active";
            }
            frg.appendChild(li);
        }

        this.indexBox.children[0].style.width = this.photoListLength * 20 + "px";
        this.indexBox.children[0].appendChild(frg);

        
        /**监听点击事件（实现点击切换图片和索引） */
        this.indexBox.children[0].addEventListener("click", (e) => {
            let pointIndex = (e.target).getAttribute("data-index");
            if (pointIndex == this.index) {
                return;
            }

            if(this.animated){
                return;
            }

            let offset = (pointIndex - this.index)*this.sliderWidth;
            this.index = pointIndex-1;
            this.move(offset);
        });

    }


    /**
     * 复制图片
     * 1.复制第一张放在最后
     * 2.重新设置图片列表的长度
     */
    copyPhoto() {
        const first = this.photoContent.firstElementChild.cloneNode(true);
        this.photoContent.appendChild(first);
        this.photoContent.style.width = (this.photoListLength+1) * this.sliderWidth + "px";
    }

    /**
     * 移动方法
     * 1.把状态设置为正在移动，并移动
     * 2.判断是否移动完成，如果完成则把状态改回false
     * 3.控制索引的变化 >> 3.1 先循环清除索引的样式
     *                 >> 3.2为当前显示的节点设置样式
     */
    move(offset){
        this.animated=true;
        this.photoContent.style.transition = "transform 0.3s ease";
        this.photoContent.style.transform = "translateX(" + -offset + "px)";
        
        let ani = setInterval(() => {
            var translates=document.defaultView.getComputedStyle(this.photoContent,null).transform;
            var translateX = parseFloat(translates.substring(7).split(',')[4])
            if (-translateX == offset) {
                this.animated = false;
                clearInterval(ani);
            }
        },100);
        
        for (let i = 0; i < this.photoListLength; i++) {
            this.indexBox.children[0].children[i].className = "";
        }

        if(this.index == this.photoListLength || this.index == 0){
            this.indexBox.children[0].children[0].className = "active";
        }else{
            this.indexBox.children[0].children[this.index].className = "active";
        }
    }

    

}