function GameObject(params,image) {
  var t = this;
  this.region = image;
  this.width = 1;
  this.height = 1;
  function createBody(params) {
    var bd = new Box2D.b2BodyDef();
    bd.set_type(params.static ? Module.b2_staticBody : Module.b2_dynamicBody);
    bd.set_position(new Box2D.b2Vec2(params.x || 0, params.y || 0));
    var body = world.CreateBody(bd);
    var shape;
    if(params.shape == "circle") {
      shape = new Box2D.b2CircleShape();
      shape.set_m_radius(params.r || 1);
    } else if(params.shape == "rect") {
      var verts = [];
      var w = params.w || 1;
      var h = params.h || 1;
      t.width = w;
      t.height = h;
      verts.push( new Box2D.b2Vec2(-w/2,-h/2) );
      verts.push( new Box2D.b2Vec2(w/2,-h/2) );
      verts.push( new Box2D.b2Vec2(w/2,h/2) );
      verts.push( new Box2D.b2Vec2(-w/2,h/2) );
      shape = createPolygonShape(verts);
    } else if(params.shape == "poly") {
      shape = createPolygonShape(params.verts);
    } else {

    }
    var fix = body.CreateFixture(shape, 1.0);
    if(params.shape == "circle") {
      fix.SetFriction(params.friction | 10);
      fix.SetRestitution(params.restitution | 0);
    }
    fix.SetSensor(params.sensor | false);
    if(!params.static) {
      body.SetAwake(1);
      body.SetActive(1);
    }
    body.type = params.type /*| ""*/;
    body.shape = params.shape /*| ""*/;
    return body;
  }
  this.draw = function(context){
    if(!this.region) {console.log("SADFSFDAFSDF"); return;}
    var x = this.body.GetPosition().get_x();
    var y = this.body.GetPosition().get_y();
    var rotation = this.body.GetAngle();
    context.save();
    context.translate(x,y);
    context.rotate(rotation);
    if(this.body.shape == "circle") {
      var shape = this.body.GetFixtureList().GetShape();
      var r = shape.get_m_radius();
      context.drawImage(this.region,-r,-r,2*r,2*r);
    }
    if(this.body.shape == "rect") {
      for(var i = 0; i < Math.ceil(t.width/t.height);i ++) {
        //drawImage(this.region, -t.width/2 + i*)
        context.drawImage(this.region,-t.width/2+i*t.height,-t.height/2,t.height,t.height);
      }

      //context.drawImage(this.region,-t.width/2,-t.height/2,t.width,t.height);
    /*  console.log(t.width + " " + t.height);
      console.log(this);*/
    }
    context.restore();
  }
  this.body = createBody(params);
}

function TextureRegion() {
  this.image;
}
