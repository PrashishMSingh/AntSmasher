const CONTAINER_WIDTH = 300;
const CONTAINER_HEIGHT = 700;
const FRAME_SPEED = 80;
function SmasherController(containerId, CONTAINER_WIDTH, CONTAINER_HEIGHT){

  this.CONTAINER_WIDTH = CONTAINER_WIDTH;
  this.CONTAINER_HEIGHT = CONTAINER_HEIGHT;
  this.containerId = containerId;
  this.bugList = []
  this.missCount = 0;
  this.waspSmashCount = 0;
  this.antSmashCount = 0;
  this.gameOver = true;
  this.difficulty = 5;

  this.init = function(){
    this.containerElement = document.getElementById(containerId);
    this.gameOverContainer = this.containerElement.getElementsByClassName('gameOverWrapper')[0];
    this.levelSelector = this.gameOverContainer.getElementsByClassName('level')[0];
    this.nextBtn = this.gameOverContainer.getElementsByClassName('nextBtn')[0];
    this.nextBtn.onclick = this.nextBtnAction;
    this.pointElement = document.getElementsByClassName('antSmashCount')[0];
    this.pointElement.innerHTML = this.antSmashCount;
    this.missedElement = document.getElementsByClassName('missCount')[0];
    this.missedElement.innerHTML = this.missCount;
    this.waspElement = document.getElementsByClassName('waspCount')[0];
    this.waspElement.innerHTML = this.waspSmashCount;
    return this
  }

  this.clearDisplay = function(){
    var wasps = document.getElementsByClassName('wasp')
    var ants = document.getElementsByClassName('ant')
    if(wasps.length){
      for(var i = 0; i <=wasps.lenght; i++){
          this.containerElement.removeChild(wasps[i])
      }
    }
    if(ants.length){
      for(var j = 0; j<=ants.length; j++){
          this.containerElement.removeChild(ants[j])
      }
    }
  }

  this.endGame = function(){
    this.gameOverContainer.style.display = 'block';
    for(var i = 0; i<this.bugList.length; i++){
      this.containerElement.removeChild(this.bugList[i].getElement())
    }
    this.bugList = []
    this.waspSmashCount = 0;
    this.antSmashCount = 0;
    this.missCount = 0;

  }

  this.nextBtnAction = (function(){
    this.gameOverContainer.style.display = 'none';
    this.setDifficulty(this.levelSelector.value)
    this.gameOver = false;
    this.waspElement.innerHTML = this.waspSmashCount;
    this.pointElement.innerHTML = this.antSmashCount;
    this.missedElement.innerHTML = this.missCount;


    this.createBugs()
    this.updateBugs()
  }).bind(this)

  this.getElement = function(){
    return this.containerElement;
  }

  this.addBug = function(bug){
    this.bugList.push(bug)
    this.containerElement.appendChild(bug.getElement())
    bug.draw()
  }

  this.removeBug = function(bug){
    if(!this.gameOver){
      if(bug instanceof Bug){
        this.bugList = this.bugList.filter(singleBug => bug !== singleBug)
        this.containerElement.removeChild(bug.getElement())
      }
      else{
        var bugParts = ['bugHead', 'bugBody', 'bugAbdomen']
        if(bugParts.includes(bug.className)){
          var parentElement = bug.parentElement
          this.bugList = this.bugList.filter(singleBug => parentElement !== singleBug.getElement())
          this.containerElement.removeChild(parentElement)
        }
      }
    }
  }

  this.setDifficulty = function(level){
    this.difficulty = level
  }


  this.incrementMiss = (function(bug){
    this.removeBug(bug)
    if(bug.bugType === 'ant'){
      this.missCount ++;
      this.missedElement.innerHTML = this.missCount
      this.containerElement.style.backgroundColor = 'red'
      if(this.missCount >= 3){
        this.gameOver = true;
        this.endGame()
      }
    }else if(bug.bugType === 'wasp'){
      this.containerElement.style.borderBottom = '#070EF0 solid 2px'
    }
  }).bind(this)

  this.incrementBugSmash = function(bug){
    if(bug.parentElement.className === 'ant'){
        this.antSmashCount++
        this.pointElement.innerHTML = this.antSmashCount;
    }
    else if(bug.parentElement.className === 'wasp'){
      this.waspSmashCount++
      this.waspElement.innerHTML = this.waspSmashCount;
      this.containerElement.style.backgroundColor = 'red'
      if(this.waspSmashCount >= 3){
        this.gameOver = true;
        this.endGame()
      }

    }
    this.removeBug(bug)
  }

  this.createBugs = function(){
    var bugsNo = 0;
    var bugCreationInterval = 1000

    var createBug = setInterval((function(){
      var count = this.difficulty
      if(!this.gameOver){
        if(this.bugList.length < count){
          var defaultXPos = Math.floor(Math.random()* CONTAINER_WIDTH)
          var defaultYPos = 50;
          var defaultXSpeed = 5;
          var defaultYSpeed = 5;

          var changeDirAt = Math.floor(Math.random() * CONTAINER_WIDTH)
          var bugXSpeed = Math.random() + defaultXSpeed;
          var bugYSpeed = Math.random() + defaultYSpeed;
          var bugType = 'ant'
          var waspThreshold = 0.8
          if(Math.random() > waspThreshold){
            bugType = 'wasp'
          }
          var bug = new Bug(defaultXPos, defaultYPos, bugXSpeed, bugYSpeed, bugType, 20, changeDirAt, CONTAINER_WIDTH, CONTAINER_HEIGHT).init()
          this.addBug(bug)
        }
      }
      else{
        clearInterval(createBug)
      }
    }).bind(this), bugCreationInterval)
  }

  this.updateBugs = function(){
    var updateBug = setInterval( (function(){
      this.containerElement.style.backgroundColor = '#56A4F3'
      if(!this.gameOver){
        for(var i = 0; i<this.bugList.length; i++){
          this.bugList[i].move(this.incrementMiss)
          if(this.bugList[i]){
              this.bugList[i].draw()
          }
        }
      }else{
        clearInterval(updateBug)
      }
    }).bind(this), FRAME_SPEED)

  }

  this.setDefaultContainerStyle = function(){
    this.containerElement.style.margin = 'auto'
    this.containerElement.style.borderRadius = '5px'
    this.containerElement.style.position = 'relative'
    this.containerElement.style.width = this.CONTAINER_WIDTH + 'px'
    this.containerElement.style.height = this.CONTAINER_HEIGHT + 'px'
    this.containerElement.style.backgroundColor = '#56A4F3'
  }

}
var controller = new SmasherController('gameContainer', CONTAINER_WIDTH, CONTAINER_HEIGHT).init()
controller.setDefaultContainerStyle()

controller.getElement().onclick = function(e){
  controller.incrementBugSmash(e.target)
}
