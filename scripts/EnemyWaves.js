class EnemyWaves {
    constructor(gameState) {
        this.gameState = gameState;

        this.currentTime = 0;
        this.startTime = Date.now();
        this.elapsedTime = 0;

        this.limitEnemiesPerWave = 30;
        this.limitBaseEnemiesSpawn = 10;
        this.totalWaves = 30;

        this.timeBeetweenDiceRolls = 7000;
        this.totalEnemiesPerWave = 8;
        this.baseEnemiesSpawn = 1;
        this.EnemySpawnMax = 1;

        this.currentWave = 0;
        this.livingEnemies = 0;
        this.enemiesSpawned = 0;
        this.enemiesCleared = 0;

        this.win = false;
    }

    update() {
        this.currentTime = Date.now();
        this.elapsedTime = this.currentTime - this.startTime;
        
        if(this.livingEnemies === 0) {
            this.diceRoll();
            this.startTime = Date.now();
        }
        if(this.elapsedTime >= this.timeBeetweenDiceRolls) {
            this.diceRoll();
            this.startTime = Date.now();
        }
    }

    diceRoll() {
        if(this.currentWave === 0) {
            this.currentWave++;
        } else {

            console.log(`currentwave: ${this.currentWave}`);

            const enemysToSpawn = Math.floor(Math.random() * this.EnemySpawnMax) + this.baseEnemiesSpawn;

            for(let i = 0; i < enemysToSpawn; i++) {
                if(this.enemiesSpawned < this.totalEnemiesPerWave) {
                    let diceEnemy;
                    if(this.currentWave > 0 && this.currentWave <= 3) {
                        diceEnemy = Math.floor(Math.random() * 1) + 1;
                    } else if(this.currentWave > 3 && this.currentWave <= 7) {
                        diceEnemy = Math.floor(Math.random() * 2) + 1;
                    } else if(this.currentWave > 7) {
                        diceEnemy = Math.floor(Math.random() * 3) + 1;
                    }

                    console.log(`diceEnemy: ${diceEnemy}`);

                    switch(diceEnemy) {
                        case 1:
                            this.gameState.spawnEnemy("enemySpacecraft")
                            break;
                        case 2:
                            this.gameState.spawnEnemy("enemyCruiser")
                            break;
                        case 3:
                            this.gameState.spawnEnemy("enemyDestroyer")
                            break;
                    }

                    this.livingEnemies++;
                    this.enemiesSpawned++;
                } else {
                    //console.log("no more enemys to spawn");
                }
            }

            if(this.enemiesCleared === this.totalEnemiesPerWave) {
                //console.log("wave cleared");

                // Disminuir el tiempo entre tiro de dados
                switch(this.currentWave) {
                    case 2:
                        this.timeBeetweenDiceRolls = 6000;
                        break;
                    case 4:
                        this.timeBeetweenDiceRolls = 5000;
                        break;
                    case 12:
                        this.timeBeetweenDiceRolls = 4500;
                        break;
                    case 19:
                        this.timeBeetweenDiceRolls = 3500;
                        break;
                    case 28:
                        this.timeBeetweenDiceRolls = 2500;
                        break;
                }

                // Aumenta el numero de enemigos por oleada
                switch(this.currentWave) {
                    case 2:
                        this.totalEnemiesPerWave = 12;
                        break;
                    case 4:
                        this.totalEnemiesPerWave = 20;
                        break;
                    case 7:
                        this.totalEnemiesPerWave = 30;
                        break;
                    case 10:
                        this.totalEnemiesPerWave = 45;
                        break;
                }

                // Aumenta el numero base de enemigos por spawn
                switch(this.currentWave) {
                    case 3:
                        this.baseEnemiesSpawn = 2;
                        break;
                    case 10:
                        this.baseEnemiesSpawn = 3;
                        break;
                    case 26:
                        this.baseEnemiesSpawn = 4;
                        break;
                }

                // Aumenta el maximo de enemigos por spawn
                switch(this.currentWave) {
                    case 4:
                        this.EnemySpawnMax = 3;
                        break;
                    case 11:
                        this.EnemySpawnMax = 4;
                        break;
                    case 22:
                        this.EnemySpawnMax = 5;
                        break;
                    case 29:
                        this.EnemySpawnMax = 6;
                        break;
                }

                if(this.currentWave === this.totalWaves) {
                    if(this.win === false) {
                        this.gameState.gameManager.eventManager.triggerEvent("onPlayerWin", {});
                        this.win = true;
                    }
                } else {
                    this.currentWave++;
                    this.enemiesSpawned = 0;
                    this.enemiesCleared = 0;
                }

                //console.log(`currentWave: ${this.currentWave}`);
            }

        }
    }

}