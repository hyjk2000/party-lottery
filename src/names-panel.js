/*global Config nodes*/

let NamesPanel = (() => {
  let instance = null;

  class NamesPanel {
    constructor(nodes) {
      if (instance) return instance;
      instance = this;

      this.config = new Config();
      this.nameCount = 0;
      this.running = false;
      this.stopSignal = false;
      this.runner = null;

      nodes.resetBtn.addEventListener('click', e => {
        if (this.running || !confirm(nodes.resetBtn.dataset.confirm)) return;
        this.init(true);
      });

      window.addEventListener('resize', e => {
        for (let aName of nodes.nameNodes()) this.setNameSize(aName);
      });

      nodes.clickArea.addEventListener('click', this.clickHandler.bind(this));

      document.body.addEventListener('keyup', this.clickHandler.bind(this));
    }

    init(clearState = false) {
      this.running = false;
      this.stopSignal = true;

      for (let aName of nodes.nameNodes()) aName.parentNode.removeChild(aName);

      this.config.lightTheme ? nodes.wrapper.classList.add('light-theme') : nodes.wrapper.classList.remove('light-theme');

      let nameList = this.config.names.replace(/[\s\,、，]+/g, ',').split(',');
      nameList = nameList.filter(aName => { return aName != '' });
      this.nameCount = nameList.length;

      if (clearState) {
        this.config.nameRemovedIndexes = [];
        this.config.save();
      }

      nameList.forEach((aName, index) => {
        let nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.textContent = aName;
        this.setNameSize(nameDiv);
        if (this.config.nameRemovedIndexes.indexOf(`${index}`) != -1) {
          nameDiv.classList.add('disabled');
        }
        nodes.namesPanel.appendChild(nameDiv);
      });

      if (this.nameCount < 2) {
        nodes.optionsBtn.classList.add('bouncing');
      } else {
        nodes.optionsBtn.classList.remove('bouncing');
      }
    }

    setNameSize(aName) {
      let nameLength = Math.max(3, aName.textContent.length);
      let magicDivide = Math.ceil(Math.sqrt(this.nameCount));
      let nameWidth = document.documentElement.clientWidth / magicDivide;
      let nameHeight = document.documentElement.clientHeight / magicDivide;
      let nameFontSize = Math.min(nameWidth * 0.8 / nameLength, nameHeight * 0.8);
      aName.style.width = `${nameWidth}px`;
      aName.style.height = `${nameHeight}px`;
      aName.style.lineHeight = `${nameHeight}px`;
      aName.style.fontSize = `${nameFontSize}px`;
    }

    highlightName(aName, on = true) {
      if (!aName) return false;
      let onName = nodes.nameOnNode();
      if (onName instanceof Node) onName.classList.remove('on');
      on ? aName.classList.add('on') : aName.classList.remove('on');
      return true;
    }

    transformName(aName, center = true) {
      if (!aName) return false;
      let transform = 'none';
      if (center) {
        let { width, height, left, top } = aName.getBoundingClientRect();
        let { clientWidth, clientHeight } = document.documentElement;
        let moveX = ((clientWidth - width) / 2 - left) / 5;
        let moveY = ((clientHeight - height) / 2 - top) / 5;
        transform = `scale(5) translate(${moveX}px, ${moveY}px)`;
      }
      ['webkitTransform', 'transform'].forEach((prop) => {
        if (aName.style.hasOwnProperty(prop)) {
          aName.style[prop] = transform;
        }
      });
      return true;
    }

    speakName(aName, lang = navigator.language) {
      if (!(this.config.readOutNames && window.speechSynthesis)) return false;
      let utterance = new SpeechSynthesisUtterance(aName.textContent);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }

    disableName(aName) {
      if (!this.config.removeAfterHit) return false;
      this.config.nameRemovedIndexes.push(nodes.nameNodes().indexOf(aName));
      this.config.save();
      aName.classList.add('disabled');
    }

    gotoName() {
      if (this.config.stopOnDemand && this.stopSignal) {
        clearInterval(this.runner);
        let winner = nodes.nameOnNode();
        this.transformName(winner);
        this.speakName(winner);
        this.running = false;
        return;
      }

      let candidates = nodes.nameNodesLeft();
      let idx = Math.floor(Math.random() * (candidates.length + 1));
      this.highlightName(candidates[idx]);
    }

    run(speed, duration) {
      if (speed >= duration || this.stopSignal) {
        let winner = nodes.nameOnNode();
        this.transformName(winner);
        this.speakName(winner);
        this.running = false;
        return true;
      }

      this.runner = setInterval(this.gotoName.bind(this), speed);
      if (!this.config.stopOnDemand) {
        setTimeout(() => {
          clearInterval(this.runner);
          this.run(speed * 4, duration);
        }, duration);
      }
    }

    clickHandler(e) {
      if (nodes.wrapper.classList.contains('flip')) return false;
      if (e.type == 'keyup' && [13, 32].indexOf(e.keyCode) == -1) return false;
      if (this.running) {
        if (this.config.stopOnDemand) this.stopSignal = true;
        return false;
      }
      if (this.config.nameRemovedIndexes.length >= this.nameCount) return false;

      let onName = nodes.nameOnNode();
      if (onName instanceof Node) {
        this.highlightName(onName, false);
        this.transformName(onName, false);
        this.disableName(onName);
        return false;
      }

      this.running = true;
      this.stopSignal = false;
      this.run(100, 3000);
    }
  }

  return NamesPanel;
})();
