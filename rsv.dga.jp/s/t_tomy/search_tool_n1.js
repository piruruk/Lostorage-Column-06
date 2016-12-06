function URLencode(str){
    var i, encoded_str, char_code, padded_str;
    encoded_str = "";
    for (i = 0; i < str.length; i++){
        char_code = str.charCodeAt(i);
        if (char_code == 0x20){
            encoded_str += "+";
        }
        else {
            if (((0x30 <= char_code) && (char_code <= 0x39)) || ((0x41 <= char_code) && (char_code <= 0x5a)) || ((0x61 <= char_code) && (char_code <= 0x7a))){
                encoded_str += str.charAt(i);
            }
            else if ((char_code == 0x2a) || (char_code == 0x2e) || (char_code == 0x2d) || (char_code == 0x5f)) {
                encoded_str += str.charAt(i);
            }
            else {
                if ( char_code > 0xffff ) {
                    encoded_str += "%" + ((char_code >> 18) | 0xf0).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 12) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 6) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else if ( char_code > 0x7ff ) {
                    encoded_str += "%" + ((char_code >> 12) | 0xe0).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 6) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else if ( char_code > 0x7f ) {
                    encoded_str += "%" + (((char_code >> 6) & 0x1f) | 0xc0).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else {
                    padded_str = "0" + char_code.toString(16).toUpperCase();
                    encoded_str += "%" + padded_str.substr(padded_str.length - 2, 2);
                }
            }
        }
    }
    return encoded_str;
}

function mysearch(obj){
    url = 'http://tt-search.dga.jp/?ref='+URLencode(location.href)+'&kw='+URLencode(obj.kw.value)+'&ie='+obj.ie.value+'&by=js';
    document.location.href=url;
    return false;
}
function mysearch_product(obj){
    url = 'http://tt-search.dga.jp/?ref='+URLencode(location.href)+'&product=1&kw='+URLencode(obj.kw.value)+'&ie='+obj.ie.value+'&by=js';
    document.location.href=url;
    return false;
}

(function() {
    // suggest
    var sBaseName = 't_tomy';
    if ('https:' == document.location.protocol) {
        var sProtocol   = 'https';
    	var sDomainName = 'rsv.dga.jp';
    } else {
        var sProtocol   = 'http';
    	var sDomainName = 'cache.dga.jp';
    }
    var sIsearchAcJs  = sProtocol +'://'+  sDomainName  +'/s/'+ sBaseName +'/i_search_assist_n1.js';
    var sIsearchAcCss = sProtocol +'://'+  sDomainName  +'/s/'+ sBaseName +'/ac.css';
    var s  = document.getElementsByTagName('script')[0];
    var da1 = document.createElement('script'); da1.type = 'text/javascript'; da1.async = true;
    da1.src = sIsearchAcJs;
    s.parentNode.insertBefore(da1, s);
    var da2  = document.createElement('link'); da2.type = 'text/css'; da2.rel = 'stylesheet';
    da2.href = sIsearchAcCss;
    s.parentNode.insertBefore(da2, s);
})();
