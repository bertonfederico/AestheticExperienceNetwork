class AbstractGraph {
    static onChangeDrop(evt) {
        const inst = new this;
        inst.createSvg(evt.target.value);
    }

    static setUpSlideShow() {
        const inst = new this;
        inst.setUpGraphs();
    }

    createArtworkDropdown() {
        this.artworkContainer = this.hasTwoDropdown ? document.getElementById(this.tag + "Selector1") :  document.getElementById(this.tag + "Selector");
        let index = this.artworkContainer.options.length;
        while (index--) {
            this.artworkContainer.remove(index);
        }
        graphData.forEach((value, key) =>{
            const li = document.createElement("option");
            li.value = key;
            li.innerHTML = key;
            li.onClick = function() { createSvgForTable(key); };
            this.artworkContainer.appendChild(li);
        });
    }
}