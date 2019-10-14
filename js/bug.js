function Bug(xPos, yPos, xSpeed, ySpeed, bugType, bugSize, changeDirAt, CONTAINER_WIDTH, CONTAINER_HEIGHT){
  this.bugType = bugType;
  this.bugSize = bugSize;
  this.xPos = xPos;
  this.yPos = yPos;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.changeDirAt = changeDirAt;
  this.CONTAINER_WIDTH = CONTAINER_WIDTH;
  this.CONTAINER_HEIGHT= CONTAINER_HEIGHT;

  this.init = function(){
    this.createBug()
    this.initialXPos = this.xPos
    return this;
  }

  this

  this.createBug = function(){
    this.bug = document.createElement('div')
    this.bugHead = document.createElement('div')
    this.bugBody = document.createElement('div')
    this.bugAbdomen = document.createElement('div')

    this.styleBug()
    this.styleBugHead();
    this.styleBugBody();
    this.styleBugAbdomen();
  }

  this.move=function(incrementMiss){
    var bugSize = parseInt(this.bugAbdomen.style.width)
    if((this.xPos + bugSize) >= this.CONTAINER_WIDTH){
      this.xSpeed = -this.xSpeed;
    }else if((this.xPos - bugSize) < 0){
      this.xSpeed = Math.abs(this.xSpeed)
    }
    var bugHeight = parseInt(this.bugHead.style.height) + parseInt(this.bugBody.style.height) + parseInt(this.bugAbdomen.style.height)

    if((this.yPos + bugHeight) >= this.CONTAINER_HEIGHT){
      incrementMiss(this)
    }

    if((this.xPos - this.initialXPos) > this.changeDirAr || (this.xPos - this.initialXPos) < 0){
      this.xSpeed = -(this.xSpeed)
    }
    this.xPos = this.xPos + this.xSpeed;
    this.yPos = this.yPos + this.ySpeed;
  }

  this.draw = function(){
    this.bug.style.left = this.xPos + 'px';
    this.bug.style.top = this.yPos + 'px';

    this.bug.appendChild(this.bugAbdomen);
    this.bug.appendChild(this.bugBody);
    this.bug.appendChild(this.bugHead);
  }

  this.styleBug= function(){
    this.bug.style.position = 'absolute';
    this.bug.style.display = 'inline-block';

    this.bug.setAttribute('class', this.bugType)
  }

  this.styleBugHead = function(){
    if(this.bugType === 'ant'){
      this.bugHead.style.width = this.bugSize*0.8 + 'px';
      this.bugHead.style.height = this.bugSize*0.8 + 'px';
      this.bugHead.style.borderRadius = '50%';
      this.bugHead.style.backgroundColor = '#343434';
      this.bugHead.style.margin = 'auto';
    }

    if(this.bugType === 'wasp'){
      this.bugHead.style.width = this.bugSize*1.8 + 'px';
      this.bugHead.style.height = this.bugSize*1.8 + 'px';
      this.bugHead.style.borderRadius = '50%';
      this.bugHead.style.backgroundColor = '#CABC0B';
      this.bugHead.style.margin = 'auto';
    }

    this.bugHead.setAttribute('class', 'bugHead')
  }

  this.styleBugBody = function(){
    if(this.bugType === 'ant'){
      this.bugBody.style.width = this.bugSize*0.3 + 'px';
      this.bugBody.style.height = this.bugSize*0.3 + 'px';
      this.bugBody.style.backgroundColor = '#373629';
      this.bugBody.style.borderRadius = "50%";
      this.bugBody.style.margin = 'auto';
    }

    if(this.bugType === 'wasp'){
      this.bugBody.style.width = this.bugSize*1.3 + 'px';
      this.bugBody.style.height = this.bugSize*1.3 + 'px';
      this.bugBody.style.backgroundColor = '#565555';
      this.bugBody.style.borderRadius = "50%";
      this.bugBody.style.margin = 'auto';
    }

    this.bugBody.setAttribute('class', 'bugBody')

  }

  this.styleBugAbdomen = function(){
    if(this.bugType === 'ant'){
      this.bugAbdomen.style.width = this.bugSize + 'px';
      this.bugAbdomen.style.height = this.bugSize*1.2 + 'px';
      this.bugAbdomen.style.borderRadius = '50%';
      this.bugAbdomen.style.backgroundColor = '#4D2F2F';
      this.bugAbdomen.style.margin = 'auto';
    }

    if(this.bugType === 'wasp'){
      this.bugAbdomen.style.width = this.bugSize*2 + 'px';
      this.bugAbdomen.style.height = this.bugSize*2.5 + 'px';
      this.bugAbdomen.style.borderRadius = '50%';
      this.bugAbdomen.style.backgroundColor = '#F0DF07';
      this.bugAbdomen.style.margin = 'auto';
    }

    this.bugAbdomen.setAttribute('class', 'bugAbdomen')
  }

  this.getElement = function(){
    return this.bug;
  }

}
