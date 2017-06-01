function pageNext(data){
    if(pageNub == data.length){
        $('.nextPage span')
            .html('当前为最新新闻')
            .attr({'data-set':false})
    }
    if(pageNub == 1 ){
        $('.prePage span')
            .html('当前为最后一篇')
            .attr({'data-set':false})
    }
    $('.nextPage span').html(data[pageNub]);
    $('.prePage span').html(data[pageNub-2]);
    // 保存新闻子页条目数
    pageNubMax = data.length;
}

$.ajax({
    url : 'htmls/news/newsDetail.txt',
    success : function(data){
        pageNext(data)
    }
});



$('.prePage').on('click',function(){
    if(pageNub ==1){
        return
    }
    pageNub--;
    $.ajax({
        url : 'htmls/news/newsDetail'+ pageNub +'.html',
        success : function(data){
            loadnews(data)
        }
    });
});

$('.nextPage').on('click',function(){
    if(pageNub == pageNubMax){
        return;
    }
    pageNub++;
    $.ajax({
        url : 'htmls/news/newsDetail'+ pageNub +'.html',
        success : function(data){
            loadnews(data)
        }
    });
});


function loadnews(data){
    $('.container')
        .attr('data-newsPage',pageNub)
        .html(data)
}

