/**
 * Created with JetBrains WebStorm.
 * User: sostapenko
 * Date: 5/18/13
 * Time: 2:03 PM
 * To change this template use File | Settings | File Templates.
 */

define(["jquery", "mustache", "jplist"], function($, Mustache) {

    function ProductParser (content, template) {
        var content;
        var template;

        var tmpl;
        var  tdata = {};

       function insert() {
            //template
            $.get(
                template,
                function(d){
                    tmpl = d
                }
            ),
            //data
            $.getJSON(
                content,
                function(d){
                    $.extend(tdata,d);
                }
            ),

            $(document).ajaxStop(function(){
                for (var i = 0;i<tdata.products.length; i++) {
                    var renderedPage = Mustache.to_html(tmpl, tdata.products[i]).replace(/^\s*/mg, '');
                    $("#productsList").append(renderedPage);
                }


            })
        }//end insert

        this.init = function() {
            insert();
            return this;
        }
    }//productParser

    var products = new ProductParser("data/data.json", "templates/template.html");
    return products;

});
