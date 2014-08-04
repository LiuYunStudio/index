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
    headerScroll: function() {
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 360) {
                $(".nav").addClass("stuck");
                $(".nav-button").animate({"opacity": "1"}, {
                  queue: false,
                  duration: 300
                });
            } else {
                $(".nav").removeClass("stuck");
                $(".nav-button").animate({"opacity": "0"}, {
                  queue: false,
                  duration: 300
                });
            }
        });
    },
    init: function() {
        $("#skills").mouseover(function() {
            $(this).find(".progress").each(function() {
                var $progresse = $(this),
                        percentage = $progresse.data("percentage");
                $progresse.find(".bar").width($progresse.width() / 100 * percentage).html(percentage + "% &nbsp;");
            });

            $("#skills").unbind();
        });

        this._share();
    },
    _share: function () {
        $("footer a").click(function(event) {
            var key = $(this).data("type");
            if (key === "wx") {
              $("footer img").show();
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
    index.headerScroll();
    index.init();
    $(window).scroll();
});
