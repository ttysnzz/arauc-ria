let arvores = [];
let cidadeX
let gralhas = []; // Armazena todas as gralhas azuis criadas

function setup() {
  createCanvas(800, 400);
  cidadeX = width / 2;
}

function draw() {
  background(135,206,235); // ceu.
  
  // Gralhas Azuis voando
for (let i = gralhas.length - 1; i >= 0; i--) {
  gralhas[i].mover();
  gralhas[i].mostrar();

  // Remove se sair da tela
  if (gralhas[i].x > width + 50) {
    gralhas.splice(i, 1);
  }
}


// campo
 noStroke();
 fill(144,238,144);
 rect(0,height / 2,width, height / 2);
  
  // Sol
  fill('rgb(255,205,12)')
  ellipse(80,80,80)
  
  //predios
  for (let i = 0; i < 5; i++) {
  let x = cidadeX + i * 40;
  let y = height / 2 - 100;
  let largura = 30;
  let altura = 100;

  // Prédio
  fill(100);
  rect(x, y, largura, altura);

  // Janelas (3 linhas, 2 colunas por prédio)
  let janelaLargura = 9;
  let janelaAltura = 10;
  let espacamentoX = 12;
  let espacamentoY = 20;

  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 2; coluna++) {
      let janelaX = x + 5 + coluna * espacamentoX;
      let janelaY = y + 10 + linha * espacamentoY;
      fill('rgb(245,170,93)'); // Amarelo claro (luz)
      rect(janelaX, janelaY, janelaLargura, janelaAltura);
    }
  }
}
  
  // campo(arvores)
  for (let arvore of arvores) {
    arvore.mostrar();
 }
}
function mousePressed(){
 if (mouseY > height / 2 && mouseX < cidadeX) {
  arvores.push(new Arvore(mouseX, mouseY));
  gralhas.push(new GralhaAzul(0, random(50, 150))); // Cria uma gralha voando
}
}
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
  }

  mostrar() {
    this.altura = min(this.altura + 1, 80); // Crescimento mais alto

    // tronco
    fill(101, 67, 33);
    rect(this.x - 2, this.y - this.altura, 4, this.altura);

    // camadas da copa da araucária (em forma de disco)
    let numCamadas = 3;
    let camadaAltura = 15;
    let camadaLargura = [60, 45, 30]; // tamanho das copas

    for (let i = 0; i < numCamadas; i++) {
      fill(34, 139, 34);
      ellipse(
        this.x,
        this.y - this.altura - i * camadaAltura,
        camadaLargura[i],
        15
      ); 
    }
  }
}

class GralhaAzul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(2, 4);
  }

  mover() {
    this.x += this.vel;
  }

  mostrar() {
    // Corpo
    fill(0, 102, 204); // Azul forte
    ellipse(this.x, this.y, 20, 10); // corpo
    ellipse(this.x + 10, this.y - 5, 15, 8); // cabeça

    // Asa
    fill(0, 76, 153);
    triangle(this.x - 10, this.y, this.x, this.y - 10, this.x + 5, this.y);

    // Bico
    fill(255, 153, 51);
    triangle(this.x + 17, this.y - 5, this.x + 22, this.y - 3, this.x + 17, this.y - 1);

    // Olho
    fill(255);
    ellipse(this.x + 12, this.y - 6, 3);
  }
}
