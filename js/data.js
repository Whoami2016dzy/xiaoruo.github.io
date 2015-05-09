(function() {
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
        },
        theTask: function() {
            this.addTask();
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
                var theGet = that.getStorage();
                var ul = theSpan.parentNode.parentNode.id;
                var theText = theSpan.parentNode.children[0].innerHTML
                for(i in theGet[ul]) {
                    if(i === theText){
                        delete theGet[ul][i];
                        that.saveStorage(theGet);
                    }
                }
                console.log(theGet[ul]);
                that.loaded();
                that.allFileLoaded();
                concise.removeClass(concise.$("#confirm"), "theBlock");
                concise.addClass(concise.$("#confirm"), "theNone");
            })
        },
        addTask: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#submitA"), "click", function() {
                var theGet = that.getStorage();
                var taskTitle = concise.$("#title").value,
                    taskTime = concise.$("#date").value,
                    taskContent = concise.$("#content").value;
                var theTask = concise.$(".icon-file-empty");
                for(var i = 0,len = theTask.length; i < len; i++) {
                    if(concise.hasClass(theTask[i], "otherColor")) {
                        var theDe = theTask[i].parentNode.id;
                        var theName = theTask[i].children[0].innerHTML;
                        theGet[theDe][theName][taskTitle] = {};
                        theGet[theDe][theName][taskTitle].theDate = taskTime;
                        theGet[theDe][theName][taskTitle].theContent = taskContent;
                        theGet[theDe][theName][taskTitle].theSuccess = false;
                        that.saveStorage(theGet);
                        var otherGet = that.getStorage();
                        console.log(otherGet);
                        /*for(j in otherGet[theDe][theName]) {
                            if(j.theSuccess === false) {

                            } else {

                            }
                        }*/
                        concise.removeClass(concise.$("#editor"), "theBlock");
                        concise.addClass(concise.$("#editor"), "theNone");
                    }
                }
            });
        }
    };
    storage.init();
})();