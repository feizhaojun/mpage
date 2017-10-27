/*
    分页组件
    by feizhaojun@xdf.cn
    2017-10-09
 */

function Page(opt){
    var _opt = {
        el:'page',
        current:1,
        total:1
    }
    var opt = opt || _opt;

    // 页数小于2则不分页
    if(opt.total<2){
        $('#' + opt.el).html('');
        return;
    }

    var h = [];
    var first = opt.current - 3;
    do{
        first++;
    }while(first < 1);
    console.log(first);

    h.push('<div class="c"><div class="right"><ul class="c pagebox"><li><a class="g-page-left" href="javascript:;"></a></li>');
    if(opt.current > 3){
        h.push('<li class="g-page-num"><a onclick="" href="javascript:void(0)">1</a></li>');
        if(opt.current > 4){
            h.push('<li class="g-page-num"><span>...</span></li>');
        }
    }
    for(var i=0;i<opt.current+2;i++){
        if(first + i <= opt.total){
            if(first + i == opt.current){
                h.push('<li class="g-page-num"><a class="hover" onclick="" href="javascript:;">' + (first + i) + '</a>');
            }else{
                h.push('<li class="g-page-num"><a onclick="" href="javascript:;">' + (first + i) + '</a>');
            }
            h.push('</li>');
        }
    }
    if(opt.total - opt.current > 2){
        if(opt.total - opt.current > 3){
            h.push('<li class="g-page-num"><span>...</span></li>');
        }
        h.push('<li class="g-page-num"><a onclick="" href="javascript:void(0)">' + opt.total + '</a></li>');
    }
    h.push('<li><a class="g-page-right" href="javascript:void(0)"></a></li></ul></div></div>');
    $('#' + opt.el).html(h.join(''));

    $('.g-page-num').on('click','a',function(){
        opt.current = $(this).html();
        if(opt.callback){
            opt.callback(opt.current);
        }
    });
    $('.g-page-left').on('click',function(){
        opt.current --;
        if(opt.callback && opt.current > 0){
            opt.callback(opt.current);
        }else if(opt.current <= 0){
            opt.current = 1;
        }
    });
    $('.g-page-right').on('click',function(){
        opt.current ++;
        if(opt.callback && opt.current <= opt.total){
            opt.callback(opt.current);
        }else if(opt.current > opt.total){
            opt.current = opt.total;
        }
    });
}