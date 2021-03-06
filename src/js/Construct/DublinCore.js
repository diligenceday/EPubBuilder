/**
 * @desc 依赖于jQuery;
 * */
define(["Construct/Lang"], function( LangFn ) {
    /*
    $.xmlns["dc"] = "http://purl.org/dc/elements/1.1/";
    */
    var langFn = new LangFn();

    function Toc( ) {
    };

    /**
     * @desc 获取dublinCore
     * @return {Object}
     * */
    Toc.prototype.getDublinCore = function () {
        var data = {};
        $.each($(".export-div form").serializeArray(),function(i,e) {
            e.value&&(data[ e.name ] = e.value);
        });
        return data;
    };

    /**
     * @desc 设置dublinCore的核心到html中;
     * @param {HTML ELEMENT};
     * return void;
     * */
    Toc.prototype.setDublinCore = function ( xmlElement ) {
        var form = $(".export-div form");
        $(xmlElement).find("metadata").children().each(function(i, e) {
            var name = e.tagName.split(":").pop() || "";
            name&&form.find("[name="+ name+"]").val( e.textContent || e.innerText );
        });
    };

    /**
     * @desc 设置电子书的描述和书籍封面图;
     * */
    Toc.prototype.setCover = function(base64, desc) {
        var form = $(".export-div form");
        form.find("[name=coverpage]").val( desc );
        $("#lang-coverImage").attr("base64", base64);
        !!base64&&$("#lang-coverImage").text( langFn.getProperty("coverImage") );
    }

    return Toc;
});