DashboardManager.registerScripts(function (widget) {
    var textarea = $(widget.element).find(".sticky-note-input");
    var sizingSwitch = $(widget.element).find(".sizing-switch");
    var widgetDiv = $(widget.outerElement);
    var stickySearchTimer = 0;
    var colorOptions = ["yellow", "atoll", "midnight-blue", "access", "lilac"];
    var color = colorOptions[0];

    if (widget.state) {
        textarea.val(widget.state.text);
        color = widget.state.color || "yellow";
    } else {
        var rand = Math.floor(Math.random() * 6);
        color = colorOptions[rand];
        saveState();
    }
    $(widgetDiv).addClass(color);

    textarea.on("change keyup input", function () {
        clearTimeout(stickySearchTimer);
        stickySearchTimer = setTimeout(function () {
            saveState();
        }, 500);
    });
    if ($("html").hasClass("touch")) {
        textarea.click(function () {
            var currentText = $('textarea').val();
            textarea.val('').focus().val(currentText);
        });
    }

    $(widget.element).find(".color-pick").click(function () {
        color = $(this).data("color");
        $(widgetDiv).removeClass(colorOptions.join(" ")).addClass(color);
        saveState();
    });

    function saveState() {
        widget.state = {
            text: textarea.val(),
            color: color
        }
    };
});
