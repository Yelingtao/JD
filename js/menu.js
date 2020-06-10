/** 要实现鼠标移动到头部主导航栏上时，自动显示此导航栏 */
class Menu {
    /**构造函数 */
    constructor(id) {
        this.box = document.querySelector(id);/**获取到当前节点 */
        this.lis = this.box.querySelectorAll("li");
        this.subSidebarItems = this.box.querySelectorAll(".sub-menu");

        this.timer1 = null;
        this.timer2 = null;

        this.init();
    }

    /** 初始化 */
    init() {
        this.lis.forEach((element) => {
            /**对这个节点添加监听 (鼠标一上去的时候)*/
            element.addEventListener("mouseenter", (e) => {
                let li = e.target;
                /**主要控制鼠标 只响应最后一次停留的地方 */
                if (this.timer1 != null) {
                    clearTimeout(this.timer1);
                }

                this.timer1 = setTimeout(() => {
                    this.subSidebarItems.forEach((element) => {
                        element.classList.remove("active");
                    })
                    li.children[1].classList.add("active");

                }, 200)

            }, false)
        });



        this.lis.forEach((element) => {
            /**对这个节点添加监听 (鼠标离开的时候)*/
            element.addEventListener("mouseleave", (e) => {
                let li = e.target;
                /**主要控制鼠标 只响应最后一次停留的地方 */
                if (this.timer2 != null) {
                    clearTimeout(this.timer2);
                }

                this.timer2 = setTimeout(() => {
                    li.children[1].classList.remove("active");
                }, 200)
            }, false)
        });


    }




}