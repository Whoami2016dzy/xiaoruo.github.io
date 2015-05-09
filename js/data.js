(function() {
    var dateArray = [];
    var setWhere = "defaults";
    var storage = {
        classifyArray: ["defaults", "graduate", "corporation", "family", "baidu"],
        theData: {
            defaults: {},
            graduate: {},
            corporation: {},
            family: {},
            baidu: {}
        },
        init: function() {
            this.theData = this.getStorage() || this.theData;
            this.theFile();
            this.theTask();
        },
        theFile: function() {
            this.addClassify();
            this.loaded();
            this.deleteClassify();
            if (concise.$("#defaults").children.length > 0) {
                concise.addClass(concise.$("#defaults").children[0], "otherColor");
            }
        },
        theTask: function() {
            this.leftRigthShow();
            this.addTask();
            this.change();
        },
        saveStorage: function(theGet) {
            var str = JSON.stringify(theGet); //把对象解析成字符串
            localStorage.setItem("storage", str);
        },
        getStorage: function() {
            var value = localStorage.getItem("storage");
            return JSON.parse(value);
        },
        addClassify: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#submit"), "click", function() {
                var folder = concise.$(".icon-folder-open");
                for (var i = 0, len = folder.length; i < len; i++) {
                    if (concise.hasClass(folder[i], "theColor")) {
                        var a = folder[i].parentNode.getElementsByTagName('ul')[0];
                        setWhere = a.id;
                    } else {
                        concise.removeClass(folder[i], "theColor");
                    }
                }
                var taskName = concise.$("#newName").value;
                that.theData[setWhere][taskName] = {};
                that.saveStorage(storage.theData);
                concise.removeClass(concise.$("#prompt"), "theBlock");
                concise.addClass(concise.$("#prompt"), "theNone");
                concise.$("#newName").value = "";
                var theGet = that.getStorage();
                concise.$("#" + setWhere).innerHTML = "";
                for (p in theGet[setWhere]) {
                    var test = document.createTextNode(p);
                    var em = document.createElement('em');
                    var theList = document.createElement('li');
                    var theSpan = document.createElement('span');
                    concise.addClass(theSpan, "icon icon-cross");
                    concise.addClass(theList, "icon icon-file-empty");
                    em.appendChild(test);
                    theList.appendChild(em);
                    theList.appendChild(theSpan);
                    concise.$("#" + setWhere).appendChild(theList);
                }
                storage.loaded();
            });
        },
        loaded: function() {
            var theGet = this.getStorage();
            for (var j = 0; j < this.classifyArray.length; j++) {
                concise.$("#" + this.classifyArray[j]).innerHTML = "";
                for (p in theGet[this.classifyArray[j]]) {
                    var test = document.createTextNode(p);
                    var em = document.createElement('em');
                    var theList = document.createElement('li');
                    var theSpan = document.createElement('span');
                    concise.addClass(theSpan, "icon icon-cross");
                    concise.addClass(theList, "icon icon-file-empty");
                    em.appendChild(test);
                    theList.appendChild(em);
                    theList.appendChild(theSpan);
                    concise.$("#" + this.classifyArray[j]).appendChild(theList);
                }
                var len = concise.$("#" + this.classifyArray[j]).children.length;
                concise.$("#" + this.classifyArray[j]).parentNode.children[0].children[0].innerHTML = len;
            }
            this.allFileLoaded();
        },
        allFileLoaded: function() {
            var theGet = this.getStorage();
            concise.$("#allFile").innerHTML = "";
            for (var j = 0; j < this.classifyArray.length; j++) {
                for (p in theGet[this.classifyArray[j]]) {
                    var test = document.createTextNode(p);
                    var theList = document.createElement('li');
                    concise.addClass(theList, "icon icon-file-empty");
                    theList.appendChild(test);
                    concise.$("#allFile").appendChild(theList);
                }
            }
            var len = concise.$("#allFile").children.length;
            concise.$("#allFile").parentNode.children[0].children[0].innerHTML = len;
        },
        deleteClassify: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#submitD"), "click", function() {
                console.log(concise.$("#submitD").name)
                if (concise.$("#submitD").name === "delete") {
                    var theGet = that.getStorage();
                    var ul = theSpan.parentNode.parentNode.id;
                    var theText = theSpan.parentNode.children[0].innerHTML
                    for (i in theGet[ul]) {
                        if (i === theText) {
                            delete theGet[ul][i];
                            that.saveStorage(theGet);
                        }
                    }
                    that.loaded();
                    that.allFileLoaded();
                    concise.removeClass(concise.$("#confirm"), "theBlock");
                    concise.addClass(concise.$("#confirm"), "theNone");
                } else {
                    var theGet = that.getStorage();
                    var tasks, naves;
                    var theTitle = concise.$("#title-name").innerHTML;
                    var theTasks = concise.$(".icon-file-empty");
                    for (var i = 0, len = theTasks.length; i < len; i++) {
                        if (concise.hasClass(theTasks[i], "otherColor")) {
                            tasks = theTasks[i].children[0].innerHTML;
                        }
                    }
                    var theNave = concise.$(".icon-folder-open");
                    for (var j = 0, theLen = theNave.length; j < theLen; j++) {
                        if (concise.hasClass(theNave[j], "theColor")) {
                            naves = theNave[j].parentNode.children[1].id;
                        }
                    }
                    var theUse = theGet[naves][tasks][theTitle];
                    theUse.theSuccess = true;
                    that.saveStorage(theGet);
                    concise.removeClass(concise.$("#confirm"), "theBlock");
                    concise.addClass(concise.$("#confirm"), "theNone");
                }
            })
        },
        addTask: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#submitA"), "click", function() {
                if (concise.$("#submitA").name === "task") {
                    var theGet = that.getStorage();
                    var taskTitle = concise.$("#title").value,
                        taskTime = concise.$("#date").value,
                        taskContent = concise.$("#content").value;
                    var theTasks = concise.$(".icon-file-empty");
                    for (var i = 0, len = theTasks.length; i < len; i++) {
                        if (concise.hasClass(theTasks[i], "otherColor")) {
                            var theDe = theTasks[i].parentNode.id;
                            var theName = theTasks[i].children[0].innerHTML;
                            theGet[theDe][theName][taskTitle] = {};
                            theGet[theDe][theName][taskTitle].theDate = taskTime;
                            theGet[theDe][theName][taskTitle].theContent = taskContent;
                            theGet[theDe][theName][taskTitle].theSuccess = false;
                            that.saveStorage(theGet);
                            that.showTask(theDe, theName);
                            concise.removeClass(concise.$("#editor"), "theBlock");
                            concise.addClass(concise.$("#editor"), "theNone");
                        }
                    }
                } else {
                    var theGet = that.getStorage();
                    var tasks, naves;
                    var theTitle = concise.$("#title").value;
                    var dates = concise.$("#date").value;
                    var contents = concise.$("#content").value;
                    var theTasks = concise.$(".icon-file-empty");
                    for (var i = 0, len = theTasks.length; i < len; i++) {
                        if (concise.hasClass(theTasks[i], "otherColor")) {
                            tasks = theTasks[i].children[0].innerHTML;
                        }
                    }
                    var theNave = concise.$(".icon-folder-open");
                    for (var j = 0, theLen = theNave.length; j < theLen; j++) {
                        if (concise.hasClass(theNave[j], "theColor")) {
                            naves = theNave[j].parentNode.children[1].id;
                        }
                    }
                    var theUse = theGet[naves][tasks][theTitle];
                    theUse.theDate = dates;
                    theUse.theContent = contents;
                    that.saveStorage(theGet);
                    concise.$("#show-time").innerHTML = theUse.theDate;
                    concise.$("#content-main").innerHTML = theUse.theContent;
                    concise.removeClass(concise.$("#editor"), "theBlock");
                    concise.addClass(concise.$("#editor"), "theNone");
                }
            });
        },
        showTask: function(theDe, theName, listTime) {
            concise.$("#list-time").innerHTML = "";
            concise.$("#list-time-finish").innerHTML = "";
            concise.$("#list-time-unfinish").innerHTML = "";
            var otherGet = this.getStorage();
            var listTime = concise.$("#list-time").children;
            for (j in otherGet[theDe][theName]) {
                var z = dateArray.some(function(item) {
                    if (otherGet[theDe][theName][j].theDate === item.innerHTML) {
                        var theLi = document.createElement('li');
                        var theA = document.createElement('a');
                        theA.href = "#";
                        var theContext = document.createTextNode(j);
                        theA.appendChild(theContext);
                        theLi.appendChild(theA);
                        item.parentNode.children[1].appendChild(theLi);
                    }
                    return otherGet[theDe][theName][j].theDate === item.innerHTML;
                });
                if (z === false) {
                    var theParent = document.createElement('li');
                    theParent.innerHTML = '<div>' + otherGet[theDe][theName][j].theDate + '</div><ul class="list-file theBlock"></ul>';
                    var theLi = document.createElement('li');
                    var theA = document.createElement('a');
                    theA.href = "#";
                    var theContext = document.createTextNode(j);
                    theA.appendChild(theContext);
                    theLi.appendChild(theA);
                    theParent.children[1].appendChild(theLi);
                    concise.$("#list-time").appendChild(theParent);
                    dateArray.push(otherGet[theDe][theName][j].theDate);
                }
               /* if (otherGet[theDe][theName][j].theSuccess) {
                    var w = dateArray.some(function(item) {
                        if (otherGet[theDe][theName][j].theDate === item.innerHTML) {
                            var theLi = document.createElement('li');
                            var theA = document.createElement('a');
                            theA.href = "#";
                            var theContext = document.createTextNode(j);
                            theA.appendChild(theContext);
                            theLi.appendChild(theA);
                            item.parentNode.children[1].appendChild(theLi);
                        }
                        return otherGet[theDe][theName][j].theDate === item.innerHTML;
                    });
                    if (w == false) {
                        var theParent = document.createElement('li');
                        theParent.innerHTML = '<div>' + otherGet[theDe][theName][j].theDate + '</div><ul class="list-file theBlock"></ul>';
                        var theLi = document.createElement('li');
                        var theA = document.createElement('a');
                        theA.href = "#";
                        var theContext = document.createTextNode(j);
                        theA.appendChild(theContext);
                        theLi.appendChild(theA);
                        theParent.children[1].appendChild(theLi);
                        concise.$("#list-time-unfinish").appendChild(theParent);
                    }
                } else {
                    var c = dateArray.some(function(item) {
                        if (otherGet[theDe][theName][j].theDate === item.innerHTML) {
                            var theLi = document.createElement('li');
                            var theA = document.createElement('a');
                            theA.href = "#";
                            var theContext = document.createTextNode(j);
                            theA.appendChild(theContext);
                            theLi.appendChild(theA);
                            item.parentNode.children[1].appendChild(theLi);
                        }
                        return otherGet[theDe][theName][j].theDate === item.innerHTML;
                    });
                    if (c == false) {
                        var theParent = document.createElement('li');
                        theParent.innerHTML = '<div>' + otherGet[theDe][theName][j].theDate + '</div><ul class="list-file theBlock"></ul>';
                        var theLi = document.createElement('li');
                        var theA = document.createElement('a');
                        theA.href = "#";
                        var theContext = document.createTextNode(j);
                        theA.appendChild(theContext);
                        theLi.appendChild(theA);
                        theParent.children[1].appendChild(theLi);
                        concise.$("#list-time-finish").appendChild(theParent);
                    }
                }*/
            }
        },
        leftRigthShow: function() {
            var theTasks = concise.$(".icon-file-empty");
            for (var i = 0, len = theTasks.length; i < len; i++) {
                if (concise.hasClass(theTasks[i], "otherColor")) {
                    this.showTask(theTasks[i].parentNode.id, theTasks[i].children[0].innerHTML);
                }
            }
        },
        change: function() {
            var theUl = concise.$("#file-senior");
            var that = this;
            EventUtil.addHandler(theUl, "click", function(eve) {
                var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
                if (concise.hasClass(theEve.parentNode, "icon-file-empty")) {
                    that.leftRigthShow();
                }
            });
            var cc = [concise.$("#list-time"),concise.$("#list-time-finish"), concise.$("#list-time-unfinish")];
            for(var j = 0,lens = cc.length; j < lens; j++) {
                EventUtil.addHandler(cc[j], "click", function(eve) {
                var theGet = that.getStorage();
                var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
                var tasks, naves;
                if (theEve.tagName.toLowerCase() === 'a') {
                    var theTasks = concise.$(".icon-file-empty");
                    for (var i = 0, len = theTasks.length; i < len; i++) {
                        if (concise.hasClass(theTasks[i], "otherColor")) {
                            tasks = theTasks[i].children[0].innerHTML;
                        }
                    }
                    var theNave = concise.$(".icon-folder-open");
                    for (var j = 0, theLen = theNave.length; j < theLen; j++) {
                        if (concise.hasClass(theNave[j], "theColor")) {
                            naves = theNave[j].parentNode.children[1].id;
                        }
                    }
                    var theUse = theGet[naves][tasks][theEve.innerHTML];
                    concise.$("#title-name").innerHTML = theEve.innerHTML;
                    concise.$("#show-time").innerHTML = theUse.theDate;
                    concise.$("#content-main").innerHTML = theUse.theContent;
                }
                //that.showTask(naves, tasks);
            });
            }
        }
    };
    storage.init();
})();