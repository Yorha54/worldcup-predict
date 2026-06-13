(function () {
  const rows = [
    ["Mexico","墨西哥","🇲🇽","A"],["South Africa","南非","🇿🇦","A"],["South Korea","韩国","🇰🇷","A"],["Czechia","捷克","🇨🇿","A"],
    ["Canada","加拿大","🇨🇦","B"],["Bosnia-Herzegovina","波黑","🇧🇦","B"],["Qatar","卡塔尔","🇶🇦","B"],["Switzerland","瑞士","🇨🇭","B"],
    ["Brazil","巴西","🇧🇷","C"],["Morocco","摩洛哥","🇲🇦","C"],["Haiti","海地","🇭🇹","C"],["Scotland","苏格兰","🏴","C"],
    ["United States","美国","🇺🇸","D"],["Paraguay","巴拉圭","🇵🇾","D"],["Australia","澳大利亚","🇦🇺","D"],["Türkiye","土耳其","🇹🇷","D"],
    ["Germany","德国","🇩🇪","E"],["Curaçao","库拉索","🇨🇼","E"],["Ivory Coast","科特迪瓦","🇨🇮","E"],["Ecuador","厄瓜多尔","🇪🇨","E"],
    ["Netherlands","荷兰","🇳🇱","F"],["Japan","日本","🇯🇵","F"],["Sweden","瑞典","🇸🇪","F"],["Tunisia","突尼斯","🇹🇳","F"],
    ["Belgium","比利时","🇧🇪","G"],["Egypt","埃及","🇪🇬","G"],["Iran","伊朗","🇮🇷","G"],["New Zealand","新西兰","🇳🇿","G"],
    ["Spain","西班牙","🇪🇸","H"],["Cape Verde Islands","佛得角","🇨🇻","H"],["Saudi Arabia","沙特阿拉伯","🇸🇦","H"],["Uruguay","乌拉圭","🇺🇾","H"],
    ["France","法国","🇫🇷","I"],["Senegal","塞内加尔","🇸🇳","I"],["Iraq","伊拉克","🇮🇶","I"],["Norway","挪威","🇳🇴","I"],
    ["Argentina","阿根廷","🇦🇷","J"],["Algeria","阿尔及利亚","🇩🇿","J"],["Austria","奥地利","🇦🇹","J"],["Jordan","约旦","🇯🇴","J"],
    ["Portugal","葡萄牙","🇵🇹","K"],["Congo DR","民主刚果","🇨🇩","K"],["Uzbekistan","乌兹别克斯坦","🇺🇿","K"],["Colombia","哥伦比亚","🇨🇴","K"],
    ["England","英格兰","🏴","L"],["Croatia","克罗地亚","🇭🇷","L"],["Ghana","加纳","🇬🇭","L"],["Panama","巴拿马","🇵🇦","L"]
  ];
  const aliases = {"Korea Republic":"South Korea","Czech Republic":"Czechia","Bosnia and Herzegovina":"Bosnia-Herzegovina","Turkey":"Türkiye","IR Iran":"Iran","Cape Verde":"Cape Verde Islands","DR Congo":"Congo DR","Côte d'Ivoire":"Ivory Coast"};
  const strengths = {
    "Argentina":94,"France":93,"Spain":92,"England":90,"Brazil":89,"Portugal":88,"Germany":87,"Netherlands":86,"Morocco":85,"Uruguay":84,"Colombia":84,"Belgium":82,
    "Croatia":81,"Japan":81,"United States":80,"Mexico":79,"Senegal":79,"Switzerland":79,"Ecuador":78,"Austria":78,"South Korea":77,"Norway":77,"Türkiye":76,"Iran":76,
    "Australia":75,"Scotland":74,"Ivory Coast":74,"Algeria":73,"Paraguay":73,"Egypt":72,"Sweden":72,"Canada":71,"Tunisia":70,"Czechia":70,"Saudi Arabia":68,
    "Qatar":67,"Bosnia-Herzegovina":67,"Ghana":67,"Panama":66,"South Africa":65,"Uzbekistan":65,"Iraq":64,"Jordan":62,"Cape Verde Islands":62,"Congo DR":62,"New Zealand":59,"Haiti":56,"Curaçao":54
  };
  const attacks = {
    "Argentina":93,"France":95,"Spain":94,"England":92,"Brazil":92,"Portugal":91,"Germany":90,"Netherlands":88,"Morocco":86,"Uruguay":86,"Colombia":87,"Belgium":86,
    "Croatia":80,"Japan":84,"United States":83,"Mexico":80,"Senegal":81,"Switzerland":79,"Ecuador":78,"Austria":82,"South Korea":80,"Norway":91,"Türkiye":84,"Iran":77,
    "Australia":75,"Scotland":75,"Ivory Coast":79,"Algeria":78,"Paraguay":72,"Egypt":80,"Sweden":87,"Canada":77,"Tunisia":66,"Czechia":71,"Saudi Arabia":70,
    "Qatar":69,"Bosnia-Herzegovina":70,"Ghana":79,"Panama":70,"South Africa":66,"Uzbekistan":69,"Iraq":65,"Jordan":62,"Cape Verde Islands":63,"Congo DR":76,"New Zealand":62,"Haiti":60,"Curaçao":57
  };
  const defences = {
    "Argentina":93,"France":91,"Spain":92,"England":91,"Brazil":87,"Portugal":90,"Germany":84,"Netherlands":87,"Morocco":91,"Uruguay":87,"Colombia":84,"Belgium":78,
    "Croatia":84,"Japan":81,"United States":77,"Mexico":78,"Senegal":85,"Switzerland":85,"Ecuador":86,"Austria":80,"South Korea":76,"Norway":74,"Türkiye":75,"Iran":80,
    "Australia":78,"Scotland":76,"Ivory Coast":76,"Algeria":72,"Paraguay":82,"Egypt":75,"Sweden":73,"Canada":68,"Tunisia":76,"Czechia":72,"Saudi Arabia":66,
    "Qatar":64,"Bosnia-Herzegovina":65,"Ghana":65,"Panama":69,"South Africa":67,"Uzbekistan":70,"Iraq":67,"Jordan":63,"Cape Verde Islands":68,"Congo DR":73,"New Zealand":58,"Haiti":55,"Curaçao":52
  };
  window.WORLD_CUP_TEAM_META = Object.fromEntries(rows.map(([key,name,flag,group]) => [key,{key,name,flag,group}]));
  window.WORLD_CUP_TEAM_ALIASES = aliases;
  window.WORLD_CUP_TEAM_STRENGTH = strengths;
  window.WORLD_CUP_TEAM_ATTACK = attacks;
  window.WORLD_CUP_TEAM_DEFENCE = defences;
})();
