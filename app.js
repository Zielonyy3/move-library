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
        this.moveList.textContent = '';
        this.objectList.forEach(el => {
            const li = document.createElement('li');
            li.classList.add(el.domElement.classList);
            const i = document.createElement('i');
            i.classList.add('fas');
            i.classList.add('fa-bars');
            li.appendChild(i);
            this.moveList.appendChild(li);
        })
    }
}

class MoveObject {
    constructor(creator, element, objectIndex) {
        this.creator = creator;
        this.moving = 0;
        this.objectIndex = objectIndex;
        this.newIndex = this.objectIndex;


        this.domElement = element;
        this.elementBars = this.domElement.querySelector('.fa-bars');
        this.elementBound = this.domElement.getBoundingClientRect();
        this.startPositionLeft;
        this.startPositionTop;
        this.offsetLeft;
        this.offsetTop;
        this.lastLeft = this.elementBound.left;
        this.lastTop = this.elementBound.top;

        this.domElement.addEventListener('click', this.moveIt.bind(this))
    }

    moveIt(e) {
        this.creator.objectList.forEach(el => el.domElement.style.backgroundColor = 'red');
        // this.creator.recreateList();

        this.elementBound = this.domElement.getBoundingClientRect();
        this.startPositionLeft = e.clientX - (e.clientX - this.elementBound.left);
        this.startPositionTop = e.clientY - (e.clientY - this.elementBound.top);

        this.offsetLeft = e.clientX - this.elementBound.left;
        this.offsetTop = e.clientY - this.elementBound.top;

        this.lastLeft = 1 * this.domElement.style.left.slice(0, this.domElement.style.left.indexOf('px'));
        this.lastTop = 1 * this.domElement.style.top.slice(0, this.domElement.style.top.indexOf('px'));



        if (this.moving) {
            this.moving = 0;
            this.domElement.style.cursor = 'default';
        } else {
            this.moving = 1;
            this.domElement.style.cursor = 'grab';
        }
        this.domElement.style.position = 'relative';
        window.addEventListener('mousemove', (e) => {
            if (this.moving == 1) {
                console.log(this.newIndex);
                // console.log(`clientX: ${e.clientX}, left: ${this.startPositionLeft}, offsetLeft: ${this.offsetLeft}, lastLeft: ${this.lastLeft} = ${e.clientX - this.startPositionLeft - this.offsetLeft + this.lastLeft*1}`);
                const newPositionLeft = e.clientX - this.startPositionLeft - this.offsetLeft + this.lastLeft;
                const newPositionTop = e.clientY - this.startPositionTop - this.offsetTop + this.lastTop;
                this.domElement.style.left = `${newPositionLeft}px`;
                this.domElement.style.top = `${newPositionTop}px`;
                this.newIndex = this.checkPosition(newPositionLeft, newPositionTop);
            }
        })
        console.warn(this.newIndex);
        const newArray = this.creator.objectList.slice(0, this.newIndex);
        console.log(newArray);
    }

    checkPosition(newPositionLeft, newPositionTop) {
        let newIndex;
        this.creator.objectList.forEach((el, i) => {
            if (newPositionTop + this.startPositionTop > el.lastTop) {
                newIndex = i;
                this.elementBars.textContent = newIndex;
                if (this != el) {
                    el.domElement.style.backgroundColor = 'green';
                    // console.log(`Mniejszy od ${i}`);
                }
            } else {
                el.domElement.style.backgroundColor = 'blue'
            }
        });
        return newIndex;



    }

}


const moving = new Movables('dupa');