var isMobile = function() {

    return {
        check: function() {
            var ua = navigator.userAgent.toLowerCase();
            var mobiles = this.mobiles;
            var result = false;
            for(var i = 0, len = mobiles.length; i < len; i++) {
                if(ua.indexOf(mobiles[i]) != -1) {
                    result = false;
                }
            }
        },
        mobiles: [
            "midp","240x320","blackberry","netfront","nokia","panasonic","portalmmm","sharp","sie-","sonyericsson","symbian","windows ce","benq","mda","mot-","opera mini","philips","pocket pc","sagem","samsung","sda","sgh-","vodafone","xda","palm","iphone","ipod","android"
        ]
    }
}();

