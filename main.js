title = "Joust!";

description = ` 
[Hold] to Block
[Release] to charge
`;

characters = [
`   
  cc
  cc
  c c
  c ccccccccccccccc
cccccccccc
cccccccccc
`,
    `
    cc
    cc
    c 
    c 
  cccccccccc
  cccccccccc      
    `,
    `       rr
        rr
     r    r
rrrrrrrr    r
    rrrrrrrrrrrrrrrr
    rrrrrrrrrrrrrrrr           
`,
`
  ll 
  ll
ccllcc
ccllcc
ccllcc
cc  cc
`];
const G ={x:200, y:80};

options = { viewSize: { x: G.x, y: G.y },
  isPlayingBgm: true,
  theme:"crt",
  isReplayEnabled: true,
  seed: 69};
/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type {Player} 
 */
let player;

/** @type { {x: number, vx: number}[] } */
let Enemies;

/** @type { "blocking" | "notBlocking"} */
let state;

let speedratio;
//let difficulty;
let px;
let ex;
let enemyaddticks;
  

function update() {
  if (!ticks) {
    speedratio=0.5;
    Enemies=[];
    px=G.x*.1;
    state='notBlocking';
    enemyaddticks=0;
   // char('a',vec(px,g.y*.1))
    //player={pos: vec(G.x/2,G.y/2)};
    

  }
  const scr = (px - 10) * 0.05;
  Enemies.forEach((t)=>{
    char("c",vec(t.x,G.y*.9));
    t.x-=t.vx;
  });
  // player.pos=vec(input.pos.x, input.pos.y);
  // color("black");
  // char("b",player.pos);
 
  color("black");
  rect(0, 93, 99, 7);
  //char('a',vec(G.x-difficulty,G.y*.9));
  //difficulty+=.0001;
  if(input.isPressed)
  {
    state='blocking';
    if(input.isJustPressed){
    play('select');
    }
  }
  else{
    state="notBlocking";
  }

  if(state=='notBlocking')
  {
    char('b',vec(px,G.y*.9))
    px+=speedratio;
    speedratio+=.005;
    if(px<=0 || px>=G.x)
    {
        end();
    }
  }
  else{

    char('a',vec(px,G.y*.9))
    px+=speedratio;
    speedratio-=.005;
    if(px<=0 || px>=G.x)
    {
        end();
    }

  }
  //const pp=sqrt(difficulty);
  enemyaddticks--;
  if(enemyaddticks<0)
  {
    const sd=rnd(sqrt(difficulty)-1)+1;
    Enemies.push({x:G.x,
    vx:.8*sd});
    enemyaddticks=90/(rnd(sqrt(difficulty)) + .9);
  }
  remove(Enemies,(t)=>{
    
    const iscol=char("c",vec(t.x,G.y*.9)).isColliding.char.a;
    if(iscol)
    {
      play("explosion");
      color("red");
      particle(t.x, G.y*.9, 20, 2, -PI / 2, PI * 1.2);
      addScore(t.x, t.x, 67);
      return (iscol);
    }
    if(char("c",vec(t.x,G.y*.9)).isColliding.char.b)
    {
      play("lucky")
      end();
    }
  });
  // if (Enemies.length === 0) {
  //   enemyaddticks *= 0.7;
  // }

}

addEventListener("load", onLoad);