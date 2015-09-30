;(function(){

  //var onHost= 'http://sf.panli.com/Ued/Special/20151010/';
  var onHost= '';
  var loadingArr = [
        onHost+'dist/images/star-bg.png',
        onHost+'dist/images/star.png',
        onHost+'dist/images/head-iphone6.png',
    ];

    var loadF = false;

    var imgNum = 0;
    for( var i=0;i<loadingArr.length;i++){
        var img = document.createElement('img');
        img.src = loadingArr[i];
        img.onload = function(){
            imgNum ++ ;
            Z('load-count').style.width = Math.floor(((imgNum/loadingArr.length).toFixed(2)*100)) + '%';
            Z('load-text').innerHTML = Math.floor(((imgNum/loadingArr.length).toFixed(2)*100))+"%";
            if(imgNum == loadingArr.length){
                Z('progress-bar').style.display = "none";
                loadF = true;
            }
        };
    };

})();
