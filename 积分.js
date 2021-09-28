function main(){
  auto.waitFor();
	launch("com.spicdt.elink");
	sleep(500);
  text("工作台").findOne().parent().click();
  text("红色百年").findOne().parent().parent().click();
  text("我的").findOne().parent().click();
  toast("加载积分页面");
  sleep(2000);
  
  readflow("党组声音", 0, false);
  readflow("政策文件", 2, false);
  readflow("政策文件", 2, false);
  readflow("工作动态", 2, false);
  readflow("工作动态", 2, false);
  readflow("知识城邦", 2, true);
  readflow("知识城邦", 2, false);
  readflow("知识城邦", 2, false);
  shipin(2);
  toast("all finished");
}

function readflow(name,n,zan){
  let namebutton = text(name).findOne();
  log(namebutton.indexInParent());
  let readbutton = namebutton.parent().child(namebutton.indexInParent()+4);
  if(readbutton.text()=="已完成"){
    toast(name+"已完成");
    return
  }
  readbutton.click();
  
  let list=textMatches(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/).untilFind();
  log(list.length);
  list.forEach(function(child, index){
    if((!child.visibleToUser()) || (index>n)){return};
    clickit(child);
    sleep(2000);
    textMatches(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9].*?$/).untilFind();
    
    if(zan){comm();}
    
    toast("阅读5s");
    sleep(5000);
    back();
    sleep(2000);
  })
  back();
  sleep(1000);
  return
}

function shipin(n){
  let namebutton = text("视频观看").findOne();
  let readbutton = namebutton.parent().child(namebutton.indexInParent()+4);
  if(readbutton.text()=="已完成"){
    return
  }
  readbutton.click();
  
  let list=className("android.widget.Image").depth(15).untilFind();
  log(list.length);
  list.forEach(function(child, index){
    if((!child.visibleToUser()) || (index>n)){return};
    clickit(child);
    sleep(2000);
    text("播放").findOne().click();
    sleep(80000);
    back();
    sleep(2000);
  })
  back();
  sleep(1000);
  return
}

function clickit(button){
  click(button.bounds().centerX(),button.bounds().centerY());
}

function comm(){
  text("点赞").findOne().click();
  setClip("科技进步带动国家发展");
  className("android.widget.EditText").depth(14).findOne().click();
  let button = className("android.widget.EditText").depth(16).findOne();
  
  sleep(1000);
  toast("直接粘贴");
  button.paste();
  
  sleep(1000);
  text("发送").findOne().click();
  text("点赞").findOne().click();
}

main();