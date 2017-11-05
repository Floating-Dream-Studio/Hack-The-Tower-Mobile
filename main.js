
var app = playground({

    width: 609,
    height: 1080,

    create: function(){
        app.player = new Duelist();
        app.boss   = new Boss();
        app.run    = true;
        app.timerTotal = 180;
        app.timer  = 180;

        app.loadImage("spellButton", "spellCd", "pvBar", "bg1");

    },

    collide: function(x, y, b) {
        if(x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.y + b.h){
            return true;
        } else {
            return false;
        }
    },

    step: function(dt){

        app.player.update(dt);
        app.boss.update();

        if(app.timer > 0){
            app.timer -= 1*dt;
        } else {
            app.run = false;
        }

    },

    touchstart: function(e){
        if(app.run){
            for(var i = 0; i < this.player.spells.length; i++){
                var spell = this.player.spells[i];
                if(this.collide(e.x, e.y, spell)){
                    switch (spell.name) {
                        case "a":
                            app.player.damageToTarget();
                            break;
                        case "z":
                            app.player.heal();
                            break;
                        case "e":
                            app.player.special();
                            break;

                    }
                }
            }
        }
    },

    keydown: function(e){
        if(app.run){
            switch(e.key){
                case "a":
                    app.player.damageToTarget();
                    break;
                case "z":
                    app.player.heal();
                    break;
                case "e":
                    app.player.special();
                    break;
            };
        };
    },

    render: function(){
        app.layer
            .clear("#333")
            .drawImage(this.images['bg1'], 0, 0)
            .fillStyle("white")
            .fillCircle(80, 100, 30)
            .fillCircle(app.width - 80, 100, 30)
            .fillRect(80, 70, app.width - 160, 60)
            .fillStyle("cyan")
            .fillCircle(80, 100, 20)
            .fillRect(80, 80, (app.width - 160) * app.timer / app.timerTotal , 40)
        app.player.draw();
        app.boss.draw();
    }


});
