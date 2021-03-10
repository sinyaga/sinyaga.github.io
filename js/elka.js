var my_name = [
    {
      x: 435,
      y: 238
    },
    {
      x: 435,
      y: 204
    },
    {
      x: 420,
      y: 208
    },
    {
      x: 435,
      y: 274
    },
    {
      x: 405,
      y: 221
    },
    {
      x: 395,
      y: 274
    },
    {
      x: 415,
      y: 256
    },
    {
      x: 362, // L
      y: 277
    },
    {
      x: 352,
      y: 237
    },
    {
      x: 328,
      y: 201
    },
    {
      x: 306,
      y: 236
    },
    {
      x: 298, //начало л - сдвинуть по х
      y: 274
    },
    {
      x: 198, //ю перемычка
      y: 243
    },
     {
      x: 270, //ю круг
      y: 205
    },
        {
      x: 250, //ю круг
      y: 205
    },
    {
      x: 270, //ю круг
      y: 277
    },
    {
      x: 270,  //ю круг
      y: 241
    },
     {
      x: 230, //ю круг
      y: 205
    },
    {
      x: 230, //ю круг
      y: 277
    },
        {
      x: 250, //ю круг
      y: 277
    },
    {
      x: 230,  //ю круг
      y: 241
    },
    {
      x: 162, //ю палка
      y: 202
    },
    {
      x: 162,  //ю палка
      y: 238
    },
    {
      x: 162,   //ю палка
      y: 276
    }
  ];

var last_i = 0;

$(document).ready(() => {
    $(".add_button").click((e) => {
        var type = e.target.className.split(/\s+/)[1];
        add_ball(type);
    });

    $(".dump").click(() => dump());
    $(".build-name").click(() => buildName());

    $("#tree").mousedown((e) => {
        var elem = $("#tree");
        var canvas = $("#canvas");

        canvas.mouseup((e) => {
            canvas.off("mousemove");
            canvas.off("mouseup");
        });

        canvas.mousemove((e) => {
            var x = e.pageX - canvas.offset().left;
            var y = e.pageY - canvas.offset().top;
            elem.css("left", x);
            elem.css("top", y);
        });
    })
})

function add_ball(type) {
    var elem = $("<img></img>");
    elem.attr("src", "images/" + type + ".png");
    elem.css("position", "absolute");
    elem.css("z-index", 1000);
    elem.css("width", 30);
    elem.css("height", 30);
    elem.attr("draggable", false);
    elem.mousedown((e) => {
        event.stopPropagation();
        var elem = $(e.target);
        var canvas = $("#canvas");

        canvas.mouseup((e) => {
            canvas.off("mousemove");
            canvas.off("mouseup");
        });

        canvas.mousemove((e) => {
            var tree = $("#tree");
            var tx = tree.offset().left;
            var ty = tree.offset().top;


            var px, py;
            var cx, cy;
            if (elem.hasClass("on-tree")) {
                px = tree.offset().left;
                py = tree.offset().top;

                cx = 0;
                cy = 0;
            } else {
                px = canvas.offset().left;
                py = canvas.offset().top;
                cx = tx - px;
                cy = ty - py;
            }

            var x = e.pageX - px;
            var y = e.pageY - py;

            if (x > cx && x < cx + 240 && y > cy && y < cy + 384) {
                elem.addClass("on-tree");
                tree.prepend(elem);
            } else {
                elem.removeClass("on-tree");
                canvas.prepend(elem);
            }

            if (elem.hasClass("on-tree")) {
                px = tree.offset().left;
                py = tree.offset().top;

                cx = 0;
                cy = 0;
            } else {
                px = canvas.offset().left;
                py = canvas.offset().top;
                cx = tx;
                cy = ty;
            }

            var x = e.pageX - px;
            var y = e.pageY - py;

            elem.css("left", x);
            elem.css("top", y);
        });
    });
    elem.css("left", getRandomInt(1024 - 32));
    elem.css("top", getRandomInt(512 - 32));
    elem.addClass("ball");
    $("#canvas").prepend(elem);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function dump() {
    var position = [];
    $(".ball").each((i, elem) => {
        var elem = $(elem);
        var v = {
            x: elem.css("left"),
            y: elem.css("top"),
        };
        position.push(v);
    })
    console.log(JSON.stringify(position));
}

function buildName() {
    my_name = my_name.sort((a, b) => {
        return a.x - b.x;
    });

    var canvas = $("#canvas")
    $(".ball").each((i, elem) => {
        if (i < my_name.length) {
            var elem = $(elem);
            if (elem.hasClass("on-tree")) {
                canvas.prepend(elem)
            }
            var n = my_name[i];
            elem.css("left", my_name[i].x);
            elem.css("top", my_name[i].y);
        }
    });
}