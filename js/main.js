var xiaoRuo = {
    Y: document.documentElement.clientHeight || document.body.clientHeight,
    X: document.documentElement.clientWidth || document.body.clientWidth,
    page: concise.$('#bodyer') ? concise.$('#bodyer').children : null,
    popups: function() {
        EventUtil.addHandler(concise.$('#author'), 'click', function() {
            concise.removeClass(concise.$('#popups'), 'none');
        });
        EventUtil.addHandler(concise.$('#popups'), 'click', function() {
            concise.addClass(concise.$('#popups'), 'none');
        });
    },
    setHeight: function() {
        concise.$('#bodyer').style.height = this.Y + 'px';
        for (var i = 0, len = this.page.length; i < len; i++) {
            this.page[i].style.height = this.Y + 'px';
        }
    },
    screenScrolling: function() {
        var that = this;
        EventUtil.addHandler(document.body, 'click', function(event) {
            var eve = EventUtil.getEvent(event);
            that.toTop(eve);
        });
    },
    toTop: function(eve) {
        if (concise.hasClass(xiaoRuo.page[0], 'index0')) {
            xiaoRuo.page[0].style.top = -xiaoRuo.Y + 'px';
            this.delay(0);
        } else if (concise.hasClass(xiaoRuo.page[1], 'index0')) {
            xiaoRuo.page[1].style.top = xiaoRuo.Y + 'px';
            this.delay(1);
        } else if (concise.hasClass(xiaoRuo.page[2], 'index0')) {
            xiaoRuo.page[2].style.left = xiaoRuo.X + 'px';
            this.delay(2);
        } else if (concise.hasClass(xiaoRuo.page[3], 'index0')) {
            xiaoRuo.page[3].style.left = -xiaoRuo.X + 'px';
            this.delay(3);
        } else if (concise.hasClass(xiaoRuo.page[4], 'index0')) {
            var e = xiaoRuo.page[4].style;
            e.webkitTransform = 'rotate3d(0, 0, 1, 10deg)';
            e.msTransform = 'rotate3d(0, 0, 1, 10deg)';
            e.oTransform = 'rotate3d(0, 0, 1, 10deg)';
            transform = 'rotate3d(0, 0, 1, 10deg)';
            this.delay(4);
        } else if (concise.hasClass(xiaoRuo.page[5], 'index0')) {
            var d = xiaoRuo.page[5].style;
            d.webkitTransform = 'rotate3d(0, 0, 1, -10deg)';
            d.msTransform = 'rotate3d(0, 0, 1, -10deg)';
            d.oTransform = 'rotate3d(0, 0, 1, -10deg)';
            transform = 'rotate3d(0, 0, 1, -10deg)';
            this.delay(5);
        }
    },
    delay: function(cur) {
        setTimeout(function() {
            for (var i = 0, len = xiaoRuo.page.length; i < len; i++) {
                var name = xiaoRuo.page[i].className;
                if (name.charAt(name.length - 1) == 0) {
                    console.log()
                    xiaoRuo.page[i].className = name.slice(0, name.length - 1) + 5;
                } else {
                    xiaoRuo.page[i].className = name.slice(0, name.length - 1) + (parseInt(name.charAt(name.length - 1)) - 1);
                }
            }
            setTimeout(function() {
                var a = xiaoRuo.page[cur].style
                a.top = 0 + 'px';
                a.left = 0 + 'px';
                a.webkitTransform = 'rotate3d(0, 0, 1, 0deg)';
                a.msTransform = 'rotate3d(0, 0, 1, 0deg)';
                a.oTransform = 'rotate3d(0, 0, 1, 0deg)';
                transform = 'rotate3d(0, 0, 1, 0deg)';
            }, 700);
        }, 700);
    }
}