(function() {
    var storage = {
        classifyArray: ['defaults', 'graduate', 'corporation', 'family', 'baidu'],
        theData: {
            defaults: {},
            graduate: {},
            corporation: {},
            family: {},
            baidu: {}
        },
        init: function() {
            this.theData = this.getStorage() || this.theData;
            this.saveStorage(this.theData);
            this.addValue();
            this.addTodo();
            this.showTask(ownTask.choose[0], ownTask.choose[1]);
            this.change();
        },
        addValue: function() {
            this.fileLoad();
            this.addTask();
            this.deleteTask();
        },
        saveStorage: function(theGet) {
            var str = JSON.stringify(theGet);
            localStorage.setItem('storage', str);
        },
        getStorage: function() {
            var value = localStorage.getItem('storage');
            return JSON.parse(value);
        },
        addTask: function() {
            var that = this;
            var getData = this.getStorage();
            EventUtil.addHandler(concise.$('#submit'), 'click', function() {
                var newName = concise.$('#newName').value;
                getData[ownTask.choose[0]][newName] = {};
                that.saveStorage(getData);
                concise.removeClass(concise.$('#prompt'), 'theBlock');
                concise.addClass(concise.$('#prompt'), 'theNone');
                var theGet = that.getStorage();
                concise.$('#' + ownTask.choose[0]).innerHTML = '';
                for (p in theGet[ownTask.choose[0]]) {
                    var test = document.createTextNode(p);
                    var em = document.createElement('em');
                    var theList = document.createElement('li');
                    var theSpan = document.createElement('span');
                    concise.addClass(theSpan, 'icon icon-cross');
                    concise.addClass(theList, 'icon icon-file-empty');
                    em.appendChild(test);
                    theList.appendChild(em);
                    theList.appendChild(theSpan);
                    concise.$('#' + ownTask.choose[0]).appendChild(theList);
                }
                that.fileLoad();
                that.allFileLoad();
            });
        },
        deleteTask: function() {
            var that = this;
            EventUtil.addHandler(concise.$('#submitD'), 'click', function() {
                if (concise.$('#submitD').name === 'delete') {
                    var theData = that.getStorage();
                    delete theData[ownTask.choose[0]][ownTask.choose[1]];
                    that.saveStorage(theData);
                    concise.removeClass(concise.$('#confirm'), 'theBlock');
                    concise.addClass(concise.$('#confirm'), 'theNone');
                    that.fileLoad();
                    that.allFileLoad();
                } else {
                    var theData = that.getStorage();
                    var a = theData[ownTask.choose[0]][ownTask.choose[1]][ownTask.choose[2]][ownTask.choose[3]];
                    a.success = true;
                    that.saveStorage(theData);
                    concise.removeClass(concise.$('#confirm'), 'theBlock');
                    concise.addClass(concise.$('#confirm'), 'theNone');
                    that.showTask(ownTask.choose[0], ownTask.choose[1]);
                }
                that.showTask(ownTask.choose[0], ownTask.choose[1]);
            });
        },
        taskNumber: function() {
            var number = concise.$('#' + ownTask.choose[0]).children.length;
            concise.$('#' + ownTask.choose[0]).parentNode.children[0].children[0].innerHTML = number;
            var len = concise.$('#allFile').children.length;
            concise.$('#allFile').parentNode.children[0].children[0].innerHTML = len;
        },
        allFileLoad: function() {
            var theGet = this.getStorage();
            concise.$('#allFile').innerHTML = '';
            for (var j = 0; j < this.classifyArray.length; j++) {
                for (p in theGet[this.classifyArray[j]]) {
                    var test = document.createTextNode(p);
                    var theList = document.createElement('li');
                    concise.addClass(theList, 'icon icon-file-empty');
                    theList.appendChild(test);
                    concise.$('#allFile').appendChild(theList);
                }
            }
            this.taskNumber();
            if (concise.$('#defaults').children.length !== 0) {
                concise.addClass(concise.$('#defaults').children[0], 'theColor');
                ownTask.choose[1] = concise.$('#defaults').children[0].children[0].innerHTML;
            }
        },
        fileLoad: function() {
            var theGet = this.getStorage();
            for (var j = 0; j < this.classifyArray.length; j++) {
                concise.$('#' + this.classifyArray[j]).innerHTML = '';
                for (p in theGet[this.classifyArray[j]]) {
                    var test = document.createTextNode(p);
                    var em = document.createElement('em');
                    var theList = document.createElement('li');
                    var theSpan = document.createElement('span');
                    concise.addClass(theSpan, 'icon icon-cross');
                    concise.addClass(theList, 'icon icon-file-empty');
                    em.appendChild(test);
                    theList.appendChild(em);
                    theList.appendChild(theSpan);
                    concise.$('#' + this.classifyArray[j]).appendChild(theList);
                }
                var len = concise.$('#' + this.classifyArray[j]).children.length;
                concise.$('#' + this.classifyArray[j]).parentNode.children[0].children[0].innerHTML = len;
            }
            this.allFileLoad();
        },
        addTodo: function() {
            var that = this;
            EventUtil.addHandler(concise.$('#submitA'), 'click', function() {
                if (concise.$('#submitA').name === 'task') {
                    var taskTitle = concise.$('#title').value,
                        taskTime = concise.$('#date').value,
                        taskContent = concise.$('#content').value;
                    var theGet = that.getStorage();
                    var a = theGet[ownTask.choose[0]][ownTask.choose[1]];
                    if (!a.hasOwnProperty(taskTime)) {
                        a[taskTime] = {};
                    }
                    a[taskTime][taskTitle] = {};
                    a[taskTime][taskTitle].content = taskContent;
                    a[taskTime][taskTitle].success = false;
                    that.saveStorage(theGet);
                    concise.removeClass(concise.$('#editor'), 'theBlock');
                    concise.addClass(concise.$('#editor'), 'theNone');
                    that.showTask(ownTask.choose[0], ownTask.choose[1]);
                } else {
                    var theGet = that.getStorage();
                    var titles = concise.$('#title').value;
                    var dates = concise.$('#date').value;
                    var contents = concise.$('#content').value;
                    concise.$('#title-name').innerHTML = titles;
                    concise.$('#show-time').innerHTML = dates;
                    concise.$('#content-main').innerHTML = contents;
                    var theUse = theGet[ownTask.choose[0]][ownTask.choose[1]];
                    delete theUse[ownTask.choose[2]][ownTask.choose[3]];
                    if (typeof(theUse[ownTask.choose[2]].length) === "undefined") {
                        delete theUse[ownTask.choose[2]];
                    }
                    if (!theUse.hasOwnProperty(dates)) {
                        theUse[dates] = {};
                    }
                    theUse[dates][titles] = {};
                    theUse[dates][titles].content = contents;
                    theUse[dates][titles].success = false;
                    that.saveStorage(theGet);
                    that.showTask(ownTask.choose[0], ownTask.choose[1]);
                    concise.removeClass(concise.$('#editor'), 'theBlock');
                    concise.addClass(concise.$('#editor'), 'theNone');
                }
            });
        },
        showTask: function(theDe, theName) {
            var theGet = this.getStorage();
            var a = theGet[theDe][theName];
            concise.$('#list-time').innerHTML = '';
            for (var j in a) {
                var theTime = document.createTextNode(j);
                var theDiv = document.createElement('div');
                var theLi = document.createElement('li');
                var theUl = document.createElement('ul');
                theUl.class = 'list-file theBlock';
                theDiv.appendChild(theTime);
                theLi.appendChild(theDiv);
                theLi.appendChild(theUl);
                concise.$('#list-time').appendChild(theLi);
                for (var p in a[j]) {
                    var c = document.createElement('li');
                    var d = document.createElement('a');
                    d.href = '#';
                    var e = document.createTextNode(p);
                    d.appendChild(e);
                    c.appendChild(d);
                    theUl.appendChild(c);
                }
            }
            concise.$('#list-time-unfinish').innerHTML = '';
            for (var k in a) {
                var theTime = document.createTextNode(k);
                var theDiv = document.createElement('div');
                var theLi = document.createElement('li');
                var theUl = document.createElement('ul');
                theUl.class = 'list-file theBlock';
                theDiv.appendChild(theTime);
                theLi.appendChild(theDiv);
                theLi.appendChild(theUl);
                concise.$('#list-time-unfinish').appendChild(theLi);
                for (var l in a[k]) {
                    if (a[k][l].success === false) {
                        var c = document.createElement('li');
                        var d = document.createElement('a');
                        d.href = '#';
                        var e = document.createTextNode(l);
                        d.appendChild(e);
                        c.appendChild(d);
                        theUl.appendChild(c);
                    }
                }
            }
            concise.$('#list-time-finish').innerHTML = '';
            for (var z in a) {
                var theTime = document.createTextNode(z);
                var theDiv = document.createElement('div');
                var theLi = document.createElement('li');
                var theUl = document.createElement('ul');
                theUl.class = 'list-file theBlock';
                theDiv.appendChild(theTime);
                theLi.appendChild(theDiv);
                theLi.appendChild(theUl);
                concise.$('#list-time-finish').appendChild(theLi);
                for (var f in a[z]) {
                    if (a[z][f].success === true) {
                        var c = document.createElement('li');
                        var d = document.createElement('a');
                        d.href = '#';
                        var e = document.createTextNode(f);
                        d.appendChild(e);
                        c.appendChild(d);
                        theUl.appendChild(c);
                    }
                }
            }
        },
        change: function() {
            var theUl = concise.$('#file-senior');
            var that = this;
            EventUtil.addHandler(theUl, 'click', function(eve) {
                var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
                if (concise.hasClass(theEve.parentNode, 'icon-file-empty')) {
                    that.showTask(ownTask.choose[0], ownTask.choose[1]);
                }
            });
            var cc = [concise.$('#list-time'), concise.$('#list-time-finish'), concise.$('#list-time-unfinish')];
            for (var j = 0, lens = cc.length; j < lens; j++) {
                EventUtil.addHandler(cc[j], 'click', function(eve) {
                    var theGet = that.getStorage();
                    var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
                    if (theEve.tagName.toLowerCase() === 'a') {
                        console.log(ownTask.choose);
                        var theUse = theGet[ownTask.choose[0]][ownTask.choose[1]][ownTask.choose[2]][ownTask.choose[3]];
                        concise.$('#title-name').innerHTML = theEve.innerHTML;
                        concise.$('#show-time').innerHTML = ownTask.choose[2];
                        concise.$('#content-main').innerHTML = theUse.content;
                    }
                });
            }
        }
    };
    ownTask.init();
    storage.init();
})();