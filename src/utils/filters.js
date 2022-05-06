export function getball(val){
    if(val === 1){return '足球' }
    if(val === 31){return "世界杯" }
    if(val === 32){return "歐洲杯" }
    if(val === 83){return "彩球" }
    if(val === 85){return "ESports" }
    if(val === 101 || val === 4 || val === 12){return "棒球" }
    if(val === 102 || val === 3 || val === 16){return "籃球" }
    if(val === 55){return "网球" }
    if(val === 72){return "赛马赛狗" }
    if(val === 5){return "美足" }
    if(val === 21){return "乒乓球" }
    if(val === 22){return "羽毛球" }
    if(val === 82){return "冰球" }
}
export function bestheadfilte(val,typeid,grpid){
    var WagerGrp = ''
    var Wagertype = ''
    var text = ''
    if(grpid === 10 || grpid === 0 || grpid === 20){
        WagerGrp = '全場'
    }else if(grpid === 1 || grpid === 11 || grpid === 21){
        WagerGrp = '上半'
    }else {
        WagerGrp = ''
    }
    if(typeid.indexOf(101 || 103) > -1){
        Wagertype = '讓球'
        text = WagerGrp + Wagertype
    }else if(typeid.indexOf(102 || 104 || 109) > -1){
        Wagertype = '大小'
        text = WagerGrp + Wagertype
    }else if(typeid.indexOf(111 || 110) > -1){
        Wagertype = '獨贏'
        text = WagerGrp + Wagertype
    }else if(typeid.indexOf(105 || 113) > -1){
        Wagertype = '單雙'
        text = WagerGrp + Wagertype
    }else if(typeid.indexOf(106)){
        Wagertype = '一输'
        text = WagerGrp + Wagertype
    }else if(typeid.indexOf(121)){
        text = '局數讓球'
    }else if(typeid.indexOf(122)){
        text =  '局數大小'
    }else if(typeid.indexOf(128)){
        text =  '總分讓球'
    }else if(typeid.indexOf(129)){
        text =  '總分單雙'
    }else if(typeid.indexOf(126)){
        text =  '局數單雙'
    }else if(typeid.indexOf(127)){
        text =  '局數獨贏'
    }else if(typeid.indexOf(125)){
        text =  '總分大小'
    }else if(typeid.indexOf(123)){
        text =  '盤數獨贏'
    }else if(typeid.indexOf(124)){
        text =  '盤數讓球'
    }
    return text
}