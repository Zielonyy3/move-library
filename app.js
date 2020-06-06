class Movables {
    constructor(name) {
        this.name = name;
        this.moveList = document.querySelector('.moveList');
        this.moveBars = [...document.querySelectorAll('.fa-bars')];
        this.elementsList = this.moveBars.map(el => el.parentNode);
        this.objectList = [];

        this.elementsList.forEach((el, i) => {
            const object = new MoveObject(this, el, i);
            this.objectList.push(object);
        })
    }
    recreateList() {

    }
}

class MoveObject {
    constructor(creator, element, objectIndex) {
        this.creator = creator;
        this.moving = 0;
        this.objectIndex = objectIndex;
        this.moveElementListenerBind = this.moveElement.bind(this);

        this.domElement = element;
        this.elementBars = this.domElement.querySelector('.fa-bars');

        this.elementBound = this.domElement.getBoundingClientRect();
        this.offsetTop = this.elementBound.top;
        this.offsetLeft = this.elementBound.left;

        this.eventBindHandler = this.moveElement.bind(this);

        this.domElement.addEventListener('click', this.moveIt.bind(this))
    }

    moveIt(e) {
        this.creator.objectList.forEach(el => el.domElement.style.backgroundColor = 'red');

        this.elementBound = this.domElement.getBoundingClientRect();

        this.offsetTop = this.elementBound.top;
        this.offsetLeft = this.elementBound.left;

        this.pointY = e.clientY - this.offsetTop;
        this.pointX = e.clientX - this.offsetLeft;

        this.newPositionTop = e.clientY - this.pointY - this.offsetTop;

        if (this.moving) {
            console.log('odłączam');
            this.moving = 0;
            this.domElement.style.cursor = 'default';
            window.removeEventListener('mousemove', this.eventBindHandler)


            // console.log(`Offset end: ${this.offsetTop}`);
        } else {
            console.log(this.pointY);
            // console.log(`Offset start: ${this.offsetTop}`);
            console.log('podłączam')
            this.moving = 1;
            this.domElement.style.cursor = 'grab';
            this.domElement.style.position = 'relative';
            window.addEventListener('mousemove', this.eventBindHandler)
        }
    }

    moveElement(e) {
        this.newPositionTop = e.clientY - this.pointY - this.offsetTop;
        this.domElement.style.top = this.newPositionTop + 'px';
        this.checkPosition()
        // this.domElement.style.left = `${e.clientX - this.clickX - this.offsetLeft}px`;
    }

    checkPosition() {
        console.log(this.creator.objectList[1].offsetTop);
        this.creator.objectList.forEach((el, i) => {
            if (this.newPositionTop + this.offsetTop > el.offsetTop) {
                el.domElement.style.backgroundColor = 'green';
                this.objectIndex = i;
                this.domElement.textContent = this.objectIndex;
            } else {
                el.domElement.style.backgroundColor = 'red';
            }
        })
    }

}

const moving = new Movables('dupa');