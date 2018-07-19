/*
    分页组件
    by feizhaojun@xdf.cn
    2017-10-09
 */

function Page(opt){
    this.el = opt.el || '#page'
    this.current = opt.current || 1
    this.total = opt.total || 1
    this.showNum = opt.showNum || 5
    this.callback = opt.callback || function () {}
    if (opt.current > opt.total) {
        this.current = opt.total
    }
}

Page.prototype.init = function () {
    // 页数小于2则不分页
    if(this.total < 2){
        $(this.el).html('')
        return
    }

    var numBefore = parseInt(this.showNum / 2)
    var numAfter = parseInt(this.showNum / 2)
    if (this.showNum % 2 === 0) {
        numBefore--
    }

    var h = []
    // 第一个页码必须大于 0
    if (this.current - numBefore < 1) {
        numBefore = this.current - 1
    }
    if (this.current + numAfter > this.total) {
        numAfter = this.total - this.current
    }
    h.push('<ul class="page-content"><li><a class="page-prev" href="javascript:;"></a></li>')
    if(this.current - numBefore > 1){
        // 就算当前页大于 3，第 1 页也是必然显示的
        h.push('<li><a href="javascript:;">1</a></li>')
        if(this.current - numBefore > 2){
            // 当前页面大于 4，省略前面页码
            h.push('<li><span>...</span></li>')
        }
    }

    for(var i = this.current - numBefore; i <= this.current + numAfter; i++){
        if(i <= this.total){
            if(i == this.current){
                h.push('<li><a class="active" href="javascript:;">' + i + '</a>')
            }else{
                h.push('<li><a href="javascript:;">' + i + '</a>')
            }
            h.push('</li>')
        }
    }
    if(this.current + numBefore < this.total - 1){
        if(this.current + numBefore < this.total - 2){
            h.push('<li><span>...</span></li>')
        }
        h.push('<li><a href="javascript:;">' + this.total + '</a></li>')
    }
    h.push('<li><a class="page-next" href="javascript:void(0)"></a></li></ul>')
    $(this.el).html(h.join(''))
    var that = this

    $('ul.page-content li a').on('click', function(){
        if ($(this).hasClass('page-prev')) {
            that.current --
            if(that.callback && that.current > 0){
                that.callback(that.current)
            }else if(that.current <= 0){
                that.current = 1
            }
        } else if ($(this).hasClass('page-next')) {
            that.current ++
            if(that.callback && that.current <= that.total){
                that.callback(that.current)
            }else if(that.current > that.total){
                that.current = that.total
            }
        } else {
            that.current = +$(this).html()
            if(that.callback){
                that.callback(that.current)
            }
        }
        that.init()
    })
}