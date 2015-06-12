(function() {
    EventUtil.addHandler(document.body, 'mousemove', function(event) {
        var eve = EventUtil.getEvent(event);
        var X = eve.clientX,
            Y = eve.clientY;
        concise.$('#main').style.top = (-Y + 5) + 'px';
        concise.$('#main').style.left = (-X + 5) + 'px';
        var target = EventUtil.getTarget(eve);
        var child = concise.$("#main").children;
        if (concise.hasClass(target, 'small') || concise.hasClass(target, 'big') || target.tagName.toLowerCase() === 'a') {
            for (var i = 0, len = child.length; i < len; i++) {
                if (child[i].children[0] === target) {
                    child[i].style.opacity = '1';
                    console.log(child[i].children[0]);
                } else {
                    child[i].style.opacity = '0.3';
                }
            }
        } else {
            for (var i = 0, len = child.length; i < len; i++) {
                child[i].style.opacity = '1';
            }
        }
    });
})();