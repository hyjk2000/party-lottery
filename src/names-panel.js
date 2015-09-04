let NamesPanel = (function() {
  let instance = null;

  class NamesPanel {
    constructor(nodes) {
      if (instance) return instance;
      instance = this;

      this.config = new Config();
      this.nameCount = 0;
      this.running = false;
      this.keepRunning = false;
      this.daemon = null;

      nodes.resetBtn.addEventListener('click', e => {
        if (this.running || !confirm('确实要复位吗？')) return;
        this.init(true);
      });

      window.addEventListener('resize', e => {
        for (let aName of nodes.nameNodes()) this.setNameSize(aName);
      });
    }

    init(clearState = false) {
      this.running = false;
      this.keepRunning = false;

      for (let aName of nodes.nameNodes()) aName.parentNode.removeChild(aName);

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
        if (`${index}` in this.config.nameRemovedIndexes) {
          nameDiv.classList.add('removed');
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
  }

  return NamesPanel;
})();
