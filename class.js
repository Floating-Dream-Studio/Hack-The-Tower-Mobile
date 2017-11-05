
class Duelist{
    constructor(){
        //rp
        this.name = "Player";

        //value
        this.x = 50;
        this.y = app.height/2 - 100;
        this.w = 150;
        this.h = 200;
        this.color = "grey";

        this.idle = true;

        this.pvTotal = 50;
        this.pv = 50;

        this.strTotal = 10; this.str = this.strTotal;
        this.wisTotal = 10; this.wis = this.wisTotal;
        this.defTotal = 10; this.def = this.defTotal;
        this.psyTotal = 10; this.psy = this.psyTotal;

        this.cdd_Total = 1.5;
        this.cdh_Total = 4;
        this.cds_Total = 6;

        this.spells = [
            {w: 100, h:100, launched: false, cdTotal: 1.5, cd: 1.5, name: "a" },
            {w: 100, h:100, launched: false, cdTotal: 4, cd: 4, name: "z" },
            {w: 100, h:100, launched: true, cdTotal: 6, cd: 6, name: 'e' }
        ];


        //idle
        app.tween(this)
            .to({h: 225}, 0.8)
            .to({h: 200}, 0.8)
            .loop()
    };

    update(dt){

        if(this.idle){
            this.x = 50;
            this.y = app.height/2 - this.h;
        }

        this.target = app.boss;

        for(var i = 0; i < 3; i++){
            if(this.spells[i].launched){
                this.spells[i].cd -= 1*dt;
                if(this.spells[i].cd <= 0){
                    this.spells[i].cd = this.spells[i].cdTotal;
                    this.spells[i].launched = false;
                }
            }
        }
    };

    draw(){
        //sprite
        app.layer.fillStyle(this.color)
        app.layer.fillRect(this.x, this.y, this.w, this.h)
        app.layer.fillStyle("red")

        //pv
        if(this.pv > 0 ){
            app.layer.fillRect(this.x, this.y + this.h + 25, this.pv*150/this.pvTotal , 25);
            app.layer.drawImage(app.images["pvBar"], this.x, this.y + this.h + 25)
        };

        //display spells
        for(var i = 0; i < 3; i++){
            var y = app.height - 200;
            var x = app.width/2 - ( (3*125) - 25 )/2 + i*125;
            this.spells[i].x = x;
            this.spells[i].y = y;
            if(this.spells[i].launched){
                app.layer.fillStyle("grey")
            } else {
                app.layer.fillStyle("cyan");
            }
            //app.layer.fillRect(x, y, this.spells[i].w, this.spells[i].h);
            app.layer.context.drawImage(app.images["spellButton"], 0, 0, 100, 100, x, y, this.spells[i].w, this.spells[i].h);
            app.layer.fillStyle("cyan");
            app.layer.fillRect(x, app.height - 90, this.spells[i].cd*100/this.spells[i].cdTotal -1, 15);
            app.layer.drawImage(app.images["spellCd"], x, app.height - 90);
        };

    };

    animateSpell(index){
        app.tween(this.spells[index])
                .to({h: 110, w: 110}, 0.1)
                .to({h: 100, w: 100}, 0.1).wait(0.2)
    };

    damageToTarget(){
        if(this.spells[0].launched === false){
            //animate
            this.animateSpell(0);
            //calculate
            if(this.target.def <= this.str){
                this.spells[0].launched = true;
                this.target.pv -= (this.str - this.target.def)
            };
        };
    };

    heal(){
        if(this.spells[1].launched === false){
            //animate
            this.animateSpell(1);
            //calculate
            if(this.pv < this.pvTotal){
                this.spells[1].launched = true;
                this.pv += ( 1/4 * this.wis ) + (1/2 * this.psy);
                if(this.pv > this.pvTotal){
                    this.pv = this.pvTotal;
                };
            };
        };
    };

    special(){
        if(this.spells[2].launched === false){
            //animate
            this.animateSpell(2);
            //calculate
            this.spells[2].launched = true;
            this.target.pv -= this.str * 2;
        };
    };

};

//BOSS
class Boss{
    constructor(){
        //rp
        this.name = "Boss";

        //value
        this.x = app.width - this.w - 50;
        this.y = app.height/2 - 100;
        this.w = 150;
        this.h = 200;
        this.color = "grey";

        this.idle = true;

        this.pvTotal = 100
        this.pv = 100;

        this.strTotal = 10; this.str = this.strTotal;
        this.wisTotal = 10; this.wis = this.wisTotal;
        this.defTotal = 8; this.def = this.defTotal;
        this.psyTotal = 10; this.psy = this.psyTotal;

        this.cdd_Total = 1.5;
        this.cdh_Total = 4;
        this.cds_Total = 6;

        app.tween(this)
            .to({h: 225}, 0.8)
            .to({h: 200}, 0.8)
            .loop()
    };

    update(){
        if(this.idle){
            this.x = app.width - this.w - 50;
            this.y = app.height/2 - this.h;
        };
    };

    draw(){
        app.layer.fillStyle(this.color)
        app.layer.fillRect(this.x, this.y, this.w, this.h)
        app.layer.fillStyle(this.color)
        if(this.pv > 0 ){
            app.layer.fillStyle("red");
            app.layer.fillRect(this.x, this.y + this.h + 25, this.pv*150/this.pvTotal , 25);
            app.layer.drawImage(app.images["pvBar"], this.x, this.y + this.h + 25);
        };
    };

    damageToTarget(){
        if(app.player.def < this.str){
            app.player.pv -= (this.str - app.player.def);
        };
    };

    heal(){
        if(this.pv < this.pvTotal){
            this.pv += ( 1/4 * this.wis ) + (1/2 * this.psy);
        };
    };

    special(){
        app.player.pv -= this.str * 2;
    };

}
