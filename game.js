class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('background', 'background.png'); // Carrega o fundo
        this.load.image('player', 'player.png'); 
        this.load.image('house', 'house.png');
        this.load.image('shopping', 'shopping.png');
        this.load.image('beach', 'beach.png');
    }

    create() {
        // Adiciona o fundo e ajusta ao tamanho da tela
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        // Ajusta a escala quando a tela for redimensionada
        this.scale.on('resize', this.resize, this);

        // Criando o jogador e garantindo que ele não saia da tela
        const spawnPoint = { x: 1200, y: 900 }; // Defina onde quer que o personagem apareça
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');
        this.player.setScale(0.5);
        this.player.setCollideWorldBounds(true);

        // Criando controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Criando objetos interativos nas localizações corretas
        this.locations = [
            { x: 1500, y: 700, sprite: 'house', scale: 0.5, message: 'Parabéns amor você chegou ao primeiro local do seu PRÓPRIO jogo! este local representa várias coisas, o local do nosso primeiro beijo, local onde nós desenvolvemos grande parte da nossa relação e mais que isso, este local representa o teu abraço para mim. Amor, primeiramente parabéns!!! eu te amo muito e queria dizer que esse é um dos muitos e muitos aniversários que estarei ao seu lado, tu não faz ideia do quão eu sou grato pela tua vida, o teu chamado aqui na terra é belíssimo amor e eu tenho muita honra de estar ao seu lado para te apoiar, suportar, amar e cuidar incondicionalmente, como já disse uma vez, digo novamente, o Senhor te enviou na minha vida e através dela me guiou em um corredor nublado, ele através de você sendo a luz nesse corredor. Agora vai pro segundo local vai!!!' }, // Reduzimos a casa
            { x: 300, y: 550, sprite: 'shopping', scale: 0.8, message: 'Olá! Seja bem-vindo ao Barra Shopping Sul! Lembra amor? nosso primeiro encontro, os dois brigando contra a timidez e conversando de assuntos bem aleatórios. Aquele dia foi marcante, a partir daquele dia eu sentia que algo iria acontecer, a leveza que aquele encontro foi, o assunto fluindo mesmo nós estando muito envergonhados ou a gente tendo que pôr os pontos nos is e isso não afetando nada no futuro de nós. Não sei o que aconteceu, só sei que GRAÇAS A DEUS ACONTECEU, aquele shopping hoje pra mim representa muito, pois, eu sempre vou olhar e lembrar de nós tomando sorvete sentado em um banco e conversando sobre nossos gostos, família, experiências e etc. Foi ali a primeira vez que vi de perto a tua bondade, teu carisma, teu carinho sobre os outros, e foi simplesmente incrível. Agora vai pro próximo e último ponto!!!!' },
            { x: 900, y: 500, sprite: 'beach', scale: 0.8, message: 'Praia de Tramandaí com mar chocolatão? temos! a primeira vez que fomos para a praia, 5 horas da manhã e não era nem nosso quinto encontro, a gente realmente tava apaixonado né? aquele dia para mim foi um dos meus dias marcantes que eu digo "aqui eu me apaixonei mais" porque ali além de já estarmos menos tímidos, foi novamente como sempre é, muito leve. Nós passamos boas horas na beira da praia e depois ainda almoçamos com teus pais E A GENTE NEM NAMORAVA KKKKKKKK, eu amo a gente amor, amo a forma que nós nos desenvolvemos como casal, amo nosso tratamento um com o outro, nosso cuidado, amo tudo em nós, mas principalmente, amo que sempre colocamos o mais importante da nossa vida no centro de todo nosso relacionamento, o Senhor, colocar ele no centro desde o começo foi nosso principal acerto. Eu quero te agradecer e dizer que sou grato pela tua vida, sou grato pela namorada incrivel que tu és, sou grato pela melhor amiga que tu és, grato por tu ser uma filha incrivel e dizer que eu tenho muito orgulho de ti, obrigado por estar do meu lado em todos os meus momentos, por estar lá quando estou sorrindo ou chorando. Eu sempre estarei do seu lado, independente do momento, Eu te amo muito Laura Luiza de Oliveira, feliz 19 anos e que Deus continue te abençoando e que te revigore sempre que a fadiga lhe alcançar, te amo e agora me da um abraço por favor!' }
        ];

        this.interactables = this.locations.map(loc => {
            let obj = this.physics.add.staticSprite(loc.x, loc.y, loc.sprite);
            obj.setScale(loc.scale); // Ajustamos o tamanho de cada objeto
            obj.setOrigin(0.5, 0.5);
            obj.message = loc.message;
            return obj;
        });

        // Garante que o jogador está acima das imagens
        this.children.bringToTop(this.player);

        // Texto de interação
        this.interactionText = this.add.text(50, 50, '', { fontSize: '16px', fill: '#fff' });

    }

    update() {
        let speed = 200;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        if (this.cursors.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        if (this.cursors.down.isDown) this.player.setVelocityY(speed);

        // Detecta interação
        this.interactionText.setText('');
        this.interactables.forEach(obj => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, obj.x, obj.y) < 50) {
                this.interactionText.setText('Pressione E para interagir');
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                    alert(obj.message);
                }
            }
        });
    }

    resize(gameSize) {
        this.cameras.resize(gameSize.width, gameSize.height);
        this.background.setDisplaySize(gameSize.width, gameSize.height); // Ajusta o fundo ao redimensionar
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Jogo ocupa a tela inteira
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
