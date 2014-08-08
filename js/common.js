/*
 * Copyright (c) 2009, 2010, 2011, 2012, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview liuyun index js.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.0, July 24, 2014
 */
var index = {
    _MEDIAWIDTH: 630,
    _MINSCROLLTOP: 360,
    headerScroll: function() {
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > index._MINSCROLLTOP) {
                $(".nav").addClass("stuck");

                if (index._WINDOWW > index._MEDIAWIDTH) {
                    $(".nav-button").animate({"opacity": "1"}, {
                        queue: false,
                        duration: 300
                    });
                }

                if (scrollTop <= index._BUSINESSH) {
                    $(".nav li a").removeClass("current");
                    $(".nav li a:eq(1)").addClass("current");
                } else if (scrollTop > index._BUSINESSH && scrollTop <= index._CASESH) {
                    $(".nav li a").removeClass("current");
                    $(".nav li a:eq(2)").addClass("current");
                } else if (scrollTop > index._CASESH && scrollTop <= index._ABOUTUSH) {
                    $(".nav li a").removeClass("current");
                    $(".nav li a:eq(3)").addClass("current");
                } else if (scrollTop > index._ABOUTUSH) {
                    $(".nav li a").removeClass("current");
                    $(".nav li a:eq(4)").addClass("current");
                }
            } else {
                $(".nav li a").removeClass("current");
                $(".nav li a:eq(0)").addClass("current");

                $(".nav").removeClass("stuck");

                if (index._WINDOWW > index._MEDIAWIDTH) {
                    $(".nav-button").animate({"opacity": "0"}, {
                        queue: false,
                        duration: 300
                    });
                }
            }
        });
    },
    init: function() {
        index._BUSINESSH = 240 + 180 + $("#business").height();
        index._CASESH = $("#cases").height() + index._BUSINESSH;
        index._ABOUTUSH = $("#aboutUs").height() + index._CASESH;
        index._WINDOWW = $(window).width();

        $("#skills").mouseover(function() {
            $(this).find(".progress").each(function() {
                var $progresse = $(this),
                        percentage = $progresse.data("percentage");
                $progresse.find(".bar").width($progresse.width() / 100 * percentage).html(percentage + "% &nbsp;");
            });

            $("#skills").unbind();
        });

        $(".nav a").click(function(event) {
            var $it = $(this),
                    scrollTop = 0;

            switch ($it.attr("href")) {
                case "#top":
                    break;
                case "#business":
                    scrollTop = index._MINSCROLLTOP + 10;
                    break;
                case "#cases":
                    scrollTop = index._BUSINESSH + 340;
                    break;
                case "#aboutUs":
                    scrollTop = index._CASESH + 440;
                    break;
                case "#contacts":
                    scrollTop = index._ABOUTUSH + 500;
                    break;
                default:
                    break;
            }

            $('html, body').animate({scrollTop: scrollTop + 'px'}, 800);
            event.preventDefault();
            return false;
        });

        this._share();
    },
    _share: function() {
        $("footer a").click(function(event) {
            var key = $(this).data("type");
            if (key === "wx") {
                $("footer img").slideToggle();
                return false;
            }


            var title = encodeURIComponent("流云工作室 - 持续为客户提供一流的云服务"),
                    url = "http://liuyun.io/",
                    pic = "http://liuyun.io/images/logo.png";
            var urls = {};
            urls.tencent = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title +
                    "&url=" + url + "&pic=" + pic;
            urls.weibo = "http://v.t.sina.com.cn/share/share.php?title=" +
                    title + "&url=" + url + "&pic=" + pic;
            urls.googleplus = "https://plus.google.com/share?url=" + url;
            urls.twitter = "https://twitter.com/intent/tweet?status=" + title + " " + url;
            window.open(urls[key], "_blank", "top=100,left=200,width=648,height=618");
            event.preventDefault();
        });
    }
};

$(document).ready(function() {
    index.init();
    index.headerScroll();
    $(window).scroll();
});
