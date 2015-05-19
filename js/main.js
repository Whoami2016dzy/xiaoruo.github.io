var concise = {
    $: function (name) {
        if (name.charAt(0) === '#') {
            var a = name.slice(1);
            return document.getElementById(a);
        } else {
            var a = name.slice(1);
            return this.getByClass(a);
        }
    },
    getStyle: function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    },
    getByClass: function (clsName) {
        eles = [];
        elements = document.getElementsByTagName('*');
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].className.match(clsName)) {
                eles.push(elements[i]);
            }
        }
        return eles;
    },
    hasClass: function (elem, cName) {
        if (elem.className) {
            return !!elem.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
        }
        return false;
    },
    addClass: function (elem, cName) {
        if (!concise.hasClass(elem, cName)) {
            elem.className += ' ' + cName;
        }
    },
    removeClass: function (elem, cName) {
        if (concise.hasClass(elem, cName)) {
            elem.className = elem.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), '');
        }
    }
};
var ownTask = {
    HAF: 125,
    choose: ['defaults', '', '', ''],
    init: function () {
        this.getHeight();
        this.theFile();
        this.theDelete();
        this.theTime();
        this.showWindow();
    },
    getHeight: function () {
        var that = this;
        window.onresize = function () {
            that.getHeight();
        };
        var Y = document.documentElement.clientHeight || document.body.clientHeight;
        var theAddHeight = concise.$('.file-add')[0].offsetHeight;
        concise.$('#file-senior').style.height = (Y - this.HAF - theAddHeight) + 'px';
        var theStatusHeight = concise.$('.list-status')[0].offsetHeight;
        concise.$('#list-time').style.height = (Y - this.HAF - theAddHeight - theStatusHeight) + 'px';
        concise.$('#list-time-finish').style.height = (Y - this.HAF - theAddHeight - theStatusHeight) + 'px';
        concise.$('#list-time-unfinish').style.height = (Y - this.HAF - theAddHeight - theStatusHeight) + 'px';
        var theTitleHeight = concise.$('.content-title')[0].offsetHeight;
        var theTimeHeight = concise.$('.content-time')[0].offsetHeight;
        concise.$('#content-main').style.height = (Y - this.HAF - theTitleHeight - theTimeHeight) + 'px';
    },
    showWindow: function () {
        this.theAddfile();
        this.theAddTime();
        this.theOver();
        this.TabSwitch();
    },
    theDisplay: function (eve) {
        var theUl = EventUtil.getTarget(EventUtil.getEvent(eve)).parentNode.getElementsByTagName('ul');
        for (var i = 0, len = theUl.length; i < len; i++) {
            if (concise.hasClass(theUl[i], 'theBlock')) {
                concise.removeClass(theUl[i], 'theBlock');
                concise.addClass(theUl[i], 'theNone');
            } else {
                concise.removeClass(theUl[i], 'theNone');
                concise.addClass(theUl[i], 'theBlock');
            }
        }
    },
    theFile: function () {
        var theUl = concise.$('#file-senior');
        var that = this;
        if (concise.$('#defaults').children.length !== 0) {

            concise.addClass(concise.$('#defaults').children[0], 'theColor');
        }
        EventUtil.addHandler(theUl, "click", function(eve) {
            var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
            if (theEve.tagName.toLowerCase() === 'span') {
                var folder = concise.$('.icon-folder-open');
                for (var i = 0, len = folder.length; i < len; i++) {
                    if (folder[i] === EventUtil.getTarget(EventUtil.getEvent(eve))) {
                        concise.addClass(folder[i], 'theColor');
                    } else {
                        concise.removeClass(folder[i], 'theColor');
                        concise.removeClass(folder[i].parentNode.children, 'theColor');
                    }
                }
                that.theDisplay(eve);
                that.choose[0] = theEve.parentNode.children[1].id;
                var a = theEve.parentNode.children[1].children;
                if (a.length !== 0) {
                    that.choose[1] = a[0].children[0].innerHTML;
                } else {
                    that.choose[1] = '';
                }

            } else if (concise.hasClass(theEve.parentNode, 'icon-file-empty')) {
                var theTask = concise.$('.icon-file-empty');
                for (var j = 0, len = theTask.length; j < len; j++) {
                    if (theTask[j] === theEve.parentNode) {
                        concise.addClass(theTask[j], 'theColor');
                        concise.addClass(theTask[j].parentNode.parentNode.children[0], 'theColor');
                    } else {
                        concise.removeClass(theTask[j], 'theColor');
                        concise.removeClass(theTask[j].parentNode.parentNode.children[0], 'theColor');
                    }
                }
                that.choose[1] = theEve.innerHTML;
                that.choose[0] = theEve.parentNode.parentNode.id;
            }
        });
    },
    theDelete: function () {
        var that = this;
        EventUtil.addHandler(concise.$('#file-senior'), 'click', function (eve) {
            var theSpan = EventUtil.getTarget(EventUtil.getEvent(eve));
            if (theSpan.tagName.toLowerCase() === 'span' && concise.hasClass(theSpan, 'icon-cross')) {
                that.showChange('delete');
                that.choose[0] = theSpan.parentNode.parentNode.id;
                that.choose[1] = theSpan.parentNode.children[0].innerHTML;
            }
        });
        EventUtil.addHandler(concise.$('#cancelD'), 'click', function() {
            concise.removeClass(concise.$('#confirm'), 'theBlock');
            concise.addClass(concise.$('#confirm'), 'theNone');
        });
    },
    theTime: function () {
        var theUl1 = concise.$('#list-time');
        var theUl2 = concise.$('#list-time-unfinish');
        var theUl3 = concise.$('#list-time-finish');
        var that = this;
        EventUtil.addHandler(theUl1, 'click', function(eve) {
            var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
            if (theEve.tagName.toLowerCase() === 'div') {
                that.theDisplay(eve);
                that.choose[2] = theEve.innerHTML;
            } else if (theEve.tagName.toLowerCase() === 'a') {
                that.choose[3] = theEve.innerHTML;
                that.choose[2] = theEve.parentNode.parentNode.parentNode.children[0].innerHTML;
                var folder = theUl1.getElementsByTagName('a');
                for (var i = 0, len = folder.length; i < len; i++) {
                    if (folder[i] === EventUtil.getTarget(EventUtil.getEvent(eve))) {
                        concise.addClass(folder[i], 'theColor');
                    } else {
                        concise.removeClass(folder[i], 'theColor');
                    }
                }
            }
        });
        EventUtil.addHandler(theUl2, 'click', function (eve) {
            var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
            if (theEve.tagName.toLowerCase() === 'div') {
                that.theDisplay(eve);
                that.choose[2] = theEve.innerHTML;
            } else if (theEve.tagName.toLowerCase() === 'a') {
                that.choose[3] = theEve.innerHTML;
                that.choose[2] = theEve.parentNode.parentNode.parentNode.children[0].innerHTML;
                var folder = theUl2.getElementsByTagName('a');
                for (var i = 0, len = folder.length; i < len; i++) {
                    if (folder[i] === EventUtil.getTarget(EventUtil.getEvent(eve))) {
                        concise.addClass(folder[i], 'theColor');
                    } else {
                        concise.removeClass(folder[i], 'theColor');
                    }
                }
            }
        });
        EventUtil.addHandler(theUl3, 'click', function (eve) {
            var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
            if (theEve.tagName.toLowerCase() === 'div') {
                that.theDisplay(eve);
                that.choose[2] = theEve.innerHTML;
            } else if (theEve.tagName.toLowerCase() === 'a') {
                that.choose[3] = theEve.innerHTML;
                that.choose[2] = theEve.parentNode.parentNode.parentNode.children[0].innerHTML;
                var folder = theUl3.getElementsByTagName('a');
                for (var i = 0, len = folder.length; i < len; i++) {
                    if (folder[i] === EventUtil.getTarget(EventUtil.getEvent(eve))) {
                        concise.addClass(folder[i], 'theColor');
                    } else {
                        concise.removeClass(folder[i], 'theColor');
                    }
                }
            }
        });
    },
    theAddfile: function () {
        var that = this;
        EventUtil.addHandler(concise.$('#addCategory'), 'click', function () {
            concise.removeClass(concise.$('#prompt'), 'theNone');
            concise.addClass(concise.$('#prompt'), 'theBlock');
        });
        EventUtil.addHandler(concise.$('#cancel'), 'click', function () {
            concise.removeClass(concise.$('#prompt'), 'theBlock');
            concise.addClass(concise.$('#prompt'), 'theNone');
        });
    },
    theAddTime: function () {
        var that = this;
        EventUtil.addHandler(concise.$('#addTask'), 'click', function () {
            that.showAdd('task');
        });
        EventUtil.addHandler(concise.$('#change'), 'click', function () {
            if (concise.$('#show-time').innerHTML !== '') {
                that.showAdd('change');
                concise.$('#title').value = concise.$('#title-name').innerHTML;
                concise.$('#date').value = concise.$('#show-time').innerHTML;
                concise.$('#content').value = concise.$('#content-main').innerHTML;
            } else {
                alert('请选中任务后再执行此操作！');
            }
        });
        EventUtil.addHandler(concise.$('#cancelA'), 'click', function () {
            concise.removeClass(concise.$('#editor'), 'theBlock');
            concise.addClass(concise.$('#editor'), 'theNone');
        });
    },
    showAdd: function (id) {
        concise.removeClass(concise.$('#editor'), 'theNone');
        concise.addClass(concise.$('#editor'), 'theBlock');
        concise.$('#submitA').name = id;
    },
    theOver: function () {
        var that = this;
        EventUtil.addHandler(concise.$('#over'), 'click', function () {
            if (concise.$('#show-time').innerHTML !== '') {
                if(!concise.hasClass(concise.$("#list-time-finish"), 'theBlock')) {
                    that.showChange('change');
                }
                else {
                    alert('此任务已完成！');
                }
            } else {
                alert('请选中任务后再执行此操作！');
            }
        });
        EventUtil.addHandler(concise.$('#cancelD'), 'click', function () {
            concise.removeClass(concise.$('#confirm'), 'theBlock');
            concise.addClass(concise.$('#confirm'), 'theNone');
        });
    },
    showChange: function (id) {
        concise.removeClass(concise.$('#confirm'), 'theNone');
        concise.addClass(concise.$('#confirm'), 'theBlock');
        concise.$('#submitD').name = id;
    },
    TabSwitch: function () {
        var theClick = concise.$('#list-status').children;
        EventUtil.addHandler(theClick[0], 'click', function (eve) {
            concise.addClass(theClick[0], 'selected');
            concise.removeClass(theClick[1], 'selected');
            concise.removeClass(theClick[2], 'selected');
            concise.addClass(concise.$('#list-time'), 'theBlock');
            concise.removeClass(concise.$('#list-time-finish'), 'theBlock');
            concise.removeClass(concise.$('#list-time-unfinish'), 'theBlock');
        });
        EventUtil.addHandler(theClick[1], 'click', function (eve) {
            concise.addClass(theClick[1], 'selected');
            concise.removeClass(theClick[0], 'selected');
            concise.removeClass(theClick[2], 'selected');
            concise.addClass(concise.$('#list-time-finish'), 'theBlock');
            concise.removeClass(concise.$('#list-time'), 'theBlock');
            concise.removeClass(concise.$('#list-time-unfinish'), 'theBlock');
        });
        EventUtil.addHandler(theClick[2], 'click', function (eve) {
            concise.addClass(theClick[2], 'selected');
            concise.removeClass(theClick[0], 'selected');
            concise.removeClass(theClick[1], 'selected');
            concise.addClass(concise.$('#list-time-unfinish'), 'theBlock');
            concise.removeClass(concise.$('#list-time-finish'), 'theBlock');
            concise.removeClass(concise.$('#list-time'), 'theBlock');
        });
    }
}
