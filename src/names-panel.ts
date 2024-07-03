import Config from "./config.js";
import Nodes from "./nodes.js";

let instance: NamesPanel;

class NamesPanel {
  private config = new Config();
  private nameCount = 0;
  private running = false;
  private stopSignal = false;
  private runner?: number;

  constructor() {
    if (instance) return instance;
    instance = this;

    Nodes.resetBtn.addEventListener("click", () => {
      if (this.running || !confirm(Nodes.resetBtn.dataset.confirm)) return;
      this.init(true);
    });

    window.addEventListener("resize", () => {
      for (let aName of Nodes.nameNodes()) this.setNameSize(aName);
    });

    Nodes.clickArea.addEventListener("click", this.clickHandler.bind(this));

    document.body.addEventListener("keyup", this.clickHandler.bind(this));
  }

  init(clearState = false) {
    this.running = false;
    this.stopSignal = true;

    for (let aName of Nodes.nameNodes()) aName.parentNode?.removeChild(aName);

    this.config.lightTheme ? Nodes.wrapper.classList.add("light-theme") : Nodes.wrapper.classList.remove("light-theme");

    let nameList = this.config.names.replace(/[\s\,、，]+/g, ",").split(",");
    nameList = nameList.filter((aName) => {
      return aName != "";
    });
    this.nameCount = nameList.length;

    if (clearState) {
      this.config.nameRemovedIndexes = [];
      this.config.save();
    }

    nameList.forEach((aName, index) => {
      let nameDiv = document.createElement("div");
      nameDiv.className = "name";
      nameDiv.textContent = aName;
      this.setNameSize(nameDiv);
      if (this.config.nameRemovedIndexes.indexOf(index) != -1) {
        nameDiv.classList.add("disabled");
      }
      Nodes.namesPanel.appendChild(nameDiv);
    });

    if (this.nameCount < 2) {
      Nodes.optionsBtn.classList.add("bouncing");
    } else {
      Nodes.optionsBtn.classList.remove("bouncing");
    }
  }

  setNameSize(aName: HTMLElement) {
    let nameLength = Math.max(3, aName.textContent?.length ?? 0);
    let magicDivide = Math.ceil(Math.sqrt(this.nameCount));
    let nameWidth = document.documentElement.clientWidth / magicDivide;
    let nameHeight = document.documentElement.clientHeight / magicDivide;
    let nameFontSize = Math.min((nameWidth * 0.8) / nameLength, nameHeight * 0.8);
    aName.style.width = `${nameWidth}px`;
    aName.style.height = `${nameHeight}px`;
    aName.style.lineHeight = `${nameHeight}px`;
    aName.style.fontSize = `${nameFontSize}px`;
  }

  highlightName(aName: HTMLElement, on = true) {
    if (!aName) return false;
    let onName = Nodes.nameOnNode();
    if (onName instanceof Node) onName.classList.remove("on");
    on ? aName.classList.add("on") : aName.classList.remove("on");
    return true;
  }

  transformName(aName: HTMLElement, center = true) {
    if (!aName) return false;
    let transform = "none";
    if (center) {
      let { width, height, left, top } = aName.getBoundingClientRect();
      let { clientWidth, clientHeight } = document.documentElement;
      let scale = Math.min(clientWidth / width, clientHeight / height) * 0.6;
      let moveX = ((clientWidth - width) / 2 - left) / scale;
      let moveY = ((clientHeight - height) / 2 - top) / scale;
      transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
    }
    aName.style.transform = transform;
    return true;
  }

  speakName(aName: HTMLElement, lang = navigator.language) {
    if (!(this.config.readOutNames && window.speechSynthesis)) return false;
    let utterance = new SpeechSynthesisUtterance(aName.textContent ?? undefined);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

  disableName(aName: HTMLElement) {
    if (!this.config.removeAfterHit) return false;
    this.config.nameRemovedIndexes.push(Nodes.nameNodes().indexOf(aName));
    this.config.save();
    aName.classList.add("disabled");
  }

  gotoName() {
    if (this.config.stopOnDemand && this.stopSignal) {
      clearInterval(this.runner);
      let winner = Nodes.nameOnNode();
      this.transformName(winner);
      this.speakName(winner);
      this.running = false;
      return;
    }

    let candidates = Nodes.nameNodesLeft();
    let idx = Math.floor(Math.random() * (candidates.length + 1));
    this.highlightName(candidates[idx]);
  }

  run(speed: number, duration: number) {
    if (speed >= duration || this.stopSignal) {
      let winner = Nodes.nameOnNode();
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

  clickHandler(e: Event) {
    if (Nodes.wrapper.classList.contains("flip")) return false;
    if (e instanceof KeyboardEvent && e.type === "keyup" && ["Enter", "Space"].indexOf(e.code) === -1) return false;
    if (this.running) {
      if (this.config.stopOnDemand) this.stopSignal = true;
      return false;
    }
    if (this.config.nameRemovedIndexes.length >= this.nameCount) return false;

    let onName = Nodes.nameOnNode();
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

export default NamesPanel;
